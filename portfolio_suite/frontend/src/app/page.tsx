"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

// Load 3D heavily optimized and entirely deferred to client
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });

export default function Home() {
  useEffect(() => {
    // Premium Lenis smooth scroll engine
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Global cinematic scroll-reveal class for brutalist elements
    // Upgraded to Apple-premium blur reveal
    const revealEls = document.querySelectorAll(".cinematic-reveal");
    revealEls.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 80, opacity: 0, filter: "blur(12px)", scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.6,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {/* NATIVE 3D BACKGROUND - PERSISTS ACROSS ENTIRE PAGE SCROLL */}
      <ThreeCanvas />

      <Navbar />
      
      <main className="relative w-full z-10 font-sans">
        <HeroSection />
        <MarqueeBanner />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
