"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Code2, Link, AtSign, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  fallbackSiteSettings,
  fallbackAbout,
  type SiteSettings,
  type AboutContent,
} from "@/data/fallback";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactSectionProps {
  id?: string;
  siteSettings?: SiteSettings;
  about?: AboutContent;
}

export default function ContactSection({
  id,
  siteSettings = fallbackSiteSettings,
  about = fallbackAbout,
}: ContactSectionProps) {
  const SOCIALS = [
    {
      label: "GitHub",
      href: siteSettings.githubUrl,
      icon: Code2,
      color: "#e8eaf0",
    },
    {
      label: "LinkedIn",
      href: siteSettings.linkedinUrl,
      icon: Link,
      color: "#0CC0DF",
    },
    {
      label: "Twitter",
      href: siteSettings.twitterUrl,
      icon: AtSign,
      color: "#B190C1",
    },
    {
      label: "Email",
      href: `mailto:${siteSettings.email}`,
      icon: Mail,
      color: "#F2DA00",
    },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setSubmitState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send");

      setSubmitState("success");
      reset();
      setTimeout(() => setSubmitState("idle"), 5000);
    } catch {
      setSubmitState("error");
      setTimeout(() => setSubmitState("idle"), 4000);
    }
  };

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0d1017 0%, #0f1320 100%)",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-[0.06] blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, #864797 0%, #0CC0DF 50%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-2"
            style={{ fontFamily: "var(--font-poppins)", color: "#F2DA00" }}
          >
            Get in touch
          </p>
          <h2
            className="section-title mx-auto"
            style={{ display: "inline-block" }}
          >
            Let&apos;s Build Something Great
          </h2>
          <p
            className="mt-4 text-white/50 max-w-xl mx-auto"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            Whether you have a project in mind, a question, or just want to
            connect — my inbox is always open.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Form — 3/5 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-6 lg:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-white/70"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    {...register("name")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200",
                      "bg-white/[0.04] border",
                      errors.name
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/[0.08] focus:border-purple/50 focus:bg-white/[0.06]"
                    )}
                    style={{ fontFamily: "var(--font-raleway)" }}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400" style={{ fontFamily: "var(--font-raleway)" }}>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-white/70"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    {...register("email")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200",
                      "bg-white/[0.04] border",
                      errors.email
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/[0.08] focus:border-purple/50 focus:bg-white/[0.06]"
                    )}
                    style={{ fontFamily: "var(--font-raleway)" }}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400" style={{ fontFamily: "var(--font-raleway)" }}>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-white/70"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    {...register("message")}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg text-sm text-white placeholder:text-white/25 outline-none transition-all duration-200 resize-none",
                      "bg-white/[0.04] border",
                      errors.message
                        ? "border-red-500/60 focus:border-red-500"
                        : "border-white/[0.08] focus:border-purple/50 focus:bg-white/[0.06]"
                    )}
                    style={{ fontFamily: "var(--font-raleway)" }}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400" style={{ fontFamily: "var(--font-raleway)" }}>
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitState === "loading" || submitState === "success"}
                  className={cn(
                    "flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-sm transition-all duration-200",
                    submitState === "success"
                      ? "bg-green-500/20 border border-green-500/40 text-green-400 cursor-not-allowed"
                      : submitState === "error"
                      ? "bg-red-500/20 border border-red-500/40 text-red-400 cursor-pointer"
                      : "btn-primary",
                    submitState === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {submitState === "loading" && (
                    <>
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  )}
                  {submitState === "success" && (
                    <>
                      <CheckCircle size={16} />
                      Message Sent!
                    </>
                  )}
                  {submitState === "error" && (
                    <>
                      <AlertCircle size={16} />
                      Try Again
                    </>
                  )}
                  {submitState === "idle" && (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Info — 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Availability status */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span
                  className="text-sm font-semibold text-white"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  Available for Work
                </span>
              </div>
              <p
                className="text-xs text-white/50 leading-relaxed"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Currently open to full-time roles, contract work, and interesting
                consulting projects. I typically respond within 24 hours.
              </p>
            </div>

            {/* Contact info */}
            <div className="glass-card p-5 flex flex-col gap-4">
              <h4
                className="text-sm font-semibold text-white"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Preferred Contact
              </h4>
              <a
                href={`mailto:${siteSettings.email}`}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-yellow transition-colors"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                <Mail size={15} className="flex-shrink-0" />
                {siteSettings.email}
              </a>
              <p
                className="text-xs text-white/35"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                {about.location} · IST (UTC+5:30)
              </p>
            </div>

            {/* Social links */}
            <div className="glass-card p-5">
              <h4
                className="text-sm font-semibold text-white mb-4"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Find me online
              </h4>
              <div className="flex flex-col gap-2">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.label !== "Email" ? "_blank" : undefined}
                      rel={social.label !== "Email" ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.04] transition-all duration-200 group"
                    >
                      <Icon
                        size={16}
                        className="transition-colors"
                        style={{ color: social.color }}
                      />
                      <span
                        className="text-sm"
                        style={{ fontFamily: "var(--font-poppins)" }}
                      >
                        {social.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
