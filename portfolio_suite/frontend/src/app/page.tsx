"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="relative w-full min-h-screen">
        {/* 3D Canvas Background — fixed behind everything */}
        <ThreeCanvas />

        {/* Content Layer */}
        <HeroSection />
        <MarqueeBanner />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
