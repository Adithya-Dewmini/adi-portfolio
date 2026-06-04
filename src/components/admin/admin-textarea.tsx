import type { TextareaHTMLAttributes } from "react";

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helper?: string;
}

export function AdminTextarea({ label, helper, className, ...props }: Readonly<AdminTextareaProps>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#F8FAFC]">{label}</span>
      <textarea
        {...props}
        className={`w-full rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition placeholder:text-[#64748B] focus:border-sky-400/40 ${className ?? ""}`}
      />
      {helper ? <span className="mt-2 block text-xs leading-5 text-[#64748B]">{helper}</span> : null}
    </label>
  );
}

