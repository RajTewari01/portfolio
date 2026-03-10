"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Cpu } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Spatial Tracker",
    description: "Advanced spatial tracking engine utilizing computer vision. Real-time mapping and object detection with high accuracy.",
    tech: ["Python", "PyTorch", "OpenCV"],
    github: "https://github.com/RajTewari01/spatial-tracker",
    live: "#",
    icon: <Cpu className="w-6 h-6 text-[#58a6ff]" />
  },
  {
    title: "LeetCode Dashboard",
    description: "Dynamic LeetCode progress tracker showing stats, solved problems, and streaks, embedded neatly using GitHub integrations.",
    tech: ["Next.js", "API", "React"],
    github: "https://github.com/RajTewari01/LeetCode",
    live: "#",
    icon: <Code2 className="w-6 h-6 text-[#a100ff]" />
  },
  {
    title: "QR Code Generator with EXE",
    description: "A robust QR code generation tool wrapped in an executable format. Useful for quick desktop deployment and usage.",
    tech: ["Python", "PyQt", "QRCode"],
    github: "https://github.com/RajTewari01/QR_CODE_GENERATOR_WITH_EXE",
    live: "#",
    icon: <ExternalLink className="w-6 h-6 text-[#3fb950]" />
  }
];

export default function ProjectsSection() {
  return (
    <section className="relative min-h-screen py-24 px-6 md:px-24 bg-[#050505] z-10">
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 text-center">
          Featured Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="group relative bg-[#111111] border border-white/5 hover:border-[#58a6ff]/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(88,166,255,0.15)] flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-black rounded-lg border border-white/10">
                {project.icon}
              </div>
              <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#58a6ff] transition-colors">
              {project.title}
            </h3>
            
            <p className="text-gray-400 mb-6 flex-grow">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
              {project.tech.map((t) => (
                <span key={t} className="px-3 py-1 text-xs font-mono text-[#58a6ff] bg-[#58a6ff]/10 rounded-full border border-[#58a6ff]/20">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
