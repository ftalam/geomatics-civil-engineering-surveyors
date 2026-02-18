import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Mountain, MapPinned, HardHat, Satellite, Plane, Globe, LayoutGrid, Trees, Building2, Wrench } from "lucide-react";

const services = [
  {
    title: "Topographic Surveys",
    description: "Detailed terrain mapping and elevation data for project planning and design.",
    icon: Mountain,
  },
  {
    title: "Land (Cadastral) Surveys",
    description: "Boundary determination, subdivision, and land ownership documentation.",
    icon: MapPinned,
  },
  {
    title: "Engineering Surveys",
    description: "High-precision surveys for infrastructure and construction projects.",
    icon: HardHat,
  },
  {
    title: "Geodetic GPS Control",
    description: "CORS Network-based geodetic control surveys for large-scale projects.",
    icon: Satellite,
  },
  {
    title: "UAV-Based Mapping",
    description: "Drone-powered aerial surveys for rapid and accurate terrain mapping.",
    icon: Plane,
  },
  {
    title: "GIS & Remote Sensing",
    description: "Spatial data analysis, management, and presentation using GIS technology.",
    icon: Globe,
  },
  {
    title: "Spatial Planning",
    description: "Strategic spatial analysis and planning for sustainable development.",
    icon: LayoutGrid,
  },
  {
    title: "Land-Use Planning",
    description: "Optimal land allocation and use strategies for communities and projects.",
    icon: Trees,
  },
  {
    title: "Urban & Regional Planning",
    description: "Comprehensive planning solutions for urban and regional development.",
    icon: Building2,
  },
  {
    title: "Equipment Supply & Training",
    description: "Sales, calibration, and training on professional surveying equipment.",
    icon: Wrench,
  },
];

const Services = () => {
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
                key={service.title}
                className="rounded-2xl bg-card/60 border border-border/60 p-6 hover:border-accent hover:shadow-glow transition-shadow transition-colors"
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
        </div>
      </section>
    </Layout>
  );
};

export default Services;