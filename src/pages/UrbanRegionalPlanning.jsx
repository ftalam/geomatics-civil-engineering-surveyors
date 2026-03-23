import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import civilWorksImg from "@/assets/civil-works.jpg";

const UrbanRegionalPlanning = () => {
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

          <h1 className="text-4xl font-bold mb-6">Urban & Regional Planning</h1>

          <p className="text-lg text-muted-foreground mb-8">
            We support sustainable urban and regional development with planning
            frameworks that align policy, infrastructure, environmental safeguards,
            and community needs.
          </p>

          <img
            src={civilWorksImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Urban and regional planning"
          />

          <h2 className="text-2xl font-semibold mb-4">Planning Support</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Baseline studies and spatial analysis</li>
            <li>Growth scenarios and land allocation strategies</li>
            <li>Infrastructure and service planning inputs</li>
            <li>Implementation and development control guidance</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need Planning Support?</h3>
            <p className="text-muted-foreground mb-4">
              Reach out to discuss your urban or regional planning goals.
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

export default UrbanRegionalPlanning;
