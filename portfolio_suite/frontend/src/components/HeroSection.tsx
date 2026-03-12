"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(chars,
      { y: 120, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.025, duration: 1, ease: "power4.out", delay: 0.6 }
    );
  }, []);

  const line1 = "BISWADEEP";
  const line2 = "TEWARI.";

  return (
    <section className="relative min-h-screen flex flex-col justify-between section-padding overflow-hidden">
      {/* Subtle grid background */}
      <div className="hero-grid" />

      {/* Radial gradient accent */}
      <div className="absolute top-[-20%] left-[50%] translate-x-[-50%] w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="flex justify-between items-center pt-28 sm:pt-32 relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/40 font-mono">
            Available for work
          </span>
        </div>
        <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-white/40 font-mono hidden sm:block">
          West Bengal, India
        </span>
      </motion.div>

      {/* Title */}
      <div ref={titleRef} className="flex-1 flex flex-col justify-center relative z-10 py-8 sm:py-12">
        <h1
          className="hero-title text-[15vw] sm:text-[10vw] md:text-[9vw] leading-[0.88] font-black tracking-[-0.05em] uppercase"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="block overflow-hidden">
            {line1.split("").map((c, i) => (
              <span key={i} className="char inline-block">{c}</span>
            ))}
          </span>
          <span className="block overflow-hidden gradient-text-accent">
            {line2.split("").map((c, i) => (
              <span key={i} className="char inline-block">{c}</span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-white/45 text-sm sm:text-base md:text-lg max-w-md mt-6 sm:mt-8 font-light leading-relaxed"
        >
          Full-Stack Engineer & AI/ML Architect — building cloud-native systems, LLM agents, and cross-platform mobile apps.
        </motion.p>
      </div>

      {/* Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="flex justify-between items-end pb-8 sm:pb-10 relative z-10"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/10 shrink-0">
            <Image src="/profile.jpg" alt="Biswadeep Tewari" fill className="object-cover" priority />
          </div>
          <div>
            <p className="text-sm text-white font-medium">Biswadeep Tewari</p>
            <p className="text-[11px] text-white/35 font-mono">@RajTewari01</p>
          </div>
        </div>

        <div className="hidden sm:flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/25 [writing-mode:vertical-lr]">Scroll</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="w-px h-10 bg-gradient-to-b from-[#6366f1] to-transparent origin-top"
          />
        </div>
      </motion.div>
    </section>
  );
}
