"use client";

export default function MarqueeBanner() {
  const items = "PYTHON  •  DART  •  KOTLIN  •  FLUTTER  •  FASTAPI  •  DJANGO  •  PYTORCH  •  LANGCHAIN  •  DOCKER  •  K8S  •  AWS  •  NEXT.JS  •  THREE.JS  •  STABLE DIFFUSION  •  POSTGRESQL  •  ORACLE SQL  •  ";

  return (
    <div className="relative py-5 sm:py-6 border-y border-white/[0.04] bg-black overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.12] font-mono">{items}</span>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.12] font-mono">{items}</span>
        <span className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-white/[0.12] font-mono">{items}</span>
      </div>
    </div>
  );
}
