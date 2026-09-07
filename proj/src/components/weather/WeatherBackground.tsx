"use client";

import React from "react";
import { useWeather } from "@/context/WeatherContext";
import WeatherCanvas from "./WeatherCanvas";

type BgTheme = {
  gradient: string;
  ambientGlow1: string;
  ambientGlow2: string;
  horizonGlow?: string;
  bgImage?: string;
};

function getBgTheme(condition: string, timeOfDay: string): BgTheme {
  // ═══════════════════════════════════════════════════
  //  THUNDERSTORM — Deep dark purple-black, electric
  // ═══════════════════════════════════════════════════
  if (condition === "thunderstorm") {
    return {
      gradient:
        "linear-gradient(to bottom, rgba(3,5,9,0.7) 0%, rgba(10,14,31,0.7) 20%, rgba(14,19,50,0.8) 45%, rgba(20,16,58,0.85) 65%, rgba(12,13,30,0.9) 85%, rgba(5,6,16,0.95) 100%)",
      ambientGlow1: "rgba(80, 100, 255, 0.18)",
      ambientGlow2: "rgba(50, 40, 200, 0.12)",
      horizonGlow: "rgba(100, 120, 255, 0.06)",
      bgImage: "/images/stormy_night_bg.jpg"
    };
  }

  // ═══════════════════════════════════════════════════
  //  RAINY — Dark steel-blue, wet atmosphere
  // ═══════════════════════════════════════════════════
  if (condition === "rainy") {
    return {
      gradient:
        "linear-gradient(to bottom, #060A12 0%, #0B1422 20%, #12203A 45%, #182B48 60%, #0E1C30 80%, #070D18 100%)",
      ambientGlow1: "rgba(70, 140, 220, 0.15)",
      ambientGlow2: "rgba(40, 100, 180, 0.10)",
      horizonGlow: "rgba(80, 150, 220, 0.06)",
      bgImage: "/images/rainy_bg.jpg"
    };
  }

  // ═══════════════════════════════════════════════════
  //  SUNNY — Warm golden-blue sky
  // ═══════════════════════════════════════════════════
  if (condition === "sunny") {
    return {
      gradient:
        "linear-gradient(to bottom, rgba(10,22,40,0.6) 0%, rgba(15,32,64,0.65) 18%, rgba(20,42,80,0.7) 35%, rgba(26,53,101,0.75) 55%, rgba(22,45,78,0.8) 70%, rgba(12,26,48,0.85) 85%, rgba(7,14,26,0.9) 100%)",
      ambientGlow1: "rgba(255, 210, 80, 0.22)",
      ambientGlow2: "rgba(245, 195, 70, 0.12)",
      horizonGlow: "rgba(255, 200, 60, 0.12)",
      bgImage: "/images/sunny_bg.jpg"
    };
  }

  // ═══════════════════════════════════════════════════
  //  SUNSET — Orange-pink-purple warm gradient
  // ═══════════════════════════════════════════════════
  if (condition === "sunset") {
    return {
      gradient:
        "linear-gradient(to bottom, rgba(12,10,24,0.6) 0%, rgba(26,16,48,0.65) 15%, rgba(45,24,64,0.7) 30%, rgba(74,24,56,0.75) 45%, rgba(107,32,48,0.8) 55%, rgba(139,48,32,0.85) 65%, rgba(90,37,37,0.9) 80%, rgba(26,14,24,0.95) 100%)",
      ambientGlow1: "rgba(255, 120, 50, 0.22)",
      ambientGlow2: "rgba(220, 80, 60, 0.14)",
      horizonGlow: "rgba(255, 160, 60, 0.15)",
      bgImage: "/images/sunset_bg.jpg"
    };
  }

  // ═══════════════════════════════════════════════════
  //  HAZY — Warm brownish-gold dust haze
  // ═══════════════════════════════════════════════════
  if (condition === "hazy") {
    return {
      gradient:
        "linear-gradient(to bottom, rgba(14,12,8,0.6) 0%, rgba(26,21,16,0.65) 18%, rgba(42,34,21,0.7) 35%, rgba(53,45,26,0.75) 50%, rgba(44,36,24,0.8) 68%, rgba(26,21,16,0.85) 82%, rgba(13,11,7,0.9) 100%)",
      ambientGlow1: "rgba(200, 160, 80, 0.18)",
      ambientGlow2: "rgba(180, 140, 60, 0.12)",
      horizonGlow: "rgba(220, 180, 100, 0.10)",
      bgImage: "/images/hazy_bg.jpg"
    };
  }

  // ═══════════════════════════════════════════════════
  //  CLOUDY — Muted gray-blue overcast
  // ═══════════════════════════════════════════════════
  if (condition === "cloudy") {
    return {
      gradient:
        "linear-gradient(to bottom, rgba(7,10,16,0.6) 0%, rgba(14,20,32,0.65) 20%, rgba(21,30,48,0.7) 40%, rgba(26,37,64,0.75) 55%, rgba(21,29,48,0.8) 72%, rgba(11,18,32,0.85) 88%, rgba(6,9,16,0.9) 100%)",
      ambientGlow1: "rgba(150, 175, 210, 0.12)",
      ambientGlow2: "rgba(120, 145, 185, 0.08)",
      horizonGlow: "rgba(130, 160, 200, 0.05)",
      bgImage: "/images/cloudy_bg.jpg"
    };
  }

  // ═══════════════════════════════════════════════════
  //  NIGHT — Deep cosmic navy-black with purple tints
  // ═══════════════════════════════════════════════════
  return {
    gradient:
      "linear-gradient(to bottom, rgba(2,3,8,0.6) 0%, rgba(5,8,18,0.7) 15%, rgba(8,13,26,0.75) 30%, rgba(10,16,32,0.8) 50%, rgba(12,14,34,0.85) 65%, rgba(8,9,26,0.9) 82%, rgba(3,4,8,0.95) 100%)",
    ambientGlow1: "rgba(100, 80, 200, 0.10)",
    ambientGlow2: "rgba(60, 50, 160, 0.07)",
    horizonGlow: "rgba(80, 60, 180, 0.04)",
    bgImage: "/images/night_bg.jpg"
  };
}

export default function WeatherBackground({ children }: { children: React.ReactNode }) {
  const { weather } = useWeather();
  const { condition, timeOfDay } = weather;

  const theme = getBgTheme(condition, timeOfDay);

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background Image Layer (Fixed position prevents browser painting bugs on scroll/update) */}
      <div 
        className="fixed inset-0 w-full h-full -z-20 bg-center bg-cover"
        style={{
          backgroundImage: theme.bgImage ? `url(${theme.bgImage})` : 'none',
          backgroundColor: "#030509",
        }}
      />
      
      {/* Darkening gradient overlay over the image */}
      <div 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none" 
        style={{
          background: theme.gradient,
          transition: "background 1.2s ease-in-out",
        }}
      />
      
      {/* Horizon atmospheric haze */}
      {theme.horizonGlow && (
        <div
          className="fixed bottom-0 left-0 right-0 h-[40%] -z-10 pointer-events-none"
          style={{
            background: `linear-gradient(to top, ${theme.horizonGlow} 0%, transparent 100%)`,
            transition: "background 1.2s ease-in-out",
          }}
        />
      )}

      {/* Ambient glow orb — top */}
      <div
        className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        style={{
          backgroundColor: theme.ambientGlow1,
          transition: "background-color 1.2s ease-in-out",
        }}
      />
      {/* Ambient glow orb — right mid */}
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
        style={{
          backgroundColor: theme.ambientGlow2,
          transition: "background-color 1.2s ease-in-out",
        }}
      />

      {/* Weather Canvas Layer */}
      <WeatherCanvas />

      {/* Subtle Grid Pattern Overlay — futuristic HUD feel */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(229, 184, 105, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(229, 184, 105, 0.4) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
