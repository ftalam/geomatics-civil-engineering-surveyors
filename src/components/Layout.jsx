import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [contentTheme, setContentTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem("content-theme") === "light"
      ? "light"
      : "dark";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("content-theme", contentTheme);
  }, [contentTheme]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main
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
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
