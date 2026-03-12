"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

const links = [
  { label: "Direct Comms", value: "tewari765@gmail.com", href: "mailto:tewari765@gmail.com" },
  { label: "Code Archive", value: "@RajTewari01", href: "https://github.com/RajTewari01" },
  { label: "Professional", value: "LinkedIn Network", href: "https://www.linkedin.com/in/raj-tewari-9a93212a3/" },
  { label: "Socials", value: "Instagram Feed", href: "https://instagram.com/light_up_my_world01" },
];

export default function ContactSection() {
  const ctaRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;
    
    // Magnetic hover effect on massive CTA
    const handleMouseMove = (e: MouseEvent) => {
      if (!ctaRef.current) return;
      const { left, top, width, height } = ctaRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.1;
      const y = (e.clientY - top - height / 2) * 0.1;
      
      gsap.to(ctaRef.current, { x, y, duration: 1, ease: "power3.out" });
    };

    const handleMouseLeave = () => {
      if (!ctaRef.current) return;
      gsap.to(ctaRef.current, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    const el = ctaRef.current;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="contact" className="relative h-[100dvh] min-h-[700px] flex flex-col justify-between section-pad-x pt-24 pb-12 border-t border-white/5 overflow-hidden">
      
      {/* Background massive glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[radial-gradient(circle,rgba(99,102,241,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="cinematic-reveal flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">Initiate Protocol</p>
      </div>

      {/* Massive Takeover CTA */}
      <div className="flex-1 flex items-center justify-center">
        <h2 
          ref={ctaRef}
          className="font-syne text-[14vw] sm:text-[12vw] font-black uppercase tracking-tighter text-center leading-[0.8] cursor-crosshair"
        >
          <span className="stroke-text block hover:text-white transition-colors duration-500">Let&apos;s</span>
          <span className="block text-white hover:text-indigo-400 transition-colors duration-500">Connect.</span>
        </h2>
      </div>

      {/* Structured Links Footer */}
      <div className="cinematic-reveal w-full border-t border-white/10 pt-8" />
      
      <div className="cinematic-reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-4">
        {links.map((link, i) => (
          <a
            key={i}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noreferrer"
            className="group flex flex-col gap-2"
          >
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30 group-hover:text-indigo-400 transition-colors">
              {link.label}
            </span>
            <span className="font-syne text-xl md:text-2xl font-bold text-white/80 group-hover:text-white transition-colors relative inline-block overflow-hidden pb-1 max-w-max">
              {link.value}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cyan-400 -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
            </span>
          </a>
        ))}
      </div>

      {/* Final System Readout */}
      <div className="cinematic-reveal flex justify-between items-center mt-16 pt-6 border-t border-white/5">
        <p className="font-mono text-[8px] sm:text-[10px] tracking-[0.4em] uppercase text-white/20">
          © 26 Biswadeep Tewari
        </p>
        <div className="flex gap-4">
          <a href="https://www.buymeacoffee.com/biswadeep" target="_blank" rel="noreferrer" className="font-mono text-[8px] sm:text-[10px] tracking-widest text-indigo-400 border border-indigo-500/30 px-3 py-1.5 hover:bg-indigo-500 hover:text-white transition-all">
            Buy Coffee
          </a>
          <a href="https://biswadeep.pythonanywhere.com" target="_blank" rel="noreferrer" className="font-mono text-[8px] sm:text-[10px] tracking-widest text-white/30 border border-white/10 px-3 py-1.5 hover:bg-white hover:text-black transition-all">
            Legacy Build
          </a>
        </div>
      </div>
    </section>
  );
}
