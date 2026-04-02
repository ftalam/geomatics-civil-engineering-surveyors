import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import landuseImg from "@/assets/SubdivisionPlan.png";
import civilWorksImg from "@/assets/civil-works.jpg";
import geospatialImg from "@/assets/geospatial.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "principles", label: "Principles" },
  { id: "evidence", label: "Data & evidence" },
  { id: "process", label: "Planning process" },
  { id: "controls", label: "Development controls" },
  { id: "deliverables", label: "Deliverables" },
  { id: "inputs", label: "Project inputs" },
  { id: "applications", label: "Applications" },
];

const LandUsePlanning = () => {
  return (
    <ArticleLayout
      title="Land-Use Planning"
      tagline="Optimal land allocation and use strategies for communities and projects."
      hatnote={
        <>
          For broader frameworks, see{" "}
          <Link to="/services/urban-regional-planning" className="text-primary hover:underline">
            Urban & Regional Planning
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Land-use plan",
        images: [
          {
            src: landuseImg,
            alt: "Land-use planning map",
            caption: "Allocations, zoning, and development guidance",
          },
          {
            src: geospatialImg,
            alt: "GIS analysis",
            caption: "Evidence-based planning with GIS",
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
        Land-use planning guides how land is allocated and managed over time. It balances
        competing needs (housing, infrastructure, livelihoods, environmental protection, and
        economic activity) into a practical plan that can be implemented and monitored.
      </p>

      <ArticleFigure
        src={landuseImg}
        alt="Land-use plan example"
        caption="Land-use plans translate policy goals into mapped allocations and rules."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <p className="text-muted-foreground leading-relaxed">
        A good land-use plan reduces uncertainty for investors and communities, helps prevent
        incompatible land uses, and supports efficient delivery of roads, drainage, water,
        power, and social services.
      </p>

      <h2 id="principles" className="text-2xl font-semibold mt-10 mb-4">
        Principles
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <span className="text-foreground">Suitability first</span>: match proposed uses to
          constraints and opportunities (slope, soils, hazards, access).
        </li>
        <li>
          <span className="text-foreground">Conflict reduction</span>: manage incompatible uses
          and protect sensitive areas.
        </li>
        <li>
          <span className="text-foreground">Service efficiency</span>: plan for mobility,
          utilities, and public services using realistic demand and standards.
        </li>
        <li>
          <span className="text-foreground">Transparency</span>: align with regulations and
          communicate rules clearly to stakeholders.
        </li>
      </ul>

      <div className="clear-both" />

      <h2 id="evidence" className="text-2xl font-semibold mt-10 mb-4">
        Data & evidence
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Planning decisions are stronger when they are traceable to evidence. We help compile,
        clean, and structure the datasets needed to justify allocations and reduce future
        disputes.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Administrative boundaries, parcels, and existing approvals</li>
        <li>Terrain and drainage (slope, flood risk, buffers)</li>
        <li>Access and infrastructure (roads, water, power, services)</li>
        <li>Environmental constraints (wetlands, riparian zones, protected areas)</li>
        <li>Existing land uses and growth pressures</li>
      </ul>

      <div className="clear-both" />

      <h2 id="process" className="text-2xl font-semibold mt-10 mb-4">
        Planning process
      </h2>

      <ArticleFigure
        src={geospatialImg}
        alt="Spatial analysis for planning"
        caption="Constraints + opportunities mapping supports defensible decisions."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />

      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Baseline: compile existing plans, legal constraints, and stakeholder needs.</li>
        <li>
          Analysis: map constraints and opportunities (hazards, access, services, environmental
          buffers).
        </li>
        <li>Options: develop alternative allocations/zoning scenarios and test impacts.</li>
        <li>Preferred plan: refine boundaries, densities, and standards.</li>
        <li>Implementation: define phasing, responsibilities, conditions, and indicators.</li>
      </ol>

      <div className="clear-both" />

      <h2 id="controls" className="text-2xl font-semibold mt-10 mb-4">
        Development controls
      </h2>
      <ArticleFigure
        src={civilWorksImg}
        alt="Infrastructure and servicing"
        caption="Plans work best when backed by realistic servicing and phasing."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We help translate the plan into practical rules that guide approvals and protect
        long-term intent. Controls can include zone definitions, permitted uses, buffers, plot
        sizes, building lines, density guidance, and special conditions for sensitive areas and
        infrastructure corridors.
      </p>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Land-use plan maps and documentation</li>
        <li>Supporting GIS layers (vector/raster) with metadata</li>
        <li>Zoning schedules and development control notes</li>
        <li>Implementation roadmap and monitoring indicators</li>
      </ul>

      <h2 id="inputs" className="text-2xl font-semibold mt-10 mb-4">
        Project inputs
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        To move faster and reduce revisions, we typically confirm these items early:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Planning objectives and decision-makers (who signs off)</li>
        <li>Area of interest boundary and any available base data (CAD/GIS)</li>
        <li>Applicable regulations/standards and required submission formats</li>
        <li>Stakeholder list and engagement expectations (where required)</li>
      </ul>

      <h2 id="applications" className="text-2xl font-semibold mt-10 mb-4">
        Applications
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Subdivisions and new developments</li>
        <li>Institutional, industrial, and mixed-use projects</li>
        <li>Environmental buffers and conservation planning</li>
        <li>Growth management and service extension planning</li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Land-Use Plan?</h3>
        <p className="text-muted-foreground mb-4">
          Contact us for data-driven land-use planning support.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default LandUsePlanning;

