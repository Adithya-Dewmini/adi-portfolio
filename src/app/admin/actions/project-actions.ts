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

function revalidateProjectPaths(projectId?: string | null) {
  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/content/projects");
  revalidatePath("/admin/pages");
  revalidatePath("/admin/pages/work");
  revalidatePath("/work");
  revalidatePath("/");
  if (projectId) {
    revalidatePath(`/admin/content/projects/${projectId}/edit`);
  }
}

export interface ProjectInput {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription?: string | null;
  problem?: string | null;
  solution?: string | null;
  result?: string | null;
  techStack: string[];
  featuredImageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  status: string;
  featured: boolean;
  showOnHome: boolean;
  showOnWorkPage: boolean;
}

function buildProjectData(formData: FormData): ProjectInput {
  return {
    title: getString(formData, "title"),
    slug: getString(formData, "slug"),
    category: getString(formData, "category"),
    shortDescription: getString(formData, "shortDescription"),
    fullDescription: getOptionalString(formData, "fullDescription"),
    problem: getOptionalString(formData, "problem"),
    solution: getOptionalString(formData, "solution"),
    result: getOptionalString(formData, "result"),
    techStack: getStringArray(formData, "techStack"),
    featuredImageUrl: getOptionalString(formData, "featuredImageUrl"),
    liveUrl: getOptionalString(formData, "liveUrl"),
    githubUrl: getOptionalString(formData, "githubUrl"),
    status: normalizeStatus(getString(formData, "status")),
    featured: getBoolean(formData, "featured"),
    showOnHome: getBoolean(formData, "showOnHome"),
    showOnWorkPage: getBoolean(formData, "showOnWorkPage")
  };
}

export async function getProjects() {
  return prisma.project.findMany({
    orderBy: { updatedAt: "desc" }
  });
}

export async function getPublishedProjects() {
  return prisma.project.findMany({
    where: { status: "published" },
    orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
  });
}

export async function createProject(data: Readonly<ProjectInput>) {
  await assertAdmin();

  try {
    const project = await prisma.project.create({
      data
    });
    revalidateProjectPaths(project.id);
    return { success: true as const, data: project };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to create project." };
  }
}

export async function updateProject(id: string, data: Readonly<Partial<ProjectInput>>) {
  await assertAdmin();

  try {
    const project = await prisma.project.update({
      where: { id },
      data
    });
    revalidateProjectPaths(id);
    return { success: true as const, data: project };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to update project." };
  }
}

export async function deleteProject(id: string) {
  await assertAdmin();

  try {
    await prisma.project.delete({ where: { id } });
    revalidateProjectPaths(id);
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to delete project." };
  }
}

export async function toggleProjectFeatured(id: string) {
  await assertAdmin();
  const project = await prisma.project.findUnique({ where: { id }, select: { featured: true } });
  if (!project) {
    return { success: false as const, error: "Project not found." };
  }
  const updated = await prisma.project.update({ where: { id }, data: { featured: !project.featured } });
  revalidateProjectPaths(id);
  return { success: true as const, data: updated };
}

export async function toggleProjectShowOnHome(id: string) {
  await assertAdmin();
  const project = await prisma.project.findUnique({ where: { id }, select: { showOnHome: true } });
  if (!project) {
    return { success: false as const, error: "Project not found." };
  }
  const updated = await prisma.project.update({ where: { id }, data: { showOnHome: !project.showOnHome } });
  revalidateProjectPaths(id);
  return { success: true as const, data: updated };
}

export async function toggleProjectShowOnWorkPage(id: string) {
  await assertAdmin();
  const project = await prisma.project.findUnique({ where: { id }, select: { showOnWorkPage: true } });
  if (!project) {
    return { success: false as const, error: "Project not found." };
  }
  const updated = await prisma.project.update({ where: { id }, data: { showOnWorkPage: !project.showOnWorkPage } });
  revalidateProjectPaths(id);
  return { success: true as const, data: updated };
}

export async function saveProjectAction(formData: FormData) {
  const id = getOptionalString(formData, "id");
  const data = buildProjectData(formData);
  if (id) {
    const result = await updateProject(id, data);
    if (!result.success) {
      throw new Error(result.error);
    }
  } else {
    const result = await createProject(data);
    if (!result.success) {
      throw new Error(result.error);
    }
  }
  redirect("/admin/content/projects");
}

export async function deleteProjectAction(id: string) {
  const result = await deleteProject(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleProjectFeaturedAction(id: string) {
  const result = await toggleProjectFeatured(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleProjectShowOnHomeAction(id: string) {
  const result = await toggleProjectShowOnHome(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function toggleProjectShowOnWorkPageAction(id: string) {
  const result = await toggleProjectShowOnWorkPage(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}
