"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      
      {/* Profile Image with Glow Effect */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-[#58a6ff] rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-2 border-[#58a6ff]/50 overflow-hidden relative z-10 shadow-[0_0_30px_rgba(88,166,255,0.3)]">
          <Image 
            src="/profile.jpg" 
            alt="Biswadeep Tewari"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Main Text Content */}
      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="text-center z-10 px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
          Biswadeep Tewari
        </h1>
        <h2 className="text-xl md:text-2xl text-[#58a6ff] font-mono mb-8 opacity-90">
          Full-Stack Engineer • AI/ML Architect • Mobile Dev
        </h2>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <a href="https://github.com/RajTewari01" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
            <Github className="w-8 h-8" />
          </a>
          <a href="https://www.linkedin.com/in/raj-tewari-9a93212a3/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-[#0A66C2] hover:scale-110 transition-all duration-300">
            <Linkedin className="w-8 h-8" />
          </a>
          <a href="mailto:tewari765@gmail.com" className="text-gray-400 hover:text-[#EA4335] hover:scale-110 transition-all duration-300">
            <Mail className="w-8 h-8" />
          </a>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400"
      >
        <span className="text-sm tracking-widest uppercase mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="w-5 h-5 text-[#58a6ff]" />
        </motion.div>
      </motion.div>

    </section>
  );
}
