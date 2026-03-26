import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import renewableImg from "@/assets/renewable-energy.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "support", label: "Planning support" },
  { id: "outputs", label: "Outputs" },
];

const UrbanRegionalPlanning = () => {
  return (
    <ArticleLayout
      title="Urban & Regional Planning"
      tagline="Comprehensive planning solutions for urban and regional development."
      hatnote={
        <>
          For project-level analysis, see <Link to="/services/spatial-planning" className="text-primary hover:underline">Spatial Planning</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "Urban planning",
        images: [
          {
            src: civilWorksImg,
            alt: "Urban infrastructure",
            caption: "Infrastructure-led growth planning",
          },
        ],
        items: [
          { label: "Scale", value: "Urban / regional" },
          { label: "Focus", value: "Policy + infrastructure" },
          { label: "Output", value: "Plans + frameworks" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        We support sustainable urban and regional development with planning frameworks
        that align policy, infrastructure, environmental safeguards, and community
        needs.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: architectureImg, alt: "Urban form", caption: "Urban form and development control" },
          { src: civilWorksImg, alt: "Transport and utilities", caption: "Transport and utilities" },
          { src: renewableImg, alt: "Sustainability", caption: "Sustainability and resilience" },
        ]}
      />

      <h2 id="support" className="text-2xl font-semibold mt-10 mb-4">
        Planning support
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Baseline studies and spatial analysis</li>
        <li>Growth scenarios and land allocation strategies</li>
        <li>Infrastructure and service planning inputs</li>
        <li>Implementation and development control guidance</li>
      </ul>

      <h2 id="outputs" className="text-2xl font-semibold mt-10 mb-4">
        Outputs
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Planning maps and reports</li>
        <li>Implementation frameworks and monitoring indicators</li>
        <li>Supporting spatial datasets</li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
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
    </ArticleLayout>
  );
};

export default UrbanRegionalPlanning;

