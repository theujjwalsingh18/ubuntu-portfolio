"use client";

import { useCallback, useEffect, useRef } from 'react';
import { type AppState, useApps } from '@/contexts/AppsContext';

export type ResizeDirection = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'bottom' | 'top' | 'left' | 'right';

const getCursorStyle = (direction: ResizeDirection): string => {
  switch (direction) {
    case 'top':
    case 'bottom':
      return 'ns-resize';
    case 'left':
    case 'right':
      return 'ew-resize';
    case 'top-left':
    case 'bottom-right':
      return 'nwse-resize';
    case 'top-right':
    case 'bottom-left':
      return 'nesw-resize';
    default:
      return 'auto';
  }
};

export const useResizable = (targetRef: React.RefObject<HTMLDivElement>) => {
  const { apps, updateApp } = useApps();
  const isResizing = useRef<ResizeDirection | null>(null);

  const onResizeStart = useCallback((e: React.MouseEvent<HTMLDivElement>, direction: ResizeDirection) => {
    isResizing.current = direction;
    document.body.style.userSelect = 'none';
    document.body.style.cursor = getCursorStyle(direction);
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onResizeEnd = useCallback(() => {
    if (isResizing.current) {
      isResizing.current = null;
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
  }, []);

  const onResize = useCallback((e: MouseEvent) => {
    if (!isResizing.current || !targetRef.current) return;

    const id = targetRef.current.id;
    const app = apps[id];
    if (!app || app.isMaximized) return;

    const { x, y, width, height } = app;
    const { movementX, movementY } = e;
    
    const minWidth = 400;
    const minHeight = 300;

    let newWidth = width;
    let newHeight = height;
    let newX = x;
    let newY = y;

    if (isResizing.current.includes('right')) newWidth = width + movementX;
    if (isResizing.current.includes('bottom')) newHeight = height + movementY;
    if (isResizing.current.includes('left')) {
      newWidth = width - movementX;
      newX = x + movementX;
    }
    if (isResizing.current.includes('top')) {
      newHeight = height - movementY;
      newY = y + movementY;
    }

    const updates: Partial<AppState> = {};

    if (newWidth < minWidth) {
      if (isResizing.current.includes('left')) newX = x + width - minWidth;
      newWidth = minWidth;
    }
    if (newHeight < minHeight) {
      if (isResizing.current.includes('top')) newY = y + height - minHeight;
      newHeight = minHeight;
    }

    updates.width = newWidth;
    updates.height = newHeight;
    updates.x = newX;
    updates.y = newY;
    
    updateApp(id, updates);
  }, [apps, updateApp, targetRef]);

  useEffect(() => {
    window.addEventListener('mousemove', onResize);
    window.addEventListener('mouseup', onResizeEnd);
    return () => {
      window.removeEventListener('mousemove', onResize);
      window.removeEventListener('mouseup', onResizeEnd);
    };
  }, [onResize, onResizeEnd]);

  return { onResizeStart };
};