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
        UAV (drone) mapping delivers rapid coverage for orthophotos, terrain models and 3D
        outputs. It is ideal for progress monitoring, route selection, volumetrics, and large
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

      <h2 id="basics" className="text-xl font-semibold mt-10 mb-2">
        Photogrammetry basics
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Most UAV mapping is photogrammetry: overlapping images are matched to reconstruct a 3D
        model of the surface. Key concepts include:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <span className="text-foreground">Overlap</span>: forward/side overlap improves
          matching and reduces gaps.
        </li>
        <li>
          <span className="text-foreground">GSD</span> (ground sample distance): the ground size
          represented by a pixel; smaller GSD generally means more detail.
        </li>
        <li>
          <span className="text-foreground">Control</span>: ground control points (GCPs) and
          check points improve absolute accuracy and reporting.
        </li>
      </ul>

      <div className="clear-both" />

      <h2 id="workflow" className="text-xl font-semibold mt-1 mb-2">
        Workflow
      </h2>
       <p className="text-muted-foreground leading-relaxed">
          The process begins with clearly defining the project objectives, required accuracy and expected outputs. <br/>This includes: 
          <ol className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Determining whether the survey is for <b>topographic mapping</b>, <b>construction monitoring</b>, <b>volumetric analysis</b> or <b>inspection</b></li>
            <li>Establishing accuracy requirements (e.g., centimeter-level for engineering vs general mapping)</li>
            <li>Identifying deliverables such as orthomosaics, digital surface models (DSM) or 3D textured meshes</li> 
          </ol>
          A well-defined scope ensures that all subsequent steps are aligned with project goals and regulatory requirements.
        </p>
        <p className="text-muted-foreground leading-relaxed"> <b>Flight planning</b> is then done carefully to ensure optimal coverage and data quality. This involves designing flight lines with appropriate altitude, speed & overlap, typically 70-80% forward and 60-70% side overlap, while considering airspace restrictions, terrain variation and environmental conditions.</p>
        <p className="text-muted-foreground leading-relaxed"> <b>Ground control points (GCPs)</b> are established on-site to improve the absolute accuracy of the outputs. These are surveyed with high-precision GNSS or total stations & used to goerefence the model. Field notes and photos of GCPs are taken to ensure they can be reliably identified during processing. <b>Independent check points</b> are also used to verify accuracy. This ensure UAV data aligns with real-world coordinates, especially for engineering-grade surveys. </p>
        <p className="text-muted-foreground leading-relaxed"> The UAV is then deployed to capture the required imagery under the planned conditions. During this stage, images are captured systematically along planned flight lines, field notes are recorded (weather conditions, anomalies, site observations) while equipment performance and data quality are monitored in real time. Proper data capture ensures completeness, clarity & traceability, which are critical for downstream processing.</p>
        <p className="text-muted-foreground leading-relaxed">After data capture, imagery is processed using photogrammetry software that performs <b> aerial triangulation</b> (image alignment), <b>dense point cloud generation</b> and <b>surface modeling</b> (DEM, DTM, DSM). The resulting outputs are validated against check points and project specifications to ensure they meet the required accuracy and quality standards before being compiled into final deliverables.</p>

      <div className="clear-both" />

      <h2 id="outputs" className="text-xl font-semibold mt-10 mb-4">
        Typical outputs
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
        <li>Orthophotos and mosaics</li>
        <li>Point clouds and 3D meshes</li>
        <li>DEM/DSM and contours</li>
        <li>Volumes (cut/fill) and measurement reports</li>
        <li>Common formats: GeoTIFF, LAS/LAZ, DXF, PDF maps, CSV/Excel reports</li>
      </ul>

      <div className="clear-both" />

      <h2 id="accuracy" className="text-xl font-semibold mt-10 mb-4">
        Accuracy
      </h2>
     
      <p className="text-muted-foreground leading-relaxed">
        We plan flights around accuracy requirements, establish appropriate control where
        required, and validate results using check points and consistency checks. Final accuracy
        is reported against the agreed specification so outputs are fit for engineering and
        planning decisions.
      </p>
      <ArticleFigure
        src={NakuruImg}
        alt="Orthophoto example"
        caption="Accuracy depends on control, overlap, calibration, and checks."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <h2 id="usecases" className="text-xl font-semibold mt-1 mb-2">
        Use cases
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
        <li>Construction progress monitoring and reporting</li>
        <li>Route selection and corridor surveys</li>
        <li>Stockpile and earthworks volumetrics</li>
        <li>Environmental monitoring and change detection</li>
        <li>Planning basemaps for large sites and projects</li>
      </ul>

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

