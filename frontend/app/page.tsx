"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import AboutUs from "@/components/AboutUs"; // <-- Added

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
    <div className="space-y-16">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center">Brain Tumor Detection</h1>
      <p className="text-center text-gray-600">
        Upload an MRI scan to get a deep-learning–based prediction.
      </p>

      {/* Upload Card */}
      <Card className="p-6">
        <CardHeader>
          <CardTitle>Upload MRI Scan</CardTitle>
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
            className="border-2 border-dashed rounded-xl p-10 text-center hover:bg-gray-100 cursor-pointer"
          >
            <Upload className="mx-auto mb-4 text-gray-500" size={40} />

            <p className="text-gray-600">
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
        <Card className="p-6">
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

      {/* ⭐ ABOUT US SECTION ADDED HERE ⭐ */}
      <AboutUs />
    </div>
  );
}
