"use client";

import { useState } from "react";
import { Home, Briefcase, Folder, Award, Code, Phone, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { EducationView } from "./EducationView";
import { ProjectsView } from "./ProjectsView";
import { CertificatesView } from "./CertificatesView";
import { SkillsView } from "./SkillsView";
import ContactView from "./ContactView";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const sidebarItems = [
  { name: "Home", icon: Home, path: "~" },
  { name: "Education", icon: Briefcase, path: "~/Education" },
  { name: "Projects", icon: Folder, path: "~/Projects" },
  { name: "Certificates", icon: Award, path: "~/Certificates" },
  { name: "Skills", icon: Code, path: "~/Skills" },
  { name: "Contact", icon: Phone, path: "~/Contact" },
];

const homeItems = [
  { name: "Education", icon: Briefcase, path: "~/Education" },
  { name: "Projects", icon: Folder, path: "~/Projects" },
  { name: "Certificates", icon: Award, path: "~/Certificates" },
  { name: "Skills", icon: Code, path: "~/Skills" },
  { name: "Contact", icon: Phone, path: "~/Contact" },
];

export function FileExplorer() {
  const [currentPath, setCurrentPath] = useState("~");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const containerBg = isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900";
  const sidebarBg = isDark ? "bg-gray-800/90 border-r border-gray-700" : "bg-gray-200/90 border-r border-gray-300";
  const sidebarHoverBg = isDark ? "hover:bg-gray-700/50" : "hover:bg-gray-300/50";
  const sidebarActiveBg = isDark ? "bg-orange-500 text-white font-semibold shadow-lg" : "bg-orange-500 text-white font-semibold shadow-lg";
  const headerBg = isDark ? "bg-gray-800 border-b border-gray-700" : "bg-gray-200 border-b border-gray-300";
  const pathText = isDark ? "text-gray-300" : "text-gray-600";
  const homeItemBg = isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-400";
  const homeItemIconColor = isDark ? "text-orange-400" : "text-orange-600";
  const homeItemTextColor = isDark ? "text-white" : "text-gray-800";
  const floatingIconColor = isDark ? "text-gray-600/10" : "text-gray-400/20";
  const initialsBg = isDark ? "bg-gray-700 text-gray-400" : "bg-gray-300 text-gray-600";
  const mobileMenuButton = isDark ? "text-white" : "text-gray-800";
  const closeButton = isDark ? "text-white" : "text-gray-800";


  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    setSidebarOpen(false);
  };

  const renderSection = () => {
    switch (currentPath) {
      case "~/Education":
        return <EducationView />;
      case "~/Projects":
        return <ProjectsView />;
      case "~/Certificates":
        return <CertificatesView />;
      case "~/Skills":
        return <SkillsView />;
      case "~/Contact":
        return <ContactView />;
      default:
        return (
          <div className="relative flex-1">
            <div className="absolute inset-0 pointer-events-none hidden md:block">
              {Array.from({ length: 12 }).map((_, idx) => (
                <motion.div
                  key={idx}
                  className={cn("absolute", floatingIconColor)}
                  initial={{ y: Math.random() * 800, x: Math.random() * 800, opacity: 0 }}
                  animate={{
                    y: [Math.random() * 600, Math.random() * 600 - 100],
                    opacity: [0.1, 0.2, 0.1],
                    rotate: [0, 20, -20, 0],
                  }}
                  transition={{
                    duration: 12 + Math.random() * 8,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                >
                  <Folder size={48} />
                </motion.div>
              ))}
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-6 md:gap-6">
              {homeItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  onDoubleClick={() => handleNavigate(item.path)}
                  whileHover={{ scale: 1.05, boxShadow: "0 12px 24px rgba(0,0,0,0.4)" }}
                  className={cn(
                    "rounded-xl flex flex-col items-center justify-center p-4 md:p-6 cursor-pointer transition-all duration-300",
                    homeItemBg
                  )}
                >
                  <item.icon size={32} className={cn("mb-2 md:size-12", homeItemIconColor)} />
                  <span className={cn("font-semibold text-sm md:text-lg text-center", homeItemTextColor)}>{item.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("flex flex-col md:flex-row h-full", containerBg)}>
      <div className={cn("hidden md:flex w-48 p-3 flex-col space-y-2 relative z-10", sidebarBg)}>
        <div className="flex-grow">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.path)}
              className={cn(
                "flex items-center space-x-2 p-2 rounded-md w-full text-left transition",
                sidebarHoverBg,
                currentPath === item.path ? sidebarActiveBg : (isDark ? "text-white" : "text-gray-800")
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
        <div className={cn("flex items-center justify-between p-4 sticky top-0 z-20 md:hidden", headerBg)}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn("p-2 rounded-md transition", sidebarHoverBg, mobileMenuButton)}
          >
            <Menu size={20} />
          </button>
          <div className={cn("text-sm", pathText)}>Path: {currentPath}</div>
          <div className="w-8"></div>
        </div>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className={cn("fixed inset-y-0 left-0 w-64 p-4 flex flex-col z-30", sidebarBg)}
            >
              <div className="flex justify-end">
                <button onClick={() => setSidebarOpen(false)} className={cn("p-2", closeButton)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col space-y-2 mt-4">
                {sidebarItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.path)}
                    className={cn(
                      "flex items-center space-x-2 p-3 rounded-md w-full text-left transition",
                      sidebarHoverBg,
                      currentPath === item.path ? sidebarActiveBg : (isDark ? "text-white" : "text-gray-800")
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={cn("hidden md:flex p-2 text-sm", headerBg, pathText)}>
          Path: {currentPath}
        </div>

        <div className="flex-1 overflow-auto">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}