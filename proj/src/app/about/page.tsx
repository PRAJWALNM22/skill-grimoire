"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { WeatherProvider } from "@/context/WeatherContext";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { AuthProvider } from "@/context/AuthContext";
import { Quote, Sparkles, Building2, BookOpen, Presentation, CheckCircle2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ExpertsCarousel from "@/components/about/ExpertsCarousel";

export default function AboutPage() {
  const [showReveal, setShowReveal] = useState(true);

  return (
    <AuthProvider>
      <WeatherProvider>
        <WeatherBackground>
          {showReveal && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black animate-out fade-out duration-1000 fill-mode-forwards"
              style={{ animationPlayState: showReveal ? "paused" : "running" }}
            >
              <video
                src="/videos/logo_reveal.mp4"
                autoPlay
                muted
                playsInline
                onEnded={() => {
                  setTimeout(() => setShowReveal(false), 200);
                }}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setShowReveal(false)}
                className="absolute top-8 right-8 z-[110] px-6 py-2 bg-black/50 hover:bg-black/80 text-white rounded-full border border-white/20 backdrop-blur-sm transition-all text-sm font-medium"
              >
                Skip Intro
              </button>
            </div>
          )}

          <div className="min-h-screen flex flex-col font-sans relative overflow-hidden">
            <Navbar />

            {/* Main Content Area matching the Home Page spacing (gap-12) and max-w-7xl */}
            <main className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 gap-12 pb-24">
              
              {/* ── 1. HERO CARD (Matching Home SG-Card) ── */}
              <section className="relative w-full">
                <div className="pro-card shimmer-on-hover relative w-full bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10">
                  
                  {/* Ambient Light */}
                  <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E5B869]/10 blur-[110px] rounded-full pointer-events-none" />

                  <div className="flex-1 max-w-2xl space-y-6 z-10">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-[0.2em] uppercase">
                      <span>✦</span>
                      <span>About Skill Grimoire</span>
                      <span>✦</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] tracking-tight">
                      Built to <br />
                      bridge academics <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
                        and work.
                      </span>
                    </h1>

                    <p className="text-gray-300 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
                      Skill Grimoire exists because many students pass exams without seeing the actual work employees do after graduation. We deliver AI-integrated skill development right through institutions.
                    </p>

                    <div className="pt-2">
                      <Link
                        href="/institutions#partner"
                        className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgba(229,184,105,0.4)]"
                      >
                        <span>Partner with us</span>
                        <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                          <ArrowRight className="w-3.5 h-3.5 text-black" />
                        </span>
                      </Link>
                    </div>
                  </div>

                  {/* Visual Architecture Bridge Graphic */}
                  <div className="flex-1 w-full lg:w-auto flex justify-center lg:justify-end z-10">
                    <div className="relative w-full max-w-[420px] h-[300px] border border-[#E5B869]/25 bg-[#10192A]/40 rounded-[3rem] backdrop-blur-md shadow-[0_0_50px_rgba(229,184,105,0.12)] flex flex-col items-center justify-center overflow-hidden group">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[#E5B869] via-transparent to-transparent" />

                      <Building2 className="w-24 h-24 text-gray-600/40 absolute bottom-12 left-10 group-hover:scale-105 transition-transform duration-500" />
                      <Building2 className="w-32 h-32 text-gray-600/40 absolute bottom-4 right-12 group-hover:scale-105 transition-transform duration-500" />

                      {/* Stylized bridge arc */}
                      <div className="absolute bottom-8 w-full h-32 border-t-[8px] border-double border-[#E5B869]/80 rounded-[100%] shadow-[0_-10px_30px_rgba(229,184,105,0.4)]" />

                      <div className="relative z-10 flex flex-col items-center justify-center p-4">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 drop-shadow-[0_0_25px_rgba(229,184,105,0.45)] group-hover:scale-105 transition-transform duration-500">
                          <Image
                            src="/logo.png"
                            alt="Skill Grimoire Logo"
                            fill
                            className="object-contain"
                            priority
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* ── 2. STORY CARD (Matching Home SG-Card) ── */}
              <section className="relative w-full">
                <div className="pro-card shimmer-on-hover relative w-full bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] overflow-hidden">
                  
                  {/* Background lighting */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 to-transparent pointer-events-none" />

                  <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
                    <div className="flex-1 space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-widest uppercase">
                        Why we started
                      </div>

                      <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                        The classroom taught theory. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
                          It did not show the job.
                        </span>
                      </h2>

                      <div className="space-y-4 text-gray-300 text-base sm:text-lg leading-relaxed font-light">
                        <p>
                          We started Skill Grimoire to bridge the gap between regular academics and industry-ready skills. Students often do not know what employees are doing or what they will do in a job after graduation.
                        </p>
                        <p>
                          Skill Grimoire gives students that industry knowledge early through structured lessons taught by masters-qualified educators with real industry experience.
                        </p>
                      </div>

                      {/* Quote Block */}
                      <div className="relative pl-6 mt-8 border-l-2 border-[#E5B869] bg-[#10192A]/30 p-4 rounded-r-2xl border border-white/5">
                        <Quote className="w-8 h-8 text-[#E5B869]/30 absolute -top-3 -left-3 pointer-events-none" />
                        <blockquote className="text-base sm:text-lg font-serif italic text-[#E5B869] font-medium leading-relaxed relative z-10">
                          &quot;Two gaps shaped this platform: the guidance gap after 10th, and the employability gap during 11th and 12th classes and undergrad courses.&quot;
                        </blockquote>
                      </div>
                    </div>

                    {/* Features mini-grid */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-[#10192A]/40 border border-[#E5B869]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-[#E5B869]/50 hover:bg-[#10192A]/70 pro-card hover:-translate-y-1 transition-all duration-300">
                          <div className="w-12 h-12 rounded-2xl bg-[#E5B869]/10 border border-[#E5B869]/25 flex items-center justify-center mb-3">
                            <BookOpen className="w-6 h-6 text-[#E5B869]" />
                          </div>
                          <span className="text-sm font-bold text-white tracking-wider">Practical Learning</span>
                          <p className="text-xs text-gray-400 mt-1">Real-world workflows, not only textbook formulas.</p>
                        </div>

                        <div className="bg-[#10192A]/40 border border-[#E5B869]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-[#E5B869]/50 hover:bg-[#10192A]/70 pro-card hover:-translate-y-1 transition-all duration-300">
                          <div className="w-12 h-12 rounded-2xl bg-[#E5B869]/10 border border-[#E5B869]/25 flex items-center justify-center mb-3">
                            <Building2 className="w-6 h-6 text-[#E5B869]" />
                          </div>
                          <span className="text-sm font-bold text-white tracking-wider">Industry Relevant</span>
                          <p className="text-xs text-gray-400 mt-1">Curricula shaped by company requirements.</p>
                        </div>

                        <div className="bg-[#10192A]/40 border border-[#E5B869]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-[#E5B869]/50 hover:bg-[#10192A]/70 pro-card hover:-translate-y-1 transition-all duration-300">
                          <div className="w-12 h-12 rounded-2xl bg-[#E5B869]/10 border border-[#E5B869]/25 flex items-center justify-center mb-3">
                            <Presentation className="w-6 h-6 text-[#E5B869]" />
                          </div>
                          <span className="text-sm font-bold text-white tracking-wider">Career Focused</span>
                          <p className="text-xs text-gray-400 mt-1">Clear roadmap to professional readiness.</p>
                        </div>

                        <div className="bg-[#10192A]/40 border border-[#E5B869]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center hover:border-[#E5B869]/50 hover:bg-[#10192A]/70 pro-card hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-[#E5B869]/10 to-transparent">
                          <div className="w-12 h-12 rounded-2xl bg-[#E5B869]/15 border border-[#E5B869]/30 flex items-center justify-center mb-3">
                            <Sparkles className="w-6 h-6 text-[#E5B869]" />
                          </div>
                          <span className="text-sm font-bold text-[#E5B869] tracking-wider">Future Ready</span>
                          <p className="text-xs text-gray-300 mt-1">AI-powered tools and advanced methodologies.</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>

              {/* ── 3. ALL EXPERTS CAROUSEL CARD (Matching Home SG-Card) ── */}
              {/* 4 visible at a time on desktop with smooth left / right scroll buttons */}
              <section className="relative w-full">
                <div className="pro-card shimmer-on-hover relative w-full bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-8 sm:p-12 lg:p-14 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] overflow-hidden">
                  <ExpertsCarousel />
                </div>
              </section>

            </main>
          </div>
        </WeatherBackground>
      </WeatherProvider>
    </AuthProvider>
  );
}
