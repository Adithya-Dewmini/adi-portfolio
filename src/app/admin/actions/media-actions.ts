"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/require-admin";

interface CreateMediaItemInput {
  title?: string;
  url: string;
  publicId: string;
  resourceType?: string;
  folder?: string;
  usedIn?: string;
}

function revalidateMediaPaths() {
  revalidatePath("/admin/media");
}

export async function getMediaItems() {
  await assertAdmin();
  return prisma.mediaItem.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function createMediaItem(input: Readonly<CreateMediaItemInput>) {
  await assertAdmin();

  try {
    const item = await prisma.mediaItem.create({
      data: {
        title: input.title ?? null,
        url: input.url,
        publicId: input.publicId,
        resourceType: input.resourceType ?? "image",
        folder: input.folder ?? null,
        usedIn: input.usedIn ?? null
      }
    });

    revalidateMediaPaths();
    return { success: true as const, data: item };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to create media item." };
  }
}

export async function deleteMediaItem(id: string) {
  await assertAdmin();
  try {
    await prisma.mediaItem.delete({
      where: { id }
    });
    revalidateMediaPaths();
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to delete media item." };
  }
}

export async function createMediaItemAction(input: Readonly<CreateMediaItemInput>) {
  const result = await createMediaItem(input);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function deleteMediaItemAction(id: string) {
  const result = await deleteMediaItem(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}
