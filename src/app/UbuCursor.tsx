"use client";
import { useEffect, useRef, useState } from "react";
const UbuCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => {
      window.removeEventListener("resize", checkIsDesktop);
    };
  }, []);
  useEffect(() => {
    if (!isDesktop) {
      return;
    }
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }[] = [];
    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current!.style.left = e.clientX + "px";
      cursorRef.current!.style.top = e.clientY + "px";
      if (Math.random() < 0.5) {
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          alpha: 1,
          size: Math.random() * 3 + 1,
        });
      }
    };
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement("div");
      ripple.className = "ripple";
      ripple.style.left = e.clientX + "px";
      ripple.style.top = e.clientY + "px";
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(233,84,32,${pt.alpha})`;
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.alpha -= 0.02;
        if (pt.alpha <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(draw);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);
    draw();
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isDesktop]);
  if (!isDesktop) {
    return null;
  }
  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 9997,
          pointerEvents: "none",
        }}
      ></canvas>
      <div
        ref={cursorRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        <div
          className="ubuntu-orbit"
          style={{
            position: "absolute",
            width: "50px",
            height: "50px",
            top: "-25px",
            left: "-25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "spin 2s linear infinite",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Logo-ubuntu_cof-orange-hex.svg"
            alt="Ubuntu Logo"
            style={{
              width: "24px",
              height: "24px",
              filter:
                "drop-shadow(0 0 10px #e95420) drop-shadow(0 0 18px #772953)",
            }}
          />
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .ripple {
          position: fixed;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid rgba(233,84,32,0.7);
          transform: translate(-50%, -50%) scale(0);
          pointer-events: none;
          z-index: 9998;
          animation: ripple 0.6s ease-out forwards;
        }
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(6);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
};
export default UbuCursor;