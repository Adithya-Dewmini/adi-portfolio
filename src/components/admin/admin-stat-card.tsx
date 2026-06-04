import type { LucideIcon } from "lucide-react";

interface AdminStatCardProps {
  title: string;
  value: number | string;
  detail: string;
  icon: LucideIcon;
  accent?: "sky" | "violet";
}

export function AdminStatCard({ title, value, detail, icon: Icon, accent = "sky" }: AdminStatCardProps) {
  const accentStyles =
    accent === "violet"
      ? "from-violet-500/15 to-transparent text-violet-300 shadow-violet-950/30"
      : "from-sky-500/15 to-transparent text-sky-300 shadow-sky-950/30";

  return (
    <div className="rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A] p-5 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#94A3B8]">{title}</p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-[#F8FAFC]">{value}</p>
          <p className="mt-3 text-sm text-[#94A3B8]">{detail}</p>
        </div>
        <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${accentStyles}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
