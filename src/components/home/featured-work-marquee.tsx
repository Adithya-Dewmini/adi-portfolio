"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedWorkItem {
  title: string;
  type: string;
  description: string;
  stack: string[];
  featuredImageUrl?: string;
  liveUrl?: string;
}

interface FeaturedWorkMarqueeProps {
  items?: FeaturedWorkItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function truncateDescription(text: string) {
  if (text.length <= 108) {
    return text;
  }

  return `${text.slice(0, 105).trimEnd()}...`;
}

function ProjectCard({ item, index }: { item: FeaturedWorkItem; index: number }) {
  const imageUrl = item.featuredImageUrl?.trim() ?? "";
  const hasImage = imageUrl.startsWith("http");
  const techTags = item.stack.slice(0, 3);
  const href = item.liveUrl || "/work#projects";
  const isExternal = Boolean(item.liveUrl);
  const accentVariants = [
    "from-cyan-400/30 via-sky-400/12 to-slate-950",
    "from-violet-400/30 via-fuchsia-400/12 to-slate-950",
    "from-cyan-300/28 via-indigo-400/12 to-slate-950"
  ];
  const accentClassName = accentVariants[index % accentVariants.length];

  return (
    <article className="group flex w-[300px] shrink-0 flex-col rounded-[2rem] border border-white/10 bg-slate-950/70 p-3 text-white shadow-[0_24px_80px_rgba(2,8,23,0.5)] backdrop-blur-xl sm:w-[340px] lg:w-[390px]">
      <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-slate-900">
        <div className="relative aspect-[16/10]">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={item.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              sizes="(max-width: 767px) 300px, (max-width: 1279px) 340px, 390px"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${accentClassName}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_28%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_32%)]" />
              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-cyan-100/70">Selected Project</p>
                  <p className="mt-2 text-lg font-medium text-white/95">{item.title}</p>
                </div>
                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md">
                  <Sparkles className="h-5 w-5 text-white/80" />
                </div>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/12 to-transparent" />
          <div className="absolute left-4 top-4">
            <span className="inline-flex rounded-full border border-white/12 bg-slate-950/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-slate-200 backdrop-blur-md">
              {item.type}
            </span>
          </div>
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="absolute bottom-4 right-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-sky-400 to-violet-500 text-slate-950 shadow-[0_18px_45px_rgba(34,211,238,0.28)] transition duration-300 hover:scale-105"
            aria-label={isExternal ? `Open ${item.title}` : "View all work"}
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <h3 className="font-display text-[1.65rem] font-semibold tracking-tight text-white sm:text-[1.8rem]">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-7 text-slate-400">
          {truncateDescription(item.description)}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {techTags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function FeaturedWorkMarquee({ items = [] }: Readonly<FeaturedWorkMarqueeProps>) {
  const visibleItems = items.slice(0, 6);
  const shouldAnimate = visibleItems.length > 1;
  const marqueeItems = visibleItems.length > 1 ? [...visibleItems, ...visibleItems] : visibleItems;

  if (!visibleItems.length) {
    return null;
  }

  return (
    <section id="work" className="px-5 py-24 md:px-8">
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
              Selected Work
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Digital work with purpose.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
              A curated look at selected websites, systems, e-commerce work, and creative digital projects.
            </p>
          </div>

          <Link
            href="/work#projects"
            className="inline-flex items-center gap-2 self-start rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-cyan-100 lg:self-auto"
          >
            View All Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="hidden md:block">
          <div className="work-marquee relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[#080A0F] via-[#080A0F]/88 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[#080A0F] via-[#080A0F]/88 to-transparent" />
            <div className={shouldAnimate ? "work-marquee-track flex gap-5 py-2" : "flex gap-5 py-2"}>
              {marqueeItems.map((item, index) => (
                <ProjectCard key={`${item.title}-${index}`} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="no-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-2 md:hidden">
          {visibleItems.map((item, index) => (
            <ProjectCard key={`${item.title}-mobile-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
