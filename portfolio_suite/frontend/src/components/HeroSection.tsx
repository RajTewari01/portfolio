"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden z-10">
      
      {/* Massive Typography overlapping 3D */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 pointer-events-none mb-12 mix-blend-difference"
      >
        <h1 
          className="text-[12vw] leading-[0.85] font-black text-white tracking-tighter uppercase"
          style={{ transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)` }}
        >
          Creative<br/>
          <span className="text-[#58a6ff]">Engineer.</span>
        </h1>
      </motion.div>

      {/* Profile & Info Footer */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full max-w-7xl relative z-20 mt-auto pb-12">
        
        {/* Profile Element */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center gap-6 mb-8 md:mb-0"
        >
          <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border border-white/20">
            <Image 
              src="/profile.jpg" 
              alt="Biswadeep Tewari"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div>
            <p className="text-white font-bold text-xl md:text-2xl uppercase tracking-widest">Biswadeep</p>
            <p className="text-white/50 text-sm tracking-widest uppercase">Tewari</p>
          </div>
        </motion.div>

        {/* Bio & Links */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="max-w-sm text-left md:text-right"
        >
          <p className="text-white/70 font-light text-sm md:text-base mb-6 leading-relaxed">
            I build highly interactive web experiences and architect scalable data systems, pushing the boundaries of what is possible in the browser.
          </p>
          
          <div className="flex items-center justify-start md:justify-end gap-6 border-t border-white/10 pt-6">
            <a href="https://github.com/RajTewari01" className="text-white/50 hover:text-white transition-colors">GH</a>
            <a href="https://www.linkedin.com/in/raj-tewari-9a93212a3/" className="text-white/50 hover:text-white transition-colors">IN</a>
            <a href="mailto:tewari765@gmail.com" className="text-white/50 hover:text-white transition-colors">MAIL</a>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
