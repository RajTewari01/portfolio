"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { number: "3+", label: "Years Experience" },
  { number: "15+", label: "Projects Built" },
  { number: "5+", label: "Tech Stacks" },
];

const skills = [
  { category: "Languages", items: ["Python", "TypeScript", "Dart", "JavaScript", "C++"] },
  { category: "Frontend", items: ["React", "Next.js", "Three.js", "Flutter", "Tailwind"] },
  { category: "Backend", items: ["FastAPI", "Node.js", "Firebase", "PostgreSQL", "REST"] },
  { category: "AI / ML", items: ["PyTorch", "OpenCV", "TensorFlow", "Scikit-learn", "NumPy"] },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative z-10 bg-black py-24 md:py-32 px-8 md:px-16 lg:px-24 xl:px-32">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.4em] uppercase text-white/30 block mb-6"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            About
          </motion.span>
          <motion.h2
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-black tracking-[-0.04em] uppercase gradient-text"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            About.
          </motion.h2>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 mb-20">
          
          {/* Left — Image + Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-10 border border-white/5">
              <Image 
                src="/profile.jpg" 
                alt="Biswadeep Tewari" 
                fill 
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>
            <p className="text-white/50 text-base md:text-lg font-light leading-[1.8] max-w-lg">
              I am an engineer who believes that the best software is built at the intersection of 
              <span className="text-white font-medium"> technical excellence</span> and 
              <span className="text-white font-medium"> creative vision</span>. 
              From training neural networks to crafting pixel-perfect interfaces, 
              I obsess over every detail to deliver experiences that feel alive.
            </p>
          </motion.div>

          {/* Right — Stats + Skills */}
          <div>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="grid grid-cols-3 gap-8 mb-16 pb-16 border-b border-white/5"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p 
                    className="text-4xl md:text-6xl font-black gradient-text-accent mb-2"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {stat.number}
                  </p>
                  <p className="text-xs tracking-[0.2em] uppercase text-white/30" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <div className="space-y-10">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <p className="text-xs tracking-[0.3em] uppercase text-white/30 mb-4" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {skill.category}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 text-sm text-white/70 border border-white/10 rounded-full hover:border-[#6366f1]/50 hover:text-white transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
