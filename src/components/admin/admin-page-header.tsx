import type { ReactNode } from "react";

interface AdminPageHeaderProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
}

export function AdminPageHeader({ eyebrow = "Content Manager", title, description, actions }: Readonly<AdminPageHeaderProps>) {
  return (
    <div className="flex flex-col gap-4 rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A] p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">{eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#F8FAFC]">{title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#94A3B8]">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
    </div>
  );
}

