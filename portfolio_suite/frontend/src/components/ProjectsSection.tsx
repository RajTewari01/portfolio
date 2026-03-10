"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Cpu, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Spatial Tracker",
    description: "Advanced spatial tracking engine utilizing computer vision. Real-time mapping and object detection with high accuracy.",
    tech: ["Python", "PyTorch", "OpenCV"],
    github: "https://github.com/RajTewari01/spatial-tracker",
    live: "#",
    icon: <Cpu className="w-8 h-8 text-[#58a6ff]" />
  },
  {
    title: "LeetCode Dashboard",
    description: "Dynamic algorithmic progress tracker pulling live data through GitHub integrations.",
    tech: ["Next.js", "REST API", "React"],
    github: "https://github.com/RajTewari01/LeetCode",
    live: "#",
    icon: <Code2 className="w-8 h-8 text-[#a100ff]" />
  },
  {
    title: "QR Code Generator",
    description: "Robust QR code generation tool deployed as an executable executable format via PyQt.",
    tech: ["Python", "PyQt", "CLI"],
    github: "https://github.com/RajTewari01/QR_CODE_GENERATOR_WITH_EXE",
    live: "#",
    icon: <ExternalLink className="w-8 h-8 text-[#3fb950]" />
  }
];

export default function ProjectsSection() {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-[#020202] z-10 selection:bg-[#58a6ff]/30">
      
      {/* Background glow for section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#58a6ff]/5 blur-[120px] rounded-[100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="text-[#58a6ff] font-mono tracking-widest text-sm uppercase mb-4 block">Selected Works</span>
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 tracking-tighter">
              Featured<br/>Projects.
            </h2>
          </div>
          <p className="text-gray-400 max-w-md text-lg font-light">
            A selection of my best engineering feats, ranging from computer vision algorithms to full-stack applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 hover:border-[#58a6ff]/30 rounded-[2rem] p-8 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col h-[400px] overflow-hidden"
            >
              {/* Card Hover Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#58a6ff]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#58a6ff]/20 transition-colors duration-500" />

              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  {project.icon}
                </div>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:rotate-12 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>

              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                  {project.title}
                </h3>
                
                <p className="text-gray-400/80 mb-8 font-light leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-xs font-mono font-medium text-[#c9d1d9] bg-[#1a1a1a] rounded-lg border border-white/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
