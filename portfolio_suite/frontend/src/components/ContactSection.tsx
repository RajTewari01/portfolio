"use client";

import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", value: "tewari765@gmail.com", href: "mailto:tewari765@gmail.com", color: "#EA4335" },
  { label: "GitHub", value: "@RajTewari01", href: "https://github.com/RajTewari01", color: "#fff" },
  { label: "LinkedIn", value: "Raj Tewari", href: "https://www.linkedin.com/in/raj-tewari-9a93212a3/", color: "#0A66C2" },
  { label: "Instagram", value: "@light_up_my_world01", href: "https://instagram.com/light_up_my_world01", color: "#E4405F" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-black py-24 sm:py-32 md:py-40 section-padding">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="animate-in mb-12 sm:mb-16">
          <span className="text-[11px] tracking-[0.4em] uppercase text-white/25 block mb-4 font-mono">Contact</span>
        </div>

        {/* CTA */}
        <div className="animate-in mb-16 sm:mb-20">
          <h2
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] uppercase leading-[1]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="gradient-text block">Let&apos;s build</span>
            <span className="gradient-text-accent block mt-1 sm:mt-2">something</span>
            <span className="text-stroke block mt-1 sm:mt-2">extraordinary.</span>
          </h2>
        </div>

        {/* Links */}
        <div className="animate-in">
          <div className="section-line mb-1" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-between py-5 sm:py-6 px-1 border-b border-white/5 transition-all duration-300"
              >
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-white/25 mb-1.5 font-mono">{link.label}</p>
                  <p className="text-sm sm:text-base text-white/70 group-hover:text-white transition-colors duration-300 truncate" style={{ ["--hover-color" as string]: link.color }}>
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-white/15 group-hover:text-white/60 group-hover:rotate-45 transition-all duration-300 shrink-0 ml-4" />
              </a>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="animate-in mt-12 sm:mt-16 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <a href="https://www.buymeacoffee.com/biswadeep" target="_blank" rel="noreferrer" className="magnetic-btn">
            ☕ Buy Me a Coffee
          </a>
          <a href="https://biswadeep.pythonanywhere.com" target="_blank" rel="noreferrer" className="magnetic-btn">
            Old Portfolio ↗
          </a>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-12 sm:pt-16 mt-16 sm:mt-20 border-t border-white/5 gap-3">
          <p className="text-[10px] sm:text-[11px] text-white/15 tracking-[0.2em] uppercase font-mono">
            © 2026 Biswadeep Tewari
          </p>
          <p className="text-[10px] sm:text-[11px] text-white/15 tracking-[0.2em] uppercase font-mono">
            ⚡ Built with purpose — not placeholders
          </p>
        </div>
      </div>
    </section>
  );
}
