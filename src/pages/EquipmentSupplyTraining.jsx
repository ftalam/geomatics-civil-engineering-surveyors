import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import gnssI93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import laserScannerImg from "@/assets/handheld-+Laser-scanners-chcnav-RS10.jpg";
import chcnavBaseImg from "@/assets/chcnav-ibase.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "selection", label: "Equipment selection" },
  { id: "setup", label: "Setup & workflow" },
  { id: "training", label: "Training" },
  { id: "maintenance", label: "Calibration & maintenance" },
  { id: "support", label: "Support" },
];

const EquipmentSupplyTraining = () => {
  return (
    <ArticleLayout
      title="Equipment Supply & Training"
      tagline="Sales, calibration, and training on professional surveying equipment."
      hatnote={
        <>
          For products and purchases, see{" "}
          <Link to="/geoshop" className="text-primary hover:underline">
            Geoshop
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Survey equipment",
        images: [
          {
            src: totalStationImg,
            alt: "Total station",
            caption: "Total stations, GNSS, and laser scanning workflows",
          },
        ],
        items: [
          { label: "Includes", value: "Supply + onboarding" },
          { label: "Focus", value: "Reliable workflows" },
          { label: "Support", value: "After-sales guidance" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        We help teams select the right surveying equipment and build confidence using it. From
        supply to onboarding and continued support, we keep your workflows productive and
        accurate.
      </p>

      <h2 id="selection" className="text-2xl font-semibold mt-10 mb-4">
        Equipment selection
      </h2>
      <ArticleFigure
        src={gnssI93Img}
        alt="GNSS receiver"
        caption="Selection depends on environment, accuracy needs, and workflow (RTK/static)."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We help you match equipment to your actual jobs: terrain, canopy/urban multipath,
        required precision, output formats, team skill level, and project timelines.
        Recommendations focus on reliable field performance and a smooth data pipeline back to
        CAD/GIS deliverables.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Total stations for precision layout, traversing, and detail capture</li>
        <li>GNSS receivers for RTK, densification, and corridor control</li>
        <li>Laser scanning for rapid capture of complex scenes</li>
      </ul>

      <div className="clear-both" />

      <h2 id="setup" className="text-2xl font-semibold mt-10 mb-4">
        Setup & workflow
      </h2>
      <ArticleFigure
        src={chcnavBaseImg}
        alt="GNSS base station"
        caption="Correct setup (datums, antenna heights, base/rover) prevents costly rework."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Device configuration and field-ready templates</li>
        <li>Coordinate system setup (projections/datum parameters)</li>
        <li>Data management workflow and file naming/transfer guidelines</li>
        <li>Starter checklists for daily checks and QA</li>
      </ul>

      <div className="clear-both" />

      <h2 id="training" className="text-2xl font-semibold mt-10 mb-4">
        Training
      </h2>
      <ArticleFigure
        src={totalStationImg}
        alt="Total station training"
        caption="Training covers field setup, data capture, checks, and reporting."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        Training is tailored to your team and workflows: field setup, data capture, quality
        checks, and best-practice reporting. We focus on repeatable methods that reduce errors
        and accelerate delivery.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>GNSS RTK/static workflows, control, and troubleshooting</li>
        <li>Total station setup, traversing, setting out, and as-builts</li>
        <li>Laser scanning capture basics and registration concepts</li>
      </ul>

      <div className="clear-both" />

      <h2 id="maintenance" className="text-2xl font-semibold mt-10 mb-4">
        Calibration & maintenance
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Equipment performance depends on calibration and routine care. We advise on checks and
        maintenance schedules to keep results consistent and to reduce downtime.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Instrument checks (collimation, level bubbles, compensator checks)</li>
        <li>Battery/cabling care and field protection guidance</li>
        <li>Firmware/software updates aligned to stable workflows</li>
      </ul>

      <h2 id="support" className="text-2xl font-semibold mt-10 mb-4">
        Support
      </h2>
      <ArticleFigure
        src={laserScannerImg}
        alt="Laser scanner"
        caption="After-sales support keeps your team productive across changing projects."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We provide after-sales guidance and troubleshooting support: setup checks, workflow
        improvements, and help interpreting results so your equipment remains useful over the
        long term.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need Equipment or Training?</h3>
        <p className="text-muted-foreground mb-4">
          Contact us for equipment recommendations, onboarding, and training.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
            Request Service
          </Link>
          <Link
            to="/geoshop"
            className="inline-block bg-card text-foreground px-6 py-3 rounded-lg border"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default EquipmentSupplyTraining;

