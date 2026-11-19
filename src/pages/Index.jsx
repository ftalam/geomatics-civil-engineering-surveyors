import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout.jsx";
import SectionHeader from "@/components/SectionHeader";
import IndustryCard from "@/components/IndustryCard";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";
import { Star, Users, Award, Target, ArrowRight, CheckCircle } from "lucide-react";

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
import GeoshopLogo from "@/assets/3.svg";

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

const project = [
  {
    title: "Slam survey",
    label: "Clients Served",
    description: "We have successfully served over 500 clients across various industries, providing them with precision surveying solutions that meet their unique needs.",
    image: architectureImg,
  },
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
      <section className="relative min-h-[30vh] md:min-h-[30vh] flex items-center py-8">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="GCES Ltd."
            className="w-full h-full object-cover object-center max-h-screen"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="container mx-auto px-4 relative z-12">
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
                <span className="text-emerald-500">Precision-Based</span>{" "}
                <span className="text-gradient">Decision Making</span>
              </h1>
              <meta name="description" content="Innovative surveying solutions for businesses that need precision. Delivering cutting-edge geomatics services since 2000." />
              <p className="text-muted-background text-base md:text-lg mb-6 leading-relaxed">
                Innovative surveying solutions for businesses that need precision. Delivering cutting-edge geomatics services since 2000.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="lg" className="group products-theme"
                  onClick={() => window.open("/geoshop", "_blank")}
                >
                  <img
                    src={GeoshopLogo}
                    alt="Geomatics Civil Engineering Surveyors logo"
                    className="h-10 w-auto object-contain transition-[filter] group-hover:brightness-0 group-hover:invert"
                    />
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <meta name="keywords" content="geomatics, civil engineering, surveying, precision surveying, geospatial services, topographic surveys, construction site management, renewable energy surveys, mining surveys, architectural surveys
                total station, GPS, RTK, Survey eqipement, ViLi-100, Laser Scanner, Drone" />
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
      <section id="services" className="py-3 bg-card/30">
        <div className="container mx-auto px-2">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {services.slice(0, 10).map((service, index) => (
              <ServiceCard key={service.id} {...service} index={index} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/services">
              <Button variant="outline" size="lg">
                View All Services <ArrowRight className="w-5 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Clients Section*/}
      <section className="py-2 border-y border-border bg-gradient-card w-full overflow-hidden">
        <div className="w-full">
          <p className="text-center text-muted-foreground text-sm sm:text-base mb-3 sm:mb-4 px-4">
            We take pride in serving a diverse range of clients across various industries.
          </p>
          <div className="w-full flex items-center overflow-hidden">
            <motion.div 
              initial={{ x: 40 }} 
              animate={{ x: 0 }} 
              transition={{duration: 0.4}}
              className="flex w-full justify-center gap-6 sm:gap-8 lg:gap-20 px-4 sm:px-8 lg:px-12" > 
              {visibleClients.map((client) => ( 
                <div key={client.name} 
                  className="flex-shrink-0 h-12 w-20
                              sm:h-18 sm:w-28
                              lg:h-20 lg:w-32
                              flex items-center opacity-90 hover:opacity-100 transition-all" >
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-h-full max-w-full object-contain" /> 
                </div>
              ))} 
            </motion.div>
          </div>
        </div>
      </section>

  
      {/* Projects Section */}
      <section className="py-5 bg-card/30">
        <div className="container mx-auto px-2">
        
          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <SectionHeader
            badge="Projects"
            description="Take a look at some projects we've been involved in across various industries."
          /><iframe 
          title = "3D SLAM SURVEY"
          src="https://storymaps.arcgis.com/stories/60f81e19e0474909b5dfad206085b113" width="100%" height="500px" frameborder="0" allowfullscreen allow="geolocation"></iframe>
            
            <Link to="https://arcg.is/4zCCe3" className="hover:text-primary decoration-primary/60">
              Precision <ArrowRight className="w-5 h-5" /> 
            </Link>
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

      {/* CTA Section */}
      <section className="py-6 bg-card/60">
        <div className="container mx-auto px-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-2xl md:text-xl lg:text-2xl text-foreground mb-2">
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
              <Button variant="outline" size="xl" onClick={() => window.open('/products')}>
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
