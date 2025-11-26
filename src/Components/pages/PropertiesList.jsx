import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, DoorOpen, Loader, Search } from "lucide-react";

import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Separator } from "@/Components/ui/separator";

export default function PropertiesList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
    bhk: "all",
  });

  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${API}/api/property/all`)
      .then((res) => res.json())
      .then((data) => setProperties(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = properties.filter((p) => {
    const matchesSearch =
      filter.search === "" ||
      p.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      p.location.toLowerCase().includes(filter.search.toLowerCase());

    const matchesPrice =
      (!filter.minPrice || p.price >= parseInt(filter.minPrice)) &&
      (!filter.maxPrice || p.price <= parseInt(filter.maxPrice));

    const matchesBhk = filter.bhk === "all" || p.bhk == filter.bhk;

    return matchesSearch && matchesPrice && matchesBhk;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-600 font-medium">Loading properties...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">All Properties</h1>
          <p className="text-gray-600 mt-1">
            Browse through verified property listings
          </p>
        </div>

        <Card className="mb-10">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center gap-3">
              <Search className="text-gray-600" />
              <Input
                placeholder="Search by title or location…"
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
              />
            </div>

            <Separator />

            {/* Price + BHK */}
            <div className="grid md:grid-cols-3 gap-4">
              <Input
                type="number"
                placeholder="Min Price"
                value={filter.minPrice}
                onChange={(e) =>
                  setFilter({ ...filter, minPrice: e.target.value })
                }
              />

              <Input
                type="number"
                placeholder="Max Price"
                value={filter.maxPrice}
                onChange={(e) =>
                  setFilter({ ...filter, maxPrice: e.target.value })
                }
              />

              <select
                className="border rounded-md p-2 bg-white"
                value={filter.bhk}
                onChange={(e) => setFilter({ ...filter, bhk: e.target.value })}
              >
                <option value="all">All BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4+ BHK</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No results found
            </h2>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((p) => (
              <Link to={`/property/${p._id}`} key={p._id} className="group">
                <Card className="overflow-hidden shadow-md hover:shadow-xl transition rounded-xl">
                  <div className="h-48 w-full overflow-hidden">
                    {p.images?.length ? (
                      <img
                        src={
                          p.images[0]?.url.startsWith("http")
                            ? p.images[0].url
                            : `${API}${p.images[0].url}`
                        }
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                    ) : (
                      <div className="h-full bg-gray-300 flex items-center justify-center text-white">
                        No Image
                      </div>
                    )}
                  </div>

                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
                      {p.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mt-2">
                      <MapPin size={16} className="text-blue-600" />
                      {p.location}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-bold text-blue-600">
                        ₹{p.price.toLocaleString()}
                      </span>

                      <div className="flex items-center gap-1 text-gray-700">
                        <DoorOpen size={16} className="text-blue-600" />
                        <span className="font-medium">{p.bhk} BHK</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {/* RESULT COUNT */}
        <p className="text-center text-gray-600 mt-10 font-medium">
          Showing {filtered.length} of {properties.length} properties
        </p>
      </div>
    </div>
  );
}
