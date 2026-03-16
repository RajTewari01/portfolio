"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = [
  { label: "Direct Comms", value: "mericans24@gmail.com", href: "mailto:mericans24@gmail.com" },
  { label: "Code Archive", value: "@RajTewari01", href: "https://github.com/RajTewari01" },
  { label: "Professional", value: "LinkedIn Network", href: "https://www.linkedin.com/in/raj-tewari-9a93212a3/" },
  { label: "Socials", value: "Instagram Feed", href: "https://instagram.com/light_up_my_world01" },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── CTA: Scroll-driven scale + reveal ───
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { scale: 0.4, opacity: 0, filter: "blur(15px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 20%",
              scrub: 1.5,
            },
          }
        );
      }

      // ─── Magnetic hover ───
      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) * 0.08;
        const y = (e.clientY - top - height / 2) * 0.08;
        gsap.to(ctaRef.current, { x, y, duration: 0.8, ease: "power3.out" });
      };

      const handleMouseLeave = () => {
        if (!ctaRef.current) return;
        gsap.to(ctaRef.current, { x: 0, y: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
      };

      const el = ctaRef.current;
      if (el) {
        el.addEventListener("mousemove", handleMouseMove);
        el.addEventListener("mouseleave", handleMouseLeave);
      }

      // ─── Link cards: staggered reveal ───
      const linkCards = sectionRef.current?.querySelectorAll(".link-card");
      if (linkCards) {
        gsap.fromTo(
          linkCards,
          { opacity: 0, y: 40, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: linkCards[0],
              start: "top 90%",
            },
          }
        );
      }

      return () => {
        if (el) {
          el.removeEventListener("mousemove", handleMouseMove);
          el.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative h-[100dvh] min-h-[700px] flex flex-col justify-between section-pad-x pt-24 pb-12 overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_60%)] pointer-events-none" />

      {/* Top label */}
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full glow-pulse" />
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">Initiate Protocol</p>
      </div>

      {/* ─── Massive Scroll-Scale CTA ─── */}
      <div className="flex-1 flex items-center justify-center">
        <h2 
          ref={ctaRef}
          className="font-syne text-[10.5vw] sm:text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter text-center leading-[0.8] cursor-crosshair select-none"
          style={{ textShadow: "0 10px 60px rgba(0,0,0,0.5)" }}
        >
          <span className="block stroke-text hover:text-white transition-colors duration-700">Let&apos;s</span>
          <span className="block text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-indigo-400 hover:via-cyan-400 hover:to-violet-400 transition-all duration-700">Connect.</span>
        </h2>
      </div>

      {/* ─── Gradient Divider ─── */}
      <div className="line-glow w-full mb-8" />

      {/* ─── Glass Pill Links ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-4">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="link-card group glass-card rounded-xl p-5 flex flex-col gap-2"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/25 group-hover:text-indigo-400 transition-colors duration-300">
              {link.label}
            </span>
            <span className="font-syne text-lg md:text-xl font-bold text-white/75 group-hover:text-white transition-colors duration-300 relative inline-block overflow-hidden max-w-max">
              {link.value}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-400 -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </span>
          </a>
        ))}
      </div>

      {/* ─── Footer ─── */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-white/[0.04]">
        <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/20">
          © 2026 Biswadeep Tewari
        </p>
        <div className="flex gap-3">
          <a href="https://www.buymeacoffee.com/biswadeep" target="_blank" rel="noreferrer" className="font-mono text-[8px] sm:text-[10px] tracking-widest text-[#FFDD00]/70 border border-[#FFDD00]/20 px-4 py-2 rounded-full hover:bg-[#FFDD00] hover:text-black transition-all duration-300">
            ☕ Buy Coffee
          </a>
          <a href="https://biswadeep.pythonanywhere.com" target="_blank" rel="noreferrer" className="font-mono text-[8px] sm:text-[10px] tracking-widest text-white/25 border border-white/10 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Legacy Build
          </a>
        </div>
      </div>
    </section>
  );
}
