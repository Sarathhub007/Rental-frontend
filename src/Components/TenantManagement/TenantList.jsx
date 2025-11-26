import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Search, UserRound, Loader } from "lucide-react";

export default function TenantList() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${API}/api/tenants`) // ✅ FIXED ROUTE
      .then((res) => res.json())
      .then((data) => setTenants(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = tenants.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-brand-BG py-10 px-4">

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Tenant List</h1>

        {/* Search */}
        <div className="flex items-center gap-3 mb-6">
          <Search />
          <Input
            placeholder="Search tenants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filtered.length === 0 ? (
          <p>No tenants found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <Link to={`/tenant/${t._id}`} key={t._id}>
                <Card className="hover:shadow-lg transition">
                  <CardContent className="p-6 space-y-2">

                    <div className="flex items-center gap-3">
                      <UserRound className="text-blue-600" />
                      <h2 className="text-xl font-semibold">{t.name}</h2>
                    </div>

                    <p className="text-gray-600">{t.email}</p>
                    <p className="text-gray-700 font-medium">{t.phone}</p>

                    <p className="text-sm text-gray-500 mt-2">
                      Property: {t.propertyId ? "Assigned" : "Not Assigned"}
                    </p>

                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
