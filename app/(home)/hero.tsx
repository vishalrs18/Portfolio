"use client";
import React from "react";
import { CustomButton } from "../components/atoms/customButton";
import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { motion } from "motion/react";

const Hero = () => {
  const heroTextRef = React.useRef<HTMLDivElement>(null);
  const container = React.useRef<HTMLDivElement>(null);
  const badgeRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Enhanced text animation with split text effect
      gsap.fromTo(
        heroTextRef.current,
        { xPercent: -150, opacity: 0, rotateX: -90 },
        {
          xPercent: 0,
          opacity: 1,
          rotateX: 0,
          delay: 0.5,
          duration: 1.2,
          ease: "power4.out",
        },
      );

      // Profile pic with rotation and scale
      gsap.fromTo(
        "#profile-pic",
        { xPercent: 150, opacity: 0, scale: 0.5, rotate: 45 },
        {
          xPercent: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          delay: 0.5,
          duration: 1.2,
          ease: "back.out(1.4)",
        },
      );

      // Floating animation for badge
      gsap.to(badgeRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Animate availability tag
      gsap.fromTo(
        ".availability-tag",
        { opacity: 0, scale: 0.5, rotate: -180 },
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        },
      );

      // Animate description
      gsap.fromTo(
        ".hero-description",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, delay: 0.8, duration: 0.8, stagger: 0.1 },
      );

      // Animate buttons
      gsap.fromTo(
        ".hero-button",
        { opacity: 0, y: 30, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          delay: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
      );
    },
    { scope: container },
  );

  return (
    <div className="flex gap-16" ref={container}>
      <div className="w-1/2 flex flex-col gap-8">
        <motion.p
          className="availability-tag capitalize text-[#ADAAAB] mb-1 text-lg bg-[#201F21] rounded-3xl px-4 py-1 w-fit"
          whileHover={{ scale: 1.05, backgroundColor: "#2a292b" }}
          transition={{ duration: 0.2 }}
        >
          <span className="w-2 h-2 bg-[#2EFD7C] inline-block rounded-4xl mr-2 shadow-2xl animate-pulse"></span>
          Available for Senior Roles
        </motion.p>
        <h2
          ref={heroTextRef}
          className="text-capitalize text-5xl font-extrabold bg-linear-to-r from-[#FFFFFF] to-[#81ECFF] bg-clip-text text-transparent"
        >
          Crafting High-Performance Digital Experiences
        </h2>
        <p className="hero-description text-[#ADAAAB] text-lg">
          Vishal Selvan — Senior React.js Developer specializing in building
          scalable, secure, and architecturally sound web applications. Bridging
          the gap between complex engineering and elegant user interfaces.
        </p>
        <div className="flex gap-2">
          <motion.div
            className="hero-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CustomButton text="View Projects"></CustomButton>
          </motion.div>
          <motion.div
            className="hero-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CustomButton
              text="Get In Touch"
              className="btn-secondary"
            ></CustomButton>
          </motion.div>
        </div>
      </div>
      <div
        id="profile-pic"
        className="w-1/2 flex items-center justify-center relative"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Image
            src={"/profile.png"}
            alt="Profile Image"
            width={300}
            height={300}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
        <div
          ref={badgeRef}
          className="absolute bottom-0 right-10 px-4 py-2 flex items-center gap-4 rounded-2xl p-6 text-white
            bg-white/5 backdrop-blur-xl
            border border-white/10
            shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]"
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center justify-center
            w-10 h-10 rounded-sm
            bg-linear-to-br from-green-400 to-green-600
            shadow-[0_6px_16px_rgba(34,197,94,0.5),inset_0_1px_2px_rgba(255,255,255,0.25)]"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <BadgeCheck fill="#2EFD7C" stroke="#fff" />
            </motion.div>
            <div className="flex flex-col gap-2 text-[#ADAAAB]">
              <p className="text-sm">Verified Expert</p>
              <p className="font-manrope font-bold text-base text-white">
                AWS Certified Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
