"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown, Terminal } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center pt-20 overflow-hidden perspective-1000">
      
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[15%] w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ y: [0, 30, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[20%] right-[15%] w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
      />

      <div className="flex flex-col md:flex-row items-center justify-center gap-12 z-10 w-full max-w-6xl px-6">
        
        {/* Profile Image with 3D Glassmorphism Effect */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.4 }}
          className="relative group order-first md:order-last"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#58a6ff] to-[#a100ff] rounded-[2rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          
          <div className="relative w-56 h-56 md:w-80 md:h-80 rounded-[2rem] border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden shadow-2xl transform preserve-3d group-hover:rotate-y-12 transition-transform duration-500">
            <Image 
              src="/profile.jpg" 
              alt="Biswadeep Tewari"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 object-top"
              priority
            />
            {/* Inner glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </div>

          {/* Floating tech badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-6 -left-6 bg-[#050505] border border-white/10 p-4 rounded-2xl shadow-xl flex items-center gap-3"
          >
            <div className="p-2 bg-[#58a6ff]/10 rounded-lg">
              <Terminal className="w-6 h-6 text-[#58a6ff]" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-mono">Available for</p>
              <p className="text-sm font-bold text-white">Freelance</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Text Content */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center md:text-left z-10 flex-1"
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
          >
            <span className="bg-gradient-to-r from-[#58a6ff] to-[#a100ff] bg-clip-text text-transparent font-mono text-sm">
              Hello, World.
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600">
            Biswadeep<br/>Tewari.
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-400 font-light mb-8 max-w-xl">
            I architect <span className="text-white font-medium">Scalable Backends</span>, engineer <span className="text-[#58a6ff] font-medium">AI/ML</span> intelligence, and craft cutting-edge <span className="text-[#a100ff] font-medium">Mobile & Web</span> experiences.
          </h2>

          {/* Social Links */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
            <a href="https://github.com/RajTewari01" target="_blank" rel="noreferrer" className="group flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
              <Github className="w-5 h-5 text-gray-300 group-hover:text-white" />
              <span className="font-medium text-gray-300 group-hover:text-white">GitHub</span>
            </a>
            <a href="https://www.linkedin.com/in/raj-tewari-9a93212a3/" target="_blank" rel="noreferrer" className="group p-3 bg-white/5 hover:bg-[#0A66C2]/10 border border-white/10 hover:border-[#0A66C2]/50 rounded-full transition-all">
              <Linkedin className="w-5 h-5 text-gray-300 group-hover:text-[#0A66C2]" />
            </a>
            <a href="mailto:tewari765@gmail.com" className="group p-3 bg-white/5 hover:bg-[#EA4335]/10 border border-white/10 hover:border-[#EA4335]/50 rounded-full transition-all">
              <Mail className="w-5 h-5 text-gray-300 group-hover:text-[#EA4335]" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gray-500 to-transparent mb-4 overflow-hidden relative">
          <motion.div 
            animate={{ y: [-20, 48] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-1/2 bg-[#58a6ff]"
          />
        </div>
      </motion.div>

    </section>
  );
}
