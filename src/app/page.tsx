import Navbar from "@/components/layout/Navbar";
import FloatingDock from "@/components/layout/FloatingDock";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection id="hero" />
        <AboutSection id="about" />
        <ExperienceSection id="experience" />
        <ProjectsSection id="work" />
        <ContactSection id="contact" />
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
            Tushar Dhankhar
          </span>{" "}
          · Built with Next.js 15 &amp; Tailwind CSS
        </p>
      </footer>
    </>
  );
}
