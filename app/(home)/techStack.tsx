"use client";
import { Cloud, Compass, FileSignal, Spotlight } from "lucide-react";
import SkillSet from "./skillSet";
import Card from "../components/molecules/card";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CardContent = ({
  icon: Icon,
  title,
  description,
  className = "",
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) => {
  return (
    <>
      {Icon}
      <h4 className="font-manrope font-bold text-lg text-inherit">{title}</h4>
      <p className="text-sm text-[#ADAAAB]">{description}</p>
    </>
  );
};

const TechStack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate title with split effect
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -100, rotateY: -90 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
        },
      );
    }

    // Animate cards with different patterns
    const cards = containerRef.current?.querySelectorAll(".tech-card");
    if (cards) {
      cards.forEach((card, index) => {
        const rotation = index % 2 === 0 ? -5 : 5;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            scale: 0.8,
            rotate: rotation,
            y: 50,
          },
          {
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            scale: 1,
            rotate: 0,
            y: 0,
            duration: 0.8,
            delay: 0.2 + index * 0.15,
            ease: "back.out(1.7)",
          },
        );
      });
    }
  }, []);

  const cardClassName = `bg-[#201F21] backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6 flex flex-col gap-3`;
  const iconClassName = `w-6 h-6 stroke-app-theme`;

  return (
    <div ref={containerRef} className="flex gap-6 items-start">
      <div className="w-[40%]">
        <h2 ref={titleRef} className="font-manrope text-4xl font-extrabold ">
          {" "}
          Technical Architecture & Stack
        </h2>
        <motion.p
          className="text-[#ADAAAB] mt-4 text-base"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          My approach focuses on creating maintainable codebases using modern
          patterns. I don&apos;t just write code; I design systems that scale.
        </motion.p>
        <SkillSet />
      </div>
      <div className="grid grid-cols-2 flex-wrap gap-4 grid-rows-[repeat(2,auto)]">
        <motion.div
          className="tech-card"
          whileHover={{
            scale: 1.05,
            rotate: 2,
            boxShadow: "0 15px 35px rgba(129, 236, 255, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <Card className={`${cardClassName} span-1`}>
            <CardContent
              icon={
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <Compass size={30} className={iconClassName} />
                </motion.div>
              }
              title="Frontend Engineering"
              description="Expertise in building complex single-page applications with React, focusing on state management, hooks, and component lifecycle efficiency."
            />
          </Card>
        </motion.div>
        <motion.div
          className="tech-card"
          whileHover={{
            scale: 1.05,
            rotate: -2,
            boxShadow: "0 15px 35px rgba(129, 236, 255, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <Card className={`${cardClassName} span-2`}>
            <CardContent
              icon={
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <Cloud size={30} className={iconClassName} />
                </motion.div>
              }
              title="Cloud Infrastructure"
              description="Certified experience with AWS services (S3, EC2, Lambda) to deploy, secure, and manage large-scale cloud applications."
            />
          </Card>
        </motion.div>
        <motion.div
          className="tech-card"
          whileHover={{
            scale: 1.05,
            rotate: -2,
            boxShadow: "0 15px 35px rgba(129, 236, 255, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <Card className={`${cardClassName} span-1`}>
            <CardContent
              icon={
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <FileSignal size={30} className={iconClassName} />
                </motion.div>
              }
              title="Cloud Audit"
              description="Deep-dive performance tuning using Chrome DevTools, Lighthouse, and profiling tools to achieve sub-second load times."
            />
          </Card>
        </motion.div>
        <motion.div
          className="tech-card"
          whileHover={{
            scale: 1.05,
            rotate: 2,
            boxShadow: "0 15px 35px rgba(129, 236, 255, 0.3)",
            transition: { duration: 0.3 },
          }}
        >
          <Card className={`${cardClassName} span-2`}>
            <CardContent
              icon={
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  <Spotlight size={30} className={iconClassName} />
                </motion.div>
              }
              title="Technical Leadership"
              description="Mentoring junior developers and conducting rigorous code reviews to maintain the highest standards of code quality and security."
            />
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;
