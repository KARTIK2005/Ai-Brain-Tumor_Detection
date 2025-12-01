"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const containerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function AboutUs() {
  const secRef = useRef(null);
  const inView = useInView(secRef, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  const team = [
    {
      name: "Kartik Singhal",
      role: "Frontend Developer & UI/UX Designer",
      description:
        "Computer Science undergraduate at B.K. Birla Institute of Engineering & Technology, specializing in modern web technologies including React, Next.js, and Tailwind CSS. Previously interned at Kredmint Technologies, contributing to production applications with MongoDB integration.",
      expertise: [
        "Frontend Development",
        "UI/UX Design",
        "React & Next.js",
        "AI Integration",
      ],
    },
    {
      name: "Neeraj Rao",
      role: "Frontend Engineer & Performance Specialist",
      description:
        "Passionate about building high-performance user interfaces with a focus on optimization and seamless user experiences. Expertise in combining modern design principles with technical precision to deliver exceptional digital products.",
      expertise: [
        "Performance Optimization",
        "Modern UI Design",
        "Frontend Architecture",
        "User Experience",
      ],
    },
  ];

  return (
    <section ref={secRef} className="py-20 px-4">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="space-y-12"
      >
        {/* Title */}
        <motion.div variants={itemVariant} className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            About Us
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meet the team behind this AI-powered brain tumor detection system
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {team.map((member, index) => (
            <motion.div key={member.name} variants={itemVariant}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 space-y-4">
                  {/* Name & Role */}
                  <div className="space-y-1">
                    <motion.h3
                      className="text-2xl font-bold"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.1 + index * 0.2, duration: 0.6 }}
                    >
                      {member.name}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-muted-foreground font-medium"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 0.2 + index * 0.2, duration: 0.6 }}
                    >
                      {member.role}
                    </motion.p>
                  </div>

                  {/* Description */}
                  <motion.p
                    className="text-base leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                  >
                    {member.description}
                  </motion.p>

                  {/* Expertise Tags */}
                  <motion.div
                    className="pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                  >
                    <p className="text-sm font-semibold mb-2">Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: 0.7 + index * 0.2 + skillIndex * 0.1, duration: 0.4 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
