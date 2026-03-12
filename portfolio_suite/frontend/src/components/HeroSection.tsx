"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Image from "next/image";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Simulate a typewriter/scramble reveal for the main massive brutalist text
      // Ultra-premium Apple-style staggered blur reveal for the first name
      const splitText1 = textRef1.current?.querySelectorAll(".char-first");
      const splitText2 = textRef2.current?.querySelectorAll(".char-last");

      if (splitText1) {
        tl.fromTo(
          splitText1,
          { y: 80, opacity: 0, filter: "blur(10px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.2,
            stagger: 0.04,
            ease: "power3.out",
          }
        );
      }

      // Custom ChatGPT-style Typewriter for TEWARI
      if (splitText2 && splitText2.length > 0) {
        // We create a master timeline that repeats infinitely
        const typeTl = gsap.timeline({ repeat: -1, delay: 1.5 });

        // 1. Type forward (character by character - SLOWED DOWN)
        typeTl.fromTo(
          splitText2,
          { opacity: 0, display: "none" },
          {
            opacity: 1,
            display: "inline-block",
            duration: 0.01,
            stagger: 0.25, // Slower typing
            ease: "none",
          }
        );

        // 2. Pause at the end (reading time)
        typeTl.to({}, { duration: 2 });

        // 3. Erase backward (character by character - SPED UP)
        // Reversing array to erase from end to start
        const reversedChars = Array.from(splitText2).reverse();
        typeTl.to(reversedChars, {
            opacity: 0,
            display: "none",
            duration: 0.01,
            stagger: 0.02, // Much faster erase
            ease: "none",
        });

        // 4. Tiny pause before instantly restarting the type
        typeTl.to({}, { duration: 0.2 });
      }

      // Typewriter effect for paragraph
      if (subtextRef.current) {
        const textToType = "Full-Stack Engineer & AI/ML Architect — cloud-native systems, LLM agents, cross-platform apps.";
        subtextRef.current.innerText = "";
        
        let i = 0;
        const typeWriter = () => {
          if (i < textToType.length) {
            // Check for space and add it explicitly using non-breaking space if needed, 
            // though standard innerHTML/textContent handles spaces fine if we don't trim inappropriately.
            const char = textToType.charAt(i);
            subtextRef.current!.innerHTML += char === ' ' ? '&nbsp;' : char;
            i++;
            setTimeout(typeWriter, 15); // very fast mechanical typing
          }
        };
        
        // start typing halfway through the main title reveal
        tl.add(typeWriter, "-=0.8");
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[700px] flex flex-col justify-between section-pad-x pt-24 sm:pt-28 pb-12"
    >
      {/* Subtle cinematic lighting from above */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />

      {/* TOP: Identification Grid (Border lines removed for absolute floating sleekness) */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: -10 }}
        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 pt-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
             <Image src="/profile.jpg" alt="Biswadeep Tewari" fill className="object-cover" priority />
          </div>
          <div>
            <p className="text-[13px] text-white/90 font-medium tracking-wide">Biswadeep Tewari</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              <p className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Available for worldwide ops</p>
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono leading-relaxed">
            Location: IND<br />
            Lat: 22.5726° N<br />
            Lon: 88.3639° E
          </p>
        </div>
      </motion.div>

      {/* MID: Massive Brutalist Typography (Shadows applied) */}
      <div className="flex flex-col flex-1 justify-center z-10 pointer-events-none -mt-4">
        <h1
          ref={textRef1}
          className="text-[14vw] sm:text-[11vw] md:text-[8vw] font-black tracking-[-0.08em] leading-[0.8] uppercase flex overflow-hidden drop-shadow-2xl shadow-indigo-500/20"
        >
          {"BISWADEEP".split("").map((char, i) => (
            <span key={`first-${i}`} className="char-first inline-block text-white/95">{char}</span>
          ))}
        </h1>
        <h1
          ref={textRef2}
          className="text-[14vw] sm:text-[11vw] md:text-[8vw] font-black tracking-[-0.08em] leading-[0.8] uppercase flex overflow-hidden -mt-1 sm:-mt-2 md:-mt-4 drop-shadow-2xl shadow-indigo-500/20"
        >
          {"TEWARI".split("").map((char, i) => (
            <span key={`last-${i}`} className="char-last inline-block stroke-text opacity-0">{char}</span>
          ))}
          <span className="char-last inline-block text-indigo-500 opacity-0">.</span>
        </h1>

        {/* Typewriter text */}
        <p
          ref={subtextRef}
          className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mt-8 font-light leading-relaxed pointer-events-auto h-[60px]"
        >
          {/* Will be typed by GSAP */}
        </p>

        {/* Social Links (Restored) */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-wrap gap-4 mt-6 pointer-events-auto"
        >
          <a href="https://www.linkedin.com/in/raj-tewari-9a93212a3/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          </a>
          <a href="https://github.com/RajTewari01" target="_blank" rel="noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="mailto:tewari765@gmail.com" className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
          </a>
          <a href="https://www.buymeacoffee.com/biswadeep" target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 px-5 rounded-full border border-[#FFDD00]/30 text-[#FFDD00] hover:bg-[#FFDD00] hover:text-black hover:border-[#FFDD00] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider">
             Buy Me A Coffee
          </a>
        </motion.div>
      </div>

      {/* BOTTOM: System Specs & Scroll indicator (Border line removed) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-between items-end pb-6"
      >
        <div className="flex gap-12">
          <div>
            <p className="text-[10px] text-white/30 tracking-[0.2em] font-mono uppercase mb-1">Architecture</p>
            <p className="text-xs text-white/70 tracking-wide font-medium">Headless / AI Native</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-white/30 tracking-[0.2em] font-mono uppercase mb-1">Framework</p>
            <p className="text-xs text-white/70 tracking-wide font-medium">Next.js 15 / GLSL</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/30 tracking-[0.4em] font-mono uppercase [writing-mode:vertical-lr]">Scroll</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-indigo-500 origin-top"
          />
        </div>
      </motion.div>
    </section>
  );
}
