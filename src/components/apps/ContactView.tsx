// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { User, Mail, MessageSquare, Send } from "lucide-react";
// import { useTheme } from "@/contexts/ThemeContext";
// import Swal from "sweetalert2";

// const containerVariants = {
//   hidden: { opacity: 0, scale: 0.9 },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 80,
//       damping: 15,
//       when: "beforeChildren",
//       staggerChildren: 0.15,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { y: 30, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: { type: "spring", stiffness: 120, damping: 12 },
//   },
// };

// export default function ContactView() {
//   const { theme } = useTheme();
//   const [formData, setFormData] = useState({ name: "", email: "", message: "" });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     Swal.fire({
//       title: "Sending Message...",
//       html: "Please wait while we send your message",
//       allowOutsideClick: false,
//       didOpen: () => Swal.showLoading(),
//     });

//     try {
//       const response = await fetch("https://formspree.io/f/xyzdjyvd", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         Swal.fire({
//           title: "Success! 🎉",
//           text: "Your message has been sent successfully!",
//           icon: "success",
//           confirmButtonColor: "#6366f1",
//           timer: 2000,
//           timerProgressBar: true,
//         });
//         setFormData({ name: "", email: "", message: "" });
//       } else {
//         throw new Error("Form submission failed");
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error! 😟",
//         text: "Something went wrong. Please try again later.",
//         icon: "error",
//         confirmButtonColor: "#6366f1",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const containerClasses =
//     theme === "dark"
//       ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
//       : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800";

//   const formCardClasses =
//     theme === "dark"
//       ? "relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-10 border border-white/20 group"
//       : "relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-5 sm:p-10 border border-gray-300 group";

//   const inputClasses =
//     theme === "dark"
//       ? "bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30"
//       : "bg-gray-100 rounded-xl border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30";

//   const iconColorClasses =
//     theme === "dark"
//       ? "text-gray-400 group-focus-within:text-[#6366f1]"
//       : "text-gray-500 group-focus-within:text-[#6366f1]";

//   return (
//     <div
//       className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 flex items-center justify-center ${containerClasses}`}
//     >
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//         className="max-w-2xl mx-auto w-full"
//       >
//         <motion.div
//           variants={containerVariants}
//           className={`${formCardClasses}`}
//           animate={{ y: [0, -5, 0] }}
//           transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//         >
//           <div className="absolute inset-0 pointer-events-none">
//             <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
//           </div>

//           <motion.div
//             variants={itemVariants}
//             className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10"
//           >
//             <motion.div variants={itemVariants}>
//               <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
//                 Get in Touch
//               </h2>
//               <p className="text-gray-400 text-sm sm:text-base">
//                 Have something to discuss? Send me a message and let's talk.
//               </p>
//             </motion.div>
//           </motion.div>

//           <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//             <motion.div variants={itemVariants} className="relative group">
//               <User
//                 className={`absolute left-4 top-4 w-5 h-5 ${iconColorClasses} transition-colors`}
//               />
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Your Name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//                 className={`w-full p-4 pl-12 rounded-xl placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${inputClasses}`}
//                 required
//               />
//             </motion.div>

//             <motion.div variants={itemVariants} className="relative group">
//               <Mail
//                 className={`absolute left-4 top-4 w-5 h-5 ${iconColorClasses} transition-colors`}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Your Email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//                 className={`w-full p-4 pl-12 rounded-xl placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${inputClasses}`}
//                 required
//               />
//             </motion.div>

//             <motion.div variants={itemVariants} className="relative group">
//               <MessageSquare
//                 className={`absolute left-4 top-4 w-5 h-5 ${iconColorClasses} transition-colors`}
//               />
//               <textarea
//                 name="message"
//                 placeholder="Your Message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 disabled={isSubmitting}
//                 className={`w-full resize-none p-4 pl-12 rounded-xl placeholder-gray-500 focus:outline-none transition-all h-32 sm:h-40 disabled:opacity-50 ${inputClasses}`}
//                 required
//               />
//             </motion.div>

//             <motion.button
//               whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(99,102,241,0.5)" }}
//               whileTap={{ scale: 0.97 }}
//               variants={itemVariants}
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Send className="w-5 h-5" />
//               {isSubmitting ? "Sending..." : "Send Message"}
//             </motion.button>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { User, Mail, MessageSquare, Send } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import Swal from "sweetalert2";

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 12 },
  },
};

export default function ContactView() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Sending Message...",
      html: "Please wait while we send your message",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const response = await fetch("https://formspree.io/f/xyzdjyvd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success! 🎉",
          text: "Your message has been sent successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
          timerProgressBar: true,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Error! 😟",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerClasses =
    theme === "dark"
      ? "bg-gradient-to-br from-slate-900 to-slate-800 text-white"
      : "bg-gradient-to-br from-gray-50 to-gray-200 text-gray-800";

  const formCardClasses =
    theme === "dark"
      ? "relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 sm:p-10 border border-white/20 group"
      : "relative overflow-hidden bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl p-5 sm:p-10 border border-gray-300 group";

  const inputClasses =
    theme === "dark"
      ? "bg-white/10 rounded-xl border border-white/20 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30"
      : "bg-gray-100 rounded-xl border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 transition-all duration-300 hover:border-[#6366f1]/30";

  const iconColorClasses =
    theme === "dark"
      ? "text-gray-400 group-focus-within:text-[#6366f1]"
      : "text-gray-500 group-focus-within:text-[#6366f1]";

  return (
    <div
      className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500 flex items-center justify-center ${containerClasses}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto w-full"
      >
        <motion.div
          variants={containerVariants}
          className={`${formCardClasses}`}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -inset-[150%] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 relative z-10"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Get in Touch
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">
                Have something to discuss? Send me a message and let's talk.
              </p>
            </motion.div>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <motion.div variants={itemVariants} className="relative group">
              <User
                className={`absolute left-4 top-4 w-5 h-5 ${iconColorClasses} transition-colors`}
              />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full p-4 pl-12 rounded-xl placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${inputClasses}`}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <Mail
                className={`absolute left-4 top-4 w-5 h-5 ${iconColorClasses} transition-colors`}
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full p-4 pl-12 rounded-xl placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 ${inputClasses}`}
                required
              />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <MessageSquare
                className={`absolute left-4 top-4 w-5 h-5 ${iconColorClasses} transition-colors`}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`w-full resize-none p-4 pl-12 rounded-xl placeholder-gray-500 focus:outline-none transition-all h-32 sm:h-40 disabled:opacity-50 ${inputClasses}`}
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0px 0px 20px rgba(99,102,241,0.5)" }}
              whileTap={{ scale: 0.97 }}
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}