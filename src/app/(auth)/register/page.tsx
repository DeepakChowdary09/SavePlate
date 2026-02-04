"use client";

import { SignUp } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl">
        <SignUp
          appearance={{
            elements: {
              card: "bg-transparent shadow-none",
              headerTitle: "text-white",
              headerSubtitle: "text-zinc-400",
              formButtonPrimary:
                "bg-emerald-500 hover:bg-emerald-400 text-black font-bold",
            },
          }}
        />
      </div>
    </div>
  );
}
