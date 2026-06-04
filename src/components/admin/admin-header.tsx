"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles } from "lucide-react";
import { adminRouteMeta } from "@/lib/admin-navigation";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const pathname = usePathname();
  const currentRoute =
    [...adminRouteMeta]
      .sort((left, right) => right.href.length - left.href.length)
      .find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`)) ?? adminRouteMeta[adminRouteMeta.length - 1];
  const formattedDate = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date());

  return (
    <header className="sticky top-0 z-20 border-b border-[#1E293B] bg-[#070A12]/90 backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              type="button"
              onClick={onMenuClick}
              className="grid h-11 w-11 place-items-center rounded-2xl border border-[#1E293B] text-[#94A3B8] transition hover:border-sky-400/40 hover:text-white lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-[#38BDF8]">
                <Sparkles className="h-3.5 w-3.5" />
                Admin
              </div>
              <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight text-[#F8FAFC] sm:text-3xl">
                {currentRoute.title}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#94A3B8]">{currentRoute.description}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-2xl border border-[#1E293B] bg-[#0F172A] px-4 py-3 text-right sm:block">
              <p className="text-xs uppercase tracking-[0.2em] text-[#64748B]">Today</p>
              <p className="mt-1 text-sm font-medium text-[#F8FAFC]">{formattedDate}</p>
            </div>
            <Link
              href="/"
              className="hidden h-12 items-center justify-center rounded-2xl border border-[#1E293B] bg-[#0F172A] px-5 text-sm font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8] sm:inline-flex"
            >
              View Site
            </Link>
            <div className="rounded-2xl border border-[#1E293B] bg-[#0F172A] p-1.5">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-9 w-9 ring-0",
                    userButtonTrigger:
                      "rounded-xl border border-transparent bg-transparent outline-none ring-0 focus:shadow-none"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
