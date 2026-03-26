import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import gnssI93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import laserScannerImg from "@/assets/handheld-+Laser-scanners-chcnav-RS10.jpg";
import { useState } from "react"; 

const toc = [
  { id: "overview", label: "Overview" },
  { id: "services", label: "Services" },
  { id: "training", label: "Training" },
];

const EquipmentSupplyTraining = () => {
  return (
    <ArticleLayout
      title="Equipment Supply & Training"
      tagline="Sales, calibration, and training on professional surveying equipment."
      hatnote={
        <>
          For products and purchases, see <Link to="/geoshop" className="text-primary hover:underline">Geoshop</Link>.
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
        We help teams select the right surveying equipment and build confidence using
        it. From supply to onboarding and continued support, we keep your workflows
        productive and accurate.
      </p>

      <ArticleGallery
        title="Equipment examples"
        items={[
          { src: totalStationImg, alt: "Total station", caption: "Total stations" },
          { src: gnssI93Img, alt: "GNSS receiver", caption: "GNSS (RTK)" },
          { src: laserScannerImg, alt: "Laser scanner", caption: "Laser scanning" },
        ]}
      />

      <h2 id="services" className="text-2xl font-semibold mt-10 mb-4">
        Services
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Equipment selection and supply (GNSS, total stations, UAV platforms)</li>
        <li>Configuration and workflow setup</li>
        <li>After-sales support and troubleshooting</li>
      </ul>

      <h2 id="training" className="text-2xl font-semibold mt-10 mb-4">
        Training
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Training is tailored to your team and workflows—field setup, data capture,
        quality checks, and best-practice reporting.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need Equipment or Training?</h3>
        <p className="text-muted-foreground mb-4">
          Contact us for equipment recommendations, onboarding, and training.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg"
          >
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

