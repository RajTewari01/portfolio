"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Hire", href: "/hire" },
  { label: "Admin", href: "/admin" },
];

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
        transition={{ duration: 1, delay: 0.3, ease: "circOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          scrolled
            ? "py-3 glass-panel border-b-0"
            : "py-5 bg-transparent"
        }`}
      >
        {/* Glowing top border on scroll */}
        <div 
          className={`absolute top-0 left-0 w-full h-[1px] transition-opacity duration-700 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
          style={{ background: "linear-gradient(90deg, transparent 5%, rgba(99,102,241,0.4) 30%, rgba(34,211,238,0.4) 70%, transparent 95%)" }}
        />

        <div className="section-pad-x flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="relative group flex items-center gap-3">
             <div className="relative">
               <div className="w-9 h-9 bg-white text-black font-syne font-bold flex items-center justify-center text-sm rounded-sm group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                 BT
               </div>
               {/* Glow ring on hover */}
               <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "0 0 20px rgba(99,102,241,0.4)" }} />
             </div>
             <span className="font-syne font-bold tracking-tight text-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-white/90">
               NEXUS
             </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-12 font-mono text-[10px] uppercase tracking-[0.3em]">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative group overflow-hidden py-2 ${
                  link.label === "Admin" ? "text-indigo-400" : "text-white/50 hover:text-white"
                } transition-colors duration-300`}
              >
                {/* Cascading text reveal */}
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">{link.label}</span>
                <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0 flex items-center">{link.label}</span>
                
                {/* Gradient underline sweep */}
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-indigo-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
              </a>
            ))}
          </div>

          {/* Mobile Toggle */}
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
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease: "circOut" }}
                  className="font-syne text-5xl font-black uppercase tracking-tighter text-white/90 hover:text-indigo-400 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            
            {/* Bottom system info in mobile menu */}
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 font-mono text-[9px] tracking-[0.4em] uppercase text-white/20"
            >
              Biswadeep Tewari — Portfolio v4.0
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
