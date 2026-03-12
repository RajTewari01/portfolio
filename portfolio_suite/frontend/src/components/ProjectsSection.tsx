import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Spatial Tracer",
    type: "AI Vision Engine",
    desc: "PyTorch & OpenCV based realtime spatial computing module achieving sub-centimeter point tracking accuracy at 60fps.",
    link: "https://github.com/RajTewari01/spatial_tracer"
  },
  {
    id: "02",
    title: "Algorithm Dashboard",
    type: "Data Visualizer",
    desc: "React & Next.js dashboard hooked to Github & LeetCode APIs, providing a clean interface to view and track answered competitive programming problems.",
    link: "https://github.com/RajTewari01/leetCode"
  },
  {
    id: "03",
    title: "QR Node Engine",
    type: "Binary Executable",
    desc: "A pure PyQt/Python desktop tooling software bundled into an isolated binary for high-fidelity vector QR generation.",
    link: "https://github.com/RajTewari01/QR_CODE_GENERATOR_WITH_EXE"
  }
];

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;
    const chars = headerRef.current.querySelectorAll(".type-char");
    
    gsap.fromTo(chars, 
      { opacity: 0, filter: "blur(10px)", y: 20 },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <section id="work" className="relative section-pad-y bg-transparent" ref={containerRef}>
      <div className="section-pad-x">
        
        {/* Header Block */}
        <div className="cinematic-reveal flex flex-col gap-8 mb-24 md:mb-32">
          <div className="z-10">
             <div className="flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
               <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 drop-shadow-md">Selected Archives</p>
             </div>
             <h2 ref={headerRef} className="font-syne text-[11vw] sm:text-[9vw] lg:text-[7.5vw] font-black uppercase mt-4 tracking-[-0.08em] mix-blend-difference leading-none whitespace-nowrap drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)] inline-block">
               <span>Oper</span>
               <span className="inline-flex text-white/95">
                 {"ations.".split("").map((char, i) => (
                   <span key={i} className="type-char opacity-0 inline-block filter blur-md">{char}</span>
                 ))}
               </span>
             </h2>
          </div>
          <div className="z-10 self-start md:self-end md:w-1/2 lg:w-5/12 max-w-lg">
            <p className="text-sm md:text-base text-white/60 font-medium leading-relaxed drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] md:text-right">
              Engineering is the art of constraint. These systems represent the intersection of complex high-performance backends and ruthless minimalist frontends. Built to execute perfectly, every time.
            </p>
          </div>
        </div>

        {/* Project List: Apple Editorial Style (Refined with shadow text) */}
        <div className="w-full flex flex-col pt-10">
          {projects.map((p, i) => (
            <a 
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="cinematic-reveal group relative grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center border-b border-white/5 py-16 hover:bg-white/[0.015] transition-colors duration-500 z-10"
            >
              {/* Subtle gradient hover highlight */}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <div className="col-span-12 md:col-span-1">
                <span className="font-mono text-xs text-white/30 group-hover:text-indigo-400 transition-colors drop-shadow-md">{p.id}</span>
              </div>
              
              <div className="col-span-12 md:col-span-6">
                <h3 className="font-syne text-[8vw] sm:text-[6vw] md:text-[5vw] font-extrabold uppercase tracking-tighter text-white/90 group-hover:text-white transition-all duration-500 group-hover:translate-x-4 ease-out transform drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] leading-[0.85]">
                  {p.title}
                </h3>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
                <span className="text-[10px] tracking-[0.2em] font-mono text-indigo-400 uppercase drop-shadow-md">{p.type}</span>
                <p className="text-sm text-white/60 font-medium leading-relaxed group-hover:text-white/80 transition-colors drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                  {p.desc}
                </p>
              </div>

              <div className="col-span-12 md:col-span-1 flex justify-end">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-500 -rotate-45 group-hover:rotate-0 drop-shadow-xl shadow-inner bg-black/20 backdrop-blur-sm">
                  <span className="font-syne font-bold text-xl">→</span>
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
