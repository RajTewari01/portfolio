"use client";

import Image from "next/image";

const stats = [
  { number: "3+", label: "Years" },
  { number: "15+", label: "Projects" },
  { number: "7+", label: "Languages" },
];

const skills = [
  { category: "Languages", items: ["Python", "Cython", "Dart", "Kotlin", "Java", "JavaScript", "SQL"] },
  { category: "AI / ML", items: ["LangChain", "LangGraph", "PyTorch", "TensorFlow", "RAG", "Stable Diffusion"] },
  { category: "Backend", items: ["FastAPI", "Django", "Flask"] },
  { category: "Mobile", items: ["Flutter", "Kotlin", "Java (Android)"] },
  { category: "Cloud", items: ["Docker", "Kubernetes", "AWS"] },
  { category: "Databases", items: ["Oracle SQL", "PostgreSQL", "SQLite", "Vector DBs"] },
  { category: "Automation", items: ["Selenium", "Web Scraping", "Pipelines"] },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-black section-padding">
      <div className="h-[1px] bg-white/[0.04]" />

      <div className="max-w-[1100px] mx-auto py-28 sm:py-36 md:py-44">
        {/* Header */}
        <div className="animate-in mb-20 sm:mb-28">
          <span className="text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-white/20 block mb-3 font-mono">About</span>
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-[-0.04em] uppercase gradient-text"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            About
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20">

          {/* Image column */}
          <div className="animate-in lg:col-span-5">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/[0.04] mb-8">
              <Image src="/profile.jpg" alt="Biswadeep Tewari" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white/80 text-sm font-medium">MAKAUT University</p>
                <p className="text-white/30 text-[10px] font-mono mt-0.5">West Bengal, India 🇮🇳</p>
              </div>
            </div>
            <p className="text-white/35 text-sm font-light leading-[1.9]">
              I build at the intersection of
              <span className="text-white/70"> engineering</span> and
              <span className="text-white/70"> creativity</span>.
              From orchestrating LangChain agent systems to shipping Flutter apps — my motto:
              <span className="gradient-text-accent font-medium"> build → ship → learn → repeat</span>.
            </p>
          </div>

          {/* Stats + Skills column */}
          <div className="lg:col-span-7">
            {/* Stats */}
            <div className="animate-in grid grid-cols-3 gap-6 sm:gap-8 mb-14 pb-14 border-b border-white/[0.04]">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text-accent" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {stat.number}
                  </p>
                  <p className="text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/20 mt-1 font-mono">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-7">
              {skills.map((skill, i) => (
                <div key={skill.category} className="animate-in" style={{ transitionDelay: `${i * 50}ms` }}>
                  <p className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-white/20 mb-2.5 font-mono">
                    {skill.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skill.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 text-[12px] sm:text-[13px] text-white/50 border border-white/[0.06] rounded-full hover:border-white/20 hover:text-white/80 transition-all duration-300 cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
