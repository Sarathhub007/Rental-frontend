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
  });

  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}/api/property/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Edit Property</h2>

      <form onSubmit={submit} className="space-y-4">

        <div>
          <label className="font-semibold">Title</label>
          <input name="title" className="input" value={form.title} onChange={handleChange} />
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea name="description" className="textarea" value={form.description} onChange={handleChange} />
        </div>

        <div>
          <label className="font-semibold">Location</label>
          <input name="location" className="input" value={form.location} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Size</label>
            <input name="size" type="number" className="input" value={form.size} onChange={handleChange} />
          </div>

          <div>
            <label className="font-semibold">BHK</label>
            <input name="bhk" type="number" className="input" value={form.bhk} onChange={handleChange} />
          </div>
        </div>

        <div>
          <label className="font-semibold">Type</label>
          <input name="type" className="input" value={form.type} onChange={handleChange} />
        </div>

        <div>
          <label className="font-semibold">Price</label>
          <input name="price" type="number" className="input" value={form.price} onChange={handleChange} />
        </div>

        <button className="btn w-full">Save Changes</button>
      </form>
    </div>
  );
}
