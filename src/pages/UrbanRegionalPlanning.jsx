import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import renewableImg from "@/assets/renewable-energy.jpg";
import geospatialImg from "@/assets/geospatial.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "baseline", label: "Baseline studies" },
  { id: "strategy", label: "Strategy & scenarios" },
  { id: "implementation", label: "Implementation" },
  { id: "outputs", label: "Outputs" },
];

const UrbanRegionalPlanning = () => {
  return (
    <ArticleLayout
      title="Urban & Regional Planning"
      tagline="Comprehensive planning solutions for urban and regional development."
      hatnote={
        <>
          For project-level analysis, see{" "}
          <Link to="/services/spatial-planning" className="text-primary hover:underline">
            Spatial Planning
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Urban planning",
        images: [
          {
            src: architectureImg,
            alt: "Urban development context",
            caption: "Land use, infrastructure, and development control",
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
        needs. The goal is a clear spatial strategy that can guide investment,
        approvals, and implementation over time.
      </p>

      <ArticleFigure
        src={architectureImg}
        alt="Urban form and development control"
        caption="Plans define urban form, densities, and development control approaches."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <h2 id="baseline" className="text-2xl font-semibold mt-10 mb-4">
        Baseline studies
      </h2>
      <ArticleFigure
        src={geospatialImg}
        alt="Baseline GIS analysis"
        caption="Baseline mapping helps reveal constraints, opportunities, and service gaps."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Existing conditions mapping (land use, services, environment)</li>
        <li>Infrastructure and mobility analysis</li>
        <li>Growth drivers and demand assumptions</li>
        <li>Stakeholder engagement and problem definition</li>
      </ul>

      <div className="clear-both" />

      <h2 id="strategy" className="text-2xl font-semibold mt-10 mb-4">
        Strategy & scenarios
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        We help develop spatial strategies that connect land allocation, settlement
        patterns, economic activity, and environmental protection. Scenarios are used
        to compare alternatives and clarify trade-offs (cost, access, land take,
        resilience, and feasibility).
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Structure plans and growth scenarios</li>
        <li>Land allocation principles and development corridors</li>
        <li>Open space networks, buffers, and risk-sensitive planning</li>
        <li>Economic and service nodes (centres hierarchy where applicable)</li>
      </ul>

      <h2 id="implementation" className="text-2xl font-semibold mt-10 mb-4">
        Implementation
      </h2>
      <ArticleFigure
        src={civilWorksImg}
        alt="Infrastructure-led implementation"
        caption="Implementation ties spatial intent to investment, phasing, and approvals."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        A plan is only useful if it can be implemented. We help translate strategy
        into practical guidance such as phasing, priority projects, development
        control notes, and monitoring indicators.
      </p>

      <h2 id="outputs" className="text-2xl font-semibold mt-10 mb-4">
        Outputs
      </h2>
      <ArticleFigure
        src={renewableImg}
        alt="Resilience and sustainability"
        caption="Plans integrate sustainability and resilience considerations."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Planning maps and reports (structure plans, strategies)</li>
        <li>Implementation frameworks and monitoring indicators</li>
        <li>Supporting spatial datasets and metadata</li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need Planning Support?</h3>
        <p className="text-muted-foreground mb-4">
          Reach out to discuss your urban or regional planning goals.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default UrbanRegionalPlanning;

