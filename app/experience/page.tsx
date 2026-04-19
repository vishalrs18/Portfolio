"use client";

import Card from "../components/molecules/card";
import Chip from "../components/atoms/chip";
import { Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import Badge from "./badge";
import Image from "next/image";
import { motion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cardClassName =
  "bg-[#262627]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6";

const techStackData = {
  senior: ["React.js", "AWS SDK", "TypeScript", "Node.js", "D3.js"],
  software: ["Next.js", "Redux Toolkit", "Tailwind CSS", "Jest"],
};

const Experience = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const timeline1Ref = useRef<HTMLDivElement>(null);
  const timeline2Ref = useRef<HTMLDivElement>(null);
  const credentialsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Hero animations
    const heroSubtitle = heroRef.current?.querySelector(".hero-subtitle");
    if (heroSubtitle) {
      gsap.from(heroSubtitle, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });
    }

    const heroTitle = heroRef.current?.querySelector(".hero-title");
    if (heroTitle) {
      gsap.from(heroTitle, {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
    }

    const heroDescription = heroRef.current?.querySelector(".hero-description");
    if (heroDescription) {
      gsap.from(heroDescription, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
      });
    }

    // Stats cards animation
    const statsChildren = statsRef.current?.children;
    if (statsChildren) {
      gsap.from(statsChildren, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.6,
        ease: "back.out(1.7)",
      });
    }

    // Timeline 1 scroll trigger
    if (timeline1Ref.current) {
      gsap.from(timeline1Ref.current, {
        scrollTrigger: {
          trigger: timeline1Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Timeline 2 scroll trigger
    if (timeline2Ref.current) {
      gsap.from(timeline2Ref.current, {
        scrollTrigger: {
          trigger: timeline2Ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out",
      });
    }

    // Credentials scroll trigger
    const credentialCards =
      credentialsRef.current?.querySelectorAll(".credential-card");
    if (credentialCards) {
      gsap.from(credentialCards, {
        scrollTrigger: {
          trigger: credentialsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }
  }, []);

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
      },
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div ref={heroRef} className="flex justify-between items-start mb-16">
        <div className="flex flex-col gap-4 w-[60%]">
          <p className="hero-subtitle text-[#2EFD7C] uppercase text-sm tracking-widest">
            Professional Timeline
          </p>
          <h1 className="hero-title text-8xl font-extrabold font-manrope text-white">
            <span className="text-app-theme">Scalable</span>
          </h1>
          <p className="hero-description secondary-text mt-4 max-w-md">
            A chronicle of my journey at LTIMindtree, where I bridge the gap
            between complex cloud infrastructure and high-performance frontend
            interfaces.
          </p>
        </div>
        <div ref={statsRef} className="flex gap-4">
          <Card className={`${cardClassName} text-center min-w-30`}>
            <p className="text-3xl font-bold text-[#2EFD7C]">3.10+</p>
            <p className="text-xs text-[#ADAAAB] uppercase mt-1">Years Exp</p>
          </Card>
          <Card className={`${cardClassName} text-center min-w-30`}>
            <p className="text-3xl font-bold text-white">4</p>
            <p className="text-xs text-[#ADAAAB] uppercase mt-1">Deployments</p>
          </Card>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="relative space-y-12">
        {/* Senior Software Engineer */}
        <div
          ref={timeline1Ref}
          className="grid grid-cols-12 gap-6 items-stretch"
        >
          <motion.div
            className="col-span-5"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className={`${cardClassName} h-full flex flex-col`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold font-manrope">
                    Senior Software Engineer
                  </h3>
                  <p className="text-app-theme text-sm mt-1">LTIMindtree</p>
                </div>
                <span className="text-xs text-[#ADAAAB] uppercase">
                  2025 - Present
                </span>
              </div>
              <p className="text-sm text-[#ADAAAB] mb-4">
                Spearheading critical cloud infrastructure visualization tools
                and internal governance platforms. Focused on driving efficiency
                through adaptive cost analysis and high-performance UI
                architecture.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {techStackData.senior.map((tech, i) => (
                  <motion.div
                    key={tech}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={chipVariants}
                  >
                    <Chip
                      icon={null}
                      chipText={tech}
                      className="bg-black/40 text-xs px-3 py-1 rounded-full border border-white/10"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="border-l-2 border-[#2EFD7C] pl-4 py-2 mt-auto"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-[#2EFD7C] text-xs uppercase font-semibold mb-1">
                  Project: Cloud Cost Optimizer
                </p>
                <p className="text-xs text-[#ADAAAB] mb-2">
                  Developed an adaptive orchestration layer for multi-cloud cost
                  allocation and resource profiling.
                </p>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className="text-3xl font-bold text-[#2EFD7C]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.7,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    40%
                  </motion.span>
                  <span className="text-xs text-[#ADAAAB]">
                    Reduction in manual resource analysis
                  </span>
                </div>
              </motion.div>
            </Card>
          </motion.div>
          <motion.div
            className="col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
          >
            <div className="relative rounded-2xl h-full min-h-112.5 border border-white/5 overflow-hidden bg-black">
              <Image
                src="/exp1.png"
                alt="Cloud Cost Optimizer Dashboard"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Software Engineer */}
        <div
          ref={timeline2Ref}
          className="grid grid-cols-12 gap-6 items-stretch"
        >
          <motion.div
            className="col-span-7"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={imageVariants}
          >
            <div className="relative rounded-2xl h-full min-h-112.5 border border-white/5 overflow-hidden bg-black">
              <Image
                src="/exp2.png"
                alt="Policy Compliance Dashboard"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="col-span-5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Card className={`${cardClassName} h-full flex flex-col`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold font-manrope">
                    Software Engineer
                  </h3>
                  <p className="text-app-theme text-sm mt-1">LTIMindtree</p>
                </div>
                <span className="text-xs text-[#ADAAAB] uppercase">
                  2024 - 2025
                </span>
              </div>
              <p className="text-sm text-[#ADAAAB] mb-4">
                Focused on building resilient frontend ecosystems and optimizing
                rendering pipelines for data-heavy enterprise applications.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {techStackData.software.map((tech, i) => (
                  <motion.div
                    key={tech}
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={chipVariants}
                  >
                    <Chip
                      icon={null}
                      chipText={tech}
                      className="bg-black/40 text-xs px-3 py-1 rounded-full border border-white/10"
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                className="border-l-2 border-app-theme pl-4 py-2 mt-auto"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-app-theme text-xs uppercase font-semibold mb-1">
                  Project: Policy Compliance Dashboard
                </p>
                <p className="text-xs text-[#ADAAAB] mb-2">
                  Architected a real-time compliance monitoring tool processing
                  thousands of security events.
                </p>
                <div className="flex items-baseline gap-2">
                  <motion.span
                    className="text-3xl font-bold text-app-theme"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.7,
                      duration: 0.5,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    30%
                  </motion.span>
                  <span className="text-xs text-[#ADAAAB]">
                    Improvement in dashboard data rendering speed
                  </span>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Credentials Section */}
      <div ref={credentialsRef} className="mt-24">
        <motion.h2
          className="text-4xl font-bold text-app-theme mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Credentials
        </motion.h2>
        <div className="grid grid-cols-3 gap-6">
          <motion.div
            className="credential-card"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className={cardClassName}>
              <Award size={32} className="stroke-app-theme mb-4" />
              <h3 className="text-xl font-bold font-manrope mb-2">
                AWS Certified Solutions Architect
              </h3>
              <p className="text-xs text-[#ADAAAB] mb-6">
                Professional validation of expertise in designing distributed
                applications and systems on AWS.
              </p>
              <Badge dataShareBadgeId="99f3ef4f-3087-4066-9c16-607bc59b9114" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#ADAAAB] uppercase">
                  Associate Level
                </span>
                <Link
                  href={
                    "https://www.credly.com/badges/44d448b5-7e7d-4b91-96d7-866bdba98777/public_url"
                  }
                >
                  <ArrowRight size={16} className="stroke-app-theme" />
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="credential-card"
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <Card className={cardClassName}>
              <Award size={32} className="stroke-[#2EFD7C] mb-4" />
              <h3 className="text-xl font-bold font-manrope mb-2">
                AWS Certified Cloud Practitioner
              </h3>
              <p className="text-xs text-[#ADAAAB] mb-6">
                Comprehensive knowledge of cloud concepts, security, and core
                AWS services.
              </p>
              <Badge dataShareBadgeId="44d448b5-7e7d-4b91-96d7-866bdba98777" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#ADAAAB] uppercase">
                  Foundational
                </span>
                <Link
                  href="https://www.credly.com/users/vishal-r-s.56b06641/badges#credly"
                  target="_blank"
                >
                  <ArrowRight size={16} className="stroke-[#2EFD7C]" />
                </Link>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="credential-card"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <Card
              className={`${cardClassName} flex flex-col justify-center items-center`}
            >
              <p className="text-sm text-[#ADAAAB] mb-4 text-center">
                Check out my verified badges and specialized skills on Credly.
              </p>
              <Link
                href={
                  "https://www.credly.com/badges/99f3ef4f-3087-4066-9c16-607bc59b9114/public_url"
                }
                target="_blank"
              >
                <motion.button
                  className="bg-app-theme text-primary-btn font-manrope text-sm rounded-lg font-bold px-8 py-3 transition-colors"
                  whileHover={{ scale: 1.05, backgroundColor: "#6dd9eb" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Go to Profile
                </motion.button>
              </Link>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
