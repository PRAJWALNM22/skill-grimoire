import React from "react";
import Navbar from "@/components/layout/Navbar";
import { WeatherProvider } from "@/context/WeatherContext";
import WeatherBackground from "@/components/weather/WeatherBackground";
import { AuthProvider } from "@/context/AuthContext";
import RuralAccessSection from "@/components/landing/RuralAccessSection";

export default function RuralAccessPage() {
  return (
    <AuthProvider>
      <WeatherProvider>
        <WeatherBackground>
          <div className="min-h-screen flex flex-col font-sans relative overflow-hidden">
            <Navbar />
            <main className="flex-1 flex flex-col w-full px-4 sm:px-6 lg:px-8 pb-12 pt-24">
               <RuralAccessSection />
            </main>
          </div>
        </WeatherBackground>
      </WeatherProvider>
    </AuthProvider>
  );
}
