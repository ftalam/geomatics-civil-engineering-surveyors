import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Target, Eye, Users, Award, CheckCircle, ArrowRight } from "lucide-react";

import geospatialImg from "@/assets/geospatial.jpg";

const partners = [
  { name: "CHCNAV", description: "Global GNSS and positioning solutions" },
  { name: "IVOLVE", description: "Innovative telematics and fleet management" },
  { name: "TOPCON", description: "Precision positioning equipment" },
  { name: "QUANTUMSYSTEMS", description: "Professional UAV mapping solutions" },
  { name: "TELEO", description: "Heavy equipment automation technology" },
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "We deliver accurate, reliable measurements that form the foundation of successful projects.",
  },
  {
    icon: Eye,
    title: "Innovation",
    description: "We embrace cutting-edge technology to provide advanced surveying solutions.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work closely with clients to understand and meet their unique requirements.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in every project we undertake.",
  },
];

const milestones = [
  { year: "2000", event: "Company founded in Nairobi" },
  { year: "2005", event: "Expanded services to include drone mapping" },
  { year: "2010", event: "Partnered with TOPCON and CHCNAV" },
  { year: "2015", event: "Launched renewable energy surveying services" },
  { year: "2020", event: "Celebrated 20 years of excellence" },
  { year: "2026", event: "Opened the GEOSHOP retail division" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="About Us"
            title="Precision Since 2000"
            description="A geomatics engineering company established to deliver cutting-edge services and technologies to developers and businesses working on innovative solutions that require precision."
          />
        </div>
      </section>

      {/* Story Section */}
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
              <div className="rounded-2xl overflow-hidden shadow-card">
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

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Values"
            title="What Drives Us"
            description="The core principles that guide everything we do."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-card shadow-card text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Partners"
            title="Trusted Technology Partners"
            description="We collaborate with global leaders in surveying and positioning technology."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-card shadow-card flex items-center gap-4"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-bold text-primary text-lg">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-foreground">
                    {partner.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{partner.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Our Journey"
            title="Key Milestones"
            description="A timeline of our growth and achievements."
          />
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-8 last:mb-0"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                  <span className="font-display font-bold text-lg text-primary-foreground">
                    {milestone.year}
                  </span>
                </div>
                <div className="flex-1 p-6 rounded-2xl bg-gradient-card shadow-card">
                  <p className="text-foreground font-medium">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
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
