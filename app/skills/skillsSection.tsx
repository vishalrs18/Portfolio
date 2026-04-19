"use client";
import React, { useEffect, useRef } from "react";
import Card from "../components/molecules/card";
import { Layers2, Code2, Cloud, Workflow } from "lucide-react";
import Chip from "../components/atoms/chip";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardClassName =
  "bg-[#262627]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6";

const SkillBar = ({
  skill,
  level,
  percentage,
}: {
  skill: string;
  level?: string;
  percentage: number;
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(barRef, { once: true, margin: "-50px" });

  return (
    <div ref={barRef} className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold">{skill}</span>
        <div className="flex gap-2 items-center">
          {level && (
            <span className="text-xs text-[#2EFD7C] uppercase">{level}</span>
          )}
          <span className="text-sm text-[#ADAAAB]">{percentage}%</span>
        </div>
      </div>
      <div className="w-full h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-app-theme rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".skill-card");
    if (cards) {
      cards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -50 : 50;
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: direction,
            rotateZ: index % 2 === 0 ? -5 : 5,
            scale: 0.9,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            x: 0,
            rotateZ: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "power3.out",
          },
        );
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-12 gap-6 mt-6">
      {/* Frontend Frameworks */}
      <motion.div
        className="skill-card col-span-8 row-span-1"
        whileHover={{
          y: -8,
          boxShadow: "0 25px 50px rgba(129, 236, 255, 0.4)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <div className="flex justify-between mb-6">
            <div className="flex flex-col gap-1">
              <h2 className="card-header">Frontend Frameworks</h2>
              <p className="secondary-text mt-2">
                Crafting immersive digital experiences.
              </p>
            </div>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Layers2 size={20} className="stroke-app-theme" />
            </motion.div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-6">
            <SkillBar skill="React.js" level="Senior Level" percentage={95} />
            <SkillBar skill="Redux / State Mgmt" level="" percentage={95} />
            <SkillBar skill="Next.js" level="" percentage={96} />
            <SkillBar skill="Tailwind CSS" level="Expert" percentage={98} />
          </div>
        </Card>
      </motion.div>

      {/* Languages */}
      <motion.div
        className="skill-card col-span-4 row-span-1"
        whileHover={{
          y: -8,
          rotate: 2,
          boxShadow: "0 25px 50px rgba(129, 236, 255, 0.4)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <div className="flex justify-between mb-6">
            <h2 className="card-header">Languages</h2>
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Code2 size={20} className="stroke-app-theme" />
            </motion.div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              {
                src: "https://cdn.worldvectorlogo.com/logos/javascript.svg",
                alt: "JavaScript",
                text: "JAVASCRIPT (ES6+)",
              },
              {
                src: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
                alt: "TypeScript",
                text: "TYPESCRIPT",
              },
              {
                src: "https://cdn.worldvectorlogo.com/logos/html-1.svg",
                alt: "HTML5",
                text: "HTML5",
              },
              {
                src: "https://cdn.worldvectorlogo.com/logos/css-3.svg",
                alt: "CSS3",
                text: "SCSS",
              },
              {
                src: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
                alt: "Node.js",
                text: "NODE.JS",
              },
            ].map((chip, index) => (
              <motion.div
                key={chip.text}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Chip
                  icon={
                    <Image
                      src={chip.src}
                      alt={chip.alt}
                      width={14}
                      height={14}
                    />
                  }
                  chipText={chip.text}
                />
              </motion.div>
            ))}
          </div>
          <p className="text-xs italic text-[#ADAAAB] mt-auto">
            &quot;Clean code is not written, it&apos;s architected.&quot;
          </p>
        </Card>
      </motion.div>

      {/* AWS Ecosystem */}
      <motion.div
        className="skill-card col-span-6 row-span-1"
        whileHover={{
          y: -8,
          rotate: -2,
          boxShadow: "0 25px 50px rgba(129, 236, 255, 0.4)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <div className="flex gap-2 items-center mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Cloud size={20} className="stroke-app-theme" />
            </motion.div>
            <h2 className="card-header">AWS Ecosystem</h2>
          </div>
          <ul className="space-y-3">
            {[
              "Lambda & Serverless Architecture",
              "S3 & CloudFront Distribution",
              "EC2 & VPC Networking",
              "DynamoDB & RDS Integration",
            ].map((item, index) => (
              <motion.li
                key={item}
                className="flex items-center gap-2 text-sm"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ x: 10 }}
              >
                <span className="text-[#2EFD7C]">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
      {/* Tools & Pipeline */}
      <motion.div
        className="skill-card col-span-6 row-span-1"
        whileHover={{
          y: -8,
          rotate: 2,
          boxShadow: "0 25px 50px rgba(46, 253, 124, 0.4)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <div className="flex gap-2 items-center mb-6">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <Workflow size={20} className="stroke-[#2EFD7C]" />
            </motion.div>
            <h2 className="card-header">Tools & Pipeline</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Containerization", text: "Docker & K8s" },
              { title: "Bundling", text: "Webpack / Vite" },
              { title: "Version Control", text: "Git & GitHub Actions" },
              { title: "Testing", text: "Jest / Cypress" },
            ].map((tool, index) => (
              <motion.div
                key={tool.title}
                className="bg-[#201F21] p-3 rounded-md"
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 150,
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 3,
                  backgroundColor: "#2a292b",
                }}
              >
                <p className="text-xs text-[#ADAAAB] uppercase mb-2">
                  {tool.title}
                </p>
                <p className="text-sm font-semibold">{tool.text}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Architectural Philosophy */}
      <motion.div
        className="skill-card col-span-12 row-span-1"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        whileHover={{
          y: -8,
          boxShadow: "0 25px 50px rgba(129, 236, 255, 0.4)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h2 className="card-header mb-3">Architectural Philosophy</h2>
              <p className="text-sm text-[#ADAAAB] max-w-3xl">
                I don&apos;t just write features; I build sustainable systems.
                By focusing on modularity and rigorous type safety, I ensure
                long-term maintainability for enterprise-scale applications.
              </p>
            </div>
            <div className="flex gap-12 items-center">
              <motion.div
                className="text-right"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="text-5xl font-bold text-[#2EFD7C]"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  30%
                </motion.p>
                <p className="text-xs text-[#ADAAAB] uppercase mt-1">
                  Perf Boost
                </p>
              </motion.div>
              <motion.div
                className="text-right"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.p
                  className="text-5xl font-bold text-white"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  100%
                </motion.p>
                <p className="text-xs text-[#ADAAAB] uppercase mt-1">
                  Type Coverage
                </p>
              </motion.div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Ecosystem */}
      <motion.div
        className="col-span-12 py-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-5xl font-bold mb-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Collaborative <span className="text-app-theme">Ecosystem</span>.
        </motion.h2>
        <div className="grid grid-cols-4 gap-8">
          {[
            {
              title: "Design",
              text: "Figma, Adobe XD, Design Systems, Atomic Design",
            },
            { title: "Agile", text: "Scrum, Kanban, Jira, Documentation" },
            { title: "Testing", text: "TDD, Unit Testing, E2E, Automation" },
            { title: "API", text: "GraphQL, REST, Swagger, Postman" },
          ].map((eco, index) => (
            <motion.div
              key={eco.title}
              initial={{ opacity: 0, y: 30, rotateX: -30 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              whileHover={{
                y: -5,
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <h4 className="text-sm font-semibold">{eco.title}</h4>
              <p className="text-xs text-[#ADAAAB] uppercase mb-4">
                {eco.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
