"use client";

import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

export const EducationView = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';
    const containerBg = isDark ? "from-slate-900 via-slate-800 to-slate-900" : "from-gray-100 via-gray-50 to-gray-100";
    const headingGradient = isDark ? "from-orange-400 to-red-500" : "from-blue-600 to-cyan-700";
    const textBaseColor = isDark ? "text-gray-300" : "text-gray-700";
    const sectionBg = isDark ? "bg-slate-800/70 backdrop-blur-lg border border-slate-700 hover:border-orange-400/50" : "bg-white/80 backdrop-blur-lg border border-gray-300 hover:border-blue-500/50";
    const iconBg = isDark ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-blue-500 to-cyan-500";
    const iconColor = isDark ? "text-orange-400/30 drop-shadow-[0_0_12px_rgba(255,120,50,0.7)]" : "text-blue-400/30 drop-shadow-[0_0_12px_rgba(50,120,255,0.7)]";
    const iconInnerColor = isDark ? "text-white" : "text-white";
    const titleColor = isDark ? "text-white" : "text-gray-900";
    const subTitleColor = isDark ? "text-orange-300" : "text-blue-500";
    const durationColor = isDark ? "text-gray-400" : "text-gray-600";
    const descriptionColor = isDark ? "text-gray-200" : "text-gray-800";
    const floatingIconPulse = isDark ? "bg-orange-500/20" : "bg-blue-500/20";
    const scrollbarThumb = "scrollbar-thumb-orange-500/80";
    const scrollbarTrack = "scrollbar-track-orange-200/50";

    const educationList = [
        {
            name: "Bachelor in Computer Applications",
            institute: "SRM IST, Delhi-NCR",
            duration: "2023 - 2026",
            description: "Majored in Computer Science with a focus on modern web technologies and software development. Currently maintaining a 8.8 GPA while participating in coding competitions and hackathons.",
            type: "Graduation",
            icon: <GraduationCap size={20} />,
        },
        {
            name: "Higher Secondary (12th)",
            institute: "R.J.R.R.S.D.College",
            duration: "2021 - 2023",
            description: "Science stream with Biology, Chemistry, and Physics. Developed strong analytical skills and participated in science fairs. Achieved 73% in final examinations.",
            type: "12th Grade",
            icon: <BookOpen size={20} />,
        },
        {
            name: "Secondary School (10th)",
            institute: "Awasiya Public School",
            duration: "2020 - 2021",
            description: "Completed with 80% marks. Developed foundation in mathematics and sciences. Active member of computer club and participated in inter-school programming competitions.",
            type: "10th Grade",
            icon: <School size={20} />,
        }
    ];

    const floatingIcons = [
        { icon: <GraduationCap size={50} />, x: "10%", y: "20%" },
        { icon: <BookOpen size={44} />, x: "80%", y: "30%" },
        { icon: <School size={56} />, x: "20%", y: "70%" },
        { icon: <BookOpen size={40} />, x: "70%", y: "80%" },
    ];

    return (
        <div className={cn(
            "relative min-h-screen py-8 md:py-16 px-4 md:px-6 flex flex-col items-center overflow-hidden",
            `bg-gradient-to-br ${containerBg}`
        )}>
            {floatingIcons.map((item, idx) => (
                <motion.div
                    key={idx}
                    className={cn("absolute hidden md:block", iconColor)}
                    style={{ left: item.x, top: item.y }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 15, 0],
                        opacity: [0.3, 0.6, 0.3],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: 15 + idx * 5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <div className={cn("absolute -inset-6 rounded-full blur-2xl animate-pulse", floatingIconPulse)} />
                    {item.icon}
                </motion.div>
            ))}

            <h2 className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent relative z-10",
                `bg-gradient-to-r ${headingGradient}`
            )}>
                Education
            </h2>
            <p className={cn("text-center mb-8 md:mb-12 max-w-2xl leading-relaxed relative z-10 px-4", textBaseColor)}>
                My academic journey, from school to university.
            </p>
            <div className={cn(
                "w-full max-w-6xl px-8 relative z-10 h-[60vh] md:h-[65vh] overflow-y-auto scrollbar-thin rounded-lg p-2",
                `${scrollbarThumb} ${scrollbarTrack}`
            )}>
                <div className="flex flex-col gap-6 pb-4 px-4">
                    {educationList.map((edu, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            className={cn("p-6 rounded-2xl shadow-lg transition-all cursor-pointer", sectionBg)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn("p-2 rounded-full", iconBg)}>
                                        <span className={iconInnerColor}>{edu.icon}</span>
                                    </div>
                                    <h3 className={cn("text-xl font-bold", titleColor)}>{edu.name}</h3>
                                </div>
                                <span className={cn("px-3 py-1 text-xs font-semibold rounded-full w-fit", iconBg, iconInnerColor)}>
                                    {edu.type}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className={cn("flex items-center", subTitleColor)}>
                                    <MapPin size={18} className="mr-2 flex-shrink-0" />
                                    <span className="text-sm md:text-base">{edu.institute}</span>
                                </div>
                                <div className={cn("flex items-center", durationColor)}>
                                    <Calendar size={18} className="mr-2 flex-shrink-0" />
                                    <span className="text-sm md:text-base">{edu.duration}</span>
                                </div>
                            </div>

                            <p className={cn("text-base leading-relaxed", descriptionColor)}>{edu.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};