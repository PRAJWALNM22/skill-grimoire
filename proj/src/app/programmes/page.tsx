"use client";

import React, { useState } from "react";
import { Compass, Briefcase, Rocket, GraduationCap, ChevronRight } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { WeatherProvider } from "@/context/WeatherContext";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { AuthProvider } from "@/context/AuthContext";
import StudentModal from "@/components/landing/StudentModal";

export default function ProgrammesPage() {
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  return (
    <AuthProvider>
      <WeatherProvider>
        <WeatherBackground>
          <div className="min-h-screen flex flex-col font-sans">
            <Navbar />
            
            <main className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16 md:space-y-32">
              
              {/* ── HEADER SECTION ── */}
              <section className="relative rounded-[2rem] bg-gradient-to-br from-[#10192A]/90 to-[#0A101C]/90 border border-[#E5B869]/20 shadow-2xl backdrop-blur-xl overflow-hidden">
                <div className="flex flex-col md:flex-row items-stretch min-h-[500px] md:min-h-[600px]">
                  {/* Left: Text Content */}
                  <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6 relative z-10">
                    <h4 className="text-[#E5B869] font-bold tracking-[0.2em] uppercase text-sm">Programmes</h4>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                      Four tiers <br className="hidden md:block"/>
                      from <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5D075] to-[#E5B869]">stream choice</span> <br className="hidden md:block"/>
                      to job readiness.
                    </h1>
                    <p className="text-gray-300 text-base md:text-lg max-w-xl leading-relaxed">
                      Equal weight for schools and colleges: Class 10 guidance, 11th and 12th classes AI workplace skills, undergrad professional skills across Finance, Marketing and HR, and post-graduate courses.
                    </p>
                    <button 
                      onClick={() => setIsStudentModalOpen(true)}
                      className="w-fit px-8 py-3 bg-[#E5B869] text-black font-bold rounded-xl shadow-lg hover:bg-[#F5D075] transition-colors"
                    >
                      Apply as Individual
                    </button>
                  </div>
                  
                  {/* Right: Hero Pathway Image */}
                  <div className="flex-1 relative min-h-[350px] md:min-h-0">
                    <Image
                      src="/images/prog_hero_pathway.jpg"
                      alt="Educational pathway from stream choice to job readiness"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center"
                      priority
                    />
                    {/* Gradient overlay to blend image into the card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#10192A] via-[#10192A]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/80 via-transparent to-transparent md:bg-none" />
                  </div>
                </div>
              </section>

              {/* ── TIER 01: CLASS 10 ── */}
              <section className="relative p-6 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[2rem] bg-gradient-to-br from-[#10192A]/90 to-[#0A101C]/90 border border-[#E5B869]/20 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B869] opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-[0.08]" />
                
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#E5B869] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(229,184,105,0.3)]">
                  <Compass className="w-10 h-10 sm:w-14 sm:h-14 text-[#E5B869]" />
                </div>
                
                <div className="flex-1 w-full space-y-4 text-left">
                  <div className="flex items-end gap-4">
                    <span className="text-5xl sm:text-6xl font-serif text-[#E5B869] font-bold leading-none">01</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase tracking-widest pb-1">Class 10</h2>
                  </div>
                  <div className="w-48 h-px bg-gradient-to-r from-[#E5B869] to-transparent mb-4 relative">
                     <ChevronRight className="w-4 h-4 text-[#E5B869] absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg max-w-md">
                    Career Guidance & Life Skills for students choosing their next path with clarity.
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wider">MRP</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#E5B869]">₹2,750</span>
                  </div>
                </div>
                
                {/* Card Image */}
                <div className="flex-shrink-0 w-full max-w-[260px] sm:max-w-xs md:w-72 h-60 sm:h-64 md:h-72 relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/prog_class10.jpg"
                    alt="Class 10 Career Guidance"
                    fill
                    sizes="(max-width: 768px) 260px, 288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/60 to-transparent" />
                </div>
              </section>

              {/* ── TIER 02: 11TH & 12TH ── */}
              <section className="relative p-6 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[2rem] bg-gradient-to-br from-[#10192A]/90 to-[#0A101C]/90 border border-[#E5B869]/20 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#3B82F6] opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-[0.08]" />
                
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#E5B869] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(229,184,105,0.3)]">
                  <Briefcase className="w-10 h-10 sm:w-14 sm:h-14 text-[#E5B869]" />
                </div>
                
                <div className="flex-1 w-full space-y-4 text-left">
                  <div className="flex items-end gap-4">
                    <span className="text-5xl sm:text-6xl font-serif text-[#E5B869] font-bold leading-none">02</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase tracking-widest pb-1">11th and <br/> 12th Classes</h2>
                  </div>
                  <div className="w-48 h-px bg-gradient-to-l from-[#E5B869] to-transparent mb-4 relative">
                     <ChevronRight className="w-4 h-4 text-[#E5B869] absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-180" />
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg max-w-md">
                    AI Workplace Skills that teach students how to use AI for everyday work tasks.
                  </p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs sm:text-sm text-gray-400">11th</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#E5B869]">₹4,125</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs sm:text-sm text-gray-400">12th</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#E5B869]">₹5,500</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Image */}
                <div className="flex-shrink-0 w-full max-w-[260px] sm:max-w-xs md:w-72 h-60 sm:h-64 md:h-72 relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/prog_11th12th.jpg"
                    alt="11th and 12th AI Workplace Skills"
                    fill
                    sizes="(max-width: 768px) 260px, 288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/60 to-transparent" />
                </div>
              </section>

              {/* ── TIER 03: UNDERGRAD ── */}
              <section className="relative p-6 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[2rem] bg-gradient-to-br from-[#10192A]/90 to-[#0A101C]/90 border border-[#E5B869]/20 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#E5B869] opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-[0.08]" />
                
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#E5B869] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(229,184,105,0.3)]">
                  <Rocket className="w-10 h-10 sm:w-14 sm:h-14 text-[#E5B869]" />
                </div>
                
                <div className="flex-1 w-full space-y-4 text-left">
                  <div className="flex items-end gap-4">
                    <span className="text-5xl sm:text-6xl font-serif text-[#E5B869] font-bold leading-none">03</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase tracking-widest pb-1">Undergrad<br/>Courses</h2>
                  </div>
                  <div className="w-48 h-px bg-gradient-to-r from-[#E5B869] to-transparent mb-4 relative">
                     <ChevronRight className="w-4 h-4 text-[#E5B869] absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2" />
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg max-w-md">
                    AI integrated professional skills across Finance, Marketing and HR.
                  </p>
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-4 sm:gap-x-6 gap-y-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs sm:text-sm text-gray-400">UG 1</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#E5B869]">₹6,875</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs sm:text-sm text-gray-400">UG 2</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#E5B869]">₹8,250</span>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs sm:text-sm text-gray-400">UG 3</span>
                      <span className="text-xl sm:text-2xl font-bold text-[#E5B869]">₹9,625</span>
                    </div>
                  </div>
                </div>
                
                {/* Card Image */}
                <div className="flex-shrink-0 w-full max-w-[260px] sm:max-w-xs md:w-72 h-60 sm:h-64 md:h-72 relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/prog_undergrad.jpg"
                    alt="Undergrad AI Skills in Finance, Marketing, HR"
                    fill
                    sizes="(max-width: 768px) 260px, 288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/60 to-transparent" />
                </div>
              </section>

              {/* ── TIER 04: POST GRAD ── */}
              <section className="relative p-6 sm:p-8 md:p-12 rounded-[28px] sm:rounded-[2rem] bg-gradient-to-br from-[#10192A]/90 to-[#0A101C]/90 border border-[#E5B869]/20 shadow-2xl backdrop-blur-xl overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12 group mb-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#A855F7] opacity-[0.03] blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 transition-all duration-700 group-hover:opacity-[0.08]" />
                
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-[#E5B869] flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(229,184,105,0.3)]">
                  <GraduationCap className="w-10 h-10 sm:w-14 sm:h-14 text-[#E5B869]" />
                </div>
                
                <div className="flex-1 w-full space-y-4 text-left">
                  <div className="flex items-end gap-4">
                    <span className="text-5xl sm:text-6xl font-serif text-[#E5B869] font-bold leading-none">04</span>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white uppercase tracking-widest pb-1">Post Grad<br/>Courses</h2>
                  </div>
                  <div className="w-48 h-px bg-gradient-to-l from-[#E5B869] to-transparent mb-4 relative">
                     <ChevronRight className="w-4 h-4 text-[#E5B869] absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rotate-180" />
                  </div>
                  <p className="text-gray-300 text-base sm:text-lg max-w-md">
                    Advanced AI-powered professional development for post-graduate students preparing for leadership roles.
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-gray-400">PG 1 & 2</span>
                    <span className="text-2xl sm:text-3xl font-bold text-[#E5B869]">₹9,625</span>
                  </div>
                </div>
                
                {/* Card Image */}
                <div className="flex-shrink-0 w-full max-w-[260px] sm:max-w-xs md:w-72 h-60 sm:h-64 md:h-72 relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/prog_postgrad.jpg"
                    alt="Post Graduate Advanced Learning"
                    fill
                    sizes="(max-width: 768px) 260px, 288px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A101C]/60 to-transparent" />
                </div>
              </section>

            </main>
            
            <StudentModal isOpen={isStudentModalOpen} onClose={() => setIsStudentModalOpen(false)} />
          </div>
        </WeatherBackground>
      </WeatherProvider>
    </AuthProvider>
  );
}
