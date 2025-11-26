import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";

export default function LeaseList() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [leases, setLeases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/leases`)
      .then((res) => res.json())
      .then((data) => setLeases(data))
      .finally(() => setLoading(false));
  }, []);

  const badge = (status) =>
    status === "Active" ? (
      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
        Active
      </span>
    ) : (
      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
        {status}
      </span>
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

        <h1 className="text-3xl font-bold mb-6">Lease Agreements</h1>

        {leases.length === 0 ? (
          <p>No leases found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {leases.map((l) => (
              <Link to={`/lease/${l._id}`} key={l._id}>
                <Card className="hover:shadow-lg transition">
                  <CardContent className="p-5 space-y-3">

                    <h2 className="text-xl font-semibold">
                      {l.tenant?.name || "Tenant"}
                    </h2>

                    <p className="text-gray-700 font-medium">
                      {l.property?.title || "Property"}
                    </p>

                    <p className="text-sm text-gray-500">
                      {l.startDate?.slice(0, 10)} → {l.endDate?.slice(0, 10)}
                    </p>

                    {badge(l.status)}

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
