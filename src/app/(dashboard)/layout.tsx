"use client";

import { SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/nextjs";
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
      {/* 1. Security Check: Redirect if not logged in */}
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>

      {/* 2. The Dashboard Shell (Visible only when Signed In) */}
      <SignedIn>
        <div className="flex h-screen bg-black text-white overflow-hidden">
          
          {/* SIDEBAR */}
          <aside className="w-64 border-r border-zinc-800 bg-zinc-950 flex flex-col justify-between p-4">
            <div>
              {/* Logo Area */}
              <div className="flex items-center gap-2 px-4 py-6 mb-4">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <LayoutGrid className="text-black" size={20} />
                </div>
                <div>
                  <h2 className="font-bold tracking-tight text-lg leading-none">SavePlate</h2>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">Simulator v1.0</span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1">
                <NavItem href="/donor" icon={<Zap size={18} />} label="Injector (Donor)" />
                <NavItem href="/volunteer" icon={<Truck size={18} />} label="Ghost Fleet (Map)" />
                <NavItem href="/ngo" icon={<Brain size={18} />} label="AI Brain (Logs)" />
              </nav>
            </div>

            {/* User Profile (Bottom) */}
            <div className="p-4 border-t border-zinc-900 flex items-center gap-3">
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8 ring-2 ring-zinc-800"
                  }
                }}
              />
              <div className="text-xs text-zinc-500">
                <p>Logged In</p>
                <p className="text-emerald-500">System Online</p>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 overflow-y-auto bg-black relative">
             {/* This is where your page.tsx content (Donor/Volunteer/NGO) renders */}
             {children}
          </main>
        </div>
      </SignedIn>
    </>
  );
}

// Helper Component for Navigation Links
function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
        isActive
          ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
          : "text-zinc-400 hover:text-white hover:bg-zinc-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}