import ArticleFigure from "@/components/ArticleFigure";
import ArticleGallery from "@/components/ArticleGallery";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleStack from "@/components/ArticleStack";
import { Link } from "react-router-dom";
import topoMapsImg from "@/assets/topo-maps.jpg";
import NakuruImg from "@/assets/NakuruAerialImg.png";
import architectureImg from "@/assets/architecture.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import UAVfieldwork from "@/assets/UAVfieldwork.jpg";
import contoursImg from "@/assets/contours.png";
import { useState } from "react"; 
import DEM from "@/assets/sasumwaDEM.png";

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
        construction, and land development projects. It involves accurately measuring
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
          {
            src: NakuruImg,
            alt: "Orthophoto example",
            caption: "Orthophoto example (geometrically corrected aerial imagery)",
          },
          {
            src: topoMapsImg,
            alt: "Topographic map",
            caption: "A map sheet with terrain representation and contours",
          },
          
        ]}
        align="right"
        widthClassName="md:w-[340px]"
      />

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        What is a topographic survey?
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        A topographic survey captures the positions of not only relief but also natural, artifical and cultural features (roads, buildings,
        drainage, utilities) together with elevations (spot heights, contours,
        profiles). Deliverables can include fixed-dimension maps, CAD drawings,
        orthophotos and digital terrain models depending on specification. <br/> 
        Work on one of the first topographic maps was begun in France by Giovanni Domenico Cassini, the great Italian astronomer.
      </p>
      <p className="text-muted-foreground leading-relaxed">
        The classical topographic mapping workflow is typically organized into
        sequential steps to ensure accuracy and consistency:
      </p>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>
          Project specification: define outputs, accuracy, content, format, schedule,
          and costing.
        </li>
        <li>
          Establishment of control: set horizontal and vertical control using GNSS,
          traverses, and/or leveling techniques as required.
        </li>
        <li>
          Aerial photography (when applicable): capture imagery with appropriate
          overlap and conditions to support mapping.
        </li>
        <li>
          Aerotriangulation and adjustment: compute camera orientation and ground
          coordinates to support reliable measurements.
        </li>
        <li>
          Data capture: collect planimetric features and elevation information (spot
          heights, breaklines, profiles).
        </li>
        <li>
          Verification: field check ambiguous features and confirm names/boundaries
          when needed.
        </li>
        <li>
          Compilation: produce maps, CAD/GIS deliverables, terrain models, and
          supporting metadata.
        </li>
        <li>
          Quality review: validate accuracy and completeness against the agreed
          specification.
        </li>
      </ol>

      <h2 id="toposdata" className="text-2xl font-semibold mt-10 mb-4">
              Forms of topographic data
            </h2>
            <p className="text-muted-foreground leading-relaxed">
            In practice, surveyors first sample heights in an area, then use these to produce a Digital Land Surface Model in the form of a TIN. The DLSM can then be used to visualize terrain, drape remote sensing images, quantify ecological properties of a surface or extract land surface objects. The contour data or any other sampled elevation datasets are not a DLSM. A DLSM implies that elevation is available continuously at each location in the study area, i.e. that the map represents a complete surface.
            </p>

      <div className="grid grid-cols-2">  
          <div>
            <h2 className="font-semibold "> Raw Survey data</h2> 
            <p className="text-muted-foreground leading-relaxed"> Topographic survey information is historically based upon notes of surveyors. They may derive naming and cultural information from other local sources
              (for example, boundary delineation may be derived from local cadastral mapping) together with field observations. This information is often captured in field books, which are then used to produce the final map. In modern practice, surveyors may also capture this information digitally using tablets or other devices in the field, which can then be directly integrated into the mapping process.
            </p> 
            <ArticleGallery
              items={[
                { src: UAVfieldwork, alt: "UAV fieldwork", caption: "Field survey data capture" },
                { src: NakuruImg, alt: "Orthophoto", caption: "Orthophoto output" },
              ]}
            />
          </div>
          <div>
            <h2 className="font-semibold "> Remote sensing data</h2> 
            <p className="text-muted-foreground leading-relaxed"> As with field notes, remote sensing data (aerial and satellite photography, for example), is raw and uninterpreted. It may contain holes (due to cloud cover for example) or inconsistencies (due to the timing of specific image captures). Most modern topographic mapping includes a large component of remotely sensed data in its compilation process.</p>
             <ArticleGallery
              items={[
                { src: contoursImg, alt: "Contour representation", caption: "Relief represented using contour lines", },
                { src: NakuruImg, alt: "Orthophoto", caption: "Orthophoto output" },
              ]}
            /> 
          </div>
          <div>
            <h2 className="font-semibold "> Topological modelling</h2> 
             <p className="text-muted-foreground leading-relaxed"> Topological models represent the spatial relationships between different features in the landscape. A geographic information system (GIS) can recognize and analyze the spatial relationships that exist within digitally stored spatial data. These topological relationships allow complex spatial modelling and analysis to be performed. Topological relationships between geometric entities traditionally include adjacency (what adjoins what), containment (what encloses what), and proximity (how close something is to something else)
                <ol className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li> reconstitute a sight in synthesized images of the ground </li>
                  <li> determine a trajectory of overflight of the ground </li>
                  <li> calculate surfaces or volumes </li>
                  <li> trace topographic profiles</li>
                </ol>
             </p>
          </div>
           <div>
            <h2 className="font-semibold "> Digital Elevation Model</h2> 
            <p className="text-muted-foreground leading-relaxed"> The digital elevation model (DEM) is a raster-based digital dataset of the topography (hypsometry and/or bathymetry) of all or part of the Earth (or a telluric planet). 
              The pixels of the dataset are each assigned an elevation value, and a header portion of the dataset defines the area of coverage, the units each pixel covers, and the units of elevation (and the zero-point). Other models typically  include the digital terrain model (DTM), which represents the bare earth surface and Digital Surface Model (DSM), which represents the elevation of the top of the canopy or built structures.
              <br/> These Models may be derived from existing paper maps and survey data, or they may be generated from new satellite or other remotely sensed radar or sonar data.  </p>
             <ArticleGallery
              items={[
                { src: DEM, alt: "Digital Elevation Model", caption: "Sasumwa Line DEM" },
                { src: NakuruImg, alt: "Orthophoto", caption: "Orthophoto output", align: "right" },
              ]}
            /> 
          </div>
      </div> 

      <h3 id="maps" className="font-semibold"> Topographic maps </h3>
      <ArticleFigure
        src={architectureImg}
        alt="Survey plan"
        caption="Planimetric and topographic outputs used for design"
        align="right"
      />
     
      <h2 id="profiles" className="text-2xl font-semibold mt-10 mb-4">
        Profiles & cross-sections
      </h2>
      <ArticleFigure
        src={civilWorksImg}
        alt="Profile section"
        caption="Profiles and cross-sections support design and earthworks"
        align="right"
      />
      <p className="text-muted-foreground leading-relaxed">
        Profiles and cross-sections describe elevation changes along a line. They are
        essential for corridor design (roads and pipelines), drainage planning, and
        cut/fill computations.
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
