import  { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function Starting() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/home");
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
            Welcome to RentalHub
          </h1>

          <p className="text-lg text-gray-700 mb-8">
            Manage properties, tenants, and rentals — all in one place.
          </p>

          {!isSignedIn && (
            <Link
              to="/sign-in"
              className="px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
          )}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Property Management",
                desc: "Effortlessly manage your properties and track tenants.",
              },
              {
                title: "Rental Listings",
                desc: "Browse a wide range of rental properties to find your match.",
              },
              {
                title: "Tenant/Owner Management",
                desc: "Connect with property owners or tenants easily.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 text-center text-sm text-gray-500 border-t bg-white">
        © {new Date().getFullYear()} RentalHub. All rights reserved.
      </footer>
    </div>
  );
}
