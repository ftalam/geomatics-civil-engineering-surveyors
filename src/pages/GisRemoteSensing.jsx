import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import geospatialImg from "@/assets/geospatial.jpg";

const GisRemoteSensing = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-foreground transition-colors"
            aria-label="Back to Services"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <h1 className="text-4xl font-bold mb-6">GIS & Remote Sensing</h1>

          <p className="text-lg text-muted-foreground mb-8">
            We turn spatial data into decisions. From building and maintaining GIS
            datasets to analyzing satellite and aerial imagery, we help teams
            visualize, monitor, and plan with confidence.
          </p>

          <img
            src={geospatialImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="GIS and remote sensing"
          />

          <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>GIS database design, data capture, and map production</li>
            <li>Spatial analysis and suitability modelling</li>
            <li>Remote sensing classification and change detection</li>
            <li>Dashboards and interactive web maps (as required)</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Deliverables</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Maps and cartographic outputs</li>
            <li>GIS layers (vector/raster) with metadata</li>
            <li>Analysis reports and visualizations</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need GIS Support?</h3>
            <p className="text-muted-foreground mb-4">
              Reach out to discuss your GIS and remote sensing requirements.
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

export default GisRemoteSensing;
