"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "Spatial Tracker",
    category: "AI / COMPUTER VISION",
    description: "Advanced spatial tracking engine utilizing PyTorch and OpenCV for real-time mapping.",
    link: "https://github.com/RajTewari01/spatial-tracker",
    colSpan: "md:col-span-8",
    color: "from-blue-500/20 to-transparent",
    height: "h-[500px]"
  },
  {
    title: "LeetCode Visualizer",
    category: "WEB / DASHBOARD",
    description: "Dynamic algorithmic progress tracker pulling live data through GitHub integrations.",
    link: "https://github.com/RajTewari01/LeetCode",
    colSpan: "md:col-span-4",
    color: "from-purple-500/20 to-transparent",
    height: "h-[500px]"
  },
  {
    title: "QR CLI",
    category: "TOOLING",
    description: "Robust execution engine wrapped in a deployable binary.",
    link: "https://github.com/RajTewari01/QR_CODE_GENERATOR_WITH_EXE",
    colSpan: "md:col-span-12",
    color: "from-green-500/10 to-transparent",
    height: "h-[300px]"
  }
];

export default function ProjectsSection() {
  return (
    <section className="relative min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black z-10 selection:bg-white selection:text-black">
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="mb-24 flex items-end justify-between border-b border-white/10 pb-8"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
            Selected<br/><span className="text-white/30">Works.</span>
          </h2>
          <span className="text-white/50 text-sm tracking-widest uppercase hidden md:block">2026 Archive</span>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`group relative rounded-3xl border border-white/10 bg-[#0a0a0a] overflow-hidden ${project.colSpan} ${project.height}`}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <a href={project.link} target="_blank" rel="noreferrer" className="block w-full h-full p-10 relative z-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs tracking-widest uppercase text-white/50 font-mono">
                    {project.category}
                  </span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center bg-black/50 group-hover:bg-white group-hover:text-black transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/60 font-light max-w-md">
                    {project.description}
                  </p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
