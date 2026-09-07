import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full relative z-20 border-t border-[#1E2D45]/50 bg-[#070B12]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-[#1E2D45]/50 pb-12">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10 drop-shadow-[0_0_15px_rgba(229,184,105,0.4)]">
                <Image src="/logo.png" alt="Logo" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-white tracking-[0.15em] text-lg leading-none">SKILL GRIMOIRE</span>
                <span className="text-[10px] text-[#E5B869] font-medium tracking-[0.25em] mt-1">BUILD YOUR SKILLS</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The ultimate AI-integrated skill development ecosystem. Empowering students, professionals, and institutions for a future-ready world.
            </p>
          </div>

          {/* Explore Links */}
          <div className="space-y-6">
            <h4 className="text-[#E5B869] font-bold tracking-[0.15em] uppercase text-xs">Explore</h4>
            <div className="flex flex-col space-y-3 text-sm text-gray-300">
              <Link href="/programmes" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Programmes</Link>
              <Link href="/institutions" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">For Institutions</Link>
              <Link href="/about" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">About Us</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-[#E5B869] font-bold tracking-[0.15em] uppercase text-xs">Quick Links</h4>
            <div className="flex flex-col space-y-3 text-sm text-gray-300">
              <Link href="/student-login" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Student Login</Link>
              <Link href="/institutions" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Partner with Us</Link>
              <Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all duration-300 w-fit">Support Desk</Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-medium">
            <Link href="/contact" className="hover:text-[#E5B869] transition-colors">Contact</Link>
            <Link href="/privacy" className="hover:text-[#E5B869] transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-[#E5B869] transition-colors">Terms of Service</Link>
            <span>&copy; {new Date().getFullYear()} Skill Grimoire. All rights reserved.</span>
          </div>
          <div className="text-xs text-gray-500 font-medium text-right flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            Bengaluru, Karnataka, India
          </div>
        </div>
      </div>
    </footer>
  );
}
