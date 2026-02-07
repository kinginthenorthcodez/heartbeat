"use client";
import React, { useState } from "react";
import UploadForm from "./UploadForm";
import ImageList from "./ImageList";

export default function UploadArea() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleUploaded() {
    // bump key to trigger ImageList reload
    setRefreshKey((k) => k + 1);
  }

  return (
    <div className="mt-6 w-full">
      <UploadForm onUploaded={handleUploaded} />
      <ImageList refreshKey={refreshKey} />
    </div>
  );
}
