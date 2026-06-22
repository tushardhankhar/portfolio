import Navbar from "@/components/layout/Navbar";
import FloatingDock from "@/components/layout/FloatingDock";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import {
  getAbout,
  getExperiences,
  getProjects,
  getSiteSettings,
} from "@/lib/sanity-fetch";

export default async function Home() {
  const [projects, experiences, about, siteSettings] = await Promise.all([
    getProjects(),
    getExperiences(),
    getAbout(),
    getSiteSettings(),
  ]);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection id="hero" siteSettings={siteSettings} />
        <AboutSection id="about" about={about} />
        <ExperienceSection
          id="experience"
          experiences={experiences}
          resumeUrl={siteSettings.resumeUrl}
        />
        <ProjectsSection id="work" projects={projects} />
        <ContactSection id="contact" siteSettings={siteSettings} about={about} />
      </main>
      <FloatingDock />

      {/* Footer */}
      <footer
        className="border-t py-8 text-center"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background: "#0d1017",
        }}
      >
        <p
          className="text-sm text-white/30"
          style={{ fontFamily: "var(--font-raleway)" }}
        >
          Designed &amp; built by{" "}
          <span
            className="font-semibold"
            style={{ color: "#B190C1", fontFamily: "var(--font-poppins)" }}
          >
            {siteSettings.name}
          </span>{" "}
          · Built with Next.js 15 &amp; Tailwind CSS
        </p>
      </footer>
    </>
  );
}
