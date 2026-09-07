"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, TrendingUp, GraduationCap, Star } from "lucide-react";

export default function PartnerFinaleSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Outer Card Container with smooth scroll reveal and professional hover elevation */}
      <div
        ref={cardRef}
        className={`pro-card shimmer-on-hover relative w-full min-h-[620px] md:min-h-[680px] bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-10 md:p-14 transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Background Image: Illuminated Neoclassical University at twilight */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image
            src="/images/partner_finale_university.jpg"
            alt="University graduation ceremony at twilight"
            fill
            className="object-cover object-bottom transition-transform duration-1000 ease-out hover:scale-105"
            priority
          />
          {/* Top dark gradient overlay for crystal clear typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#090e1a]/95 via-[#090e1a]/75 to-[#090e1a]/20" />
          
          {/* Bottom vignette to blend into page */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090e1a]/95 via-transparent to-transparent" />
          
          {/* Subtle golden ambient spotlight glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[340px] bg-[#E5B869]/10 blur-[120px] rounded-full pointer-events-none" />
        </div>

        {/* ── TOP CONTENT: HEADER & CONSTELLATION ── */}
        <div className="relative z-20 flex flex-col items-center max-w-3xl w-full">
          {/* Diamond Kicker */}
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
            <span className="text-[10px]">✦</span>
            <span>PARTNER WITH US</span>
            <span className="text-[10px]">✦</span>
          </div>

          {/* Main Title */}
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-[1.15] tracking-tight">
            Make yours the institution that produces{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
              job-ready graduates.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-300 text-sm sm:text-base md:text-lg mt-4 font-light max-w-lg">
            We&apos;re onboarding partner schools and colleges{" "}
            <span className="italic font-medium text-[#E5B869]">now.</span>
          </p>

          {/* ── CONSTELLATION NODES (Desktop & Mobile) ── */}
          <div className="relative mt-8 sm:mt-10 mb-4 w-full max-w-md mx-auto flex items-center justify-between px-4">
            {/* Connecting golden dashed line */}
            <div className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-[1px] border-t border-dashed border-[#E5B869]/40 -z-0" />
            
            {/* Node 1: Career / Briefcase */}
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0e1627]/90 border border-[#E5B869]/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(229,184,105,0.2)] group-hover:scale-110 group-hover:border-[#E5B869] group-hover:shadow-[0_0_20px_rgba(229,184,105,0.4)] transition-all duration-300">
                <Briefcase className="w-5 h-5 text-[#E5B869] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Glowing separator dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5B869] shadow-[0_0_6px_#E5B869]" />

            {/* Node 2: Growth / Trending */}
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0e1627]/90 border border-[#E5B869]/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(229,184,105,0.2)] group-hover:scale-110 group-hover:border-[#E5B869] group-hover:shadow-[0_0_20px_rgba(229,184,105,0.4)] transition-all duration-300">
                <TrendingUp className="w-5 h-5 text-[#E5B869] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Glowing separator dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5B869] shadow-[0_0_6px_#E5B869]" />

            {/* Node 3: Graduate / Mentor */}
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0e1627]/90 border border-[#E5B869]/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(229,184,105,0.2)] group-hover:scale-110 group-hover:border-[#E5B869] group-hover:shadow-[0_0_20px_rgba(229,184,105,0.4)] transition-all duration-300">
                <GraduationCap className="w-5 h-5 text-[#E5B869] group-hover:scale-110 transition-transform" />
              </div>
            </div>

            {/* Glowing separator dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#E5B869] shadow-[0_0_6px_#E5B869]" />

            {/* Node 4: Star / Excellence */}
            <div className="relative z-10 group flex flex-col items-center">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#0e1627]/90 border border-[#E5B869]/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(229,184,105,0.2)] group-hover:scale-110 group-hover:border-[#E5B869] group-hover:shadow-[0_0_20px_rgba(229,184,105,0.4)] transition-all duration-300">
                <Star className="w-5 h-5 text-[#E5B869] group-hover:scale-110 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ACTION: PARTNER WITH US BUTTON ── */}
        <div className="relative z-20 mt-12 mb-4">
          <Link
            href="/institutions#partner"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full font-bold text-base md:text-lg text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_8px_30px_rgba(229,184,105,0.45)] hover:shadow-[0_12px_40px_rgba(229,184,105,0.65)]"
          >
            <span>Partner with us</span>
            <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
              <ArrowRight className="w-4 h-4 text-black" />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
