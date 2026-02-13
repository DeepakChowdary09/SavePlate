import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

/* ---------- Fonts ---------- */

// Cleaner UI font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Terminal / logs aesthetic
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/* ---------- Metadata ---------- */

export const metadata: Metadata = {
  title: "SavePlate | Logistics Simulator",
  description: "High-concurrency autonomous logistics engine.",
  themeColor: "#000000",
};

/* ---------- Layout ---------- */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          card: "bg-zinc-900 border border-white/10 shadow-xl",
          formButtonPrimary:
            "bg-emerald-500 hover:bg-emerald-400 text-black font-semibold",
        },
      }}
    >
      <html
        lang="en"
        className="dark scroll-smooth"
        suppressHydrationWarning
      >
        <body
          className={`
            ${inter.variable} 
            ${mono.variable}
            font-sans
            bg-black 
            text-white 
            antialiased
            min-h-screen
            overflow-x-hidden
            selection:bg-emerald-500 
            selection:text-black
          `}
        >
          {/* Global Background Effects */}
          <div className="fixed inset-0 -z-10">

            {/* Subtle gradient depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-black" />

            {/* Emerald radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(16,185,129,0.15),transparent_40%)]" />

            {/* Subtle noise texture (optional if you add noise in CSS) */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')]" />
          </div>

          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
