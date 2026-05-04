import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";
import civilWorksImg from "@/assets/civil-works.jpg";
import architectureImg from "@/assets/architecture.jpg";
import topoMapsImg from "@/assets/topo-maps.jpg";
import geospatialImg from "@/assets/geospatial.jpg";

const toc = [
  { id: "overview", label: "Overview" },
  { id: "scope", label: "Scope" },
  { id: "workflows", label: "Typical workflows" },
  { id: "deliverables", label: "Deliverables" },
  { id: "qa", label: "Quality control" },
];

const EngineeringSurvey = () => {
  return (
    <ArticleLayout
      title="Engineering Surveys"
      tagline="High-precision surveys for infrastructure and construction projects."
      hatnote={
        <>
          For terrain-focused mapping, see{" "}
          <Link to="/services/topographic-surveys" className="text-primary hover:underline">
            Topographic Surveys
          </Link>
          .
        </>
      }
      toc={toc}
      infobox={{
        title: "Engineering survey",
        images: [
          {
            src: civilWorksImg,
            alt: "Civil works and construction",
            caption: "Construction control and verification",
          },
        ],
        description: "Construction surveying: also known as staking, stake-out, layout or setting-out is the process of translating engineering designs into physical positions on the ground. It provides dimensional control at every stage of construction, ensuring that structures such as buildings, roads, railways and pipelines are built exactly according to design specifications. Construction surveying is the bridge between design and reality; without it, even the most precise engineering plans cannot be accurately implemented on the ground.",
        items: [
          { label: "Focus", value: "Setting out + as-builts" },
          { label: "Accuracy", value: "Project specification" },
          { label: "Outputs", value: "Plans, levels, reports" },
        ],
      }}
    >
     
      <p id="scope-description" className="text-lg text-muted-foreground leading-relaxed">
        We support design and construction by establishing control, setting out key features, verifying levels and producing as-built records.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
      
      <li><b>Feasibility Studies.</b> We assess site conditions early through reconnaissance and preliminary topographic surveys, helping identify opportunities, constraints, and project risks before design begins.</li>
      <li><b>Control Surveys (Geodetic Framework).</b> We establish the reference framework for the subsequent surveys hence ensuring all project data aligns correctly. </li>
      <li><b>Detailed Topographic Surveys.</b> This captures high resolution ground data including measurements of terrain features (roads, buildings, utilities), spot heights and contour generation and mapped drainage patterns and surface features suppling engineers with accurate data for design and analysis. </li>
      <li><b>Engineering Design Support.</b> This involves preparation of base maps for CAD design, alignment definition and cross-sections and longitudinal profiles drawing which enables precise engineering design and modeling. </li>
      <li><b>Setting Out (Construction layout).</b> We translate designs onto the ground with precision, marking structures, utilities, and control lines to ensure construction follows exact specifications. </li>
       <ArticleFigure
        src={architectureImg}
        alt="Site layout and built environment"
        caption="Site layout combines control, design interpretation, and continuous checks."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <li><b>Construction Surveys.</b> These are conducted to check alignment and levels during construction, verify positions of installed elements while continuously monitoring progress. </li>
      <li><b>Earthworks & Quantity Surveys.</b> We do volume calculations (cut and fill), stockpile measurements and terrain comparison to help manage material usage & project costs. </li>
      <li><b>As-Built Surveys and QA Checks.</b>We capture accurate final project records and perform quality checks to confirm works are built to design, standards, and compliance requirements.</li>
      <li><b>Deformation/Monitoring Surveys.</b> These are conducted where required to assess structural performance and safety. Settlement and displacement measurements are done with observations of structures made either periodically or continuously. </li>
     <p>Engineering surveying is not a single task—it is a continuous, integrated process that ensures every stage of a project is grounded in accurate spatial data.</p>
      </ul>
    <div className="clear-both" />

      
      <h2 id="qa" className="text-xl font-semibold mt-10 mb-4">
        Quality control
      </h2>
      <ArticleFigure
        src={geospatialImg}
        alt="Survey checks and QA"
        caption="Independent checks and consistent control reduce rework and risk."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
      A key aspect of quality control is <b>verification and redudancy</b>. Measurements are often repeated & independent checks such as <b>closing traverses</b>, <b>backsight/foresight observations</b> & <b>level loops</b> are carried out to detect & minimize errors. Instruments are regularly calibrated and tested to ensure they are functioning correctly, while environmental factors such as temperature, wind & line-of-sight obstructions are also considered during fieldwork.
Another important component is <b>data validation</b> and <b>adjustment</b>. Survey data is reviewed, processed & adjusted (often using least squares methods) to achieve the best possible accuracy. Surveyors also ensure that all work is properly <b>referenced to established control points & datums</b>, maintaining consistency across the entire project.

Documentation plays a crucial role in quality control.   </p>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need an Engineering Survey?</h3>
        <p className="text-muted-foreground mb-4">
          From site assessment to construction setting-out and monitoring, our engineering surveying services deliver with  precision, efficiency and reliability.<br/> Get in touch today to ensure your project is built on accurate data and expert surveying.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </ArticleLayout>
  );
};

export default EngineeringSurvey;

