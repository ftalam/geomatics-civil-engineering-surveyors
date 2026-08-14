import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import gnssI93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import ViLiImg from "@/assets/chcnav-vili-i100-visual-lidar-gnss-rtk-receiver-surveying.jpg";
import chcnavBaseImg from "@/assets/chcnav-ibase.jpg";
import shopImg from "@/assets/SH-stand.jpg";

const EquipmentSupplyTraining = () => {
  return (
    <ArticleLayout
      title="Equipment Supply & Training"
      tagline="Sales, calibration and training on professional surveying equipment."
      hatnote={
        <>
          For products and purchases, see{" "}
          <Link to="/geoshop" className="text-primary hover:underline">
            Geoshop
          </Link>
          .
        </>
      }
      infobox={{
        title: "Bestseller Survey equipment",
        images: [
          {
            src: ViLiImg,
            alt: "Vi-Li i100",
            caption: "Versatile Visual-Lidar GNSS Receiver ",
          },
        ],
        items: [
          { label: "Includes", value: "Supply + onboarding" },
          { label: "Focus", value: "Reliable workflows" },
          { label: "Support", value: "After-sales guidance" },
        ],
      }}
    >
      <ArticleFigure
        src={shopImg}
        alt="Geoshop equipment"
        caption="Selection depends on environment, accuracy needs and workflow (RTK/static)."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We help you match equipment to your actual jobs: terrain, canopy/urban multipath,
        required precision, output formats, team skill level and project timelines.
        Recommendations focus on reliable field performance and a smooth data pipeline back to
        CAD/GIS deliverables.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Total stations for precision layout, traversing, and detail capture</li>
        <li>GNSS receivers for RTK, densification and corridor control</li>
        <li>Laser scanning for rapid capture of complex scenes</li>
      </ul>
            <p className="text-muted-foreground leading-relaxed">
             We advise on checks and
              maintenance schedules to keep results consistent and to reduce downtime.
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Instrument checks (collimation, level bubbles, compensator checks)</li>
              <li>Battery/cabling care and field protection guidance</li>
              <li>Firmware/software updates aligned to stable workflows</li>
            </ul>
          <p className="text-muted-foreground leading-relaxed">
            We provide after-sales guidance and troubleshooting support: setup checks, workflow
            improvements and help interpreting results so your equipment remains useful over the
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

