import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import renewableImg from "@/assets/renewable-energy.jpg";

const SpatialPlanning = () => {
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

          <h1 className="text-4xl font-bold mb-6">Spatial Planning</h1>

          <p className="text-lg text-muted-foreground mb-8">
            Spatial planning helps align land potential, constraints, infrastructure,
            and stakeholder priorities into implementable development strategies.
          </p>

          <img
            src={renewableImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Spatial planning"
          />

          <h2 className="text-2xl font-semibold mb-4">Key Focus Areas</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Constraints and opportunities mapping</li>
            <li>Suitability analysis and scenario evaluation</li>
            <li>Infrastructure and service accessibility analysis</li>
            <li>Evidence-based recommendations for implementation</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need Spatial Planning?</h3>
            <p className="text-muted-foreground mb-4">
              Let’s discuss how spatial analysis can support your project or program.
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

export default SpatialPlanning;
