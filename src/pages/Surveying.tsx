import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleStack from "@/components/ArticleStack";
import { Link } from "react-router-dom";

import heroSurveyingImg from "@/assets/hero-surveying.jpg";
import siteSurveyImg from "@/assets/Site-survey.png";
import contoursImg from "@/assets/contours.png";
import aerialImg from "@/assets/AERIAL.png";
import topoMapsImg from "@/assets/topo-maps.jpg";
import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import gnssImg from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "topography", label: "Topography in surveying" },
  { id: "control", label: "Control & datums" },
  { id: "instruments", label: "Instruments" },
  { id: "methods", label: "Field methods" },
  { id: "deliverables", label: "Deliverables" },
  { id: "qa", label: "Accuracy & QA" },
  { id: "services", label: "Related services" },
];

const Surveying = () => {
  return (
    <ArticleLayout
      title="Surveying"
      tagline="Measuring positions, distances, angles, and elevations to support design, construction, and land administration."
      hatnote={
        <>
          For terrain-focused mapping, see{" "}
          <Link
            to="/services/topographic-surveys"
            className="text-primary hover:underline"
          >
            Topographic Surveys
          </Link>
          .
        </>
      }
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Surveying turns real-world features into reliable measurements you can design,
        build, and make decisions with. Surveying helps determine accurately the terrestrial 
        or three-dimensional space position of points and the distances and angles between them using leveling instruments 
        such as theodolites, dumpy levels and clinometers. 
        GPS and other global navigation satellite systems (GNSS) are also used. A good survey balances accuracy, coverage, and
        clear deliverables—from control and boundaries to topographic mapping and construction verification.
      </p>

      <ArticleStack
        items={[
          {
            src: siteSurveyImg,
            alt: "Site survey",
            caption: "Site observations and documentation",
          },
          {
            src: contoursImg,
            alt: "Contour representation",
            caption: "Relief represented using contour lines",
          },
          {
            src: aerialImg,
            alt: "Aerial mapping",
            caption: "Aerial mapping supports fast coverage and context",
          },
        ]}
        align="right"
        widthClassName="md:w-[340px]"
      />

      <h2 id="topography" className="text-2xl font-semibold mt-10 mb-4">
        Topography in surveying
      </h2>
      <ArticleFigure
        src={topoMapsImg}
        alt="Topographic map"
        caption="Topographic maps combine plan features with relief (contours and spot heights)"
        align="right"
      />
      <p className="text-muted-foreground leading-relaxed">
        Topography describes the shape of the land—hills, valleys, ridges, drainage
        lines, and man-made features. In practice, topographic surveying captures
        both plan position and elevation so designers can understand slopes, volumes,
        and constraints.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Relief is commonly communicated using:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <span className="text-foreground">Contours</span>: lines of equal elevation,
          useful for understanding terrain and gradients.
        </li>
        <li>
          <span className="text-foreground">Spot heights & breaklines</span>: critical
          points and edges (e.g., road crowns, channel inverts).
        </li>
        <li>
          <span className="text-foreground">DEM/DTM/DSM</span>: digital terrain/surface
          models for analysis, sections, and volumes.
        </li>
      </ul>

      <h2 id="control" className="text-2xl font-semibold mt-10 mb-4">
        Control & datums
      </h2>
      <ArticleFigure
        src={gnssImg}
        alt="GNSS receiver"
        caption="GNSS methods provide fast, accurate control when used correctly"
        align="right"
      />
      <p className="text-muted-foreground leading-relaxed">
        Most surveys start by establishing or verifying control—known reference points
        that keep everything consistent. Control is tied to a coordinate system
        (datum/projection) and a vertical reference (benchmarks, geoid models, project
        datums).
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Control can be built from GNSS observations, traverses, and leveling, and it
        should be checked with closures and redundant measurements.
      </p>

      <h2 id="instruments" className="text-2xl font-semibold mt-10 mb-4">
        Instruments
      </h2>
      <ArticleFigure
        src={totalStationImg}
        alt="Total station"
        caption="Total stations combine angle + distance measurement for versatile field work"
        align="right"
      />
      <p className="text-muted-foreground leading-relaxed">
        Surveyors choose instruments based on required accuracy, site conditions, and
        outputs. Common instruments include total stations, GNSS receivers, optical or
        digital levels, UAV platforms, and (for some projects) laser scanners.
      </p>

      <h2 id="methods" className="text-2xl font-semibold mt-10 mb-4">
        Field methods
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        A typical workflow mixes methods to get the best reliability and coverage:
      </p>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Define specification: accuracy, extent, deliverables, and coordinate system.</li>
        <li>Establish horizontal/vertical control (GNSS, traverse, leveling).</li>
        <li>Capture features + elevations (detail points, breaklines, profiles/sections).</li>
        <li>Check and adjust (closures, repeats, independent checks).</li>
        <li>Compile outputs (CAD/GIS, maps, models, reports) and run QA.</li>
      </ol>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Deliverables depend on your project, but commonly include:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Coordinate schedules and control reports</li>
        <li>Survey plans (existing conditions, boundaries, as-builts)</li>
        <li>Contours, spot heights, profiles, and cross-sections</li>
        <li>Orthophotos, point clouds, and terrain models (DTM/DSM) when applicable</li>
      </ul>

      <h2 id="qa" className="text-2xl font-semibold mt-10 mb-4">
        Accuracy & QA
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Reliable surveys are built on checks. Good QA includes clear field notes,
        instrument calibration, control closures, independent measurements, and
        documenting the coordinate reference system and assumptions used.
      </p>

      <h2 id="services" className="text-2xl font-semibold mt-10 mb-4">
        Related services
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Explore related capabilities:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <Link to="/services/topographic-surveys" className="text-primary hover:underline">
            Topographic Surveys
          </Link>{" "}
          (terrain mapping, contours, DTM/DSM)
        </li>
        <li>
          <Link to="/services/cadastral-surveys" className="text-primary hover:underline">
            Land (Cadastral) Surveys
          </Link>{" "}
          (boundaries, subdivisions)
        </li>
        <li>
          <Link to="/services/engineering-surveys" className="text-primary hover:underline">
            Engineering Surveys
          </Link>{" "}
          (setting out, as-builts, construction control)
        </li>
        <li>
          <Link to="/services/uav-mapping" className="text-primary hover:underline">
            UAV-Based Mapping
          </Link>{" "}
          (orthophotos, point clouds)
        </li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Tell us your location, scope, and required outputs—we’ll recommend the best
          method and accuracy level for your project.
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

export default Surveying;

