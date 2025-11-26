import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProperty() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    size: "",
    bhk: "",
    type: "",
    price: "",
    imageURL: "",
  });

  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fix for backend/external image
  const getImageURL = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${API}${url}`;
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API}/api/property/${id}`);
        const data = await res.json();

        setForm({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          size: data.size || "",
          bhk: data.bhk || "",
          type: data.type || "",
          price: data.price || "",
          imageURL: data.images?.[0]?.url || "",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    const body = {
      ...form,
      images: [
        {
          url: form.imageURL,
          filename: form.imageURL.split("/").pop(),
          version: 1,
        }
      ]
    };

    const res = await fetch(`${API}/api/property/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      alert("Updated Successfully");
      navigate(`/property/${id}`);
    } else {
      alert("Failed to update");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl border">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">
        Edit Property
      </h2>

      <form onSubmit={submit} className="space-y-6">

        {/* FORM FIELD */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Title</label>
          <input
            name="title"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            className="w-full border rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-blue-400"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        {/* LOCATION */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Location</label>
          <input
            name="location"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={form.location}
            onChange={handleChange}
          />
        </div>

        {/* SIZE + BHK */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-semibold text-gray-700">Size</label>
            <input
              name="size"
              type="text"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={form.size}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-gray-700">BHK</label>
            <input
              name="bhk"
              type="number"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
              value={form.bhk}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* TYPE */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Type</label>
          <input
            name="type"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={form.type}
            onChange={handleChange}
          />
        </div>

        {/* PRICE */}
        <div className="space-y-1">
          <label className="font-semibold text-gray-700">Price</label>
          <input
            name="price"
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        {/* SINGLE IMAGE */}
        <div className="space-y-2">
          <label className="font-semibold text-gray-700">
            Property Image (Only One)
          </label>

          {form.imageURL && (
            <img
              src={getImageURL(form.imageURL)}
              className="h-44 w-full object-cover rounded-lg border"
            />
          )}

          <input
            name="imageURL"
            placeholder="Enter image URL or /uploads/file.jpg"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400"
            value={form.imageURL}
            onChange={handleChange}
          />
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
