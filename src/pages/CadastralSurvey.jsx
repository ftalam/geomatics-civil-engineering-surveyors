import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import geospatialImg from "@/assets/geospatial.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";
import architectureImg from "@/assets/architecture.jpg";


const toc = [
  { id: "overview", label: "Overview" },
  { id: "deliverables", label: "Deliverables" },
  { id: "process", label: "Process" },
];

const CadastralSurvey = () => {
  return (
    <ArticleLayout
      title="Land (Cadastral) Surveys"
      tagline="Boundary determination, subdivision, and land ownership documentation."
      hatnote={
        <>
          For engineering and construction support, see <Link to="/services/engineering-surveys" className="text-primary hover:underline">Engineering Surveys</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "Cadastral survey",
        images: [
          {
            src: topoMapsImg,
            alt: "Survey mapping outputs",
            caption: "Boundary definition and documentation",
          },
        ],
        items: [
          { label: "Focus", value: "Parcel boundaries" },
          { label: "Use", value: "Subdivisions, transfers" },
          { label: "Outputs", value: "Plans, coordinates, reports" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Cadastral surveying focuses on defining, re-establishing, and documenting land
        parcel boundaries. It supports subdivisions, transfers, developments, and
        dispute resolution with defensible measurements and records.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: topoMapsImg, alt: "Survey plan", caption: "Plans and documentation" },
          { src: geospatialImg, alt: "Field context", caption: "Field reconnaissance and checks" },
          { src: architectureImg, alt: "Development context", caption: "Development and approvals" },
        ]}
      />

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Typical deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Boundary re-establishment / beacon verification reports</li>
        <li>Subdivision and mutation support measurements</li>
        <li>Coordinate lists and area computations</li>
        <li>Plans and documentation aligned to the applicable regulations</li>
      </ul>

      <h2 id="process" className="text-2xl font-semibold mt-10 mb-4">
        Process
      </h2>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Records search and site reconnaissance</li>
        <li>Control verification using GNSS and/or total station observations</li>
        <li>Field boundary measurements and evidence collection</li>
        <li>Computations, checks, and reporting for submission/approval</li>
      </ol>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Cadastral Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Contact our team for boundary verification, subdivisions, and cadastral
          documentation support.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg"
        >
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default CadastralSurvey;

