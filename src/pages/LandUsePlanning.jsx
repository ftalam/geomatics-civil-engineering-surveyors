import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import architectureImg from "@/assets/architecture.jpg";

const LandUsePlanning = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to Services"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <h1 className="text-4xl font-bold mb-6">Land-Use Planning</h1>

          <p className="text-lg text-muted-foreground mb-8">
            Land-use planning guides how land is allocated and developed over time.
            It supports sustainable growth, environmental protection, and efficient
            infrastructure investment.
          </p>

          <img
            src={architectureImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Land-use planning"
          />

          <h2 className="text-2xl font-semibold mb-4">What’s Included</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Existing land-use assessments and constraints mapping</li>
            <li>Zoning proposals and development guidance</li>
            <li>Infrastructure and mobility considerations</li>
            <li>Implementation frameworks and monitoring indicators</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need a Land-Use Plan?</h3>
            <p className="text-muted-foreground mb-4">
              Contact us for data-driven land-use planning support.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg"
            >
              Request Service
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandUsePlanning;
