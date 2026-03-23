import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import civilWorksImg from "@/assets/civil-works.jpg";
import aidroneImg from "@/assets/AIDRONE.jpg";
import architectureImg from "@/assets/architecture.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";


const EngineeringSurvey = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Back to Services"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-6">
            Engineering Surveying: Mapping the Real World with Precision
          </h1>

          {/* Intro */}
          <p className="text-lg text-muted-foreground mb-8">
            Engineering surveying is the foundation of all successful engineering,
            construction, and land development projects. It provides a detailed
            representation of terrain, features, and elevation changes.
          </p>

          {/* HERO IMAGE */}
          <img
            src={civilWorksImg}
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Engineering survey"
          />

          {/* SECTION */}
          <h2 className="text-2xl font-semibold mb-4">
            What is an Engineering Survey?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Engineering surveying supports design and construction by establishing
            control, setting out key features, verifying levels, and producing
            as-built records. It helps ensure the works are built in the right
            position, at the right elevation, and to specification.
          </p>

          {/* ORTHOPHOTO SECTION */}
          <h2 className="text-2xl font-semibold mb-4">
            Orthophotos (Aerial Mapping)
          </h2>
          <p className="mb-6 text-muted-foreground">
            Orthophotos are high-resolution aerial images corrected for distortion,
            allowing accurate measurements. They are commonly generated using UAV
            (drone) surveys.
          </p>

          <img
            src={aidroneImg}
            className="w-full rounded-xl mb-10"
            alt="Aerial mapping for engineering projects"
          />

          {/* MAPS */}
          <h2 className="text-2xl font-semibold mb-4">
            Site survey maps
          </h2>
          <p className="mb-6 text-muted-foreground">
            Engineering survey plans show detailed layouts of sites including grid,
            boundaries and infrastructure. These are essential for engineers and
            architects during project design and construction.
          </p>

          <img
            src={architectureImg}
            className="w-full rounded-xl mb-10"
            alt="Engineering site plan"
          />

          {/* PROFILES */}
          <h2 className="text-2xl font-semibold mb-4">
            Profiles & Cross-Sections
          </h2>
          <p className="mb-6 text-muted-foreground">
            Profiles and cross-sections represent elevation changes along a line,
            helping in road design, drainage planning, and earthworks calculations.
          </p>

          <img
            src={topoMapsImg}
            className="w-full rounded-xl mb-10"
            alt="Profiles and cross-sections"
          />

          {/* PROCESS */}
          <h2 className="text-2xl font-semibold mb-4">
            The engineering survey process involves several key sequential steps
          </h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Project Specification: Define the specifications including the products to be generated, potential users needs, required accuracies, map content, delivery format, schedule and costing.</li>
            <li>Establishment of control: For horizontal control, establish the CPs to determine coordinate positions using methods like triangulation, trilateration, traversing or GNSS.For vetical control, determine elevations using trigonometrical heighting, spirit levelling or GPS-geoid techniques. Also provision of photo controls; link aerial photographs to ground details using well-distributed CPs marked on the ground.</li>
            <li>Aerial Photography: Calibrate the aerial camera to ensure proper adjustment then conduct aerial photography under suitable weather and lighting conditions, maintaining at least 60% overlap between successive photographs and 30% side overlap for adjacent strips.</li>
            <li>Analytical Aero-Triangulation: Measure photographic coordinates of pre-marked control points, pass points, and tie points then, determine the position and orientation of the camera at the time of each exposure to compute coordinates of any point on the photograph.</li>
            <li>Stereo data capture: Collect planimetric; features like buildings, rivers & topographic data i.e spot heights and profiles, using stereo plotter or by tracing directly from digitized orthophotos.</li>
            <li>Verification: Check ambiguos features in the field using aerial photograps then verify place names & political boundaries by consulting historical records and local residents.</li>
            <li>Map compilation: Process captured data into various products, such as fixed dimension maps, merged planimetric and topographic data, seamless digital files(DEM, DSM), orthophotos, hard copy maps, and spatial database files with attributes.</li>
            <li>Quality review: Conduct a quality test to ensure adherence to specifications, consistency, and accuracy of both printed maps and digital data. Follow standards like the National Map Accuracy Standards used by the USGS, including field checking points on a sample of maps.</li>
          </ul>
          <p>These steps ensure that large-scale topo maps are accurate, reliable and suitable for the various applications.</p>

          {/* CTA */}
          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">
              Need an Engineering Survey?
            </h3>
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

        </div>
      </section>
    </Layout>
  );
};

export default EngineeringSurvey;
