"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import AboutUs from "@/components/AboutUs";
import Footer from "@/components/Footer";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onFileSelect = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setResult(null);
  };

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Features />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Upload Section */}
      <div id="upload-section" className="max-w-4xl mx-auto px-4 py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Try It Now</h2>
          <p className="text-xl text-muted-foreground">
            Upload an MRI scan to get instant AI-powered analysis
          </p>
        </div>

        {/* Upload Card */}
        <Card className="shadow-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl">Upload MRI Scan</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Drag & Drop Box */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              onFileSelect(file);
            }}
            className="border-2 border-dashed rounded-xl p-10 text-center hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <Upload className="mx-auto mb-4 text-muted-foreground" size={40} />

            <p className="text-muted-foreground">
              Drag & Drop your MRI image here <br /> or
            </p>

            <Button className="mt-3">
              <label className="cursor-pointer">
                Select File
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    e.target.files && onFileSelect(e.target.files[0])
                  }
                />
              </label>
            </Button>

            {preview && (
              <img
                src={preview}
                className="mt-6 mx-auto w-64 rounded-lg shadow"
              />
            )}
          </div>

          <Button
            className="w-full h-12 text-lg font-medium"
            onClick={handlePredict}
            disabled={!file || loading}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : "Analyze Image"}
          </Button>

          {loading && <Progress value={70} className="h-2" />}
        </CardContent>
      </Card>

        {/* Loading Skeletons */}
        {loading && (
          <div className="grid grid-cols-2 gap-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        )}

        {/* Result Section */}
        {result && (
          <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-xl">
                Result:{" "}
                <span
                  className={`font-bold ${
                    result.label === "Tumor" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {result.label}
                </span>
              </p>
              <p className="text-gray-600 mt-2">
                Probability Score: {result.probability.toFixed(4)}
              </p>
            </div>

            {/* Confidence Bar */}
            <div className="space-y-3">
              <p className="text-center text-gray-700 font-medium">
                Confidence: {(result.confidence * 100).toFixed(2)}%
              </p>

              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    result.label === "Tumor" ? "bg-red-500" : "bg-green-500"
                  }`}
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
        )}
      </div>

      {/* About Us Section */}
      <div id="about-section" className="max-w-6xl mx-auto">
        <AboutUs />
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}
