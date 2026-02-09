"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black relative overflow-hidden">
      
      {/* Background Ambience (Subtle Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <SignIn 
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "bg-zinc-950 border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl p-8",
            headerTitle: "text-2xl font-bold tracking-tight text-white",
            headerSubtitle: "text-zinc-500 font-mono text-xs uppercase tracking-wider",
            
            // Social Buttons (Google/GitHub)
            socialButtonsBlockButton: "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 text-white transition-all duration-200",
            socialButtonsBlockButtonText: "font-medium",
            
            // Dividers
            dividerLine: "bg-zinc-800",
            dividerText: "text-zinc-600 font-mono text-[10px] uppercase",
            
            // Input Fields
            formFieldLabel: "text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2",
            formFieldInput: "bg-black border border-zinc-800 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all rounded-xl py-3",
            
            // Primary Button (The "Sign In" Button)
            formButtonPrimary: "bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]",
            
            // Footer Links
            footerActionLink: "text-emerald-500 hover:text-emerald-400 font-bold",
            identityPreviewText: "text-zinc-300",
            identityPreviewEditButton: "text-emerald-500 hover:text-emerald-400"
          },
          layout: {
            socialButtonsPlacement: "top",
            showOptionalFields: false,
          }
        }}
      />
    </div>
  );
}