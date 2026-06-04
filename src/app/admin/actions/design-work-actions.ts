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

function getStringArray(formData: FormData, key: string) {
  return getString(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStatus(value: string) {
  return value.toLowerCase() === "published" ? "published" : "draft";
}

function revalidateDesignWorkPaths() {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/content/design-work");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/work");
  revalidatePath("/work");
  revalidatePath("/");
}

export interface DesignWorkInput {
  title: string;
  slug: string;
  category: string;
  brandClient?: string | null;
  description: string;
  imageUrl?: string | null;
  toolsUsed: string[];
  status: string;
  featured: boolean;
  showOnHome: boolean;
  showOnWorkPage: boolean;
}

function buildDesignWorkData(formData: FormData): DesignWorkInput {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    category: getString(formData, "category"),
    brandClient: getOptionalString(formData, "brandClient"),
    description: getString(formData, "description"),
    imageUrl: getOptionalString(formData, "imageUrl"),
    toolsUsed: getStringArray(formData, "toolsUsed"),
    status: normalizeStatus(getString(formData, "status")),
    featured: getBoolean(formData, "featured"),
    showOnHome: getBoolean(formData, "showOnHome"),
    showOnWorkPage: getBoolean(formData, "showOnWorkPage")
  };
}

export async function getDesignWorks() {
  return prisma.designWork.findMany({
    orderBy: { updatedAt: "desc" }
  });
}

export async function getPublishedDesignWorks() {
  return prisma.designWork.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
  });
}

export async function createDesignWork(data: Readonly<DesignWorkInput>) {
  await assertAdmin();
  try {
    const item = await prisma.designWork.create({ data });
    revalidateDesignWorkPaths();
    return { success: true as const, data: item };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to create design work." };
  }
}

export async function updateDesignWork(id: string, data: Readonly<Partial<DesignWorkInput>>) {
  await assertAdmin();
  try {
    const item = await prisma.designWork.update({ where: { id }, data });
    revalidateDesignWorkPaths();
    return { success: true as const, data: item };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to update design work." };
  }
}

export async function deleteDesignWork(id: string) {
  await assertAdmin();
  try {
    await prisma.designWork.delete({ where: { id } });
    revalidateDesignWorkPaths();
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to delete design work." };
  }
}

export async function toggleDesignWorkFeatured(id: string) {
  await assertAdmin();
  const item = await prisma.designWork.findUnique({ where: { id }, select: { featured: true } });
  if (!item) {
    return { success: false as const, error: "Design work not found." };
  }
  const updated = await prisma.designWork.update({ where: { id }, data: { featured: !item.featured } });
  revalidateDesignWorkPaths();
  return { success: true as const, data: updated };
}

export async function toggleDesignWorkShowOnHome(id: string) {
  await assertAdmin();
  const item = await prisma.designWork.findUnique({ where: { id }, select: { showOnHome: true } });
  if (!item) {
    return { success: false as const, error: "Design work not found." };
  }
  const updated = await prisma.designWork.update({ where: { id }, data: { showOnHome: !item.showOnHome } });
  revalidateDesignWorkPaths();
  return { success: true as const, data: updated };
}

export async function toggleDesignWorkShowOnWorkPage(id: string) {
  await assertAdmin();
  const item = await prisma.designWork.findUnique({ where: { id }, select: { showOnWorkPage: true } });
  if (!item) {
    return { success: false as const, error: "Design work not found." };
  }
  const updated = await prisma.designWork.update({ where: { id }, data: { showOnWorkPage: !item.showOnWorkPage } });
  revalidateDesignWorkPaths();
  return { success: true as const, data: updated };
}

export async function saveDesignWorkAction(formData: FormData) {
  const id = getOptionalString(formData, "id");
  const data = buildDesignWorkData(formData);
  if (id) {
    const result = await updateDesignWork(id, data);
    if (!result.success) {
      throw new Error(result.error);
    }
  } else {
    const result = await createDesignWork(data);
    if (!result.success) {
      throw new Error(result.error);
    }
  }
  redirect("/admin/content/design-work");
}

export async function deleteDesignWorkAction(id: string) {
  const result = await deleteDesignWork(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleDesignWorkFeaturedAction(id: string) {
  const result = await toggleDesignWorkFeatured(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleDesignWorkShowOnHomeAction(id: string) {
  const result = await toggleDesignWorkShowOnHome(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleDesignWorkShowOnWorkPageAction(id: string) {
  const result = await toggleDesignWorkShowOnWorkPage(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}
