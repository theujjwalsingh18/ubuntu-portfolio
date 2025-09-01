"use client";

import { motion } from "framer-motion";
import { Laptop, Globe, Brain } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

export const ProjectsView = () => {
    const { theme } = useTheme();

    const isDark = theme === "dark";
    const containerBg = isDark ? "from-slate-900 via-slate-800 to-slate-900" : "from-gray-100 via-gray-50 to-gray-100";
    const headingGradient = isDark ? "from-purple-400 to-pink-500" : "from-blue-600 to-teal-500";
    const textBaseColor = isDark ? "text-gray-300" : "text-gray-700";
    const floatingIconColor = isDark ? "text-purple-400/30 drop-shadow-[0_0_12px_rgba(180,120,255,0.6)]" : "text-teal-400/30 drop-shadow-[0_0_12px_rgba(50,255,180,0.6)]";
    const floatingIconPulse = isDark ? "bg-purple-500/20" : "bg-teal-500/20";
    const sectionBg = isDark ? "bg-slate-800/70 rounded-xl md:rounded-2xl shadow-lg border border-slate-700 hover:border-purple-400/50" : "bg-white/80 rounded-xl md:rounded-2xl shadow-lg border border-gray-300 hover:border-teal-400/50";
    const titleColor = isDark ? "text-white" : "text-gray-900";
    const descriptionColor = isDark ? "text-gray-300" : "text-gray-700";
    const scrollbarThumb = isDark ? "scrollbar-thumb-purple-500/40" : "scrollbar-thumb-teal-500/40";
    const scrollbarTrack = isDark ? "scrollbar-track-transparent" : "scrollbar-track-gray-200";
    const hoverOverlay = isDark ? "from-purple-900/70 to-pink-800/70" : "from-blue-800/70 to-cyan-700/70";

    const projects = [
        {
            name: "Ubuntu Portfolio",
            desc: "A personal portfolio cleverly designed to function as an interactive Ubuntu OS, presenting my skills and projects through a unique and familiar interface.",
            image: "https://ik.imagekit.io/theujjwalsingh18/ubu_portfolio.png?fo-auto",
            link: "https://ubuntu.theujjwalsingh.codes/",
        },
        {
            name: "Intelligent Resume Ranker",
            desc: "AI-powered solution to rank candidate based on job description.",
            image: "https://ik.imagekit.io/theujjwalsingh18/resume-ranker.jpg?fo-auto",
            link: "https://resume.theujjwalsingh.codes/",
        },
        {
            name: "GoURL - an URL Shortner",
            desc: "An Url shortner web app built on Golang for making long url into shoter ones.",
            image: "https://ik.imagekit.io/theujjwalsingh18/gourl.png?fo-auto",
            link: "https://gourl.live",
        },
        {
            name: "Personal Portfolio",
            desc: "Created a personal portfolio to showcase my skills through web-app.",
            image: "https://ik.imagekit.io/theujjwalsingh18/port-v1.png?fo-auto",
            link: "https://theujjwalsingh.codes/",
        },
        {
            name: "Diabetes Model",
            desc: "Machine Learning Model for predicicting Diabetes of person using thier feature value of body.",
            image: "https://ik.imagekit.io/theujjwalsingh18/daibates_model.jpg?fo-auto",
            link: "https://github.com/theujjwalsingh18/Diabetes-Model",
        },
        {
            name: "Algerian forestfire Model",
            desc: "A Linear Regression model that predicts FWI (Fire Weather Index) on the Algerian forest fires datasets.",
            image:
                "https://ik.imagekit.io/theujjwalsingh18/fire-forest-model.jpg?fo-auto",
            link: "https://github.com/theujjwalsingh18/Algerian_forestfire-Model",
        },
    ];

    const floatingIcons = [
        { icon: <Laptop size={52} />, x: "20%", y: "20%" },
        { icon: <Globe size={48} />, x: "75%", y: "35%" },
        { icon: <Brain size={50} />, x: "35%", y: "75%" },
    ];

    // Base64 placeholder for blur effect
    const blurDataURL =
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMk9dfKbPW/GSPhLkMpB4bJYjlSJvVfwACjWQH//Z";

    return (
        <div
            className={cn(
                "relative px-1 py-1 flex flex-col items-center overflow-hidden min-h-screen",
                `bg-gradient-to-br ${containerBg}`
            )}
        >
            {floatingIcons.map((item, idx) => (
                <motion.div
                    key={idx}
                    className={cn("absolute hidden md:block", floatingIconColor)}
                    style={{ left: item.x, top: item.y }}
                    animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 360] }}
                    transition={{ duration: 16 + idx * 7, repeat: Infinity, ease: "linear" }}
                >
                    <div
                        className={cn(
                            "absolute -inset-6 rounded-full blur-2xl animate-pulse",
                            floatingIconPulse
                        )}
                    />
                    {item.icon}
                </motion.div>
            ))}
            <h2
                className={cn(
                    "text-3xl md:text-5xl font-extrabold text-center mb-4 bg-clip-text text-transparent relative z-10",
                    `bg-gradient-to-r ${headingGradient}`
                )}
            >
                Projects
            </h2>
            <p
                className={cn(
                    "text-center mb-6 md:mb-8 max-w-2xl relative z-10 px-4",
                    textBaseColor
                )}
            >
                Some of the key projects I've worked on.
            </p>
            <div
                className={cn(
                    "w-full max-w-6xl relative z-10 h-[70vh] md:h-[75vh] overflow-y-auto scrollbar-thin rounded-lg p-2",
                    `${scrollbarThumb} ${scrollbarTrack}`
                )}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {projects.map((project, idx) => (
                        <motion.a
                            key={idx}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            className={cn(
                                "transition-all overflow-hidden group block",
                                sectionBg
                            )}
                        >
                            <div className="relative w-full h-40 md:h-48 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    placeholder="blur"
                                    blurDataURL={blurDataURL}
                                    priority={idx < 3}
                                />
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center",
                                        hoverOverlay
                                    )}
                                >
                                    <span className="text-white font-semibold text-sm md:text-base">
                                        View Project
                                    </span>
                                </div>
                            </div>
                            <div className="p-3 md:p-4">
                                <h3 className={cn("text-base md:text-lg font-bold", titleColor)}>
                                    {project.name}
                                </h3>
                                <p
                                    className={cn(
                                        "mt-1 md:mt-2 text-sm md:text-base",
                                        descriptionColor
                                    )}
                                >
                                    {project.desc}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </div>
    );
};
