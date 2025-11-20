"use client";

import React, { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: any) => {
    const f = e.target.files?.[0];
    setFile(f);
    setResult(null);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:8000/predict", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold" }}>Brain Tumor Detection</h1>

      <input type="file" accept="image/*" onChange={handleChange} />

      {preview && (
        <div>
          <img
            src={preview}
            style={{ width: 300, marginTop: 20, borderRadius: 10 }}
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          background: "blue",
          color: "white",
          borderRadius: 8,
        }}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {result && (
        <div style={{ marginTop: 20, fontSize: 22 }}>
          <p>
            <strong>Result:</strong>{" "}
            <span
              style={{
                color: result.label === "Tumor" ? "red" : "green",
                fontWeight: "bold",
              }}
            >
              {result.label}
            </span>
          </p>
          <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
