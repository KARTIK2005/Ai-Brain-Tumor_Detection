"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, type Variants } from "framer-motion";

const logoUrl = "/logo.png"; // your uploaded logo

/** Split a string into characters preserving spaces */
function splitToChars(text: string) {
  return Array.from(text).map((ch) => (ch === " " ? "\u00A0" : ch));
}

function computeCenterDistances(n: number) {
  const center = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => Math.abs(i - center));
}

export default function SplashScreen() {
  const [show, setShow] = useState(true);

  // Hide animation after X seconds
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000); // 4 sec
    return () => clearTimeout(timer);
  }, []);

  const title = "Brain Tumor Detection";
  const subtitle = "AI · MRI · Precision";

  const chars = useMemo(() => splitToChars(title), [title]);
  const distances = useMemo(() => computeCenterDistances(chars.length), [chars.length]);

  const maxDistance = Math.max(...distances);

  // rolling character animation
  const charVariant: Variants = {
    hidden: { y: 40, rotateX: 40, opacity: 0 },
    visible: (d: number) => ({
      y: 0,
      rotateX: 0,
      opacity: 1,
      transition: {
        delay: d * 0.08,
        duration: 0.7,
      },
    }),
  };

  const containerVariant: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren" },
    },
  };

  const subtitleVariant: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 0.8 + maxDistance * 0.08, duration: 0.8 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 1.2 }}
      className={`fixed inset-0 z-9999 flex items-center justify-center
                  bg-black text-white pointer-events-none`}
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black to-[#061021] opacity-95" />

      <motion.div
        className="text-center px-6 py-12"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.img
          src={logoUrl}
          alt="logo"
          className="mx-auto w-28 h-auto mb-6 drop-shadow-[0_8px_30px_rgba(0,150,255,0.45)]"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, transition: { delay: 0.06, duration: 0.9 } }}
        />

        {/* Rolling title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
          {chars.map((ch, i) => (
            <motion.span
              key={i}
              custom={distances[i]}
              variants={charVariant}
              initial="hidden"
              animate="visible"
              className="inline-block"
            >
              <span className="inline-block px-0.5">{ch}</span>
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-sm md:text-base text-slate-200/90"
          initial="hidden"
          animate="visible"
          variants={subtitleVariant}
        >
          {subtitle}
        </motion.p>

        <motion.div
          className="mt-6 flex items-center justify-center gap-3 opacity-80"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2 + maxDistance * 0.08 },
          }}
        >
          <div className="px-3 py-1 rounded-full bg-white/6 text-xs">Made by Kartik Singhal & Neeraj Rao</div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
