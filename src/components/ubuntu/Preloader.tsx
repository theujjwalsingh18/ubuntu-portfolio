// "use client";

// import { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { UbuntuLogoIcon } from "./icons/UbuntuLogoIcon";

// export function Preloader() {
//   const [ubuntuText, setUbuntuText] = useState("");
//   const [isTyping, setIsTyping] = useState(true);
//   const [showLogs, setShowLogs] = useState(false);
//   const [fading, setFading] = useState(false);
//   const [visible, setVisible] = useState(true);

//   const fullText = "UBUNTU";

//   useEffect(() => {
//     if (isTyping) {
//       const typingInterval = setInterval(() => {
//         setUbuntuText((prev) => {
//           if (prev.length < fullText.length) {
//             return fullText.substring(0, prev.length + 1);
//           } else {
//             clearInterval(typingInterval);
//             setIsTyping(false);
//             setTimeout(() => setShowLogs(true), 800);
//             return prev;
//           }
//         });
//       }, 200);

//       return () => clearInterval(typingInterval);
//     }
//   }, [isTyping]);

//   useEffect(() => {
//     const delay = setTimeout(() => {
//       setFading(true);
//     }, 5000);

//     const remove = setTimeout(() => {
//       setVisible(false);
//     }, 6000);

//     return () => {
//       clearTimeout(delay);
//       clearTimeout(remove);
//     };
//   }, []);

//   const bootLogs = [
//     "ubuntu@ujjwal:~$ Initializing system...",
//     "ubuntu@ujjwal:~$ Loading kernel modules...",
//     "ubuntu@ujjwal:~$ Starting services...",
//     "ubuntu@ujjwal:~$ Launching desktop environment...",
//   ];

//   if (!visible) return null;
//   return (
//     <div
//       className={cn(
//         "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 ease-in-out",
//         fading && "opacity-0"
//       )}
//     >
//       <div className="relative w-44 h-44 mb-10">
//         <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
//         <svg
//           viewBox="0 0 100 100"
//           className="absolute inset-0 animate-spin"
//           style={{
//             animationDuration: "6s",
//             animationTimingFunction: "linear",
//           }}
//         >
//           <circle
//             cx="50"
//             cy="50"
//             r="45"
//             stroke="url(#grad1)"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="15 25"
//           />
//           <defs>
//             <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="hsl(var(--accent))" />
//               <stop offset="100%" stopColor="hsl(var(--primary))" />
//             </linearGradient>
//           </defs>
//         </svg>
//         <svg
//           viewBox="0 0 100 100"
//           className="absolute inset-0 animate-spin"
//           style={{
//             animationDuration: "4s",
//             animationDirection: "reverse",
//             animationTimingFunction: "ease-in-out",
//           }}
//         >
//           <circle
//             cx="50"
//             cy="50"
//             r="35"
//             stroke="url(#grad2)"
//             strokeWidth="2"
//             fill="none"
//             strokeDasharray="10 20"
//           />
//           <defs>
//             <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="hsl(var(--primary))" />
//               <stop offset="100%" stopColor="hsl(var(--accent))" />
//             </linearGradient>
//           </defs>
//         </svg>
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div
//             className={cn(
//               "relative transform scale-0 opacity-0",
//               "animate-[logoZoomIn_1.2s_ease-out_forwards]"
//             )}
//           >
//             <div className="absolute inset-0 blur-xl bg-accent/40 rounded-full animate-pulse" />
//             <div className="animate-[logoSpin_1.5s_linear_infinite]">
//               <UbuntuLogoIcon />
//             </div>
//           </div>
//         </div>
//       </div>
//       <p
//         className={cn(
//           "font-headline text-xl tracking-[0.4em] font-bold flex items-center gap-1 transition-transform",
//           !isTyping && "scale-110 text-accent"
//         )}
//       >
//         <span>STARTING</span>
//         <span className="ml-2">{ubuntuText}</span>
//         <span
//           className={cn(
//             "inline-block w-[6px] h-[20px] bg-accent ml-1",
//             !isTyping && "animate-blink"
//           )}
//         />
//       </p>
//       {showLogs && (
//         <div className="mt-4 text-sm font-mono text-gray-400 space-y-1 animate-fade-in">
//           {bootLogs.map((line, i) => (
//             <p
//               key={i}
//               className="animate-[fadeLine_0.8s_ease-in-out_forwards]"
//               style={{ animationDelay: `${i * 600}ms` }}
//             >
//               {line}
//             </p>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// const style = `
// @keyframes logoZoomIn {
//   0% { transform: scale(0.2); opacity: 0; }
//   60% { transform: scale(1.3); opacity: 1; }
//   100% { transform: scale(1); opacity: 1; }
// }

// @keyframes logoSpin {
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// }

// @keyframes fadeLine {
//   from { opacity: 0; transform: translateY(5px); }
//   to { opacity: 1; transform: translateY(0); }
// }
// `;

// if (typeof document !== "undefined") {
//   const styleEl = document.createElement("style");
//   styleEl.innerHTML = style;
//   document.head.appendChild(styleEl);
// }

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { UbuntuLogoIcon } from "./icons/UbuntuLogoIcon";

export function Preloader() {
  const [ubuntuText, setUbuntuText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showLogs, setShowLogs] = useState(false);
  const [fading, setFading] = useState(false);
  const [visible, setVisible] = useState(true);
  const [visibleLogs, setVisibleLogs] = useState<string[]>([]);

  const fullText = "UBUNTU";

  const bootLogs = [
    "ubuntu@ujjwal:~$ Initializing system...",
    "ubuntu@ujjwal:~$ Loading kernel modules...",
    "ubuntu@ujjwal:~$ Starting services...",
    "ubuntu@ujjwal:~$ Launching desktop environment...",
  ];

  // Typing effect for "UBUNTU"
  useEffect(() => {
    if (isTyping) {
      const typingInterval = setInterval(() => {
        setUbuntuText((prev) => {
          if (prev.length < fullText.length) {
            return fullText.substring(0, prev.length + 1);
          } else {
            clearInterval(typingInterval);
            setIsTyping(false);
            // After typing is done, show the logs after a short delay
            setTimeout(() => setShowLogs(true), 800);
            return prev;
          }
        });
      }, 200);

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, fullText]);

  // Sequential display of boot logs and triggering fade-out
  useEffect(() => {
    if (showLogs) {
      bootLogs.forEach((line, index) => {
        const lineDelay = index * 600;
        setTimeout(() => {
          setVisibleLogs((prev) => [...prev, line]);

          // Check if this is the last log line
          if (index === bootLogs.length - 1) {
            // Start the fade-out effect after a short delay
            setTimeout(() => {
              setFading(true);
              // After the fade-out animation is complete, remove the component
              setTimeout(() => {
                setVisible(false);
              }, 1000); // Duration of the fade animation
            }, 600); // Delay before starting to fade
          }
        }, lineDelay);
      });
    }
  }, [showLogs]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black text-white transition-opacity duration-700 ease-in-out",
        fading && "opacity-0"
      )}
    >
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 mb-4 md:mb-10">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse" />
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: "6s",
            animationTimingFunction: "linear",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="url(#grad1)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="15 25"
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--accent))" />
              <stop offset="100%" stopColor="hsl(var(--primary))" />
            </linearGradient>
          </defs>
        </svg>
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: "4s",
            animationDirection: "reverse",
            animationTimingFunction: "ease-in-out",
          }}
        >
          <circle
            cx="50"
            cy="50"
            r="35"
            stroke="url(#grad2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="10 20"
          />
          <defs>
            <linearGradient id="grad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "relative transform scale-0 opacity-0",
              "animate-[logoZoomIn_1.2s_ease-out_forwards]"
            )}
          >
            <div className="absolute inset-0 blur-xl bg-accent/40 rounded-full animate-pulse" />
            <div className="animate-[logoSpin_1.5s_linear_infinite]">
              <UbuntuLogoIcon />
            </div>
          </div>
        </div>
      </div>
      <p
        className={cn(
          "font-headline text-lg sm:text-xl md:text-2xl tracking-[0.4em] font-bold flex items-center gap-1 transition-transform",
          !isTyping && "scale-110 text-accent"
        )}
      >
        <span>STARTING</span>
        <span className="ml-2">{ubuntuText}</span>
        <span
          className={cn(
            "inline-block w-[6px] h-[20px] bg-accent ml-1",
            !isTyping && "animate-blink"
          )}
        />
      </p>
      {showLogs && (
        <div className="mt-4 text-sm font-mono text-gray-400 space-y-1 animate-fade-in">
          {visibleLogs.map((line, i) => (
            <p key={i} className="animate-[fadeLine_0.8s_ease-in-out_forwards]">
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

const style = `
@keyframes logoZoomIn {
  0% { transform: scale(0.2); opacity: 0; }
  60% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes logoSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeLine {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

if (typeof document !== "undefined") {
  const styleEl = document.createElement("style");
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
}
