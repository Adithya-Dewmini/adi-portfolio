import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/admin-auth";

class AdminAccessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AdminAccessError";
  }
}

interface RequireAdminOptions {
  redirectOnFail?: boolean;
}

export async function verifyAdminAccess() {
  const { userId } = await auth();

  if (!userId) {
    return {
      allowed: false,
      reason: "unauthenticated" as const,
      userId: null
    };
  }

  const user = await currentUser().catch(() => null);
  const allowed = (user?.emailAddresses ?? []).some((emailAddress) => isAdminEmail(emailAddress.emailAddress));

  return {
    allowed,
    reason: allowed ? ("ok" as const) : ("forbidden" as const),
    userId
  };
}

export async function requireAdmin(options: Readonly<RequireAdminOptions> = {}) {
  const { redirectOnFail = true } = options;
  const access = await verifyAdminAccess();

  if (!access.allowed) {
    if (redirectOnFail) {
      redirect(access.reason === "unauthenticated" ? "/sign-in" : "/access-denied");
    }

    throw new AdminAccessError(access.reason);
  }

  return access;
}

export async function assertAdmin() {
  return requireAdmin({ redirectOnFail: false });
}

export function isAdminAccessError(error: unknown) {
  return error instanceof AdminAccessError;
}
