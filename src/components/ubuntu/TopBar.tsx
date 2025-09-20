"use client";

import { useState, useEffect } from "react";
import { Wifi, Battery, Moon, Sun, Monitor, MoreHorizontal } from "lucide-react";
import { useApps } from "@/contexts/AppsContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { Calendar } from "@/components/ui/calender";

export function TopBar() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState(new Date());
    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [isOnline, setIsOnline] = useState(true);
    const { setActivitiesVisible } = useApps();
    const { theme, toggleTheme, brightness, setBrightness } = useTheme();

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setDate(now);
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })
            );
        };

        updateClock();
        const timerId = setInterval(updateClock, 1000);

        if ("getBattery" in navigator) {
            (navigator as any).getBattery().then((battery: any) => {
                const updateLevel = () =>
                    setBatteryLevel(Math.floor(battery.level * 100));
                updateLevel();
                battery.addEventListener("levelchange", updateLevel);
            });
        }

        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
        updateOnlineStatus();

        return () => {
            clearInterval(timerId);
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    return (
        <div className="relative w-full h-8 bg-black/80 text-white flex items-center px-2 text-sm z-50 backdrop-blur-sm">
            <div className="flex items-center">
                <button
                    onClick={() => setActivitiesVisible(true)}
                    className="hover:bg-white/10 p-1.5 rounded"
                >
                    <MoreHorizontal size={20} />
                </button>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="font-sans font-medium hover:bg-white/10 px-3 py-1 rounded">
                            {date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            })}{" "}
                            {time}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-4 bg-background/90 backdrop-blur-sm border-border/50 text-foreground"
                        align="center"
                    >
                        <div className="text-left mb-4">
                            <p className="text-lg font-semibold">
                                {date.toLocaleDateString([], { weekday: "long" })}
                            </p>
                            <p className="text-muted-foreground">
                                {date.toLocaleDateString([], {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(day) => day && setDate(day)}
                            className="p-0"
                            classNames={{
                                day_selected:
                                    "bg-green-500 text-white rounded-full hover:bg-green-600 focus:bg-green-600",
                                day_today: "text-accent",
                            }}
                        />
                    </PopoverContent>
                </Popover>
            </div>
            <div className="ml-auto flex items-center">
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="flex items-center space-x-3 hover:bg-white/10 px-2 py-1 rounded">
                            {isOnline && <Wifi size={18} />}
                            {batteryLevel !== null && (
                                <div className="flex items-center space-x-1">
                                    <Battery size={18} />
                                    <span>{batteryLevel}%</span>
                                </div>
                            )}
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80 mr-4 bg-secondary border-border text-foreground">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Settings</h4>
                                <p className="text-sm text-muted-foreground">
                                    Adjust your system settings.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="dark-mode" className="flex items-center gap-2">
                                        {theme === "dark" ? <Moon size={16} /> : <Sun size={16} />}
                                        Dark Mode
                                    </Label>
                                    <Switch
                                        id="dark-mode"
                                        checked={theme === "dark"}
                                        onCheckedChange={toggleTheme}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="brightness" className="flex items-center gap-2">
                                        <Monitor size={16} />
                                        Brightness
                                    </Label>
                                    <Slider
                                        id="brightness"
                                        defaultValue={[brightness]}
                                        max={100}
                                        step={1}
                                        onValueChange={(value) => setBrightness(value[0])}
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
}