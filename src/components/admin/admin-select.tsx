import type { SelectHTMLAttributes } from "react";

interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ label: string; value: string }>;
  helper?: string;
}

export function AdminSelect({ label, options, helper, className, ...props }: Readonly<AdminSelectProps>) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[#F8FAFC]">{label}</span>
      <select
        {...props}
        className={`w-full rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none transition focus:border-sky-400/40 ${className ?? ""}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helper ? <span className="mt-2 block text-xs leading-5 text-[#64748B]">{helper}</span> : null}
    </label>
  );
}

