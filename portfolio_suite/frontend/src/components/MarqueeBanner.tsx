"use client";

export default function MarqueeBanner() {
  const words = [
    "PYTHON", "•", "DART", "•", "KOTLIN", "•", "FLUTTER", "•",
    "FASTAPI", "•", "DJANGO", "•", "PYTORCH", "•", "LANGCHAIN", "•",
    "DOCKER", "•", "KUBERNETES", "•", "AWS", "•", "REACT", "•",
    "NEXT.JS", "•", "THREE.JS", "•", "STABLE DIFFUSION", "•",
    "FIREBASE", "•", "POSTGRESQL", "•", "ORACLE SQL", "•",
  ];

  const marqueeContent = words.join("  ");

  return (
    <div className="relative z-10 py-8 border-y border-white/5 bg-black/80 backdrop-blur-sm overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-sm md:text-base tracking-[0.4em] uppercase text-white/20 font-light mx-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {marqueeContent}
        </span>
        <span className="text-sm md:text-base tracking-[0.4em] uppercase text-white/20 font-light mx-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {marqueeContent}
        </span>
        <span className="text-sm md:text-base tracking-[0.4em] uppercase text-white/20 font-light mx-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {marqueeContent}
        </span>
      </div>
    </div>
  );
}
