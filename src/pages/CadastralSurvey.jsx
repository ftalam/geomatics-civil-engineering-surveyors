import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import geospatialImg from "@/assets/geospatial.jpg";

const CadastralSurvey = () => {
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

          <h1 className="text-3xl font-bold mb-6">
            Land (Cadastral) Surveys: Clear Boundaries, Confident Ownership
          </h1>

          <p className="text-lg text-muted-foreground mb-8">
            Cadastral surveying focuses on defining, re-establishing, and documenting
            land parcel boundaries. It supports subdivisions, transfers, developments
            and dispute resolution with legally defensible measurements and records.
          </p>

          <img
            src={geospatialImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Cadastral surveying"
          />

          <h2 className="text-2xl font-semibold mb-4">What is a Cadastral Survey?</h2>
          <p className="mb-6 text-muted-foreground">
            A cadastral survey determines parcel limits by tying field observations to
            existing records and control. The result is a clear boundary position and
            supporting documentation suitable for land administration workflows.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Typical Deliverables</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Boundary re-establishment / beacon verification reports</li>
            <li>Subdivision and mutation support measurements</li>
            <li>Coordinate lists and area computations</li>
            <li>Plans and documentation aligned to the applicable regulations</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">How We Work</h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Records search and site reconnaissance</li>
            <li>Control verification using GNSS and total station observations</li>
            <li>Field boundary measurements and evidence collection</li>
            <li>Computations, checks and reporting for submission/approval</li>
          </ul>

          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need a Cadastral Survey?</h3>
            <p className="text-muted-foreground mb-4">
              Contact our team for boundary verification, subdivisions, amalgamation and cadastral
              documentation support.
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

export default CadastralSurvey;
