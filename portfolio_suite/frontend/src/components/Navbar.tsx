"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "py-3 bg-black/95 backdrop-blur-xl"
            : "py-4 bg-transparent"
        }`}
      >
        <div className="section-pad-x flex items-center justify-between">
          
          {/* Logo Mark */}
          <a href="#" className="relative group flex items-center gap-2">
             <div className="w-8 h-8 bg-white text-black font-syne font-bold flex items-center justify-center text-sm rounded-sm group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-500">
               BT
             </div>
             <span className="font-syne font-bold tracking-tight text-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
               NEXUS
             </span>
          </a>

          {/* Desktop Links - Minimalist */}
          <div className="hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.3em]">
            {["Work", "About", "Contact", "Admin"].map((link) => (
              <a
                key={link}
                href={link === "Admin" ? "/admin" : `#${link.toLowerCase()}`}
                className={`relative group overflow-hidden ${link === "Admin" ? "text-indigo-400" : "text-white/60 hover:text-white"}`}
              >
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link}</span>
                <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">{link}</span>
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center z-50 mix-blend-difference"
          >
            <span className={`w-full h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-8 text-center">
              {["Work", "About", "Contact", "Admin"].map((link, i) => (
                <motion.a
                  key={link}
                  href={link === "Admin" ? "/admin" : `#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  className="font-syne text-5xl font-black uppercase tracking-tighter"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
