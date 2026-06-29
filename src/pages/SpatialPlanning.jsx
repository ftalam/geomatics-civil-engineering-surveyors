import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

// Kept only the images actually used to prevent bundler warnings
import renewableImg from "@/assets/renewable-energy.jpg";
import architectureImg from "@/assets/architecture.jpg";
import geospatialImg from "@/assets/geospatial.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "analysis", label: "Spatial Analysis" },
  { id: "scenarios", label: "Scenarios & Modeling" },
  { id: "criteria", label: "Decision Criteria" },
];

const SpatialPlanning = () => {
  return (
    <ArticleLayout
      title="Spatial Planning"
      tagline="Strategic spatial analysis and intelligent mapping for sustainable project development."
      hatnote={
        <>
          For zoning regulations, sub-divisions, and official allocations, see{" "}
          <Link to="/services/land-use-planning" className="text-primary hover:underline font-medium">
            Land-Use Planning
          </Link>
          .
        </>
      }
      toc={toc}
    >
      {/* SECTION: OVERVIEW */}
      <section id="overview" className="scroll-mt-10">
        <ArticleFigure
          src={geospatialImg}
          alt="Spatial analysis layers"
          caption="Spatial planning combines multiple data layers (constraints, services, demand) into clear actionable blueprints."
          align="right"
          widthClassName="md:w-[340px]"
          thumbImgClassName="w-full h-40 object-cover rounded-lg"
        />
        <p className="text-muted-foreground leading-relaxed mb-4">
          Before breaking ground or investing heavily in infrastructure, developers must understand the physical and regulatory landscape. Spatial planning acts as your strategic roadmap, mapping out exactly how a project interacts with its surrounding geographical environment.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          By translating complex geographic data into clear visual formats, we eliminate guesswork and ensure your developments are optimally situated for long-term viability, efficiency, and compliance.
        </p>
      </section>

      

      {/* SECTION: SPATIAL ANALYSIS */}
      <section id="analysis" className="scroll-mt-20 mb-10">
        <p className="text-muted-foreground leading-relaxed mb-4">
          We use advanced GIS data capture and geospatial analysis to identify project opportunities, quantify geographical constraints and test early-stage engineering feasibility. Our analysis covers:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
          <li><strong>Constraints Mapping:</strong> Early identification of environmental hazards, steep slopes, water buffers and protected areas.</li>
          <li><strong>Accessibility & Service Coverage:</strong> Evaluating travel time, transit pathways and existing utility network analysis.</li>
          <li><strong>Suitability Modeling:</strong> Dynamic algorithmic ranking to identify the absolute best locations for alternative sites.</li>
          <li><strong>Conflict Risk Checks:</strong> Detecting overlaps between your proposed land use and existing communal or commercial activities.</li>
        </ul>
      </section>

  

      {/* SECTION: SCENARIOS */}
      <section id="scenarios" className="scroll-mt-20 mb-10">
       
       
        <p className="text-muted-foreground leading-relaxed mb-4">
          Large-scale development planning works best when you can stress-test multiple pathways before moving to construction. We help you model alternative structural directions (such as compact cluster growth, transit-oriented corridor development or service-led expansion phases) to visualize their impacts early.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          This comparative method highlights crucial trade-offs regarding initial investment requirements, accessibility, long-term environmental footprint and construction timelines.
        </p>
      </section>


      {/* CALL TO ACTION */}
      <div className="clear-both bg-card p-8 rounded-xl border text-center shadow-sm">
        <h3 className="text-xl font-semibold mb-2">Need Strategic Spatial Planning?</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Let's discuss how data-driven spatial analysis can eliminate risk and protect your next engineering or real estate project.
        </p>
        <Link 
          to="/contact" 
          className="inline-block bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          Request Free Consultation
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default SpatialPlanning;