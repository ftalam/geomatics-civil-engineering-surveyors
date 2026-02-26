import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import IndustryCard from "@/components/IndustryCard";
import ServiceCard from "@/components/ServiceCard";
import { Star, Users, Award, Target, ArrowRight, CheckCircle, Mountain, MapPinned, HardHat, Satellite, Plane,
  Globe, LayoutGrid, Trees, Building2, Wrench, } from "lucide-react";

import heroImage from "@/assets/hero-surveying.jpg";
import architectureImg from "@/assets/architecture.jpg";
import civilWorksImg from "@/assets/civil-works.jpg";
import geospatialImg from "@/assets/geospatial.jpg";
import miningImg from "@/assets/mining.jpg";
import renewableImg from "@/assets/renewable-energy.jpg";
import bestSellerImg from "@/assets/chcnav-vili-i100-visual-lidar-gnss-rtk-receiver-surveying.jpg";
import kenhaLogo from "@/assets/KeNHA.jpg";
import ministryLogo from "@/assets/ministry-water-lg.png";
import kplcLogo from "@/assets/kplc.jpg";
import MIBPLogo from "@/assets/Logo - MIBP Small.avif";
import uonLogo from "@/assets/UoN.png";
import kengenLogo from "@/assets/KenGen.png";
import nibLogo from "@/assets/National-Irrigation-Board.png";
import HHSGSLogo from "@/assets/HH-SGS.png";
import konzaLogo from "@/assets/Konza_Techno_City_Logo.png";

const services = [
  {
    title: "Topographic Surveys",
    description: "Detailed terrain mapping and elevation data for project planning and design.",
    icon: Mountain,
  },
  {
    title: "Land (Cadastral) Surveys",
    description: "Boundary determination, subdivision, and land ownership documentation.",
    icon: MapPinned,
  },
  {
    title: "Engineering Surveys",
    description: "High-precision surveys for infrastructure and construction projects.",
    icon: HardHat,
  },
  {
    title: "Geodetic GPS Control",
    description: "CORS Network-based geodetic control surveys for large-scale projects.",
    icon: Satellite,
  },
  {
    title: "UAV-Based Mapping",
    description: "Drone-powered aerial surveys for rapid and accurate terrain mapping.",
    icon: Plane,
  },
  {
    title: "GIS & Remote Sensing",
    description: "Spatial data analysis, management, and presentation using GIS technology.",
    icon: Globe,
  },
  {
    title: "Spatial Planning",
    description: "Strategic spatial analysis and planning for sustainable development.",
    icon: LayoutGrid,
  },
  {
    title: "Land-Use Planning",
    description: "Optimal land allocation and use strategies for communities and projects.",
    icon: Trees,
  },
  {
    title: "Urban & Regional Planning",
    description: "Comprehensive planning solutions for urban and regional development.",
    icon: Building2,
  },
  {
    title: "Equipment Supply & Training",
    description: "Sales, calibration, and training on professional surveying equipment.",
    icon: Wrench,
  },
];

const clientLogos = [
  { name: "KeNHA", logo: kenhaLogo },
  { name: "Ministry of Water Sanitation and Irrigation", logo: ministryLogo },
  { name: "KPLC", logo: kplcLogo },
  { name: "Mangat.I.B.Patel(MIBP) Ltd.", logo: MIBPLogo },
  { name: "University of Nairobi", logo: uonLogo },
  { name: "KenGen", logo: kengenLogo },
  { name: "National Irrigation Board", logo: nibLogo },
  { name: "Howard Humphreys Consulting Engineers", logo: HHSGSLogo },
  { name: "Konza Technopolis", logo: konzaLogo },
];
const industries = [
  {
    title: "Architecture & Construction",
    description: "Precision surveying for architectural projects and construction site management.",
    image: architectureImg,
  },
  {
    title: "Civil Works",
    description: "Infrastructure development with accurate topographic and engineering surveys.",
    image: civilWorksImg,
  },
  {
    title: "Geospatial",
    description: "Advanced geospatial data collection and mapping solutions.",
    image: geospatialImg,
  },
  {
    title: "Mining & Quarry",
    description: "Comprehensive surveying for mining operations and quarry management.",
    image: miningImg,
  },
  {
    title: "Renewable Energy",
    description: "Site surveys for solar, wind, and other renewable energy installations.",
    image: renewableImg,
  },
  {
    title: "Best Seller",
    description: "Top-rated products for precision surveying.",
    image: bestSellerImg,
  },
];

const partners = ["CHCNAV", "IVOLVE", "TOPCON", "QUANTUMSYSTEMS", "TELEO"];

const stats = [
  { icon: Users, value: "500+", label: "Clients Served" },
  { icon: Award, value: "25+", label: "Years Experience" },
  { icon: Target, value: "1000+", label: "Projects Completed" },
];

const Index = () => {
  const [clientSlideIndex, setClientSlideIndex] = useState(0);
  const [serviceSlideIndex, setServiceSlideIndex] = useState(0);

  useEffect(() => {
    const clientInterval = setInterval(() => {
      setClientSlideIndex((prev) => (prev + 1) % clientLogos.length);
    }, 3000);

    const serviceInterval = setInterval(() => {
      setServiceSlideIndex((prev) => (prev + 1) % services.length);
    }, 3500);

    return () => {
      clearInterval(clientInterval);
      clearInterval(serviceInterval);
    };
  }, []);

  const visibleClients = Array.from({ length: 4 }, (_, i) => {
    const index = (clientSlideIndex + i) % clientLogos.length;
    return clientLogos[index];
  });

  const visibleServices = Array.from({ length: 3 }, (_, i) => {
    const index = (serviceSlideIndex + i) % services.length;
    return services[index];
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[20vh] md:min-h-[24vh] flex items-center py-8">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Surveying equipment"
            className="w-full h-full object-cover object-center max-h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Welcome to Geomatics Civil Engineering Limited
              </span>
              <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
                Precision-Based{" "}
                <span className="text-gradient">Decision Making</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
                Innovative surveying solutions for businesses that need precision. Delivering cutting-edge geomatics services since 2000.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  variant="hero"
                  size="lg"
                  className="products-theme"
                  onClick={() => window.open("/geoshop", "_blank")}
                >
                  Shop Now <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Link to="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section*/}
      <section id="services" className="py-5 bg-card/30">
        <div className="container mx-auto px-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.slice(0, 5).map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index} />
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {services.slice(5).map((service, index) => (
              <ServiceCard key={service.title} {...service} index={index + 5} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
       {/* Clients Section*/}
      <section className="py-2 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground text-L mb-3">
            Our Clients
          </p>
          <div className="flex flex-col items-center gap-2">
            <motion.div
              key={clientSlideIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center gap-10 md:gap-8"
            >
              {visibleClients.map((client) => (
                <div
                  key={client.name}
                  className="h-21 flex items-center opacity-90 hover:opacity-100 transition-all"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                Why Choose Us?
              </span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
                Your Trusted Partner for Precision Surveying
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Since 2000, we've been delivering cutting-edge geomatics services and technologies to developers and businesses working on innovative solutions that require precision.
              </p>
              <ul className="space-y-4">
                {[
                  "25+ years of industry experience",
                  "State-of-the-art surveying equipment",
                  "Expert team of certified surveyors",
                  "Comprehensive support and training",
                  "Partnerships with leading technology providers",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-card">
                <img
                  src={geospatialImg}
                  alt="Geospatial surveying"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-primary rounded-2xl p-6 shadow-glow">
                <p className="font-display font-bold text-3xl text-primary-foreground">25+</p>
                <p className="text-primary-foreground/80 text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-5 bg-card/30">
        <div className="container mx-auto px-2">
          <SectionHeader
            badge="Diverse Industries Expertise"/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {industries.slice(0, 5).map((industry, index) => (
              <IndustryCard key={industry.title} {...industry} index={index} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/industries">
              <Button variant="outline" size="lg">
                View All Industries <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      
      {/* Stats Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-card shadow-card"
              >
                <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="font-display font-bold text-4xl text-foreground mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Contact us today to discuss your surveying needs and discover how we can help you achieve precision in your projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact">
                <Button variant="hero" size="xl">
                  Get in Touch
                </Button>
              </Link>
              <Button variant="outline" size="xl" onClick={() => window.open('/geoshop', '_blank')}>
                Browse Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
