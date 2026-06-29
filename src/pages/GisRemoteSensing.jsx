import ArticleFigure from "@/components/ArticleFigure";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleVideoFigure from "@/components/ArticleVideoFigure";
import { Link } from "react-router-dom";
import LandingImg from "@/assets/img.jpeg";
import RSImg from "@/assets/Remote_Sensing_Illustration.jpg";
import geospatialImg from "@/assets/geospatial.jpg";
import siteImg from "@/assets/Site-survey.png";
import renewableImg from "@/assets/renewable-energy.jpg";
import contour from "@/assets/contours.png";

const GisRemoteSensing = () => {
  return (
    <ArticleLayout
      title="GIS & Remote Sensing"
      tagline="Spatial data analysis, management and presentation using GIS technology."
      hatnote={
        <>
          For project requests and quotations, see{" "}
          <Link to="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          .
        </>
      }
      heroImage={LandingImg}
      heroImageAlt="GIS and remote sensing cover"
      infobox={{
        title: "GIS & Remote Sensing",
        videos: [
          {
            title: "Mapping The Future With Landsat",
            poster:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Mapping_The_Future_With_Landsat.ogv/330px--Mapping_The_Future_With_Landsat.ogv.jpg",
            src: "https://upload.wikimedia.org/wikipedia/commons/5/59/Mapping_The_Future_With_Landsat.ogv",
            durationLabel: "4:22",
            caption: (
              <>
                This video shows how{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Landsat"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Landsat
                </a>{" "}
                imagery helps identify conservation areas in the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Democratic_Republic_of_the_Congo"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Democratic Republic of the Congo
                </a>{" "}
                and map the{" "}
                <a
                  href="https://en.wikipedia.org/wiki/Maringa-Lopori-Wamba_Landscape"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Maringa-Lopori-Wamba (MLW) Landscape
                </a>
                .
              </>
            ),
          },
        ],
        images: [
          {
            src: geospatialImg,
            alt: "Geospatial data and mapping",
            caption: "Geospatial analysis and map production",
          },
        ],
        description:
          "Complementary technologies used to acquire, analyze and visualize data. Remote sensing collects data from afar (satellites or drones), while GIS provides as digital platform to manage, analyze and visualize spatial data. Together, they enable informed decision-making across various industries.",
        items: [
          {
            label: "Focus",
            value:
              "Remote sensing provides raw data, while GIS analyzes, models and visualizes that information.",
          },
          {
            label: "Advantages",
            value:
              "Enables large-scale studies, enhances knowledge of planetary variables, and supports SDGs.",
          },
          {
            label: "Use Cases",
            value:
              "Environmental monitoring, Natural Hazard management, Urban planning, Precision agriculture",
          },
        ],
      }}
    >
      <p id="overview" className="text-lg text-muted-foreground leading-relaxed">
        We turn spatial data into decisions. From building and maintaining GIS
        datasets to analyzing satellite and aerial imagery, we help teams visualize,
        monitor and plan with confidence. <i>While remote sensing provides the "what" and "where," GIS explains the
        "why" and "how" by layering different types of information.</i>  
      </p>
      <p className="text-muted-foreground leading-relaxed">
       <b>Remote sensing</b> involves the collection of information about an object or
        area from a distance in contrast to in-situ, typically using satellites,
        aircraft or LiDAR. We optimize detection of reflected or
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

    
      <ArticleFigure
        src={contour}
        alt="Spatial data layers"
        caption="Most projects combine multiple datasets into a consistent spatial reference."
        align="right"
        widthClassName="md:w-[280px]"
        thumbImgClassName="w-full h-40 object-cover"
      />
      <p className="text-muted-foreground leading-relaxed">
        We work with a mix of existing and newly-captured datasets depending on your
        objectives, time window and required detail. Typical inputs include:
      </p>
      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>
          <span className="text-foreground">Satellite imagery</span> (multispectral,
          radar) for land cover, vegetation, water and change detection.
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
      <p className="text-muted-foreground leading-relaxed">
      GIS integrates{" "}
        <b>hardware</b>, <b>software</b>, and <b>data</b> to help <b>people</b>{" "}
        understand patterns and relationships in the physical world using various{" "}
        <b>methods</b> such as spatial analysis, modeling and visualization.
        <br /> GIS uses two primary data structures: <b>vector data</b> (points, lines,
        polygons) for discrete features and <b>raster data</b> (grids of cells) for
        continuous phenomena.
        <br /> Common GIS software includes ArcGIS, QGIS and GRASS GIS, which support
        a wide range of applications across industries.
      </p>

      <ul className="list-disc pl-6 text-muted-foreground space-y-2">
        <li>GIS database design, data capture and cartographic map production</li>
        <li>Spatial analysis and suitability modelling</li>
        <li>Remote sensing classification, indices and change detection</li>
        <li>Dashboards and interactive maps (when required)</li>
      </ul>

      <div className="clear-both" />

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
    </ArticleLayout>
  );
};

export default GisRemoteSensing;

