"use client";

export default function MarqueeBanner() {
  const row1 = "PYTHON  •  DART  •  KOTLIN  •  FLUTTER  •  FASTAPI  •  DJANGO  •  PYTORCH  •  LANGCHAIN  •  DOCKER  •  K8S  •  AWS  •  NEXT.JS  •  THREE.JS  •  STABLE DIFFUSION  •  POSTGRESQL  •  ORACLE SQL  •  ";
  const row2 = "• REACT  •  TYPESCRIPT  •  TAILWIND  •  GSAP  •  TENSORFLOW  •  SELENIUM  •  FIGMA  •  CYTHON  •  VECTOR DBS  •  RAG SYSTEMS  •  LANGRAPH  •  GLSL  •  FIREBASE  •  GIT • ";

  return (
    <div className="relative py-8 sm:py-10 border-y border-white/[0.04] bg-black/40 backdrop-blur-sm overflow-hidden">
      {/* Gradient fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
      
      {/* Row 1: Left to Right */}
      <div className="flex whitespace-nowrap animate-marquee mb-3">
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.15] font-mono">{row1}</span>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.15] font-mono">{row1}</span>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.15] font-mono">{row1}</span>
      </div>
      
      {/* Row 2: Right to Left (opposite direction) */}
      <div className="flex whitespace-nowrap animate-marquee-reverse">
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.08] font-mono">{row2}</span>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.08] font-mono">{row2}</span>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.08] font-mono">{row2}</span>
      </div>
    </div>
  );
}
