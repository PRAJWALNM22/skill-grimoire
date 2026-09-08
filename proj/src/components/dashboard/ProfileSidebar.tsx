"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Edit2, Lock, Quote, User, LogOut, Check, X as CloseIcon } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProfileSidebar() {
  const { user, logout, refresh } = useAuth();
  const router = useRouter();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  const handleSaveName = async () => {
    if (!editNameValue.trim() || editNameValue === user?.name) {
      setIsEditingName(false);
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editNameValue }),
      });
      if (res.ok) {
        await refresh();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSaving(false);
      setIsEditingName(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6 h-full">
      {/* Profile Card */}
      <div className="bg-[#10192A]/60 border border-[#E5B869]/20 rounded-2xl p-5 flex flex-col items-center shadow-lg backdrop-blur-md">
        <div className="w-full flex justify-between items-center mb-4">
           <span className="text-sm font-semibold text-white">Profile</span>
           <span className="text-[10px] text-gray-400">Manage your account settings.</span>
        </div>

        <div className="relative w-24 h-24 rounded-full bg-[#1A2639] border-2 border-[#E5B869]/50 overflow-hidden mb-4 p-1">
          <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-[#090F1C]">
             {user?.avatarUrl ? (
               <Image 
                 src={user.avatarUrl} 
                 alt="Avatar" 
                 fill 
                 className="object-cover" 
               />
             ) : (
               <User className="w-10 h-10 text-[#E5B869]/50" />
             )}
          </div>
          <button className="absolute bottom-0 right-0 w-6 h-6 bg-[#E5B869] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
            <Edit2 className="w-3 h-3 text-[#090F1C]" />
          </button>
        </div>

        {isEditingName ? (
          <div className="flex items-center gap-2 mb-3 mt-1">
            <input 
              type="text"
              value={editNameValue}
              onChange={(e) => setEditNameValue(e.target.value)}
              disabled={isSaving}
              className="bg-[#0A101C] border border-[#E5B869]/40 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-[#E5B869] w-32"
              autoFocus
            />
            <button onClick={handleSaveName} disabled={isSaving} className="text-green-400 hover:bg-green-400/10 p-1 rounded">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={() => setIsEditingName(false)} disabled={isSaving} className="text-red-400 hover:bg-red-400/10 p-1 rounded">
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <h3 className="text-lg font-bold text-white tracking-wide">
            {user?.name || user?.username || "Student"}
          </h3>
        )}
        <p className="text-xs text-gray-400 mb-3">{user?.email}</p>

        <span className="bg-[#E5B869]/10 text-[#E5B869] border border-[#E5B869]/30 px-4 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider mb-6">
          Student{user?.studentClass ? ` • ${user.studentClass}` : ""}
        </span>

        <div className="w-full flex flex-col gap-3">
          <button 
            onClick={() => {
              setEditNameValue(user?.name || user?.username || "");
              setIsEditingName(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#E5B869]/40 hover:bg-[#E5B869]/10 text-[#E5B869] py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Name
          </button>
          
          <button 
            onClick={() => router.push("/change-password")}
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-[#E5B869]/40 hover:bg-[#E5B869]/10 text-[#E5B869] py-2 rounded-xl text-xs font-semibold transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            Change Password
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-transparent border border-red-500/40 hover:bg-red-500/10 text-red-400 py-2 rounded-xl text-xs font-semibold transition-all mt-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Quote Card */}
      <div className="flex-1 bg-[#10192A]/40 border border-[#E5B869]/15 rounded-2xl p-5 relative overflow-hidden group flex flex-col justify-center">
        {/* Background Graphic placeholder */}
        <div className="absolute bottom-0 right-0 opacity-10 mix-blend-screen pointer-events-none w-32 h-32 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#E5B869] to-transparent" />
        
        <Quote className="w-6 h-6 text-[#E5B869]/40 mb-3" />
        <blockquote className="text-sm font-serif font-medium text-gray-300 leading-relaxed italic">
          "The expert in anything was once a beginner."
        </blockquote>
      </div>
    </div>
  );
}
