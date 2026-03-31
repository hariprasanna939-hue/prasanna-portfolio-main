import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import WorkSection from "@/components/WorkSection";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ExpertiseSection from "@/components/ExpertiseSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import SkillsShowcase from "@/components/SkillsShowcase";
import CinematicGallery from "@/components/CinematicGallery";

// ─── Phase flow: "intro" → "skills" → "landing" ───────────────────────────────
type Phase = "intro" | "skills" | "landing";

const SKILLS_DURATION_MS = 12_000; // matches the scroll animation duration

const Index = () => {
  const [phase, setPhase] = useState<Phase>("intro");

  // Called when IntroAnimation finishes → start skills phase
  const handleIntroComplete = useCallback(() => setPhase("skills"), []);

  // After SKILLS_DURATION_MS, move to the landing page
  useEffect(() => {
    if (phase !== "skills") return;
    const timer = setTimeout(() => setPhase("landing"), SKILLS_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase]);

  return (
    <>
      {/* ── Phase 1: Cinematic name intro ── */}
      {phase === "intro" && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}

      {/* ── Phase 2: Skills Showcase — fullscreen 12 s ── */}
      <AnimatePresence>
        {phase === "skills" && (
          <motion.div
            key="skills-overlay"
            className="fixed inset-0 z-[9998]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <SkillsShowcase fullscreen />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Phase 3: Main landing page — fades in after skills exit ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "landing" ? 1 : 0 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        style={{ pointerEvents: phase === "landing" ? "auto" : "none" }}
      >
        <Navbar />
        <HeroSection />
        <WorkSection />
        <CinematicGallery />
        <TrustSection />
        <ExpertiseSection />
        <AboutSection />
        <ServicesSection />
        <SkillsShowcase />
        <ContactSection />
        <Footer />
      </motion.div>
    </>
  );
};

export default Index;
