"use client";

import React from "react";
import { BookOpen, User } from "lucide-react";
import Image from "next/image";

interface DashboardSidebarProps {
  activeTab: "Learn" | "Profile";
  setActiveTab: (tab: "Learn" | "Profile") => void;
}

export default function DashboardSidebar({ activeTab, setActiveTab }: DashboardSidebarProps) {
  return (
    <div className="w-full lg:w-56 shrink-0 flex flex-col space-y-4 lg:space-y-6 pt-2">
      {/* Brand Logo (Optional, if not relying on main Navbar) */}
      <div className="hidden lg:flex items-center gap-2 mb-4">
        <div className="relative w-10 h-10 drop-shadow-[0_0_12px_rgba(229,184,105,0.8)]">
          <Image src="/logo.png" alt="Logo" fill className="object-contain" />
        </div>
        <div className="flex flex-col">
          <span className="font-serif font-bold text-white tracking-widest text-sm leading-none">
            SKILL GRIMOIRE
          </span>
          <span className="text-[8px] text-[#E5B869] uppercase tracking-[0.2em] mt-0.5">
            Build your skills
          </span>
        </div>
      </div>

      <nav className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
        <button
          onClick={() => setActiveTab("Learn")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
            activeTab === "Learn"
              ? "bg-[#E5B869]/10 text-[#E5B869] border border-[#E5B869]/30 shadow-[0_0_15px_rgba(229,184,105,0.15)]"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
          }`}
        >
          <BookOpen className={`w-4 h-4 ${activeTab === "Learn" ? "text-[#E5B869]" : "text-gray-400"}`} />
          Learn
        </button>

        <button
          onClick={() => setActiveTab("Profile")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium ${
            activeTab === "Profile"
              ? "bg-[#E5B869]/10 text-[#E5B869] border border-[#E5B869]/30 shadow-[0_0_15px_rgba(229,184,105,0.15)]"
              : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
          }`}
        >
          <User className={`w-4 h-4 ${activeTab === "Profile" ? "text-[#E5B869]" : "text-gray-400"}`} />
          Profile
        </button>
      </nav>
    </div>
  );
}
