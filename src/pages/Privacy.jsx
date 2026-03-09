import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const privacySections = [
  {
    title: "Information We Collect",
    body: "We may collect personal information you provide directly, such as your name, email, phone number, and inquiry details when you contact us.",
  },
  {
    title: "How We Use Information",
    body: "We use collected information to respond to inquiries, provide requested services, improve website functionality, and support customer communication.",
  },
  {
    title: "Cookies and Analytics",
    body: "Our website may use cookies and analytics tools to understand usage patterns and improve performance. You can manage cookie settings through your browser.",
  },
  {
    title: "Information Sharing",
    body: "We do not sell your personal information. We may share data with trusted service providers only when needed to operate our services or comply with legal obligations.",
  },
  {
    title: "Data Security",
    body: "We apply reasonable administrative and technical safeguards to protect personal information from unauthorized access, loss, or misuse.",
  },
  {
    title: "Your Rights",
    body: "You may request access, correction, or deletion of your personal information by contacting us through the details provided below.",
  },
  {
    title: "Contact",
    body: "For privacy questions, contact us at info@geomatics.co.ke or +254 712 345 678.",
  },
];

const Privacy = () => {
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
            title="Privacy Policy"
            description="This policy explains how we collect, use, and protect your information."
          />
          <p className="text-center text-muted-foreground text-sm mt-4">
            Last updated: March 9, 2026
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-6">
          {privacySections.map((section, index) => (
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

export default Privacy;
