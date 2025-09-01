// "use client";

// import { useSocials } from "@/contexts/SocialContext";
// import { X, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const socialData: Record<
//     string,
//     { title: string; content: React.ReactNode; href: string }
// > = {
//     developer: {
//         title: "👨‍💻 Developer Portfolio",
//         content: (
//             <div className="flex flex-col items-center w-full">
//                 <div className="relative w-full h-28 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-xl">
//                     <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
//                         <Image
//                             src="https://ik.imagekit.io/theujjwalsingh18/dev.png?"
//                             alt="Dev Avatar"
//                             width={96}
//                             height={96}
//                             className="object-cover"
//                         />
//                     </div>
//                 </div>
//                 <div className="mt-16 text-center space-y-1">
//                     <h2 className="text-xl font-bold text-gray-100">My Developer Portfolio</h2>
//                     <p className="text-sm text-gray-400">
//                         🚀 Explore projects, case studies & full-stack builds.
//                     </p>
//                 </div>
//                 <div className="mt-3 flex flex-wrap gap-2 justify-center">
//                     <span className="px-2 py-1 text-xs rounded-md bg-purple-800 text-white">React</span>
//                     <span className="px-2 py-1 text-xs rounded-md bg-pink-700 text-white">Next.js</span>
//                     <span className="px-2 py-1 text-xs rounded-md bg-indigo-700 text-white">GoLang</span>
//                 </div>
//             </div>
//         ),
//         href: "https://theujjwalsingh.codes",
//     },

//     github: {
//         title: "📂 GitHub Profile",
//         content: (
//             <div className="flex flex-col items-center w-full">
//                 <div className="relative w-full h-28 bg-gradient-to-r from-gray-800 to-black rounded-t-xl">
//                     <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-black">
//                         <Image
//                             src="https://ik.imagekit.io/theujjwalsingh18/dev.png?updatedAt=1756560406312"
//                             alt="GitHub Avatar"
//                             width={96}
//                             height={96}
//                             className="object-cover"
//                         />
//                     </div>
//                 </div>
//                 <div className="mt-16 text-center space-y-1">
//                     <h2 className="text-xl font-bold text-white">GitHub Open Source</h2>
//                     <p className="text-sm text-gray-400">🐙 Sharing code, projects & contributions.</p>
//                 </div>
//                 <div className="mt-3 flex flex-wrap gap-2 justify-center">
//                     <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-white">TypeScript</span>
//                     <span className="px-2 py-1 text-xs rounded-md bg-gray-700 text-white">React</span>
//                     <span className="px-2 py-1 text-xs rounded-md bg-gray-600 text-white">Next.js</span>
//                 </div>
//             </div>
//         ),
//         href: "https://github.com/theujjwalsingh18",
//     },

//     linkedin: {
//         title: "💼 LinkedIn Profile",
//         content: (
//             <div className="flex flex-col items-center w-full">
//                 <div className="relative w-full h-28 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-xl">
//                     <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
//                         <Image
//                             src="https://ik.imagekit.io/theujjwalsingh18/linkedin.jpg?"
//                             alt="Profile"
//                             width={96}
//                             height={96}
//                             className="object-cover"
//                         />
//                     </div>
//                 </div>
//                 <div className="mt-16 text-center space-y-1">
//                     <h2 className="text-xl font-bold text-white-900">Ujjwal Kumar Singh</h2>
//                     <p className="text-sm text-gray-600">Learner at SRM University</p>
//                     <p className="text-xs text-gray-500">Ghaziabad, Uttar Pradesh, India</p>
//                     <a
//                         href="mailto:your.email@example.com"
//                         className="text-blue-600 text-xs font-medium hover:underline"
//                     >
//                         Contact info
//                     </a>
//                 </div>
//                 <div className="mt-3 text-sm text-gray-700 font-medium">
//                     500+ connections
//                 </div>
//             </div>
//         ),
//         href: "https://linkedin.com/in/theujjwalsingh18",
//     },

//     instagram: {
//         title: "📸 Instagram",
//         content: (
//             <div className="flex flex-col items-center w-full">
//                 <div className="relative w-full h-28 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-t-xl">
//                     <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
//                         <Image
//                             src="https://ik.imagekit.io/theujjwalsingh18/ig.jpg?updatedAt=1756560838417"
//                             alt="Instagram Avatar"
//                             width={96}
//                             height={96}
//                             className="object-cover"
//                         />
//                     </div>
//                 </div>
//                 <div className="mt-16 text-center space-y-1">
//                     <h2 className="text-xl font-bold text-white">Instagram Vibes</h2>
//                     <p className="text-sm text-gray-200">
//                         🌍 Daily moments, hobbies & lifestyle 🎨✨
//                     </p>
//                 </div>
//             </div>
//         ),
//         href: "https://instagram.com/theujjwalsingh18",
//     },
// };

// export function SocialsModal() {
//     const { activeSocial, closeSocial } = useSocials();

//     if (!activeSocial) return null;
//     const currentSocial = socialData[activeSocial];
//     if (!currentSocial) return null;

//     return (
//         <div
//             className={cn(
//                 "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]",
//                 activeSocial ? "opacity-100" : "opacity-0 pointer-events-none"
//             )}
//             onClick={closeSocial}
//         >
//             <div
//                 className="relative bg-[#0d1117] text-gray-100 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-lg p-8 flex flex-col gap-6 transform transition-all duration-300 ease-out scale-100 hover:scale-[1.01]"
//                 onClick={(e) => e.stopPropagation()}
//             >

//                 <button
//                     onClick={closeSocial}
//                     className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gray-700/80 hover:bg-red-500 text-gray-300 hover:text-white flex items-center justify-center transition-colors shadow"
//                 >
//                     <X size={16} />
//                 </button>

//                 <div className="flex flex-col items-center text-center gap-3">
//                     {currentSocial.content}
//                 </div>
//                 <a
//                     href={currentSocial.href}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="w-full"
//                 >
//                     <Button
//                         variant="default"
//                         size="lg"
//                         className="w-full group bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold shadow-md transition-all duration-300 ease-in-out rounded-xl"
//                     >
//                         Visit Profile{" "}
//                         <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
//                     </Button>
//                 </a>
//             </div>
//         </div>
//     );
// }

"use client";

import { useSocials } from "@/contexts/SocialContext";
import { X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const socialData: Record<
    string,
    { title: string; content: React.ReactNode; href: string }
> = {
    developer: {
        title: "👨‍💻 Developer Portfolio",
        content: (
            <div className="flex flex-col items-center w-full">
                <div className="relative w-full h-28 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-xl">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                        <Image
                            src="https://ik.imagekit.io/theujjwalsingh18/dev.png?"
                            alt="Dev Avatar"
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="mt-16 text-center space-y-1">
                    <h2 className="text-xl font-bold text-gray-100">My Developer Portfolio</h2>
                    <p className="text-sm text-gray-400">
                        🚀 Explore projects, case studies & full-stack builds.
                    </p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 text-xs rounded-md bg-purple-800 text-white">React</span>
                    <span className="px-2 py-1 text-xs rounded-md bg-pink-700 text-white">Next.js</span>
                    <span className="px-2 py-1 text-xs rounded-md bg-indigo-700 text-white">GoLang</span>
                </div>
            </div>
        ),
        href: "https://theujjwalsingh.codes",
    },

    github: {
        title: "📂 GitHub Profile",
        content: (
            <div className="flex flex-col items-center w-full">
                <div className="relative w-full h-28 bg-gradient-to-r from-gray-800 to-black rounded-t-xl">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-black">
                        <Image
                            src="https://ik.imagekit.io/theujjwalsingh18/dev.png?updatedAt=1756560406312"
                            alt="GitHub Avatar"
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="mt-16 text-center space-y-1">
                    <h2 className="text-xl font-bold text-white">GitHub Open Source</h2>
                    <p className="text-sm text-gray-400">🐙 Sharing code, projects & contributions.</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-white">TypeScript</span>
                    <span className="px-2 py-1 text-xs rounded-md bg-gray-700 text-white">React</span>
                    <span className="px-2 py-1 text-xs rounded-md bg-gray-600 text-white">Next.js</span>
                </div>
            </div>
        ),
        href: "https://github.com/theujjwalsingh18",
    },

    linkedin: {
        title: "💼 LinkedIn Profile",
        content: (
            <div className="flex flex-col items-center w-full">
                <div className="relative w-full h-28 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-xl">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                        <Image
                            src="https://ik.imagekit.io/theujjwalsingh18/linkedin.jpg?"
                            alt="Profile"
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="mt-16 text-center space-y-1">
                    <h2 className="text-xl font-bold text-white-900">Ujjwal Kumar Singh</h2>
                    <p className="text-sm text-gray-600">Learner at SRM University</p>
                    <p className="text-xs text-gray-500">Ghaziabad, Uttar Pradesh, India</p>
                    <a
                        href="mailto:your.email@example.com"
                        className="text-blue-600 text-xs font-medium hover:underline"
                    >
                        Contact info
                    </a>
                </div>
                <div className="mt-3 text-sm text-gray-700 font-medium">
                    500+ connections
                </div>
            </div>
        ),
        href: "https://linkedin.com/in/theujjwalsingh18",
    },

    instagram: {
        title: "📸 Instagram",
        content: (
            <div className="flex flex-col items-center w-full">
                <div className="relative w-full h-28 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-t-xl">
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                        <Image
                            src="https://ik.imagekit.io/theujjwalsingh18/ig.jpg?updatedAt=1756560838417"
                            alt="Instagram Avatar"
                            width={96}
                            height={96}
                            className="object-cover"
                        />
                    </div>
                </div>
                <div className="mt-16 text-center space-y-1">
                    <h2 className="text-xl font-bold text-white">Instagram Vibes</h2>
                    <p className="text-sm text-gray-200">
                        🌍 Daily moments, hobbies & lifestyle 🎨✨
                    </p>
                </div>
            </div>
        ),
        href: "https://instagram.com/theujjwalsingh18",
    },
};

export function SocialsModal() {
    const { activeSocial, closeSocial } = useSocials();
    const { theme } = useTheme(); // 👈 Use the theme hook to get the current theme

    if (!activeSocial) return null;
    const currentSocial = socialData[activeSocial];
    if (!currentSocial) return null;

    // 👈 Define conditional classes based on the theme
    const isDark = theme === "dark";
    const modalBgClass = isDark ? "bg-[#0d1117] text-gray-100 border-gray-700" : "bg-white text-gray-900 border-gray-300";
    const buttonBgClass = isDark ? "bg-gray-700/80 hover:bg-red-500 text-gray-300 hover:text-white" : "bg-gray-200/80 hover:bg-red-500 text-gray-600 hover:text-white";
    const titleClass = isDark ? "text-gray-100" : "text-gray-900";
    const linkClass = isDark ? "text-blue-400 hover:underline" : "text-blue-600 hover:underline";
    const textClass = isDark ? "text-gray-400" : "text-gray-600";
    const githubTitleClass = isDark ? "text-white" : "text-gray-900";
    const linkedinTitleClass = isDark ? "text-white-900" : "text-gray-900";
    const instagramTitleClass = isDark ? "text-white" : "text-gray-900";


    return (
        <div
            className={cn(
                "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]",
                activeSocial ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={closeSocial}
        >
            <div
                className={cn(
                    "relative rounded-2xl shadow-2xl w-full max-w-lg p-8 flex flex-col gap-6 transform transition-all duration-300 ease-out scale-100 hover:scale-[1.01]",
                    modalBgClass // 👈 Apply the conditional background and text classes
                )}
                onClick={(e) => e.stopPropagation()}
            >

                <button
                    onClick={closeSocial}
                    className={cn(
                        "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow",
                        buttonBgClass // 👈 Apply the conditional button classes
                    )}
                >
                    <X size={16} />
                </button>

                <div className="flex flex-col items-center text-center gap-3">
                    {/* The content rendering logic remains the same, but the inner components' styles need adjustment */}
                    {/* The socialData object with content is now adjusted to use the theme props */}
                    {activeSocial === 'developer' && (
                        <div className="flex flex-col items-center w-full">
                            <div className="relative w-full h-28 bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-xl">
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                                    <Image
                                        src="https://ik.imagekit.io/theujjwalsingh18/dev.png?"
                                        alt="Dev Avatar"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-16 text-center space-y-1">
                                <h2 className={cn("text-xl font-bold", titleClass)}>My Developer Portfolio</h2>
                                <p className={cn("text-sm", textClass)}>
                                    🚀 Explore projects, case studies & full-stack builds.
                                </p>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 justify-center">
                                <span className="px-2 py-1 text-xs rounded-md bg-purple-800 text-white">React</span>
                                <span className="px-2 py-1 text-xs rounded-md bg-pink-700 text-white">Next.js</span>
                                <span className="px-2 py-1 text-xs rounded-md bg-indigo-700 text-white">GoLang</span>
                            </div>
                        </div>
                    )}
                    {activeSocial === 'github' && (
                        <div className="flex flex-col items-center w-full">
                            <div className="relative w-full h-28 bg-gradient-to-r from-gray-800 to-black rounded-t-xl">
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md bg-black">
                                    <Image
                                        src="https://ik.imagekit.io/theujjwalsingh18/dev.png?updatedAt=1756560406312"
                                        alt="GitHub Avatar"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-16 text-center space-y-1">
                                <h2 className={cn("text-xl font-bold", githubTitleClass)}>GitHub Open Source</h2>
                                <p className={cn("text-sm", textClass)}>🐙 Sharing code, projects & contributions.</p>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2 justify-center">
                                <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-white">TypeScript</span>
                                <span className="px-2 py-1 text-xs rounded-md bg-gray-700 text-white">React</span>
                                <span className="px-2 py-1 text-xs rounded-md bg-gray-600 text-white">Next.js</span>
                            </div>
                        </div>
                    )}
                    {activeSocial === 'linkedin' && (
                        <div className="flex flex-col items-center w-full">
                            <div className="relative w-full h-28 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-t-xl">
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                                    <Image
                                        src="https://ik.imagekit.io/theujjwalsingh18/linkedin.jpg?"
                                        alt="Profile"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-16 text-center space-y-1">
                                <h2 className={cn("text-xl font-bold", linkedinTitleClass)}>Ujjwal Kumar Singh</h2>
                                <p className={cn("text-sm", textClass)}>Learner at SRM University</p>
                                <p className={cn("text-xs", isDark ? "text-gray-500" : "text-gray-500")}>Ghaziabad, Uttar Pradesh, India</p>
                                <a
                                    href="mailto:your.email@example.com"
                                    className={cn("text-xs font-medium hover:underline", linkClass)}
                                >
                                    Contact info
                                </a>
                            </div>
                            <div className="mt-3 text-sm font-medium">
                                <p className={isDark ? "text-gray-700" : "text-gray-500"}>500+ connections</p>
                            </div>
                        </div>
                    )}
                    {activeSocial === 'instagram' && (
                        <div className="flex flex-col items-center w-full">
                            <div className="relative w-full h-28 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-t-xl">
                                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-md">
                                    <Image
                                        src="https://ik.imagekit.io/theujjwalsingh18/ig.jpg?updatedAt=1756560838417"
                                        alt="Instagram Avatar"
                                        width={96}
                                        height={96}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                            <div className="mt-16 text-center space-y-1">
                                <h2 className={cn("text-xl font-bold", instagramTitleClass)}>Instagram Vibes</h2>
                                <p className={cn("text-sm", textClass)}>
                                    🌍 Daily moments, hobbies & lifestyle 🎨✨
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <a
                    href={currentSocial.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                >
                    <Button
                        variant="default"
                        size="lg"
                        className="w-full group bg-gradient-to-r from-primary to-accent hover:from-primary/80 hover:to-accent/80 text-white font-semibold shadow-md transition-all duration-300 ease-in-out rounded-xl"
                    >
                        Visit Profile{" "}
                        <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Button>
                </a>
            </div>
        </div>
    );
}