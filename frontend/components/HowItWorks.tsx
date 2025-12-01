"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Upload, ScanLine, Brain, FileCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload MRI Scan",
    description: "Select and upload your brain MRI scan image in any common format (JPEG, PNG, etc.)",
    step: "01",
  },
  {
    icon: ScanLine,
    title: "AI Analysis",
    description: "Our deep learning model processes the image using advanced computer vision techniques",
    step: "02",
  },
  {
    icon: Brain,
    title: "Tumor Detection",
    description: "The AI identifies potential tumor presence with high accuracy using trained neural networks",
    step: "03",
  },
  {
    icon: FileCheck,
    title: "Get Results",
    description: "Receive detailed results with confidence scores and probability metrics in seconds",
    step: "04",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and accurate. Get your results in 4 easy steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-primary/50 to-transparent" />
                )}

                {/* Card Content */}
                <div className="relative bg-background rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 space-y-4">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="text-lg text-muted-foreground">
            Ready to try it out?{" "}
            <button
              onClick={() => {
                const uploadSection = document.getElementById("upload-section");
                uploadSection?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-primary font-semibold hover:underline"
            >
              Start analyzing your MRI scan →
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
