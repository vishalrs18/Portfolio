"use client";
import Hero from "./hero";
import Stats from "./stats";
import TechStack from "./techStack";
import Projects from "./projects";
import { motion } from "motion/react";

const Divider = () => {
  return (
    <div className="w-full bg-transparent flex items-center justify-center p-12">
      <motion.div
        className="w-full h-0.5 bg-linear-to-r from-transparent via-app-theme to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default function Home() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
      </motion.div>
      <Divider />
      <Stats />
      <Divider />
      <TechStack />
      <Divider />
      <Projects />
    </>
  );
}
