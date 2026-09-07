"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useWeather } from "@/context/WeatherContext";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  Sparkles,
  Menu,
  X,
  User,
  ArrowUpRight,
  CloudSun,
  LogOut,
  GraduationCap,
  Settings,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { weather } = useWeather();
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Generate initials avatar color from username
  function getAvatarColor(name: string) {
    const colors = [
      "from-[#E5B869] to-[#C69234]",
      "from-[#60A5FA] to-[#3B82F6]",
      "from-[#34D399] to-[#059669]",
      "from-[#F472B6] to-[#EC4899]",
      "from-[#A78BFA] to-[#7C3AED]",
      "from-[#FB923C] to-[#EA580C]",
    ];
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
  }

  const initials = user
    ? (user.name || user.username).slice(0, 2).toUpperCase()
    : "";

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 py-3.5 transition-all duration-300">
      <nav className="max-w-7xl mx-auto flex items-center justify-between bg-[#0B1220]/80 backdrop-blur-md border border-[#E5B869]/25 rounded-2xl px-5 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)]">

        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(229,184,105,0.4)] group-hover:scale-105 transition-transform duration-300">
            <Image
              src="/logo.png"
              alt="Skill Grimoire Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5D6] via-[#E5B869] to-[#D4A043]">
              SKILL GRIMOIRE
            </span>
            <span className="text-[9px] tracking-[0.2em] text-[#E5B869]/80 uppercase font-medium">
              BUILD YOUR SKILLS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-300">
          <Link href="/programmes" className="hover:text-[#E5B869] transition duration-200">
            Programmes
          </Link>
          <Link href="/institutions" className="hover:text-[#E5B869] transition duration-200">
            For Institutions
          </Link>
          <Link href="/rural-access" className="hover:text-[#E5B869] transition duration-200">
            Rural Access Initiative
          </Link>
          <Link href="/about" className="hover:text-[#E5B869] transition duration-200">
            About
          </Link>
          <Link href="/contact" className="hover:text-[#E5B869] transition duration-200">
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Weather Mini Badge */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#121C30]/80 border border-[#E5B869]/20 rounded-full px-3 py-1 text-xs text-gray-300">
            <CloudSun className="w-3.5 h-3.5 text-[#E5B869]" />
            <span className="text-white font-medium">{weather.temp}°C</span>
            <span className="text-gray-400 text-[11px] truncate max-w-[100px]">{weather.city}</span>
          </div>

          {/* Auth: Loading skeleton */}
          {isLoading && (
            <div className="w-8 h-8 rounded-full bg-[#1E2D45] animate-pulse" />
          )}

          {/* Auth: Not logged in */}
          {!isLoading && !isLoggedIn && (
            <>
              <Link
                href="/student-login"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-[#E5B869] bg-[#101A2E]/90 border border-[#E5B869]/40 hover:bg-[#E5B869]/10 transition shadow-sm"
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </Link>
              <Link
                href="/institutions#partner"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#F5D075] via-[#E5B869] to-[#C69234] hover:from-[#FFF1C5] hover:to-[#E5B869] transition shadow-[0_4px_18px_rgba(229,184,105,0.35)]"
              >
                <span>Partner with us</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}

          {/* Auth: Logged in — Profile Avatar + Dropdown */}
          {!isLoading && isLoggedIn && user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileOpen((p) => !p)}
                className="flex items-center gap-2 pl-1 pr-2.5 py-1 rounded-full bg-[#101A2E]/90 border border-[#E5B869]/35 hover:border-[#E5B869]/70 transition-all duration-200 group"
              >
                {/* Avatar */}
                {user.avatarUrl ? (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-[#E5B869]/50">
                    <Image src={user.avatarUrl} alt={user.username} fill className="object-cover" />
                  </div>
                ) : (
                  <div
                    className={`w-7 h-7 rounded-full bg-gradient-to-br ${getAvatarColor(user.username)} flex items-center justify-center text-[10px] font-bold text-black shadow-[0_0_10px_rgba(229,184,105,0.35)]`}
                  >
                    {initials}
                  </div>
                )}
                <div className="flex flex-col items-start leading-none">
                  <span className="text-[11px] font-semibold text-white">
                    {user.name || user.username}
                  </span>
                  <span className="text-[9px] text-[#E5B869]/70 font-medium uppercase tracking-wide">
                    {user.role}
                  </span>
                </div>
                <ChevronDown
                  className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-[#0B1525]/97 backdrop-blur-2xl border border-[#E5B869]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden z-50">
                  {/* User info header */}
                  <div className="px-4 py-3.5 border-b border-[#E5B869]/15">
                    <div className="flex items-center gap-2.5">
                      {user.avatarUrl ? (
                        <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#E5B869]/40">
                          <Image src={user.avatarUrl} alt={user.username} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${getAvatarColor(user.username)} flex items-center justify-center text-sm font-bold text-black`}>
                          {initials}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-white truncate">{user.name || user.username}</p>
                        <p className="text-[10px] text-gray-500 truncate">@{user.username}</p>
                      </div>
                    </div>
                  </div>

                  {/* Admin Menu items (Hidden for students) */}
                  {user.role === "ADMIN" && (
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        href="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#131E33] transition-all"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-[#E5B869]" />
                        <span>Admin Dashboard</span>
                      </Link>
                      <Link
                        href="/admin/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#131E33] transition-all"
                      >
                        <Settings className="w-3.5 h-3.5 text-gray-500" />
                        <span>Settings</span>
                      </Link>
                    </div>
                  )}

                  {/* Student Menu items */}
                  {user.role !== "ADMIN" && (
                    <div className="p-1.5 space-y-0.5">
                      <Link
                        href="/?tab=profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-gray-300 hover:text-white hover:bg-[#131E33] transition-all"
                      >
                        <User className="w-3.5 h-3.5 text-[#E5B869]" />
                        <span>My Profile</span>
                      </Link>
                    </div>
                  )}

                  {/* Sign out */}
                  <div className="p-1.5 border-t border-[#E5B869]/10">
                    <button
                      onClick={async () => {
                        setProfileOpen(false);
                        await logout();
                        window.location.href = "/";
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-300 hover:text-[#E5B869] transition"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 bg-[#0C1322]/95 backdrop-blur-2xl border border-[#E5B869]/30 rounded-2xl p-5 shadow-2xl space-y-4">
          <div className="flex flex-col space-y-3 text-sm font-medium text-gray-200">
            <Link href="/programmes" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#E5B869]">Programmes</Link>
            <Link href="/institutions" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#E5B869]">For Institutions</Link>
            <Link href="/rural-access" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#E5B869]">Rural Access Initiative</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#E5B869]">About</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#E5B869]">Contact</Link>
          </div>

          <div className="pt-3 border-t border-gray-800 flex flex-col gap-2.5">
            {isLoggedIn && user ? (
              <>
                {/* Mobile profile pill */}
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#101A2E] border border-[#E5B869]/30">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getAvatarColor(user.username)} flex items-center justify-center text-xs font-bold text-black shrink-0`}>
                    {initials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{user.name || user.username}</p>
                    <p className="text-[10px] text-gray-500">@{user.username}</p>
                  </div>
                </div>
                {user.role !== "ADMIN" && (
                  <Link
                    href="/?tab=profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-medium text-[#E5B869] border border-[#E5B869]/30 hover:bg-[#E5B869]/10 transition"
                  >
                    <User className="w-3.5 h-3.5" />
                    My Profile
                  </Link>
                )}
                <button
                  onClick={async () => { 
                    setMobileMenuOpen(false); 
                    await logout(); 
                    window.location.href = "/";
                  }}
                  className="w-full text-center py-2.5 rounded-xl text-xs font-medium text-red-400 border border-red-500/30 hover:bg-red-500/10 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/student-login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl text-xs font-medium text-[#E5B869] bg-[#121B2D] border border-[#E5B869]/40">
                  Student Login
                </Link>
                <Link href="/institutions#partner" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-[#F5D075] to-[#E5B869]">
                  Partner with us
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
