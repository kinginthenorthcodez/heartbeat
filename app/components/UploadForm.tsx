"use client";
import React, { useState } from "react";

type Props = {
  onUploaded?: (item: {
    url: string;
    name: string;
    description?: string;
  }) => void;
};

export default function UploadForm({ onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
    if (f) {
      const reader = new FileReader();
      reader.onload = () => setPreview(String(reader.result));
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!file || !preview) {
      setError("Please choose an image to upload.");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        imageData: preview,
        description,
        // optionally include a 'from' value; could be wired to your auth
      };

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload failed");
      }

      const data = await res.json();
      setFile(null);
      setPreview(null);
      setDescription("");
      onUploaded?.(data);
    } catch (err: any) {
      setError(err?.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <label className="block mb-2 font-medium text-sm">Upload an image</label>
      <input type="file" accept="image/*" onChange={handleFile} />

      {preview && (
        <div className="mt-3">
          <img
            src={preview}
            alt="preview"
            className="w-40 h-40 object-cover rounded-md"
          />
        </div>
      )}

      <label className="block mt-4 mb-2 font-medium text-sm">Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        rows={3}
        placeholder="Write a short description..."
      />

      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

      <button
        type="submit"
        className="mt-3 px-4 py-2 bg-pink-500 text-white rounded disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Uploading…" : "Upload"}
      </button>
    </form>
  );
}
