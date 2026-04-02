import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import gnssI93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import gnssI76Img from "@/assets/gnss-smart-full-antennas-chcnav-i76.jpg";
import gnssI89Img from "@/assets/gnss-smart-full-antennas-chcnav-i89.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "datums", label: "Datums & coordinates" },
  { id: "methods", label: "Methods" },
  { id: "monuments", label: "Monumentation" },
  { id: "deliverables", label: "Deliverables" },
  { id: "qa", label: "Quality control" },
];

const GeodeticGpsControl = () => {
  return (
    <ArticleLayout
      title="Geodetic GPS Control"
      tagline="CORS and GNSS-based geodetic control surveys for large-scale projects."
      hatnote={
        <>
          For mapping outputs derived from control networks, see{" "}
          <Link to="/services/topographic-surveys" className="text-primary hover:underline">
            Topographic Surveys
          </Link>
          .
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
        Geodetic control provides the reference framework that ties mapping and engineering
        measurements to consistent coordinates and elevations. It is essential for corridor
        projects, large developments, and integration with national/provincial grids.
      </p>

      <ArticleFigure
        src={gnssI93Img}
        alt="GNSS observations"
        caption="Reliable control starts with correct setup, observation time, and checks."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <h2 id="datums" className="text-2xl font-semibold mt-10 mb-4">
        Datums & coordinates
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Control must be tied to a defined horizontal datum/projection and a vertical reference
        (benchmarks, geoid model, or project datum). We help confirm what system is required and
        document transformation notes when legacy data must be integrated.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Coordinate system and projection confirmation</li>
        <li>Vertical control and benchmark integration</li>
        <li>Transformation parameters and quality notes (where applicable)</li>
      </ul>

      <div className="clear-both" />

      <h2 id="methods" className="text-2xl font-semibold mt-10 mb-4">
        Methods
      </h2>
      <ArticleFigure
        src={gnssI76Img}
        alt="RTK and densification"
        caption="RTK/CORS workflows support densification and construction control."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        Methods are selected based on accuracy requirements, logistics, and the size of the
        network. Common approaches include:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <span className="text-foreground">Static GNSS</span> for high-accuracy control and
          network adjustment.
        </li>
        <li>
          <span className="text-foreground">RTK/CORS</span> for densification, construction
          support, and rapid control checks.
        </li>
        <li>
          <span className="text-foreground">Hybrid workflows</span> that use static control as
          a backbone and RTK for working points.
        </li>
      </ul>

      <div className="clear-both" />

      <h2 id="monuments" className="text-2xl font-semibold mt-10 mb-4">
        Monumentation
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Control is only useful if it can be recovered. We advise on station location (stability,
        sky visibility, access) and help document monuments/marks with clear descriptions and
        photos so teams can reuse the network reliably.
      </p>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <ArticleFigure
        src={topoMapsImg}
        alt="Mapping tied to control"
        caption="Accurate control underpins reliable mapping, models, and engineering outputs."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Coordinates and heights with quality statistics</li>
        <li>Control diagrams and station descriptions</li>
        <li>Observation logs and adjustment summaries</li>
        <li>Control register (IDs, marks, photos, access notes)</li>
      </ul>

      <h2 id="qa" className="text-2xl font-semibold mt-10 mb-4">
        Quality control
      </h2>
      <ArticleFigure
        src={gnssI89Img}
        alt="Field workflows"
        caption="Checks include redundancy, closures, and consistency against required tolerances."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        QA focuses on repeatability and traceability. We plan sessions, confirm antenna heights,
        apply redundancy where required, and review adjustment results so the network is stable
        and fit for downstream mapping and construction.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need Geodetic Control?</h3>
        <p className="text-muted-foreground mb-4">
          Talk to us about establishing or verifying control networks for your project area.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default GeodeticGpsControl;

