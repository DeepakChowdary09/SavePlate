import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
  Cpu,
  Server,
  Zap,
  Database,
  Activity,
} from "lucide-react";

export const metadata = {
  title: "SavePlate | Autonomous Logistics Simulator",
  description:
    "High-concurrency logistics engine powered by Go, PostGIS, and AI Agents.",
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen text-white font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* 🌌 Background Layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(6,182,212,0.12),transparent_40%)]" />
      </div>

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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3 font-bold tracking-tight text-xl">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]" />
          SAVEPLATE
          <span className="text-zinc-600">_SIM</span>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/login"
            className="text-sm font-mono text-zinc-400 hover:text-white transition"
          >
            /login
          </Link>

          <Link
            href="/register"
            className="group flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-black hover:bg-emerald-400 transition"
          >
            Launch Console
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-40 pb-28 text-center">

      {/* Glow */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[700px] h-[700px] bg-emerald-500/10 blur-[140px] rounded-full animate-pulse" />
      </div>

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono mb-10 tracking-wider">
        <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
        SYSTEM ONLINE • 50 ACTIVE AGENTS
      </div>

      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8">
        Autonomous <br />
        <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">
          Logistics Engine
        </span>
      </h1>

      <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed mb-12">
        Real-time food rescue simulation built with{" "}
        <span className="text-white font-semibold">Golang</span>,{" "}
        <span className="text-white font-semibold">PostGIS</span>, and{" "}
        <span className="text-white font-semibold">AI Agents</span> —
        optimized for <span className="text-emerald-400">high concurrency</span>.
      </p>

      <div className="flex flex-col sm:flex-row gap-5 justify-center">
        <Link
          href="/register"
          className="px-10 py-5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 text-black font-bold text-lg shadow-lg shadow-emerald-500/30 hover:scale-105 transition-all duration-300"
        >
          Initialize Simulator
        </Link>

        <a
          href="https://github.com/yourusername/saveplate"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white font-bold text-lg hover:border-emerald-400/50 hover:bg-white/10 transition-all duration-300"
        >
          View Architecture
        </a>
      </div>
    </section>
  );
}

/* ---------------- Tech Stack ---------------- */

function TechStackBar() {
  return (
    <div className="border-y border-white/5 bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12 text-center">
        <p className="text-xs font-mono text-zinc-500 mb-8 uppercase tracking-widest">
          Powered by High-Performance Infrastructure
        </p>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16 text-zinc-300 font-semibold">
          <TechItem icon={<Server />} label="Golang" />
          <TechItem icon={<Database />} label="PostgreSQL" />
          <TechItem icon={<Globe />} label="PostGIS" />
          <TechItem icon={<Cpu />} label="Python AI" />
          <TechItem icon={<Activity />} label="Redis" />
        </div>
      </div>
    </div>
  );
}

interface TechItemProps {
  icon: React.ReactNode;
  label: string;
}

function TechItem({ icon, label }: TechItemProps) {
  return (
    <div className="flex items-center gap-2 hover:text-white transition">
      {icon}
      <span>{label}</span>
    </div>
  );
}

/* ---------------- Stats ---------------- */

function StatsBar() {
  return (
    <section className="py-28 border-y border-white/5 bg-white/5 backdrop-blur-md">
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto px-6 gap-16 text-center">
        <Stat label="Concurrent Agents" value="50+" />
        <Stat label="Dispatch Latency" value="<50ms" />
        <Stat label="Requests / Sec" value="2,400" />
        <Stat label="System Uptime" value="99.9%" />
      </div>
    </section>
  );
}

interface StatProps {
  label: string;
  value: string;
}

function Stat({ label, value }: StatProps) {
  return (
    <div>
      <div className="text-5xl font-mono font-bold bg-gradient-to-r from-white to-emerald-500 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-xs font-mono text-emerald-500 uppercase tracking-widest mt-2">
        {label}
      </div>
    </div>
  );
}

/* ---------------- Features ---------------- */

function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32">
      <div className="grid md:grid-cols-3 gap-10">
        <Feature
          icon={<Globe />}
          title="Geospatial Indexing"
          desc="PostGIS R-Tree indexing enables KNN searches across 1M+ coordinates in milliseconds."
        />
        <Feature
          icon={<Cpu />}
          title="Agentic AI Logic"
          desc="Python AI agents analyze traffic patterns and perishability to optimize dispatch decisions."
        />
        <Feature
          icon={<Zap />}
          title="Event-Driven Core"
          desc="Go routines and channels power a non-blocking, high-throughput ingestion pipeline."
        />
      </div>
    </section>
  );
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

function Feature({ icon, title, desc }: FeatureProps) {
  return (
    <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 group overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-emerald-500/5" />
      <div className="relative z-10">
        <div className="mb-6 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-400/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-4 tracking-tight">{title}</h3>
        <p className="text-zinc-400 leading-relaxed text-sm">{desc}</p>
      </div>
    </div>
  );
}

/* ---------------- CTA ---------------- */

function PrimaryCTA() {
  return (
    <section className="py-36 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-400/10 to-emerald-500/10 blur-3xl" />
      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
          Deploy the Simulation.
        </h2>
        <Link
          href="/register"
          className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-white text-black font-bold text-xl hover:bg-emerald-400 transition-all duration-300 shadow-xl"
        >
          Run System
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 text-center text-zinc-600 text-xs font-mono">
      SYSTEM DESIGN Simulation • BUILT WITH NEXT.JS + GO + POSTGIS
    </footer>
  );
}