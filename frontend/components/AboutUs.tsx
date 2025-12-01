"use client";

import { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";

/** Helper: Split sentence to words preserving spacing */
function splitWords(text: string) {
  return text.split(" ").map((w) => w + " ");
}

/** Word animation */
const wordVariant = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.045,
      duration: 0.55,
      ease: "easeOut",
    },
  }),
};

export default function AboutUs() {
  const secRef = useRef(null);
  const inView = useInView(secRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  // Person Introductions
  const kartikText =
    "I’m Kartik Singhal, a Computer Science undergraduate at B.K. Birla Institute of Engineering & Technology with hands-on experience in front-end development and UI/UX. I’ve worked with modern web technologies like React, Next.js, Tailwind, and MongoDB, and contributed to real-world projects during my internship at Kredmint Technologies. I enjoy building clean, responsive interfaces and have developed projects ranging from an AI-based crop disease detector to full-fledged web apps. I’m enthusiastic about creating user-focused digital experiences and continuously improving my skills in web development.";
  const neerajText =
    "I’m Neeraj Rao — a frontend and optimization engineer passionate about creating sleek, high-performance user interfaces. I specialize in blending modern design with technical precision to craft seamless digital experiences.";

  const kartikWords = useMemo(() => splitWords(kartikText), []);
  const neerajWords = useMemo(() => splitWords(neerajText), []);

  return (
    <section ref={secRef} className="py-28 px-6 max-w-5xl mx-auto">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-16"
      >
        About Us
      </motion.h2>

      {/* Person 1 — Kartik */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-blue-600 mb-4"
        >
          Kartik Singhal
        </motion.h3>

        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          {kartikWords.map((word, i) => (
            <motion.span
              key={i}
              className="relative inline-block mr-[2px] pb-1"
              variants={wordVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              {/* background highlight */}
              <motion.span
                className="absolute inset-0 bg-blue-200/40 rounded-sm -z-10"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  inView
                    ? {
                        scaleX: 1,
                        opacity: 1,
                        transition: {
                          delay: i * 0.045,
                          duration: 0.35,
                          ease: "easeOut",
                        },
                      }
                    : {}
                }
                style={{ transformOrigin: "left" }}
              />
              {word}
            </motion.span>
          ))}
        </p>
      </div>

      {/* Person 2 — Neeraj */}
      <div>
        <motion.h3
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold text-purple-600 mb-4"
        >
          Neeraj Rao
        </motion.h3>

        <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
          {neerajWords.map((word, i) => (
            <motion.span
              key={i}
              className="relative inline-block mr-[2px] pb-1"
              variants={wordVariant}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
            >
              {/* background highlight */}
              <motion.span
                className="absolute inset-0 bg-purple-200/40 rounded-sm -z-10"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={
                  inView
                    ? {
                        scaleX: 1,
                        opacity: 1,
                        transition: {
                          delay: i * 0.045,
                          duration: 0.35,
                          ease: "easeOut",
                        },
                      }
                    : {}
                }
                style={{ transformOrigin: "left" }}
              />
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  );
}
