import { useEffect, useState } from "react";
import { ChevronDown, Moon, Sun } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, footerCollapsible = false, footerDefaultOpen = false }) => {
  const [contentTheme, setContentTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("content-theme") === "light"
      ? "light"
      : "dark";
  });

  const [footerOpen, setFooterOpen] = useState(footerDefaultOpen);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("content-theme", contentTheme);
  }, [contentTheme]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div
        className={`${
          contentTheme === "light" ? "site-theme-light" : "site-theme-dark"
        } bg-background text-foreground`}
      >
        <button
          type="button"
          onClick={() =>
            setContentTheme((prev) => (prev === "dark" ? "light" : "dark"))
          }
          className="fixed right-4 top-24 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-card"
          aria-label={
            contentTheme === "dark"
              ? "Switch to light mode"
              : "Switch to dark mode"
          }
          title={contentTheme === "dark" ? "Light mode" : "Dark mode"}
        >
          {contentTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        {children}
      </div>
      {footerCollapsible ? (
        <div className="bg-black border-t border-white/10">
          <button
            type="button"
            onClick={() => setFooterOpen((prev) => !prev)}
            className="w-full flex items-center justify-end gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            aria-expanded={footerOpen}
            aria-label="Toggle footer"
          >
            <span className="sr-only">Toggle footer</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${footerOpen ? "rotate-180" : ""}`}
            />
          </button>
          {footerOpen ? <Footer /> : null}
        </div>
      ) : (
        <Footer />
      )}
    </div>
  );
};

export default Layout;
