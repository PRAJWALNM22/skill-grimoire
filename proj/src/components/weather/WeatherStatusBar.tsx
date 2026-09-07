"use client";

import React, { useState } from "react";
import { useWeather } from "@/context/WeatherContext";
import {
  CloudLightning,
  Sun,
  CloudRain,
  Cloud,
  Moon,
  RotateCcw,
  MapPin,
  SlidersHorizontal,
  ChevronDown,
  Wind,
} from "lucide-react";

// Fallback icon component for Sunset
function SunsetIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 10V2" />
      <path d="m4.93 10.93 1.41 1.41" />
      <path d="M2 18h2" />
      <path d="M20 18h2" />
      <path d="m19.07 10.93-1.41 1.41" />
      <path d="M22 22H2" />
      <path d="m16 6-4 4-4-4" />
      <path d="M16 18a4 4 0 0 0-8 0" />
    </svg>
  );
}

// Hazy icon
function HazeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8h14" />
      <path d="M3 12h18" />
      <path d="M5 16h14" />
      <path d="M7 20h10" />
    </svg>
  );
}

export default function WeatherStatusBar() {
  const {
    weather,
    isLive,
    isLoading,
    currentHour,
    setManualCondition,
    setManualHour,
    resetToLive,
  } = useWeather();

  const [isExpanded, setIsExpanded] = useState(false);

  // Map condition → icon
  const conditionIcon = () => {
    switch (weather.condition) {
      case "thunderstorm":
        return <CloudLightning className="w-4 h-4 text-amber-400 animate-pulse" />;
      case "sunny":
        return <Sun className="w-4 h-4 text-amber-300" />;
      case "rainy":
        return <CloudRain className="w-4 h-4 text-blue-400" />;
      case "cloudy":
        return <Cloud className="w-4 h-4 text-gray-300" />;
      case "sunset":
        return <SunsetIcon className="w-4 h-4 text-orange-400" />;
      case "night":
        return <Moon className="w-4 h-4 text-indigo-300" />;
      case "hazy":
        return <HazeIcon className="w-4 h-4 text-amber-500" />;
      default:
        return <Sun className="w-4 h-4 text-amber-300" />;
    }
  };

  // Slider: 0-24 continuous hours
  const sliderValue = currentHour;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hour = Number(e.target.value);
    setManualHour(hour);
  };

  // Format hour for display with exact time
  const formatHour = (h: number): string => {
    const totalMinutes = Math.round(h * 60);
    const hours24 = Math.floor(totalMinutes / 60) % 24;
    const mins = totalMinutes % 60;
    
    const hour12 = hours24 % 12 || 12;
    // 24 is midnight, treat as AM. hours24=0 is 12:00 AM
    const amPm = hours24 < 12 ? "AM" : "PM";
    const mm = mins.toString().padStart(2, "0");
    
    return `${hour12}:${mm} ${amPm}`;
  };

  const handleResetToLive = () => {
    setIsExpanded(false);
    resetToLive();
  };

  // Determine slider track gradient (day-night spectrum across 24 hours)
  const sliderTrackGradient = `linear-gradient(to right, 
    #1a1a3e 0%, 
    #1a1a3e 20%, 
    #2d3a6e 22%, 
    #F5D075 28%, 
    #87CEEB 35%, 
    #FFD700 50%, 
    #87CEEB 65%, 
    #F59E0B 72%, 
    #8B3A5E 78%, 
    #1a1a3e 82%, 
    #1a1a3e 100%
  )`;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] w-[95%] max-w-4xl">
      {/* Expanded atmosphere selector — renders ABOVE the pill */}
      {isExpanded && (
        <div className="mb-2 bg-[#090e1c]/97 backdrop-blur-2xl border border-[#E5B869]/35 rounded-2xl p-3 shadow-2xl">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] text-gray-400 font-semibold w-full text-center mb-1">
              Select Atmosphere
            </span>

            {(
              [
                { key: "thunderstorm", label: "⚡ Thunderstorm", icon: <CloudLightning className="w-3.5 h-3.5" /> },
                { key: "sunny",        label: "☀ Clear / Sunny",  icon: <Sun className="w-3.5 h-3.5" /> },
                { key: "rainy",        label: "🌧 Rainy",          icon: <CloudRain className="w-3.5 h-3.5" /> },
                { key: "cloudy",       label: "⛅ Overcast",       icon: <Cloud className="w-3.5 h-3.5" /> },
                { key: "sunset",       label: "🌇 Golden Sunset",  icon: <SunsetIcon className="w-3.5 h-3.5" /> },
                { key: "night",        label: "🌌 Starry Night",   icon: <Moon className="w-3.5 h-3.5" /> },
                { key: "hazy",         label: "🌫 Hazy / Dusty",   icon: <HazeIcon className="w-3.5 h-3.5" /> },
              ] as const
            ).map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => {
                  setManualCondition(key);
                  setIsExpanded(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                  weather.condition === key
                    ? "bg-[#E5B869] text-black border-[#E5B869] shadow-[0_0_12px_rgba(229,184,105,0.55)]"
                    : "bg-[#101827] text-gray-300 border-gray-700 hover:border-[#E5B869]/60 hover:text-white"
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Main Status Pill ─────────────────────────────────────────────── */}
      <div className="bg-[#0c1322]/92 backdrop-blur-xl border border-[#E5B869]/30 rounded-2xl px-4 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(229,184,105,0.12)] flex flex-col gap-2">

        {/* Top row: status + info + buttons */}
        <div className="flex items-center justify-between gap-3">
          {/* Left: status badge + location */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#101827] border border-[#E5B869]/25 rounded-full px-2.5 py-1">
              {conditionIcon()}
              <span className="text-[10px] font-bold text-[#E5B869] uppercase tracking-wider">
                {isLive ? "LIVE" : "SIM"}
              </span>
              {isLive && (
                <span className="relative flex h-2 w-2 ml-0.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-300">
              <span className="font-semibold text-white">{weather.temp}°C</span>
              <span className="text-gray-600">•</span>
              <span className="capitalize text-gray-300 truncate max-w-[140px]">{weather.conditionLabel}</span>
              <span className="text-gray-600">•</span>
              <span className="flex items-center gap-0.5 text-gray-400">
                <MapPin className="w-3 h-3 text-[#E5B869]" />
                {weather.city}
              </span>
            </div>
          </div>

          {/* Right: buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(prev => !prev)}
              className="flex items-center gap-1.5 bg-[#101827] hover:bg-[#192840] text-gray-200 hover:text-white border border-[#E5B869]/30 hover:border-[#E5B869]/60 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#E5B869]" />
              <span className="hidden sm:inline">Atmosphere</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {!isLive && (
              <button
                onClick={handleResetToLive}
                disabled={isLoading}
                className="flex items-center gap-1.5 bg-gradient-to-r from-[#E5B869] to-[#C69234] hover:brightness-110 text-black font-bold rounded-full px-3 py-1.5 text-xs transition-all duration-150 shadow-md disabled:opacity-60"
              >
                <RotateCcw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
                <span>Back to Live</span>
              </button>
            )}
          </div>
        </div>

        {/* Bottom row: 24-hour continuous time slider */}
        <div className="flex items-center gap-2.5 w-full">
          <Sun className="w-3.5 h-3.5 text-[#E5B869] shrink-0" />

          <div className="flex-1 flex flex-col gap-0.5">
            <div className="relative">
              <input
                type="range"
                min="0"
                max="24"
                step="0.25"
                value={sliderValue}
                onChange={handleSliderChange}
                className="weather-time-slider w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: sliderTrackGradient,
                }}
                title={`Time: ${formatHour(sliderValue)}`}
              />
            </div>
            {/* Hour markers */}
            <div className="flex justify-between px-0.5">
              {[0, 3, 6, 9, 12, 15, 18, 21, 24].map((h) => (
                <span
                  key={h}
                  className={`text-[7px] font-medium leading-none transition-colors duration-300 ${
                    Math.abs(currentHour - h) < 1.5 ? "text-[#E5B869]" : "text-gray-600"
                  }`}
                >
                  {h === 0 || h === 24 ? "12a" : h === 6 ? "6a" : h === 12 ? "12p" : h === 18 ? "6p" : h === 3 ? "3a" : h === 9 ? "9a" : h === 15 ? "3p" : "9p"}
                </span>
              ))}
            </div>
          </div>

          <Moon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />

          {/* Current time display */}
          <div className="hidden sm:flex items-center gap-1 bg-[#101827] border border-[#E5B869]/20 rounded-full px-2 py-0.5 shrink-0">
            <span className="text-[10px] font-bold text-white tabular-nums">
              {formatHour(currentHour)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
