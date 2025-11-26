import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddLease() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [tenants, setTenants] = useState([]);
  const [properties, setProperties] = useState([]);

  const [form, setForm] = useState({
    tenantId: "",
    propertyId: "",
    startDate: "",
    endDate: "",
    rentAmount: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/tenants`)
      .then((res) => res.json())
      .then((data) => setTenants(data));

    fetch(`${API}/api/property/all`)
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    try {
      const res = await fetch(`${API}/api/leases/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tenant: form.tenantId,
          property: form.propertyId,
          startDate: form.startDate,
          endDate: form.endDate,
          rentAmount: form.rentAmount,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg({ type: "success", text: "Lease created successfully!" });

      setForm({
        tenantId: "",
        propertyId: "",
        startDate: "",
        endDate: "",
        rentAmount: "",
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

        <h1 className="text-3xl font-bold mb-4">Create New Lease</h1>

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
                    {t.name} ({t.email})
                  </option>
                ))}
              </select>

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
                    {p.title} – {p.location}
                  </option>
                ))}
              </select>

              <Input
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
                required
              />

              <Input
                name="endDate"
                type="date"
                value={form.endDate}
                onChange={handleChange}
                required
              />

              <Input
                name="rentAmount"
                type="number"
                placeholder="Monthly Rent (₹)"
                value={form.rentAmount}
                onChange={handleChange}
                required
              />

              <Button className="w-full" disabled={loading}>
                {loading ? "Creating..." : "Create Lease"}
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
