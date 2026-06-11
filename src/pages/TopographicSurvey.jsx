import ArticleFigure from "@/components/ArticleFigure";
import ArticleGallery from "@/components/ArticleGallery";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleStack from "@/components/ArticleStack";
import { Link } from "react-router-dom";
import topoMapsImg from "@/assets/topo.png";
import NakuruImg from "@/assets/NakuruAerialImg.png";
import architectureImg from "@/assets/architecture.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import UAVfieldwork from "@/assets/UAVfieldwork.jpg";
import contoursImg from "@/assets/contours.png";
import { useState } from "react"; 
import DEM from "@/assets/sasumwaDEM.png";
import profile from "@/assets/PLAN&PROFILE.png";
import cs from "@/assets/CROSS-SECTION.png";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "toposdata", label: "Topographic data" },
  { id: "maps", label: "Topographic maps" },
  { id: "profiles", label: "Profiles & cross-sections" },
];

const TopographicSurvey = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <ArticleLayout
      title="Topographic Surveys"
      tagline="Detailed terrain mapping and elevation data for project planning and design."
      hatnote={
        <>
          For data integration and analysis, see{" "}
          <Link
            to="/services/gis-remote-sensing"
            className="text-primary hover:underline"
          >
            GIS & Remote Sensing
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Topographic map sheet",
        images: [
          {
            src: topoMapsImg,
            alt: "Topographic map",
            caption: "Contours and terrain representation",
             },
        ],
          description: "Topoographic maps(or sheets) represent relief using contour lines and other elevation information, together with key natural and man-made features. Modern topographic mapping may combine terrestrial observations with UAV imagery, GNSS, and other remote sensing workflows to deliver consistent, project-ready outputs.",
        items: [
          { label: "Typical outputs", value: "Plans, contours, DTM/DSM" },
          { label: "Use", value: "Design, construction, planning" },
          { label: "Capture", value: "GNSS, total station, UAV" },
         ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Topographic surveying is the foundation of successful engineering,
        construction and land development projects. It involves accurately measuring
        and mapping natural and man-made features to support design decisions and
        verification on the ground.
      </p>

      <ArticleStack
        items={[
          {
            src: UAVfieldwork,
            alt: "UAV fieldwork",
            caption: "UAV fieldwork for aerial mapping and rapid coverage",
          },
        ]}
        align="right"
        widthClassName="md:w-[340px]"
      />

      
      <p className="text-muted-foreground leading-relaxed">
      Our topographic survey service <b>integrates modern techniques</b> such as <b>UAV mapping</b> for rapid, high-resolution coverage with established <b>ground survey methods</b> to achieve the required accuracy. We establish robust control, <b>capture detailed terrain and feature data</b>, and 
      verify critical elements in the field to ensure consistency and completeness.<br/>

      Whether for roads, buildings, utilities or land development, our surveys deliver the clarity needed to move projects forward 
      efficiently providing a dependable foundation for design, analysis and execution. 
      <br/> Deliverables can include fixed-dimension maps, CAD drawings,
        orthophotos and digital terrain models depending on specification. 
      </p>


      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Topographic Survey?</h3>
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
    </ArticleLayout>
  );
};

export default TopographicSurvey;
