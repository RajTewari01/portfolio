"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: "01",
    title: "Spatial Tracker",
    category: "AI / Computer Vision",
    description: "Real-time spatial tracking engine with centimeter-level accuracy using PyTorch and OpenCV.",
    tech: ["Python", "PyTorch", "OpenCV"],
    link: "https://github.com/RajTewari01/spatial-tracker",
  },
  {
    id: "02",
    title: "LeetCode Dashboard",
    category: "Web / Dashboard",
    description: "Dynamic algorithmic progress visualizer with live data through GitHub API integrations.",
    tech: ["Next.js", "React", "API"],
    link: "https://github.com/RajTewari01/LeetCode",
  },
  {
    id: "03",
    title: "QR Engine",
    category: "Tooling / Desktop",
    description: "QR generation engine wrapped in a standalone executable binary with PyQt GUI.",
    tech: ["Python", "PyQt5", "PyInstaller"],
    link: "https://github.com/RajTewari01/QR_CODE_GENERATOR_WITH_EXE",
  },
];

export default function ProjectsSection() {
  return (
    <section id="work" className="relative bg-black py-24 sm:py-32 md:py-40 section-padding">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="animate-in flex flex-col sm:flex-row sm:items-end justify-between mb-16 sm:mb-24">
          <div>
            <span className="text-[11px] tracking-[0.4em] uppercase text-white/25 block mb-4 font-mono">
              Selected Projects
            </span>
            <h2
              className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] uppercase gradient-text"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Work.
            </h2>
          </div>
          <span className="text-[11px] tracking-[0.3em] uppercase text-white/15 font-mono mt-4 sm:mt-0">
            ({String(projects.length).padStart(2, "0")})
          </span>
        </div>

        {/* Project list */}
        <div>
          {projects.map((project, index) => (
            <a
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="animate-in group block"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="section-line" />
              <div className="py-8 sm:py-12 md:py-14 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group-hover:translate-x-2 transition-transform duration-500">

                <div className="flex items-start md:items-center gap-4 sm:gap-6 md:gap-10">
                  <span className="text-[11px] text-white/15 font-mono pt-1 md:pt-0 shrink-0">{project.id}</span>
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white group-hover:text-[#6366f1] transition-colors duration-500"
                      style={{ fontFamily: "'Syne', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[11px] tracking-[0.25em] uppercase text-white/25 mt-2 font-mono">
                      {project.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 md:gap-10 md:shrink-0">
                  <p className="text-white/35 text-sm max-w-[280px] hidden lg:block font-light leading-relaxed">
                    {project.description}
                  </p>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/8 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45 transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
            </a>
          ))}
          <div className="section-line" />
        </div>
      </div>
    </section>
  );
}
