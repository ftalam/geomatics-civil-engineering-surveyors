import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import ArticleStack from "@/components/ArticleStack";
import { Link } from "react-router-dom";
import geospatialImg from "@/assets/geospatial.jpg";
import miningImg from "@/assets/mining.jpg";
import renewableImg from "@/assets/renewable-energy.jpg";
import { useState } from "react";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "RS", label: "Remote Sensing" },
  { id: "GIS", label: "Geographic Information Systems" },
  { id: "deliverables", label: "Deliverables" },
  { id: "applications", label: "Applications" },
];

const GisRemoteSensing = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ArticleLayout
      title="GIS & Remote Sensing"
      tagline="Spatial data analysis, management and presentation using GIS technology."
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
        description: "Complementary technologies used to acquire, analyze and visualize data. Remote sensing collects data from afar (satellites or drones), while GIS provides as digital platform to manage, analyze and visualize spatial data.  Together, they enable informed decision-making across various industries.",
        items: [
          { label: "Focus", value: "Remote sensing provides raw data, while GIS analyzes, models and visualizes that information."},
          { label: "Advantages", value: "Enables large-scale studies, enhances knowledge of planetary variables, and supports SDGs." },
          { label: "Use Cases", value: "Environmental monitoring, Natural Hazard management, Urban planning, Precision agriculture" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        We turn spatial data into decisions. From building and maintaining GIS datasets
        to analyzing satellite and aerial imagery, we help teams visualize, monitor,
        and plan with confidence.
      </p>

      <ArticleStack
        items={[
          { src: geospatialImg, alt: "Geospatial mapping", caption: "Mapping & visualization"},
          { src: miningImg, alt: "Mining site", caption: "Site monitoring & change detection"},
          { src: renewableImg, alt: "Renewable energy site", caption: "Suitability & planning" },
        ]}
         align="left" widthClassName="md:w-[200px]"
      />

      <h2 id="RS" className="text-xl font-semibold mt-1 mb-1"> Remote Sensing </h2>
      <p className="text-muted-foreground leading-relaxed">
        Remote sensing involves the collection of information about an object or area from a distance, typically using satellites, aircraft or LiDAR. This technology optimizes detection of reflected or emitted energy (electromagnetic radiation) using passive or active sensors.
        <ol className="list-disc text-sm">
          <li>Passive sensors (e.g. multispectral, hyperspectral) capture reflected sunlight to analyze land cover, vegetation health, water quality and more.</li>
          <li>Active sensors (e.g. LiDAR, radar) emit their own energy to measure distances, topography and surface characteristics regardless of lighting or weather conditions.</li>
        </ol>
        The effectiveness of a sensor is defined by spatial resolution (detail), spectral resolution (wavelengths captured), temporal resolution (frequency of data collection) and radiometric resolution (sensitivity to energy differences).
      </p>

      <h2 id="GIS" className="text-xl font-semibold mt-10 mb-4">
        Geographic Information Systems
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Geographic Information System (GIS) is a computer-based framework designed to capture, store, manipulate, analyze, manage, and present spatial or geographic data. While remote sensing provides the "what" and "where," GIS explains the "why" and "how" by layering different types of information.
        GIS integrates <b>hardware</b>, <b>software</b>, and <b>data</b> to help <b>people</b> understand patterns and relationships in the physical world using various <b>methods</b> such as spatial analysis, modeling and visualization. 
        <br/> GIS uses two primary data structures: <b>vector data</b> (points, lines, polygons) for discrete features and <b>raster data</b> (grids of cells) for continuous phenomena.
        <br/> Common GIS software includes ArcGIS, QGIS, and GRASS GIS, which support a wide range of applications across industries.
        
      </p> 
      
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>GIS database design, data capture and cartographic map production</li>
        <li>Spatial analysis and suitability modelling</li>
        <li>Remote sensing classification, indices and change detection</li>
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

         By combining these data types with remote sensing inputs, GIS enables powerful spatial analysis, decision support and communication of complex information through maps and dashboards.
     
        Common use cases include infrastructure planning, environmental monitoring,
        land management, project tracking, and decision support systems.
      </p>
       <ArticleGallery
        items={[
          { src: geospatialImg, alt: "Geospatial mapping", caption: "Mapping & visualization" },
          { src: miningImg, alt: "Mining site", caption: "Site monitoring & change detection" },
          { src: renewableImg, alt: "Renewable energy site", caption: "Suitability & planning" },
        ]}
         align="right"
        widthClassName="md:w-[340px]"
      />
      

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

