import Link from "next/link";
import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";

export const metadata = {
  title: "SavePlate — Real-time Food Rescue Logistics",
  description:
    "A real-time logistics platform connecting surplus food to shelters using geospatial intelligence.",
};

const colorMap = {
  emerald: "text-emerald-500",
  amber: "text-amber-500",
  blue: "text-blue-500",
} as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black text-white selection:bg-emerald-500 selection:text-black">
      <Header />
      <main className="pt-16">
        <Hero />
        <StatsBar />
        <FeatureGrid />
        <PrimaryCTA />
      </main>
    </div>
  );
}

/* ---------------- Header ---------------- */

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <div className="flex items-center gap-3 font-bold tracking-tight">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          SAVEPLATE
        </div>

        <nav className="flex items-center gap-5">
          <Link href="/login" className="text-sm font-medium text-zinc-300 hover:text-white">
            Log in
          </Link>
          <Link href="/register" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
            Join
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-36 pb-24">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
        Real-time food <span className="text-emerald-500">rescue logistics</span>
      </h1>
    </section>
  );
}

/* ---------------- Stats ---------------- */

function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-black/40 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 max-w-7xl mx-auto px-6 gap-6 text-center">
        <Stat label="Meals Saved" value="12,400+" />
        <Stat label="Active Volunteers" value="640+" />
        <Stat label="Avg Dispatch Time" value="3.2 min" />
        <Stat label="Cities Live" value="3" />
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-zinc-400">{label}</div>
    </div>
  );
}

/* ---------------- Features ---------------- */

function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 grid md:grid-cols-3 gap-6">
      <Feature icon={<Globe />} color="emerald" title="Geospatial Dispatch" />
      <Feature icon={<Zap />} color="amber" title="Zero-Latency Engine" />
      <Feature icon={<ShieldCheck />} color="blue" title="Verified Trust" />
    </section>
  );
}

function Feature({
  icon,
  title,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  color: keyof typeof colorMap;
}) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5">
      <div className={`mb-4 ${colorMap[color]}`}>{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
  );
}

/* ---------------- CTA ---------------- */

function PrimaryCTA() {
  return (
    <section className="text-center py-20 border-t border-white/10">
      <Link href="/register" className="bg-emerald-500 text-black px-10 py-4 rounded-full font-bold">
        Get Started <ArrowRight />
      </Link>
    </section>
  );
}
