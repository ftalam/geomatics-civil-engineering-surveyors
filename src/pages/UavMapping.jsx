import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import aidroneImg from "@/assets/AIDRONE.jpg";

const UavMapping = () => {
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
            UAV-Based Mapping: Fast, High-Resolution Aerial Data
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            UAV (drone) mapping delivers rapid coverage for orthophotos, terrain
            models, and 3D outputs. It’s ideal for progress monitoring, route
            selection, volumetrics, and large sites that need quick turnaround.
          </p>

          <img
            src={aidroneImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="UAV mapping"
          />

          <h2 className="text-2xl font-semibold mb-4">Typical Outputs</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Orthophotos and mosaics</li>
            <li>Point clouds and 3D meshes</li>
            <li>DEM/DSM and contours</li>
            <li>Volumes (cut/fill) and measurement reports</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Quality & Control</h2>
          <p className="mb-10 text-muted-foreground">
            We plan flights around accuracy needs, establish appropriate ground
            control where required, and validate outputs with checks to ensure
            reliable results for engineering and planning decisions.
          </p>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need UAV Mapping?</h3>
            <p className="text-muted-foreground mb-4">
              Contact us for drone mapping tailored to your accuracy, coverage, and
              deliverable requirements.
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

export default UavMapping;
