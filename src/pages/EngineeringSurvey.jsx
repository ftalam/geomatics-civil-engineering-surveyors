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
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
       Engineering survey involves the application of precise measurement techniques to support the planning, design, 
       construction and monitoring of infrastructure projects. <br/> Construction surveying has evolved over thousands of years:
        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
          <li>The Great Pyramid of Giza (c. 2700 BC) demonstrates remarkable precision in alignment and orientation</li>
          <li>Stonehenge (c. 2500 BC) is believed to have been set out using peg-and-rope geometry</li>
          <li>The Tunnel of Eupalinos showcases early use of geometric surveying techniques</li>
        </ul>
        Today, traditional tools have been replaced by advanced technologies such as GNSS, total stations and laser scanning, significantly improving accuracy and efficiency.
      </p>

      <ArticleFigure
        src={civilWorksImg}
        alt="Construction setting out"
        caption="Setting out and verification keep construction aligned to design intent."
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <h2 id="scope" className="text-xl font-semibold mt-1">
        Scope
      </h2>
      <p id="scope-description" className="text-lg text-muted-foreground leading-relaxed">
        It supports design and construction by establishing
        control, setting out key features, verifying levels and producing as-built
        records. It helps ensure the works are built in the right position, at the
        right elevation and to specification - executed safely and in compliance with national standards.
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <ArticleFigure
        src={architectureImg}
        alt="Site layout and built environment"
        caption="Site layout combines control, design interpretation, and continuous checks."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <li><b>Feasibility Studies.</b> This supports project planning and decision-making. It involves site reconnaissance and terrain assessment together with preliminary topographic surveys to aid in identification of natural and man-made features. This helps engineers determine whether the project is viable and identify potential risks early (e.g., flood zones,steep terrain).</li>
      <li><b>Control Surveys (Geodetic Framework).</b> This establishes the reference framework for the subsequent surveys. Key activities include stablishment of horizontal and vertical control points through traversing/trilateration or GNSS observations tied to the national coordinate systems and levelling respectively hence ensuring all project data aligns correctly. </li>
      <li><b>Detailed Topographic Surveys.</b> This captures high resolution ground data including measurements of terrain features (roads, buildings, utilities), spot heights and contour generation and mapped drainage patterns and surface features suppling engineers with accurate data for design and analysis. </li>
      <li><b>Engineering Design Support.</b> This involves preparation of base maps for CAD design, alignment definition and cross-sections and longitudinal profiles drawing which enables precise engineering design and modeling. </li>
      <li><b>Setting Out (Construction layout).</b> This is the physical marking of design features on the ground to guide construction. It includes marking  roads, buildings, utilities & structures, setting out of foundation, columns & grids and establishing control lines using total stations or GNSS equipment to ensure works follow exact design specifications. </li>
       <ArticleFigure
        src={architectureImg}
        alt="Site layout and built environment"
        caption="Site layout combines control, design interpretation, and continuous checks."
        align="left"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <li><b>Construction Surveys.</b> These are conducted to check alignment and levels during construction, verify positions of installed elements while continuously monitoring progress. </li>
      <li><b>Earthworks & Quantity Surveys.</b> These involve volume calculations (cut and fill), stockpile measurements and terrain comparison to help manage material usage & project costs. </li>
      <li><b>As-Built Surveys and QA Checks.</b> This involves capturing accurate final state of the project and performing quality assurance checks to ensure the constructed works align with the design intent. This guarantees reliability and legal/technical compliance. </li>
      <li><b>Deformation/Monitoring Surveys.</b> These are conducted where required to assess structural performance and safety. Settlement and displacement measurements are done with observations of structures made either periodically or continuously. </li>
      <li><b>Profiles and Cross-Sections.</b> These are used for corridors and earthworks to support design checks, quantities, and documentation. </li>
      <p>Engineering surveying is not a single task—it is a continuous, integrated process that ensures every stage of a project is grounded in accurate spatial data.</p>
      </ul>
    <div className="clear-both" />

      <h2 id="CS" className="text-xl font-semibold mt-1 mb-2"> Coordinate systems in Construction Surveying </h2>
      <p className="text-muted-foreground leading-relaxed"> Unlike general land surveys, construction projects often use specialized coordinate systems for practicality and precision.</p>
      <div className="grid grid-cols-2 gap-4 mb-6"> 
        <div>
          <h3 className=" font-semibold">Chainage (Stationing) Systems</h3>
          <p className="text-muted-foreground leading-relaxed">
            This mainlyy adopted in linear infrastructure projects (e.g., roads, railways, pipelines) where a baseline is established along the centerline of the project. 
            <br/><b>Chainage</b> values are assigned at regular intervals (e.g., every 20m) along this baseline and <b>offsets</b> (perpendicular distance left or right of the centerline) defined, allowing for easy reference to specific locations. 
            These measurements are typically represented through different types of drawings. 
            <br/><b>Plan View</b> shows a top-down layout of the project, illustrating the alignment and positions of features using chainage and offsets. 
            <br/> <b>Profile View</b> (longitudinal section) depicts how elevation changes along the centerline, helping engineers visualize slopes and vertical curves. 
            <br/>Meanwhile, <b>Cross-Sections</b> are taken perpendicular to the alignment at specific chainages, showing the shape of the terrain or constructed features across the corridor. 
            Together, these graphical representations provide a comprehensive understanding of both the horizontal and vertical characteristics of a project.
            This system simplifies setting out and communication on site, 
            as features can be described in terms of their distance along the chainage rather than complex coordinates.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Building Grid System</h3>
          <p className="text-muted-foreground leading-relaxed">
            The <b>building grid system</b> is a fundamental framework used in construction projects to ensure accurate positioning of structural elements such as columns, beams and walls. It consists of a network of perpendicular grid lines laid out across the site or building footprint, forming a coordinated reference system for both horizontal and vertical alignment. These grid lines are typically labeled using a combination of letters (A, B, C, etc.) in one direction and numbers (1, 2, 3, etc.) in the other making it easy to identify specific locations within the structure.
            <br/>Each intersection of the grid lines defines a precise point, most commonly used to locate columns or major structural supports.  This system ensures consistency across architectural, structural and engineering drawings, allowing all project stakeholders to work from a common reference framework.
            <br/>In addition to the horizontal layout, the grid system is extended vertically through the use of defined floor levels. These are typically labeled as Ground Floor, Level 1, Level 2 and so on, providing a clear indication of height within the building. When combined, the grid reference and level designation give a complete spatial description of any element.
          </p>
        </div> 
         <div>
          <h3 className=" font-semibold">Localized/ Engineering Grids</h3>
          <p className="text-muted-foreground leading-relaxed">
           These are custom coordinate systems established specifically for a project site. They are designed to simplify calculations and improve accuracy by minimizing distortions caused by the Earth’s curvature, especially over large areas. 
           These grids use a convenient local origin and orientation that align with the project layout, making setting out and data interpretation more straightforward. 
           They are commonly applied in large-scale infrastructure projects where precision and consistency across the site are essential.
            <br/>By using a localized grid, surveyors can work with smaller coordinate values, reducing the potential for errors in measurements and calculations. This approach also allows for easier integration of survey data with design and construction processes, as all parties can reference the same coordinate system that is tailored to the specific needs of the project.
          </p>
        </div>
         <div>
          <h3 className=" font-semibold">Chainage (Stationing) Systems</h3>
          <p className="text-muted-foreground leading-relaxed">
           Geodetic to Local Conversion is a common process in surveying where global or national coordinate systems are transformed into project-specific grids. Surveyors typically begin with accurate GNSS-based coordinates tied to national datums, which ensure consistency with wider mapping systems.
           However, for construction purposes, these coordinates are often converted into a local or engineering grid. This transformation simplifies calculations, aligns the coordinate system with the project layout, and reduces distortion over the site. As a result, setting out, measurements and design implementation become more practical and precise within the project environment.
          </p>
        </div>
      </div>
      <p className="text-muted-foreground leading-relaxed">
        Control of alignment and grade during construction may be established through the use of survey stakes. Stakes are generally made of wood in different sizes. Based on the use of the stake they are called alignment stakes, offset stakes, grade stakes and slope stake. Alignment stakes are used to mark the horizontal position of the centerline of the project. Offset stakes are placed at a known distance from the centerline to provide reference points for setting out. Grade stakes indicate the required elevation at specific locations, guiding vertical control during construction. Slope stakes are used to define the slope of embankments or cuttings, ensuring that earthworks are executed according to design specifications. These stakes are critical for maintaining accuracy and ensuring that construction proceeds in alignment with the engineering design.
      </p>
      <div className="clear-both" />

      <h2 id="equipment-and-techniques" className="text-x font-semibold mt-1 mb-2">
        Equipments and Techniques
      </h2>
      <ArticleFigure
        src={topoMapsImg}
        alt="Profiles, sections, and reporting"
        caption="Profiles and sections support design checks, quantities, and documentation."
        align="right"
        widthClassName="md:w-[320px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <p>Modern construction surveying relies on advanced instruments to achieve high precision and efficiency on site. </p>
        <li>Total stations are widely used for measuring angles and distances with great accuracy, enabling precise positioning of points.</li>
        <li>GNSS (GPS) systems provide reliable global positioning and are essential for establishing control networks. </li>
        <li>Digital levels are used for accurate elevation transfer, ensuring consistent height measurements across a project.</li>
        <li> For more complex and detailed data collection, Laser scanners capture dense 3D point clouds of structures and terrain.</li>
        <li>prisms and reflectors enhance targeting accuracy during measurements.</li>
        <li>UAVs (Unmanned Aerial Vehicles) are increasingly adopted for aerial surveying and data collection especially with large-scale projects.</li>
        <li>GIS & CAD software are used for design and analysis, ensuring that survey data is integrated seamlessly into the engineering workflow.</li>
        <li>Traditional tools like the dumpy level and measuring chains are still used for basic leveling that is the dumpy levels and short-distance measurements made by chains nad tapes, providing a reliable backup to high-tech equipment.</li>
        <p> Together, these tools and techniques provide flexibility and reliability in various construction surveying scenarios.</p>
      </ul>

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

Documentation plays a crucial role in quality control. Field notes, digital records, and reports are carefully maintained to provide traceability & allow for future verification. By combining precise instruments, systematic procedures & thorough documentation, quality control ensures that construction surveying outputs are accurate, reliable & fit for purpose.
      </p>

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

