"use client";

import { useEffect } from "react";

export const useSecurityBlocker = () => {
  useEffect(() => {
    const disableContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);

    const disableKeys = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && ["U", "S"].includes(e.key))
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", disableKeys);

    const disableAction = (e: Event) => e.preventDefault();
    document.addEventListener("selectstart", disableAction);
    document.addEventListener("copy", disableAction);

    return () => {
      document.removeEventListener("contextmenu", disableContextMenu);
      document.removeEventListener("keydown", disableKeys);
      document.removeEventListener("selectstart", disableAction);
      document.removeEventListener("copy", disableAction);
    };
  }, []);
};
