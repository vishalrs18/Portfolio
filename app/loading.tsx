"use client";

import { motion, Variants } from "motion/react";

export default function LoadingThreeDotsPulse() {
  const dotVariants: Variants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] z-50">
      <motion.div
        animate="pulse"
        transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
        className="flex justify-center items-center gap-5"
      >
        <motion.div
          className="w-5 h-5 rounded-full bg-app-theme"
          variants={dotVariants}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="w-5 h-5 rounded-full bg-app-theme"
          variants={dotVariants}
          style={{ willChange: "transform" }}
        />
        <motion.div
          className="w-5 h-5 rounded-full bg-app-theme"
          variants={dotVariants}
          style={{ willChange: "transform" }}
        />
      </motion.div>
    </div>
  );
}
