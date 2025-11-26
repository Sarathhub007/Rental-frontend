import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Loader2 } from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
    >
      <h2 className="text-3xl font-semibold mb-6">Rent Price Predictor</h2>

      <Card className="shadow-xl rounded-2xl">
        <CardContent className="space-y-4 p-6">
          <Input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
          />

          <Input
            name="sqft"
            placeholder="Square feet"
            value={form.sqft}
            onChange={handleChange}
          />

          <Input
            name="bhk"
            placeholder="BHK (1/2/3)"
            value={form.bhk}
            onChange={handleChange}
          />

          <Input
            name="furnishing"
            placeholder="Furnishing (furnished / semifurnished / none)"
            value={form.furnishing}
            onChange={handleChange}
          />

          <Button onClick={handlePredict} disabled={loading} className="w-full">
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Predicting…
              </div>
            ) : (
              "Predict Rent"
            )}
          </Button>
        </CardContent>
      </Card>

      {price !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 p-4 bg-white shadow-md rounded-xl border-l-4 border-blue-600"
        >
          <b>Estimated Rent: </b>
          {typeof price === "number" ? `₹ ${price}` : price}
        </motion.div>
      )}

      {error && (
        <div className="mt-3 text-red-600 font-medium text-lg">{error}</div>
      )}
    </motion.div>
  );
}
