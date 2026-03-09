import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const termsSections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.",
  },
  {
    title: "Use of Website",
    body: "The website provides information on Geomatics Civil Engineering Surveyors Limited, detailing the services offered and how one may contact the company.",
  },
  {
    title: "Use of Services",
    body: "You agree to use our website and services only for lawful purposes and in a manner that does not infringe the rights of others.",
  },
  {
    title: "Intellectual Property",
    body: "All website content, including text, graphics, logos, and product materials, is owned by Geomatics Civil Engineering Surveyors Ltd. unless otherwise stated. You may not copy, reproduce, distribute, or reuse content without written permission.",
  },
  {
    title: "Accuracy of Information",
    body: "We strive to keep all product and service information accurate, but we do not guarantee that all details are complete, current, or error-free at all times.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Geomatics Civil Engineering Surveyors Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.",
  },
  {
    title: "Changes to Terms",
    body: "We may update these terms periodically. Continued use of this website after changes are posted constitutes acceptance of the updated terms.",
  }, 
  {
    title: "Governing Law",
    body: "This terms shall be governed by the laws of Kenya."
  },
  {
    title: "Contact",
    body: "For questions about these Terms of Service, contact us at info@geomatics.co.ke or visit our website.",
  },
];

const Terms = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen site-theme-dark bg-background text-foreground">
      <div className="fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <section className="py-12 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Legal"
            title="Terms of Service"
            description="Please review the terms that govern your use of our website and services."
          />
          <p className="text-center text-muted-foreground text-sm mt-4">
            Last updated: March 9, 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          {termsSections.map((section, index) => (
            <motion.article
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-gradient-card shadow-card"
            >
              <h2 className="font-display font-semibold text-xl text-foreground mb-3">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{section.body}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Terms;
