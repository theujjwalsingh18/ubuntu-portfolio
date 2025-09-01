"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

export interface AppState {
  id: string;
  title: string;
  component: React.ComponentType<{ app: AppState }>;
  icon: ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  prevX?: number;
  prevY?: number;
  prevWidth?: number;
  prevHeight?: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
}

interface AppsContextType {
  apps: Record<string, AppState>;
  activitiesVisible: boolean;
  setActivitiesVisible: (visible: boolean) => void;
  openApp: (app: Omit<AppState, 'x' | 'y' | 'width' | 'height' | 'isMinimized' | 'isMaximized' | 'zIndex' | 'prevX' | 'prevY' | 'prevWidth' | 'prevHeight' | 'component'> & { component: React.ComponentType<any> }) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  updateApp: (id: string, updates: Partial<Pick<AppState, 'x' | 'y' | 'width' | 'height'>>) => void;
  minimizeApp: (id: string) => void;
  toggleMaximize: (id: string) => void;
  cycleAppFocus: (direction: 'next' | 'prev') => void;
}

const AppsContext = createContext<AppsContextType | undefined>(undefined);

export const AppsProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<Record<string, AppState>>({});
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [activitiesVisible, setActivitiesVisible] = useState(false);

  const openApp = (appData: Omit<AppState, 'x' | 'y' | 'width' | 'height' | 'isMinimized' | 'isMaximized' | 'zIndex' | 'prevX' | 'prevY' | 'prevWidth' | 'prevHeight' | 'component'> & { component: React.ComponentType<any> }) => {
    setApps(prevApps => {
      const openAppsCount = Object.values(prevApps).filter(app => !app.isMinimized).length;

      if (prevApps[appData.id]) {
        const appToFocus = prevApps[appData.id];
        if (appToFocus.isMinimized) {
          const updatedApps = { ...prevApps };
          updatedApps[appData.id].zIndex = zIndexCounter + 1;
          updatedApps[appData.id].isMinimized = false;
          setZIndexCounter(zIndexCounter + 1);
          return updatedApps;
        }
        focusApp(appData.id);
        return prevApps;
      }

      const newWidth = window.innerWidth * 0.75;
      const newHeight = window.innerHeight * 0.6;
      const initialX = (window.innerWidth - newWidth) / 2;
      const initialY = (window.innerHeight - newHeight) / 2;
      const offset = 30;

      const newApp: AppState = {
        ...appData,
        x: initialX + (openAppsCount * offset),
        y: initialY + (openAppsCount * offset),
        width: newWidth,
        height: newHeight,
        isMinimized: false,
        isMaximized: false,
        zIndex: zIndexCounter + 1,
      };
      setZIndexCounter(zIndexCounter + 1);
      return { ...prevApps, [appData.id]: newApp };
    });
  };

  const closeApp = (id: string) => {
    setApps(prevApps => {
      const newApps = { ...prevApps };
      delete newApps[id];
      return newApps;
    });
  };

  const focusApp = (id: string) => {
    setApps(prevApps => {
      if (!prevApps[id]) return prevApps;

      const app = prevApps[id];
      const isCurrentlyFocused = Object.values(prevApps).every(
        (otherApp) => app.zIndex >= otherApp.zIndex
      );

      if (!app.isMinimized && isCurrentlyFocused) return prevApps;

      const newApps = { ...prevApps };
      const newZIndex = zIndexCounter + 1;
      newApps[id] = { ...newApps[id], zIndex: newZIndex, isMinimized: false };
      setZIndexCounter(newZIndex);
      return newApps;
    });
  };

  const updateApp = (id: string, updates: Partial<Pick<AppState, 'x' | 'y' | 'width' | 'height'>>) => {
    setApps(prevApps => {
      if (!prevApps[id]) return prevApps;
      const newApps = { ...prevApps };
      newApps[id] = { ...newApps[id], ...updates };
      return newApps;
    });
  };

  const minimizeApp = (id: string) => {
    setApps(prevApps => {
      if (!prevApps[id]) return prevApps;
      const newApps = { ...prevApps };
      newApps[id].isMinimized = true;
      return newApps;
    });
  };

  const toggleMaximize = (id: string) => {
    setApps(prevApps => {
      if (!prevApps[id]) return prevApps;
      const app = prevApps[id];
      const newApps = { ...prevApps };

      if (app.isMaximized) {
        newApps[id] = {
          ...app,
          isMaximized: false,
          x: app.prevX ?? 100,
          y: app.prevY ?? 100,
          width: app.prevWidth ?? 800,
          height: app.prevHeight ?? 600,
        };
      } else {
        newApps[id] = {
          ...app,
          isMaximized: true,
          prevX: app.x,
          prevY: app.y,
          prevWidth: app.width,
          prevHeight: app.height,
        };
      }
      return newApps;
    });
  };

  const cycleAppFocus = (direction: 'next' | 'prev') => {
    setApps(prevApps => {
      const openApps = Object.values(prevApps)
        .filter(app => !app.isMinimized)
        .sort((a, b) => a.zIndex - b.zIndex);

      if (openApps.length < 2) return prevApps;

      const newZIndex = zIndexCounter + 1;
      let appToFocusId: string;

      if (direction === 'next') {
        appToFocusId = openApps[0].id;
      } else {
        const currentlyFocusedApp = openApps[openApps.length - 1];
        const appToFocus = openApps[openApps.length - 2];

        const newApps = { ...prevApps };
        newApps[currentlyFocusedApp.id] = { ...currentlyFocusedApp, zIndex: 1 };
        newApps[appToFocus.id] = { ...appToFocus, zIndex: newZIndex };

        setZIndexCounter(newZIndex);
        return newApps;
      }

      const newApps = { ...prevApps };
      newApps[appToFocusId] = { ...newApps[appToFocusId], zIndex: newZIndex };
      setZIndexCounter(newZIndex);
      return newApps;
    });
  };

  return (
    <AppsContext.Provider value={{ apps, openApp, closeApp, focusApp, updateApp, minimizeApp, toggleMaximize, activitiesVisible, setActivitiesVisible, cycleAppFocus }}>
      {children}
    </AppsContext.Provider>
  );
};

export const useApps = () => {
  const context = useContext(AppsContext);
  if (context === undefined) {
    throw new Error('useApps must be used within an AppsProvider');
  }
  return context;
};