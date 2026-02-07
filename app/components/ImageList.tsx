"use client";
import React, { useEffect, useState } from "react";

type Item = {
  name: string;
  url: string;
  description?: string;
};

type Props = {
  /** Changing this number will re-trigger a reload from the server */
  refreshKey?: number;
};

export default function ImageList({ refreshKey }: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/images");
      if (!res.ok) throw new Error("Failed to load images");
      const data = await res.json();
      setItems(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  if (loading) return <div>Loading images…</div>;
  if (!items.length)
    return <div className="text-sm text-gray-500">No images uploaded yet.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {items.map((it) => (
        <div key={it.name} className="p-2 border rounded">
          <img
            src={it.url}
            alt={it.description || it.name}
            className="w-full h-48 object-cover rounded"
          />
          <div className="mt-2 text-sm text-gray-700">{it.description}</div>
        </div>
      ))}
    </div>
  );
}
