import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // 1. Tech-focused fonts
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes"; // 2. Clerk Dark Mode Theme

// Use Inter for UI text (Clean)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

// Use JetBrains Mono for Code/Logs (The "Terminal" look)
const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono" 
});

export const metadata: Metadata = {
  title: "SavePlate | Logistics Simulator",
  description: "High-concurrency autonomous logistics engine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 3. Apply Dark Theme to Clerk Components (Login/User Button)
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" className="dark">
        <body 
          className={`${inter.variable} ${mono.variable} font-sans bg-black text-white antialiased selection:bg-emerald-500 selection:text-black`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}