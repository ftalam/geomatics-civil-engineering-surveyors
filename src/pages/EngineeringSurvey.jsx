import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";
import { useState } from "react";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope" },
  { id: "deliverables", label: "Deliverables" },
  { id: "process", label: "Process" },
];

const EngineeringSurvey = () => {
  return (
    <ArticleLayout
      title="Engineering Surveys"
      tagline="High-precision surveys for infrastructure and construction projects."
      hatnote={
        <>
          For terrain-focused mapping, see <Link to="/services/topographic-surveys" className="text-primary hover:underline">Topographic Surveys</Link>.
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
        Engineering surveying supports design and construction by establishing control,
        setting out key features, verifying levels, and producing as-built records.
        It helps ensure the works are built in the right position, at the right
        elevation, and to specification.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: civilWorksImg, alt: "Construction works", caption: "Setting out and control" },
          { src: architectureImg, alt: "Built environment", caption: "Site plans and layout" },
          { src: topoMapsImg, alt: "Survey outputs", caption: "Profiles, sections, and reporting" },
        ]}
      />

      <h2 id="scope" className="text-2xl font-semibold mt-10 mb-4">
        Scope
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Establish and verify construction control networks</li>
        <li>Setting out (roads, buildings, utilities, structures)</li>
        <li>As-built surveys and QA checks</li>
        <li>Profiles and cross-sections for corridors and earthworks</li>
      </ul>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Setting-out reports and coordinates</li>
        <li>As-built drawings and verification reports</li>
        <li>Levels, profiles, cross-sections, and quantities (as required)</li>
      </ul>

      <h2 id="process" className="text-2xl font-semibold mt-10 mb-4">
        Process
      </h2>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Review project requirements, tolerances, and deliverables</li>
        <li>Establish/verify control and benchmarks</li>
        <li>Carry out setting out and continuous site checks</li>
        <li>Capture as-built data and compile reports/drawings</li>
      </ol>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need an Engineering Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Get in touch with our team for accurate and reliable surveying services.
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

export default EngineeringSurvey;

