"use client";

import Link from "next/link";
import { ArrowRight, Code2, Megaphone, ShoppingBag, Sparkles, SwatchBook } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const featureCards = [
  {
    label: "Build",
    title: "Web Development",
    text: "Modern websites, dashboards, and digital systems.",
    icon: Code2
  },
  {
    label: "Design",
    title: "Graphic Design",
    text: "Brand visuals, post designs, and campaign creatives.",
    icon: SwatchBook
  },
  {
    label: "Manage",
    title: "E-commerce Support",
    text: "Shopify, WordPress, product updates, and store content.",
    icon: ShoppingBag
  },
  {
    label: "Grow",
    title: "Social Media Content",
    text: "Creative direction for posts, campaigns, and brand presence.",
    icon: Megaphone
  }
];

const boardTiles = [
  {
    title: "UI Layouts",
    label: "Layout system",
    symbol: "◫",
    accentClassName: "from-cyan-400/22 via-sky-400/10 to-transparent"
  },
  {
    title: "Social Posts",
    label: "Campaign ready",
    symbol: "◎",
    accentClassName: "from-violet-400/24 via-fuchsia-400/10 to-transparent"
  },
  {
    title: "Product Visuals",
    label: "Product focused",
    symbol: "✦",
    accentClassName: "from-amber-300/24 via-orange-300/10 to-transparent"
  },
  {
    title: "Brand Direction",
    label: "Brand aligned",
    symbol: "◇",
    accentClassName: "from-emerald-400/20 via-cyan-400/10 to-transparent"
  }
];

export function CreativeProfileSection() {
  return (
    <section id="creative-profile" className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_88%_25%,rgba(139,92,246,0.15),transparent_30%),#070A12]" />
      <div className="pointer-events-none absolute left-[10%] top-20 h-36 w-36 rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute top-24 h-28 w-56 rounded-full bg-cyan-300/8 blur-3xl md:left-[18%]" />
      <div className="pointer-events-none absolute bottom-12 right-[12%] h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[18%] top-28 h-32 w-32 rounded-full bg-blue-400/6 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
              <Sparkles className="h-4 w-4 text-sky-300" />
              Creative Identity
            </div>

            <h2 className="max-w-[44rem] font-display text-4xl font-semibold tracking-tight text-white md:text-5xl xl:text-6xl">
              Designing visuals and digital experiences through one connected workflow.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
              I combine software engineering, graphic design, e-commerce support, and social media content to create digital work that looks premium, works smoothly, and supports real brand goals.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {featureCards.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.article
                    key={item.title}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="rounded-[24px] border border-white/10 bg-white/[0.035] p-5 shadow-[0_18px_50px_rgba(2,8,23,0.28)] backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.055] hover:[background-image:linear-gradient(135deg,rgba(56,189,248,0.06),rgba(139,92,246,0.03))] md:p-6"
                  >
                    <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                    <h3 className="font-display text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/work#design-work"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-ink shadow-[0_16px_38px_rgba(255,255,255,0.12)] transition hover:scale-[1.02] hover:bg-slate-100"
              >
                View Design Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-white backdrop-blur-xl transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
              >
                Contact Me
              </Link>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Design, development, and content support in one workflow.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-[36rem]">
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35 }}
                className="relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_28px_90px_rgba(2,8,23,0.45)] backdrop-blur-xl md:p-6"
              >
                <div className="pointer-events-none absolute inset-x-8 top-0 h-20 rounded-b-[3rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent)] opacity-70" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.14),transparent_26%)]" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:30px_30px]" />
                <span className="pointer-events-none absolute left-10 top-14 h-2 w-2 rounded-full bg-cyan-300/80 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
                <span className="pointer-events-none absolute right-16 top-24 h-2 w-2 rounded-full bg-violet-300/70 shadow-[0_0_18px_rgba(167,139,250,0.7)]" />
                <span className="pointer-events-none absolute bottom-16 right-12 h-2 w-2 rounded-full bg-sky-300/70 shadow-[0_0_18px_rgba(125,211,252,0.7)]" />

                <div className="relative rounded-[28px] border border-white/10 bg-white/[0.03] p-5 md:p-6">
                  <div className="flex flex-col gap-5 border-b border-white/8 pb-5 sm:gap-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-[18rem] sm:max-w-[21rem]">
                        <p className="text-[0.65rem] uppercase tracking-[0.26em] text-slate-500">Creative Systems Board</p>
                        <h3 className="mt-3 font-display text-2xl font-semibold text-white md:text-3xl">
                          Creative Systems Board
                        </h3>
                        <p className="mt-2 text-sm text-slate-400">Code + Design + Content</p>
                      </div>

                      <div className="flex items-start gap-3 self-start sm:gap-4">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.3 }}
                          className="min-w-[11.5rem] rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(15,23,42,0.88),rgba(30,41,59,0.72))] px-4 py-4 shadow-[0_18px_50px_rgba(2,8,23,0.32)] backdrop-blur-xl"
                        >
                          <p className="font-display text-3xl font-semibold text-white">3+</p>
                          <p className="mt-1 text-sm text-slate-400">Creative Disciplines</p>
                          <p className="mt-3 text-[0.68rem] uppercase tracking-[0.18em] text-slate-500">
                            Development • Design • Content
                          </p>
                          <div className="mt-4 flex gap-2">
                            <span className="h-1.5 w-12 rounded-full bg-gradient-to-r from-cyan-300 to-sky-400" />
                            <span className="h-1.5 w-3 rounded-full bg-white/20" />
                            <span className="h-1.5 w-3 rounded-full bg-white/10" />
                          </div>
                        </motion.div>

                        <div className="hidden lg:block">
                          <div className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-5 text-[0.6rem] uppercase tracking-[0.28em] text-slate-400 [writing-mode:vertical-rl]">
                            DESIGN + CODE
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["UI", "SOCIAL", "BRAND", "WEB"].map((pill) => (
                        <span
                          key={pill}
                          className="rounded-full border border-white/10 bg-slate-950/55 px-3 py-1 text-[0.65rem] uppercase tracking-[0.24em] text-slate-300"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {boardTiles.map((tile, index) => (
                      <motion.div
                        key={tile.title}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.3, delay: index * 0.04 }}
                        className="group rounded-[24px] border border-white/10 bg-slate-950/55 p-4 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400/20 hover:bg-slate-900/70"
                      >
                        <div className="mb-4 flex items-center justify-between gap-3">
                          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.05] text-sm text-slate-200">
                            {tile.symbol}
                          </span>
                          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(34,211,238,0.75)]" />
                        </div>
                        <div className={`mb-4 h-20 rounded-[18px] bg-gradient-to-br ${tile.accentClassName} p-3`}>
                          <div className="flex h-full flex-col gap-2">
                            <div className="flex gap-2">
                              <div className="h-4 flex-1 rounded-lg border border-white/10 bg-white/[0.1]" />
                              <div className="h-4 w-10 rounded-lg border border-white/10 bg-white/[0.06]" />
                            </div>
                            <div className="grid flex-1 grid-cols-3 gap-2">
                              <div className="rounded-xl border border-white/10 bg-white/[0.08]" />
                              <div className="rounded-xl border border-white/10 bg-white/[0.06]" />
                              <div className="rounded-xl border border-white/10 bg-white/[0.04]" />
                            </div>
                          </div>
                        </div>
                        <p className="font-display text-lg font-semibold text-white transition group-hover:text-cyan-100">
                          {tile.title}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                          {tile.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                </div>
              </motion.article>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
