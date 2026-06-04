interface AdminToggleProps {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}

export function AdminToggle({ label, description, defaultChecked = false }: Readonly<AdminToggleProps>) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-2xl border border-[#1E293B] bg-slate-950/25 px-4 py-4">
      <span>
        <span className="block text-sm font-medium text-[#F8FAFC]">{label}</span>
        {description ? <span className="mt-1 block text-xs leading-5 text-[#64748B]">{description}</span> : null}
      </span>
      <span className="relative mt-1 inline-flex h-6 w-11 shrink-0 items-center">
        <input defaultChecked={defaultChecked} type="checkbox" className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-slate-700 transition peer-checked:bg-sky-400/70" />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:left-6" />
      </span>
    </label>
  );
}
