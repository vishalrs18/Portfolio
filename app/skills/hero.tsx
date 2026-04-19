"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Animate subtitle
    timeline.fromTo(
      ".hero-subtitle",
      { opacity: 0, x: -100, rotateZ: -10 },
      { opacity: 1, x: 0, rotateZ: 0, duration: 0.8, ease: "power3.out" },
    );

    // Animate title with split
    timeline.fromTo(
      ".hero-title",
      { opacity: 0, y: 100, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.4)" },
      "-=0.4",
    );

    // Animate description
    timeline.fromTo(
      ".hero-description",
      { opacity: 0, x: 100, rotateZ: 10 },
      { opacity: 1, x: 0, rotateZ: 0, duration: 0.8, ease: "power3.out" },
      "-=0.6",
    );
  }, []);

  return (
    <div ref={containerRef} className="flex w-full justify-between items-start">
      <div className="flex flex-col gap-4 pb-6 w-[40%]">
        <motion.p
          className="hero-subtitle text-[#2EFD7C] uppercase text-sm tracking-widest"
          whileHover={{ scale: 1.05, x: 10 }}
          transition={{ duration: 0.2 }}
        >
          Core Competencies
        </motion.p>
        <h1 className="hero-title text-8xl font-extrabold font-manrope text-white">
          Technical <span className="text-app-theme">Architecture.</span>
        </h1>
      </div>
      <motion.div
        className="hero-description secondary-text self-end w-[20%]"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        A precision-engineered stack focused on scalability, performance, and
        type-safe front-end excellence.
      </motion.div>
    </div>
  );
};

export default Hero;
