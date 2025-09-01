"use client";

import { useApps } from "@/contexts/AppsContext";
import { DockItem } from "./DockItem";
import { Separator } from "@/components/ui/separator";

import { Terminal as TerminalApp } from "@/components/apps/Terminal";
import { FileExplorer } from "@/components/apps/FileExplorer";
import { Browser } from "@/components/apps/Browser";

import { TerminalIcon } from "./icons/TerminalIcon";
import { FilesIcon } from "./icons/FilesIcon";
import { ChromeIcon } from "./icons/ChromeIcon";
import { DevIcon } from "./icons/DevIcon";
import { GithubIcon } from "./icons/GithubIcon";
import { LinkedInIcon } from "./icons/LinkedInIcon";
import { InstagramIcon } from "./icons/InstagramIcons";
import { useSocials } from "@/contexts/SocialContext";
import { useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const appShortcuts = [
  { id: 'chrome', name: 'Chrome', icon: <ChromeIcon />, component: Browser },
  { id: 'files', name: 'Files', icon: <FilesIcon />, component: FileExplorer },
  { id: 'terminal', name: 'Terminal', icon: <TerminalIcon />, component: TerminalApp },
];

const socialShortcuts = [
  { id: 'developer', name: 'Developer', icon: <DevIcon /> },
  { id: 'github', name: 'GitHub', icon: <GithubIcon /> },
  { id: 'linkedin', name: 'LinkedIn', icon: <LinkedInIcon /> },
  { id: 'instagram', name: 'Instagram', icon: <InstagramIcon /> },
];

export function Dock() {
  const { openApp, apps, focusApp } = useApps();
  const { openSocial } = useSocials();
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex fixed bottom-4 left-1/2 -translate-x-1/2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex items-end h-16 md:h-20 justify-center space-x-1 md:space-x-2 bg-black/40 p-1 md:p-2 rounded-2xl backdrop-blur-sm border border-white/10 shadow-lg"
      >
        {appShortcuts.map((app, index) => (
          <DockItem
            key={app.id}
            name={app.name}
            onClick={() => {
              if (apps[app.id]) {
                focusApp(app.id);
              } else {
                openApp({ id: app.id, title: app.name, component: app.component, icon: app.icon });
              }
            }}
            isOpen={!!apps[app.id]}
            mouseX={mouseX}
          >
            {app.icon}
          </DockItem>
        ))}
        <Separator orientation="vertical" className="hidden md:block h-12 w-[1px] mx-2 bg-white/20 self-center" />
        {socialShortcuts.map((link, index) => (
          <DockItem
            key={link.id}
            name={link.name}
            onClick={() => openSocial(link.id)}
            isLink
            mouseX={mouseX}
          >
            {link.icon}
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}