"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import { CldUploadWidget } from "next-cloudinary";
import { FaPlus } from "react-icons/fa";

const UploadMedia = ({ isMultiple = true }) => {
  // Debug logs to verify env variables at runtime
  console.log("Cloudinary Cloud Name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  console.log("Cloudinary API Key:", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  console.log("Cloudinary Upload Preset:", process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET);

  const handleOnError = (error) => {
    console.error("Cloudinary upload error (full):", error);
    const message =
      error?.message || error?.statusText || "Unknown Cloudinary upload error";
    showToast("error", message);
  };

  const handleOnSuccess = (result) => {
    console.log("Upload successful:", result);
    showToast("success", "Upload successful!");
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPDATE_PRESET}
      onError={handleOnError}
      onUpload={handleOnSuccess}
      options={{
        multiple: isMultiple,
        folder: "yt-nextjs-ecommerce",
        sources: ["local", "url", "unsplash", "google_drive"],
        resourceType: "image",
        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
      }}
    >
      {({ open }) => (
        <Button
          onClick={() => open?.()}
          className="flex items-center gap-2"
        >
          <FaPlus />
          Upload Media
        </Button>
      )}
    </CldUploadWidget>
  );
};

export default UploadMedia;
