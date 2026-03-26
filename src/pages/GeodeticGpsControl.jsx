import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import gnssI93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import gnssI76Img from "@/assets/gnss-smart-full-antennas-chcnav-i76.jpg";
import gnssI89Img from "@/assets/gnss-smart-full-antennas-chcnav-i89.jpg";
import { useState } from "react";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "methods", label: "Methods" },
  { id: "deliverables", label: "Deliverables" },
];

const GeodeticGpsControl = () => {

  return (
    <ArticleLayout
      title="Geodetic GPS Control"
      tagline="CORS Network-based geodetic control surveys for large-scale projects."
      hatnote={
        <>
          For mapping outputs derived from control networks, see <Link to="/services/topographic-surveys" className="text-primary hover:underline">Topographic Surveys</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "Geodetic control",
        images: [
          {
            src: gnssI93Img,
            alt: "GNSS receiver",
            caption: "GNSS equipment used for control surveys",
          },
        ],
        items: [
          { label: "Focus", value: "Coordinates + heights" },
          { label: "Scale", value: "Project / corridor" },
          { label: "Output", value: "Control stations" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Geodetic control provides the reference framework that ties mapping and
        engineering measurements to consistent coordinates and elevations. It is
        essential for corridor projects, large developments, and national grid
        integration.
      </p>

      <ArticleGallery
        title="Typical equipment"
        items={[
          { src: gnssI93Img, alt: "GNSS i93", caption: "Primary GNSS observations" },
          { src: gnssI76Img, alt: "GNSS i76", caption: "RTK / densification" },
          { src: gnssI89Img, alt: "GNSS i89", caption: "Field control workflows" },
        ]}
      />

      <h2 id="methods" className="text-2xl font-semibold mt-10 mb-4">
        Methods
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Control network design and monumentation guidance</li>
        <li>Static GNSS observations and network adjustments</li>
        <li>RTK/CORS workflows for densification and construction support</li>
        <li>Vertical control integration where applicable</li>
      </ul>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Coordinates and heights with quality statistics</li>
        <li>Control diagrams and station descriptions</li>
        <li>Observation logs and adjustment summaries</li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need Geodetic Control?</h3>
        <p className="text-muted-foreground mb-4">
          Talk to us about establishing or verifying control networks for your project
          area.
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

export default GeodeticGpsControl;

