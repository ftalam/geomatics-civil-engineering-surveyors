import {motion} from "framer-motion";
import Layout from "@/components/Layout.jsx";
import sectionheader from "@/components/SectionHeader";     
import {link} from "react-router-dom";  
import {Button} from "@/components/ui/button";

const Projects = () => {
  return (
    <Layout>
      <SectionHeader title="Our Projects" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <h1>Projects</h1>
        <p>This is the Projects page.</p>
      </motion.div>
    </Layout>
  );
};

export default Projects;