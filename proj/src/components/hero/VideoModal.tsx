"use client";

import React from "react";
import { X, Play, Volume2, Sparkles, CheckCircle2 } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VideoModal({ isOpen, onClose }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B1220] border-2 border-[#E5B869]/40 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(229,184,105,0.25)]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E5B869]/20 bg-[#070D18]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#E5B869]" />
            <h3 className="font-serif font-semibold text-white text-sm sm:text-base">
              Skill Grimoire — Introduction & AI Ecosystem
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Area */}
        <div className="relative aspect-video bg-gradient-to-br from-[#060A14] via-[#0E1729] to-[#040710] flex flex-col items-center justify-center p-6 text-center">
          {/* Simulated Cinematic Video Graphic */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E5B869_1px,transparent_1px)] [background-size:24px_24px]" />

          <div className="relative z-10 max-w-md space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#E5B869] to-[#FFF0C0] p-1 shadow-[0_0_30px_rgba(229,184,105,0.6)] flex items-center justify-center cursor-pointer group">
              <div className="w-full h-full bg-[#0B1220] rounded-full flex items-center justify-center group-hover:bg-[#121B2D] transition">
                <Play className="w-8 h-8 text-[#E5B869] fill-[#E5B869] ml-1" />
              </div>
            </div>

            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
                Transforming Education with AI Intelligence
              </h4>
              <p className="text-xs text-gray-300">
                Discover how Skill Grimoire bridges academia and high-impact industry careers through tailored AI pathways.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#E5B869] font-medium pt-2">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100+ AI Modules
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Live Mentorship
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Global Certifications
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
