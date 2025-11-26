import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Ruler,
  Users,
  Home,
  BadgeDollarSign,
  ArrowLeft,
} from "lucide-react";

import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { motion } from "framer-motion";

export default function Explore() {
  const { propertyId } = useParams();

  const propertyDetails = [
    {
      id: 1,
      name: "Greenfield Residential Plot",
      location: "Hyderabad",
      type: "Land",
      size: "2400 sq ft",
      price: "$500,000",
      rental: "N/A",
      description:
        "A spacious residential plot located in a peaceful green neighbourhood. Ideal for constructing your dream home.",
      owner: {
        name: "Rajesh Kumar",
        contact: "9876543210",
        email: "rajesh.kumar@example.com",
      },
    },
    {
      id: 2,
      name: "Modern Duplex Villa",
      location: "Bangalore",
      type: "Villa",
      size: "3000 sq ft",
      price: "$600,000",
      rental: "$2,000/month",
      description:
        "A luxurious modern villa with excellent ventilation, premium amenities, and wide living spaces.",
      owner: {
        name: "Anita Sharma",
        contact: "8765432109",
        email: "anita.sharma@example.com",
      },
    },
    {
      id: 3,
      name: "Luxury Smart Home",
      location: "Mumbai",
      type: "Smart Home",
      size: "3500 sq ft",
      price: "$700,000",
      rental: "$3,000/month",
      description:
        "A technologically advanced smart home equipped with automated features and top-notch security.",
      owner: {
        name: "Vikram Singh",
        contact: "7654321098",
        email: "vikram.singh@example.com",
      },
    },
  ];

  const property = propertyDetails.find((p) => p.id === parseInt(propertyId));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🏚️</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Property Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>

          <Link to="/properties">
            <Button className="gap-2">
              <ArrowLeft size={18} /> Back to Properties
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto space-y-10"
      >
        {/* BACK BUTTON */}
        <Link
          to="/properties"
          className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
        >
          <ArrowLeft size={18} /> Back to Properties
        </Link>

        {/* HEADER CARD */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="shadow-lg rounded-2xl hover:shadow-xl transition">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900">
                    {property.name}
                  </h1>
                  <div className="mt-3 flex items-center gap-2 text-gray-600">
                    <MapPin size={20} className="text-blue-600" />
                    <span className="text-lg">{property.location}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600">Price</p>
                  <p className="text-4xl font-bold text-blue-600">
                    {property.price}
                  </p>
                </div>
              </div>

              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mt-6">
                {property.type}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* DETAILS GRID */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* PROPERTY DETAILS */}
          <Card className="shadow-md rounded-2xl">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Property Details
              </h2>

              <DetailItem
                icon={<Ruler size={24} className="text-blue-600" />}
                label="Size"
                value={property.size}
              />

              <DetailItem
                icon={<Home size={24} className="text-blue-600" />}
                label="Type"
                value={property.type}
              />

              <DetailItem
                icon={<BadgeDollarSign size={24} className="text-blue-600" />}
                label="Rental Value"
                value={property.rental}
              />
            </CardContent>
          </Card>

          {/* OWNER INFO */}
          <Card className="shadow-md rounded-2xl">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Owner Information
              </h2>

              <DetailItem
                icon={<Users size={24} className="text-emerald-600" />}
                label="Name"
                value={property.owner.name}
              />

              <DetailItem
                icon={<Phone size={24} className="text-emerald-600" />}
                label="Phone"
                value={
                  <a
                    href={`tel:${property.owner.contact}`}
                    className="text-xl font-semibold text-blue-600 hover:underline"
                  >
                    {property.owner.contact}
                  </a>
                }
              />

              <DetailItem
                icon={<Mail size={24} className="text-emerald-600" />}
                label="Email"
                value={
                  <a
                    href={`mailto:${property.owner.email}`}
                    className="text-xl font-semibold text-blue-600 hover:underline break-all"
                  >
                    {property.owner.email}
                  </a>
                }
              />

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4">
                Contact Owner
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="shadow-md rounded-2xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Description
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ---- Small Reusable Component ---- */
function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-blue-100 p-3 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
}
