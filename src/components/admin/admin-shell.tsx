"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell({ children }: Readonly<{ children: ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070A12] text-[#F8FAFC]">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
