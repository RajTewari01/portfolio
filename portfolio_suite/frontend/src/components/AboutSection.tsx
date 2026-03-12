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
    <section id="about" className="relative bg-black py-24 sm:py-32 md:py-40 section-padding">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="animate-in mb-16 sm:mb-20">
          <span className="text-[11px] tracking-[0.4em] uppercase text-white/25 block mb-4 font-mono">About</span>
          <h2
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] uppercase gradient-text"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            About.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Left — Image (2 cols) */}
          <div className="animate-in lg:col-span-2">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5">
              <Image src="/profile.jpg" alt="Biswadeep Tewari" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="text-white/80 text-sm font-medium">MAKAUT University</p>
                <p className="text-white/35 text-[11px] font-mono">West Bengal, India 🇮🇳</p>
              </div>
            </div>
            <p className="text-white/40 text-sm sm:text-base font-light leading-[1.8] mt-6">
              I build at the intersection of
              <span className="text-white/80"> engineering</span> and
              <span className="text-white/80"> creativity</span>.
              My motto: <span className="gradient-text-accent font-medium">build → ship → learn → repeat</span>.
            </p>
          </div>

          {/* Right — Stats + Skills (3 cols) */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="animate-in grid grid-cols-3 gap-6 mb-12 pb-12 border-b border-white/5">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl sm:text-5xl font-black gradient-text-accent" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {stat.number}
                  </p>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/25 mt-1 font-mono">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="space-y-6">
              {skills.map((skill, i) => (
                <div key={skill.category} className="animate-in" style={{ transitionDelay: `${i * 60}ms` }}>
                  <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-white/25 mb-2 font-mono">
                    {skill.category}
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {skill.items.map((item) => (
                      <span key={item} className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm text-white/60 border border-white/8 rounded-full hover:border-white/25 hover:text-white/90 transition-all duration-300">
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
