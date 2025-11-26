import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";

export default function LeaseDetails() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [lease, setLease] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/leases/${id}`)
      .then((res) => res.json())
      .then((data) => setLease(data));
  }, [id]);

  if (!lease) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Lease Details</h1>

      <Card>
        <CardContent className="p-6 space-y-3">
          <p>
            <b>Tenant:</b> {lease.tenant?.name}
          </p>
          <p>
            <b>Property:</b> {lease.property?.title}
          </p>

          <p>
            <b>Start Date:</b> {lease.startDate?.slice(0, 10)}
          </p>
          <p>
            <b>End Date:</b> {lease.endDate?.slice(0, 10)}
          </p>

          <p>
            <b>Monthly Rent:</b> ₹{lease.rentAmount}
          </p>

          <p>
            <b>Status:</b>{" "}
            {lease.status === "Active" ? (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                Active
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                {lease.status}
              </span>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
