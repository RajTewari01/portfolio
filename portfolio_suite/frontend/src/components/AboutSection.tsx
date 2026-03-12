"use client";

import Image from "next/image";

const skills = [
  { group: "Core Languages", tech: ["Python / Cython", "TypeScript", "Dart / Kotlin", "Java", "SQL"] },
  { group: "Artificial Intelligence", tech: ["PyTorch / TensorFlow", "LangChain / LangGraph", "RAG Systems", "Stable Diffusion"] },
  { group: "Architecture & Ops", tech: ["Docker / Kubernetes", "AWS", "FastAPI / Django", "Vector DBs"] }
];

export default function AboutSection() {
  return (
    <section id="about" className="relative section-pad-y border-t border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="section-pad-x">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Massive Statement */}
          <div className="cinematic-reveal lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-1.5 h-1.5 bg-cyan-400" />
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50">The Architect</p>
              </div>
              <h2 className="font-syne text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                Building <br />
                <span className="text-white/20">The</span> Future <br />
                <span className="text-cyan-400">Layer.</span>
              </h2>
              
              <p className="mt-8 text-white/50 font-light leading-relaxed max-w-md">
                I operate at the bleeding edge of engineering and creativity. 
                Whether it's orchestrating high-throughput LangChain agent systems, 
                deploying centimeter-level computer vision models, or crafting 
                60fps cross-platform mobile applications — the motto remains absolute:
              </p>
              <p className="mt-4 font-mono text-xs tracking-widest text-indigo-400 uppercase">
                [ Build → Ship → Learn → Repeat ]
              </p>
            </div>

            {/* Brutalist Stats */}
            <div className="grid grid-cols-2 gap-8 mt-16 lg:mt-32 pt-12 border-t border-white/10">
              <div>
                <p className="font-syne text-5xl md:text-7xl font-black tracking-tighter text-white">3+</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mt-2">Years Active</p>
              </div>
              <div>
                <p className="font-syne text-5xl md:text-7xl font-black tracking-tighter text-white">15+</p>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 mt-2">Systems Shipped</p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Image & Structured Data */}
          <div className="cinematic-reveal lg:col-span-6 lg:col-start-7 flex flex-col pt-4 lg:pt-0">
            
            {/* Aspect/Editorial Image */}
            <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-sm filter grayscale hover:grayscale-0 transition-all duration-700">
               <Image 
                 src="/profile.jpg" 
                 alt="Biswadeep Tewari - Headshot" 
                 width={800}
                 height={600}
                 className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
               <div className="absolute bottom-6 left-6 flex justify-between w-[calc(100%-48px)] items-end">
                 <div>
                   <p className="font-mono text-xs tracking-widest text-white/80 uppercase">Makaut University</p>
                   <p className="font-syne font-bold text-white/40 text-sm mt-1">West Bengal, India</p>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-white/20 animate-ping" />
               </div>
            </div>

            {/* Technical Ontology */}
            <div className="mt-12 space-y-8">
              {skills.map((s, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline border-b border-white/10 pb-6">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40 sm:w-1/3 mb-4 sm:mb-0">
                    {s.group}
                  </span>
                  <div className="sm:w-2/3 flex flex-wrap gap-x-4 gap-y-2">
                    {s.tech.map((tech, j) => (
                      <span key={j} className="text-sm font-light text-white/80 hover:text-cyan-400 transition-colors cursor-default">
                        {tech}{j !== s.tech.length - 1 ? <span className="text-white/20 ml-4 hidden sm:inline-block">/</span> : ""}
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
