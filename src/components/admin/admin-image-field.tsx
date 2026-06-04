"use client";

import { useState } from "react";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";

interface AdminImageFieldProps {
  label: string;
  name: string;
  usedIn: string;
  defaultValue?: string;
  placeholder?: string;
}

export function AdminImageField({
  label,
  name,
  usedIn,
  defaultValue = "",
  placeholder = "https://..."
}: Readonly<AdminImageFieldProps>) {
  const [value, setValue] = useState(defaultValue);

  return (
    <div className="space-y-3">
      <label className="block">
        <span className="mb-2 block text-sm font-medium text-[#F8FAFC]">{label}</span>
        <input
          name={name}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#64748B] focus:border-sky-400/40"
        />
      </label>
      <CloudinaryUpload
        label={`Upload ${label}`}
        usedIn={usedIn}
        initialUrl={value}
        onUploadComplete={({ url }) => setValue(url)}
      />
    </div>
  );
}
