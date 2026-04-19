"use client";
import React, { startTransition, useEffect, useRef, useState } from "react";
import FormLabel from "../components/atoms/formLabel";
import WrappedInput from "../components/atoms/formInput";
import { CustomButton } from "../components/atoms/customButton";
import Form from "../components/organisms/form";
import { Mail, MapPin, ExternalLink } from "lucide-react";
import Card from "../components/molecules/card";
import { showToast } from "../components/atoms/toast";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Memoized button component to prevent flickering - defined OUTSIDE Contact component
const SubmitButton = React.memo(
  ({ isSubmitting }: { isSubmitting: boolean }) => {
    return (
      <CustomButton
        className="btn-primary w-full col-span-2"
        type="submit"
        text={isSubmitting ? "Sending..." : "Send Message"}
        disabled={isSubmitting}
      />
    );
  },
);

SubmitButton.displayName = "SubmitButton";

const Contact = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [errorFields, setErrorFields] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Hero animations with wave effect
    const heroElements = heroRef.current?.querySelectorAll(".hero-element");
    if (heroElements) {
      gsap.fromTo(
        heroElements,
        { opacity: 0, y: 80, rotateX: -45 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    }

    // Form fields animation with cascade
    const formFields = formRef.current?.querySelectorAll(".form-field");
    if (formFields) {
      gsap.fromTo(
        formFields,
        { opacity: 0, x: -50, rotateY: -30 },
        {
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
        },
      );
    }

    // Sidebar cards with flip effect
    const sidebarCards = sidebarRef.current?.querySelectorAll(".sidebar-card");
    if (sidebarCards) {
      gsap.fromTo(
        sidebarCards,
        { opacity: 0, x: 100, rotateY: 90 },
        {
          scrollTrigger: {
            trigger: sidebarRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
      );
    }
  }, []);

  const defaultState = {
    name: "",
    email: "",
    subject: "",
    yourProject: "",
  };
  const handleFormSubmit = async (
    prevState: Record<string, unknown>,
    formData: { type: string; payload: string } | FormData,
  ): Promise<Record<string, unknown>> => {
    if (!(formData instanceof FormData)) {
      if (formData.type !== undefined) {
        if (errorFields[formData.type]) {
          setErrorFields((prev) => {
            const updatedErrors = { ...prev };
            delete updatedErrors[formData.type];
            return updatedErrors;
          });
        }
        return {
          ...prevState,
          [formData.type]: formData.payload,
        };
      }
    }

    // Only set isSubmitting when actually submitting the form
    setIsSubmitting(true);

    try {
      const result = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData as FormData)),
      });

      const data = await result.json();

      if (data.success) {
        showToast({
          message: "Thank you for reaching out! I'll get back to you soon.",
          type: "success",
          closeable: true,
        });
        setIsSubmitting(false);
        return {
          ...defaultState,
        };
      } else {
        const { field, message } = JSON.parse(data.message);
        setErrorFields((prev) => ({ ...prev, [field]: message }));
        showToast({
          message: message || "Failed to submit form. Please try again.",
          type: "error",
          closeable: true,
        });
        setIsSubmitting(false);
        return prevState;
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast({
        message: "An error occurred. Please try again later.",
        type: "error",
        closeable: true,
      });
      setIsSubmitting(false);
      return prevState;
    }
  };

  const cardClassName =
    "bg-[#262627]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] rounded-2xl p-6";

  const getInputClassName = (fieldName: string) => {
    const baseClass =
      "w-full mt-1 text-lg leading-15 border-b border-[#484849] focus:outline-none focus:border-app-theme placeholder:text-[#484849] bg-transparent text-white";
    const errorClass = errorFields[fieldName]
      ? " border-red-500 focus:border-red-500"
      : "";
    return baseClass + errorClass;
  };

  const getTextareaClassName = (fieldName: string) => {
    const baseClass =
      "w-full mt-1 text-lg leading-6 border-b border-[#484849] focus:outline-none focus:border-app-theme placeholder:text-[#484849] bg-transparent text-white resize-none";
    const errorClass = errorFields[fieldName]
      ? " border-red-500 focus:border-red-500"
      : "";
    return baseClass + errorClass;
  };

  return (
    <div className="w-full">
      <div
        ref={heroRef}
        className="flex flex-col w-1/2 gap-4 justify-between items-start mb-12"
      >
        <motion.p
          className="hero-element text-[#2EFD7C] uppercase text-sm tracking-widest"
          whileHover={{ scale: 1.05, x: 10 }}
          transition={{ duration: 0.3 }}
        >
          Availability: Open for new opportunities
        </motion.p>
        <h1 className="hero-element text-8xl font-extrabold font-manrope text-white">
          Let&apos;s build something{" "}
          <span className="text-app-theme">Extraordinary.</span>
        </h1>
        <p className="hero-element secondary-text">
          Based in the digital ether, crafting high-performance architectures
          for the next generation of web applications.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <motion.div
          ref={formRef}
          className="col-span-7 bg-[#262627]/40 p-10 rounded-2xl border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{
            boxShadow: "0 20px 50px rgba(129, 236, 255, 0.2)",
            transition: { duration: 0.3 },
          }}
        >
          <Form initialState={defaultState} reducerAction={handleFormSubmit}>
            {({
              state,
              isPending,
              formAction,
            }: {
              state: {
                success?: boolean;
                message?: string;
                name?: string;
                email?: string;
                subject?: string;
                yourProject?: string;
              };
              isPending: boolean;
              formAction: (
                action: { type: string; payload: string } | FormData,
              ) => void;
            }) => {
              //   console.log(state, isPending, "__s in parent");
              return (
                <div className="grid grid-cols-2 gap-x-5 gap-y-8">
                  <motion.div
                    className="form-field"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormLabel
                      htmlFor="name"
                      labelText="Name"
                      className="text-sm text-[#ADAAAB] uppercase mb-2 tracking-wider"
                    />
                    <WrappedInput
                      type="text"
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      required
                      wrapperClassName="w-full"
                      value={state.name || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        startTransition(() => {
                          formAction({ type: "name", payload: value });
                        });
                      }}
                      className={getInputClassName("name")}
                    />
                  </motion.div>
                  <motion.div
                    className="form-field"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormLabel
                      htmlFor="email"
                      labelText="Email"
                      className="text-sm text-[#ADAAAB] uppercase mb-2 tracking-wider"
                    />
                    <WrappedInput
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john.doe@example.com"
                      required
                      wrapperClassName="w-full"
                      value={state.email || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        startTransition(() => {
                          formAction({ type: "email", payload: value });
                        });
                      }}
                      className={getInputClassName("email")}
                    />
                  </motion.div>
                  <motion.div
                    className="form-field col-span-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormLabel
                      htmlFor="subject"
                      labelText="Subject"
                      className="text-sm text-[#ADAAAB] uppercase mb-2 tracking-wider"
                    />
                    <WrappedInput
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="Project Inquiry"
                      required
                      wrapperClassName="w-full"
                      value={state.subject || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = e.target.value;
                        startTransition(() => {
                          formAction({ type: "subject", payload: value });
                        });
                      }}
                      className={getInputClassName("subject")}
                    />
                  </motion.div>
                  <motion.div
                    className="form-field col-span-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormLabel
                      htmlFor="yourProject"
                      labelText="Tell me about your project"
                      className="text-sm text-[#ADAAAB] uppercase mb-2 tracking-wider"
                    />
                    <textarea
                      rows={4}
                      id="yourProject"
                      name="yourProject"
                      placeholder="Share your vision, requirements, or any details about your project here..."
                      required
                      value={state.yourProject || ""}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const value = e.target.value;
                        startTransition(() => {
                          formAction({ type: "yourProject", payload: value });
                        });
                      }}
                      className={getTextareaClassName("yourProject")}
                    />
                  </motion.div>
                  {/* <div className="form-field col-span-2"> */}
                  <SubmitButton isSubmitting={isSubmitting} />
                  {/* </div> */}
                </div>
              );
            }}
          </Form>
        </motion.div>
        <div ref={sidebarRef} className="col-span-5 flex flex-col gap-6">
          {/* Contact Info Card */}
          <motion.div
            className="sidebar-card"
            whileHover={{
              y: -8,
              rotate: 2,
              boxShadow: "0 20px 40px rgba(129, 236, 255, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <Card className={cardClassName}>
              <h3 className="text-xl font-bold text-white mb-6 font-manrope">
                Contact Information
              </h3>
              <div className="space-y-4">
                <motion.div
                  className="flex items-start gap-3"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="w-5 h-5 text-app-theme mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-[#ADAAAB] uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:selvanvishal@gmail.com"
                      className="text-white hover:text-app-theme transition-colors"
                    >
                      selvanvishal@gmail.com
                    </a>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-start gap-3"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-5 h-5 text-app-theme mt-1 shrink-0" />
                  <div>
                    <p className="text-xs text-[#ADAAAB] uppercase tracking-wider mb-1">
                      Location
                    </p>
                    <p className="text-white">Remote / Flexible</p>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>

          {/* Social Links Card */}
          <motion.div
            className="sidebar-card"
            whileHover={{
              y: -8,
              rotate: -2,
              boxShadow: "0 20px 40px rgba(129, 236, 255, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <Card className={cardClassName}>
              <h3 className="text-xl font-bold text-white mb-6 font-manrope">
                Connect Online
              </h3>
              <div className="space-y-3">
                <motion.a
                  href="https://github.com/vishal-rs18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ExternalLink className="w-5 h-5 text-[#ADAAAB] group-hover:text-app-theme transition-colors" />
                  </motion.div>
                  <span className="text-white group-hover:text-app-theme transition-colors">
                    GitHub
                  </span>
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/vishal-selvan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  whileHover={{
                    x: 10,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <ExternalLink className="w-5 h-5 text-[#ADAAAB] group-hover:text-app-theme transition-colors" />
                  </motion.div>
                  <span className="text-white group-hover:text-app-theme transition-colors">
                    LinkedIn
                  </span>
                </motion.a>
              </div>
            </Card>
          </motion.div>

          {/* Response Time Card */}
          <motion.div
            className="sidebar-card"
            whileHover={{
              y: -8,
              scale: 1.03,
              boxShadow: "0 20px 40px rgba(46, 253, 124, 0.3)",
              transition: { duration: 0.3 },
            }}
          >
            <Card className={cardClassName}>
              <h3 className="text-xl font-bold text-white mb-4 font-manrope">
                Response Time
              </h3>
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 bg-[#2EFD7C] rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <p className="text-[#ADAAAB]">
                  Typically responds within{" "}
                  <span className="text-white font-semibold">24 hours</span>
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
