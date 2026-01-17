"use client";

import Link from "next/link";
import { ArrowRight, User, Mail, Lock, Shield } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
            <Shield className="text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold">Join the Network</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Create an account to start saving food.
          </p>
        </div>

        <form className="space-y-4" aria-label="Registration form">
          <InputGroup icon={<User size={18} />} label="Full name" type="text" />
          <InputGroup icon={<Mail size={18} />} label="Email address" type="email" />
          <InputGroup icon={<Lock size={18} />} label="Password" type="password" />

          <button
            type="submit"
            aria-label="Create account"
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-emerald-400 transition">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

function InputGroup({
  icon,
  label,
  type,
}: {
  icon: React.ReactNode;
  label: string;
  type: string;
}) {
  return (
    <label className="relative group block">
      <span className="sr-only">{label}</span>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-emerald-500 transition">
        {icon}
      </div>
      <input
        type={type}
        placeholder={label}
        className="w-full bg-black/50 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition"
      />
    </label>
  );
}
