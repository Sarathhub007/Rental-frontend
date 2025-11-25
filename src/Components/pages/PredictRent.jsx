import { useState } from "react";
export default function PredictRent() {
  const [form, setForm] = useState({
    location: "",
    sqft: "",
    bhk: "",
    furnishing: "",
  });
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handlePredict = async () => {
    setError("");
    setPrice(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || "http://localhost:5000"
        }/api/ai/predict-rent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) setPrice(data.price || data.raw || "N/A");
      else setError(data.error || "Prediction failed");
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Rent Price Predictor</h2>

      <div className="space-y-2">
        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="input"
        />
        <input
          name="sqft"
          placeholder="Square feet"
          value={form.sqft}
          onChange={handleChange}
          className="input"
        />
        <input
          name="bhk"
          placeholder="BHK"
          value={form.bhk}
          onChange={handleChange}
          className="input"
        />
        <input
          name="furnishing"
          placeholder="Furnishing (furnished/semifurnished/none)"
          value={form.furnishing}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="mt-4">
        <button onClick={handlePredict} className="btn" disabled={loading}>
          {loading ? "Predicting..." : "Predict Rent"}
        </button>
      </div>

      {price !== null && (
        <div className="mt-4">
          <b>Estimated Rent:</b>{" "}
          {typeof price === "number" ? `₹ ${price}` : price}
        </div>
      )}

      {error && <div className="mt-2 text-red-600">{error}</div>}
    </div>
  );
}
