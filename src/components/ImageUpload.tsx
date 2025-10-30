"use client";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import React, { useState } from "react";

export default function ImageUpload({
  endpoint,
  value,
  onChange,
}: {
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url: string) => void;
}) {
  const [preview, setPreview] = useState(value);

  return (
    <div className="flex flex-col items-center gap-3">
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-md border"
        />
      )}

      <UploadButton<OurFileRouter,"postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("UPLOAD RESULT:", res);
          if (res?.[0]?.url) {
            onChange(res[0].url);
            setPreview(res[0].url);
          }
        }}
        onUploadError={(err) => {
          console.error("Upload error:", err);
          alert(`Upload failed: ${err.message}`);
        }}
      />
    </div>
  );
}
