"use client";

import React from "react";
import { BookOpenCheck, Laptop, Award, Rocket, Trophy } from "lucide-react";

interface StepItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const steps: StepItem[] = [
  {
    icon: <BookOpenCheck className="w-5 h-5 text-[#E5B869]" />,
    title: "Learn",
    desc: "Industry-aligned courses",
  },
  {
    icon: <Laptop className="w-5 h-5 text-[#E5B869]" />,
    title: "Practice",
    desc: "Real-world projects",
  },
  {
    icon: <Award className="w-5 h-5 text-[#E5B869]" />,
    title: "Certify",
    desc: "Verified certificates",
  },
  {
    icon: <Rocket className="w-5 h-5 text-[#E5B869]" />,
    title: "Grow",
    desc: "Build your portfolio",
  },
  {
    icon: <Trophy className="w-5 h-5 text-[#E5B869]" />,
    title: "Succeed",
    desc: "Get noticed. Get hired.",
  },
];

export default function BottomProcessStrip() {
  return (
    <div className="w-full mt-8 pt-4 pb-2">
      <div className="sg-card px-6 py-4 w-full">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-2 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 relative group/step cursor-pointer"
            >
              {/* Gold Icon Box */}
              <div className="w-10 h-10 rounded-xl bg-[#121B2D] border border-[#E5B869]/30 flex items-center justify-center shrink-0 group-hover/step:border-[#E5B869] group-hover/step:shadow-[0_0_15px_rgba(229,184,105,0.4)] transition">
                {step.icon}
              </div>

              {/* Step Title & Description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#E5B869] font-bold">0{idx + 1}</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover/step:text-[#E5B869] transition">
                    {step.title}
                  </h4>
                </div>
                <p className="text-[10px] text-gray-400 truncate">
                  {step.desc}
                </p>
              </div>

              {/* Connector line on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#E5B869]/20" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
