"use client";

import { useApps } from "@/contexts/AppsContext";
import { Dock } from "./Dock";
import { TopBar } from "./TopBar";
import { Window } from "./Windows";
import { SocialsModal } from "./SocialsModal";
import { ActivitiesOverview } from "./ActivitiesOverview";
import { useRef, useCallback, WheelEvent, useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Preloader } from "./Preloader";

export function Desktop() {
  const { apps, activitiesVisible, cycleAppFocus } = useApps();
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);
  const { theme, brightness } = useTheme();
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const fadeOutTimer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(fadeOutTimer);
    }, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && !wheelTimeout.current) {
        if (e.deltaX > 5) {
          cycleAppFocus("next");
        } else if (e.deltaX < -5) {
          cycleAppFocus("prev");
        }

        wheelTimeout.current = setTimeout(() => {
          wheelTimeout.current = null;
        }, 300);
      }
    },
    [cycleAppFocus]
  );

  if (loading) {
    return <Preloader />;
  }

  return (
    <div
      className={cn(
        "h-screen w-screen flex flex-col transition-all duration-500 fixed inset-0",
        theme
      )}
      style={{
        backgroundImage: `url('https://ik.imagekit.io/theujjwalsingh18/ubu_wall-2.jpg?fo-auto')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: `brightness(${brightness}%)`,
      }}
      onWheel={handleWheel}
    >
      <TopBar />
      <main className="flex-1 relative h-full">
        {activitiesVisible && <ActivitiesOverview />}
        {Object.values(apps).map((app) => (
          <Window key={app.id} app={app} />
        ))}
        <SocialsModal />
      </main>
      <Dock />
    </div>
  );
}