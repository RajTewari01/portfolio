"use client";

import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Email", value: "tewari765@gmail.com", href: "mailto:tewari765@gmail.com" },
  { label: "GitHub", value: "@RajTewari01", href: "https://github.com/RajTewari01" },
  { label: "LinkedIn", value: "Raj Tewari", href: "https://www.linkedin.com/in/raj-tewari-9a93212a3/" },
  { label: "Instagram", value: "@light_up_my_world01", href: "https://instagram.com/light_up_my_world01" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-black section-padding">
      <div className="h-[1px] bg-white/[0.04]" />

      <div className="max-w-[1100px] mx-auto py-28 sm:py-36 md:py-44">
        {/* Header */}
        <div className="animate-in mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-white/20 block mb-3 font-mono">Contact</span>
        </div>

        {/* CTA */}
        <div className="animate-in mb-20 sm:mb-28">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-[-0.03em] uppercase leading-[1.05]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="gradient-text block">Let&apos;s build</span>
            <span className="gradient-text-accent block mt-2">something</span>
            <span className="text-stroke block mt-2">extraordinary.</span>
          </h2>
        </div>

        {/* Links */}
        <div className="animate-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center justify-between py-5 border-b border-white/[0.04] transition-all duration-300"
              >
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-white/18 mb-1 font-mono">{link.label}</p>
                  <p className="text-[13px] sm:text-sm text-white/55 group-hover:text-white transition-colors duration-300 truncate">
                    {link.value}
                  </p>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-white/12 group-hover:text-white/50 group-hover:rotate-45 transition-all duration-300 shrink-0 ml-3" />
              </a>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="animate-in mt-14 sm:mt-20 flex flex-wrap gap-3">
          <a href="https://www.buymeacoffee.com/biswadeep" target="_blank" rel="noreferrer" className="magnetic-btn">
            ☕ Buy Me a Coffee
          </a>
          <a href="https://biswadeep.pythonanywhere.com" target="_blank" rel="noreferrer" className="magnetic-btn">
            Old Portfolio ↗
          </a>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-14 mt-20 border-t border-white/[0.04] gap-2">
          <p className="text-[9px] sm:text-[10px] text-white/12 tracking-[0.2em] uppercase font-mono">
            © 2026 Biswadeep Tewari
          </p>
          <p className="text-[9px] sm:text-[10px] text-white/12 tracking-[0.2em] uppercase font-mono">
            ⚡ Built with purpose — not placeholders
          </p>
        </div>
      </div>
    </section>
  );
}
