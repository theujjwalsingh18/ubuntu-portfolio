
"use client";

import { AppState, useApps } from "@/contexts/AppsContext";
import { useDraggable } from "@/hooks/useDragable";
import { useResizable } from "@/hooks/useResizable";
import { useRef } from "react";
import { X, Square, Minus } from 'lucide-react';
import { cn } from "@/lib/utils";

interface WindowProps {
  app: AppState;
}

const ControlButton = ({ onClick, children, className }: { onClick: (e: React.MouseEvent) => void, children: React.ReactNode, className?: string }) => (
    <button onClick={onClick} className={cn("w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200", className)}>
        {children}
    </button>
)

export function Window({ app }: WindowProps) {
  const { closeApp, focusApp, toggleMaximize, minimizeApp } = useApps();
  const windowRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useDraggable(windowRef, handleRef);
  const { onResizeStart } = useResizable(windowRef);
  
  const handleMouseDown = () => {
    focusApp(app.id);
  }

  const handleControlClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  }

  const resizeHandles = [
    { direction: 'top-left', className: 'cursor-nwse-resize -top-1 -left-1 w-4 h-4' },
    { direction: 'top-right', className: 'cursor-nesw-resize -top-1 -right-1 w-4 h-4' },
    { direction: 'bottom-left', className: 'cursor-nesw-resize -bottom-1 -left-1 w-4 h-4' },
    { direction: 'bottom-right', className: 'cursor-nwse-resize -bottom-1 -right-1 w-4 h-4' },
    { direction: 'top', className: 'cursor-ns-resize -top-1 left-2 right-2 h-2' },
    { direction: 'bottom', className: 'cursor-ns-resize -bottom-1 left-2 right-2 h-2' },
    { direction: 'left', className: 'cursor-ew-resize -left-1 top-2 bottom-2 w-2' },
    { direction: 'right', className: 'cursor-ew-resize -right-1 top-2 bottom-2 w-2' },
  ] as const;

  return (
    <div
      ref={windowRef}
      id={app.id}
      onMouseDown={handleMouseDown}
      className={cn(
        "bg-card rounded-lg shadow-2xl border border-border/50 flex flex-col overflow-hidden transition-all duration-300 ease-in-out",
        app.isMaximized ? "fixed inset-0 rounded-none border-0" : "absolute",
        app.isMinimized ? "hidden" : "flex"
      )}
      style={app.isMaximized ? { zIndex: 101 } : {
        top: app.y,
        left: app.x,
        width: app.width,
        height: app.height,
        zIndex: app.zIndex,
      }}
    >
      <div
        ref={handleRef}
        className="h-8 bg-secondary text-foreground flex items-center justify-between px-2 cursor-move flex-shrink-0"
        onDoubleClick={() => toggleMaximize(app.id)}
      >
        <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">{app.icon}</div>
            <span className="text-sm font-sans">{app.title}</span>
        </div>
        <div className="flex items-center space-x-2">
            <ControlButton onClick={(e) => handleControlClick(e, () => minimizeApp(app.id))} className="bg-muted hover:bg-yellow-500">
                <Minus size={12} className="text-foreground"/>
            </ControlButton>
            <ControlButton onClick={(e) => handleControlClick(e, () => toggleMaximize(app.id))} className="bg-muted hover:bg-green-500">
                <Square size={8} className="text-foreground"/>
            </ControlButton>
            <ControlButton onClick={(e) => handleControlClick(e, () => closeApp(app.id))} className="bg-muted hover:bg-red-500">
                <X size={12} className="text-foreground"/>
            </ControlButton>
        </div>
      </div>
      <div className="flex-1 bg-background min-h-0">
        <app.component app={app} />
      </div>
      {!app.isMaximized && resizeHandles.map(handle => (
        <div
          key={handle.direction}
          className={cn('absolute', handle.className)}
          onMouseDown={(e) => onResizeStart(e, handle.direction)}
        />
      ))}
    </div>
  );
}