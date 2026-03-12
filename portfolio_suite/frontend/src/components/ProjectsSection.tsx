"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Spatial Tracker",
    category: "AI / Computer Vision",
    description: "Advanced spatial tracking engine utilizing PyTorch and OpenCV for real-time mapping and object detection with centimeter-level accuracy.",
    tech: ["Python", "PyTorch", "OpenCV", "NumPy"],
    link: "https://github.com/RajTewari01/spatial-tracker",
    size: "large",
  },
  {
    id: "02",
    title: "LeetCode Dashboard",
    category: "Web / Dashboard",
    description: "Dynamic algorithmic progress visualizer. .",
    tech: ["Next.js", "React", "REST API", "Vercel"],
    link: "https://github.com/RajTewari01/LeetCode",
    size: "medium",
  },
  {
    id: "03",
    title: "QR Engine",
    category: "Tooling / Desktop",
    description: "Robust QR generation engine wrapped in a standalone executable binary with GUI interface via PyQt.",
    tech: ["Python", "PyQt5", "QRCode", "PyInstaller"],
    link: "https://github.com/RajTewari01/QR_CODE_GENERATOR_WITH_EXE",
    size: "medium",
  },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="relative z-10 bg-black py-32 md:py-48 px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-[1400px] mx-auto">

        {/* Section header */}
        <div className="flex items-end justify-between mb-20 md:mb-32">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-xs tracking-[0.4em] uppercase text-white/30 block mb-6"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Selected Projects
            </motion.span>
            <motion.h2
              initial={{ y: 80, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-8xl font-black tracking-[-0.04em] uppercase gradient-text"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Work.
            </motion.h2>
          </div>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.3em] uppercase text-white/20 hidden md:block"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ({String(projects.length).padStart(2, "0")})
          </motion.span>
        </div>

        {/* Project list */}
        <div className="space-y-2">
          {projects.map((project, index) => (
            <motion.a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group block"
              data-cursor-hover
            >
              {/* Divider line */}
              <div className="section-line" />

              <div className="py-10 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-500 group-hover:pl-4">
                
                <div className="flex items-start md:items-center gap-6 md:gap-12">
                  {/* Number */}
                  <span className="text-xs text-white/20 pt-2 md:pt-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {project.id}
                  </span>

                  {/* Title & Category */}
                  <div>
                    <h3 
                      className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white group-hover:gradient-text-accent transition-all duration-500"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs tracking-[0.3em] uppercase text-white/30 mt-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Description & Arrow */}
                <div className="flex items-center gap-8 md:gap-16">
                  <p className="text-white/40 text-sm max-w-xs hidden lg:block font-light leading-relaxed">
                    {project.description}
                  </p>

                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
          <div className="section-line" />
        </div>

      </div>
    </section>
  );
}
