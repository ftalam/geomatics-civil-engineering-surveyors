import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";
import geospatialImg from "@/assets/geospatial.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope" },
  { id: "workflows", label: "Typical workflows" },
  { id: "deliverables", label: "Deliverables" },
  { id: "qa", label: "Quality control" },
];

const EngineeringSurvey = () => {
  return (
    <ArticleLayout
      title="Engineering Surveys"
      tagline="High-precision surveys for infrastructure and construction projects."
      hatnote={
        <>
          For terrain-focused mapping, see{" "}
          <Link to="/services/topographic-surveys" className="text-primary hover:underline">
            Topographic Surveys
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Engineering survey",
        images: [
          {
            src: civilWorksImg,
            alt: "Civil works and construction",
            caption: "Construction control and verification",
          },
        ],
        items: [
          { label: "Focus", value: "Setting out + as-builts" },
          { label: "Accuracy", value: "Project specification" },
          { label: "Outputs", value: "Plans, levels, reports" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Engineering surveying supports design and construction by establishing
        control, setting out key features, verifying levels, and producing as-built
        records. It helps ensure the works are built in the right position, at the
        right elevation, and to specification.
      </p>

      <ArticleFigure
        src={civilWorksImg}
        alt="Construction setting out"
        caption="Setting out and verification keep construction aligned to design intent."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <h2 id="scope" className="text-2xl font-semibold mt-10 mb-4">
        Scope
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Establish and verify construction control networks and benchmarks</li>
        <li>Setting out (roads, buildings, utilities, structures)</li>
        <li>As-built surveys and QA checks</li>
        <li>Profiles and cross-sections for corridors and earthworks</li>
        <li>Deformation/monitoring surveys (where required)</li>
      </ul>

      <div className="clear-both" />

      <h2 id="workflows" className="text-2xl font-semibold mt-10 mb-4">
        Typical workflows
      </h2>
      <ArticleFigure
        src={architectureImg}
        alt="Site layout and built environment"
        caption="Site layout combines control, design interpretation, and continuous checks."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Review drawings, tolerances, and deliverables</li>
        <li>Set up and verify control stations and benchmarks</li>
        <li>Carry out setting out and provide on-site checks</li>
        <li>Capture as-built data and reconcile against design</li>
        <li>Compile plans, reports, and submission packages as required</li>
      </ol>

      <div className="clear-both" />

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ArticleFigure
        src={topoMapsImg}
        alt="Profiles, sections, and reporting"
        caption="Profiles and sections support design checks, quantities, and documentation."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Setting-out reports and coordinates</li>
        <li>As-built drawings and verification reports</li>
        <li>Levels, profiles, cross-sections, and quantities (as required)</li>
        <li>Control diagrams and benchmarks (project control register)</li>
      </ul>

      <h2 id="qa" className="text-2xl font-semibold mt-10 mb-4">
        Quality control
      </h2>
      <ArticleFigure
        src={geospatialImg}
        alt="Survey checks and QA"
        caption="Independent checks and consistent control reduce rework and risk."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We set up control appropriate to the specification, use redundancy/checks on
        critical work, and verify results against tolerances. Where required, we
        provide check shots, closure summaries, and clear reporting so engineers and
        contractors can make decisions confidently.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need an Engineering Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Get in touch with our team for accurate and reliable surveying services.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default EngineeringSurvey;

