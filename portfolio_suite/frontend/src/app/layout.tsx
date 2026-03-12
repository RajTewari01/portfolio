import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Biswadeep Tewari — Engineer & Creator",
  description: "Portfolio of Biswadeep Tewari. Full-Stack Engineer, AI/ML Architect, and Mobile Developer. Pushing the boundaries of what's possible.",
  keywords: ["portfolio", "developer", "engineer", "AI", "ML", "full-stack", "Biswadeep Tewari"],
  openGraph: {
    title: "Biswadeep Tewari — Engineer & Creator",
    description: "Full-Stack Engineer, AI/ML Architect, and Mobile Developer.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
