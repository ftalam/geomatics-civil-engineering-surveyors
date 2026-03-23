import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import gnssImg from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";

const GeodeticGpsControl = () => {
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

          <h1 className="text-4xl font-bold mb-6">
            Geodetic GPS Control: Strong Foundations for Accurate Projects
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Geodetic control provides the reference framework that ties mapping and
            engineering measurements to consistent coordinates and elevations. It is
            essential for corridor projects, large developments, and national grid
            integration.
          </p>

          <img
            src={gnssImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="GNSS geodetic control"
          />

          <h2 className="text-2xl font-semibold mb-4">What We Provide</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Control network design and monumentation guidance</li>
            <li>Static GNSS observations and network adjustments</li>
            <li>RTK/CORS workflows for densification and construction support</li>
            <li>Vertical control integration where applicable</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Deliverables</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Coordinates and heights with quality statistics</li>
            <li>Control diagrams / station descriptions</li>
            <li>Observation logs and adjustment summaries</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need Geodetic Control?</h3>
            <p className="text-muted-foreground mb-4">
              Talk to us about establishing or verifying control networks for your
              project area.
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

export default GeodeticGpsControl;
