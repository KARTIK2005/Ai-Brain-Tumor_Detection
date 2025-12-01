"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, Shield, Brain, TrendingUp, Clock, Database } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Deep Learning AI",
    description:
      "Powered by advanced Convolutional Neural Networks trained on thousands of MRI scans for accurate tumor detection.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get results in seconds. Our optimized models provide instant analysis without compromising accuracy.",
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description:
      "Achieve medical-grade accuracy with our rigorously tested and validated AI models.",
  },
  {
    icon: TrendingUp,
    title: "Confidence Scores",
    description:
      "Detailed probability metrics and confidence levels for transparent, reliable predictions.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description:
      "Access the detection system anytime, anywhere. No waiting times or scheduling required.",
  },
  {
    icon: Database,
    title: "Secure & Private",
    description:
      "Your medical data is processed securely with enterprise-grade encryption and privacy standards.",
  },
];

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4">
      <motion.div
        variants={containerVariant}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Header */}
        <motion.div variants={itemVariant} className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose Our System?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art technology designed for accuracy, speed, and
            reliability
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={itemVariant}>
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
