import { clerkClient } from "@clerk/nextjs/server";

export const ADMIN_EMAILS = ["dewminia18@gmail.com"];

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAdminEmail(email: string) {
  if (!email) {
    return false;
  }

  const normalized = normalizeEmail(email);

  return ADMIN_EMAILS.some((adminEmail) => normalizeEmail(adminEmail) === normalized);
}

function isEmailLike(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function collectClaimEmails(value: unknown, emails: Set<string>) {
  if (typeof value === "string") {
    if (isEmailLike(value)) {
      emails.add(normalizeEmail(value));
    }

    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectClaimEmails(item, emails);
    }

    return;
  }

  if (!value || typeof value !== "object") {
    return;
  }

  for (const nestedValue of Object.values(value)) {
    collectClaimEmails(nestedValue, emails);
  }
}

export function getEmailsFromSessionClaims(sessionClaims: Record<string, unknown> | null | undefined) {
  if (!sessionClaims) {
    return [];
  }

  const emails = new Set<string>();
  collectClaimEmails(sessionClaims, emails);

  return Array.from(emails);
}

export function getEmailFromSessionClaims(sessionClaims: Record<string, unknown> | null | undefined) {
  return getEmailsFromSessionClaims(sessionClaims)[0] ?? "";
}

export function hasAdminAccessFromSessionClaims(sessionClaims: Record<string, unknown> | null | undefined) {
  const emails = getEmailsFromSessionClaims(sessionClaims);

  return emails.some((email) => isAdminEmail(email));
}

async function getUserEmailsFromClerk(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  return user.emailAddresses.map((emailAddress) => normalizeEmail(emailAddress.emailAddress));
}

export async function hasAdminAccess({
  userId,
  sessionClaims
}: Readonly<{
  userId: string;
  sessionClaims: Record<string, unknown> | null | undefined;
}>) {
  if (hasAdminAccessFromSessionClaims(sessionClaims)) {
    return true;
  }

  try {
    const userEmails = await getUserEmailsFromClerk(userId);

    return userEmails.some((email) => isAdminEmail(email));
  } catch {
    return false;
  }
}
