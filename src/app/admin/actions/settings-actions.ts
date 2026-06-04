"use server";

import { revalidatePath } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/require-admin";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getBoolean(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").toLowerCase();
  return value === "true" || value === "on" || value === "yes";
}

export async function saveSiteSettingsAction(formData: FormData) {
  const value = {
    siteName: getString(formData, "siteName"),
    tagline: getString(formData, "tagline"),
    logoUrl: getString(formData, "logoUrl"),
    faviconUrl: getString(formData, "faviconUrl"),
    fullName: getString(formData, "fullName"),
    professionalTitle: getString(formData, "professionalTitle"),
    shortBio: getString(formData, "shortBio"),
    location: getString(formData, "location"),
    email: getString(formData, "email"),
    whatsapp: getString(formData, "whatsapp"),
    phone: getString(formData, "phone"),
    linkedIn: getString(formData, "linkedIn"),
    github: getString(formData, "github"),
    instagram: getString(formData, "instagram"),
    behance: getString(formData, "behance"),
    cvUrl: getString(formData, "cvUrl"),
    defaultMetaTitle: getString(formData, "defaultMetaTitle"),
    defaultMetaDescription: getString(formData, "defaultMetaDescription"),
    defaultOgImageUrl: getString(formData, "defaultOgImageUrl"),
    darkModeEnabled: getBoolean(formData, "darkModeEnabled"),
    dashboardCompactMode: getBoolean(formData, "dashboardCompactMode")
  };

  const result = await updateMultipleSiteSettings(value);
  if (!result.success) {
    throw new Error(result.error);
  }
}

function revalidateSettingPaths() {
  revalidatePath("/admin/settings");
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/services");
  revalidatePath("/contact");
}

export async function getSiteSettings() {
  await assertAdmin();
  return prisma.siteSetting.findMany({
    orderBy: { key: "asc" }
  });
}

export async function updateSiteSetting(key: string, value: Prisma.InputJsonValue) {
  await assertAdmin();

  try {
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });
    revalidateSettingPaths();
    return { success: true as const, data: setting };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to update setting." };
  }
}

export async function updateMultipleSiteSettings(data: Prisma.InputJsonValue) {
  return updateSiteSetting("site-settings", data);
}
