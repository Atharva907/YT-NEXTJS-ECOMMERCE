"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import { CldUploadWidget } from "next-cloudinary";
import { FaPlus } from "react-icons/fa";

const UploadMedia = ({ isMultiple = true }) => {
  const handleOnError = (error) => {
    const message =
      error?.message || error?.statusText || "Unknown Cloudinary upload error";
    showToast("error", message);
  };

  const handleOnSuccess = (result) => {
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
