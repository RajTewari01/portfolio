import type { Metadata, Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Biswadeep Tewari — Digital Nexus",
  description: "Portfolio of Biswadeep Tewari. Full-Stack Engineer, AI/ML Architect, and Mobile Developer. Engineering the impossible.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${spaceGrotesk.variable} ${syne.variable} antialiased bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden`}>
        {/* Subtle noise grain for texture */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-repeat" />
        {children}
      </body>
    </html>
  );
}
