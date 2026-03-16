"use client";

import { useState, useEffect } from "react";
import type { User } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  // Auth State
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authStage, setAuthStage] = useState<"login" | "otp" | "authenticated">("login");
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  
  // Allowed Admins
  const ALLOWED_EMAILS = ["tewari765@gmail.com", "mericans24@gmail.com"];
  
  // Login Form
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // OTP Form
  const [otp, setOtp] = useState("");
  const [pin, setPin] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  
  // Project Form
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectTech, setProjectTech] = useState("");
  const [projectLink, setProjectLink] = useState("");
  
  // Data
  const [messages, setMessages] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  
  // UI State
  const [error, setError] = useState("");
  const [loadingAction, setLoadingAction] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "messages">("projects");

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    
    // Check localStorage for existing valid 2FA session token
    const token = localStorage.getItem("admin_session_token");
    if (token) {
       // In a real app we'd verify the JWT expiry here.
       setSessionToken(token);
    }
    
    (async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const { auth } = await import("../../lib/firebase");
      unsubscribe = onAuthStateChanged(auth, (currentUser: User | null) => {
        setUser(currentUser);
        setCheckingAuth(false);
        
        if (currentUser) {
           if (token) {
              setAuthStage("authenticated");
              fetchData();
           } else {
              setAuthStage("otp");
              handleSendOtp(currentUser.email!);
           }
        } else {
           setAuthStage("login");
        }
      });
    })();

    return () => { if (unsubscribe) unsubscribe(); };
  }, [sessionToken]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    try {
      const { db } = await import("../../lib/firebase");
      
      // Fetch Projects
      const projSnap = await getDocs(collection(db, "projects"));
      const pData = projSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setProjects(pData);
      
      // Fetch Messages (if any stored)
      const msgSnap = await getDocs(query(collection(db, "messages"), orderBy("createdAt", "desc")));
      const mData = msgSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(mData);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  // ─── STAGE 1: FIREBASE LOGIN (GOOGLE OAUTH) ───
  const handleGoogleLogin = async () => {
    setError("");
    setLoadingAction(true);
    try {
      const { signInWithPopup, GoogleAuthProvider, signOut } = await import("firebase/auth");
      const { auth } = await import("../../lib/firebase");
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (!result.user.email || !ALLOWED_EMAILS.includes(result.user.email)) {
         await signOut(auth);
         throw new Error("Unauthorized email address. Access denied.");
      }
      // Auth observer will transition state to 'otp'
    } catch (err: any) {
      setError(err.message);
      setLoadingAction(false);
    }
  };

  // ─── STAGE 1: FIREBASE LOGIN (EMAIL/PASSWORD) ───
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingAction(true);
    try {
      const { signInWithEmailAndPassword, signOut } = await import("firebase/auth");
      const { auth } = await import("../../lib/firebase");
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      if (!result.user.email || !ALLOWED_EMAILS.includes(result.user.email)) {
         await signOut(auth);
         throw new Error("Unauthorized email address. Access denied.");
      }
      // Auth observer will transition state to 'otp'
    } catch (err: any) {
      setError(err.message);
      setLoadingAction(false);
    }
  };

  // ─── STAGE 2: SEND & VERIFY OTP ───
  const handleSendOtp = async (userEmail: string) => {
    setSendingOtp(true);
    setError("");
    try {
      const res = await fetch("/api/admin/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoadingAction(true);
    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, otp, pin }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Verification failed");
      
      // Success!
      localStorage.setItem("admin_session_token", data.token);
      setSessionToken(data.token);
      setAuthStage("authenticated");
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleLogout = async () => {
    const { signOut } = await import("firebase/auth");
    const { auth } = await import("../../lib/firebase");
    localStorage.removeItem("admin_session_token");
    setSessionToken(null);
    setAuthStage("login");
    await signOut(auth);
  };

  // ─── CRUD OPERATIONS ───
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingAction(true);
    try {
      const { db } = await import("../../lib/firebase");
      await addDoc(collection(db, "projects"), {
        title: projectTitle,
        type: projectType,
        description: projectDescription,
        technologies: projectTech.split(",").map(t => t.trim()),
        link: projectLink,
        createdAt: new Date().toISOString()
      });
      
      setProjectTitle("");
      setProjectType("");
      setProjectDescription("");
      setProjectTech("");
      setProjectLink("");
      fetchData();
    } catch (err: any) {
      alert("Error adding project");
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Delete this project?")) return;
    try {
      const { db } = await import("../../lib/firebase");
      await deleteDoc(doc(db, "projects", id));
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // ─── RENDER ───
  if (checkingAuth) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono opacity-50">INITIALIZING SECURITY PROTOCOLS...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-12 font-space-grotesk relative">
       {/* Background Grid */}
       <div className="fixed inset-0 pointer-events-none opacity-5" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />

      <div className="max-w-6xl mx-auto relative z-10 pt-16">
        
        {/* LOGO */}
        <div className="flex items-center gap-4 mb-20 justify-center">
            <div className="w-10 h-10 bg-white text-black font-syne font-bold flex items-center justify-center rounded-sm">BT</div>
            <h1 className="font-syne font-bold text-2xl tracking-widest text-white/50">NEXUS ADMIN</h1>
        </div>

        {/* ─── STAGE 1: LOGIN ─── */}
        {authStage === "login" && (
          <div className="glass-card max-w-md mx-auto p-10 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <h2 className="text-xl font-syne font-bold mb-6 tracking-wider">AUTHORIZATION REQUIRED</h2>
            {error && <p className="text-red-400 text-sm mb-6 bg-red-500/10 p-3 rounded border border-red-500/20">{error}</p>}
            
            <form onSubmit={handleLogin} className="space-y-6 mb-6">
              <div>
                <label className="block text-[10px] font-mono tracking-[0.2em] text-white/40 mb-2 uppercase">Identity Link</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:border-red-500/50 outline-none transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-mono tracking-[0.2em] text-white/40 mb-2 uppercase">Passphrase</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required 
                  className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-sm focus:border-red-500/50 outline-none transition-colors" />
              </div>
              <button type="submit" disabled={loadingAction} className="w-full bg-white/10 text-white border border-white/20 font-syne font-bold py-3 rounded-lg hover:bg-white/20 transition-colors">
                {loadingAction ? "VERIFYING..." : "ENTER PORTAL"}
              </button>
            </form>

            <div className="flex items-center gap-4 mb-6">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">or via clearance</span>
                <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <button type="button" onClick={handleGoogleLogin} disabled={loadingAction} className="w-full flex items-center justify-center gap-3 bg-white text-black font-syne font-bold py-3.5 rounded-lg hover:bg-gray-200 transition-colors">
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              SIGN IN WITH GOOGLE
            </button>
          </div>
        )}

        {/* ─── STAGE 2: OTP ─── */}
        {authStage === "otp" && (
          <form onSubmit={handleVerifyOtp} className="glass-card max-w-md mx-auto p-10 rounded-2xl border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500" />
            <h2 className="text-xl font-syne font-bold mb-2 tracking-wider">2FA VERIFICATION</h2>
            <p className="text-xs text-white/50 mb-8 font-mono">Code sent to your private channel.</p>
            {error && <p className="text-red-400 text-sm mb-6 bg-red-500/10 p-3 rounded border border-red-500/20">{error}</p>}
            
            <div className="mb-4">
              <label className="block text-[10px] font-mono tracking-[0.2em] text-white/40 mb-2 uppercase">One Time Passcode</label>
              <input type="text" value={otp} onChange={e => setOtp(e.target.value)} required maxLength={6}
                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-center text-3xl font-mono tracking-[0.2em] focus:border-red-500/50 outline-none transition-colors" />
            </div>
            
            <div className="mb-8">
              <label className="block text-[10px] font-mono tracking-[0.2em] text-cyan-400 mb-2 uppercase">Secret Admin PIN (Factor 3)</label>
              <input type="password" value={pin} onChange={e => setPin(e.target.value)} required maxLength={6}
                className="w-full bg-black/50 border border-cyan-500/30 rounded-lg p-3 text-center text-3xl font-mono tracking-[0.2em] focus:border-cyan-400 outline-none transition-colors text-cyan-400" />
            </div>
            
            <button type="submit" disabled={loadingAction} className="w-full bg-white text-black font-syne font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors mb-4">
              {loadingAction ? "VERIFYING..." : "CONFIRM ACCESS"}
            </button>
            <button type="button" onClick={() => handleSendOtp(user?.email!)} disabled={sendingOtp} className="w-full text-xs font-mono text-white/40 hover:text-white transition-colors">
              {sendingOtp ? "SENDING..." : "RESEND OTP"}
            </button>
          </form>
        )}

        {/* ─── STAGE 3: DASHBOARD ─── */}
        {authStage === "authenticated" && (
          <div className="animate-in fade-in duration-700">
             
             {/* Header */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-white/10 pb-8 gap-6">
                <div>
                  <h1 className="text-4xl font-syne font-black uppercase tracking-tighter">Command Center</h1>
                  <p className="font-mono text-[10px] tracking-widest text-emerald-400 uppercase mt-2">● Secure Connection Active</p>
                </div>
                <button onClick={handleLogout} className="font-mono text-[10px] tracking-widest uppercase border border-white/10 px-4 py-2 rounded glass-panel hover:bg-white/5 hover:border-red-500/30 transition-all text-white/60 hover:text-red-400">
                  Disconnect Session
                </button>
             </div>

             {/* Tabs */}
             <div className="flex gap-4 mb-10 border-b border-white/10">
                <button onClick={() => setActiveTab("projects")} className={`pb-4 px-2 font-syne font-bold text-sm uppercase tracking-wider border-b-2 transition-colors ${activeTab === "projects" ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/70"}`}>
                  Project Matrix
                </button>
                <button onClick={() => setActiveTab("messages")} className={`pb-4 px-2 font-syne font-bold text-sm uppercase tracking-wider border-b-2 transition-colors ${activeTab === "messages" ? "border-white text-white" : "border-transparent text-white/40 hover:text-white/70"}`}>
                  Incoming Comms <span className="ml-2 bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">{messages.length}</span>
                </button>
             </div>

             {/* Tab Content */}
             {activeTab === "projects" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   
                   {/* Add Project Form */}
                   <div className="lg:col-span-1">
                      <div className="glass-card p-6 rounded-xl border border-white/5 sticky top-24">
                         <h3 className="font-syne font-bold text-lg mb-6 tracking-wide">DEPLOY NEW PROJECT</h3>
                         <form onSubmit={handleAddProject} className="space-y-5">
                            <div>
                               <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Designation</label>
                               <input value={projectTitle} onChange={e=>setProjectTitle(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-sm focus:border-indigo-500/50 outline-none" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Type / Category</label>
                               <input value={projectType} onChange={e=>setProjectType(e.target.value)} required placeholder="e.g. AI Vision Engine, Full-Stack Platform" className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-sm focus:border-indigo-500/50 outline-none placeholder:text-white/20" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Description</label>
                               <textarea value={projectDescription} onChange={e=>setProjectDescription(e.target.value)} required rows={3} className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-sm focus:border-indigo-500/50 outline-none resize-none" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">Tech Stack (CSV)</label>
                               <input value={projectTech} onChange={e=>setProjectTech(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-sm focus:border-indigo-500/50 outline-none" />
                            </div>
                            <div>
                               <label className="block text-[10px] font-mono uppercase text-white/40 mb-1">GitHub / Live URI</label>
                               <input value={projectLink} onChange={e=>setProjectLink(e.target.value)} required className="w-full bg-black/40 border border-white/10 rounded p-2.5 text-sm focus:border-indigo-500/50 outline-none" />
                            </div>
                            <button type="submit" disabled={loadingAction} className="w-full mt-4 bg-white text-black font-syne font-bold py-3 rounded hover:bg-indigo-400 hover:text-white transition-all text-sm uppercase tracking-wider">
                               {loadingAction ? "DEPLOYING..." : "COMMIT TO DB"}
                            </button>
                         </form>
                      </div>
                   </div>

                   {/* Project List */}
                   <div className="lg:col-span-2 space-y-4">
                      {projects.length === 0 ? (
                         <div className="p-8 border border-white/5 border-dashed rounded-xl text-center text-white/30 font-mono text-sm">No external projects found in DB. Fallback array active on frontend.</div>
                      ) : (
                         projects.map(p => (
                            <div key={p.id} className="glass-panel p-5 rounded-lg border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-white/20 transition-colors">
                               <div>
                                  <h4 className="font-syne font-bold text-lg text-white/90">{p.title}</h4>
                                  <p className="font-mono text-[10px] text-indigo-400 mt-1 uppercase tracking-widest">{p.type || p.description}</p>
                                  <p className="text-xs text-white/40 mt-1">{p.description}</p>
                                  <p className="text-xs text-white/30 mt-3">{p.technologies?.join(" • ")}</p>
                               </div>
                               <button onClick={() => handleDeleteProject(p.id)} className="text-[10px] font-mono text-red-400/50 hover:text-red-400 uppercase tracking-widest px-3 py-1.5 border border-red-500/20 rounded hover:bg-red-500/10 transition-colors self-start sm:self-center">
                                  Purge
                               </button>
                            </div>
                         ))
                      )}
                   </div>
                </div>
             )}

             {/* Tab Content: Messages */}
             {activeTab === "messages" && (
                <div className="space-y-4">
                    <p className="text-white/40 font-mono text-xs mb-6">Note: Hire Page submissions email you directly. They will also appear here if configured to write to Firestore.</p>
                    {messages.length === 0 ? (
                        <div className="p-12 border border-white/5 border-dashed rounded-xl text-center text-white/30 font-mono text-sm uppercase tracking-widest">Inbox Empty</div>
                    ) : (
                        messages.map(m => (
                            <div key={m.id} className="glass-panel p-6 rounded-lg border border-white/5">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-syne font-bold text-lg text-white/90">{m.name}</h4>
                                        <a href={`mailto:${m.email}`} className="font-mono text-xs text-indigo-400 hover:underline">{m.email}</a>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/30 uppercase">{new Date(m.createdAt).toLocaleDateString()}</span>
                                </div>
                                <div className="bg-black/40 border border-white/5 p-4 rounded text-sm text-white/70 whitespace-pre-wrap">
                                    {m.message}
                                </div>
                            </div>
                        ))
                    )}
                </div>
             )}

          </div>
        )}

      </div>
    </div>
  );
}
