"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 bg-black py-24 md:py-32 px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span
            className="text-xs tracking-[0.4em] uppercase text-white/30 block mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Contact
          </span>
        </motion.div>

        {/* Big CTA Text */}
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <h2
            className="text-4xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase leading-[0.95]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            <span className="gradient-text">Let&apos;s build</span>
            <br />
            <span className="gradient-text-accent">something</span>
            <br />
            <span className="text-stroke">extraordinary.</span>
          </h2>
        </motion.div>

        {/* Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="section-line mb-6" />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="mailto:tewari765@gmail.com"
              className="group flex items-center justify-between py-6 px-2 border-b border-white/5"
              data-cursor-hover
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Email</p>
                <p className="text-base text-white group-hover:text-[#6366f1] transition-colors duration-300">tewari765@gmail.com</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#6366f1] group-hover:rotate-45 transition-all duration-300" />
            </a>

            <a
              href="https://github.com/RajTewari01"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between py-6 px-2 border-b border-white/5"
              data-cursor-hover
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>GitHub</p>
                <p className="text-base text-white group-hover:text-[#6366f1] transition-colors duration-300">@RajTewari01</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#6366f1] group-hover:rotate-45 transition-all duration-300" />
            </a>

            <a
              href="https://www.linkedin.com/in/raj-tewari-9a93212a3/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between py-6 px-2 border-b border-white/5"
              data-cursor-hover
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>LinkedIn</p>
                <p className="text-base text-white group-hover:text-[#0A66C2] transition-colors duration-300">Raj Tewari</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#0A66C2] group-hover:rotate-45 transition-all duration-300" />
            </a>

            <a
              href="https://instagram.com/light_up_my_world01"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between py-6 px-2 border-b border-white/5"
              data-cursor-hover
            >
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>Instagram</p>
                <p className="text-base text-white group-hover:text-[#E4405F] transition-colors duration-300">@light_up_my_world01</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/20 group-hover:text-[#E4405F] group-hover:rotate-45 transition-all duration-300" />
            </a>
          </div>

          {/* Buy Me a Coffee */}
          <div className="mt-12 flex justify-center">
            <a
              href="https://www.buymeacoffee.com/biswadeep"
              target="_blank"
              rel="noreferrer"
              className="magnetic-btn"
              data-cursor-hover
            >
              ☕ Buy Me a Coffee
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center pt-16 mt-16 border-t border-white/5"
        >
          <p className="text-xs text-white/20 tracking-[0.2em] uppercase" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            © 2026 Biswadeep Tewari
          </p>
          <p className="text-xs text-white/20 tracking-[0.2em] uppercase mt-4 md:mt-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ⚡ Built with purpose — not placeholders
          </p>
        </motion.div>

      </div>
    </section>
  );
}
