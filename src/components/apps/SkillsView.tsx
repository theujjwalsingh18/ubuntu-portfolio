"use client";
import { motion } from "framer-motion";
import { Code, Cpu, Brush } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export const SkillsView = () => {
  const { theme } = useTheme();

  const skills = [
    { name: "Web Development", desc: "React, Next.js, Node.js, REST API, FastAPI" },
    { name: "Programming", desc: "C/C++, Python, JavaScript, TypeScript, Golang" },
    { name: "DataBase", desc: "MySQL, MongoDB, PostgreSql, Redis" },
    { name: "AI/ML", desc: "TensorFlow, PyTorch, Scikit-learn" },
    { name: "Design", desc: "Blender, Three.js" }
  ];

  const floatingIcons = [
    { icon: <Code size={48} />, x: "15%", y: "25%" },
    { icon: <Cpu size={52} />, x: "75%", y: "40%" },
    { icon: <Brush size={44} />, x: "30%", y: "70%" },
  ];

  const containerClasses = theme === 'dark'
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300"
    : "bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-700";

  const headingClasses = theme === 'dark'
    ? "bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent"
    : "text-gray-800";

  const cardClasses = theme === 'dark'
    ? "bg-slate-800/70 p-6 rounded-2xl shadow-lg border border-slate-700 hover:border-blue-400/50"
    : "bg-white/70 p-6 rounded-2xl shadow-lg border border-gray-300 hover:border-blue-400/50";

  const cardTitleClasses = theme === 'dark'
    ? "text-white"
    : "text-gray-900";

  const cardDescClasses = theme === 'dark'
    ? "text-gray-300"
    : "text-gray-600";

  const floatingIconClasses = theme === 'dark'
    ? "text-blue-400/30 drop-shadow-[0_0_12px_rgba(80,150,255,0.6)]"
    : "text-cyan-500/30 drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]";

  const floatingIconGlowClasses = theme === 'dark'
    ? "bg-blue-500/20 blur-2xl animate-pulse"
    : "bg-cyan-500/20 blur-2xl animate-pulse";

  return (
    <div className={`relative min-h-screen py-16 px-6 flex flex-col items-center overflow-hidden transition-colors duration-500 ${containerClasses}`}>
      {floatingIcons.map((item, idx) => (
        <motion.div
          key={idx}
          className={`absolute ${floatingIconClasses}`}
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -20, 0],
            x: [0, 15, 0],
            opacity: [0.3, 0.6, 0.3],
            rotate: [0, 360],
          }}
          transition={{ duration: 18 + idx * 6, repeat: Infinity, ease: "linear" }}
        >
          <div className={`absolute -inset-6 rounded-full ${floatingIconGlowClasses}`} />
          {item.icon}
        </motion.div>
      ))}
      <h2 className={`text-5xl md:text-6xl lg:text-7xl font-extrabold text-center mb-4 relative z-10 ${headingClasses}`}>
        Skills
      </h2>
      <p className={`text-center mb-12 max-w-2xl relative z-10 text-base md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        The tools and technologies I’ve mastered.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full relative z-10">
        {skills.map((skill, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className={`transition-all duration-300 ${cardClasses}`}
          >
            <h3 className={`text-xl font-bold ${cardTitleClasses}`}>{skill.name}</h3>
            <p className={`mt-2 ${cardDescClasses}`}>{skill.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};