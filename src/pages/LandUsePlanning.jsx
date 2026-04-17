import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ArticleLayout from "@/components/ArticleLayout";
import ArticleFigure from "@/components/ArticleFigure";
import { Link } from "react-router-dom";

import landuseImg from "@/assets/SubdivisionPlan.png";
import civilWorksImg from "@/assets/civil-works.jpg";
import geospatialImg from "@/assets/geospatial.jpg";

/* ---------------- BEFORE / AFTER SLIDER ---------------- */
const BeforeAfterSlider = ({ beforeImg, afterImg }) => {
  const [position, setPosition] = useState(50);
  const ref = useRef(null);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setPosition(Math.max(0, Math.min(100, percent)));
  };

  return (
    <div
      ref={ref}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
      onClick={handleMove}
      className="relative w-full max-w-xl mx-auto h-56 rounded-xl overflow-hidden cursor-ew-resize"
    >
      <img src={afterImg} className="absolute inset-0 w-full h-full object-cover" />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        <img src={beforeImg} className="w-full h-full object-cover" />
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-white"
        style={{ left: `${position}%` }}
      />

      <div className="absolute top-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
        Before
      </div>
      <div className="absolute top-2 right-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
        After
      </div>
    </div>
  );
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "process", label: "Process" },
  { id: "value", label: "Why Choose Us" },
];

const LandUsePlanning = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedImg, setSelectedImg] = useState(null);

  /* Scroll animation */
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <ArticleLayout
      title="Land-Use Planning"
      tagline="Smart, practical planning that balances development, infrastructure, and environment."
    >
      <div className="grid lg:grid-cols-[220px_1fr] gap-10">

        {/* SIDEBAR */}
        <aside className="hidden lg:block sticky top-24 h-fit">
          <div className="space-y-2 border-l pl-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`block text-left text-sm ${
                  activeTab === tab.id
                    ? "text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <div>

          {/* Mobile Tabs */}
          <div className="flex gap-2 mb-6 lg:hidden">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-sm ${
                  activeTab === tab.id ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              ref={ref}
              style={{ y, opacity }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 text-[17px] leading-relaxed"
            >

              {/* OVERVIEW */}
              {activeTab === "overview" && (
                <>
                  <ArticleFigure
                    src={landuseImg}
                    alt="Land-use"
                    caption="Planning transforms policy into land allocation."
                    align="right"
                    widthClassName="md:w-[340px]"
                    thumbImgClassName="w-full h-44 object-cover cursor-pointer"
                    onClick={() => setSelectedImg(landuseImg)}
                  />

                  <p className="text-muted-foreground">
                    <strong>Land-use planning</strong> ensures that land is used efficiently by aligning
                    <strong> development, infrastructure, and environmental considerations</strong>.
                    It reduces conflicts and creates a clear path for sustainable growth.
                  </p>

                  <p className="text-muted-foreground">
                    A strong plan improves decision-making, supports investment, and ensures that
                    <strong> the right developments happen in the right locations</strong>.
                  </p>

                  {/* SLIDER */}
                  <BeforeAfterSlider
                    beforeImg={landuseImg}
                    afterImg={geospatialImg}
                  />

                  <div className="clear-both" />
                </>
              )}

              {/* PROCESS */}
              {activeTab === "process" && (
                <>
                  <ArticleFigure
                    src={geospatialImg}
                    alt="Process"
                    caption="Data-driven spatial analysis."
                    align="left"
                    widthClassName="md:w-[320px]"
                    thumbImgClassName="w-full h-40 object-cover cursor-pointer"
                    onClick={() => setSelectedImg(geospatialImg)}
                  />

                  <div className="space-y-6">
                    {[
                      "Understanding site conditions and regulations",
                      "Analyzing constraints and opportunities",
                      "Developing and comparing planning options",
                      "Refining the preferred plan",
                      "Defining implementation and monitoring",
                    ].map((text, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-muted-foreground"
                      >
                        <strong>{`0${i + 1}.`}</strong> {text}
                      </motion.p>
                    ))}
                  </div>

                  <div className="clear-both" />
                </>
              )}

              {/* VALUE */}
              {activeTab === "value" && (
                <>
                  <ArticleFigure
                    src={civilWorksImg}
                    alt="Infrastructure"
                    caption="Planning aligned with infrastructure."
                    align="right"
                    widthClassName="md:w-[320px]"
                    thumbImgClassName="w-full h-44 object-cover cursor-pointer"
                    onClick={() => setSelectedImg(civilWorksImg)}
                  />

                  <p className="text-muted-foreground">
                    Our approach combines <strong>technical expertise</strong> with practical,real-world understanding to deliver plans that are not just compliant, but <strong>usable and effective</strong>.
                  </p>

                  <p className="text-muted-foreground">
                    We focus on <strong>clarity, efficiency, and long-term value</strong>,ensuring your project moves forward smoothly.
                  </p>

                  <p className="text-muted-foreground">
                    Every plan is designed to be <strong>scalable, adaptable, and future-ready</strong>, giving you confidence in both approvals and execution.
                  </p>

                  <div className="clear-both" />
                </>
              )}

            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <div className="mt-12 bg-card border rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold mb-3">Need a Spatial Plan?</h3>
            <p className="text-muted-foreground mb-4">
              Let’s help you plan smarter and move your project forward with confidence.
            </p>
            <Link to="/contact" className="bg-primary text-white px-6 py-3 rounded-lg">
              Request Service
            </Link>
          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            onClick={() => setSelectedImg(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={selectedImg}
              className="max-w-[90%] max-h-[90%] rounded-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

    </ArticleLayout>
  );
};

export default LandUsePlanning;