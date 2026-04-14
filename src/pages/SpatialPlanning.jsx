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
        Spatial planning brings together land potential, constraints, infrastructure, and
        stakeholder priorities to shape implementable strategies. It helps answer practical
        questions such as where growth should go, how to protect sensitive areas, and how to
        prioritise services and investment.
      </p>

      <ArticleFigure
        src={geospatialImg}
        alt="Spatial analysis layers"
        caption="Spatial planning combines layers (constraints, services, demand) into clear decisions."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <h2 id="inputs" className="text-2xl font-semibold mt-10 mb-4">
        Inputs
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Base maps, boundaries, and any available CAD/GIS datasets</li>
        <li>Land cover, terrain (DEM), hydrology, and environmental constraints</li>
        <li>Infrastructure networks and service points (roads, water, power, schools, health)</li>
        <li>Population/economic indicators and stakeholder priorities</li>
      </ul>

      <div className="clear-both" />

      <h2 id="analysis" className="text-2xl font-semibold mt-10 mb-4">
        Spatial analysis
      </h2>
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
        feasibility. Typical workflows include suitability modelling, access and catchment
        analysis, growth pattern mapping, and multi-criteria evaluation.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Constraints mapping (hazards, buffers, slopes, protected areas)</li>
        <li>Accessibility and service coverage (travel time, network analysis)</li>
        <li>Suitability modelling and ranking for alternative sites</li>
        <li>Conflict checks between proposed land uses and existing activities</li>
      </ul>

      <div className="clear-both" />

      <h2 id="scenarios" className="text-2xl font-semibold mt-10 mb-4">
        Scenarios
      </h2>
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

      <h2 id="criteria" className="text-2xl font-semibold mt-10 mb-4">
        Decision criteria
      </h2>
      <ArticleFigure
        src={civilWorksImg}
        alt="Infrastructure planning"
        caption="Strategies are tied to infrastructure, phasing, and implementation feasibility."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Safety and risk (flooding, steep slopes, sensitive environments)</li>
        <li>Access and service efficiency (roads, water, power, social services)</li>
        <li>Cost and constructability (terrain, network extensions, phasing)</li>
        <li>Policy and compliance alignment (setbacks, buffers, reserved corridors)</li>
      </ul>

      <div className="clear-both" />

      <h2 id="outputs" className="text-2xl font-semibold mt-10 mb-4">
        Outputs
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Planning maps and supporting spatial datasets</li>
        <li>Options/scenarios with recommended strategies</li>
        <li>Implementation guidance, priorities, and monitoring indicators</li>
      </ul>
   
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Safety and risk (flooding, steep slopes, sensitive environments)</li>
        <li>Access and service efficiency (roads, water, power, social services)</li>
        <li>Cost and feasibility (terrain, network extensions, phasing)</li>
        <li>Policy alignment and compliance (setbacks, buffers, reserved corridors)</li>
      </ul>

      <div className="clear-both" />

      <h2 id="deliverables" className="text-xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Suitability and constraints maps with clear assumptions</li>
        <li>Ranked options and scenario comparisons</li>
        <li>GIS layers (vector/raster) packaged for handover</li>
        <li>Short decision brief with implementation notes and next steps</li>
      </ul>

      <h2 id="qa" className="text-xl font-semibold mt-10 mb-4">
        Quality & metadata
      </h2>
      <ArticleFigure
        src={siteImg}
        alt="Planning and data QA"
        caption="Clear assumptions and metadata make outputs usable and defensible."
        align="right"
        widthClassName="md:w-[280px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Coordinate reference system (CRS) checks and consistent units</li>
        <li>Documented buffers, weights, thresholds, and exclusion rules</li>
        <li>Versioned datasets and handover notes (sources, dates, limitations)</li>
        <li>Optional field verification for sensitive or high-stakes locations</li>
      </ul>

      <div className="clear-both" />

      <h2 id="applications" className="text-xl font-semibold mt-10 mb-4">
        Applications
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Facility and utility siting (schools, health, water points, substations)</li>
        <li>Service coverage and investment prioritisation</li>
        <li>Risk-sensitive planning and environmental safeguarding</li>
        <li>Growth management and corridor planning</li>
      </ul>

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
