import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImg from "@/assets/GCES.jpg";

const COMPANY_PROFILE_DOC_PATH = "/profiles/Geomatics-Company-Profile.docx";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Industries", path: "/industries" },
  { name: "Products", path: "/products" },
  { name: "Support", path: "/support" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 relative border-b border-white/10 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoImg}
              alt="Geomatics Civil Engineering Surveyors logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                <Button
                  variant="nav"
                  className={
                    location.pathname === link.path
                      ? "text-emerald-400 bg-emerald-500/10"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Contact & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a href="tel:+254712345678" className="hidden md:flex items-center gap-2 text-slate-300 hover:text-cyan-300 transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+254 712 345 678</span>
            </a>
            <a
              href={COMPANY_PROFILE_DOC_PATH}
              download
              className="hidden sm:block"
            >
              <Button variant="hero" size="sm" className="products-theme">
                Download Profile
              </Button>
            </a>
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                >
                  <div
                    className={`py-3 px-4 rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href={COMPANY_PROFILE_DOC_PATH}
                  download
                  onClick={() => setIsOpen(false)}
                >
                  <Button variant="hero" className="w-full products-theme">
                    Download Profile
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
