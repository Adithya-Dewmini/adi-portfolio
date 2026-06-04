import type { ContentStatus, MessageStatus } from "@/lib/admin-data";

type StatusValue = ContentStatus | MessageStatus | "Featured" | "Enabled" | "Disabled";

export function AdminStatusBadge({ status }: Readonly<{ status: StatusValue }>) {
  const styles =
    status === "Published" || status === "Featured" || status === "Enabled"
      ? "bg-sky-400/10 text-[#38BDF8]"
      : status === "Draft"
        ? "bg-violet-500/10 text-violet-300"
        : status === "New"
          ? "bg-emerald-400/10 text-emerald-300"
          : status === "Read"
            ? "bg-amber-400/10 text-amber-300"
            : status === "Replied"
              ? "bg-slate-700 text-[#CBD5E1]"
              : "bg-slate-800 text-[#94A3B8]";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles}`}>{status}</span>;
}

