import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import aidroneImg from "@/assets/AIDRONE.jpg";
import x500Img from "@/assets/chcnav-x500-uav-professional-multirotor-drone.jpg";
import UAVfieldwork from "@/assets/UAVfieldwork.jpg";
import NakuruImg from "@/assets/NakuruAerialImg.png";
import sasumwaDemImg from "@/assets/sasumwaDEM.png";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "basics", label: "Photogrammetry basics" },
  { id: "workflow", label: "Workflow" },
  { id: "outputs", label: "Outputs" },
  { id: "accuracy", label: "Accuracy" },
  { id: "usecases", label: "Use cases" },
];

const UavMapping = () => {
  return (
    <ArticleLayout
      title="UAV-Based Mapping"
      tagline="Drone-powered aerial surveys for rapid and accurate terrain mapping."
      hatnote={
        <>
          For terrain deliverables and contours, see{" "}
          <Link to="/services/topographic-surveys" className="text-primary hover:underline">
            Topographic Surveys
          </Link>
          .
        </>
      }
      toc={toc}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
         UAV mapping relies on photogrammetry, where overlapping aerial images are used to reconstruct accurate 3D representations of the ground.
          It is ideal for progress monitoring, route selection, volumetrics and large
        sites that need quick turnaround.
      </p>
        <ArticleFigure
          src={UAVfieldwork}
          alt="UAV fieldwork"
          caption="Flight planning and field checks are key to reliable results."
          align="right"
          widthClassName="md:w-[340px]"
          thumbImgClassName="w-full h-44 object-cover"
        />
       <p className="text-muted-foreground leading-relaxed">
       To achieve this, we undertake a structured survey process that begins with clearly <b>defining project objectives and required accuracy</b>. 
       We then plan and execute <b>UAV flights</b> with adequate forward and side <b>overlap</b>, selecting appropriate altitude to meet the desired 
       <b>ground sample distance (GSD) </b> while accounting for terrain and airspace conditions. <br/>
       <b>Ground control</b> is established using high-precision GNSS or total station surveys to anchor the data spatially. 
       During acquisition, imagery is captured systematically along planned flight paths, with continuous field monitoring to ensure coverage, consistency and data quality. 
       The collected data is then processed through photogrammetric workflows, including <b>image alignment</b> and <b>dense surface reconstruction</b> 
       and rigorously checked against surveyed control points to verify positional accuracy.
       </p>
      <div className="grid grid-cols-2">
        <div>
          <h2 id="outputs" className="text-x font-semibold mt-1 mb-4">
            Typical outputs
          </h2>
          <ArticleFigure
            src={sasumwaDemImg}
            alt="Digital elevation model example"
            caption="Terrain models support design checks, drainage understanding, and quantities."
            align="right"
            widthClassName="md:w-[320px]"
            thumbImgClassName="w-full h-44 object-contain"
          />
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Orthophotos and mosaics</li>
            <li>Point clouds and 3D meshes</li>
            <li>DEM/DSM and contours</li>
            <li>Volumes (cut/fill) and measurement reports</li>
          </ul>
        </div>
        <div>
          <h2 id="usecases" className="text-x font-semibold mt-1 mb-2">
            Use cases
          </h2>
          <ArticleFigure
            src={aidroneImg}
            alt="Orthophoto production"
            caption="Orthophotos provide accurate, map-like imagery for measurements and context."
            align="right"
            widthClassName="md:w-[320px]"
            thumbImgClassName="w-full h-44 object-cover"
          />
          
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Construction progress monitoring and reporting</li>
            <li>Route selection and corridor surveys</li>
            <li>Stockpile and earthworks volumetrics</li>
            <li>Environmental monitoring and change detection</li>
            <li>Planning basemaps for large sites and projects</li>
          </ul>
        </div>
      </div>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need UAV Mapping?</h3>
        <p className="text-muted-foreground mb-4">
          Contact us for drone mapping tailored to your accuracy, coverage, and deliverable
          requirements.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default UavMapping;

