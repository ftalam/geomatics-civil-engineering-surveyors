import Layout from "@/components/Layout";
import { Link } from "react-router-dom";


const TopographicSurvey = () => {
  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">
            Topographic Surveying: Mapping the Real World with Precision
          </h1>

          {/* Intro */}
          <p className="text-lg text-muted-foreground mb-8">
            Topographic surveying is the foundation of all successful engineering,
            construction, and land development projects. It provides a detailed
            representation of terrain, features, and elevation changes.
          </p>

          {/* HERO IMAGE */}
          <img
            src="/images/topo-hero.jpg"
            className="w-full h-[400px] object-cover rounded-xl mb-10"
            alt="Topographic survey"
          />

          {/* SECTION */}
          <h2 className="text-2xl font-semibold mb-4">
            What is a Topographic Survey?
          </h2>
          <p className="mb-6 text-muted-foreground">
            A topographic survey captures both natural and man-made features such
            as terrain elevation, roads, buildings, vegetation, and drainage
            systems. The data is used to create maps, plans, and 3D models.
          </p>

          {/* ORTHOPHOTO SECTION */}
          <h2 className="text-2xl font-semibold mb-4">
            Orthophotos (Aerial Mapping)
          </h2>
          <p className="mb-6 text-muted-foreground">
            Orthophotos are high-resolution aerial images corrected for distortion,
            allowing accurate measurements. They are commonly generated using UAV
            (drone) surveys.
          </p>

          <img
            src="/images/orthophoto.jpg"
            className="w-full rounded-xl mb-10"
            alt="Orthophoto example"
          />

          {/* PLANS */}
          <h2 className="text-2xl font-semibold mb-4">
            Survey Plans
          </h2>
          <p className="mb-6 text-muted-foreground">
            Survey plans show detailed layouts of land features including contours,
            boundaries, and infrastructure. These are essential for engineers and
            architects during project design.
          </p>

          <img
            src="/images/plan.jpg"
            className="w-full rounded-xl mb-10"
            alt="Survey plan"
          />

          {/* PROFILES */}
          <h2 className="text-2xl font-semibold mb-4">
            Profiles & Cross-Sections
          </h2>
          <p className="mb-6 text-muted-foreground">
            Profiles and cross-sections represent elevation changes along a line,
            helping in road design, drainage planning, and earthworks calculations.
          </p>

          <img
            src="/images/profile.jpg"
            className="w-full rounded-xl mb-10"
            alt="Profile section"
          />

          {/* PROCESS */}
          <h2 className="text-2xl font-semibold mb-4">
            Our Process
          </h2>
          <ul className="list-disc pl-6 text-muted-foreground mb-10 space-y-2">
            <li>Field data collection using GNSS, total stations, and drones</li>
            <li>Data processing and adjustment</li>
            <li>Generation of orthophotos and terrain models</li>
            <li>Production of plans, contours, and profiles</li>
          </ul>

          {/* CTA */}
          <div className="bg-card p-8 rounded-xl border text-center">
            <h3 className="text-xl font-semibold mb-3">
              Need a Topographic Survey?
            </h3>
            <p className="text-muted-foreground mb-4">
              Get in touch with our team for accurate and reliable surveying services.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg"
            >
              Request Service
            </Link>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default TopographicSurvey;