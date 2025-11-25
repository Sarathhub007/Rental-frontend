import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function TenantDetails() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [tenant, setTenant] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/tenants/${id}`)
      .then((res) => res.json())
      .then((data) => setTenant(data));
  }, [id]);

  if (!tenant)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

      <Card>
        <CardContent className="p-6 space-y-4">

          <h1 className="text-3xl font-bold">{tenant.name}</h1>

          <p><b>Email:</b> {tenant.email}</p>
          <p><b>Phone:</b> {tenant.phone}</p>
          <p><b>Address:</b> {tenant.address}</p>

          <p>
            <b>Linked Property:</b>{" "}
            {tenant.propertyId ? (
              <span className="text-blue-600 font-semibold">Assigned</span>
            ) : (
              "Not Assigned"
            )}
          </p>

        </CardContent>
      </Card>

    </div>
  );
}
