"use client";

import { startTransition, useEffect, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2 } from "lucide-react";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { createMediaItemAction } from "@/app/admin/actions/media-actions";
import { CopyUrlButton } from "@/components/admin/copy-url-button";

interface CloudinaryUploadProps {
  label?: string;
  usedIn?: string;
  title?: string;
  initialUrl?: string;
  onUploadComplete?: (payload: { url: string; publicId: string }) => void;
}

interface UploadConfig {
  apiKey: string;
  cloudName: string;
}

export function CloudinaryUpload({
  label = "Upload Image",
  usedIn = "Media Library",
  title,
  initialUrl,
  onUploadComplete
}: Readonly<CloudinaryUploadProps>) {
  const [uploadConfig, setUploadConfig] = useState<UploadConfig | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initialUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const sanitizedPreviewUrl = previewUrl.trim();
  const hasPreview = sanitizedPreviewUrl.startsWith("http://") || sanitizedPreviewUrl.startsWith("https://");

  useEffect(() => {
    let active = true;

    async function loadConfig() {
      const response = await fetch("/api/cloudinary/sign");

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as UploadConfig;

      if (active) {
        setUploadConfig({
          apiKey: data.apiKey,
          cloudName: data.cloudName
        });
      }
    }

    void loadConfig();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    setPreviewUrl(initialUrl ?? "");
  }, [initialUrl]);

  function handleSuccess(results: CloudinaryUploadWidgetResults) {
    const info = results.info as
      | {
          secure_url?: string;
          public_id?: string;
          resource_type?: string;
          folder?: string;
        }
      | undefined;

    if (!info?.secure_url || !info.public_id) {
      return;
    }

    setUploading(false);
    setPreviewUrl(info.secure_url);
    setSavedMessage("Upload completed and added to the media library.");

    startTransition(async () => {
      await createMediaItemAction({
        title,
        url: info.secure_url!,
        publicId: info.public_id!,
        resourceType: info.resource_type,
        folder: info.folder,
        usedIn
      });
    });

    onUploadComplete?.({
      url: info.secure_url,
      publicId: info.public_id
    });
  }

  if (!uploadConfig) {
    return (
      <div className="rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A] p-5 text-sm text-[#94A3B8]">
        Loading upload configuration...
      </div>
    );
  }

  return (
    <div className="rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A] p-5">
      <CldUploadWidget
        signatureEndpoint="/api/cloudinary/sign"
        options={{
          folder: "portfolio",
          multiple: false,
          sources: ["local", "url", "camera"],
          resourceType: "image"
        }}
        config={{
          cloud: {
            apiKey: uploadConfig.apiKey,
            cloudName: uploadConfig.cloudName
          }
        }}
        onOpen={() => {
          setUploading(true);
          setSavedMessage("");
        }}
        onClose={() => setUploading(false)}
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6] px-4 py-3 text-sm font-semibold text-white"
          >
            {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            {label}
          </button>
        )}
      </CldUploadWidget>

      {hasPreview ? (
        <div className="mt-5 space-y-4">
          <div className="overflow-hidden rounded-[1.5rem] border border-[#1E293B]">
            <img
              src={sanitizedPreviewUrl}
              alt="Uploaded preview"
              className="h-56 w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <CopyUrlButton value={sanitizedPreviewUrl} />
            <span className="inline-flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Ready to use in forms
            </span>
          </div>
          {savedMessage ? <p className="text-sm text-[#94A3B8]">{savedMessage}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
