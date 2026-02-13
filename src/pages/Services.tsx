import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";

const services = [
  "Land Surveys",
  "Engineering Surveys",
  "GIS",
  "Mapping",
  "Physical Planning",
  "Environmental Consultants",
  "Topographic Mapping",
  "Land Use Planning",
];

const Services = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Services"
            title="Professional Surveying & Consulting"
            description="Land Surveys • Engineering Surveys • GIS • Mapping • Physical Planning • Environmental Consultants"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service}
                className="rounded-2xl bg-card/60 border border-border/60 p-6 hover:border-accent hover:shadow-glow transition-shadow transition-colors"
              >
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {service}
                </h3>
                <p className="text-muted-foreground text-sm">
                  Tailored {service.toLowerCase()} solutions delivered with precision and
                  professionalism to support your projects from planning through
                  implementation.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;