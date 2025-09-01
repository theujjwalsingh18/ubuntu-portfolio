"use client";

import { motion } from "framer-motion";
import { Award, FileBadge2 } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export const CertificatesView = () => {
    const { theme } = useTheme();

    const isDark = theme === 'dark';
    const containerBg = isDark ? "from-slate-900 via-slate-800 to-slate-900" : "from-gray-100 via-gray-50 to-gray-100";
    const headingGradient = isDark ? "from-orange-400 to-purple-500" : "from-orange-500 to-purple-600";
    const textBaseColor = isDark ? "text-gray-300" : "text-gray-700";
    const floatingIconColor = isDark ? "text-orange-400/30 drop-shadow-[0_0_12px_rgba(255,165,0,0.6)]" : "text-orange-400/30 drop-shadow-[0_0_12px_rgba(255,165,0,0.6)]";
    const floatingIconPulse = isDark ? "bg-orange-500/20" : "bg-orange-500/20";
    const sectionBg = isDark ? "bg-slate-800/70 p-4 md:p-6 rounded-2xl shadow-lg border border-slate-700 hover:border-orange-500/50" : "bg-white/80 p-4 md:p-6 rounded-2xl shadow-lg border border-gray-300 hover:border-orange-500/50";
    const titleColor = isDark ? "text-white" : "text-gray-900";
    const providerColor = isDark ? "text-orange-300" : "text-orange-600";
    const yearColor = isDark ? "text-gray-400" : "text-gray-600";
    const scrollbarThumb = isDark ? "scrollbar-thumb-orange-400/50 hover:scrollbar-thumb-orange-400/80" : "scrollbar-thumb-orange-500/50 hover:scrollbar-thumb-orange-500/80";
    const scrollbarTrack = isDark ? "scrollbar-track-slate-800/50" : "scrollbar-track-gray-200/50";
    const hoverOverlay = isDark ? "from-purple-900/70 to-orange-800/70" : "from-orange-800/70 to-purple-800/70";


    const certificates = [
        {
            title: "Quiz Mantra ",
            provider: "IT-Club SRM-IST",
            year: "2024",
            image: "https://ik.imagekit.io/theujjwalsingh18/It-club.jpg?"
        },
        {
            title: "Python",
            provider: "Kaggle",
            year: "2024",
            image: "https://ik.imagekit.io/theujjwalsingh18/Python.png?"
        },
        {
            title: "Java Course",
            provider: "SCALER",
            year: "2023",
            image: "https://ik.imagekit.io/theujjwalsingh18/Java-Course.png?updatedAt=1756641845066"
        },
        {
            title: "Machine Learning and Data Analytics using Python",
            provider: "SRM IST",
            year: "2023",
            image: "https://ik.imagekit.io/theujjwalsingh18/Sttp-ml-srm.jpg?"
        },
        {
            title: "Intro. to Data Science",
            provider: "SkillUp",
            year: "2023",
            image: "https://ik.imagekit.io/theujjwalsingh18/ds-scalar.jpg?"
        }
    ];

    const floatingIcons = [
        { icon: <Award size={50} />, x: "10%", y: "30%" },
        { icon: <FileBadge2 size={46} />, x: "80%", y: "50%" },
        { icon: <Award size={44} />, x: "40%", y: "75%" },
    ];

    const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9dfKbPW/GSPhLkMpB4bJYjlSJvVfwACjWQH//Z";

    return (
        <div className={cn(
            "relative py-1 px-1 flex flex-col items-center overflow-hidden min-h-screen",
            `bg-gradient-to-br ${containerBg}`
        )}>
            {floatingIcons.map((item, idx) => (
                <motion.div
                    key={idx}
                    className={cn("absolute hidden md:block", floatingIconColor)}
                    style={{ left: item.x, top: item.y }}
                    animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 360] }}
                    transition={{ duration: 20 + idx * 6, repeat: Infinity, ease: "linear" }}
                >
                    <div className={cn("absolute -inset-6 rounded-full blur-2xl animate-pulse", floatingIconPulse)} />
                    {item.icon}
                </motion.div>
            ))}
            <h2 className={cn(
                "text-4xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent relative z-10",
                `bg-gradient-to-r ${headingGradient}`
            )}>
                Certificates
            </h2>
            <p className={cn("text-center mb-8 md:mb-12 max-w-2xl relative z-10 px-4", textBaseColor)}>
                Some certifications that strengthened my expertise.
            </p>
            <div className={cn(
                "w-full max-w-6xl relative z-10 overflow-y-auto max-h-[60vh] md:max-h-[70vh] scrollbar-thin rounded-lg p-2",
                `${scrollbarThumb} ${scrollbarTrack}`
            )}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className={cn("shadow-lg transition-all flex flex-col items-center", sectionBg)}
                        >
                            <div className="relative w-full h-40 rounded-xl mb-4 overflow-hidden">
                                <Image
                                    src={cert.image}
                                    alt={cert.title}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover"
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                />
                            </div>
                            <h3 className={cn("text-lg font-bold text-center", titleColor)}>{cert.title}</h3>
                            <p className={cn("text-sm md:text-base", providerColor)}>{cert.provider}</p>
                            <p className={cn("text-xs md:text-sm mt-1", yearColor)}>{cert.year}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
