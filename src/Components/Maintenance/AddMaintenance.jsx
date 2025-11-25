import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wrench, Loader } from "lucide-react";

export default function AddMaintenance() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  const [form, setForm] = useState({
    tenantId: "",
    propertyId: "",
    description: "",
    category: "",
    risk: "",
  });

  useEffect(() => {
    fetch(`${API}/api/tenant/all`)
      .then((res) => res.json())
      .then((data) => setTenants(data));

    fetch(`${API}/api/property/all`)
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const categorizeWithAI = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/ai/categorize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: form.description }),
      });

      const data = await res.json();

      setForm((prev) => ({
        ...prev,
        category: data.category,
        risk: data.risk,
      }));
    } catch (err) {
      console.error("AI error:", err);
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/maintenance/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg({ type: "success", text: "Maintenance request added!" });

      setForm({
        tenantId: "",
        propertyId: "",
        description: "",
        category: "",
        risk: "",
      });

    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-BG py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-3">Report Maintenance Issue</h1>
        <p className="text-gray-600 mb-6">Submit an issue and let us handle the rest.</p>

        {msg && (
          <div
            className={`p-3 rounded mb-4 ${
              msg.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <Card>
          <CardContent className="p-8">
            <form className="space-y-5" onSubmit={submit}>

              {/* Tenant */}
              <select
                name="tenantId"
                className="border p-2 rounded w-full"
                value={form.tenantId}
                onChange={handleChange}
                required
              >
                <option value="">Select Tenant</option>
                {tenants.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name}
                  </option>
                ))}
              </select>

              {/* Property */}
              <select
                name="propertyId"
                className="border p-2 rounded w-full"
                value={form.propertyId}
                onChange={handleChange}
                required
              >
                <option value="">Select Property</option>
                {properties.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.title}
                  </option>
                ))}
              </select>

              {/* Description */}
              <Textarea
                name="description"
                placeholder="Describe the issue..."
                rows="4"
                value={form.description}
                onChange={handleChange}
                required
              />

              {/* AI Button */}
              <Button
                type="button"
                variant="outline"
                onClick={categorizeWithAI}
                disabled={loading || !form.description}
              >
                {loading ? "Analyzing..." : "Categorize with AI"}
              </Button>

              {/* Category */}
              <Input
                name="category"
                placeholder="Issue category (auto-filled)"
                value={form.category}
                onChange={handleChange}
                required
              />

              {/* Risk */}
              <Input
                name="risk"
                placeholder="Risk level"
                value={form.risk}
                onChange={handleChange}
                required
              />

              {/* Submit */}
              <Button className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Issue"}
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
