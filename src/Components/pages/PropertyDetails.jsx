import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchDetails = async () => {
    try {
      const res = await fetch(`${API}/api/property/${id}`);
      const data = await res.json();
      setProperty(data);
    } catch (err) {
      console.error("Error fetching property:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (!property)
    return <p className="text-center mt-10 text-red-500">Property not found.</p>;

  // Function to return safe image URL
  const getImageURL = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${API}${url}`;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">

      {/* TITLE */}
      <h1 className="text-4xl font-bold text-gray-900">{property.title}</h1>
      <p className="text-gray-600 mb-4 text-lg">{property.location}</p>

      {/* IMAGE CAROUSEL */}
      {property.images && property.images.length > 0 ? (
        <div className="w-full mb-6">

          {/* MAIN IMAGE */}
          <img
            src={getImageURL(property.images[0].url)}
            alt="Property"
            className="w-full h-[420px] object-cover rounded-xl shadow"
          />

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-3">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={getImageURL(img.url)}
                alt=""
                className={`h-24 w-32 object-cover rounded cursor-pointer border 
                  ${idx === 0 ? "border-blue-600" : "border-gray-300"}`}
                onClick={() => {
                  // Swap main image with clicked thumbnail
                  const newImages = [...property.images];
                  const temp = newImages[0];
                  newImages[0] = newImages[idx];
                  newImages[idx] = temp;
                  setProperty({ ...property, images: newImages });
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-48 bg-gray-200 rounded flex items-center justify-center">
          <p className="text-gray-500">No Images Uploaded</p>
        </div>
      )}

      {/* INFO SECTION */}
      <div className="bg-white shadow-md rounded-xl p-6 mt-6 space-y-4">

        <p className="text-lg">
          <span className="font-semibold">BHK:</span>{" "}
          {property.bhk ? property.bhk : "N/A"}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Type:</span> {property.type}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Size:</span> {property.size}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Price:</span>{" "}
          ₹{property.price?.toLocaleString()}
        </p>

        {/* DESCRIPTION */}
        <h2 className="text-2xl font-semibold mt-4">Description</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          {property.description}
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-4 mt-6">
        <Link
          to={`/property/edit/${property._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg shadow"
        >
          Edit Property
        </Link>

        <button
          onClick={() => window.history.back()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
