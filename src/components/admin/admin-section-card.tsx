import type { ReactNode } from "react";

interface AdminSectionCardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AdminSectionCard({ title, description, actions, children }: Readonly<AdminSectionCardProps>) {
  return (
    <section className="rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A] p-6">
      <div className="flex flex-col gap-4 border-b border-[#1E293B] pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h3 className="font-display text-2xl font-semibold text-[#F8FAFC]">{title}</h3>
          {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-[#94A3B8]">{description}</p> : null}
        </div>
        {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

