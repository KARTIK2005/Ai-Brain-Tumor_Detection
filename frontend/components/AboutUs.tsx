"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const parentVariant = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const splitWords = (text: string) =>
    text.split(" ").map((word, i) => (
      <motion.span
        key={i}
        variants={wordVariant}
        className="inline-block mr-1"
      >
        {word}
      </motion.span>
    ));

  return (
    <section className="min-h-screen w-full py-24 px-6">
      <h2 className="text-center text-4xl font-bold mb-16">
        About Us
      </h2>

      <div className="max-w-4xl mx-auto space-y-20">

        {/* Kartik */}
        <motion.div
          ref={ref}
          variants={parentVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Kartik Singhal</h3>

          <motion.p
            variants={parentVariant}
            className="text-lg leading-relaxed text-gray-200"
          >
            {splitWords(
              "I am an enthusiastic developer specializing in AI, full-stack engineering, and intelligent systems. Passionate about solving real-world problems through innovation and clean design."
            )}
          </motion.p>
        </motion.div>

        {/* Neeraj */}
        <motion.div
          variants={parentVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="p-8 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <h3 className="text-2xl font-semibold mb-4">Neeraj Rao</h3>

          <motion.p
            variants={parentVariant}
            className="text-lg leading-relaxed text-gray-200"
          >
            {splitWords(
              "I focus on backend systems, deep learning pipelines, and high-performance applications. Dedicated to building powerful tools that improve workflow, efficiency, and user experience."
            )}
          </motion.p>
        </motion.div>

      </div>
    </section>
  );
}
