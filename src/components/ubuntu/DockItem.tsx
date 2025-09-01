"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";

interface DockItemProps {
  name: string;
  children: React.ReactNode;
  onClick: () => void;
  isOpen?: boolean;
  isLink?: boolean;
  mouseX: MotionValue;
}

export function DockItem({ name, children, onClick, isOpen = false, isLink = false, mouseX }: DockItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const item = itemRef.current;
    if (!item) return Infinity;
    const { width, left } = item.getBoundingClientRect();
    return val - (left + width / 2);
  });

  const scale = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
  const scaleSpring = useSpring(scale, {
    damping: 15,
    stiffness: 150,
    mass: 0.1,
  });

  const translateY = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  const translateYSpring = useSpring(translateY, {
    damping: 15,
    stiffness: 150,
    mass: 0.1,
  });

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            ref={itemRef}
            className="relative"
            style={{
              scale: scaleSpring,
              y: translateYSpring,
            }}
            onClick={onClick}
          >
            <div
              className={cn(
                "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-gray-700/50 rounded-lg transition-transform duration-200 ease-in-out",
                "focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              )}
              aria-label={name}
            >
              {children}
            </div>
            {isOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-8px] w-1.5 h-1.5 rounded-full bg-white"></div>
            )}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="top" align="center" className="bg-black/70 text-white border-none rounded-md px-2 py-1 text-xs">
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}