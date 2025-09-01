"use client";

import { useRef, useEffect, useCallback } from 'react';
import { useApps } from '@/contexts/AppsContext';

export const useDraggable = (
  targetRef: React.RefObject<HTMLDivElement>,
  handleRef: React.RefObject<HTMLDivElement>
) => {
  const { updateApp, apps } = useApps();
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = useCallback((e: MouseEvent) => {
    if (handleRef.current && handleRef.current.contains(e.target as Node)) {
      isDragging.current = true;
      document.body.style.userSelect = 'none';
      const target = targetRef.current;
      if (target) {
        const app = apps[target.id];
        if (app?.isMaximized) return;

        const rect = target.getBoundingClientRect();
        offset.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    }
  }, [handleRef, targetRef, apps]);

  const onMouseUp = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      document.body.style.userSelect = '';
    }
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging.current && targetRef.current) {
      e.preventDefault();
      const id = targetRef.current.id;
      if (apps[id]?.isMaximized) return;
      
      const newX = e.clientX - offset.current.x;
      const newY = e.clientY - offset.current.y;
      updateApp(id, { x: newX, y: newY });
    }
  }, [targetRef, updateApp, apps]);
  

  useEffect(() => {
    const handleElement = handleRef.current;
    if (handleElement) {
      handleElement.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mousemove', onMouseMove);
    }

    return () => {
      if (handleElement) {
        handleElement.removeEventListener('mousedown', onMouseDown);
      }
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, [onMouseDown, onMouseUp, onMouseMove, handleRef]);
};