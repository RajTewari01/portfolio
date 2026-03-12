"use client";

import { useState, useEffect } from "react";
import type { User } from "firebase/auth";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTech, setProjectTech] = useState("");

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    (async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
        setUser(currentUser);
        setLoading(false);
      });
    })();

    return () => { if (unsubscribe) unsubscribe(); };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { signInWithEmailAndPassword } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    const { signOut } = await import("firebase/auth");
    const { auth } = await import("@/lib/firebase");
    await signOut(auth);
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    try {
      const token = await user.getIdToken();
      const techArray = projectTech.split(",").map(t => t.trim());
      
      const response = await fetch("http://localhost:8000/api/v1/projects/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title: projectTitle,
          description: projectDescription,
          technologies: techArray,
          featured: true
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add project via API");
      }
      
      alert("Project added successfully!");
      setProjectTitle("");
      setProjectDescription("");
      setProjectTech("");
      
    } catch (err: any) {
      alert("Error adding project. Check console.");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Admin...</div>;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-[#111111] p-8 rounded-2xl border border-white/10 w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-white text-center">Admin Login</h1>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#58a6ff] outline-none transition-colors"
              required 
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#58a6ff] outline-none transition-colors"
              required 
            />
          </div>
          <button type="submit" className="w-full bg-[#58a6ff] hover:bg-[#58a6ff]/80 text-black font-bold py-3 rounded-lg transition-colors">
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 md:p-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user.email}</span>
            <button onClick={handleLogout} className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              Logout
            </button>
          </div>
        </div>

        <div className="bg-[#111111] p-8 rounded-2xl border border-white/10">
          <h2 className="text-xl font-bold mb-6">Add New Project</h2>
          <form onSubmit={handleAddProject} className="space-y-6">
            <div>
              <label className="block text-gray-400 mb-2">Project Title</label>
              <input 
                type="text" 
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#58a6ff] outline-none"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Description</label>
              <textarea 
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white min-h-[120px] focus:border-[#58a6ff] outline-none"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-2">Technologies (comma separated)</label>
              <input 
                type="text" 
                value={projectTech}
                onChange={(e) => setProjectTech(e.target.value)}
                placeholder="React, Next.js, Tailwind"
                className="w-full bg-black border border-white/20 rounded-lg p-3 text-white focus:border-[#58a6ff] outline-none"
                required 
              />
            </div>
            <button type="submit" className="px-6 py-3 bg-[#3fb950] hover:bg-[#3fb950]/80 text-white font-bold rounded-lg transition-colors">
              Deploy Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
