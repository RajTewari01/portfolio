"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { group: "Core Languages", tech: ["Python / Cython", "TypeScript", "Dart / Kotlin", "Java", "SQL"] },
  { group: "Artificial Intelligence", tech: ["PyTorch / TensorFlow", "LangChain / LangGraph", "RAG Systems", "Stable Diffusion"] },
  { group: "Architecture & Ops", tech: ["Docker / Kubernetes", "AWS", "FastAPI / Django", "Vector DBs"] }
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ─── Heading: scroll-driven parallax + scale ───
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { y: 80, opacity: 0, filter: "blur(12px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // ─── Counter animation for stats ───
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target") || "0");
          gsap.fromTo(
            counter,
            { innerText: "0" },
            {
              innerText: target,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: counter,
                start: "top 85%",
              },
            }
          );
        });
      }

      // ─── Skills: staggered fade-in from bottom ───
      const skillRows = sectionRef.current?.querySelectorAll(".skill-row");
      if (skillRows) {
        gsap.fromTo(
          skillRows,
          { opacity: 0, y: 30, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: skillRows[0],
              start: "top 85%",
            },
          }
        );
      }

      // ─── Image reveal: clip-path wipe ───
      const imageContainer = sectionRef.current?.querySelector(".image-reveal");
      if (imageContainer) {
        gsap.fromTo(
          imageContainer,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: imageContainer,
              start: "top 80%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative section-pad-y" ref={sectionRef}>
      <div className="section-pad-x">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* ─── Left: Statement ─── */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10 w-fit bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
                <div className="w-1.5 h-1.5 bg-cyan-400 glow-pulse" />
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/70">The Architect</p>
              </div>
              <h2
                ref={headingRef}
                className="font-syne text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]"
                style={{ textShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
              >
                Building <br />
                <span className="text-white/20">The</span> Future <br />
                <span className="gradient-text-accent">Layer.</span>
              </h2>
              
              <p className="mt-8 text-white/90 font-light leading-relaxed max-w-md bg-black/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/5" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                I operate at the bleeding edge of engineering and creativity. 
                Whether it&apos;s orchestrating high-throughput LangChain agent systems, 
                deploying centimeter-level computer vision models, or crafting 
                60fps cross-platform mobile applications — the motto remains absolute:
              </p>
              <p className="mt-4 w-fit bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5 font-mono text-xs tracking-widest text-indigo-400 uppercase">
                [ Build → Ship → Learn → Repeat ]
              </p>
            </div>

            {/* ─── Glass Stats Cards ─── */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 mt-16 lg:mt-32">
              <div className="glass-card rounded-xl p-6 group">
                <p className="stat-number font-syne text-5xl md:text-7xl font-black tracking-tighter text-white" data-target="3">0</p>
                <span className="text-5xl md:text-7xl font-syne font-black text-indigo-400">+</span>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/70 mt-3 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 w-fit group-hover:text-white transition-colors">Years Active</p>
              </div>
              <div className="glass-card rounded-xl p-6 group flex flex-col justify-between">
                <div>
                  <p className="stat-number font-syne inline text-5xl md:text-7xl font-black tracking-tighter text-white" data-target="15">0</p>
                  <span className="text-5xl md:text-7xl font-syne font-black text-cyan-400">+</span>
                </div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/70 mt-3 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 w-fit group-hover:text-white transition-colors">Systems Shipped</p>
              </div>
            </div>
          </div>

          {/* ─── Right: Image + Skills ─── */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col pt-4 lg:pt-0">
            
            {/* Profile Image: Clip-path reveal + grayscale hover */}
            <div className="image-reveal relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] overflow-hidden rounded-xl group">
               <Image 
                 src="/profile.jpg" 
                 alt="Biswadeep Tewari" 
                 width={800}
                 height={600}
                 className="object-cover w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
               {/* Glass overlay info */}
               <div className="absolute bottom-0 left-0 right-0 p-6 bg-black/60 backdrop-blur-xl border-t border-white/10 rounded-b-xl">
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="font-mono text-xs tracking-widest text-white uppercase">Makaut University</p>
                     <p className="font-syne font-bold text-white/80 text-sm mt-1">West Bengal, India</p>
                   </div>
                   <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                 </div>
               </div>
            </div>

            {/* ─── Skills Ontology ─── */}
            <div className="mt-12 space-y-0">
              {skills.map((s, i) => (
                <div key={i} className="skill-row flex flex-col sm:flex-row sm:items-baseline border-b border-white/[0.06] py-6 group">
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 bg-black/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/5 sm:w-1/3 w-fit mb-4 sm:mb-0 xl:mr-2 group-hover:text-indigo-300 group-hover:bg-indigo-500/10 transition-colors duration-500">
                    {s.group}
                  </span>
                  <div className="sm:w-2/3 flex flex-wrap gap-x-4 gap-y-2">
                    {s.tech.map((tech, j) => (
                      <span
                        key={j}
                        className="text-sm font-light text-white/65 hover:text-cyan-400 transition-all duration-300 cursor-default hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]"
                      >
                        {tech}{j !== s.tech.length - 1 ? <span className="text-white/15 ml-4 hidden sm:inline-block">/</span> : ""}
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
