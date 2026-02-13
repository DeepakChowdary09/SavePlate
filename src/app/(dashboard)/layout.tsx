"use client";

import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Truck, Brain, Zap, LayoutGrid } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      <SignedIn>
        <div className="flex h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">

          {/* SIDEBAR */}
          <aside className="w-72 backdrop-blur-xl bg-zinc-900/60 border-r border-white/5 flex flex-col justify-between p-5 relative">

            {/* subtle glow line */}
            <div className="absolute top-0 right-0 h-full w-[1px] bg-gradient-to-b from-emerald-500/0 via-emerald-500/40 to-emerald-500/0" />

            <div>
              {/* Logo */}
              <div className="flex items-center gap-3 px-3 py-6 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <LayoutGrid className="text-black" size={20} />
                </div>

                <div>
                  <h2 className="font-semibold tracking-tight text-lg">
                    SavePlate
                  </h2>
                  <span className="text-[11px] text-zinc-400 font-mono uppercase tracking-wider">
                    Control Panel
                  </span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <NavItem
                  href="/donor"
                  icon={<Zap size={18} />}
                  label="Injector"
                />
                <NavItem
                  href="/volunteer"
                  icon={<Truck size={18} />}
                  label="Ghost Fleet"
                />
                <NavItem
                  href="/ngo"
                  icon={<Brain size={18} />}
                  label="AI Brain"
                />
              </nav>
            </div>

            {/* Profile */}
            <div className="mt-6 p-4 rounded-2xl bg-zinc-800/40 border border-white/5 backdrop-blur-md flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox:
                      "w-9 h-9 ring-2 ring-emerald-500/30",
                  },
                }}
              />
              <div>
                <p className="text-sm font-medium text-white">
                  System Online
                </p>
                <p className="text-xs text-emerald-400">
                  Secure Session Active
                </p>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <main className="flex-1 relative overflow-y-auto">

            {/* Background glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.15),transparent_40%)] pointer-events-none" />

            {/* Header */}
            <header className="sticky top-0 z-20 backdrop-blur-xl bg-black/40 border-b border-white/5 px-8 h-16 flex items-center justify-between">
              <h1 className="text-sm text-zinc-400 tracking-wider uppercase">
                Dashboard
              </h1>

              <div className="text-xs text-zinc-500">
                Live System Status
              </div>
            </header>

            {/* Page Content */}
            <div className="relative z-10 p-8">
              {children}
            </div>
          </main>
        </div>
      </SignedIn>
    </>
  );
}

/* ---------- NAV ITEM ---------- */

function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 text-sm font-medium relative ${
        isActive
          ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-black shadow-lg shadow-emerald-500/30"
          : "text-zinc-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {/* hover glow */}
      {!isActive && (
        <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-emerald-500/5" />
      )}

      <span className="relative z-10">{icon}</span>
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
