  import { Link } from "react-router-dom";
  import { motion } from "framer-motion";
  import {
    ArrowRight,
    Home as HomeIcon,
    DollarSign,
    MapPin,
    Calendar,
  } from "lucide-react";

  import { Button } from "@/components/ui/button";

  export default function Home() {
    const stats = [
      { icon: HomeIcon, label: "Total Properties", value: "5,000+" },
      { icon: DollarSign, label: "Total Investment", value: "$50M+" },
      { icon: MapPin, label: "Cities Covered", value: "100+" },
      { icon: Calendar, label: "Years of Service", value: "10+" },
    ];

    const properties = [
      {
        id: 1,
        imgSrc: "/mnt/data/72a41bdf-14e7-49e0-9195-e6253ab54615.png", 
        price: "$500,000",
        location: "Hyderabad",
        type: "Modern Apartment",
      },
      {
        id: 2,
        imgSrc: "/img-2.jpg",
        price: "$600,000",
        location: "Bangalore",
        type: "Luxury Villa",
      },
      {
        id: 3,
        imgSrc: "/img-3.jpg",
        price: "$700,000",
        location: "Mumbai",
        type: "Sea-view Penthouse",
      },
    ];

    const fadeUp = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900">
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Find your perfect property with{" "}
                <span className="text-blue-600">RentalHub</span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl">
                Explore verified listings, connect with owners, and make smarter
                real-estate decisions — all in one trusted platform.
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <Link to="/properties" aria-label="Explore properties">
                  <Button size="lg" className="flex items-center gap-2">
                    Explore Properties
                    <ArrowRight size={18} />
                  </Button>
                </Link>

                <Link to="/property/add" aria-label="List your property">
                  <Button variant="outline" size="lg" className="px-5">
                    List Your Property
                    <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="bg-white border rounded-lg p-3 text-center shadow-sm"
                    >
                      <Icon className="mx-auto text-blue-600" size={20} />
                      <div className="text-sm text-slate-600 mt-1">{s.label}</div>
                      <div className="text-lg font-semibold mt-1">{s.value}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
              aria-hidden="true"
            >
              <img
                src={properties[0].imgSrc}
                alt="Featured property"
                className="w-full h-80 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-3 text-slate-700 text-sm">
                  <MapPin size={16} className="text-blue-600" />
                  <span>{properties[0].location}</span>
                </div>

                <h3 className="text-2xl font-bold mt-3">{properties[0].type}</h3>
                <div className="text-xl font-semibold text-blue-600 mt-1">
                  {properties[0].price}
                </div>

                <div className="mt-4 flex gap-3">
                  <Link to={`/explore/${properties[0].id}`}>
                    <Button className="flex items-center gap-2">View Details</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="outline">Contact</Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURED PROPERTIES */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold">Featured Properties</h2>
                <p className="text-slate-600 mt-1">
                  Hand-picked properties for the best experience.
                </p>
              </div>

              <Link to="/properties" className="hidden sm:inline-block">
                <Button size="lg" className="flex items-center gap-2">
                  View All <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property, i) => (
                <motion.article
                  key={property.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition transform hover:-translate-y-1"
                >
                  <div className="h-56 overflow-hidden bg-slate-100">
                    <img
                      src={property.imgSrc}
                      alt={`${property.type} in ${property.location}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-slate-600 text-sm mb-1">
                      <MapPin size={14} className="text-blue-600" />
                      <span>{property.location}</span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">{property.type}</h3>
                    <div className="text-xl font-bold text-blue-600 mt-2">{property.price}</div>

                    <div className="mt-4 flex items-center gap-3">
                      <Link to={`/explore/${property.id}`} className="text-sm text-slate-700">
                        View Details
                      </Link>
                      <span className="text-sm text-slate-400">•</span>
                      <Link to="/contact" className="text-sm text-blue-600 font-medium">
                        Contact Owner
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* <div className="mt-8 sm:hidden text-center">
              <Link to="/properties">
                <Button size="lg" className="gap-2">
                  View All Properties <ArrowRight size={16} />
                </Button>
              </Link>
            </div> */}
          </div>
        </section>

       
        <section className="py-16 bg-white border-t">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl md:text-3xl font-bold">Ready to find your dream home?</h2>
              <p className="text-slate-600 mt-2 mb-6">
                Join thousands of satisfied renters and owners across India.
              </p>

              <div className="flex items-center justify-center gap-3">
                <Link to="/properties">
                  <Button size="lg" className="bg-blue-600 text-white">
                    Get Started
                  </Button>
                </Link>

                <Link to="/property/add">
                  <Button variant="outline" size="lg">
                    List Property
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
         <footer className="py-6 text-center text-slate-600">
          © {new Date().getFullYear()} RentalHub. All rights reserved.
        </footer>
      </div>
    );
  }
