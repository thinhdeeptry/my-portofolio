import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TargetCursor from "@/component/TargetCursor";
import GooeyNav from "@/component/header/GooeyNav";
import { Analytics } from "@vercel/analytics/next"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thinh DeepTry - Portofolio",
  description: "Full-Stack Developer specialized in Next.js and NestJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Portofolio", href: "/Portofolio" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-0 left-0 w-full z-50 hidden md:block">
          <GooeyNav
            items={navItems}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
            initialActiveIndex={0}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </header>

        {/* Main content */}
        <main>{children}</main>

        <TargetCursor spinDuration={2} hideDefaultCursor={true} />
      </body>
    </html>
  );
}
