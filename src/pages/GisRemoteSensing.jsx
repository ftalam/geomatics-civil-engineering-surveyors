import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import geospatialImg from "@/assets/geospatial.jpg";
import miningImg from "@/assets/mining.jpg";
import renewableImg from "@/assets/renewable-energy.jpg";
import { useState } from "react";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "capabilities", label: "Capabilities" },
  { id: "deliverables", label: "Deliverables" },
  { id: "applications", label: "Applications" },
];

const GisRemoteSensing = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ArticleLayout
      title="GIS & Remote Sensing"
      tagline="Spatial data analysis, management, and presentation using GIS technology."
      hatnote={
        <>
          For project requests and quotations, see <Link to="/contact" className="text-primary hover:underline">Contact</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "GIS & Remote Sensing",
        images: [
          {
            src: geospatialImg,
            alt: "Geospatial data and mapping",
            caption: "Geospatial analysis and map production",
          },
        ],
        items: [
          { label: "Focus", value: "GIS, imagery, analytics" },
          { label: "Outputs", value: "Maps, layers, reports" },
          { label: "Tools", value: "GIS + remote sensing workflows" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        We turn spatial data into decisions. From building and maintaining GIS datasets
        to analyzing satellite and aerial imagery, we help teams visualize, monitor,
        and plan with confidence.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: geospatialImg, alt: "Geospatial mapping", caption: "Mapping & visualization" },
          { src: miningImg, alt: "Mining site", caption: "Site monitoring & change detection" },
          { src: renewableImg, alt: "Renewable energy site", caption: "Suitability & planning" },
        ]}
      />

      <h2 id="capabilities" className="text-2xl font-semibold mt-10 mb-4">
        Capabilities
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>GIS database design, data capture, and cartographic map production</li>
        <li>Spatial analysis and suitability modelling</li>
        <li>Remote sensing classification, indices, and change detection</li>
        <li>Dashboards and interactive maps (when required)</li>
      </ul>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Printable maps and presentation-ready layouts</li>
        <li>GIS layers (vector/raster) with metadata</li>
        <li>Analysis reports and visualizations</li>
      </ul>

      <h2 id="applications" className="text-2xl font-semibold mt-10 mb-4">
        Applications
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Common use cases include infrastructure planning, environmental monitoring,
        land management, project tracking, and decision support systems.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need GIS Support?</h3>
        <p className="text-muted-foreground mb-4">
          Reach out to discuss your GIS and remote sensing requirements.
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

export default GisRemoteSensing;

