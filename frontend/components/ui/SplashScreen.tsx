"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000); // Longer cinematic duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="fixed inset-0 bg-black flex items-center justify-center z-[9999] overflow-hidden"
        >
          {/* DIGITAL PARTICLES BACKGROUND */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <motion.div
              className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.2),transparent)]"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          {/* LOGO + TEXT CONTAINER */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0, filter: "blur(20px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="text-center relative"
          >
            {/* NEON SCANNING LINE */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              initial={{ y: "-120%" }}
              animate={{ y: ["-120%", "120%"] }}
              transition={{ duration: 2.5, delay: 0.6, ease: "linear" }}
            >
              <div className="w-full h-1 bg-blue-500 blur-md opacity-70"></div>
            </motion.div>

            {/* LOGO REVEAL */}
            <motion.img
              src="/logo.png"
              alt="Logo"
              className="w-32 mx-auto drop-shadow-[0_0_20px_rgba(0,150,255,0.7)]"
              initial={{ opacity: 0, y: 20, filter: "blur(15px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            />

            {/* TITLE */}
            <motion.h1
              className="text-5xl font-extrabold text-white tracking-wide mt-6 drop-shadow-[0_0_15px_rgba(0,150,255,0.7)]"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1.0, ease: "easeOut" }}
            >
              Brain Tumor Detection
            </motion.h1>

            {/* SUBTITLE */}
            <motion.p
              className="text-gray-300 mt-4 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 1.2, ease: "easeOut" }}
            >
              Made by <span className="text-blue-400 font-semibold">Kartik Singhal and Neeraj Rao</span>
            </motion.p>

            {/* GLOW PULSE */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            >
              <div className="w-40 h-40 bg-blue-500 mx-auto rounded-full blur-3xl opacity-20"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
