"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { adminNavGroups } from "@/lib/admin-navigation";

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/70 backdrop-blur-sm transition lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-[#1E293B] bg-[#0F172A]/95 px-5 py-5 shadow-2xl shadow-sky-950/20 backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3" onClick={onClose}>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6] font-display text-sm font-bold text-white shadow-lg shadow-sky-500/20">
              NP
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-[#F8FAFC]">Portfolio CMS</p>
              <p className="text-sm text-[#94A3B8]">Creative admin panel</p>
            </div>
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-xl border border-[#1E293B] text-[#94A3B8] transition hover:border-sky-400/40 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="space-y-6 overflow-y-auto pr-1">
          {adminNavGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-2 text-xs uppercase tracking-[0.24em] text-[#64748B]">{group.title}</p>
              <div className="space-y-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(pathname, item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "border-sky-400/30 bg-sky-400/10 text-white"
                          : "border-transparent text-[#94A3B8] hover:border-[#1E293B] hover:bg-slate-900/70 hover:text-white"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${active ? "text-[#38BDF8]" : "text-[#64748B]"}`} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto rounded-3xl border border-[#1E293B] bg-slate-950/50 p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-[#64748B]">Current mode</p>
          <h3 className="mt-3 font-display text-lg font-semibold text-[#F8FAFC]">Static Content</h3>
          <p className="mt-2 text-sm leading-6 text-[#94A3B8]">
            This admin UI is ready for database wiring later with Prisma, Neon, and auth.
          </p>
        </div>
      </aside>
    </>
  );
}
