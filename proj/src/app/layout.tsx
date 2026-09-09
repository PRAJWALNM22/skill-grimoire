import type { Metadata } from "next";
import { Cinzel, Outfit } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import AutoReloadOnIdle from "@/components/layout/AutoReloadOnIdle";

const cinzel = Cinzel({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skill Grimoire — AI-Powered Future-Ready Learning",
  description:
    "The all-in-one ecosystem to learn, teach and transform careers with the power of AI. Weather-infused adaptive educational platform.",
  icons: {
    icon: [
      { url: "/images/logo_emblem.jpg" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/images/logo_emblem.jpg",
    apple: "/images/logo_emblem.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable} dark`}>
      <body className="min-h-screen bg-[#070B12] text-gray-100 font-sans antialiased selection:bg-[#E5B869] selection:text-black flex flex-col">
        <AutoReloadOnIdle />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
