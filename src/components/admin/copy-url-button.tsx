"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

interface CopyUrlButtonProps {
  value: string;
}

export function CopyUrlButton({ value }: Readonly<CopyUrlButtonProps>) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]"
    >
      <Copy className="h-4 w-4" />
      {copied ? "Copied" : "Copy URL"}
    </button>
  );
}
