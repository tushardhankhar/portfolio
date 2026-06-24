import Navbar from "@/components/layout/Navbar";
import FloatingDock from "@/components/layout/FloatingDock";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import GrainOverlay from "@/components/ui/GrainOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import ChatWidget from "@/components/ui/ChatWidget";
import {
  getAbout,
  getExperiences,
  getProjects,
  getSiteSettings,
  getSkills,
} from "@/lib/sanity-fetch";
import { getGitHubData, githubUsernameFrom } from "@/lib/github";

export default async function Home() {
  const [projects, experiences, about, siteSettings, skills] = await Promise.all([
    getProjects(),
    getExperiences(),
    getAbout(),
    getSiteSettings(),
    getSkills(),
  ]);

  const github = await getGitHubData(githubUsernameFrom(siteSettings.githubUrl));

  return (
    <>
      <ScrollProgress />
      <GrainOverlay />
      <CustomCursor />
      <Navbar />

      <main>
        <HeroSection id="hero" siteSettings={siteSettings} />
        <AboutSection id="about" about={about} github={github} />
        <ExperienceSection
          id="experience"
          experiences={experiences}
          resumeUrl={siteSettings.resumeUrl}
        />
        <SkillsSection id="skills" skills={skills} />
        <ProjectsSection id="work" projects={projects} />
        <ContactSection id="contact" siteSettings={siteSettings} about={about} />
      </main>

      <FloatingDock />
      <ChatWidget name={siteSettings.name} />

      {/* Footer */}
      <footer
        className="section-luxe !py-14"
        style={{ borderTop: "1px solid var(--line)", background: "var(--ink)" }}
      >
        <div className="container-luxe flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-sm text-faint"
            style={{ fontFamily: "var(--font-raleway)" }}
          >
            © {new Date().getFullYear()}{" "}
            <span
              className="text-soft"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {siteSettings.name}
            </span>
          </p>
          <p
            className="text-xs text-faint tracking-wide"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            Designed &amp; built with Next.js · Three.js · Sanity
          </p>
        </div>
      </footer>
    </>
  );
}
