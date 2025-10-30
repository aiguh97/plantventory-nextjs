"use client";

import { UploadButton, UploadDropzone } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import React, { useState } from "react";
import { XIcon } from "lucide-react";

export default function ImageUpload({
  endpoint,
  value,
  onChange,
}: {
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url: string) => void;
}) {
  const [preview, setPreview] = useState(value || "");

  // Jika sudah ada gambar
  if (value) {
    return (
      <div className="relative size-40">
        <img
          src={value}
          alt="Upload"
          className="rounded-md w-full h-full object-cover border"
        />
        <button
          type="button"
          onClick={() => {
            onChange("");
            setPreview("");
          }}
          className="absolute top-1 right-1 p-1 bg-red-500 rounded-full shadow-sm"
        >
          <XIcon className="h-4 w-4 text-white" />
        </button>
      </div>
    );
  }

  // Jika belum ada gambar, tampilkan Dropzone
  return (
    <div className="w-full max-w-[300px]">
      <UploadButton<OurFileRouter, "postImage">
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          console.log("✅ UPLOAD RESULT:", res);
          if (res?.[0]?.url) {
            onChange(res[0].url);
            setPreview(res[0].url);
          }
        }}
        onUploadError={(err) => {
          console.error("❌ Upload error:", err);
          alert(`Upload failed: ${err.message}`);
        }}
        className="border border-dashed border-gray-300 rounded-md p-4 hover:bg-gray-50 transition-colors"
        appearance={{
          container: "flex flex-col items-center justify-center gap-2 text-center text-sm",
          // label: "text-gray-600 font-medium",
          allowedContent: "text-gray-400",
        }}
      />
    </div>
  );
}
