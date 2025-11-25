import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!property)
    return <p className="text-center mt-10">Property not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
      <p className="text-gray-600 mb-4">{property.location}</p>

      {/* Image Carousel */}
      {property.images && property.images.length > 0 ? (
        <div className="w-full mb-6">
          <img
            src={`${API}${property.images[0].url}`}
            alt="Property"
            className="w-full h-80 object-cover rounded"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-3 overflow-x-auto">
            {property.images.map((img, idx) => (
              <img
                key={idx}
                src={`${API}${img.url}`}
                className="h-24 w-32 object-cover rounded cursor-pointer border"
                onClick={() => {
                  // change main image by reordering array
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
        <div className="h-40 bg-gray-200 rounded flex items-center justify-center">
          No Images
        </div>
      )}

      {/* Info Section */}
      <div className="bg-white shadow rounded p-5 space-y-3">
        <p>
          <span className="font-semibold">BHK:</span> {property.bhk}
        </p>
        <p>
          <span className="font-semibold">Type:</span> {property.type}
        </p>
        <p>
          <span className="font-semibold">Size:</span> {property.size} sqft
        </p>
        <p>
          <span className="font-semibold">Price:</span> ₹{property.price}
        </p>

        <h2 className="text-xl font-semibold mt-4">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>
      <Link
        to={`/property/edit/${property._id}`}
        className="bg-yellow-500 text-white px-4 py-2 rounded inline-block mt-4"
      >
        Edit Property
      </Link>

      {/* Back Button */}
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => window.history.back()}
      >
        ← Back
      </button>
    </div>
  );
}
