import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Loader } from "lucide-react";

export default function AddTenant() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [properties, setProperties] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    propertyId: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  // Fetch available properties
  useEffect(() => {
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
      const res = await fetch(`${API}/api/tenants/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMsg({ type: "success", text: "Tenant added successfully!" });
      setForm({ name: "", email: "", phone: "", address: "", propertyId: "" });

    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-BG py-10 px-4">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold mb-4">Add New Tenant</h1>

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

              <Input
                name="name"
                placeholder="Tenant name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <Input
                name="email"
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <Input
                name="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <Textarea
                name="address"
                placeholder="Tenant address"
                value={form.address}
                onChange={handleChange}
                required
              />

              {/* Property dropdown */}
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

              <Button className="w-full" disabled={loading}>
                {loading ? (
                  <Loader className="animate-spin" size={20} />
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus size={18} /> Add Tenant
                  </span>
                )}
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
