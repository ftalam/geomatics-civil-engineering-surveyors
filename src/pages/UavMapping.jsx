import ArticleLayout from "@/components/ArticleLayout";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";
import aidroneImg from "@/assets/AIDRONE.jpg";
import x500Img from "@/assets/chcnav-x500-uav-professional-multirotor-drone.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "outputs", label: "Outputs" },
  { id: "quality", label: "Quality control" },
];

const UavMapping = () => {
  return (
    <ArticleLayout
      title="UAV-Based Mapping"
      tagline="Drone-powered aerial surveys for rapid and accurate terrain mapping."
      hatnote={
        <>
          For terrain deliverables and contours, see <Link to="/services/topographic-surveys" className="text-primary hover:underline">Topographic Surveys</Link>.
        </>
      }
      toc={toc}
      infobox={{
        title: "UAV mapping",
        images: [
          {
            src: x500Img,
            alt: "Survey UAV",
            caption: "UAV platforms used for aerial mapping",
          },
        ],
        items: [
          { label: "Typical outputs", value: "Orthophoto, DEM/DSM, point cloud" },
          { label: "Use", value: "Sites, corridors, monitoring" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        UAV (drone) mapping delivers rapid coverage for orthophotos, terrain models,
        and 3D outputs. It’s ideal for progress monitoring, route selection,
        volumetrics, and large sites that need quick turnaround.
      </p>

      <ArticleGallery
        title="Examples"
        items={[
          { src: x500Img, alt: "UAV", caption: "Aerial capture" },
          { src: aidroneImg, alt: "Drone mapping", caption: "Orthophoto production" },
          { src: topoMapsImg, alt: "Topo outputs", caption: "Contours and surfaces" },
        ]}
      />

      <h2 id="outputs" className="text-2xl font-semibold mt-10 mb-4">
        Typical outputs
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Orthophotos and mosaics</li>
        <li>Point clouds and 3D meshes</li>
        <li>DEM/DSM and contours</li>
        <li>Volumes (cut/fill) and measurement reports</li>
      </ul>

      <h2 id="quality" className="text-2xl font-semibold mt-10 mb-4">
        Quality control
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        We plan flights around accuracy needs, establish appropriate ground control
        where required, and validate outputs with checks to ensure reliable results
        for engineering and planning decisions.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need UAV Mapping?</h3>
        <p className="text-muted-foreground mb-4">
          Contact us for drone mapping tailored to your accuracy, coverage, and
          deliverable requirements.
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

export default UavMapping;

