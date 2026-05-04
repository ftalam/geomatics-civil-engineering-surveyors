import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import renewableImg from "@/assets/renewable-energy.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import geospatialImg from "@/assets/geospatial.jpg";
import siteImg from "@/assets/Site-survey.png";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "inputs", label: "Inputs" },
  { id: "analysis", label: "Spatial analysis" },
  { id: "scenarios", label: "Scenarios" },
  { id: "criteria", label: "Decision criteria" },
  { id: "outputs", label: "Outputs" },
];

const SpatialPlanning = () => {
  return (
    <ArticleLayout
      title="Spatial Planning"
      tagline="Strategic spatial analysis and planning for sustainable development."
      hatnote={
        <>
          For zoning and allocation, see{" "}
          <Link to="/services/land-use-planning" className="text-primary hover:underline">
            Land-Use Planning
          </Link>
          .
        </>
      }
      toc={toc}
    >
   
      <ArticleFigure
        src={geospatialImg}
        alt="Spatial analysis layers"
        caption="Spatial planning combines layers (constraints, services, demand) into clear decisions."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <ArticleFigure
        src={renewableImg}
        alt="Suitability analysis"
        caption="Suitability mapping supports defensible site selection and prioritisation."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We use spatial analysis to identify opportunities, quantify constraints, and test
        feasibility. 
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Constraints mapping (hazards, buffers, slopes, protected areas)</li>
        <li>Accessibility and service coverage (travel time, network analysis)</li>
        <li>Suitability modelling and ranking for alternative sites</li>
        <li>Conflict checks between proposed land uses and existing activities</li>
      </ul>

      <div className="clear-both" />

      <ArticleFigure
        src={architectureImg}
        alt="Growth scenarios"
        caption="Scenarios compare alternatives and make trade-offs visible."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        Planning works best when you can compare options. We help develop scenarios (for
        example compact growth, corridor development, service-led expansion) and evaluate
        impacts such as cost, access, land take, environmental footprint, and implementation
        complexity.
      </p>

     
      
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Safety and risk (flooding, steep slopes, sensitive environments)</li>
        <li>Access and service efficiency (roads, water, power, social services)</li>
        <li>Cost and constructability (terrain, network extensions, phasing)</li>
        <li>Policy and compliance alignment (setbacks, buffers, reserved corridors)</li>
      </ul>

      <div className="clear-both" />

      

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need Spatial Planning?</h3>
        <p className="text-muted-foreground mb-4">
          Let's discuss how spatial analysis can support your project or program.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default SpatialPlanning;
