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

function splitByComma(formData: FormData, key: string) {
  return getString(formData, key)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function revalidatePagePaths(page: string) {
  revalidatePath("/admin/pages");
  revalidatePath(`/admin/pages/${page}`);
  revalidatePath(page === "home" ? "/" : `/${page}`);
}

interface PageContentInput {
  badge?: string;
  title?: string;
  subtitle?: string;
  content: Prisma.InputJsonValue;
  status?: string;
}

function normalizePageStatus(status?: string) {
  return status?.toLowerCase() === "draft" ? "draft" : "published";
}

export async function getPageContent(page: string) {
  return prisma.pageContent.findUnique({
    where: { page }
  });
}

export async function getAllPages() {
  return prisma.pageContent.findMany({
    orderBy: { updatedAt: "desc" }
  });
}

export async function updatePageContent(page: string, payload: Readonly<PageContentInput>) {
  await assertAdmin();

  try {
    const record = await prisma.pageContent.upsert({
      where: { page },
      update: {
        badge: payload.badge,
        title: payload.title,
        subtitle: payload.subtitle,
        content: payload.content,
        status: normalizePageStatus(payload.status)
      },
      create: {
        page,
        badge: payload.badge,
        title: payload.title,
        subtitle: payload.subtitle,
        content: payload.content,
        status: normalizePageStatus(payload.status)
      }
    });

    revalidatePagePaths(page);

    return { success: true as const, data: record };
  } catch (error) {
    return {
      success: false as const,
      error: error instanceof Error ? error.message : "Unable to update page content."
    };
  }
}

export async function saveHomePageContentAction(formData: FormData) {
  const content = {
    heroBadge: getString(formData, "heroBadge"),
    heroTitle: getString(formData, "heroTitle"),
    heroSubtitle: getString(formData, "heroSubtitle"),
    primaryCtaText: getString(formData, "primaryCtaText"),
    primaryCtaLink: getString(formData, "primaryCtaLink"),
    secondaryCtaText: getString(formData, "secondaryCtaText"),
    secondaryCtaLink: getString(formData, "secondaryCtaLink"),
    identityCards: [
      {
        id: "identity-developer",
        title: getString(formData, "identityDeveloperTitle"),
        description: getString(formData, "identityDeveloperDescription"),
        enabled: getBoolean(formData, "identityDeveloperEnabled")
      },
      {
        id: "identity-designer",
        title: getString(formData, "identityDesignerTitle"),
        description: getString(formData, "identityDesignerDescription"),
        enabled: getBoolean(formData, "identityDesignerEnabled")
      },
      {
        id: "identity-digital-operator",
        title: getString(formData, "identityOperatorTitle"),
        description: getString(formData, "identityOperatorDescription"),
        enabled: getBoolean(formData, "identityOperatorEnabled")
      }
    ],
    featuredWorkSectionTitle: getString(formData, "featuredWorkSectionTitle"),
    featuredServicesSectionTitle: getString(formData, "featuredServicesSectionTitle"),
    aboutPreviewText: getString(formData, "aboutPreviewText"),
    finalCtaTitle: getString(formData, "finalCtaTitle"),
    finalCtaText: getString(formData, "finalCtaText"),
    showHero: getBoolean(formData, "showHero"),
    showIdentityCards: getBoolean(formData, "showIdentityCards"),
    showFeaturedWork: getBoolean(formData, "showFeaturedWork"),
    showFeaturedServices: getBoolean(formData, "showFeaturedServices"),
    showAboutPreview: getBoolean(formData, "showAboutPreview"),
    showFinalCta: getBoolean(formData, "showFinalCta")
  };

  const result = await updatePageContent("home", {
    badge: content.heroBadge,
    title: content.heroTitle,
    subtitle: content.heroSubtitle,
    content: content as Prisma.InputJsonValue
  });

  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function saveWorkPageContentAction(formData: FormData) {
  const content = {
    heroBadge: getString(formData, "heroBadge"),
    heroTitle: getString(formData, "heroTitle"),
    heroSubtitle: getString(formData, "heroSubtitle"),
    primaryCtaText: getString(formData, "primaryCtaText"),
    primaryCtaLink: getString(formData, "primaryCtaLink"),
    secondaryCtaText: getString(formData, "secondaryCtaText"),
    secondaryCtaLink: getString(formData, "secondaryCtaLink"),
    workCategories: splitByComma(formData, "workCategories"),
    featuredWorkSectionTitle: getString(formData, "featuredWorkSectionTitle"),
    caseStudySectionTitle: getString(formData, "caseStudySectionTitle"),
    designShowcaseSectionTitle: getString(formData, "designShowcaseSectionTitle"),
    toolsSectionTitle: getString(formData, "toolsSectionTitle"),
    finalCtaTitle: getString(formData, "finalCtaTitle"),
    finalCtaText: getString(formData, "finalCtaText")
  };

  const result = await updatePageContent("work", {
    badge: content.heroBadge,
    title: content.heroTitle,
    subtitle: content.heroSubtitle,
    content: content as Prisma.InputJsonValue
  });

  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function saveServicesPageContentAction(formData: FormData) {
  const content = {
    heroBadge: getString(formData, "heroBadge"),
    heroTitle: getString(formData, "heroTitle"),
    heroSubtitle: getString(formData, "heroSubtitle"),
    primaryCtaText: getString(formData, "primaryCtaText"),
    primaryCtaLink: getString(formData, "primaryCtaLink"),
    secondaryCtaText: getString(formData, "secondaryCtaText"),
    secondaryCtaLink: getString(formData, "secondaryCtaLink"),
    servicesGridTitle: getString(formData, "servicesGridTitle"),
    processSectionTitle: getString(formData, "processSectionTitle"),
    audiencesSectionTitle: getString(formData, "audiencesSectionTitle"),
    finalCtaTitle: getString(formData, "finalCtaTitle"),
    finalCtaText: getString(formData, "finalCtaText")
  };

  const result = await updatePageContent("services", {
    badge: content.heroBadge,
    title: content.heroTitle,
    subtitle: content.heroSubtitle,
    content: content as Prisma.InputJsonValue
  });

  if (!result.success) {
    throw new Error(result.error);
  }
}

export async function saveContactPageContentAction(formData: FormData) {
  const content = {
    heroBadge: getString(formData, "heroBadge"),
    heroTitle: getString(formData, "heroTitle"),
    heroSubtitle: getString(formData, "heroSubtitle"),
    emailDisplayText: getString(formData, "emailDisplayText"),
    emailAddress: getString(formData, "emailAddress"),
    whatsappDisplayText: getString(formData, "whatsappDisplayText"),
    whatsappNumber: getString(formData, "whatsappNumber"),
    whatsappLink: getString(formData, "whatsappLink"),
    locationTitle: getString(formData, "locationTitle"),
    locationDescription: getString(formData, "locationDescription"),
    contactFormHeading: getString(formData, "contactFormHeading"),
    mapCardTitle: getString(formData, "mapCardTitle"),
    availabilityText: getString(formData, "availabilityText"),
    finalCtaTitle: getString(formData, "finalCtaTitle"),
    finalCtaText: getString(formData, "finalCtaText"),
    showContactForm: getBoolean(formData, "showContactForm"),
    showMapCard: getBoolean(formData, "showMapCard"),
    showWhatsAppCard: getBoolean(formData, "showWhatsAppCard")
  };

  const result = await updatePageContent("contact", {
    badge: content.heroBadge,
    title: content.heroTitle,
    subtitle: content.heroSubtitle,
    content: content as Prisma.InputJsonValue
  });

  if (!result.success) {
    throw new Error(result.error);
  }
}
