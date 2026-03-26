import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import renewableImg from "@/assets/renewable-energy.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import { useState } from "react"; 

const toc = [
  { id: "overview", label: "Overview" },
  { id: "focus", label: "Key focus areas" },
  { id: "outputs", label: "Outputs" },
];

const SpatialPlanning = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ArticleLayout
      title="Spatial Planning"
      tagline="Strategic spatial analysis and planning for sustainable development."
      hatnote={
        <>
          For zoning and allocation, see <Link to="/services/land-use-planning" className="text-primary hover:underline">Land-Use Planning</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "Spatial planning",
        images: [
          {
            src: renewableImg,
            alt: "Planning context",
            caption: "Evidence-based planning and site selection",
          },
        ],
        items: [
          { label: "Focus", value: "Constraints + opportunities" },
          { label: "Method", value: "Spatial analysis" },
          { label: "Output", value: "Strategies + frameworks" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Spatial planning helps align land potential, constraints, infrastructure, and
        stakeholder priorities into implementable development strategies.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: renewableImg, alt: "Renewable site", caption: "Suitability analysis" },
          { src: civilWorksImg, alt: "Infrastructure", caption: "Infrastructure planning" },
          { src: architectureImg, alt: "Urban growth", caption: "Growth scenarios" },
        ]}
      />

      <h2 id="focus" className="text-2xl font-semibold mt-10 mb-4">
        Key focus areas
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Constraints and opportunities mapping</li>
        <li>Suitability analysis and scenario evaluation</li>
        <li>Infrastructure and service accessibility analysis</li>
        <li>Evidence-based recommendations for implementation</li>
      </ul>

      <h2 id="outputs" className="text-2xl font-semibold mt-10 mb-4">
        Outputs
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Planning maps and supporting spatial datasets</li>
        <li>Options/scenarios with recommended strategies</li>
        <li>Implementation guidance and monitoring indicators</li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
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
    </ArticleLayout>
  );
};

export default SpatialPlanning;

