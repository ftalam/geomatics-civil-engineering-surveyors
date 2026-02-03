import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Building2, HardHat, Globe, Mountain, Sun, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import architectureImg from "@/assets/architecture.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import geospatialImg from "@/assets/geospatial.jpg";
import miningImg from "@/assets/mining.jpg";
import renewableImg from "@/assets/renewable-energy.jpg";

const industries = [
  {
    icon: Building2,
    title: "Architecture & Construction",
    description: "We provide precise surveying solutions for architectural planning and construction projects. Our services include topographic surveys, building setout, as-built surveys, and monitoring during construction phases.",
    image: architectureImg,
    features: [
      "Building setout and verification",
      "Topographic surveys",
      "As-built documentation",
      "Construction monitoring",
    ],
  },
  {
    icon: HardHat,
    title: "Civil Works",
    description: "Our civil engineering surveying services support infrastructure development including roads, bridges, dams, and utilities. We ensure accuracy in every measurement for successful project delivery.",
    image: civilWorksImg,
    features: [
      "Road and highway surveys",
      "Bridge and dam monitoring",
      "Utility mapping",
      "Volume calculations",
    ],
  },
  {
    icon: Globe,
    title: "Geospatial",
    description: "Advanced geospatial data collection and analysis using cutting-edge technology. We deliver high-quality mapping, GIS integration, and remote sensing solutions for informed decision-making.",
    image: geospatialImg,
    features: [
      "Aerial mapping and LiDAR",
      "GIS data integration",
      "Remote sensing analysis",
      "Digital terrain modeling",
    ],
  },
  {
    icon: Mountain,
    title: "Mining & Quarry",
    description: "Comprehensive surveying services for mining operations and quarry management. We help optimize extraction, ensure safety compliance, and track progress with precision measurements.",
    image: miningImg,
    features: [
      "Pit and stockpile surveys",
      "Volume calculations",
      "Subsidence monitoring",
      "Mine planning support",
    ],
  },
  {
    icon: Sun,
    title: "Renewable Energy",
    description: "Site assessment and surveying for solar, wind, and other renewable energy installations. Our precision surveys ensure optimal placement and maximum efficiency of energy systems.",
    image: renewableImg,
    features: [
      "Solar farm layout surveys",
      "Wind turbine positioning",
      "Terrain analysis",
      "Environmental assessments",
    ],
  },
];

const Industries = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Industries"
            title="Precision Across Every Sector"
            description="We deliver specialized surveying solutions tailored to the unique requirements of each industry we serve."
          />
        </div>
      </section>

      {/* Industries List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24 last:mb-0 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <industry.icon className="w-7 h-7 text-primary" />
                </div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
                  {industry.title}
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  {industry.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {industry.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-foreground text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="hero">
                    Request Consultation <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <div className="rounded-2xl overflow-hidden shadow-card">
                  <img
                    src={industry.image}
                    alt={industry.title}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              Don't See Your Industry?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We provide customized surveying solutions for various sectors. Contact us to discuss your specific requirements.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Contact Us Today
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Industries;
