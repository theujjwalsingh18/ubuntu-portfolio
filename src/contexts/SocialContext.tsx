"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

interface SocialsContextType {
  activeSocial: string | null;
  openSocial: (id: string) => void;
  closeSocial: () => void;
}

const SocialsContext = createContext<SocialsContextType | undefined>(undefined);

export const SocialsProvider = ({ children }: { children: ReactNode }) => {
  const [activeSocial, setActiveSocial] = useState<string | null>(null);

  const openSocial = (id: string) => {
    setActiveSocial(id);
  };

  const closeSocial = () => {
    setActiveSocial(null);
  };
  
  return (
    <SocialsContext.Provider value={{ activeSocial, openSocial, closeSocial }}>
      {children}
    </SocialsContext.Provider>
  );
};

export const useSocials = () => {
  const context = useContext(SocialsContext);
  if (context === undefined) {
    throw new Error('useSocials must be used within a SocialsProvider');
  }
  return context;
};