"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { assertAdmin } from "@/lib/require-admin";

interface ContactMessageInput {
  firstName: string;
  lastName?: string | null;
  email: string;
  subject?: string | null;
  message: string;
}

function revalidateMessagePaths() {
  revalidatePath("/admin/messages");
  revalidatePath("/admin/dashboard");
}

export async function createContactMessage(data: Readonly<ContactMessageInput>) {
  try {
    const message = await prisma.contactMessage.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName?.trim() || null,
        email: data.email.trim(),
        subject: data.subject?.trim() || null,
        message: data.message.trim()
      }
    });
    revalidateMessagePaths();
    return { success: true as const, data: message };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to create message." };
  }
}

export async function getContactMessages() {
  await assertAdmin();
  return prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });
}

export async function markMessageAsRead(id: string) {
  await assertAdmin();
  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status: "read" }
    });
    revalidateMessagePaths();
    return { success: true as const, data: message };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to update message." };
  }
}

export async function markMessageAsReplied(id: string) {
  await assertAdmin();
  try {
    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status: "replied" }
    });
    revalidateMessagePaths();
    return { success: true as const, data: message };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to update message." };
  }
}

export async function deleteMessage(id: string) {
  await assertAdmin();
  try {
    await prisma.contactMessage.delete({
      where: { id }
    });
    revalidateMessagePaths();
    return { success: true as const };
  } catch (error) {
    return { success: false as const, error: error instanceof Error ? error.message : "Unable to delete message." };
  }
}

export async function markMessageAsReadAction(id: string) {
  const result = await markMessageAsRead(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function markMessageAsRepliedAction(id: string) {
  const result = await markMessageAsReplied(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function deleteMessageAction(id: string) {
  const result = await deleteMessage(id);
  if (!result.success) {
    throw new Error(result.error);
  }
}
