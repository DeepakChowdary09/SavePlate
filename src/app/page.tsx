import Link from "next/link";
import { ArrowRight, Globe, Cpu, Server, Zap, Database, Activity } from "lucide-react";

export const metadata = {
  title: "SavePlate | Autonomous Logistics Simulator",
  description: "High-concurrency logistics engine powered by Go, PostGIS, and AI Agents.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black font-sans">
      <Header />
      
      <main className="pt-20">
        <Hero />
        <TechStackBar />
        <StatsBar />
        <FeatureGrid />
        <PrimaryCTA />
      </main>

      <Footer />
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold tracking-tighter text-xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
          SAVEPLATE<span className="text-zinc-600">_SIM</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-mono text-zinc-400 hover:text-white transition">
            /login
          </Link>
          <Link href="/register" className="group flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-black hover:bg-emerald-400 transition">
            Launch Console
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-32 pb-20 text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-8 animate-in fade-in slide-in-from-bottom-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        SYSTEM STATUS: ONLINE • 50 ACTIVE AGENTS
      </div>

      <h1 className="relative text-5xl md:text-8xl font-bold tracking-tighter leading-[0.95] mb-6">
        Autonomous <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
          Logistics Engine.
        </span>
      </h1>
      
      <p className="relative text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
        A high-concurrency simulation of food rescue operations. 
        Powered by <span className="text-white font-bold">Go</span>, <span className="text-white font-bold">PostGIS</span>, and <span className="text-white font-bold">AI Agents</span> to optimize dispatch in real-time.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-full transition flex items-center justify-center gap-2">
          <Zap size={20} /> Initialize Simulator
        </Link>
        
        {/* SECURED EXTERNAL LINK */}
        <a 
          href="https://github.com/yourusername/saveplate" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white font-bold rounded-full transition flex items-center justify-center gap-2"
        >
           View Architecture
        </a>
      </div>
    </section>
  );
}

/* ---------------- Tech Stack Bar (New!) ---------------- */
function TechStackBar() {
  return (
    <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <p className="text-center text-xs font-mono text-zinc-500 mb-6 uppercase tracking-widest">
          Powered by High-Performance Infrastructure
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
           <TechItem icon={<Server />} label="Golang" />
           <TechItem icon={<Database />} label="PostgreSQL" />
           <TechItem icon={<Globe />} label="PostGIS" />
           <TechItem icon={<Cpu />} label="Python AI" />
           <TechItem icon={<Activity />} label="Redis" />
        </div>
      </div>
    </div>
  )
}

function TechItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-2 text-zinc-300 font-bold">
      {icon} <span>{label}</span>
    </div>
  )
}

/* ---------------- Stats ---------------- */
function StatsBar() {
  return (
    <section className="py-24 border-b border-white/5">
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto px-6 gap-12 text-center">
        <Stat label="Concurrent Agents" value="50+" />
        <Stat label="Dispatch Latency" value="< 50ms" />
        <Stat label="Requests / Sec" value="2,400" />
        <Stat label="Uptime" value="99.9%" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tighter">{value}</div>
      <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest">{label}</div>
    </div>
  );
}

/* ---------------- Features ---------------- */
function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid md:grid-cols-3 gap-8">
        <Feature 
          icon={<Globe />} 
          title="Geospatial Indexing" 
          desc="Uses PostGIS R-Tree indexing to perform K-Nearest Neighbor searches on 1M+ points in milliseconds."
        />
        <Feature 
          icon={<Cpu />} 
          title="Agentic AI Logic" 
          desc="Python-based AI agents analyze traffic patterns and perishability to make human-like dispatch decisions."
        />
        <Feature 
          icon={<Zap />} 
          title="Event-Driven Core" 
          desc="Decoupled microservices architecture using Go routines and Channels for non-blocking ingestion."
        />
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 transition group">
      <div className="mb-6 w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

/* ---------------- CTA ---------------- */
function PrimaryCTA() {
  return (
    <section className="py-32 border-t border-white/10 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-500/5 blur-3xl" />
      <div className="relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to verify the architecture?</h2>
        <Link href="/register" className="inline-flex bg-white text-black px-10 py-5 rounded-full font-bold hover:bg-emerald-400 transition text-lg">
          Run Simulation <ArrowRight className="ml-2" />
        </Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-white/5 text-center text-zinc-600 text-xs font-mono">
      <p>SYSTEM DESIGN PROJECT • BUILT WITH NEXT.JS + GO + POSTGIS</p>
    </footer>
  )
}