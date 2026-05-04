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
          { label: "Type", value: "(a). RIM-based surveys (approximate boundaries)  (b).Fixed surveys (precise coordinates and deed plans)" },
          { label: "Technologies", value: "GNSS(RTK GPS) Systems, Total stations,Digital levels, GIS Software e.g QGIS, CAD Tools like AutoCAD Civil 3D, UAVs for supplementary mapping" },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
      We focuses on defining, re-establishing and documenting real property
      boundaries. It involves their physical delineation, determination of dimensions, areas and certain rights associated with properties in accordance with national laws such as the Land Registration Act and the Survey Act.
       This is regardless of whether they are on land, water or defined by natural or artificial features.
      </p>

      <p className="text-muted-foreground leading-relaxed">
        - A boundary (<b>resurvey</b>) begins with obtaining deed descriptions and all available records, followed by a thorough <b>search</b> to account for incomplete or hard-to-find documentation.
          <br/> - The <b>field survey</b> then commences with initial survey operations concentrated on locating monuments. 
     Property corners may be marked by iron pins, metal survey markers, iron pipes e.tc.,
        <br/> -When the approximate positions for the boundaries of the property have been located, <b> a traverse</b> is run around the property. 
        While the control traverse is being run, ties will be measured and all details relevant to the boundaries will be acquired. 
        This includes but is not limited to locating the property corners, monuments, fences, hedge rows, walls, walks, and buildings on the lot. <br/>
        <br/> Boundary surveys typically combine records research, control verification, evidence
          collection and measurement checks. 
      </p>

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

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Cadastral Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Whether you are <b>buying land, subdividing property, resolving a boundary dispute or planning development</b>, our licensed 
          cadastral surveying services ensure <b>accuracy, compliance and peace of mind</b>. <br/> Contact us today for reliable 
          professional land surveying services across the country.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default CadastralSurvey;

