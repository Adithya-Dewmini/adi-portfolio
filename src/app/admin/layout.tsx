import type { ReactNode } from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { hasAdminAccess } from "@/lib/admin-auth";

export default async function AdminLayout({ children }: Readonly<{ children: ReactNode }>) {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const isAdmin = await hasAdminAccess({
    userId,
    sessionClaims: sessionClaims as Record<string, unknown> | null | undefined
  });

  if (!isAdmin) {
    redirect("/access-denied");
  }

  return <AdminShell>{children}</AdminShell>;
}
