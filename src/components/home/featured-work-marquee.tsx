"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
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

function ProjectCard({ item, index }: { item: FeaturedWorkItem; index: number }) {
  const imageUrl = item.featuredImageUrl?.trim() ?? "";
  const hasImage = imageUrl.startsWith("http");
  const href = item.liveUrl || "/work#projects";
  const isExternal = Boolean(item.liveUrl);
  const accentVariants = [
    "from-sky-400/30 via-cyan-300/10 to-slate-950",
    "from-violet-400/28 via-fuchsia-400/10 to-slate-950",
    "from-cyan-300/24 via-blue-400/10 to-slate-950"
  ];
  const accentClassName = accentVariants[index % accentVariants.length];

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      whileHover={{ y: -6 }}
      className="group relative w-[280px] shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#08101c] shadow-[0_28px_70px_rgba(2,8,23,0.42)] sm:w-[300px]"
    >
      <div className="relative aspect-[9/16]">
        {hasImage ? (
          <Image
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 767px) 280px, 300px"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${accentClassName}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_30%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.22),transparent_34%)]" />
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.12),rgba(3,8,18,0)_28%,rgba(3,8,18,0.06)_46%,rgba(3,8,18,0.7)_100%)]" />

        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <div className="rounded-2xl border border-white/10 bg-[#060b14]/78 px-4 py-3 backdrop-blur-xl">
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-slate-400">
              Selected Work
            </p>
            <h3 className="mt-1 max-w-[12rem] text-lg font-semibold leading-6 text-white">
              {item.title}
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              {item.type}
            </p>
          </div>

          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-cyan-300/16 bg-cyan-300/10 backdrop-blur-xl">
            <Sparkles className="h-5 w-5 text-sky-200" />
          </div>
        </div>

        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#060b14]/78 px-4 py-3 backdrop-blur-xl">
            <p className="max-w-[13rem] text-sm leading-6 text-slate-200">
              {item.description}
            </p>
          </div>

          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(56,189,248,0.92),rgba(14,165,233,0.82))] text-slate-950 shadow-[0_16px_40px_rgba(56,189,248,0.28)] transition hover:scale-105"
            aria-label={isExternal ? `Open ${item.title}` : "View all work"}
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedWorkMarquee({ items = [] }: Readonly<FeaturedWorkMarqueeProps>) {
  const visibleItems = items.slice(0, 5);

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
          className="mx-auto max-w-4xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm text-slate-300">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-400" />
            Selected Work
          </div>
          <h2 className="font-display text-5xl font-semibold uppercase leading-none tracking-tight text-white md:text-7xl">
            Selected{" "}
            <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(56,189,248,0.95)]">
              Work
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-xl">
            A curated selection of premium digital projects, visual systems, and launch-ready experiences.
          </p>
        </motion.div>

        <div className="no-scrollbar mt-14 flex gap-5 overflow-x-auto pb-4 sm:gap-6 lg:justify-center">
          {visibleItems.map((item, index) => (
            <ProjectCard key={`${item.title}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
