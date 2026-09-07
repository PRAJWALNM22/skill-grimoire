"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { WeatherProvider } from "@/context/WeatherContext";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { AuthProvider } from "@/context/AuthContext";
import { Mail, ArrowRight, Check, Copy } from "lucide-react";

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const supportEmail = "sghelpdesk.edu@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(supportEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AuthProvider>
      <WeatherProvider>
        <WeatherBackground>
          <div className="min-h-screen flex flex-col font-sans relative">
            <Navbar />
            
            <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 gap-10 relative z-10">
              
              {/* ── Top Card: Header (Matching Home SG-Card) ── */}
              <div className="pro-card shimmer-on-hover w-full bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 md:p-14 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] relative overflow-hidden">
                {/* Ambient glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-[#E5B869]/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1.5 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-[0.2em] uppercase">
                  <span>✦</span>
                  <span>Contact</span>
                  <span>✦</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-7xl font-serif font-bold text-white mb-4 sm:mb-6 leading-tight">
                  Talk to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
                    Skill Grimoire.
                  </span>
                </h1>

                <p className="text-gray-300 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed font-light">
                  For partnership, programme or institutional enquiries, connect directly with our <span className="text-[#E5B869] font-medium">support desk</span> below.
                </p>
              </div>

              {/* ── Bottom Card: Support Desk Action (Featuring sghelpdesk.edu@gmail.com) ── */}
              <div className="pro-card shimmer-on-hover w-full bg-[#0e1627]/15 backdrop-blur-md border border-[#E5B869]/30 rounded-[32px] sm:rounded-[40px] p-5 sm:p-8 md:p-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.2)] flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8 justify-between relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto min-w-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-[#E5B869]/15 border border-[#E5B869]/35 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(229,184,105,0.25)]">
                    <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-[#E5B869]" />
                  </div>
                  <div className="min-w-0 flex-1 w-full">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-[#E5B869]">Official Channel</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white mb-2">Support Desk</h3>
                    
                    {/* Clickable & Copyable Email Pill */}
                    <div className="flex flex-wrap items-center gap-2 mt-1 w-full">
                      <a
                        href={`mailto:${supportEmail}`}
                        className="text-xs sm:text-base md:text-lg font-mono font-semibold text-[#E5B869] hover:underline transition-colors break-all"
                      >
                        {supportEmail}
                      </a>
                      <button
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#E5B869]/40 text-xs text-gray-300 hover:text-white transition-all shrink-0"
                        title="Copy email to clipboard"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-green-400" />
                            <span className="text-green-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#E5B869]" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-400 max-w-md mt-2 leading-relaxed">
                      We respond promptly to student support requests, educator inquiries, and partner onboarding.
                    </p>
                  </div>
                </div>
                
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(supportEmail)}&su=${encodeURIComponent("Support Enquiry - Skill Grimoire")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full md:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-sm sm:text-base text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:scale-105 active:scale-95 shadow-[0_8px_25px_rgba(229,184,105,0.4)] hover:shadow-[0_12px_35px_rgba(229,184,105,0.6)] transition-all flex items-center justify-center gap-3 whitespace-nowrap group shrink-0"
                >
                  <span>Send us a message</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>

            </main>
          </div>
        </WeatherBackground>
      </WeatherProvider>
    </AuthProvider>
  );
}
