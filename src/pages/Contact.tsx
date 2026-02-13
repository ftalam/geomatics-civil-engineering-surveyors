import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["Phileo Arcade, Ruiru", "Next to Wonders Church", "Opposite Plainsview Hospital"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+254 721 235 501", "+254 768 123 456"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["pmugo@geomatics.co.ke", "sales@geomatics.co.ke"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="Contact Us"
            title="Get in Touch"
            description="Have questions or need a quote? We'd love to hear from you."
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="First Last"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@geomatics.com"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+254 712 345 678"
                      className="bg-card border-border"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      required
                      className="bg-card border-border"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows={6}
                    required
                    className="bg-card border-border resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                               {/* Phone and Email - side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.filter(info => info.title === "Phone" || info.title === "Email").map((info) => (
                    <div
                      key={info.title}
                      className="p-6 rounded-2xl bg-gradient-card shadow-card flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                      </div>
                  ))}
                </div>
                {/* Location and Working Hours - side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {contactInfo.filter(info => info.title === "Our Location" || info.title === "Working Hours").map((info) => (
                    <div
                      key={info.title}
                      className="p-6 rounded-2xl bg-gradient-card shadow-card flex items-start gap-4"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-muted-foreground text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                ))}
                </div>
              </div>
              {/* Map */}
              <div className="mt-8 rounded-2xl overflow-hidden shadow-card">
                <div className="aspect-video">
                  <iframe
                    title="Phileo Arcade Location"
                    width="425"
                    height="350"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=36.95646286010743%2C-1.1593754579321676%2C36.96710586547852%2C-1.1512339267489746&layer=mapnik&marker=-1.155297,36.960920"
                    style={{ border: "1px solid black", width: "100%", height: "100%" }}
                    loading="lazy"
                  />
                </div>
                <div className="text-center mt-2">
                  <small>
                    <a
                      href="https://www.openstreetmap.org/#map=6/-1.155297/36.960920"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Larger Map
                    </a>
                  </small>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;