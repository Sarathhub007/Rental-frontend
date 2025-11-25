import { useState } from "react";
import { Upload, X, CheckCircle, AlertCircle } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    size: "",
    bhk: "",
    type: "Apartment",
    price: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle images
  const handleFile = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (!form.title || !form.location || !form.price || !form.bhk || images.length === 0) {
        throw new Error("Please fill all required fields and upload at least one image.");
      }

      const fd = new FormData();
      Object.keys(form).forEach((key) => fd.append(key, form[key]));
      images.forEach((img) => fd.append("images", img));

      const response = await fetch(`${API}/api/property/add`, {
        method: "POST",
        body: fd,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setMessage({ type: "success", text: "Property added successfully!" });

      // Reset form
      setForm({
        title: "",
        description: "",
        location: "",
        size: "",
        bhk: "",
        type: "Apartment",
        price: "",
      });

      setImages([]);
      setPreviews([]);

      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          List Your Property
        </h1>
        <p className="text-gray-600 mb-10">
          Fill in the details below to publish your property.
        </p>

        {/* Success/Error Message */}
        {message && (
          <div className={`p-4 mb-6 rounded-lg flex gap-3 items-center ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}>
            {message.type === "success" ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <span>{message.text}</span>
          </div>
        )}

        {/* FORM */}
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <form onSubmit={submit} className="space-y-6">

              {/* Title */}
              <div>
                <label className="text-sm font-semibold">Title *</label>
                <Input
                  name="title"
                  placeholder="Modern 2BHK Apartment"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-semibold">Description</label>
                <Textarea
                  name="description"
                  placeholder="Describe the property…"
                  rows="4"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-semibold">Location *</label>
                <Input
                  name="location"
                  placeholder="Hyderabad, Gachibowli"
                  value={form.location}
                  onChange={handleChange}
                />
              </div>

              {/* Grid Inputs */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold">Size (sq ft)</label>
                  <Input
                    name="size"
                    type="number"
                    placeholder="1500"
                    value={form.size}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">BHK *</label>
                  <select
                    name="bhk"
                    className="border rounded-md p-2 w-full"
                    value={form.bhk}
                    onChange={handleChange}
                  >
                    <option value="">Select BHK</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5+ BHK</option>
                  </select>
                </div>
              </div>

              {/* Type + Price */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold">Property Type</label>
                  <select
                    name="type"
                    className="border rounded-md p-2 w-full"
                    value={form.type}
                    onChange={handleChange}
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="Villa">Villa</option>
                    <option value="Bungalow">Bungalow</option>
                    <option value="Land">Land</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-semibold">Price (₹) *</label>
                  <Input
                    name="price"
                    type="number"
                    placeholder="5000000"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-sm font-semibold">Upload Images *</label>

                <div className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:bg-blue-50 transition">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    id="property-images"
                    className="hidden"
                    onChange={handleFile}
                  />
                  <label htmlFor="property-images" className="cursor-pointer">
                    <Upload size={34} className="mx-auto text-blue-600 mb-2" />
                    <span className="font-medium">Click to upload images</span>
                  </label>
                </div>

                {/* Previews */}
                {previews.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previews.map((url, index) => (
                      <div key={index} className="relative rounded-lg overflow-hidden">
                        <img
                          src={url}
                          alt="preview"
                          className="h-32 w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded"
                          onClick={() => removeImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button
                className="w-full text-white font-semibold"
                disabled={loading}
              >
                {loading ? "Publishing..." : "Publish Property"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
