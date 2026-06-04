import { config as loadEnv } from "dotenv";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, type Prisma } from "@prisma/client";
import { Pool } from "pg";
import {
  adminDesignWorks,
  adminPages,
  adminProjects,
  adminServices,
  homePageContent,
  servicesPageContent,
  siteSettings,
  workPageContent,
  contactPageContent
} from "../src/lib/admin-data";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not configured for prisma/seed.ts");
}

const pool = new Pool({
  connectionString,
  max: 1
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedPages() {
  const pagePayloads = [
    { page: "home", title: homePageContent.heroTitle, badge: homePageContent.heroBadge, subtitle: homePageContent.heroSubtitle, content: homePageContent },
    { page: "work", title: workPageContent.heroTitle, badge: workPageContent.heroBadge, subtitle: workPageContent.heroSubtitle, content: workPageContent },
    { page: "services", title: servicesPageContent.heroTitle, badge: servicesPageContent.heroBadge, subtitle: servicesPageContent.heroSubtitle, content: servicesPageContent },
    { page: "contact", title: contactPageContent.heroTitle, badge: contactPageContent.heroBadge, subtitle: contactPageContent.heroSubtitle, content: contactPageContent }
  ];

  for (const item of pagePayloads) {
    await prisma.pageContent.upsert({
      where: { page: item.page },
      update: {
        page: item.page,
        title: item.title,
        badge: item.badge,
        subtitle: item.subtitle,
        content: item.content as unknown as Prisma.InputJsonValue
      },
      create: {
        page: item.page,
        title: item.title,
        badge: item.badge,
        subtitle: item.subtitle,
        content: item.content as unknown as Prisma.InputJsonValue
      }
    });
  }
}

async function seedProjects() {
  for (const project of adminProjects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {
        title: project.title,
        slug: project.slug,
        category: project.category,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        problem: project.problem,
        solution: project.solution,
        result: project.result,
        techStack: project.techStack,
        featuredImageUrl: project.featuredImageUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        status: project.status.toLowerCase()
        ,
        featured: project.featured,
        showOnHome: project.showOnHome,
        showOnWorkPage: project.showOnWorkPage
      },
      create: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        category: project.category,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        problem: project.problem,
        solution: project.solution,
        result: project.result,
        techStack: project.techStack,
        featuredImageUrl: project.featuredImageUrl,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        status: project.status.toLowerCase(),
        featured: project.featured,
        showOnHome: project.showOnHome,
        showOnWorkPage: project.showOnWorkPage
      }
    });
  }
}

async function seedDesignWork() {
  for (const item of adminDesignWorks) {
    await prisma.designWork.upsert({
      where: { slug: item.slug },
      update: {
        title: item.title,
        slug: item.slug,
        category: item.category,
        brandClient: item.brandClient,
        description: item.description,
        imageUrl: item.imageUrl,
        toolsUsed: item.toolsUsed,
        status: item.status.toLowerCase(),
        featured: item.featured,
        showOnHome: item.showOnHome,
        showOnWorkPage: item.showOnWorkPage
      },
      create: {
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: item.category,
        brandClient: item.brandClient,
        description: item.description,
        imageUrl: item.imageUrl,
        toolsUsed: item.toolsUsed,
        status: item.status.toLowerCase(),
        featured: item.featured,
        showOnHome: item.showOnHome,
        showOnWorkPage: item.showOnWorkPage
      }
    });
  }
}

async function seedServices() {
  for (const service of adminServices) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {
        title: service.title,
        slug: service.slug,
        iconName: service.iconName,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,
        bulletPoints: service.bulletPoints,
        status: service.status.toLowerCase(),
        featured: service.featured,
        showOnHome: service.showOnHome,
        showOnServicesPage: service.showOnServicesPage
      },
      create: {
        id: service.id,
        title: service.title,
        slug: service.slug,
        iconName: service.iconName,
        shortDescription: service.shortDescription,
        fullDescription: service.fullDescription,
        bulletPoints: service.bulletPoints,
        status: service.status.toLowerCase(),
        featured: service.featured,
        showOnHome: service.showOnHome,
        showOnServicesPage: service.showOnServicesPage
      }
    });
  }
}

async function seedSettings() {
  await prisma.siteSetting.upsert({
    where: { key: "site-settings" },
    update: { value: siteSettings as unknown as Prisma.InputJsonValue },
    create: {
      key: "site-settings",
      value: siteSettings as unknown as Prisma.InputJsonValue
    }
  });
}

async function main() {
  await seedPages();
  await seedProjects();
  await seedDesignWork();
  await seedServices();
  await seedSettings();

  console.log(`Seeded ${adminPages.length} pages, ${adminProjects.length} projects, ${adminDesignWorks.length} design works, and ${adminServices.length} services.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
