import { motion } from "framer-motion";
import Layout from "@/components/Layout.jsx";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle,
  ClipboardList,
  Compass,
  Cpu,
  MapPinned,
  Users,
} from "lucide-react";

import geospatialImg from "@/assets/geospatial.jpg";

const quickAnswers = [
  {
    icon: Building2,
    question: "Who are we?",
    answer: "Geomatics Civil Engineering Surveyors Ltd. (GCES), a 100% locally owned company incorporated in Kenya.",
  },
  {
    icon: MapPinned,
    question: "Where do we operate?",
    answer:
      "Head office: 1st Floor, Phileo Arcade, Thika Superhighway, Ruiru.   Project work covers Kenya and the wider Eastern Africa region.",
  },
  {
    icon: BadgeCheck,
    question: "Why choose us?",
    answer:
      "Registered survey leadership, experienced technical staff, modern GNSS, CORS, UAV, LiDAR and GIS tools and a record on major infrastructure projects.",
  },
];

const services = [
  "Topographical surveys",
  "Cadastral surveys",
  "Geodetic control",
  "Setting out",
  "Aerial photography",
  "UAV mapping",
  "Bathymetric and hydrographic surveys",
  "GIS services",
  "Remote sensing",
  "Environmental mapping and assessments",
  "Physical planning",
  "Geotechnical surveys",
  "Civil engineering design support",
  "Profiles, cross-sections and as-built surveys",
];

const team = [
  {
    name: "MISK. Peter N. Mugo",
    role: "Managing Director; Survey Engineer & GIS Expert",
    detail:
      "Registered surveyor with the Land Surveyors Board.",
  },
  {
    name: "Fredrick Mwenda",
    role: "Geodetic Control / Cadastral Survey",
    detail: "Leads geodetic control works and cadastral survey assignments.",
  },
  {
    name: "Eric Rapela",
    role: "Topographic Survey Expert",
    detail:
      "University of Nairobi surveying graduate with over 10 years of experience in surveying and management of GIS, construction and design projects.",
  },
  {
    name: "Erick Ngomo",
    role: "Surveyor / GIS Expert",
    detail:
      "Surveying graduate from the University of Nairobi with experience in surveying, GIS projects and mobile mapping.",
  },
  {
    name: "Fred Juma",
    role: "GIS and Remote Sensing",
    detail: "Supports GIS research, remote sensing and topographic survey work.",
  },
  {
    name: "Marvin Mwangi",
    role: "Surveyor / GIS Expert",
    detail: "Supports topographical survey assignments and GIS workflows.",
  },
  {
    name: "Faith Talam",
    role: "Surveyor, GIS Developer & Sales Support",
    detail: "GCES & Geoshop digital platform development and sales activities.",
  },
  {
    name: "Bernice Njoroge",
    role: "HR Director",
    detail: "Leads staffing and welfare for the technical and support teams.",
  },
];

const equipment = [
  "Countrywide CORS network for high-accuracy positioning",
  "10+ modern GNSS receivers from Sokkia, CHC, Geomax and Altus",
  "RTK and static GNSS capabilities for control and detail surveys",
  "Digital levels and total stations for checks and construction work",
  "CHC X500 drone with LiDAR and RGB camera payloads",
  "CHC RS10 LiDAR scanner for detailed topographic and as-built models",
  "ArcGIS, GPS post-processing and mapping software",
  "Four-wheel-drive vehicles for field access in demanding terrain",
];

const projectEvidence = [
  "Kamoi Water Supply project, Elgeyo Marakwet: over 100 km mapped in mountainous terrain using UAV and ground methods.",
  "West Nairobi Water and Sanitation Project: aerial mapping for Gatamaiyu dam plus water and sewer alignment mapping.",
  "Nairobi Central Railway Station: detailed above-ground and underground survey for Nairobi Railway City works.",
  "Olkaria VII power plant: aerial photography and LiDAR survey covering a 40 sq. km wellfield.",
  "Mwanza Water and Sanitation project: plan and profile survey for about 100 km of sewers, pipelines and treatment sites.",
  "Mwache Dam and Lower Nzoia Irrigation Project: cadastral and topographic work including LiDAR mapping for flood mitigation design.",
];

const About = () => {
  return (
    <Layout>
        {/* Hero Section */}
      <section className="py-4 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
          badge="About Us"
            title="Precision Since 2000"
            description="A geomatics engineering company established to deliver cutting-edge services and technologies to developers and businesses working on innovative solutions that require precision."
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Our Story
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                25+ Years of Surveying Excellence
              </h2>
              <p className="text-muted-foreground text-lg mb-6">
                Founded in 2000, Geomatics Civil Engineering Surveyors has grown from a small surveying firm to a leading provider of geomatics solutions in East Africa.
              </p>
              <p className="text-muted-foreground text-lg mb-8">
                Our journey has been marked by continuous innovation, strategic partnerships with global technology leaders, and an unwavering commitment to precision and client satisfaction.
              </p>
              

              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-gradient-card">
                  <p className="font-display font-bold text-3xl text-primary">500+</p>
                  <p className="text-muted-foreground text-sm">Clients Served</p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-card">
                  <p className="font-display font-bold text-3xl text-primary">1000+</p>
                  <p className="text-muted-foreground text-sm">Projects Completed</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="rounded-xl overflow-hidden shadow-card">
                <img
                  src={geospatialImg}
                  alt="Our team at work"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-card/30">
        <div className="container mx-auto px-2">
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-5">
            {quickAnswers.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-lg bg-gradient-card border border-border/60 p-6 shadow-card"
              >
                <item.icon className="w-7 h-7 text-primary mb-2" />
                <h3 className="font-display font-bold text-lg text-foreground mb-2">{item.question}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/*Team*/}
      <section className="py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="The Team"
            title="Named technical responsibility"
            description="GCES is led by qualified survey and GIS professionals, with additional surveyors, GIS technicians and external experts engaged where a project requires specialist input."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="rounded-lg bg-gradient-card border border-border/60 p-6 shadow-card"
              >
                <Users className="w-6 h-6 text-primary mb-4" />
                <h3 className="font-display font-bold text-xl text-foreground">{member.name}</h3>
                <p className="text-sm font-semibold text-primary mt-1 mb-3">{member.role}</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{member.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section> 
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Partners"
            title="Trusted Technology Partners"/>  
        </div>
      </section>

      <section className="py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-lg border border-border/60 bg-gradient-card p-7 shadow-card">
              <Cpu className="w-7 h-7 text-primary mb-4" />
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                Equipment and software
              </h2>
              <ul className="space-y-3">
                {equipment.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border/60 bg-gradient-card p-7 shadow-card">
              <ClipboardList className="w-7 h-7 text-primary mb-4" />
              <h2 className="font-display font-bold text-2xl text-foreground mb-4">
                Project evidence
              </h2>
              <ul className="space-y-3">
                {projectEvidence.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-xl md:text-4xl text-foreground mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join hundreds of satisfied clients who trust us for their surveying needs.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Get Started <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
