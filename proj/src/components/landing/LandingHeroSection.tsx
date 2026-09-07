"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap, TrendingUp, Brain, Briefcase, Award } from "lucide-react";

export default function LandingHeroSection() {
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
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#E5B869] group-hover/feat:scale-110 transition-transform" />,
      title: "Career Guidance",
      desc: "Explore paths. Make smarter decisions."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-[#E5B869] group-hover/feat:scale-110 transition-transform" />,
      title: "Industry-Relevant Skills",
      desc: "Learn what companies need."
    },
    {
      icon: <Brain className="w-6 h-6 text-[#E5B869] group-hover/feat:scale-110 transition-transform" />,
      title: "AI-Powered Learning",
      desc: "Smarter learning for the future."
    },
    {
      icon: <Briefcase className="w-6 h-6 text-[#E5B869] group-hover/feat:scale-110 transition-transform" />,
      title: "Practical Knowledge",
      desc: "Real-world projects. Real impact."
    },
    {
      icon: <Award className="w-6 h-6 text-[#E5B869] group-hover/feat:scale-110 transition-transform" />,
      title: "Future-Ready You",
      desc: "Build confidence. Achieve more."
    }
  ];

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        ref={cardRef}
        className={`pro-card shimmer-on-hover relative w-full bg-[#0e1627]/12 backdrop-blur-md border border-[#E5B869]/25 rounded-[40px] p-6 lg:p-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="flex-1 w-full flex flex-col lg:flex-row items-center justify-between gap-8 z-10 relative">

          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left max-w-2xl">
            <div className="uppercase tracking-[0.2em] text-[#E5B869] font-semibold text-sm mb-6">
              Skill Grimoire
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              The skills<br />
              classrooms<br />
              <span className="text-[#E5B869] italic">skip.</span>
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              AI integrated skill development for <span className="font-bold text-[#E5B869]/90 px-1 rounded">Class 10, 11th, 12th</span> and <span className="font-bold text-[#E5B869]/90 px-1 rounded">Undergrad Students</span>, delivered through your institution. We teach what the <span className="font-bold text-white">job actually needs</span>, not what the textbook already covers.
            </p>

            <Link
              href="/institutions"
              className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:scale-105 active:scale-95 transition-all shadow-[0_8px_30px_rgba(229,184,105,0.4)] hover:shadow-[0_12px_35px_rgba(229,184,105,0.6)]"
            >
              Partner with us
              <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          {/* Right Content - Image */}
          <div className="flex-1 relative w-full h-[350px] lg:h-[400px] flex items-center justify-center group/img">
            <div className="relative w-full h-full max-w-lg">
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl z-10 border border-[#E5B869]/25 group-hover/img:border-[#E5B869]/50 transition-colors duration-500">
                <Image
                  src="/images/hero_student_studying.jpg"
                  alt="Student studying"
                  fill
                  className="object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Features Strip with interactive micro-cards */}
        <div className="w-full mt-8 bg-[#10192A]/20 backdrop-blur-md border-t border-[#E5B869]/15 pt-6 pb-2 px-2 z-20 rounded-b-[30px]">
          <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-start gap-4 sm:gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="group/feat flex flex-col items-center text-center flex-1 min-w-[120px] p-3 rounded-2xl hover:bg-[#10192A]/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-[#10192A] border border-[#E5B869]/30 group-hover/feat:border-[#E5B869] group-hover/feat:shadow-[0_0_15px_rgba(229,184,105,0.3)] flex items-center justify-center mb-3 transition-all duration-300">
                  {feat.icon}
                </div>
                <h4 className="font-bold text-sm mb-1 text-white group-hover/feat:text-[#E5B869] transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs text-gray-400 leading-tight">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
