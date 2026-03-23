import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";

const EquipmentSupplyTraining = () => {
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

          <h1 className="text-4xl font-bold mb-6">Equipment Supply & Training</h1>

          <p className="text-lg text-muted-foreground mb-8">
            We help teams select the right surveying equipment and build confidence
            using it. From supply to onboarding and continued support, we keep your
            workflows productive and accurate.
          </p>

          <img
            src={totalStationImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Survey equipment supply and training"
          />

          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Equipment selection and supply (GNSS, total stations, UAV platforms)</li>
            <li>Configuration and workflow setup</li>
            <li>Field training and best-practice guidance</li>
            <li>After-sales support and troubleshooting</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">
              Need Equipment or Training?
            </h3>
            <p className="text-muted-foreground mb-4">
              Contact us for equipment recommendations, onboarding, and training.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg"
              >
                Request Service
              </Link>
              <Link
                to="/geoshop"
                className="inline-block bg-card text-foreground px-6 py-3 rounded-lg border"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EquipmentSupplyTraining;
