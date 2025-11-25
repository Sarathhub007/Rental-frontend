import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

// Dashboard component — default export
export default function Dashboard() {
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const [stats, setStats] = useState({
    totalProperties: 0,
    activeLeases: 0,
    activeTenants: 0,
    maintenanceOpen: 0,
    monthlyRentCollected: 0,
    trends: [], // expected: [{ month: 'Jan', rent: 120000 }, ...]
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API}/api/dashboard/stats`);
        if (!res.ok) throw new Error("Failed to fetch stats");
        const data = await res.json();
        if (!mounted) return;

        // graceful fallback mapping — keep keys stable for the UI
        setStats((prev) => ({
          totalProperties: data.totalProperties ?? prev.totalProperties,
          activeLeases: data.activeLeases ?? prev.activeLeases,
          activeTenants: data.activeTenants ?? prev.activeTenants,
          maintenanceOpen: data.maintenanceOpen ?? prev.maintenanceOpen,
          monthlyRentCollected: data.monthlyRentCollected ?? prev.monthlyRentCollected,
          trends: data.trends?.length ? data.trends : sampleTrends,
          recentActivity: data.recentActivity?.length ? data.recentActivity : sampleActivity,
        }));
      } catch (err) {
        // silent fallback to sample data
        setStats((prev) => ({
          ...prev,
          trends: sampleTrends,
          recentActivity: sampleActivity,
        }));
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Overview of properties, leases and maintenance.</p>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        </div>

        {/* Top cards */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatCard label="Total Properties" value={stats.totalProperties} loading={loading} />
          <StatCard label="Active Leases" value={stats.activeLeases} loading={loading} />
          <StatCard label="Active Tenants" value={stats.activeTenants} loading={loading} />
          <StatCard label="Maintenance Open" value={stats.maintenanceOpen} loading={loading} />
        </motion.div>

        {/* Charts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="lg:col-span-2">
            <CardContent>
              <h2 className="text-lg font-semibold mb-3">Monthly Rent Collected</h2>

              <div style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer>
                  <LineChart data={stats.trends} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="rent" stroke="#2563eb" strokeWidth={3} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">This month</div>
                  <div className="text-2xl font-bold">₹{(stats.monthlyRentCollected || 0).toLocaleString()}</div>
                </div>

                <div className="text-sm text-gray-600">Updated: {new Date().toLocaleString()}</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

              <div className="space-y-3">
                {stats.recentActivity.length === 0 ? (
                  <div className="text-sm text-gray-500">No recent activity</div>
                ) : (
                  stats.recentActivity.slice(0, 6).map((a, i) => (
                    <div key={i} className="p-2 rounded hover:bg-slate-50">
                      <div className="text-sm text-gray-700">{a.title}</div>
                      <div className="text-xs text-gray-500">{a.time}</div>
                    </div>
                  ))
                )}
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Small KPIs row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <MiniKPI title="Rent Collected (YTD)" value={`₹${((stats.trends || []).reduce((s, x) => s + (x.rent || 0), 0)).toLocaleString()}`} />
          <MiniKPI title="Vacant Properties" value={Math.max(0, (stats.totalProperties || 0) - (stats.activeLeases || 0))} />
          <MiniKPI title="Avg Rent / Property" value={`₹${Math.round(((stats.monthlyRentCollected || 0) / Math.max(1, stats.totalProperties || 1))).toLocaleString()}`} />
        </div>

      </div>
    </div>
  );
}

/* ------------------ Small helper components ------------------ */

function StatCard({ label, value, loading }) {
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-2xl font-bold mt-1">{loading ? "—" : value}</div>
          </div>
          <div className="text-blue-600 text-3xl font-extrabold">{!loading && label === "Active Leases" ? "📄" : ""}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function MiniKPI({ title, value }) {
  return (
    <Card>
      <CardContent>
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-lg font-semibold mt-1">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ------------------ Sample fallback data ------------------ */
const sampleTrends = [
  { month: "Jan", rent: 120000 },
  { month: "Feb", rent: 95000 },
  { month: "Mar", rent: 125000 },
  { month: "Apr", rent: 110000 },
  { month: "May", rent: 98000 },
  { month: "Jun", rent: 135000 },
  { month: "Jul", rent: 128000 },
  { month: "Aug", rent: 142000 },
  { month: "Sep", rent: 150000 },
  { month: "Oct", rent: 160000 },
  { month: "Nov", rent: 155000 },
  { month: "Dec", rent: 170000 },
];

const sampleActivity = [
  { title: "Lease created: Rahul → Greenfield Apt", time: "2 hours ago" },
  { title: "Maintenance: Water pipe fixed (Villa 12)", time: "1 day ago" },
  { title: "Tenant added: Priya Sharma", time: "2 days ago" },
  { title: "Property listed: Sea-view Penthouse", time: "3 days ago" },
];
