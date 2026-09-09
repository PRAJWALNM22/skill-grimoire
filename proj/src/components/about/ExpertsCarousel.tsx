"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, GraduationCap, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export interface Expert {
  name: string;
  designation: string;
  exp: string;
  location: string;
  skills: string[];
  tag: string;
}

export const allExperts: Expert[] = [
  {
    name: "Jaya Raju",
    designation: "Senior Faculty & Mentor – Data Science & AI",
    exp: "20+ yrs",
    location: "United States",
    skills: ["Data Science", "Machine Learning", "Big Data", "AI Mentorship"],
    tag: "Senior Faculty"
  },
  {
    name: "Hayavadan G Nargund",
    designation: "Senior Data Scientist & AI/ML Corporate Trainer",
    exp: "17+ yrs",
    location: "Bengaluru, India",
    skills: ["Machine Learning", "Generative AI", "NLP & LLMs", "MLOps & RAG"],
    tag: "Senior Data Scientist"
  },
  {
    name: "Prof. Dr. Lakshmi Sree",
    designation: "Professor & Academic Leader – AI & Research",
    exp: "15+ yrs",
    location: "Chennai, India",
    skills: ["AI Research", "Computer Science", "Curriculum Strategy"],
    tag: "Academic Leader"
  },
  {
    name: "Nisha Shettigar",
    designation: "Corporate Trainer & SME – Software Development",
    exp: "15+ yrs",
    location: "Bengaluru, India",
    skills: ["Corporate L&D", "Software Engineering", "AI Applications"],
    tag: "Corporate SME"
  },
  {
    name: "Bhuvana R",
    designation: "L&D Consultant & AI-Fluent Learning Specialist",
    exp: "12+ yrs",
    location: "Bengaluru, India",
    skills: ["Instructional Design", "Generative AI", "EdTech Curricula"],
    tag: "Learning Architect"
  },
  {
    name: "Kanak Ohdar",
    designation: "AI & Machine Learning Specialist, GenAI",
    exp: "12+ yrs",
    location: "Kolkata, India",
    skills: ["LLM Applications", "Agentic AI", "Data Engineering", "Databricks"],
    tag: "GenAI Specialist"
  },
  {
    name: "Shreya Shirwadkar",
    designation: "Senior Software Engineer & Technical Lead",
    exp: "6+ yrs",
    location: "Pune, India",
    skills: ["Full Stack", "Cloud Systems", "Enterprise Tech"],
    tag: "Senior Tech Lead"
  },
  {
    name: "Apurva Lohumi",
    designation: "Assistant Professor & Visual Media Researcher",
    exp: "5+ yrs",
    location: "Mohali, India",
    skills: ["Visual Media", "Communication", "Interdisciplinary NEP"],
    tag: "Media & Comms"
  },
  {
    name: "Vasu Bhasin",
    designation: "Senior Data Analyst & AI Corporate Trainer",
    exp: "5+ yrs",
    location: "New Delhi, India",
    skills: ["Predictive Analytics", "Experimentation", "FinTech AI"],
    tag: "Analytics Lead"
  },
  {
    name: "Shubhangi Sonker",
    designation: "Senior Full Stack & Software Architect",
    exp: "5+ yrs",
    location: "Bengaluru, India",
    skills: ["Distributed Systems", "Cloud Architecture", "Modern Web"],
    tag: "Software Architect"
  },
  {
    name: "Kriti Kausik",
    designation: "AI & Data Science Technical Mentor",
    exp: "4+ yrs",
    location: "Patna, India",
    skills: ["Python", "Applied Data Science", "Predictive Modeling"],
    tag: "Applied AI"
  },
  {
    name: "Shreya Nalawade",
    designation: "Software Developer & AI Educator",
    exp: "4+ yrs",
    location: "Mumbai, India",
    skills: ["Algorithms", "Python", "AI Engineering"],
    tag: "AI Educator"
  },
  {
    name: "Shreyas Shirwadkar",
    designation: "AI Engineer & Systems Specialist",
    exp: "3+ yrs",
    location: "Pune, India",
    skills: ["Deep Learning", "System Architecture", "Edge AI"],
    tag: "AI Systems"
  }
];

export default function ExpertsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, clientWidth } = el;
    const page = Math.round(scrollLeft / clientWidth);
    setCurrentIndex(page);
  };

  const scrollPrev = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".snap-start");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: -amount, behavior: "smooth" });
  };

  const scrollNext = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".snap-start");
    const amount = card ? card.offsetWidth + 24 : 320;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (el) el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Navigation Header with Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-widest uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Master Faculty & Mentors</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
            Learn from the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
              Industry Experts
            </span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-2 max-w-xl font-light">
            Educators with master&apos;s degrees in AI and decades of enterprise engineering experience.
          </p>
        </div>
      </div>

      {/* ── CAROUSEL WITH LEFT & RIGHT ARROWS ── */}
      <div className="relative group/carousel">
        {/* Left Arrow Button */}
        <button
          onClick={scrollPrev}
          aria-label="Previous expert"
          className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0B1220]/90 hover:bg-[#E5B869] border border-[#E5B869]/40 text-[#E5B869] hover:text-black flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={scrollNext}
          aria-label="Next expert"
          className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0B1220]/90 hover:bg-[#E5B869] border border-[#E5B869]/40 text-[#E5B869] hover:text-black flex items-center justify-center backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* ── SCROLLABLE CONTAINER: 4 EXPERTS VISIBLE AT A TIME ON DESKTOP ── */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-2 px-1 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
        {allExperts.map((expert, idx) => (
          <div
            key={idx}
            className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex flex-col justify-between p-6 rounded-3xl bg-[#10192A]/40 border border-[#E5B869]/20 hover:border-[#E5B869]/50 hover:bg-[#10192A]/75 transition-all duration-400 pro-card hover:-translate-y-2 relative overflow-hidden group shadow-[0_4px_20px_0_rgba(0,0,0,0.2)]"
          >
            {/* Ambient gold glow on card hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5B869]/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div>
              {/* Header: Tag + Experience */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="text-[10px] font-bold text-[#E5B869] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25">
                  {expert.tag}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#E5B869]" />
                  <span>{expert.exp}</span>
                </div>
              </div>

              {/* Avatar Monogram */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1E2D45] to-[#0A101C] border border-[#E5B869]/35 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:border-[#E5B869] group-hover:shadow-[0_0_20px_rgba(229,184,105,0.3)] transition-all duration-300">
                <span className="font-serif text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
                  {expert.name.charAt(0)}
                </span>
              </div>

              {/* Expert Name */}
              <h3 className="font-serif text-xl font-bold text-white mb-1.5 group-hover:text-[#E5B869] transition-colors duration-300">
                {expert.name}
              </h3>

              {/* Expert Location / Place */}
              <div className="flex items-center gap-1.5 text-xs text-[#E5B869]/90 font-medium mb-3">
                <MapPin className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />
                <span>{expert.location}</span>
              </div>

              {/* Expert Designation */}
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {expert.designation}
              </p>
            </div>

            {/* Skills & Badges */}
            <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 mt-auto">
              {expert.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-[11px] text-gray-400 bg-black/30 border border-white/5 px-2 py-0.5 rounded-lg group-hover:border-[#E5B869]/20 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>

      {/* Pagination Dot Indicator */}
      <div className="flex items-center justify-center gap-2.5 mt-6">
        {Array.from({ length: Math.ceil(allExperts.length / 4) }).map((_, page) => (
          <button
            key={page}
            onClick={() => {
              const el = scrollContainerRef.current;
              if (!el) return;
              el.scrollTo({
                left: page * el.clientWidth,
                behavior: "smooth"
              });
            }}
            aria-label={`Go to page ${page + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === page
                ? "w-9 bg-gradient-to-r from-[#F5D075] to-[#E5B869] shadow-[0_0_12px_rgba(229,184,105,0.5)]"
                : "w-2.5 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
