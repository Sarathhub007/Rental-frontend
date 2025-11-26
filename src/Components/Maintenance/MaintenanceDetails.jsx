import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

export default function MaintenanceDetails() {
  const { id } = useParams();
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [m, setM] = useState(null);

  const fetchData = () => {
    fetch(`${API}/api/maintenance/${id}`)
      .then((res) => res.json())
      .then((data) => setM(data));
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const updateStatus = async (status) => {
    await fetch(`${API}/api/maintenance/status/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    fetchData();
  };

  if (!m) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Maintenance Details</h1>

      <Card>
        <CardContent className="p-6 space-y-3">
          <p>
            <b>Category:</b> {m.category}
          </p>
          <p>
            <b>Description:</b> {m.description}
          </p>
          <p>
            <b>Risk:</b> {m.risk}
          </p>
          <p>
            <b>Status:</b> {m.status}
          </p>

          <div className="flex gap-3 mt-5">
            <Button onClick={() => updateStatus("Pending")} variant="outline">
              Pending
            </Button>
            <Button
              onClick={() => updateStatus("In Progress")}
              variant="secondary"
            >
              In Progress
            </Button>
            <Button
              onClick={() => updateStatus("Completed")}
              className="bg-green-600 text-white"
            >
              Completed
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
