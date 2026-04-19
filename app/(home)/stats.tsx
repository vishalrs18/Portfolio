"use client";
import React, { useEffect, useRef, useState } from "react";
import Card from "../components/molecules/card";
import { Briefcase } from "lucide-react";
import { Spotlight } from "lucide-react";
import { CloudCheck } from "lucide-react";
import { motion, useInView } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HexColor = `#${string}`;

const colorMap: Record<string, string> = {
  "app-theme": "#00D9FF",
  "green-400": "#4ade80",
  "blue-400": "#60a5fa",
};

const AnimatedNumber = ({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <h3 ref={ref} className="font-manrope font-bold text-5xl text-inherit">
      {count}
      {suffix}
    </h3>
  );
};

const CardContent = ({
  title,
  value,
  valueSuffix = "",
  icon,
  className = "",
  color = "",
}: {
  title: string;
  value: string | number;
  valueSuffix?: string;
  icon: React.ReactNode;
  className?: string;
  color?: HexColor | string;
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {icon}
      <AnimatedNumber
        value={typeof value === "string" ? parseInt(value) : value}
        suffix={valueSuffix}
      />
      <p className="text-sm text-[#ADAAAB]">{title}</p>
      <motion.div
        className="w-1/6 h-1 rounded-2xl"
        style={{ backgroundColor: colorMap[color] || color }}
        initial={{ width: 0 }}
        whileInView={{ width: "16.666667%" }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
};

const cardClassName = `bg-[#262627]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6 flex-1`;

const Stats = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".stat-card");
    if (cards) {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 60,
          rotateX: -45,
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
      );
    }
  }, []);

  return (
    <div ref={containerRef} className="flex gap-4 w-full">
      <motion.div
        className="stat-card flex-1"
        whileHover={{
          y: -10,
          boxShadow: "0 20px 40px rgba(0, 217, 255, 0.3)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <CardContent
            title="Years Professional Experience"
            value={100}
            icon={
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <Briefcase size={30} />
              </motion.div>
            }
            valueSuffix="+"
            className={` text-app-theme`}
            color="app-theme"
          />
        </Card>
      </motion.div>
      <motion.div
        className="stat-card flex-1"
        whileHover={{
          y: -10,
          boxShadow: "0 20px 40px rgba(74, 222, 128, 0.3)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <CardContent
            title="Performance Optimization Gain"
            value={200}
            icon={
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <Spotlight size={30} />
              </motion.div>
            }
            valueSuffix="%"
            className={` text-green-400`}
            color="green-400"
          />
        </Card>
      </motion.div>
      <motion.div
        className="stat-card flex-1"
        whileHover={{
          y: -10,
          boxShadow: "0 20px 40px rgba(96, 165, 250, 0.3)",
          transition: { duration: 0.3 },
        }}
      >
        <Card className={cardClassName}>
          <CardContent
            title="AWS Certifications"
            value={300}
            icon={
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
              >
                <CloudCheck size={30} />
              </motion.div>
            }
            className={` text-blue-400`}
            color="blue-400"
          />
        </Card>
      </motion.div>
    </div>
  );
};

export default Stats;
