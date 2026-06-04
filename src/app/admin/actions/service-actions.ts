"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/require-admin";

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value || null;
}

function getBoolean(formData: FormData, key: string) {
  const value = String(formData.get(key) ?? "").toLowerCase();
  return value === "true" || value === "on" || value === "yes";
}

function getLineArray(formData: FormData, key: string) {
  return getString(formData, key)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStatus(value: string) {
  return value.toLowerCase() === "draft" ? "draft" : "published";
}

function revalidateServicePaths() {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/content/services");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/services");
  revalidatePath("/services");
  revalidatePath("/");
}

export interface ServiceInput {
  title: string;
  slug: string;
  iconName?: string | null;
  shortDescription: string;
  fullDescription?: string | null;
  bulletPoints: string[];
  status: string;
  featured: boolean;
  showOnHome: boolean;
  showOnServicesPage: boolean;
}

function buildServiceData(formData: FormData): ServiceInput {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    iconName: getOptionalString(formData, "iconName"),
    shortDescription: getString(formData, "shortDescription"),
    fullDescription: getOptionalString(formData, "fullDescription"),
    bulletPoints: getLineArray(formData, "bulletPoints"),
    status: normalizeStatus(getString(formData, "status")),
    featured: getBoolean(formData, "featured"),
    showOnHome: getBoolean(formData, "showOnHome"),
    showOnServicesPage: getBoolean(formData, "showOnServicesPage")
  };
}

export async function getServices() {
  return prisma.service.findMany({
    orderBy: { updatedAt: "desc" }
  });
}

export async function getPublishedServices() {
  return prisma.service.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
  });
}

export async function createService(data: Readonly<ServiceInput>) {
  await assertAdmin();
  try {
    const service = await prisma.service.create({ data });
    revalidateServicePaths();
    return { success: true as const, data: service };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to create service." };
  }
}

export async function updateService(id: string, data: Readonly<Partial<ServiceInput>>) {
  await assertAdmin();
  try {
    const service = await prisma.service.update({ where: { id }, data });
    revalidateServicePaths();
    return { success: true as const, data: service };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to update service." };
  }
}

export async function deleteService(id: string) {
  await assertAdmin();
  try {
    await prisma.service.delete({ where: { id } });
    revalidateServicePaths();
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to delete service." };
  }
}

export async function toggleServiceFeatured(id: string) {
  await assertAdmin();
  const item = await prisma.service.findUnique({ where: { id }, select: { featured: true } });
  if (!item) {
    return { success: false as const, error: "Service not found." };
  }
  const updated = await prisma.service.update({ where: { id }, data: { featured: !item.featured } });
  revalidateServicePaths();
  return { success: true as const, data: updated };
}

export async function toggleServiceShowOnHome(id: string) {
  await assertAdmin();
  const item = await prisma.service.findUnique({ where: { id }, select: { showOnHome: true } });
  if (!item) {
    return { success: false as const, error: "Service not found." };
  }
  const updated = await prisma.service.update({ where: { id }, data: { showOnHome: !item.showOnHome } });
  revalidateServicePaths();
  return { success: true as const, data: updated };
}

export async function toggleServiceShowOnServicesPage(id: string) {
  await assertAdmin();
  const item = await prisma.service.findUnique({ where: { id }, select: { showOnServicesPage: true } });
  if (!item) {
    return { success: false as const, error: "Service not found." };
  }
  const updated = await prisma.service.update({ where: { id }, data: { showOnServicesPage: !item.showOnServicesPage } });
  revalidateServicePaths();
  return { success: true as const, data: updated };
}

export async function saveServiceAction(formData: FormData) {
  const id = getOptionalString(formData, "id");
  const data = buildServiceData(formData);
  if (id) {
    const result = await updateService(id, data);
    if (!result.success) {
      throw new Error(result.error);
    }
  } else {
    const result = await createService(data);
    if (!result.success) {
      throw new Error(result.error);
    }
  }
  redirect("/admin/content/services");
}

export async function deleteServiceAction(id: string) {
  const result = await deleteService(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleServiceFeaturedAction(id: string) {
  const result = await toggleServiceFeatured(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleServiceShowOnHomeAction(id: string) {
  const result = await toggleServiceShowOnHome(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleServiceShowOnServicesPageAction(id: string) {
  const result = await toggleServiceShowOnServicesPage(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}
