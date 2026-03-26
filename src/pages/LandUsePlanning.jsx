import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import architectureImg from "@/assets/architecture.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import geospatialImg from "@/assets/geospatial.jpg";
import { useState } from "react";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope" },
  { id: "deliverables", label: "Deliverables" },
];

const LandUsePlanning = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ArticleLayout
      title="Land-Use Planning"
      tagline="Optimal land allocation and use strategies for communities and projects."
      hatnote={
        <>
          For broader frameworks, see <Link to="/services/urban-regional-planning" className="text-primary hover:underline">Urban & Regional Planning</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "Land-use plan",
        images: [
          {
            src: architectureImg,
            alt: "Land-use planning",
            caption: "Allocations, zoning, and development guidance",
          },
        ],
        items: [
          { label: "Focus", value: "Zoning + allocation" },
          { label: "Inputs", value: "Data + stakeholders" },
          { label: "Output", value: "Plan + controls" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Land-use planning guides how land is allocated and developed over time. It
        supports sustainable growth, environmental protection, and efficient
        infrastructure investment.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: architectureImg, alt: "Urban fabric", caption: "Development patterns" },
          { src: civilWorksImg, alt: "Infrastructure", caption: "Infrastructure integration" },
          { src: geospatialImg, alt: "Spatial data", caption: "GIS-driven decision support" },
        ]}
      />

      <h2 id="scope" className="text-2xl font-semibold mt-10 mb-4">
        Scope
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Existing land-use assessments and constraints mapping</li>
        <li>Zoning proposals and development guidance</li>
        <li>Infrastructure and mobility considerations</li>
        <li>Implementation frameworks and monitoring indicators</li>
      </ul>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Land-use plan maps and documentation</li>
        <li>Supporting GIS layers and metadata</li>
        <li>Policy-aligned recommendations and controls</li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
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
    </ArticleLayout>
  );
};

export default LandUsePlanning;

