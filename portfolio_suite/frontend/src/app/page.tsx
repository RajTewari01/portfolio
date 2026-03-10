"use client";

import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import ProjectsSection from "@/components/ProjectsSection";

// Dynamically import Three.js Canvas to prevent SSR errors
const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      {/* 3D Background */}
      <ThreeCanvas />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Featured Projects */}
      <ProjectsSection />
      
    </main>
  );
}
