import Layout from "@/components/Layout.jsx";
import SectionHeader from "@/components/SectionHeader";
import { Mountain, MapPinned, HardHat, Plane, Globe, LayoutGrid, Trees, Building2, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import TopographicSurvey from "@/pages/TopographicSurvey";

<Route path="/services/topographic-surveys" element={<TopographicSurvey />} />

const services = [
    {
    id: "uav-mapping",  
    title: "UAV-Based Mapping",
    description: "Drone-powered aerial surveys for rapid and accurate terrain mapping.",
    details: "Our UAV-based mapping services utilize cutting-edge drone technology to provide rapid and accurate terrain data for a variety of applications.",
    media: [],
    type: "image",
    icon: Plane,
  },
  {
    id: "topographic-surveys",
    title: "Topographic Surveys",
    description: "Detailed terrain mapping and elevation data for project planning and design.",
    details: "Our topographic surveying services provide detailed terrain data for a variety of applications.",
    media: [],
    type: "image",
    icon: Mountain,
  },
  {
    id: "cadastral-surveys",
    title: "Land (Cadastral) Surveys",
    description: "Boundary determination, subdivision and land ownership documentation.",
    details: "Our cadastral surveying services provide accurate boundary determination and land ownership documentation for a variety of applications.",
    media: [],
    type: "image",icon: MapPinned,
  },
  {
    id: "engineering-surveys",
    title: "Engineering Surveys",
    description: "High-precision surveys for infrastructure and construction projects.",
      details: "Our engineering surveying services provide high-precision data for infrastructure and construction projects.",
    media: [],
    type: "image",
    icon: HardHat,
  },
  {
    id: "geotechnical-surveys",
    title: "Geotechnical Surveys",
    description: "Subsurface investigations and soil analysis for construction structures",
    details: "Our geotechnical surveying services provide subsurface investigations and soil analysis for construction structures.",
    media: [],
    type: "image",
    icon: Globe,
  },
  {
    id: "gis-remote-sensing",
    title: "GIS & Remote Sensing",
    description: "Spatial data analysis, management, and presentation using GIS technology.",
    details: "Our GIS and remote sensing services provide comprehensive spatial data analysis and visualization for a variety of applications.",
    media: [],
    type: "image",
    icon: Globe,
  },
  {
    id: "spatial-planning",
    title: "Spatial Planning",
    description: "Strategic spatial analysis and planning for sustainable development.",
    details: "Our spatial planning services provide strategic analysis and planning for sustainable development projects.",
    media: [],
    type: "image",
    icon: LayoutGrid,
  },
  {
    id: "land-use-planning",
    title: "Land-Use Planning",
    description: "Optimal land allocation and use strategies for communities and projects.",
    details: "Our land-use planning services provide optimal land allocation and use strategies for communities and projects.",
    media: [],
    type: "image",
    icon: Trees,
  },
  {
    id: "urban-regional-planning",
    title: "Urban & Regional Planning",
    description: "Comprehensive planning solutions for urban and regional development.",
    details: "Our urban and regional planning services provide comprehensive solutions for sustainable development in urban and regional contexts.",
    media: [],
    type: "image",
    icon: Building2,
  },
  {
    id: "equipment-supply-training",
    title: "Equipment Supply & Training",
    description: "Sales, calibration, and training on professional surveying equipment.",
    details: "Our equipment supply and training services provide sales, calibration, and training on professional surveying equipment for a variety of applications.",
    media: [],
    type: "image",
    icon: Wrench,
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
const location = useLocation();

useEffect(() => {
  if (location.hash) {
    const id = location.hash.replace("#", "");
    const found = services.find((s) => s.id === id);
    if (found) setSelectedService(found);
  }
}, [location]);
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Services"
            title="Professional Surveying & Consulting"
            description="Comprehensive surveying and geomatics services tailored to your projects."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                id={service.id}
                key={service.id}
                onClick={() => setSelectedService(service)}
                className="cursor-pointer rounded-2xl bg-card/60 border border-border/60 p-6 hover:border-accent hover:shadow-glow transition-all hover:scale-[1.02]"
               >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
         <AnimatePresence>
            {selectedService && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Modal */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 40 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 40 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-card rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-border"
                >
                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setSelectedService(null)}
                    className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black text-white w-10 h-10 rounded-full"
                  >
                    ✕
                  </button>
                   {/* CONTENT */}
                  <div className="p-8">
                    <h2 className="text-3xl font-bold mb-3">
                      {selectedService.title}
                    </h2>

                    <p className="text-muted-foreground leading-relaxed">
                      {selectedService.details}
                    </p>

                  {/* MEDIA */}
                  <div className="w-full h-72 bg-black">
                    {selectedService.type === "image" && (
                      <img
                        src={selectedService.media}
                        className="w-full h-full object-cover"
                      />
                    )}

                    {selectedService.type === "video" && (
                      <video
                        src={selectedService.media}
                        controls
                        autoPlay
                        className="w-full h-full object-cover"
                      />
                    )}

                    {selectedService.type === "youtube" && (
                      <iframe
                        src={selectedService.media}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    )}
                  </div>

                    {/* CTA */}
                    <div className="mt-3">
                      <Link
                        to="/contact"
                        className="inline-block bg-gray-600 text-white px-6 py-1 rounded-xl hover:opacity-90 transition"
                      >
                        Request This Service
                      </Link>
                    </div>
                  </div>
                </motion.div>

                {/* CLICK OUTSIDE */}
                <div
                  className="absolute inset-0"
                  onClick={() => setSelectedService(null)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
