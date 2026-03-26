import Layout from "@/components/Layout.jsx";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/data/services";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <Layout>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Services"
             title={
                <>
                Professional{" "}
                <Link
                  to="/surveying"
                  className="hover:text-primary decoration-primary/60"
                >
                  Surveying
                </Link>{" "}
                & Consulting
                </>
             }
            description="Comprehensive surveying and geomatics services tailored to your projects."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                id={service.id}
                to={`/services/${service.id}`}
                className="group cursor-pointer rounded-2xl bg-card/60 border border-border/60 p-6 hover:border-accent hover:shadow-glow transition-all hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                    <div className="mt-3 inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
