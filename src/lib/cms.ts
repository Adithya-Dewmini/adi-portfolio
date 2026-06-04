import {
  BadgeCheck,
  Brush,
  Code2,
  Database,
  Figma,
  Globe2,
  Layers3,
  LayoutGrid,
  LucideIcon,
  Megaphone,
  MonitorSmartphone,
  Palette,
  ShoppingBag,
  ShoppingCart,
  Store,
  TerminalSquare,
  Wrench
} from "lucide-react";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  adminDesignWorks,
  adminMediaItems,
  adminPages,
  adminProjects,
  adminServices,
  adminTestimonials,
  contactMessages,
  contactPageContent,
  homePageContent,
  servicesPageContent,
  siteSettings,
  workPageContent
} from "@/lib/admin-data";
import type { ContactPageContent, HomePageContent, ServicesPageContent, SiteSettings, WorkPageContent } from "@/lib/admin-data";
import {
  detailedServices,
  designWork,
  identityCards as defaultIdentityCards,
  projects as defaultProjects,
  selectedWork,
  services as defaultHomepageServices,
  visualWorkShowcase,
  workFilterTabs,
  workTools
} from "@/lib/data";
import type { DetailedService, VisualWorkShowcase, WorkProject, WorkTool } from "@/lib/data";

type PageKey = "home" | "work" | "services" | "contact";

const iconMap: Record<string, LucideIcon> = {
  "badge-check": BadgeCheck,
  "brush": Brush,
  "code-2": Code2,
  "database": Database,
  "figma": Figma,
  "globe-2": Globe2,
  "layers-3": Layers3,
  "layout-grid": LayoutGrid,
  "megaphone": Megaphone,
  "monitor-smartphone": MonitorSmartphone,
  "palette": Palette,
  "shopping-bag": ShoppingBag,
  "shopping-cart": ShoppingCart,
  "store": Store,
  "terminal-square": TerminalSquare,
  "wrench": Wrench
};

function formatDate(date: Date | string) {
  const value = typeof date === "string" ? new Date(date) : date;
  return value.toISOString().slice(0, 10);
}

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function normalizeStatusLabel(status: string) {
  return status ? titleCase(status) : "Draft";
}

function getIconByName(iconName?: string | null) {
  if (!iconName) {
    return TerminalSquare;
  }

  return iconMap[iconName] ?? TerminalSquare;
}

function parseJsonObject<T extends object>(value: Prisma.JsonValue | null | undefined): Partial<T> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return value as Partial<T>;
}

async function safeQuery<T>(fallback: T, query: () => Promise<T>) {
  try {
    return await query();
  } catch {
    return fallback;
  }
}

async function getPageRecord(page: PageKey) {
  try {
    return await prisma.pageContent.findUnique({
      where: { page }
    });
  } catch {
    return null;
  }
}

function mergePageContent<T extends { heroBadge?: string; heroTitle?: string; heroSubtitle?: string }>(
  fallback: T,
  record: { badge: string | null; title: string | null; subtitle: string | null; content: Prisma.JsonValue | null } | null
) {
  if (!record) {
    return fallback;
  }

  return {
    ...fallback,
    ...parseJsonObject<T>(record.content),
    ...(record.badge ? { heroBadge: record.badge } : {}),
    ...(record.title ? { heroTitle: record.title } : {}),
    ...(record.subtitle ? { heroSubtitle: record.subtitle } : {})
  } as T;
}

function mapProjectToWorkItem(project: {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  result: string | null;
  techStack: string[];
  featuredImageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}) {
  const accentMap: Record<string, string> = {
    "Full-Stack Systems": "from-sky-400/25 via-cyan-300/10 to-transparent",
    "Web Development": "from-violet-500/25 via-sky-400/10 to-transparent",
    "UI Design": "from-emerald-400/20 via-sky-400/10 to-transparent",
    "E-commerce": "from-amber-300/20 via-orange-300/10 to-transparent",
    "Social Media": "from-pink-400/20 via-violet-400/10 to-transparent",
    "Graphic Design": "from-fuchsia-400/20 via-sky-400/10 to-transparent"
  };

  return {
    title: project.title,
    slug: project.slug,
    category: project.category as WorkProject["category"],
    description: project.shortDescription,
    tags: project.techStack,
    status: project.featured ? "Featured Project" : project.category,
    previewClassName: accentMap[project.category] ?? "from-sky-400/20 via-violet-400/10 to-transparent",
    result: project.result ?? undefined,
    liveUrl: project.liveUrl ?? undefined,
    githubUrl: project.githubUrl ?? undefined,
    featured: project.featured,
    featuredImageUrl: project.featuredImageUrl ?? undefined
  } satisfies WorkProject;
}

function mapDesignWorkToShowcase(item: { title: string; description: string; category: string; imageUrl: string | null }, index: number) {
  const sizePattern: VisualWorkShowcase["size"][] = ["tall", "medium", "compact"];
  const accentPattern = [
    "from-sky-400/20 via-violet-400/12 to-white/5",
    "from-rose-400/18 via-fuchsia-400/12 to-white/5",
    "from-cyan-400/18 via-sky-400/12 to-white/5",
    "from-violet-400/18 via-indigo-400/12 to-white/5",
    "from-amber-300/18 via-orange-300/12 to-white/5",
    "from-emerald-400/18 via-cyan-400/12 to-white/5"
  ];

  return {
    title: item.title,
    subtitle: item.description,
    category: item.category,
    imageUrl: item.imageUrl ?? undefined,
    size: sizePattern[index % sizePattern.length],
    accentClassName: accentPattern[index % accentPattern.length]
  } satisfies VisualWorkShowcase;
}

export async function getPageEditorContent(page: PageKey) {
  const record = await getPageRecord(page);

  switch (page) {
    case "home":
      return mergePageContent<HomePageContent>(homePageContent, record);
    case "work":
      return mergePageContent<WorkPageContent>(workPageContent, record);
    case "services":
      return mergePageContent<ServicesPageContent>(servicesPageContent, record);
    case "contact":
      return mergePageContent<ContactPageContent>(contactPageContent, record);
  }
}

export async function getHomePageEditorContent() {
  return getPageEditorContent("home") as Promise<HomePageContent>;
}

export async function getWorkPageEditorContent() {
  return getPageEditorContent("work") as Promise<WorkPageContent>;
}

export async function getServicesPageEditorContent() {
  return getPageEditorContent("services") as Promise<ServicesPageContent>;
}

export async function getContactPageEditorContent() {
  return getPageEditorContent("contact") as Promise<ContactPageContent>;
}

export async function getAdminPageSummaries() {
  return safeQuery(adminPages, async () => {
    const records = await prisma.pageContent.findMany({
      orderBy: { updatedAt: "desc" }
    });

    if (!records.length) {
      return adminPages;
    }

    return adminPages.map((page) => {
      const record = records.find((item) => item.page === page.id);
      return record
        ? {
            ...page,
            status: normalizeStatusLabel(record.status) as "Published" | "Draft",
            updatedAt: formatDate(record.updatedAt)
          }
        : page;
    });
  });
}

export async function getAdminProjectsData() {
  return safeQuery(adminProjects, async () => {
    const records = await prisma.project.findMany({
      orderBy: { updatedAt: "desc" }
    });

    if (!records.length) {
      return adminProjects;
    }

    return records.map((project) => ({
      ...project,
      status: normalizeStatusLabel(project.status) as "Published" | "Draft",
      updatedAt: formatDate(project.updatedAt)
    }));
  });
}

export async function getAdminDesignWorkData() {
  return safeQuery(adminDesignWorks, async () => {
    const records = await prisma.designWork.findMany({
      orderBy: { updatedAt: "desc" }
    });

    if (!records.length) {
      return adminDesignWorks;
    }

    return records.map((item) => ({
      ...item,
      status: normalizeStatusLabel(item.status) as "Published" | "Draft",
      updatedAt: formatDate(item.updatedAt)
    }));
  });
}

export async function getAdminServicesData() {
  return safeQuery(adminServices, async () => {
    const records = await prisma.service.findMany({
      orderBy: { updatedAt: "desc" }
    });

    if (!records.length) {
      return adminServices;
    }

    return records.map((service) => ({
      ...service,
      status: normalizeStatusLabel(service.status) as "Published" | "Draft",
      updatedAt: formatDate(service.updatedAt)
    }));
  });
}

export async function getAdminTestimonialsData() {
  return safeQuery(adminTestimonials, async () => {
    const records = await prisma.testimonial.findMany({
      orderBy: { updatedAt: "desc" }
    });

    if (!records.length) {
      return adminTestimonials;
    }

    return records.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role ?? "",
      company: item.company ?? "",
      quote: item.message,
      status: normalizeStatusLabel(item.status) as "Published" | "Draft",
      featured: item.featured,
      updatedAt: formatDate(item.updatedAt)
    }));
  });
}

export async function getAdminMessagesData() {
  return safeQuery(contactMessages, async () => {
    const records = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" }
    });

    if (!records.length) {
      return contactMessages;
    }

    return records.map((message) => ({
      id: message.id,
      name: `${message.firstName} ${message.lastName ?? ""}`.trim(),
      email: message.email,
      subject: message.subject ?? "No subject",
      preview: message.message.length > 110 ? `${message.message.slice(0, 107)}...` : message.message,
      message: message.message,
      status: titleCase(message.status) as "New" | "Read" | "Replied",
      receivedAt: formatDate(message.createdAt)
    }));
  });
}

export async function getAdminMediaItemsData() {
  return safeQuery(adminMediaItems, async () => {
    const records = await prisma.mediaItem.findMany({
      orderBy: { createdAt: "desc" }
    });

    if (!records.length) {
      return adminMediaItems;
    }

    return records.map((item) => ({
      id: item.id,
      title: item.title ?? item.publicId,
      url: item.url,
      publicId: item.publicId,
      usedIn: (item.usedIn ?? "Project") as "Project" | "Design Work" | "Page",
      updatedAt: formatDate(item.updatedAt)
    }));
  });
}

export async function getSiteSettingsData() {
  return safeQuery(siteSettings, async () => {
    const record = await prisma.siteSetting.findUnique({
      where: { key: "site-settings" }
    });

    if (!record) {
      return siteSettings;
    }

    return {
      ...siteSettings,
      ...parseJsonObject<SiteSettings>(record.value)
    };
  });
}

export async function getWorkPagePublicData() {
  return safeQuery(
    {
      pageContent: workPageContent,
      projects: selectedWork,
      showcase: visualWorkShowcase,
      tabs: [...workFilterTabs] as string[]
    },
    async () => {
      const [record, projects, designWorks] = await Promise.all([
        getPageRecord("work"),
        prisma.project.findMany({
          where: { status: "published", showOnWorkPage: true },
          orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
        }),
        prisma.designWork.findMany({
          where: { status: "published", showOnWorkPage: true },
          orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
        })
      ]);

      return {
        pageContent: mergePageContent<WorkPageContent>(workPageContent, record),
        projects: projects.length ? projects.map(mapProjectToWorkItem) : selectedWork,
        showcase: designWorks.length ? designWorks.map((item, index) => mapDesignWorkToShowcase(item, index)) : visualWorkShowcase,
        tabs: mergePageContent<WorkPageContent>(workPageContent, record).workCategories?.length
          ? mergePageContent<WorkPageContent>(workPageContent, record).workCategories
          : [...workFilterTabs]
      };
    }
  );
}

export async function getServicesPagePublicData() {
  return safeQuery(
    {
      pageContent: servicesPageContent,
      services: detailedServices
    },
    async () => {
      const [record, services] = await Promise.all([
        getPageRecord("services"),
        prisma.service.findMany({
          where: { status: "published", showOnServicesPage: true },
          orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
        })
      ]);

      return {
        pageContent: mergePageContent<ServicesPageContent>(servicesPageContent, record),
        services: services.length
          ? services.map((service) => ({
              title: service.title,
              description: service.fullDescription ?? service.shortDescription,
              points: service.bulletPoints,
              icon: getIconByName(service.iconName)
            }))
          : detailedServices
      };
    }
  );
}

export async function getContactPagePublicData() {
  return safeQuery(
    {
      pageContent: contactPageContent
    },
    async () => {
      const record = await getPageRecord("contact");

      return {
        pageContent: mergePageContent<ContactPageContent>(contactPageContent, record)
      };
    }
  );
}

export function getStaticWorkTools() {
  return workTools satisfies WorkTool[];
}

function mapProjectToHomePreview(project: {
  title: string;
  category: string;
  shortDescription: string;
  techStack: string[];
  result: string | null;
  featuredImageUrl: string | null;
  liveUrl: string | null;
}) {
  return {
    title: project.title,
    type: project.category,
    description: project.shortDescription,
    stack: project.techStack,
    metric: project.result || project.category,
    featuredImageUrl: project.featuredImageUrl ?? undefined,
    liveUrl: project.liveUrl ?? undefined
  };
}

function mapServiceToHomePreview(service: {
  title: string;
  shortDescription: string;
  iconName: string | null;
}) {
  return {
    title: service.title,
    description: service.shortDescription,
    iconName: service.iconName ?? undefined
  };
}

export async function getHomePagePublicData() {
  const fallbackIdentityCards = defaultIdentityCards.map((card, index) => ({
    id: `identity-${index}`,
    title: card.title,
    description: card.description,
    enabled: true
  }));

  return safeQuery(
    {
      pageContent: homePageContent,
      projects: defaultProjects,
      services: defaultHomepageServices.map((service) => ({
        title: service.title,
        description: service.description
      })),
      designWorks: designWork.map((item) => ({
        title: item
      })),
      identityCards: fallbackIdentityCards
    },
    async () => {
      const [record, allProjects, services, designWorks] = await Promise.all([
        getPageRecord("home"),
        prisma.project.findMany({
          where: { status: "published" },
          orderBy: [{ showOnHome: "desc" }, { featured: "desc" }, { updatedAt: "desc" }]
        }),
        prisma.service.findMany({
          where: { status: "published", showOnHome: true },
          orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
        }),
        prisma.designWork.findMany({
          where: { status: "published", showOnHome: true },
          orderBy: [{ featured: "desc" }, { updatedAt: "desc" }]
        })
      ]);

      const pageContent = mergePageContent<HomePageContent>(homePageContent, record);
      const homeProjects = allProjects.filter((project) => project.showOnHome);
      const featuredProjects = allProjects.filter((project) => project.featured);
      const selectedProjects = (homeProjects.length ? homeProjects : featuredProjects).slice(0, 8);

      return {
        pageContent,
        projects: selectedProjects.length ? selectedProjects.map(mapProjectToHomePreview) : defaultProjects,
        services: services.length
          ? services.map(mapServiceToHomePreview)
          : defaultHomepageServices.map((service) => ({
              title: service.title,
              description: service.description
            })),
        designWorks: designWorks.length
          ? designWorks.slice(0, 6).map((item) => ({
              title: item.title,
              subtitle: item.description,
              category: item.category,
              imageUrl: item.imageUrl ?? undefined
            }))
          : designWork.map((item) => ({
              title: item
            })),
        identityCards: pageContent.identityCards?.length ? pageContent.identityCards : fallbackIdentityCards
      };
    }
  );
}
