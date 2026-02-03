import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Headphones,
  MessageSquare,
  FileText,
  Video,
  Download,
  BookOpen,
  ArrowRight,
  Mail,
  Phone,
} from "lucide-react";

const supportOptions = [
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Get expert assistance with equipment setup, calibration, and troubleshooting.",
    action: "Contact Support",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team in real-time for quick answers to your questions.",
    action: "Start Chat",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Access comprehensive user manuals, guides, and product specifications.",
    action: "View Docs",
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Watch step-by-step tutorials on equipment operation and best practices.",
    action: "Watch Videos",
  },
  {
    icon: Download,
    title: "Software Downloads",
    description: "Download the latest firmware updates, drivers, and companion software.",
    action: "Downloads",
  },
  {
    icon: BookOpen,
    title: "Training Programs",
    description: "Enroll in our comprehensive training courses for surveying professionals.",
    action: "View Courses",
  },
];

const faqs = [
  {
    question: "What warranty do your products come with?",
    answer: "All our products come with a minimum 1-year manufacturer warranty. Extended warranty options are available for most equipment.",
  },
  {
    question: "Do you offer equipment rental?",
    answer: "Yes, we offer short-term and long-term rental options for most of our surveying equipment. Contact us for rental rates and availability.",
  },
  {
    question: "Can you provide on-site training?",
    answer: "Absolutely! We offer customized on-site training programs tailored to your team's needs. Our certified trainers will come to your location.",
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unused equipment in original packaging. Contact our support team to initiate a return.",
  },
];

const Support = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Support Center"
            title="We're Here to Help"
            description="DM IS DD - Dedicated support to ensure your surveying operations run smoothly."
          />
          <div className="flex justify-center gap-4 mt-8">
            <a href="tel:+254712345678">
              <Button variant="hero" size="lg">
                <Phone className="w-5 h-5" />
                Call Us Now
              </Button>
            </a>
            <a href="mailto:support@geomatics.co.ke">
              <Button variant="outline" size="lg">
                <Mail className="w-5 h-5" />
                Email Support
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="How Can We Assist You?"
            description="Choose from our range of support services designed to help you succeed."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={option.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl bg-gradient-card shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <option.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-bold text-xl text-foreground mb-3">
                  {option.title}
                </h3>
                <p className="text-muted-foreground mb-6">{option.description}</p>
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                  {option.action} <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="FAQ"
            title="Frequently Asked Questions"
            description="Find answers to common questions about our products and services."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-gradient-card shadow-card"
              >
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
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
              Can't Find What You Need?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our dedicated support team is always ready to help. Reach out to us directly.
            </p>
            <Link to="/contact">
              <Button variant="hero" size="xl">
                Contact Us <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Support;
