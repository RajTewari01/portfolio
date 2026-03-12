"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Split text animation using GSAP
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { y: 200, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power4.out",
        delay: 0.8,
      }
    );
  }, []);

  const titleText = "BISWADEEP";
  const subtitleText = "TEWARI";

  return (
    <section className="relative h-screen flex flex-col justify-between px-8 md:px-16 lg:px-24 xl:px-32 z-10 overflow-hidden">
      
      {/* Top status bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="flex justify-between items-center pt-28 md:pt-32"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="text-xs tracking-[0.3em] uppercase text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Available for work
          </span>
        </div>
        <span className="text-xs tracking-[0.3em] uppercase text-white/40 hidden md:block" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Based in India
        </span>
      </motion.div>

      {/* Main massive title */}
      <div className="flex-1 flex flex-col justify-center -mt-20">
        <div className="overflow-hidden">
          <h1 
            ref={titleRef}
            className="text-[12vw] md:text-[9vw] leading-[0.9] font-black tracking-[-0.04em] uppercase"
            style={{ fontFamily: "'Syne', sans-serif", perspective: "1000px" }}
          >
            <span className="block overflow-hidden">
              {titleText.split("").map((char, i) => (
                <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              ))}
            </span>
            <span className="block overflow-hidden gradient-text-accent">
              {subtitleText.split("").map((char, i) => (
                <span key={i} className="char inline-block" style={{ transformStyle: "preserve-3d" }}>
                  {char}
                </span>
              ))}
            </span>
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-white/50 text-base md:text-lg max-w-md mt-8 font-light leading-relaxed"
        >
          Full-Stack Engineer & AI/ML Architect building high-performance systems and immersive digital experiences.
        </motion.p>
      </div>

      {/* Bottom bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="flex justify-between items-end pb-12"
      >
        {/* Profile chip */}
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border border-white/10">
            <Image 
              src="/profile.jpg" 
              alt="Biswadeep Tewari"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm text-white font-medium">Biswadeep Tewari</p>
            <p className="text-xs text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>@RajTewari01</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-4">
          <span className="text-xs tracking-[0.3em] uppercase text-white/30 [writing-mode:vertical-lr]">Scroll</span>
          <motion.div
            animate={{ height: [0, 60, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px bg-gradient-to-b from-[#6366f1] to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
}
