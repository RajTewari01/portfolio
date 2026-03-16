"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import ThreeCanvas from "@/components/ThreeCanvas";

export default function HirePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    message: ""
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate elements in
      gsap.fromTo(
        ".hire-stagger",
        { y: 30, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", budget: "", message: "" });
      
      // Auto reset success state after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
      
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred");
    }
  };

  return (
    <>
      {/* Shared GLSL Background */}
      <div className="fixed inset-0 z-0">
        <ThreeCanvas />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      </div>

      <Navbar />

      <main ref={containerRef} className="relative z-10 min-h-screen pt-32 pb-24 section-pad-x flex flex-col items-center justify-center">
        
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 origin-center">
          
          {/* ─── Left: Copy & Links ─── */}
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6 hire-stagger">
              <div className="w-1.5 h-1.5 bg-cyan-400 glow-pulse" />
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">Secure Channel</p>
            </div>
            
            <h1 className="hire-stagger font-syne text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white" style={{ textShadow: "0 10px 40px rgba(0,0,0,0.8)" }}>
              Let&apos;s <br/>
              Build <br/>
              <span className="gradient-text-accent">Something</span><br/>
              Incredible.
            </h1>
            
            <p className="hire-stagger mt-8 text-white/50 font-light leading-relaxed max-w-md text-sm sm:text-base">
              Whether you need a high-performance backend, a cinematic frontend, or an AI agent integration — I engineer solutions that execute perfectly. Drop a line here or connect directly.
            </p>

            {/* Direct Connect Options: Chat Style */}
            <div className="hire-stagger mt-12 w-full max-w-sm bg-black/70 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-3">
                   <div className="relative w-10 h-10 rounded-full border border-white/10 overflow-hidden shrink-0 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <img src="/profile.jpg" alt="Profile" className="object-cover w-full h-full" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-white/90 leading-none">Biswadeep Tewari</p>
                     <p className="text-[10px] text-emerald-400 font-mono mt-1 flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online</p>
                   </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-4 mb-6">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 shrink-0 flex items-center justify-center text-[10px]">✨</div>
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-sm p-3.5 text-sm text-white/90 max-w-[90%] border border-white/5 shadow-lg leading-relaxed font-medium">
                    We are here to help you with the next big thing in your mind! How can we assist you today?
                  </div>
                </div>
              </div>

              {/* Action Buttons as User Replies */}
              <div className="flex flex-col gap-2.5 pl-9">
                <a href="https://wa.me/916297446078" target="_blank" rel="noreferrer" className="group relative overflow-hidden bg-white/5 hover:bg-[#25D366]/20 backdrop-blur-md border border-[#25D366]/30 hover:border-[#25D366]/60 text-white/90 hover:text-white font-medium text-sm px-4 py-2.5 rounded-2xl rounded-br-sm transition-all w-fit self-end flex items-center gap-2">
                   Start on WhatsApp
                </a>
                
                <a href="mailto:mericans24@gmail.com" className="bg-white/5 hover:bg-cyan-500/20 backdrop-blur-md border border-cyan-500/30 hover:border-cyan-500/60 text-white/90 hover:text-white font-medium text-sm px-4 py-2.5 rounded-2xl rounded-br-sm transition-all w-fit self-end flex items-center gap-2">
                   Write an email
                </a>
                
                <a href="https://www.linkedin.com/in/raj-tewari-9a93212a3/" target="_blank" rel="noreferrer" className="bg-white/5 hover:bg-[#0077b5]/20 backdrop-blur-md border border-[#0077b5]/30 hover:border-[#0077b5]/60 text-white/90 hover:text-white font-medium text-sm px-4 py-2.5 rounded-2xl rounded-br-sm transition-all w-fit self-end flex items-center gap-2">
                   Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* ─── Right: Contact Form ─── */}
          <div className="hire-stagger relative mt-12 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent rounded-3xl blur-2xl" />
            <form onSubmit={handleSubmit} className="relative p-6 sm:p-8 rounded-3xl flex flex-col gap-6 w-full border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-black/70 backdrop-blur-xl">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[10px] tracking-widest uppercase text-white/40 ml-1">Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[10px] tracking-widest uppercase text-white/40 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="budget" className="font-mono text-[10px] tracking-widest uppercase text-white/40 ml-1">Budget (Optional)</label>
                <input 
                  type="text"
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  list="budget-options"
                  placeholder="Select or type your budget"
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all"
                />
                <datalist id="budget-options">
                  <option value="Less than $1,000" />
                  <option value="$1,000 - $5,000" />
                  <option value="$5,000 - $10,000" />
                  <option value="$10,000+" />
                </datalist>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[10px] tracking-widest uppercase text-white/40 ml-1">Message</label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your vision..."
                  rows={5}
                  className="bg-white/[0.03] border border-white/10 rounded-lg p-3 text-white text-sm focus:border-indigo-500/50 focus:bg-white/[0.05] outline-none transition-all resize-none"
                />
              </div>

              {/* Status Messages */}
              {status === "error" && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm font-light">
                  {errorMessage}
                </div>
              )}
              {status === "success" && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm font-light flex items-center gap-2">
                  <span className="text-lg">✓</span> Message sent successfully. I'll get back to you soon!
                </div>
              )}

              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className="mt-2 w-full relative group overflow-hidden bg-white text-black font-syne font-bold py-4 rounded-lg transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-cyan-400 to-violet-400 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 block group-hover:text-white transition-colors duration-300">
                  {status === "loading" ? "SENDING..." : status === "success" ? "MESSAGE SENT" : "SEND MESSAGE"}
                </span>
              </button>

            </form>
          </div>

        </div>
      </main>
    </>
  );
}
