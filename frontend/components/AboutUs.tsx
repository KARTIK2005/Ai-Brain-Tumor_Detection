"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const teamMembers = [
  {
    name: "Kartik Singhal",
    role: "AI Developer & System Architect",
    avatar: "👨‍💻",
    desc: "Passionate about deep learning, computer vision, and AI-driven solutions. Focused on building scalable ML systems and seamless user experiences.",
  },
  {
    name: "Neeraj Rao",
    role: "Frontend & Optimization Engineer",
    avatar: "🧑‍💻",
    desc: "Specializes in UI/UX engineering, performance optimization, and delivering highly polished, user-centric web applications with precision.",
  },
];

export default function AboutUs() {
  const [particles, setParticles] = useState<any[]>([]);

  /** ✅ CLIENT-ONLY PARTICLES (fixed hydration issue) */
  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => {
      return {
        size: 6 + Math.random() * 12,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 5 + Math.random() * 6,
      };
    });
    setParticles(generated);
  }, []);

  return (
    <section className="relative py-28 px-6 max-w-6xl mx-auto overflow-hidden">

      {/* 🌌 FIXED PARALLAX BACKGROUND */}
      <div className="absolute inset-0 -z-10 overflow-hidden">

        {/* Soft gradient */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white opacity-70"
          initial={{ y: -40 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Blurred glowing circles */}
        <motion.div
          initial={{ y: -80 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-blue-300 rounded-full blur-[120px] opacity-40"
        />

        <motion.div
          initial={{ y: -100 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute -bottom-32 -right-40 w-[500px] h-[500px] bg-purple-300 rounded-full blur-[140px] opacity-40"
        />

        {/* ✨ Client-only moving particles (SSR safe) */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-400 rounded-full"
            style={{
              width: p.size,
              height: p.size,
              top: p.top,
              left: p.left,
              opacity: 0.25,
            }}
            animate={{
              y: ["0%", "-35%", "0%"],
              x: ["0%", "20%", "0%"],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-gray-900"
      >
        About Us
      </motion.h2>

      {/* Cards */}
      <div className="grid md:grid-cols-2 gap-12">
        {teamMembers.map((person, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, rotateX: 6, rotateY: -6 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transform-gpu transition-all duration-300 backdrop-blur-md bg-opacity-80"
          >
            {/* Avatar */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center text-6xl shadow-inner">
                {person.avatar}
              </div>
            </div>

            {/* Name */}
            <h3 className="text-2xl font-bold text-gray-800 text-center">
              {person.name}
            </h3>

            {/* Role */}
            <p className="text-blue-600 font-medium text-center mt-1">
              {person.role}
            </p>

            {/* Description */}
            <p className="text-gray-600 mt-4 leading-relaxed text-center">
              {person.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
