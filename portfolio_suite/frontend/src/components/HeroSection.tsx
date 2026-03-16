"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLHeadingElement>(null);
  const textRef2 = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      const splitText1 = textRef1.current?.querySelectorAll(".char-first");
      const splitText2 = textRef2.current?.querySelectorAll(".char-last");

      // ─── BISWADEEP: Staggered blur + y reveal ───
      if (splitText1) {
        tl.fromTo(
          splitText1,
          { y: 80, opacity: 0, filter: "blur(12px)", rotateX: 40 },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            rotateX: 0,
            duration: 1.2,
            stagger: 0.04,
            ease: "power3.out",
          }
        );
      }

      // ─── TEWARI: ChatGPT typewriter loop ───
      if (splitText2 && splitText2.length > 0) {
        const typeTl = gsap.timeline({ repeat: -1, delay: 1.5 });

        // Type forward slowly
        typeTl.fromTo(
          splitText2,
          { opacity: 0, display: "none" },
          {
            opacity: 1,
            display: "inline-block",
            duration: 0.01,
            stagger: 0.25,
            ease: "none",
          }
        );

        // Hold
        typeTl.to({}, { duration: 2.5 });

        // Erase backward fast
        const reversedChars = Array.from(splitText2).reverse();
        typeTl.to(reversedChars, {
          opacity: 0,
          display: "none",
          duration: 0.01,
          stagger: 0.02,
          ease: "none",
        });

        // Brief pause
        typeTl.to({}, { duration: 0.3 });
      }

      // ─── Paragraph typewriter ───
      if (subtextRef.current) {
        const textToType = "Full-Stack Engineer & AI/ML Architect — cloud-native systems, LLM agents, cross-platform apps.";
        subtextRef.current.innerText = "";
        
        let i = 0;
        const typeWriter = () => {
          if (i < textToType.length) {
            const char = textToType.charAt(i);
            subtextRef.current!.innerHTML += char === ' ' ? '&nbsp;' : char;
            i++;
            setTimeout(typeWriter, 18);
          }
        };
        tl.add(typeWriter, "-=0.6");
      }

      // ─── Parallax: BISWADEEP scrolls slower, entire hero fades ───
      gsap.to(textRef1.current, {
        y: -60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(textRef2.current, {
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Fade out hero on scroll
      gsap.to(containerRef.current, {
        opacity: 0,
        filter: "blur(6px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "60% top",
          end: "bottom top",
          scrub: 1,
        },
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[700px] flex flex-col justify-between section-pad-x pt-24 sm:pt-28 pb-12"
    >
      {/* Subtle cinematic lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70vw] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.12),transparent_70%)] pointer-events-none" />

      {/* ─── TOP: ID Grid ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
        className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-4 pt-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/15 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
             <Image src="/profile.jpg" alt="Biswadeep Tewari" width={64} height={64} className="object-cover w-full h-full" priority />
          </div>
          <div>
            <p className="text-[13px] text-white font-medium tracking-wide">Biswadeep Tewari</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <p className="text-[10px] text-white/80 uppercase tracking-widest font-mono">Available for work</p>
            </div>
          </div>
        </div>

        <div className="text-right hidden sm:block bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
          <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] font-mono leading-relaxed">
            Location: IND<br />
            Lat: 22.5726° N<br />
            Lon: 88.3639° E
          </p>
        </div>
      </motion.div>

      {/* ─── MID: Massive Brutalist Typography ─── */}
      <div className="flex flex-col flex-1 justify-center z-10 pointer-events-none -mt-4" style={{ perspective: "1000px" }}>
        <h1
          ref={textRef1}
          className="text-[8.8vw] sm:text-[11vw] md:text-[8vw] font-black tracking-[-0.09em] sm:tracking-[-0.08em] leading-[0.8] uppercase flex overflow-hidden"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.1)" }}
        >
          {"BISWADEEP".split("").map((char, i) => (
            <span key={`first-${i}`} className="char-first inline-block text-white/95">{char}</span>
          ))}
        </h1>
        <h1
          ref={textRef2}
          className="text-[8.8vw] sm:text-[11vw] md:text-[8vw] font-black tracking-[-0.09em] sm:tracking-[-0.08em] leading-[0.8] uppercase flex overflow-hidden -mt-1 sm:-mt-2 md:-mt-4"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.6)" }}
        >
          {"TEWARI".split("").map((char, i) => (
            <span key={`last-${i}`} className="char-last inline-block stroke-text opacity-0">{char}</span>
          ))}
          <span className="char-last inline-block text-indigo-500 opacity-0">.</span>
          {/* Blinking cursor */}
          <span className="inline-block text-indigo-400 cursor-blink ml-1 font-light">|</span>
        </h1>

        {/* Typed paragraph */}
        <p
          ref={subtextRef}
          className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl mt-8 font-light leading-relaxed pointer-events-auto min-h-[60px] bg-black/20 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/5"
          style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
        />

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="flex flex-wrap items-center gap-3 mt-6 pointer-events-auto"
        >
          {[
            { href: "https://www.linkedin.com/in/raj-tewari-9a93212a3/", icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", size: "w-4 h-4" },
            { href: "https://github.com/RajTewari01", icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", size: "w-[18px] h-[18px]" },
            { href: "mailto:mericans24@gmail.com", icon: "M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z", size: "w-[18px] h-[18px]" },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-black/20 text-white/90 backdrop-blur-md hover:bg-white hover:text-black hover:border-white hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300"
            >
              <svg className={item.size} fill="currentColor" viewBox="0 0 24 24"><path d={item.icon} /></svg>
            </a>
          ))}
          
          <a href="/hire" className="flex items-center justify-center h-10 px-6 rounded-full bg-white/80 backdrop-blur-sm text-black hover:bg-indigo-500 hover:text-white hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] transition-all duration-300 font-syne font-black text-xs uppercase tracking-wider">
             🚀 Hire Me
          </a>

          <a href="https://www.buymeacoffee.com/biswadeep" target="_blank" rel="noreferrer" className="flex items-center justify-center h-10 px-5 rounded-full border border-[#FFDD00]/20 bg-black/40 backdrop-blur-md text-[#FFDD00]/90 hover:bg-[#FFDD00] hover:text-black hover:border-[#FFDD00] hover:scale-105 hover:shadow-[0_0_25px_rgba(255,221,0,0.2)] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider">
             ☕ Buy Me a Coffee
          </a>
        </motion.div>
      </div>

      {/* ─── BOTTOM: System Specs & Scroll ─── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="flex justify-between items-end pb-6"
      >
        <div className="flex gap-12 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/5">
          <div>
            <p className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase mb-1">Architecture</p>
            <p className="text-xs text-white/90 tracking-wide font-medium"> GLSL / AI Native</p>
          </div>
          <div className="hidden sm:block">
            <p className="text-[10px] text-white/50 tracking-[0.2em] font-mono uppercase mb-1">Framework</p>
            <p className="text-xs text-white/90 tracking-wide font-medium">Next.js 16 / GLSL</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] text-white/50 tracking-[0.4em] font-mono uppercase [writing-mode:vertical-lr]">Scroll</span>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-[1px] h-10 bg-gradient-to-b from-indigo-500 to-cyan-400 origin-top"
          />
        </div>
      </motion.div>
    </section>
  );
}
