"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Code2,
  Link,
  AtSign,
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
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
    { label: "GitHub", href: siteSettings.githubUrl, icon: Code2 },
    { label: "LinkedIn", href: siteSettings.linkedinUrl, icon: Link },
    { label: "Twitter", href: siteSettings.twitterUrl, icon: AtSign },
    { label: "Email", href: `mailto:${siteSettings.email}`, icon: Mail },
  ];

  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

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

  // shared underline-input classes
  const fieldBase =
    "w-full bg-transparent pb-3 pt-2 text-[1.05rem] text-[#faf8f4] placeholder:text-[var(--text-faint)] outline-none transition-colors duration-300 border-b";

  return (
    <section id={id} className="section-luxe" style={{ background: "var(--ink)" }}>
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Contact"
          index="06"
          title={
            <>
              Let&apos;s build <span className="gradient-gold">something</span>
            </>
          }
          intro="Have a project, a role, or just an idea worth talking through? My inbox is open and I usually reply within a day."
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          {/* FORM — underline-style fields */}
          <Reveal delay={0.05}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-9"
            >
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="eyebrow"
                  style={{ color: "var(--text-faint)" }}
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  {...register("name")}
                  className={cn(
                    fieldBase,
                    errors.name
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-[var(--line)] focus:border-[var(--gold)]"
                  )}
                  style={{ fontFamily: "var(--font-raleway)" }}
                />
                {errors.name && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="eyebrow"
                  style={{ color: "var(--text-faint)" }}
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={cn(
                    fieldBase,
                    errors.email
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-[var(--line)] focus:border-[var(--gold)]"
                  )}
                  style={{ fontFamily: "var(--font-raleway)" }}
                />
                {errors.email && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="message"
                  className="eyebrow"
                  style={{ color: "var(--text-faint)" }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell me about your project, idea, or just say hi…"
                  {...register("message")}
                  className={cn(
                    fieldBase,
                    "resize-none",
                    errors.message
                      ? "border-red-500/60 focus:border-red-500"
                      : "border-[var(--line)] focus:border-[var(--gold)]"
                  )}
                  style={{ fontFamily: "var(--font-raleway)" }}
                />
                {errors.message && (
                  <p
                    className="text-xs text-red-400"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={
                    submitState === "loading" || submitState === "success"
                  }
                  className={cn(
                    "btn",
                    submitState === "success"
                      ? "border border-green-500/40 bg-green-500/15 text-green-300"
                      : submitState === "error"
                        ? "border border-red-500/40 bg-red-500/15 text-red-300"
                        : "btn-primary",
                    (submitState === "loading" || submitState === "success") &&
                      "cursor-not-allowed",
                    submitState === "loading" && "opacity-70"
                  )}
                >
                  {submitState === "loading" && (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Sending…
                    </>
                  )}
                  {submitState === "success" && (
                    <>
                      <CheckCircle size={16} />
                      Message sent
                    </>
                  )}
                  {submitState === "error" && (
                    <>
                      <AlertCircle size={16} />
                      Try again
                    </>
                  )}
                  {submitState === "idle" && (
                    <>
                      <Send size={16} />
                      Send message
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>

          {/* SIDE — availability + socials as text links */}
          <Reveal delay={0.15} className="flex flex-col gap-10 lg:pt-2">
            {/* availability badge */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full animate-dot-pulse"
                  style={{ background: "var(--gold)" }}
                />
                <span
                  className="text-soft text-sm"
                  style={{ fontFamily: "var(--font-poppins)" }}
                >
                  {siteSettings.availabilityStatus}
                </span>
              </div>
              <div className="hairline" />
            </div>

            {/* direct email */}
            <div className="flex flex-col gap-2">
              <span
                className="eyebrow"
                style={{ color: "var(--text-faint)" }}
              >
                Email
              </span>
              <a
                href={`mailto:${siteSettings.email}`}
                className="text-[1.05rem] text-soft transition-colors hover:text-[var(--gold)]"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                {siteSettings.email}
              </a>
              <span
                className="text-faint text-xs"
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                {about.location} · IST (UTC+5:30)
              </span>
            </div>

            {/* socials as text links */}
            <div className="flex flex-col gap-3">
              <span
                className="eyebrow"
                style={{ color: "var(--text-faint)" }}
              >
                Elsewhere
              </span>
              <div className="flex flex-col">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.label !== "Email" ? "_blank" : undefined}
                      rel={
                        social.label !== "Email"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="group flex items-center gap-3 py-2.5 text-soft transition-colors hover:text-[var(--gold)]"
                      style={{ fontFamily: "var(--font-poppins)" }}
                    >
                      <Icon
                        size={15}
                        className="text-faint transition-colors group-hover:text-[var(--gold)]"
                      />
                      <span className="text-sm">{social.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
