import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import gnssI93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import gnssI76Img from "@/assets/gnss-smart-full-antennas-chcnav-i76.jpg";
import gnssI89Img from "@/assets/gnss-smart-full-antennas-chcnav-i89.jpg";
import stakeImg from "@/assets/monument.jpg";
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

      <h2 id="datums" className="text-xl font-semibold">
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
  <div className = "grid grid-cols-2">
   
      <div>
      <h2 id="monuments" className="text-xl font-semibold">
        Monumentation
      </h2>
      <ArticleFigure
        src={stakeImg}
        alt="Monumentation"
        caption="Proper monumentation ensures long-term stability and reusability of control points(CPs)."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-28 object-contain"
      />
      <p className="text-muted-foreground leading-relaxed">
        Control is only useful if it can be recovered. CPs are physically marked on the ground using durable monuments such as concrete pillars, metal rods or survey nails.
         We advise on station location (stability,
        sky visibility, access) and help document monuments/marks with clear descriptions and
        photos so teams can reuse the network reliably.
      </p>
      </div>
      <div> 
      <p className="text-muted-foreground leading-relaxed">
        Methods are selected based on accuracy requirements, logistics and the size of the
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
      </div>
      </div>

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

