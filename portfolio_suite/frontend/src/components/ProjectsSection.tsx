"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  title: string;
  type: string;
  desc: string;
  link: string;
}

// ─── Hardcoded fallback projects (always shown) ───
const fallbackProjects: Project[] = [
  {
    id: "01",
    title: "Spatial Tracer",
    type: "AI Vision Engine",
    desc: "PyTorch & OpenCV based realtime spatial computing module achieving sub-centimeter point tracking accuracy at 60fps.",
    link: "https://github.com/RajTewari01/spatial_tracer",
  },
  {
    id: "02",
    title: "LeetCode Grind",
    type: "DSA Archive",
    desc: "Systematic problem-solving repository with optimized solutions across arrays, trees, graphs, and dynamic programming.",
    link: "https://github.com/RajTewari01/leetcode",
  },
  {
    id: "03",
    title: "Portfolio Nexus",
    type: "Full-Stack Platform",
    desc: "This very site — Next.js 16, Three.js GLSL shaders, GSAP cinematic animations, and a brutalist design system.",
    link: "https://github.com/RajTewari01",
  },
];


export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [dynamicProjects, setDynamicProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);

  // ─── Fetch projects from Firestore ───
  useEffect(() => {
    (async () => {
      try {
        const { getDocs, collection, orderBy, query } = await import("firebase/firestore");
        const { db } = await import("@/lib/firebase");
        const snap = await getDocs(query(collection(db, "projects"), orderBy("createdAt", "desc")));
        const firestoreProjects: Project[] = snap.docs.map((d, i) => {
          const data = d.data();
          return {
            id: String(fallbackProjects.length + i + 1).padStart(2, "0"),
            title: data.title || "Untitled",
            type: data.type || data.description || "Project",
            desc: data.description || "",
            link: data.link || "#",
          };
        });
        setDynamicProjects(firestoreProjects);
      } catch (err) {
        console.warn("Firestore fetch failed, using fallback only:", err);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Merge: hardcoded first, then Firestore projects
  const allProjects = [...fallbackProjects, ...dynamicProjects];

  // ─── GSAP Animations (re-run when projects load) ───
  useEffect(() => {
    if (!loaded) return;

    const ctx = gsap.context(() => {
      // ─── Header: Scroll-driven scale + opacity ───
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { scale: 0.6, opacity: 0.3, filter: "blur(8px)" },
          {
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 1.5,
            },
          }
        );
      }

      // ─── Project cards: Staggered reveal with different effects ───
      const cards = sectionRef.current?.querySelectorAll(".project-row");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 60,
              x: i % 2 === 0 ? -30 : 30,
              filter: "blur(6px)",
              rotateY: i % 2 === 0 ? -3 : 3,
            },
            {
              opacity: 1,
              y: 0,
              x: 0,
              filter: "blur(0px)",
              rotateY: 0,
              duration: 1.2,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [loaded, allProjects.length]);

  return (
    <section id="work" className="relative section-pad-y" ref={sectionRef}>
      <div className="section-pad-x">
        
        {/* ─── Header Block ─── */}
        <div className="flex flex-col gap-8 mb-24 md:mb-32">
          <div className="z-10">
            <div className="flex items-center gap-3 w-fit bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl border border-white/5">
              <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full glow-pulse" />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/70">Selected Archives</p>
            </div>
            <h2
              ref={headerRef}
              className="font-syne text-[12vw] sm:text-[10vw] lg:text-[8vw] font-black uppercase mt-4 tracking-[-0.08em] leading-none whitespace-nowrap origin-left"
              style={{ textShadow: "0 10px 40px rgba(0,0,0,0.7), 0 0 80px rgba(99,102,241,0.1)" }}
            >
              <span className="text-white/90">Oper</span>
              <span className="gradient-text-accent">ations.</span>
            </h2>
          </div>
          <div className="z-10 self-start md:self-end md:w-1/2 lg:w-5/12 max-w-lg bg-black/20 backdrop-blur-md px-6 py-5 rounded-2xl border border-white/5">
            <p className="text-sm md:text-base text-white/90 font-light leading-relaxed md:text-right" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
              Engineering is the art of constraint. These systems represent the intersection of complex high-performance backends and ruthless minimalist frontends. Built to execute perfectly, every time.
            </p>
          </div>
        </div>

        {/* ─── Project List ─── */}
        <div className="w-full flex flex-col" style={{ perspective: "1200px" }}>
          {allProjects.map((p) => (
            <a 
              key={p.id}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="project-row group relative grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-8 md:py-16 hover:bg-white/[0.015] transition-all duration-500 z-10 rounded-lg"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Hover highlight line */}
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-indigo-500 via-cyan-400 to-transparent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              
              {/* Top separator */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/[0.04]" />

              <div className="col-span-12 md:col-span-1">
                <span className="inline-block bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/10 font-mono text-xs text-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)] group-hover:text-indigo-400 transition-colors duration-500">
                  {p.id}
                </span>
              </div>
              
              <div className="col-span-12 md:col-span-6">
                <h3
                  className="font-syne text-[8vw] sm:text-[6vw] md:text-[4.5vw] font-extrabold uppercase tracking-tighter text-white/85 group-hover:text-white transition-all duration-500 group-hover:translate-x-4 ease-out transform leading-[0.85]"
                  style={{ textShadow: "0 8px 30px rgba(0,0,0,0.7)" }}
                >
                  {p.title}
                </h3>
              </div>

              <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
                <span className="w-fit bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-lg border border-white/10 text-[10px] tracking-[0.2em] font-mono text-indigo-400 font-bold uppercase shadow-[0_4px_20px_rgba(0,0,0,0.8)]">{p.type}</span>
                <p className="text-sm text-white/90 font-light leading-relaxed group-hover:text-white transition-colors duration-500 bg-black/80 backdrop-blur-xl px-5 py-4 rounded-xl border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.8)]" style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                  {p.desc}
                </p>
              </div>

              <div className="col-span-12 md:col-span-1 flex justify-end">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black group-hover:border-white group-hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-500 -rotate-45 group-hover:rotate-0 bg-white/[0.02] backdrop-blur-sm">
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
