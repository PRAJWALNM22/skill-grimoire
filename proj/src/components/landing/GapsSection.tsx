"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BookOpen, Briefcase, Map, Compass, CircleSlash } from "lucide-react";

export default function GapsSection() {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  const [card1Visible, setCard1Visible] = useState(false);
  const [card2Visible, setCard2Visible] = useState(false);
  const [card3Visible, setCard3Visible] = useState(false);

  useEffect(() => {
    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === card1Ref.current) setCard1Visible(true);
          if (entry.target === card2Ref.current) setCard2Visible(true);
          if (entry.target === card3Ref.current) setCard3Visible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, { threshold: 0.12 });
    if (card1Ref.current) observer.observe(card1Ref.current);
    if (card2Ref.current) observer.observe(card2Ref.current);
    if (card3Ref.current) observer.observe(card3Ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">

      {/* 1. Main Problem Section Card */}
      <div
        ref={card1Ref}
        className={`pro-card shimmer-on-hover group bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-8 lg:p-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] flex flex-col lg:flex-row gap-8 relative overflow-hidden transition-all duration-700 ease-out ${
          card1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Background ambient light */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#d2a344]/10 blur-[100px] rounded-full pointer-events-none" />

        {/* Text Content */}
        <div className="flex-1 z-10 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-widest uppercase self-start">
            The Problem
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
            Two gaps,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#F5D075] to-[#D4A043]">
              one consequence.
            </span>
          </h2>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#10192A]/40 transition-colors group/item">
              <div className="w-10 h-10 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 group-hover/item:border-[#E5B869] group-hover/item:shadow-[0_0_12px_rgba(229,184,105,0.3)] flex items-center justify-center shrink-0 mt-1 transition-all">
                <Map className="w-5 h-5 text-[#E5B869]" />
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-white group-hover/item:text-[#E5B869] transition-colors">
                  Unclear Career Paths
                </h4>
                <p className="text-gray-400 text-sm">Students don&apos;t know what suits them best.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#10192A]/40 transition-colors group/item">
              <div className="w-10 h-10 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 group-hover/item:border-[#E5B869] group-hover/item:shadow-[0_0_12px_rgba(229,184,105,0.3)] flex items-center justify-center shrink-0 mt-1 transition-all">
                <Compass className="w-5 h-5 text-[#E5B869]" />
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-white group-hover/item:text-[#E5B869] transition-colors">
                  Lack of Guidance
                </h4>
                <p className="text-gray-400 text-sm">Students don&apos;t get the right direction at the right time.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-[#10192A]/40 transition-colors group/item">
              <div className="w-10 h-10 rounded-full bg-[#E5B869]/15 border border-[#E5B869]/30 group-hover/item:border-[#E5B869] group-hover/item:shadow-[0_0_12px_rgba(229,184,105,0.3)] flex items-center justify-center shrink-0 mt-1 transition-all">
                <CircleSlash className="w-5 h-5 text-[#E5B869]" />
              </div>
              <div>
                <h4 className="font-bold text-base sm:text-lg text-white group-hover/item:text-[#E5B869] transition-colors">
                  Lack of Relevant Skills
                </h4>
                <p className="text-gray-400 text-sm">Students don&apos;t know which skills truly matter for tomorrow.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="flex-1 relative min-h-[350px] lg:min-h-0 rounded-3xl overflow-hidden shadow-lg z-10 border border-[#E5B869]/25 group-hover:border-[#E5B869]/45 transition-colors duration-500">
          <Image
            src="/images/gaps_crossroads.jpg"
            alt="Student at crossroads"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* 2. The Guidance Gap - Class 10 Card */}
      <div
        ref={card2Ref}
        className={`pro-card shimmer-on-hover group bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-8 lg:p-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] flex flex-col lg:flex-row gap-8 items-center overflow-hidden transition-all duration-700 ease-out ${
          card2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex-1 flex flex-col">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-widest uppercase self-start">
            The Guidance Gap &bull; Class 10
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            &quot;After 10th, I thought there were only two options: science or commerce.&quot;
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-sm border-l-2 border-[#E5B869] pl-4 leading-relaxed">
            Students are not aware of the paths that exist beyond science and commerce.
          </p>
        </div>

        <div className="flex-1 relative w-full h-[320px] sm:h-[350px] rounded-3xl overflow-hidden shadow-lg border border-[#E5B869]/25 group-hover:border-[#E5B869]/45 transition-colors duration-500">
          <Image
            src="/images/gaps_thinking.jpg"
            alt="Student thinking"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

      {/* 3. The Employability Gap - 11th & 12th Card */}
      <div
        ref={card3Ref}
        className={`pro-card shimmer-on-hover group bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-8 lg:p-12 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] flex flex-col lg:flex-row gap-8 overflow-hidden transition-all duration-700 ease-out ${
          card3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex-1 flex flex-col">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-[#E5B869]/10 border border-[#E5B869]/25 text-[#E5B869] text-xs font-bold tracking-widest uppercase self-start">
            The Employability Gap
          </div>
          <div className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-5">
            11th and 12th Classes and Undergrad Courses
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
            &quot;I was passing exams and still had no idea what an employee actually does at work.&quot;
          </h3>
          <p className="text-gray-400 text-sm sm:text-base max-w-sm border-l-2 border-[#E5B869] pl-4 mb-8 leading-relaxed">
            Years of theory, and not one hour spent on the work itself.
          </p>

          <div className="flex flex-col gap-3 mt-auto">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#10192A]/50 border border-[#E5B869]/25 hover:border-[#E5B869]/40 hover:bg-[#10192A]/80 transition-all duration-300 cursor-pointer group/opt">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#E5B869]" />
                <span className="font-semibold text-gray-200 text-sm">What the syllabus teaches</span>
              </div>
              <div className="text-xl text-[#E5B869] group-hover/opt:rotate-90 group-hover/opt:scale-125 transition-transform duration-300">+</div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#10192A]/50 border border-[#E5B869]/25 hover:border-[#E5B869]/40 hover:bg-[#10192A]/80 transition-all duration-300 cursor-pointer group/opt">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-[#E5B869]" />
                <span className="font-semibold text-gray-200 text-sm">What the job actually needs</span>
              </div>
              <div className="text-xl text-[#E5B869] group-hover/opt:rotate-90 group-hover/opt:scale-125 transition-transform duration-300">+</div>
            </div>
          </div>
        </div>

        <div className="flex-1 relative w-full h-[360px] sm:h-[400px] rounded-3xl overflow-hidden shadow-lg border border-[#E5B869]/25 group-hover:border-[#E5B869]/45 transition-colors duration-500">
          <Image
            src="/images/gaps_rejected.jpg"
            alt="Student rejected"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      </div>

    </section>
  );
}
