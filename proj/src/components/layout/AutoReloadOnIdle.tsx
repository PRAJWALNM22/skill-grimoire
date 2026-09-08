"use client";

import { useEffect, useRef } from "react";

// 1 hour in milliseconds
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * AutoReloadOnIdle:
 * Automatically reloads the webpage if no user interaction has occurred for 1 continuous hour.
 * User activity (mouse movement, clicks, keypresses, touches, scrolls) resets the 1-hour timer.
 * Also handles tab hibernation / sleep by verifying elapsed time when the tab becomes active.
 */
export default function AutoReloadOnIdle() {
  const lastActivityRef = useRef<number>(Date.now());
  const reloadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const triggerReload = () => {
      window.location.reload();
    };

    // Schedule / reschedule the 1-hour reload timer
    const resetTimer = () => {
      lastActivityRef.current = Date.now();

      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }

      reloadTimeoutRef.current = setTimeout(triggerReload, ONE_HOUR_MS);
    };

    // Throttle activity triggers so high-frequency events (like mousemove/scroll) don't thrash timers
    let throttleTimeout: NodeJS.Timeout | null = null;
    const handleUserActivity = () => {
      const now = Date.now();
      if (now - lastActivityRef.current > 5000) {
        resetTimer();
      } else if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          resetTimer();
          throttleTimeout = null;
        }, 5000);
      }
    };

    // Periodic safety check every 1 minute (ensures tabs running in background or waking from sleep reload if 1hr elapsed)
    const intervalId = setInterval(() => {
      const elapsed = Date.now() - lastActivityRef.current;
      if (elapsed >= ONE_HOUR_MS) {
        triggerReload();
      }
    }, 60 * 1000);

    // Check when user switches back to this tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const elapsed = Date.now() - lastActivityRef.current;
        if (elapsed >= ONE_HOUR_MS) {
          triggerReload();
        }
      }
    };

    const events: (keyof WindowEventMap)[] = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
      "click",
      "wheel",
    ];

    events.forEach((evt) => {
      window.addEventListener(evt, handleUserActivity, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start initial 1-hour timer
    resetTimer();

    return () => {
      if (reloadTimeoutRef.current) {
        clearTimeout(reloadTimeoutRef.current);
      }
      if (throttleTimeout) {
        clearTimeout(throttleTimeout);
      }
      clearInterval(intervalId);

      events.forEach((evt) => {
        window.removeEventListener(evt, handleUserActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}
