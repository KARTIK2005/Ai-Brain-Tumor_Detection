"use client";

import { Brain, Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-lg">BrainTumor AI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Advanced AI-powered brain tumor detection system using deep
              learning technology.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="hover:text-foreground transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("upload-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-foreground transition-colors"
                >
                  Get Started
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById("about-section");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="hover:text-foreground transition-colors"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-4">
            <h3 className="font-semibold">Technology</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Deep Learning</li>
              <li>Computer Vision</li>
              <li>Neural Networks</li>
              <li>MRI Analysis</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Have questions? We'd love to hear from you.
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {currentYear} BrainTumor AI. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-foreground transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-foreground transition-colors">
              Terms of Service
            </button>
            <button className="hover:text-foreground transition-colors">
              Disclaimer
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
