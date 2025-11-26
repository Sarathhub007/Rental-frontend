import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Link } from "react-router-dom";
import { Wrench, Loader } from "lucide-react";

export default function MaintenanceList() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusBadge = (s) => {
    if (s === "Pending")
      return (
        <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full">
          Pending
        </span>
      );

    if (s === "In Progress")
      return (
        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
          In Progress
        </span>
      );

    return (
      <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full">
        Completed
      </span>
    );
  };

  useEffect(() => {
    fetch(`${API}/api/maintenance`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <Loader className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="min-h-screen bg-brand-BG py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Maintenance Requests</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((m) => (
            <Link to={`/maintenance/${m._id}`} key={m._id}>
              <Card className="hover:shadow-xl transition">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <Wrench className="text-blue-600" />
                    <h2 className="text-lg font-semibold">{m.category}</h2>
                  </div>

                  <p className="text-gray-700">
                    {m.description.slice(0, 60)}...
                  </p>

                  <p className="text-sm text-gray-500">Risk: {m.risk}</p>

                  {statusBadge(m.status)}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
