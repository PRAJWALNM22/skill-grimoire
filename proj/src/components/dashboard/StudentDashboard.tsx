"use client";

import React, { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import LearnTab from "./LearnTab";
import ProfileTab from "./ProfileTab";
import ProfileSidebar from "./ProfileSidebar";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function StudentDashboard() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [activeTab, setActiveTab] = useState<"Learn" | "Profile">("Learn");

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "profile") {
      setActiveTab("Profile");
    } else {
      setActiveTab("Learn");
    }
  }, [searchParams]);

  const handleTabChange = (tab: "Learn" | "Profile") => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "Profile") {
      params.set("tab", "profile");
    } else {
      params.delete("tab");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col lg:flex-row max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
      
      {/* Left Navigation Sidebar */}
      <DashboardSidebar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header Row (Welcome & Weather/Time placeholders) */}
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
             <span className="text-gray-300">Welcome back,</span>
             <span className="text-[#E5B869]">{user?.name || user?.username || "Student"}</span>
           </h2>
        </div>

        {/* Dynamic Tab Content */}
        <div className="flex-1 overflow-y-auto pr-2 pb-10 custom-scrollbar">
           {activeTab === "Learn" && <LearnTab />}
           {activeTab === "Profile" && (
             <div className="space-y-6">
               <ProfileTab />
               <div className="lg:hidden">
                 <ProfileSidebar />
               </div>
             </div>
           )}
        </div>

      </div>

      {/* Right Profile Panel (Always visible on Desktop) */}
      <div className="w-72 hidden lg:flex flex-col shrink-0 space-y-6">
        <ProfileSidebar />
      </div>
      
    </div>
  );
}
