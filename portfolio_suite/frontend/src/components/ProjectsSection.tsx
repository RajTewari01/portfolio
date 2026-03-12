"use client";

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
    <section id="work" className="relative bg-black section-padding">
      {/* Top separator */}
      <div className="h-[1px] bg-white/[0.04]" />

      <div className="max-w-[1100px] mx-auto py-28 sm:py-36 md:py-44">
        {/* Header */}
        <div className="animate-in flex flex-col sm:flex-row sm:items-end justify-between mb-20 sm:mb-28">
          <div>
            <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-white/20 block mb-3 font-mono">
              Selected Projects
            </span>
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] uppercase gradient-text"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Work
            </h2>
          </div>
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/12 font-mono mt-3 sm:mt-0">
            ({String(projects.length).padStart(2, "0")})
          </span>
        </div>

        {/* Project list */}
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noreferrer"
            className="animate-in group block border-t border-white/[0.05]"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
            <div className="py-10 sm:py-14 md:py-16 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8 group-hover:translate-x-1 transition-transform duration-600 ease-out">

              <div className="flex items-start md:items-center gap-5 sm:gap-8 min-w-0">
                <span className="text-[10px] text-white/12 font-mono pt-1.5 md:pt-0 shrink-0 w-5">{project.id}</span>
                <div className="min-w-0">
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white/90 group-hover:text-[#6366f1] transition-colors duration-400"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/20 mt-1.5 font-mono">
                    {project.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 md:gap-8 shrink-0 pl-10 md:pl-0">
                <p className="text-white/30 text-[13px] max-w-[240px] hidden lg:block font-light leading-relaxed">
                  {project.description}
                </p>
                <div className="w-10 h-10 rounded-full border border-white/[0.06] flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:rotate-45 transition-all duration-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </a>
        ))}
        <div className="h-[1px] bg-white/[0.05]" />
      </div>
    </section>
  );
}
