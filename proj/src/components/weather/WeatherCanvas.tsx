"use client";

import React, { useEffect, useRef } from "react";
import { useWeather } from "@/context/WeatherContext";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  opacitySpeed: number;
  length?: number;
  color?: string;
}

interface LightningBranch {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness: number;
}

// ═══════════════════════════════════════════════════════════
// Celestial body helpers — draw sun or moon at a position on
// a semicircular arc from left (east) to right (west)
// ═══════════════════════════════════════════════════════════

/** Get (x, y) on a semicircular arc.  progress: 0 = left/east → 0.5 = top/zenith → 1 = right/west */
function getArcPosition(
  progress: number,
  width: number,
  height: number
): { x: number; y: number } {
  // Arc spans horizontally from 8% to 92% of the viewport,
  // and vertically from ~75% height (horizon) up to ~8% height (zenith)
  const margin = width * 0.08;
  const arcWidth = width - margin * 2;
  const arcBottom = height * 0.72;
  const arcTop = height * 0.06;
  const arcHeight = arcBottom - arcTop;

  // Angle: 0 → π  (left to right semicircle)
  const angle = Math.PI * (1 - progress); // flip so 0=left
  const x = margin + (arcWidth / 2) + (arcWidth / 2) * Math.cos(angle);
  const y = arcBottom - arcHeight * Math.sin(angle);

  return { x, y };
}

function drawSun(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tick: number,
  radius: number = 28
) {
  ctx.save();

  // Outer atmospheric glow
  const outerGlow = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 5);
  outerGlow.addColorStop(0, "rgba(255, 210, 80, 0.20)");
  outerGlow.addColorStop(0.3, "rgba(255, 195, 60, 0.08)");
  outerGlow.addColorStop(0.6, "rgba(255, 180, 40, 0.03)");
  outerGlow.addColorStop(1, "rgba(255, 180, 40, 0)");
  ctx.fillStyle = outerGlow;
  ctx.fillRect(x - radius * 5, y - radius * 5, radius * 10, radius * 10);

  // Ray spokes (rotating slowly)
  const rayCount = 12;
  ctx.globalAlpha = 0.12 + Math.sin(tick * 0.02) * 0.04;
  ctx.strokeStyle = "#FFD860";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2 + tick * 0.003;
    const innerR = radius * 1.4;
    const outerR = radius * 2.5 + Math.sin(tick * 0.015 + i) * 8;
    ctx.beginPath();
    ctx.moveTo(x + Math.cos(angle) * innerR, y + Math.sin(angle) * innerR);
    ctx.lineTo(x + Math.cos(angle) * outerR, y + Math.sin(angle) * outerR);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;

  // Inner glow corona
  const corona = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 1.8);
  corona.addColorStop(0, "rgba(255, 240, 180, 0.45)");
  corona.addColorStop(0.5, "rgba(255, 210, 80, 0.15)");
  corona.addColorStop(1, "rgba(255, 180, 40, 0)");
  ctx.fillStyle = corona;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.8, 0, Math.PI * 2);
  ctx.fill();

  // Sun body
  const sunGrad = ctx.createRadialGradient(x - radius * 0.2, y - radius * 0.2, 0, x, y, radius);
  sunGrad.addColorStop(0, "#FFF8E0");
  sunGrad.addColorStop(0.4, "#FFD860");
  sunGrad.addColorStop(0.8, "#F5B830");
  sunGrad.addColorStop(1, "#D4940A");
  ctx.fillStyle = sunGrad;
  ctx.shadowColor = "rgba(255, 210, 80, 0.8)";
  ctx.shadowBlur = 30;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.restore();
}

function drawMoon(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tick: number,
  radius: number = 22
) {
  ctx.save();

  // Outer atmospheric glow
  const outerGlow = ctx.createRadialGradient(x, y, radius * 0.5, x, y, radius * 4);
  outerGlow.addColorStop(0, "rgba(200, 210, 255, 0.15)");
  outerGlow.addColorStop(0.4, "rgba(180, 190, 240, 0.06)");
  outerGlow.addColorStop(1, "rgba(160, 170, 220, 0)");
  ctx.fillStyle = outerGlow;
  ctx.fillRect(x - radius * 4, y - radius * 4, radius * 8, radius * 8);

  // Inner corona
  const corona = ctx.createRadialGradient(x, y, radius * 0.3, x, y, radius * 1.6);
  corona.addColorStop(0, "rgba(220, 230, 255, 0.30)");
  corona.addColorStop(0.5, "rgba(200, 210, 240, 0.10)");
  corona.addColorStop(1, "rgba(180, 190, 220, 0)");
  ctx.fillStyle = corona;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.6, 0, Math.PI * 2);
  ctx.fill();

  // Moon body
  const moonGrad = ctx.createRadialGradient(x - radius * 0.15, y - radius * 0.15, 0, x, y, radius);
  moonGrad.addColorStop(0, "#F0F4FF");
  moonGrad.addColorStop(0.5, "#D4DDEF");
  moonGrad.addColorStop(0.8, "#B8C4DA");
  moonGrad.addColorStop(1, "#9AABC4");
  ctx.fillStyle = moonGrad;
  ctx.shadowColor = "rgba(200, 215, 255, 0.6)";
  ctx.shadowBlur = 20;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Surface detail (small craters)
  ctx.globalAlpha = 0.15;
  ctx.fillStyle = "#8899BB";
  const craters = [
    { cx: -0.2, cy: 0.15, r: 0.12 },
    { cx: 0.1, cy: -0.25, r: 0.08 },
    { cx: -0.35, cy: -0.1, r: 0.06 },
  ];
  for (const c of craters) {
    ctx.beginPath();
    ctx.arc(x + c.cx * radius, y + c.cy * radius, c.r * radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.restore();
}

/** Draw a faint dotted arc path showing the celestial trajectory */
function drawArcPath(ctx: CanvasRenderingContext2D, width: number, height: number, isDay: boolean) {
  ctx.save();
  ctx.setLineDash([4, 8]);
  ctx.strokeStyle = isDay
    ? "rgba(229, 184, 105, 0.08)"
    : "rgba(160, 180, 220, 0.06)";
  ctx.lineWidth = 1;
  ctx.beginPath();

  for (let i = 0; i <= 100; i++) {
    const progress = i / 100;
    const pos = getArcPosition(progress, width, height);
    if (i === 0) ctx.moveTo(pos.x, pos.y);
    else ctx.lineTo(pos.x, pos.y);
  }
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

// ═══════════════════════════════════════════════════════════

export default function WeatherCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { weather, sunProgress, moonProgress } = useWeather();
  const { condition, timeOfDay } = weather;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle pools
    const particles: Particle[] = [];
    const particleCount =
      condition === "rainy" || condition === "thunderstorm"
        ? 200
        : condition === "night"
          ? 160
          : condition === "hazy"
            ? 120
            : condition === "cloudy"
              ? 90
              : 70;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX:
          condition === "rainy" || condition === "thunderstorm"
            ? -1.5 - Math.random() * 1.5
            : condition === "hazy"
              ? Math.random() * 0.6 - 0.1
              : (Math.random() - 0.5) * 0.5,
        speedY:
          condition === "rainy"
            ? Math.random() * 12 + 8
            : condition === "thunderstorm"
              ? Math.random() * 14 + 10
              : condition === "sunset"
                ? -Math.random() * 0.8 - 0.2 // embers float up
                : condition === "hazy"
                  ? Math.random() * 0.3 + 0.05
                  : condition === "cloudy"
                    ? Math.random() * 0.15 - 0.05
                    : Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        maxOpacity: Math.random() * 0.8 + 0.2,
        opacitySpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        length: Math.random() * 20 + 10,
        color:
          condition === "sunset"
            ? "#F59E0B"
            : condition === "sunny"
              ? "#FDE68A"
              : condition === "night"
                ? "#FFFFFF"
                : condition === "hazy"
                  ? "#C8A050"
                  : condition === "cloudy"
                    ? "#8899BB"
                    : "#A5C9FF",
      });
    }

    // Cloud-like blobs for cloudy condition
    const cloudBlobs: { x: number; y: number; w: number; h: number; speed: number; opacity: number }[] = [];
    if (condition === "cloudy") {
      for (let i = 0; i < 6; i++) {
        cloudBlobs.push({
          x: Math.random() * width * 1.5 - width * 0.25,
          y: Math.random() * height * 0.5 + height * 0.05,
          w: Math.random() * 300 + 200,
          h: Math.random() * 80 + 40,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.06 + 0.02,
        });
      }
    }

    // Shooting stars for night
    let shootingStar: { x: number; y: number; length: number; speed: number; opacity: number } | null = null;
    let nextShootingStarTime = Date.now() + 2000;

    // Lightning for thunderstorm
    let lightningBranches: LightningBranch[] = [];
    let lightningFlashOpacity = 0;
    let nextLightningTime = Date.now() + 1500;

    function generateLightning() {
      lightningBranches = [];
      const startX = Math.random() * width * 0.8 + width * 0.1;
      const startY = Math.random() * (height * 0.15);

      let currX = startX;
      let currY = startY;
      const steps = Math.floor(Math.random() * 8 + 12);
      const stepY = (height * 0.6) / steps;

      for (let i = 0; i < steps; i++) {
        const nextX = currX + (Math.random() - 0.5) * 60;
        const nextY = currY + stepY + (Math.random() - 0.2) * 20;

        lightningBranches.push({
          x1: currX,
          y1: currY,
          x2: nextX,
          y2: nextY,
          thickness: Math.max(1, 3.5 - (i / steps) * 2.5),
        });

        // Spawn fork branch
        if (Math.random() > 0.65) {
          const forkSteps = Math.floor(Math.random() * 4 + 2);
          let forkX = currX;
          let forkY = currY;
          const forkAngle = (Math.random() - 0.5) * 40;
          for (let f = 0; f < forkSteps; f++) {
            const fNextX = forkX + forkAngle + (Math.random() - 0.5) * 30;
            const fNextY = forkY + stepY * 0.8;
            lightningBranches.push({
              x1: forkX,
              y1: forkY,
              x2: fNextX,
              y2: fNextY,
              thickness: 1.2,
            });
            forkX = fNextX;
            forkY = fNextY;
          }
        }

        currX = nextX;
        currY = nextY;
      }

      lightningFlashOpacity = 0.85;
    }

    // Animation Loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Removed atmospheric base overlay so the background image shows clearly

      // ═══════════════════════════════════════════
      // 3. CONDITION-SPECIFIC OVERLAYS
      // ═══════════════════════════════════════════

      if (condition === "thunderstorm") {
        if (Date.now() > nextLightningTime) {
          generateLightning();
          nextLightningTime = Date.now() + Math.random() * 6000 + 4000;
        }

        if (lightningFlashOpacity > 0.02) {
          // Commented out the full-screen flash to prevent the background from 'coming and going'
          // ctx.fillStyle = `rgba(215, 230, 255, ${lightningFlashOpacity * 0.35})`;
          // ctx.fillRect(0, 0, width, height);

          ctx.strokeStyle = "rgba(240, 248, 255, 0.95)";
          ctx.shadowColor = "#60A5FA";
          ctx.shadowBlur = 18;
          ctx.beginPath();
          for (const b of lightningBranches) {
            ctx.lineWidth = b.thickness;
            ctx.moveTo(b.x1, b.y1);
            ctx.lineTo(b.x2, b.y2);
          }
          ctx.stroke();
          ctx.shadowBlur = 0;

          lightningFlashOpacity *= 0.86;
        }
      } else if (condition === "sunny") {
        // Volumetric light rays from the sun position
        if (sunProgress !== null) {
          const sunPos = getArcPosition(sunProgress, width, height);
          ctx.save();
          ctx.globalAlpha = 0.06 + Math.sin(tick * 0.015) * 0.02;
          ctx.fillStyle = "#F5D075";
          for (let r = 0; r < 5; r++) {
            const angle = 0.4 + r * 0.15 + Math.sin(tick * 0.005 + r) * 0.05;
            ctx.beginPath();
            ctx.moveTo(sunPos.x, sunPos.y);
            ctx.lineTo(sunPos.x - Math.cos(angle) * width * 1.2, sunPos.y + Math.sin(angle) * height * 1.2);
            ctx.lineTo(sunPos.x - Math.cos(angle + 0.08) * width * 1.2, sunPos.y + Math.sin(angle + 0.08) * height * 1.2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }
      } else if (condition === "night") {
        // Shooting Star
        if (Date.now() > nextShootingStarTime && !shootingStar) {
          shootingStar = {
            x: Math.random() * width * 0.7 + width * 0.1,
            y: Math.random() * height * 0.3,
            length: Math.random() * 80 + 60,
            speed: Math.random() * 10 + 12,
            opacity: 1,
          };
          nextShootingStarTime = Date.now() + Math.random() * 7000 + 4000;
        }

        if (shootingStar) {
          ctx.save();
          const tailX = shootingStar.x - shootingStar.length * 0.8;
          const tailY = shootingStar.y - shootingStar.length * 0.5;
          const starGrad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
          starGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
          starGrad.addColorStop(1, `rgba(255, 245, 200, ${shootingStar.opacity})`);
          ctx.strokeStyle = starGrad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(shootingStar.x, shootingStar.y);
          ctx.stroke();

          shootingStar.x += shootingStar.speed;
          shootingStar.y += shootingStar.speed * 0.6;
          shootingStar.opacity -= 0.03;
          if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
            shootingStar = null;
          }
          ctx.restore();
        }
      } else if (condition === "hazy") {
        // Haze overlay — warm low-visibility veil
        ctx.save();
        const hazeGrad = ctx.createLinearGradient(0, 0, 0, height);
        hazeGrad.addColorStop(0, "rgba(180, 150, 80, 0.03)");
        hazeGrad.addColorStop(0.4, "rgba(160, 130, 60, 0.06)");
        hazeGrad.addColorStop(0.7, "rgba(140, 110, 50, 0.08)");
        hazeGrad.addColorStop(1, "rgba(120, 90, 40, 0.05)");
        ctx.fillStyle = hazeGrad;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // Cloud blobs for cloudy condition
      if (condition === "cloudy") {
        for (const cloud of cloudBlobs) {
          ctx.save();
          ctx.globalAlpha = cloud.opacity;
          const cGrad = ctx.createRadialGradient(
            cloud.x + cloud.w / 2, cloud.y + cloud.h / 2, 10,
            cloud.x + cloud.w / 2, cloud.y + cloud.h / 2, cloud.w / 2
          );
          cGrad.addColorStop(0, "rgba(160, 180, 210, 0.3)");
          cGrad.addColorStop(0.5, "rgba(140, 160, 190, 0.15)");
          cGrad.addColorStop(1, "rgba(120, 140, 170, 0)");
          ctx.fillStyle = cGrad;
          ctx.beginPath();
          ctx.ellipse(cloud.x + cloud.w / 2, cloud.y + cloud.h / 2, cloud.w / 2, cloud.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

          // Drift clouds
          cloud.x += cloud.speed;
          if (cloud.x > width + cloud.w) {
            cloud.x = -cloud.w;
            cloud.y = Math.random() * height * 0.5 + height * 0.05;
          }
        }
      }

      // ═══════════════════════════════════════════
      // 4. PARTICLES (Rain, Stars, Dust, Embers, etc.)
      // ═══════════════════════════════════════════

      for (const p of particles) {
        if (condition === "rainy" || condition === "thunderstorm") {
          // Rain lines
          ctx.strokeStyle = `rgba(180, 215, 255, ${p.opacity * 0.6})`;
          ctx.lineWidth = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * (p.length! / 5), p.y + p.length!);
          ctx.stroke();

          // Splash effect at bottom
          if (p.y > height - 30) {
            ctx.save();
            ctx.globalAlpha = p.opacity * 0.3;
            ctx.fillStyle = "rgba(180, 215, 255, 0.4)";
            ctx.beginPath();
            ctx.ellipse(p.x, height - 5, 3, 1.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        } else if (condition === "night") {
          // Twinkling stars
          p.opacity += p.opacitySpeed;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.opacitySpeed = -p.opacitySpeed;
          }
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0.05, p.opacity)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();
        } else if (condition === "sunset") {
          // Warm embers
          p.opacity += p.opacitySpeed;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.opacitySpeed = -p.opacitySpeed;
          }
          ctx.fillStyle = `rgba(245, 158, 11, ${p.opacity * 0.75})`;
          ctx.shadowColor = "#F59E0B";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (condition === "hazy") {
          // Warm dust/sand particles
          p.opacity += p.opacitySpeed * 0.5;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.opacitySpeed = -p.opacitySpeed;
          }
          ctx.fillStyle = `rgba(200, 160, 80, ${p.opacity * 0.5})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (condition === "cloudy") {
          // Soft light motes
          p.opacity += p.opacitySpeed;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.opacitySpeed = -p.opacitySpeed;
          }
          ctx.fillStyle = `rgba(150, 170, 200, ${p.opacity * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Sunny / default golden light dust motes
          p.opacity += p.opacitySpeed;
          if (p.opacity > p.maxOpacity || p.opacity < 0.1) {
            p.opacitySpeed = -p.opacitySpeed;
          }
          ctx.fillStyle = `rgba(229, 184, 105, ${p.opacity * 0.55})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Particle position step
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around boundaries
        if (p.y > height) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -20) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        else if (p.x < 0) p.x = width;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [condition, timeOfDay, sunProgress, moonProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[1] w-full h-full"
      style={{ opacity: 0.95 }}
    />
  );
}
