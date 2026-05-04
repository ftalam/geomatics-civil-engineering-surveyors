import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleStack from "@/components/ArticleStack";
import ArticleGallery from "@/components/ArticleGallery";
import { Link } from "react-router-dom";

import siteSurveyImg from "@/assets/Site-survey.png";
import contoursImg from "@/assets/contours.png";
import aerialImg from "@/assets/AERIAL.png";
import topoMapsImg from "@/assets/topo-maps.jpg";
import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import gnssImg from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import NakuruImg from "@/assets/NakuruAerialImg.png";
import architectureImg from "@/assets/architecture.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import UAVfieldwork from "@/assets/UAVfieldwork.jpg";
import { useState } from "react"; 
import DEM from "@/assets/sasumwaDEM.png";
import profile from "@/assets/PLAN&PROFILE.png";
import cs from "@/assets/CROSS-SECTION.png";
import geospatialImg from "@/assets/geospatial.jpg";
import landuseImg from "@/assets/SubdivisionPlan.png";
import LandingImg from "@/assets/img.jpeg";
import RSImg from "@/assets/Remote_Sensing_Illustration.jpg";
import siteImg from "@/assets/Site-survey.png";
import renewableImg from "@/assets/renewable-energy.jpg";


const toc = [
  { id: "overview", label: "Overview" },
  { id: "topography", label: "Topography in surveying" },
  { id: "control", label: "Control & datums" },
  { id: "Equipement", label: "Equipement" },
  { id: "methods", label: "Field methods" },
  { id: "qs", label: "Quantity surveying" },
  { id: "deliverables", label: "Deliverables" },
  { id: "inputs", label: "Project inputs" },
  { id: "qa", label: "Accuracy & QA" },
  { id: "errors", label: "Common errors" },
  { id: "services", label: "Related services" },
  { id: "when", label: "When you need it" },
  { id: "evidence", label: "Boundary evidence" },
  { id: "deliverables", label: "Deliverables" },
  { id: "process", label: "Process" },
  { id: "qa", label: "Checks & QA" },
   { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "toposdata", label: "Topographic data" },
  { id: "maps", label: "Topographic maps" },
  { id: "profiles", label: "Profiles & cross-sections" },
];

const Surveying = () => {
  return (
    <ArticleLayout
      title="Surveying"
      tagline="Measuring positions, distances, angles, and elevations to support design, construction, and land administration."
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
    >
        Surveying turns real-world features into reliable measurements you can design, build,
        and make decisions with. It determines positions in two or three dimensions and measures
        distances, angles, and elevations using instruments such as total stations, levels, and
        GNSS receivers. A good survey balances accuracy, coverage, and clear deliverables from
        control and boundaries to topographic mapping and construction verification.
      
      <div>

      <ArticleFigure
        src={siteSurveyImg}
        alt="Site survey"
        caption="Site observations and documentation"
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

      <h2 id="topography" className="text-2xl font-semibold mt-10 mb-4">
        Topography in surveying
      </h2>
      <ArticleFigure
        src={topoMapsImg}
        alt="Topographic map"
        caption="Topographic maps combine plan features with relief (contours and spot heights)"
        align="right"
      />
      <p className="text-muted-foreground leading-relaxed">
        Topography describes the shape of the land: hills, valleys, ridges, drainage lines, and
        man-made features. In practice, topographic surveying captures both plan position and
        elevation so designers can understand slopes, volumes, and constraints.
      </p>
      <p className="text-muted-foreground leading-relaxed">Relief is commonly communicated using:</p>


      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <span className="text-foreground">Contours</span>: lines of equal elevation, useful for
          understanding gradients.
        </li>
        <li>
          <span className="text-foreground">Spot heights & breaklines</span>: critical points and
          edges (for example road crowns, channel inverts).
        </li>
        <li>
          <span className="text-foreground">DEM/DTM/DSM</span>: digital terrain/surface models for
          analysis, sections, and volumes.
        </li>
      </ul>

      <div className="clear-both" />
      
      <h2 id="control" className="text-x font-semibold mt-10 mb-4">
        Control & datums
      </h2>
      <ArticleFigure
        src={gnssImg}
        alt="GNSS receiver"
        caption="GNSS methods provide fast, accurate control when used correctly"
        align="right"
      />
      <p className="text-muted-foreground leading-relaxed">
        Most surveys start by establishing or verifying control: known reference points that
        keep everything consistent. Control is tied to a coordinate system (datum/projection)
        and a vertical reference (benchmarks, geoid models, project datums).
      </p>
      <p className="text-muted-foreground leading-relaxed">
        Control can be built from GNSS observations, traverses, and leveling, and it should be
        checked with closures and redundant measurements.
      </p>
      <div className="clear-both"/>

      <h2 id="instruments" className="text-2xl font-semibold mt-10 mb-4">
       Equipement
      </h2>
      <ArticleFigure
        src={totalStationImg}
        alt="Total station"
        caption="Total stations combine angle + distance measurement for versatile field work"
        align="right"
      />
      <ArticleFigure
        src={totalStationImg}
        alt="Total station"
        caption="Total stations combine angle + distance measurement for versatile field work"
        align="right"
      />

      <p className="text-muted-foreground leading-relaxed">
        <h3 className="text-xl font-semibold mb-2">Hardware</h3>
                Surveying relies on a range of instruments, including the theodolite, measuring tape, total station, 3D scanners, GPS/GNSS systems, levels, and rods. Most of these instruments are mounted on tripods for stability, while tape measures are typically used for short-distance measurements. Modern techniques also incorporate 3D scanning and aerial imagery for efficient data collection. <br/> A theodolite is used to measure horizontal and vertical angles. It consists of a telescope mounted on rotating axes, allowing precise alignment with a target. The instrument measures vertical angles (zenith angles) and horizontal directions using graduated circles. Surveyors either reference a known bearing or set a starting point to zero to measure angles between objects.

        <br/> A gyrotheodolite is a specialized version that uses a gyroscope for orientation, making it useful in environments like underground tunnels where reference points are unavailable.

        <br/> The total station combines a theodolite with an electronic distance measurement (EDM) system, enabling it to measure both angles and distances. Modern total stations are fully electronic, often robotic, and can operate without reflectors. They can also integrate with satellite systems and transmit data remotely, significantly improving efficiency.

        <br/> GPS/GNSS surveying uses satellite signals to determine precise positions. Static GPS involves two receivers collecting data over time to produce highly accurate long-distance measurements. In contrast, Real-Time Kinematic (RTK) GPS uses a fixed base station and a mobile receiver, transmitting corrections in real time to achieve centimeter-level accuracy over shorter distances.

        <br/>Different instruments are suited to different tasks. Theodolites and levels are often used for basic construction work, while total stations are widely used by professional surveyors due to their versatility. GPS is especially effective for large-scale surveys, such as infrastructure projects. Advanced methods, like aerial surveys using helicopters equipped with GPS and laser scanners, enable rapid data collection over large areas with high precision.

        In addition to primary instruments, surveyors use supporting equipment such as tripods, staffs, beacons, personal protective gear, vegetation-clearing tools, digging tools for locating buried markers, hammers for placing markers, and radios for communication across long distances.


        <h3 className="text-xl font-semibold mb-2">Software</h3>
        Land surveying today is highly dependent on advanced digital tools and software. Professionals collect data, that is then processed using specialized land surveying software, which enhances efficiency, improves accuracy, and streamlines overall workflow. As a result, such software has become an essential component of modern surveying practice.
        In addition to data processing, surveyors are often responsible for drafting plans and preparing detailed maps (plats) of surveyed land. Much of this work is now carried out using Computer-Aided Design (CAD) software, which allows for precise drawing, editing, and visualization of survey data. CAD tools are commonly used on desktop computers and are increasingly integrated into modern field data collectors, enabling real-time drafting and adjustments directly on-site.
        Surveyors also make use of online platforms and tools provided by government agencies to improve the quality and reliability of their data. For example, services from organizations like the National Geodetic Survey and the Continuously Operating Reference Stations network offer automated corrections, coordinate transformations, and access to standardized geospatial reference systems. These resources ensure that GPS data is accurate, consistent, and aligned with recognized coordinate frameworks, further enhancing the precision and reliability of surveying outputs.
      </p>

      <h2 id="methods" className="text-2xl font-semibold mt-10 mb-4">
        Techniques
      </h2>
      Surveyors determine the position of objects by measuring angles and distances. The factors that can affect the accuracy of their observations are also measured. They then use this data to create vectors, bearings, coordinates, elevations, areas, volumes, plans and maps. Measurements are often split into horizontal and vertical components to simplify calculation. GPS and astronomic measurements also need measurement of a time component.
      <ArticleFigure
        src={aerialImg}
        alt="Aerial mapping"
        caption="Aerial mapping supports fast coverage and context"
        align="right"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />
        <h2 className="font-semibold "> Distance measurement</h2> 
             <p className="text-muted-foreground leading-relaxed">Before the introduction of Electronic Distance Measurement (EDM) devices, surveyors relied on a variety of manual and observational techniques to measure distance. In pre-colonial America, Indigenous communities often used practical references such as a “bow shot”—the approximate distance an arrow could travel—as a rough unit of measurement.
              In Europe, more standardized methods were developed using tools like chains and measuring tapes. One of the most common was the Gunter's chain, which consisted of metal links of uniform length. Later, tapes made of steel or invar were introduced to improve accuracy. During measurement, these chains or tapes had to be pulled tightly to minimize sagging, and corrections were applied to account for temperature-related expansion.
              Surveyors also made efforts to keep measurements level, especially over uneven terrain. When working on slopes, they often used a technique called “breaking chain,” where the total distance was measured in shorter horizontal segments rather than along the slope. For longer distances, devices like measuring wheels (perambulators) were used, though they provided only approximate results.
              Another important method was tacheometry, which determines distance by measuring angles to an object of known size. This technique was particularly useful in rough or inaccessible terrain where direct measurement with chains or tapes was difficult.</p>
      <h2 className="font-semibold "> Angle measurement</h2> 
        <p className="text-muted-foreground leading-relaxed">
          Before the advent of theodolites, surveyors measured angles using simple tools such as compasses, protractors, and sighting devices. 
          One common method was to use a “cross-staff,” which consisted of a long staff with a perpendicular crosspiece that could be slid up and down to sight on distant objects. 
          By aligning the crosspiece with two points, surveyors could estimate horizontal angles. For vertical angles, they might use a “backstaff” or an astrolabe, which allowed them to measure the angle of elevation or depression by sighting the sun or stars.
         Over time, this method was improved with the introduction of finely graduated circular discs, which increased measurement precision. The addition of telescopes fitted with reticles led to the development of the theodolite, allowing for far more accurate sighting and angle measurement. Instruments were further refined with calibrated circles for vertical angles and vernier scales, which enabled readings to fractions of a degree, as seen in early transit instruments.
          The plane table offered a graphical approach to surveying, where angles and positions were plotted directly in the field. This reduced the need for complex calculations. In 1829, Francis Ronalds developed a reflecting instrument by modifying the octant, enabling angles to be recorded graphically with improved accuracy.
          Surveyors often measured angles by observing bearings from each point (vertex) of a surveyed shape. By progressing around the figure and returning to the starting point, they could check their work. Ideally, the first and final bearings should differ by exactly 180°. Any deviation from this is known as the angular misclose, which indicates measurement error. This value helps surveyors assess the accuracy of their observations and determine whether the results meet acceptable standards.
      </p>
      
      <h2 className="font-semibold "> Levelling</h2> 
      <p className="text-muted-foreground leading-relaxed">The simplest way to measure elevation is by using an altimeter, which estimates height based on air pressure. However, for greater accuracy, surveyors use precise leveling techniques, also known as differential leveling. This method involves taking a series of measurements between two points using a level instrument and a graduated staff (rod). The differences in height between successive readings are added and subtracted to determine the overall elevation change between the starting and ending points.
        With the use of Global Positioning System (GPS) technology, elevations can also be determined using satellite receivers. While GPS may be slightly less accurate than traditional leveling for short distances, it can provide comparable results over long distances and is highly efficient for large-scale surveys. When using an optical level, the target point may sometimes fall outside the instrument’s range due to obstacles or significant elevation changes. In such cases, multiple instrument setups are required. This process is known as “turning.” It involves taking a reading at a fixed point, then moving the instrument to a new position while keeping the staff in the same location. A new reading is taken, and the difference is used to calculate the new elevation of the instrument. 
        This step-by-step process is repeated until all measurements are completed.
        For accurate results, the level instrument must always be perfectly horizontal. If the line of sight (crosshair) is lower than the base of the staff, a reading cannot be taken. 
        To address this, the staff can be extended—often up to about 25 feet (7.6 meters)—allowing measurements to be made even when the instrument is positioned at a higher elevation. 
      </p>

      <h2 className="font-semibold "> Determining position</h2> 
          <p className="text-muted-foreground leading-relaxed">
            Determining accurate positions is a core objective of surveying. 
            This is achieved by combining distance, angle and elevation measurements to
            calculate coordinates relative to known reference points. Before modern satellite-based systems, surveyors determined their position on the Earth’s surface using astronomical observations, especially in areas where no known reference points existed. By observing celestial bodies such as the Sun, Moon, and stars, surveyors could calculate their location using established navigational techniques.
            Once the position of the surveying instrument and its bearing to a celestial object were determined, that direction could be transferred to a reference point on the ground. This point would then serve as a control point for further measurements and surveys. 
            Although astronomic positioning could achieve high accuracy, it was complex and time-consuming, requiring careful observation and detailed calculations. For this reason, it was typically used to establish primary control points, which were then used as the basis for additional surveying work.
            With the introduction of Global Positioning System (GPS) technology, the use of astronomical observations has largely declined. GPS now provides fast, reliable, and highly accurate positioning across most parts of the Earth, making it the preferred method in modern surveying.
          </p>
       
      <p className="text-muted-foreground leading-relaxed">
        A typical workflow mixes methods to get the best reliability and coverage:
      </p>
      <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
        <li>Define specification: accuracy, extent, deliverables, and coordinate system.</li>
        <li>Establish horizontal/vertical control (GNSS, traverse, leveling).</li>
        <li>Capture features and elevations (detail points, breaklines, profiles/sections).</li>
        <li>Check and adjust (closures, repeats, independent checks).</li>
        <li>Compile outputs (CAD/GIS, maps, models, reports) and run QA.</li>
      </ol>

       <h2 id="qs" className="text-2xl font-semibold mt-10 mb-4">
        Quantity surveying
      </h2>
        <p className="text-muted-foreground leading-relaxed">
        Quantity surveying is a profession that deals with the costs and contracts of construction projects. A quantity surveyor is an expert in estimating the costs of materials, labor and time needed for a project, as well as managing the financial and legal aspects of the project. A quantity surveyor can work for either the client or the contractor, and can be involved in different stages of the project, from planning to completion. Quantity surveyors are also known as Chartered Surveyors in the UK.
      </p>

      <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
        Deliverables
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Deliverables depend on your project, but commonly include:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Coordinate schedules and control reports</li>
        <li>Survey plans (existing conditions, boundaries, as-builts)</li>
        <li>Contours, spot heights, profiles, and cross-sections</li>
        <li>Orthophotos, point clouds, and terrain models (DTM/DSM) when applicable</li>
      </ul>

      <h2 id="inputs" className="text-2xl font-semibold mt-10 mb-4">
        Project inputs
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Project location and area of interest boundary</li>
        <li>Required accuracy/tolerances (or intended use if unknown)</li>
        <li>Coordinate system requirements (datum/projection) and any legacy data</li>
        <li>Deliverable formats (PDF, CAD, GIS) and submission requirements</li>
      </ul>

      <h2 id="qa" className="text-2xl font-semibold mt-10 mb-4">
        Accuracy & QA
      </h2>
      <p className="text-muted-foreground leading-relaxed">
        Reliable surveys are built on checks. Good QA includes clear field notes, instrument
        calibration, control closures, independent measurements, and documenting the coordinate
        reference system and assumptions used.
      </p>

      <h2 id="errors" className="text-2xl font-semibold mt-10 mb-4">
        Common errors
      </h2>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>Incorrect coordinate system setup (datum/projection mix-ups)</li>
        <li>Unverified control and benchmarks</li>
        <li>Wrong instrument/antenna heights</li>
        <li>Insufficient checks (no closures, no redundancy)</li>
        <li>Poor file/data management (missing metadata, unclear naming)</li>
      </ul>

      <h2 id="services" className="text-2xl font-semibold mt-10 mb-4">
        Related services
      </h2>
      <p className="text-muted-foreground leading-relaxed">Explore related capabilities:</p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <Link to="/services/topographic-surveys" className="text-primary hover:underline">
            Topographic Surveys
          </Link>{" "}
          (terrain mapping, contours, DTM/DSM)
        </li>
        <li>
          <Link to="/services/cadastral-surveys" className="text-primary hover:underline">
            Land (Cadastral) Surveys
          </Link>{" "}
          (boundaries, subdivisions)
        </li>
        <li>
          <Link to="/services/engineering-surveys" className="text-primary hover:underline">
            Engineering Surveys
          </Link>{" "}
          (setting out, as-builts, construction control)
        </li>
        <li>
          <Link to="/services/uav-mapping" className="text-primary hover:underline">
            UAV-Based Mapping
          </Link>{" "}
          (orthophotos, point clouds)
        </li>
      </ul>

      <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
        <h3 className="text-xl font-semibold mb-3">Need a Survey?</h3>
        <p className="text-muted-foreground mb-4">
          Tell us your location, scope, and required outputs and we will recommend the best
          method and accuracy level for your project.
        </p>
        <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-lg">
          Request Service
        </Link>
      </div>
    </div>

      {/*Cadastral*/}
   <div>
        { 
          <>
          For engineering and construction support, see{" "}
          <Link to="/services/engineering-surveys" className="text-primary hover:underline"> Engineering Surveys </Link>.
          </>
         }
    
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        Cadastral surveying focuses on defining, re-establishing and documenting real property
        boundaries. It involves the physical delineation of property boundaries and determination of dimensions, areas and certain rights associated 
        with properties in accordance with national laws such as the Land Registration Act and the Survey Act.
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

      <h2 id="qa" className="text-x font-semibold mt-10 mb-4">
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
   </div>

     {/*Topographic*/}
   <div>
         {
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
    
          <h2 id="toposdata" className="text-2xl font-semibold mt-10 mb-4"> </h2>
                <p className="text-muted-foreground leading-relaxed"> </p>
    
          <div className="grid grid-cols-2 gap-3">  
              <div>
                <h2 className="font-semibold "> Raw Survey data</h2> 
                <p className="text-muted-foreground leading-relaxed"> Topographic survey information is historically based upon notes of surveyors. They may derive naming and cultural information from other local sources
                  (for example, boundary delineation may be derived from local cadastral mapping) together with field observations. This information is often captured in field books, which are then used to produce the final map.
                   In modern practice, surveyors may also capture this information digitally using tablets or other devices in the field, which can then be directly integrated into the mapping process.
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
                   Other models typically  include the digital terrain model (DTM), which represents the bare earth surface and Digital Surface Model (DSM), which represents the elevation of the top of the canopy or built structures.
                  <br/> These Models may be derived from existing paper maps and survey data, or they may be generated from new satellite or other remotely sensed radar or sonar data.  </p>
                 <ArticleGallery
                  items={[
                    { src: DEM, alt: "Digital Elevation Model", caption: "Sasumwa Line DEM" },
                    { src: NakuruImg, alt: "Orthophoto", caption: "Orthophoto output", align: "right" },
                  ]}
                /> 
              </div>
          </div> 
    
          <ArticleFigure
            src={cs}
            alt="Survey plan"
            caption="Planimetric and topographic outputs used for design"
            align="right"
          />
         
          <h2 id="profiles" className="text-2xl font-semibold mt-10 mb-4">
            Profiles & cross-sections
          </h2>
          <ArticleFigure
            src={profile}
            alt="Profile section"
            caption="Profiles and cross-sections support design and earthworks"
            align="right"
          />
          <p className="text-muted-foreground leading-relaxed">
            Profiles and cross-sections describe elevation changes along a line. They are
            essential for corridor design (roads and pipelines), drainage planning and
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
   </div>

   {/*Engineering Survey*/}
   <div>
          {
            <>
              For terrain-focused mapping, see{" "}
              <Link to="/services/topographic-surveys" className="text-primary hover:underline">
                Topographic Surveys
              </Link>
              .
            </>
          }
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
   </div>

   {/*GIS & RS*/}
   <div>
         {
            <>
              For project requests and quotations, see{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Contact
              </Link>
              .
            </>
          }
         
          <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
            We turn spatial data into decisions. From building and maintaining GIS
            datasets to analyzing satellite and aerial imagery, we help teams visualize,
            monitor, and plan with confidence.
          </p>
    
          <h2 id="RS" className="text-xl font-semibold mt-1 mb-1">
            Remote Sensing
          </h2>
    
          <p className="text-muted-foreground leading-relaxed">
            Remote sensing involves the collection of information about an object or
            area from a distance in contrast to in-situ, typically using satellites,
            aircraft or LiDAR. This technology optimizes detection of reflected or
            emitted energy (electromagnetic radiation or radar) using passive or active
            sensors.
          </p>
    
          <ArticleFigure
            src={RSImg}
            alt="Remote sensing"
            caption="Remote sensing illustration"
            align="left"
            widthClassName="md:w-[240px]"
            thumbImgClassName="w-full h-32 object-cover"
          />
    
          <ul className="list-disc pl-6 text-sm text-muted-foreground space-y-2">
            <li>
              Passive sensors (e.g. multispectral, hyperspectral) capture reflected
              sunlight to analyze land cover, vegetation health, water quality and more.
            </li>
            <li>
              Active sensors (e.g. LiDAR, radar) emit their own energy to measure
              distances, topography and surface characteristics regardless of lighting or
              weather conditions.
            </li>
          </ul>
          <p className="text-muted-foreground text-sm leading-relaxed">
            The effectiveness of a sensor is defined by spatial resolution (detail),
            spectral resolution (wavelengths captured), temporal resolution (frequency of
            data collection) and radiometric resolution (sensitivity to energy
            differences).
          </p>
    
    
    
          <h2 id="data" className="text-xl font-semibold mt-10 mb-4">
            Data sources
          </h2>
          <ArticleFigure
            src={geospatialImg}
            alt="Spatial data layers"
            caption="Most projects combine multiple datasets into a consistent spatial reference."
            align="right"
            widthClassName="md:w-[280px]"
            thumbImgClassName="w-full h-40 object-cover"
          />
          <p className="text-muted-foreground leading-relaxed">
            We work with a mix of existing and newly-captured datasets depending on your
            objectives, time window, and required detail. Typical inputs include:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>
              <span className="text-foreground">Satellite imagery</span> (multispectral,
              radar) for land cover, vegetation, water, and change detection.
            </li>
            <li>
              <span className="text-foreground">UAV imagery</span> for high-detail
              orthophotos, surfaces, and site monitoring.
            </li>
            <li>
              <span className="text-foreground">Elevation models</span> (DEM/DTM/DSM) to
              understand terrain, drainage, and visibility.
            </li>
            <li>
              <span className="text-foreground">Existing GIS layers</span> (boundaries,
              roads, utilities, soils, hazards) to provide context and constraints.
            </li>
          </ul>
    
          <div className="clear-both" />
    
          <h2 id="GIS" className="text-xl font-semibold mt-10 mb-4">
            Geographic Information Systems
          </h2>
    
          <ArticleFigure
            src={siteImg}
            alt="Site plan"
            caption="Site planning and layout"
            align="right"
            widthClassName="md:w-[260px]"
            thumbImgClassName="w-full h-36 object-cover"
          />
    
          <p className="text-muted-foreground leading-relaxed">
            Geographic Information System (GIS) is a computer-based framework designed to
            capture, store, manipulate, analyze, manage, and present spatial or geographic
            data. While remote sensing provides the "what" and "where," GIS explains the
            "why" and "how" by layering different types of information. GIS integrates{" "}
            <b>hardware</b>, <b>software</b>, and <b>data</b> to help <b>people</b>{" "}
            understand patterns and relationships in the physical world using various{" "}
            <b>methods</b> such as spatial analysis, modeling and visualization.
            <br /> GIS uses two primary data structures: <b>vector data</b> (points, lines,
            polygons) for discrete features and <b>raster data</b> (grids of cells) for
            continuous phenomena.
            <br /> Common GIS software includes ArcGIS, QGIS, and GRASS GIS, which support
            a wide range of applications across industries.
          </p>
    
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>GIS database design, data capture and cartographic map production</li>
            <li>Spatial analysis and suitability modelling</li>
            <li>Remote sensing classification, indices and change detection</li>
            <li>Dashboards and interactive maps (when required)</li>
          </ul>
    
          <div className="clear-both" />
    
          <h2 id="workflow" className="text-2xl font-semibold mt-10 mb-4">
            Workflow
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We structure GIS/remote sensing work so results are repeatable and easy to
            audit. A typical project includes:
          </p>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
            <li>Define the area of interest, questions, and success criteria.</li>
            <li>Collect and prepare data (projection setup, mosaicking, cloud masking,QA/QC).</li>
            <li>Run analysis (classification, indices, suitability, change detection).</li>
            <li>Validate results using ground truth, checks, or independent datasets.</li>
            <li>Compile outputs (maps, datasets, and short decision-ready summaries).</li>
          </ol>
    
          <h2 id="deliverables" className="text-2xl font-semibold mt-10 mb-4">
            Deliverables
          </h2>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Printable maps and presentation-ready layouts</li>
            <li>GIS layers (vector/raster) with metadata</li>
            <li> Common formats: GeoPackage/GeoJSON/Shapefile (vector), GeoTIFF (raster),CSV/Excel (summaries)</li>
            <li>Analysis reports and visualizations</li>
          </ul>
    
          <h2 id="qa" className="text-2xl font-semibold mt-10 mb-4">
            Quality & metadata
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Decisions are only as good as the data behind them. We document coordinate
            systems, processing steps, assumptions, and limitations (e.g., cloud cover,
            sensor resolution) so results can be interpreted correctly and reused later.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Coordinate reference system (CRS) and transformation notes</li>
            <li>Data lineage (sources, dates, versions)</li>
            <li>Checks for topology, completeness, and obvious anomalies</li>
            <li>Clear map legends, scale/accuracy notes, and interpretation guidance</li>
          </ul>
    
          <h2 id="applications" className="text-2xl font-semibold mt-10 mb-4">
            Applications
          </h2>
    
          <ArticleFigure
            src={renewableImg}
            alt="Renewable energy site suitability"
            caption="Suitability & planning"
            align="right"
            widthClassName="md:w-[260px]"
            thumbImgClassName="w-full h-36 object-cover"
          />
    
          <p className="text-muted-foreground leading-relaxed">
            By combining these data types with remote sensing inputs, GIS enables powerful
            spatial analysis, decision support and communication of complex information
            through maps and dashboards. Common use cases include infrastructure planning,
            environmental monitoring, land management, project tracking, and decision
            support systems.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground space-y-2">
            <li>Land cover mapping and change detection</li>
            <li>Site selection and suitability modelling</li>
            <li>Environmental monitoring and compliance mapping</li>
            <li>Asset and utility mapping (where data is available)</li>
            <li>Progress monitoring for construction and land development</li>
          </ul>
    
          <div className="clear-both mt-10 bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">Need GIS Support?</h3>
            <p className="text-muted-foreground mb-4">
              Reach out to discuss your GIS and remote sensing requirements.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg"
            >
              Request Service
            </Link>
          </div>
   </div>

    </ArticleLayout>
   
  );
};

export default Surveying;


