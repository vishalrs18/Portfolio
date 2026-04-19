"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Card from "../components/molecules/card";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainProjectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate header
    gsap.fromTo(
      ".projects-header",
      { opacity: 0, y: -30 },
      {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
    );

    // Parallax effect for main project image
    if (mainProjectRef.current) {
      gsap.to(mainProjectRef.current.querySelector("img"), {
        scrollTrigger: {
          trigger: mainProjectRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        y: -50,
        ease: "none",
      });
    }

    // Animate side projects
    const sideProjects =
      containerRef.current?.querySelectorAll(".side-project");
    if (sideProjects) {
      gsap.fromTo(
        sideProjects,
        {
          opacity: 0,
          x: 100,
          rotateY: 45,
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-12 gap-4 w-full">
      <div className="projects-header col-span-12 flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="font-manrope font-extrabold text-4xl">
            Selected Works
          </h2>
          <p className="font-manrope text-lg text-[#ADAAAB]">
            Architecture-driven Engineering Projects
          </p>
        </div>
        <motion.div whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
          <Link
            href="/projects"
            className="text-app-theme font-manrope text-sm flex items-center gap-1 uppercase"
          >
            View Projects <ArrowRight />
          </Link>
        </motion.div>
      </div>

      <motion.div
        ref={mainProjectRef}
        className="col-span-8 bg-[#262627]/40 min-h-120 max-h-120 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9, rotateX: -15 }}
        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        whileHover={{
          y: -5,
          boxShadow: "0 25px 50px rgba(129, 236, 255, 0.4)",
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0.6 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src={"/image2.png"}
            loading="lazy"
            width={300}
            height={300}
            alt="dashboard"
            className="w-full h-full rounded-2xl shadow-2xl aspect-square opacity-60"
          />
        </motion.div>
        <motion.div
          className="w-2/3 relative -top-40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.div
            className="text-sm text-app-theme uppercase border-app-theme/30 border bg-app-theme/20 p-2 rounded-2xl w-fit mt-4"
            whileHover={{
              scale: 1.1,
              backgroundColor: "rgba(129, 236, 255, 0.3)",
            }}
          >
            Cloud Infrastructure
          </motion.div>
          <h3 className="font-manrope font-bold text-2xl mt-4">
            Cloud Cost Optimizer
          </h3>
          <p className="text-base text-[#ADAAAB]">
            An automated orchestration layer for multi-cloud cost allocation,
            achieving a 40% reduction in manual resource analysis.
          </p>
        </motion.div>
      </motion.div>

      <div className="col-span-4 flex flex-col gap-4 flex-1 h-full">
        <motion.div
          className="side-project bg-[#262627]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl"
          whileHover={{
            scale: 1.03,
            rotate: 2,
            boxShadow: "0 20px 40px rgba(129, 236, 255, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <Card className="p-6 flex flex-col gap-4 h-1/2">
            <motion.div
              className="text-sm text-app-theme uppercase border-app-theme/30 border bg-app-theme/20 p-2 rounded-2xl w-fit mt-4"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(129, 236, 255, 0.3)",
              }}
            >
              Cloud Governance
            </motion.div>
            <h3 className="font-manrope font-bold text-xl">
              Policy Compliance Dashboard
            </h3>
            <p className="text-sm text-[#ADAAAB]">
              Developed a React-based dashboard for real-time Policy Compliance
              analytics, improving data visualization and tag governance by 30%.
            </p>
          </Card>
        </motion.div>

        <motion.div
          className="side-project bg-[#262627]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl"
          whileHover={{
            scale: 1.03,
            rotate: -2,
            boxShadow: "0 20px 40px rgba(129, 236, 255, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <Card className="p-6 flex flex-col gap-4 h-1/2">
            <motion.div
              className="text-sm text-app-theme uppercase border-app-theme/30 border bg-app-theme/20 p-2 rounded-2xl w-fit mt-4"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(129, 236, 255, 0.3)",
              }}
            >
              Cloud Services and Health
            </motion.div>
            <h3 className="font-manrope font-bold text-xl">
              Service Analytics Dashboard
            </h3>
            <p className="text-sm text-[#ADAAAB]">
              Engineered a secure, scalable health metrics and performance
              metrics dashboard, enhancing system monitoring and operational
              efficiency by 25%.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Projects;
