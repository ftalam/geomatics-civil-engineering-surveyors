import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleStack from "@/components/ArticleStack";
import { Link } from "react-router-dom";

import geospatialImg from "@/assets/geospatial.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";
import architectureImg from "@/assets/architecture.jpg";
import landuseImg from "@/assets/SubdivisionPlan.png";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "when", label: "When you need it" },
  { id: "evidence", label: "Boundary evidence" },
  { id: "deliverables", label: "Deliverables" },
  { id: "process", label: "Process" },
  { id: "qa", label: "Checks & QA" },
];

const CadastralSurvey = () => {
  return (
    <ArticleLayout
      title="Land (Cadastral) Surveys"
      tagline="Boundary determination, subdivision and land ownership documentation."
      hatnote={
        <>
          For engineering and construction support, see{" "}
          <Link to="/services/engineering-surveys" className="text-primary hover:underline">
            Engineering Surveys
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Cadastral survey",
        images: [
          {
            src: landuseImg,
            alt: "Subdivision plan",
            caption: "Subdivision planning and parcel definition",
          },
        ],
        items: [
          { label: "Focus", value: "Parcel boundaries" },
          { label: "Type", value: "(a). RIM-based surveys (approximate boundaries)  (b).Fixed surveys (precise coordinates and deed plans)" },
          { label: "Technologies", value: "GNSS(RTK GPS) Systems, Total stations,Digital levels, GIS Software e.g QGIS, CAD Tools like AutoCAD Civil 3D, UAVs for supplementary mapping" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Cadastral surveying focuses on defining, re-establishing and documenting real property
        boundaries. It involves the physical delineation of property boundaries and determination of dimensions, areas and certain rights associated with properties in accordance with national laws such as the Land Registration Act and the Survey Act.
       This is regardless of whether they are on land, water or defined by natural or artificial features.
      </p>

      <ArticleFigure
        src={topoMapsImg}
        alt="Survey plan and mapping outputs"
        caption="Boundary work relies on records, measurements and clear documentation."
        align="right"
        widthClassName="md:w-[300px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <p className="text-muted-foreground leading-relaxed">
        A cadastral surveyor must apply both the spatial-measurement principles of general surveying and legal principles such as respect of neighboring titles. It is a critical service that supports secure land ownership, property transactions, development approvals, and dispute resolution formulating the backbone of land registration systems managed by the <a href="https://www.sok.gov.ke/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
          Survey of Kenya(SOK)
        </a> and the Ministry of Lands and Physical Planning.        
       <h2 id="process" className="text-lg font-semibold mt-2 "> Survey process </h2>
        - The first stage in such a survey, known as a <b>resurvey</b>, is to obtain copies of the deed description and all other available documents.
       The deed description is from a deed and not a tax statement or other incomplete document. The surveyor would also obtain copies of deed descriptions and maps of the adjoining properties, any records from the municipality or county, utility maps, and any records of surveys. 
       <br/> - Depending on which region the survey is located in, records may be incomplete or difficult to find. A thorough <b>search</b> is important so that no records are overlooked. Copies of deeds are usually in the government recorder's office, and maps or plats can usually be found at the recorder or surveyor's office.
        These arrangements will vary state-to-state and survey-system-to-survey system, so local familiarity is important. When all the records are assembled, the surveyor examines the documents for errors, such as closure errors. When a metes and bounds description is involved, the seniority of the deeds must be determined. The title abstract may provide the order of seniority for the deeds related to the tract being surveyed.
       <br/> - After this data is gathered and analyzed, the <b>field survey</b> may commence. The initial survey operations are concentrated on locating monuments. Property corners may be marked by iron pins, metal survey markers, iron pipes, and other features possibly establishing a line of possession will be located.
        <br/> -When the approximate positions for the boundaries of the property have been located, <b> a traverse</b> is run around the property. While the control traverse is being run, ties will be measured and all details relevant to the boundaries will be acquired. 
        This includes but is not limited to locating the property corners, monuments, fences, hedge rows, walls, walks, and buildings on the lot. <br/> - The surveyor then takes this collected data and compares it to the records which were received.
        When a solution is reached, the chosen property corners (those that best fit all the data) are coordinated, and ties by direction and distance are computed from the nearest traverse point. 
        Once this has been established the features on the lot can be drawn, dimensions can be shown from these features to the boundary line, and a map or plat is prepared for the client.
        <br/> Boundary surveys typically combine records research, control verification, evidence
          collection and measurement checks. Outputs are compiled in formats suitable for
          approvals and long-term reference as they become part of cadastral framework.
      </p>

      <div className="clear-both" />

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Typical deliverables
      </h2>
        <ArticleStack
              items={[
                {
                  src: geospatialImg,
                  alt: "UAV fieldwork",
                  caption: "UAV fieldwork for aerial mapping and rapid coverage",
                },
                {
                  src: landuseImg,
                  alt: "Orthophoto example",
                  caption: "Orthophoto example (geometrically corrected aerial imagery)",
                },
                {
                  src: geospatialImg,
                  alt: "Topographic map",
                  caption: "A map sheet with terrain representation and contours",
                },
                
              ]}
              align="right"
              widthClassName="md:w-[340px] h-auto"
            />
      
      <ul className="list-disc pl-4 text-muted-foreground space-y-2">
        Our cadastral survey services provide official and legally recognized outputs, including: 
        <li><b>Deed plans.</b> Prepared and authenticated through SOK for fixed boundary surveys</li>
        <li><b>Mutation forms</b> Required for subdivision and submitted to the land registry</li>
        <li><b>Registry Index Maps (RIM) Extracts</b> For general boundary surveys (common in rural areas)</li>
        <li><b>Beacon Certificates</b> Documentation confirming placements or restoration of boundary marks</li>
        <li><b>Survey reports</b> Detailed methodology, findings and compliance notes</li>
        <li><b>Digital Outputs</b> CAD drawings, georeferenced plans and other GIS files; GeJSON etc,.</li>
      </ul>

      <h2 id="when" className="text-xl font-semibold mt-10 mb-4"> When do you need a cadastral survey? </h2>
      <ul className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Land Purchase or Sale. To confirm exact boundaries before transfers, avoid encroachments and legal disputes. </li>
        <li>Subdivisions, Mutations and Amalgamations. Required for approval and new title issuance.</li>
        <li>Title Deed processing. For conversion of land ownership records and areas transitioning from RIM to fixed surveys.</li>
        <li>Boundary Re-establishment i.e when beacons are missing, disturbed or disputed.</li>
        <li>Boundary dispute support and legally defensible evidence documentation. </li>
        <li>Development and construction works. To ensure works are within property limits and comply with regulations.</li>
        <li>Land use planning and management. Supports accurate land records, zoning and resource management.</li>
        <li>Infrastructure & Utility projects. For right-of-way definition, easement documentation and land acquisition surveys.</li>
      </ul>

      <div className="clear-both" />


      <h2 id="evidence" className="text-xl font-semibold mt-10 mb-4">
        Boundary evidence
      </h2>
      <ArticleFigure
              src={landuseImg}
              alt="Land-use plan example"
              caption="Land-use plans translate policy goals into mapped allocations and rules."
              align="right"
              widthClassName="md:w-[340px]"
              thumbImgClassName="w-full h-44 object-cover"
            />
      <p className="text-muted-foreground leading-relaxed">
        Cadastral boundaries are not only geometry. We document boundary evidence so the final
        position can be explained and defended if questions arise later. Evidence can include
        beacon marks/monuments, occupation lines (fences, hedges, walls), long-standing use
        and reference ties to control.
      </p>
      <div className="clear-both" />

      <h2 id="qa" className="text-2xl font-semibold mt-10 mb-4">
        Checks & QA
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        We apply measurement and computation checks appropriate to the job (control closure,
        redundancy where required, and consistency checks against records and field evidence)
        so outputs are reliable and defensible.
      </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Cadastral Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Whether you are <b>buying land, subdividing property, resolving a boundary dispute or planning development</b>, our licensed cadastral surveying services ensure <b>accuracy, compliance and peace of mind</b>. <br/> Contact us today for reliable professional land surveying services across the country.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default CadastralSurvey;

