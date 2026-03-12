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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 sm:py-4 backdrop-blur-2xl bg-black/70 border-b border-white/[0.04]"
            : "py-5 sm:py-6"
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="relative z-50">
            <span
              className="text-lg sm:text-xl font-bold tracking-[0.2em] uppercase text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              BT<span className="text-[#6366f1]">.</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] tracking-[0.15em] uppercase text-white/50 hover:text-white transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#6366f1] group-hover:w-full transition-all duration-400" />
              </a>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-8 h-8 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-px" : "-translate-y-1"}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-0" : "translate-y-1"}`} />
          </button>
        </div>
      </motion.header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-white/80 hover:text-white transition-colors"
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
