import { Link } from "react-router-dom";
import logoImg from "@/assets/GCES.jpg";
import Glogo from "@/assets/5.svg";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-2.5 ,mt-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
         {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Geomatics Civil Engineering Surveyors logo"
              className="h-18 w-auto object-contain"
            />
          </Link>
            </div>
            <p className="text-muted-foreground text-sm mb-6">
              Delivering precision geomatics solutions since 2000. Your trusted partner for surveying excellence.
            </p>
         
          </div>

          {/* Quick Links */}
          <div >
            <h4 className="font-display font-semibold text-foreground mb-4 text-center">Quick Links</h4>
            <ul className=" grid sm-grid-cols-2 gap-2 text-center">
              {["Home", "About", "Services", "Products", "Industries",  "Support"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* News */}
            <div >
              <h4 className="font-display font-semibold text-foreground mb-6">Latest News</h4>

              <div className="space-y-4">
                {/* News Item */}
                <div className="flex gap-3">
                 <div className="w-14 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                 <span className="font-display font-bold text-l text-primary-foreground">GCES</span>
                </div>

                  <div>
                    <p className="text-sm font-medium text-foreground">
                      New Geomatics Engineering Surveyors webpage
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Our organization recently setup a company's website.
                    </p>
                  </div>
                </div>

          {/* News Item */}
            <div className="flex gap-3">
              <img
                src={Glogo}
                alt="Geoshop Launch"
                className="w-14 h-12 object-cover rounded-md"
              />

              <div>
                <Link to="/geoshop" target="_blank" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                  Geoshop Launch
                </Link>
                <p className="text-xs text-muted-foreground">
                  Providing high-quality surveying instruments.
                </p>
              </div>
            </div>
            </div>
            </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  Phileo Arcade, Ruiru. <br/>  P.O. BOX. 7726-00100, NAIROBI KENYA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="tel:+254768922891" className="text-muted-foreground hover:text-green-500 transition-colors text-sm">
                  +254 768 922891
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-500 flex-shrink-0" />
                <a href="mailto:info@geomatics.co.ke" className="text-muted-foreground hover:text-green-500 transition-colors text-sm">
                  info@geomatics.co.ke
                </a>
              </li>
            </ul>
               <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-green-950 hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-green-950 hover:text-primary-foreground transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-green-950 hover:text-primary-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-green-950 hover:text-primary-foreground transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
        </div>

        <div className="border-t border-border mt-1 mb-1 pt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Geomatics Civil Engineering Surveyors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
