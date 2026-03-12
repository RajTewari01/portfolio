"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import dynamic from "next/dynamic";

const ThreeCanvas = dynamic(() => import("@/components/ThreeCanvas"), { ssr: false });

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");
    gsap.fromTo(chars,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.02, duration: 0.8, ease: "power4.out", delay: 0.4 }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[600px] flex flex-col section-padding overflow-hidden bg-black"
    >
      {/* Grid background */}
      <div className="hero-grid" />

      {/* 3D Canvas — subtle accent, right side */}
      <div className="absolute top-1/2 right-[8%] sm:right-[12%] md:right-[15%] -translate-y-1/2 w-[200px] h-[200px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] z-[1] opacity-80">
        <ThreeCanvas />
      </div>

      {/* Glow */}
      <div className="absolute top-1/2 right-[15%] -translate-y-1/2 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.04)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* ── TOP: Status bar ───────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="flex justify-between items-center pt-24 sm:pt-28 pb-4 relative z-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/30 font-mono">
            Available for work
          </span>
        </div>
        <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/30 font-mono hidden sm:block">
          West Bengal, India
        </span>
      </motion.div>

      {/* ── CENTER: Name + tagline ────────────── */}
      <div className="flex-1 flex flex-col justify-center relative z-10 pointer-events-none">
        <h1
          className="hero-title text-[15vw] sm:text-[12vw] md:text-[9.5vw] lg:text-[8.5vw] leading-[0.85] font-black tracking-[-0.05em] uppercase select-none"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="block overflow-hidden">
            {"BISWADEEP".split("").map((c, i) => (
              <span key={i} className="char inline-block">{c}</span>
            ))}
          </span>
          <span className="block overflow-hidden gradient-text-accent mt-1">
            {"TEWARI.".split("").map((c, i) => (
              <span key={i} className="char inline-block">{c}</span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-white/35 text-[13px] sm:text-sm md:text-base max-w-[360px] mt-5 font-light leading-relaxed pointer-events-auto"
        >
          Full-Stack Engineer & AI/ML Architect — cloud-native systems, LLM agents, cross-platform apps.
        </motion.p>
      </div>

      {/* ── BOTTOM: Profile + scroll ─────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="flex justify-between items-end py-6 relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/8 shrink-0">
            <Image src="/profile.jpg" alt="Biswadeep Tewari" fill className="object-cover" priority />
          </div>
          <div>
            <p className="text-[13px] text-white/70 font-medium leading-tight">Biswadeep Tewari</p>
            <p className="text-[10px] text-white/25 font-mono">MAKAUT • @RajTewari01</p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-center gap-1.5">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/15 [writing-mode:vertical-lr]">Scroll</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent origin-top"
          />
        </div>
      </motion.div>
    </section>
  );
}
