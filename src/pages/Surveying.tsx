import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import { Link } from "react-router-dom";

import siteSurveyImg from "@/assets/Site-survey.png";
import contoursImg from "@/assets/contours.png";
import aerialImg from "@/assets/AERIAL.png";
import topoMapsImg from "@/assets/topo-maps.jpg";
import totalStationImg from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import gnssImg from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";

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

      <ArticleFigure
        src={contoursImg}
        alt="Contour representation"
        caption="Relief represented using contour lines"
        align="left"
        widthClassName="md:w-[340px]"
        thumbImgClassName="w-full h-44 object-cover"
      />

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

      <h2 id="control" className="text-2xl font-semibold mt-10 mb-4">
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
        For accurate results, the level instrument must always be perfectly horizontal. If the line of sight (crosshair) is lower than the base of the staff, a reading cannot be taken. To address this, the staff can be extended—often up to about 25 feet (7.6 meters)—allowing measurements to be made even when the instrument is positioned at a higher elevation. 
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
        Quantity surveying is a profession that deals with the costs and contracts of construction projects. A quantity surveyor is an expert in estimating the costs of materials, labor, and time needed for a project, as well as managing the financial and legal aspects of the project. A quantity surveyor can work for either the client or the contractor, and can be involved in different stages of the project, from planning to completion. Quantity surveyors are also known as Chartered Surveyors in the UK.
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
    </ArticleLayout>
  );
};

export default Surveying;

