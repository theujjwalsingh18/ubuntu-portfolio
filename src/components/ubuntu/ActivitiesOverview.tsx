"use client";

import { useApps } from "@/contexts/AppsContext";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ActivitiesOverview() {
  const { apps, focusApp, closeApp, setActivitiesVisible } = useApps();
  const openApps = Object.values(apps);

  const handleFocusApp = (id: string) => {
    focusApp(id);
    setActivitiesVisible(false);
  };

  const handleCloseApp = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    closeApp(id);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-md z-[99] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
        onClick={() => setActivitiesVisible(false)}
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8 md:mb-10 text-center"
        >
          Activities
        </motion.h1>

        {openApps.length > 0 ? (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-7xl justify-items-center`}
          >
            <AnimatePresence>
              {openApps.map((app) => (
                <motion.div
                  key={app.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.25 },
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => handleFocusApp(app.id)}
                  className="relative cursor-pointer w-full max-w-[280px]"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl sm:rounded-2xl shadow-lg text-white w-full aspect-video h-auto min-h-[120px] sm:min-h-[140px] md:min-h-[160px] lg:min-h-[180px] flex flex-col overflow-hidden border border-transparent hover:border-orange-400 transition">
                    <div className="h-6 sm:h-7 md:h-8 bg-[#3D3B3A] flex items-center justify-between px-2 sm:px-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center scale-75 sm:scale-100">
                          {app.icon}
                        </div>
                        <span className="text-xs font-sans truncate max-w-[120px] sm:max-w-[140px] md:max-w-[160px]">
                          {app.title}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl opacity-20 p-2">
                      {app.icon}
                    </div>
                  </div>
                  <motion.button
                    onClick={(e) => handleCloseApp(e, app.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 
                               bg-red-500 rounded-full flex items-center justify-center text-white shadow-md 
                               hover:bg-red-600 hover:scale-110 z-10"
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={12} className="sm:w-3 sm:h-3 md:w-4 md:h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <p className="text-white/80 text-lg sm:text-xl text-center px-4">
            No open applications
          </p>
        )}
      </motion.div>
    </AnimatePresence>
  );
}