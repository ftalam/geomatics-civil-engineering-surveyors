import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import marvin from "@/assets/CHCNAV-marketing.jpeg";
import layout from "@/assets/geoshop-layout.png";
import { useState, useEffect } from "react";



const AboutUs = () => {
  const images = [layout, marvin]; // add your images here

  const [current, setCurrent] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
     setCurrent((prev) => (prev + 1) % images.length);
   }, 4000); // 4s

   return () => clearInterval(interval);
  }, []);
  return (
    <div className="products-theme">
      {/* Header */}
      <section className="py-6 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/geoshop" className="flex items-center gap-2">
                <ArrowLeft size={16} />
                Back to Shop
              </Link>
            </Button>
          </div>
          <h1 className="text-4xl font-bold mb-3">About Geoshop</h1>
          <p className="text-muted-foreground text-lg">
            Your trusted partner in precision surveying and geospatial solutions
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Who We Are</h2>
              <p className="text-muted-foreground mb-4">
               GeoShop limited is a trusted supplier of innovative measurement and positioning products, offering cutting edge geospatial
              technology solutions to meet your surveying and mapping needs. Our product range include advanced GNSS receivers,
              Total stations, Echosounders, Level machines and other precision instruments. These products are tailored to professionals across
              industries such as construction, agriculture, mining, marine and more. We are also the country’s leading distributor of CHCNAV,
              a developer and manufacturer of measuring and positioning products.
              </p>
              <p className="text-muted-foreground mb-4">
                Beyond sales, GeoShop offers flexible equipment hiring services, ensuring that you have access to the latest technology without
                long-term commitments. Additionally, we provide robust CORS (Continuous Operating Reference Station) Services, delivering
                reliable data for high accuracy positioning and surveying. Our commitment to excellence, precision, and customer satisfaction has made us a
                trusted partner for surveyors, engineers, construction companies, and geospatial
                professionals across East Africa.
              </p>
              <p className="text-muted-foreground">
               We pride ourselves on offering a comprehensive range of products from world-renowned
               manufacturers, backed by expert technical support and after-sales service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-screen overflow-hidden object-contain"
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Surveying equipment and team"
                  className={`absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg transition-opacity duration-1000 ${
                    index === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>

              {/* 🔵 Dot Indicators */}
              <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === current
                        ? "bg-white scale-125"
                        : "bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

          </div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Equipment Sales</h3>
                <p className="text-muted-foreground">
                  Comprehensive range of surveying instruments, GPS systems, total stations,
                  and civil engineering equipment from leading manufacturers.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Technical Support</h3>
                <p className="text-muted-foreground">
                  Expert technical assistance, equipment calibration, maintenance services,
                  and training programs for optimal equipment performance.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">After-Sales Service</h3>
                <p className="text-muted-foreground">
                  Reliable warranty support, repair services, and ongoing maintenance
                  to ensure your equipment remains in top working condition.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide cutting-edge surveying and geospatial solutions that empower professionals
                to achieve precision, efficiency, and excellence in their work. We strive to be the
                preferred partner for surveying equipment and services in East Africa.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg border">
              <h3 className="text-2xl font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-muted-foreground">
                To be the leading provider of surveying solutions in East Africa, recognized for
                innovation, quality service, and commitment to advancing the surveying and geospatial
                industries through technology and expertise.
              </p>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Geoshop?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Quality Assurance</h4>
                <p className="text-sm text-muted-foreground">
                  Only genuine products from reputable manufacturers
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Expert Support</h4>
                <p className="text-sm text-muted-foreground">
                  Technical expertise and training for all products
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Competitive Pricing</h4>
                <p className="text-sm text-muted-foreground">
                  Best value for money with transparent pricing
                </p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Fast Delivery</h4>
                <p className="text-sm text-muted-foreground">
                  Quick delivery across Kenya and East Africa
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
 <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl text-primary mb-4"> <b>GET IN TOUCH</b> <br/> WITH US </h3>
            </div>
            <div >
              <div className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                 <p className="font-medium">Phone</p>
                 <p className="text-sm text-muted-foreground">+254 768922891</p>
               </div>
              </div>

              <div className="flex items-center gap-3">
               <Mail className="w-5 h-5 text-primary flex-shrink-0" />
               <div>
                 <p className="font-medium">Email</p>
                 <p className="text-sm text-muted-foreground">sales@geomatics.co.ke</p>
               </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <div className=" grid grid-cols-2 gap-2">
                <Link to="/geoshop" className="block text-muted-foreground hover:text-primary transition-colors">
                  Shop
                </Link>
                <Link to="/geoshop/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
               
                <Link to="/services" className="block text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </div>
            </div>
          </div>
        </div>
         <div>
             <p className="text-sm text-center text-muted-foreground"> © 2024 Geoshop. All rights reserved. </p>
         </div>
      </footer>
    </div>
  );
};

export default AboutUs;