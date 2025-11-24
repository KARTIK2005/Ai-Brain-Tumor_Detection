import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/ui/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brain Tumor Detection",
  description: "AI-Powered MRI Brain Tumor Classifier",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {/* Animated Splash Screen */}
        <SplashScreen />

        {/* Global Container */}
        <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">
          <main className="w-full max-w-4xl">{children}</main>
        </div>
      </body>
    </html>
  );
}
