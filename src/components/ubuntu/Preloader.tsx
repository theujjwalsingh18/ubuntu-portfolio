"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { UbuntuLogoIcon } from "./icons/UbuntuLogoIcon";

export function Preloader() {
  const [ubuntuText, setUbuntuText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showLogs, setShowLogs] = useState(false);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [currentLog, setCurrentLog] = useState<string | null>(null);

  const fullText = "UBUNTU";

  const userPrefix = "ubuntu@ujjwal:~$";

  const bootLogs = [
    "Initializing system",
    "Loading kernel.....",
    "Starting services..",
    "Launching desktop..",
  ];

  useEffect(() => {
    if (isTyping) {
      const typingInterval = setInterval(() => {
        setUbuntuText((prev) => {
          if (prev.length < fullText.length) {
            return fullText.substring(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            setTimeout(() => setShowLogs(true), 800);
            return prev;
          }
        });
      }, 200);
      return () => clearInterval(typingInterval);
    }
  }, [isTyping, fullText]);

  useEffect(() => {
    if (showLogs) {
      bootLogs.forEach((line, index) => {
        const lineDelay = index * 1500;
        setTimeout(() => {
          setCurrentLog(line);

          if (index === bootLogs.length - 1) {
            setTimeout(() => {
              setFading(true);
              setTimeout(() => setVisible(false), 1200);
            }, 2000);
          }
        }, lineDelay);
      });
    }
  }, [showLogs]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-1000 ease-in-out",
        fading && "opacity-0"
      )}
    >
      <div className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 mb-6 sm:mb-8 md:mb-12">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "6s", animationTimingFunction: "linear" }}
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#grad1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="15 25"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: "4s",
            animationDirection: "reverse",
            animationTimingFunction: "ease-in-out",
          }}
          aria-hidden="true"
        >
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="url(#grad2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 20"
          />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative transform scale-0 opacity-0 animate-logoZoomIn">
            <div className="absolute inset-0 blur-xl bg-accent/40 rounded-full animate-pulse" />
            <div className="animate-logoSpin">
              <UbuntuLogoIcon className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20" />
            </div>
          </div>
        </div>
      </div>

      <p
        className={cn(
          "font-headline text-base sm:text-lg md:text-2xl tracking-[0.35em] font-bold flex items-center gap-1 transition-transform",
          !isTyping && "scale-110 text-accent"
        )}
      >
        <span>STARTING</span>
        <span className="ml-2">{ubuntuText}</span>
        <span
          className={cn(
            "inline-block w-[6px] h-[18px] sm:h-[20px] bg-accent ml-1",
            !isTyping && "animate-blink"
          )}
        />
      </p>

      {showLogs && (
        <div
          className="mt-6 sm:mt-8 h-[1.5rem] sm:h-[1.75rem] text-xs sm:text-sm md:text-base font-mono text-gray-400 flex items-center justify-center"
          role="status"
        >
          <div className="flex items-center whitespace-nowrap">
            <span className="text-accent">{userPrefix}</span>
            &nbsp;
            <span className="relative inline-block">
              {currentLog && (
                <span
                  key={currentLog}
                  className="animate-fadeLine inline-block"
                >
                  {currentLog}
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}