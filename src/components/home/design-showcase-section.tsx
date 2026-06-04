"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface DesignShowcaseItem {
  title: string;
  subtitle?: string;
  category?: string;
  imageUrl?: string;
}

interface DesignPortfolioShowcaseProps {
  items?: DesignShowcaseItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const fallbackCards = [
  {
    title: "Social Media Campaigns",
    category: "Social Content",
    subtitle: "Campaign-ready layouts for consistent monthly publishing.",
    accentClassName: "from-cyan-400/22 via-sky-400/12 to-slate-950"
  },
  {
    title: "Product Launch Visuals",
    category: "Product Creative",
    subtitle: "Launch assets built for ads, stories, and hero sections.",
    accentClassName: "from-violet-400/24 via-fuchsia-400/10 to-slate-950"
  },
  {
    title: "Skincare Brand Creatives",
    category: "Brand Design",
    subtitle: "Premium visuals designed for modern beauty positioning.",
    accentClassName: "from-cyan-300/22 via-violet-400/10 to-slate-950"
  },
  {
    title: "Fashion Promotion Designs",
    category: "Campaign Design",
    subtitle: "Drop campaigns, sale creatives, and content direction.",
    accentClassName: "from-rose-400/20 via-fuchsia-400/10 to-slate-950"
  },
  {
    title: "E-commerce Banners",
    category: "Commerce Support",
    subtitle: "Collection banners and product-focused store visuals.",
    accentClassName: "from-amber-300/24 via-orange-300/10 to-slate-950"
  },
  {
    title: "UI & Website Visuals",
    category: "UI Design",
    subtitle: "Visual systems that support interfaces and landing pages.",
    accentClassName: "from-emerald-400/20 via-cyan-400/10 to-slate-950"
  }
];

function getSafeImageUrl(value?: string) {
  const imageUrl = value?.trim() ?? "";
  return imageUrl.startsWith("http") ? imageUrl : "";
}

function getShowcaseItems(items: DesignShowcaseItem[]) {
  const source = items.slice(0, 6);

  return fallbackCards.map((fallback, index) => ({
    title: source[index]?.title ?? fallback.title,
    category: source[index]?.category ?? fallback.category,
    subtitle: source[index]?.subtitle ?? fallback.subtitle,
    imageUrl: source[index]?.imageUrl,
    accentClassName: fallback.accentClassName
  }));
}

function getHeightClassName(index: number) {
  const pattern = [
    "min-h-[24rem]",
    "min-h-[20rem]",
    "min-h-[23rem]",
    "min-h-[21rem]",
    "min-h-[24rem]",
    "min-h-[20rem]"
  ];

  return pattern[index % pattern.length];
}

export function DesignPortfolioShowcase({ items = [] }: Readonly<DesignPortfolioShowcaseProps>) {
  const showcaseItems = getShowcaseItems(items);

  return (
    <section id="design-work" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-sky-300" />
              Selected Visual Work
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Design work that supports brands, products, and campaigns.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              A preview of social media creatives, product visuals, campaign layouts, and brand-focused digital content.
            </p>
          </div>

          <Link
            href="/work#design-work"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-cyan-100 lg:self-auto"
          >
            View Full Design Portfolio
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {showcaseItems.map((item, index) => {
            const safeUrl = getSafeImageUrl(item.imageUrl);

            return (
              <motion.article
                key={`${item.title}-${index}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={`group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_26px_80px_rgba(2,8,23,0.38)] backdrop-blur-xl ${getHeightClassName(index)}`}
              >
                <div className="relative mb-5 h-56 overflow-hidden rounded-[24px] border border-white/10 bg-slate-950">
                  {safeUrl ? (
                    <Image
                      src={safeUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.accentClassName}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_26%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_30%)]" />
                      <div className="absolute inset-x-5 bottom-5 grid grid-cols-4 gap-2 opacity-80">
                        {Array.from({ length: 8 }).map((_, blockIndex) => (
                          <div key={`${item.title}-${blockIndex}`} className="h-8 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm" />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/82 via-slate-950/14 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-slate-950/65 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <div className="px-1 pb-1">
                  <h3 className="font-display text-2xl font-semibold tracking-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">
                    {item.subtitle}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
