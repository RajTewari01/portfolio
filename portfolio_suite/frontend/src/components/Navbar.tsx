"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-black/60" : ""
        }`}
      >
        <a href="#" className="text-white font-bold text-lg tracking-[0.3em] uppercase" style={{ fontFamily: "'Syne', sans-serif" }}>
          BT<span className="text-[#6366f1]">.</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="text-white/60 hover:text-white text-sm tracking-[0.2em] uppercase transition-colors duration-300 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#6366f1] group-hover:w-full transition-all duration-500" />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
        >
          <span className={`w-6 h-px bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
          <span className={`w-6 h-px bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
        </button>
      </motion.nav>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-12"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-5xl font-bold tracking-tighter text-white hover:text-[#6366f1] transition-colors"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
