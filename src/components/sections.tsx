"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Code2, Github, Instagram, LayoutGrid, Linkedin, Mail, MapPin, Megaphone, Play, ShoppingBag, Sparkles, TerminalSquare, Wrench } from "lucide-react";
import { CreativeProfileSection } from "@/components/home/creative-profile-section";
import { DesignPortfolioShowcase } from "@/components/home/design-showcase-section";
import { FeaturedWorkMarquee } from "@/components/home/featured-work-marquee";
import { siteSettings } from "@/lib/admin-data";
import {
  designWork,
  identityCards as defaultIdentityCards,
  navItems,
  process,
  projects as defaultProjects,
  services as defaultServices
} from "@/lib/data";
import type { EditableIdentityCard } from "@/lib/admin-data";

interface HeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  identityCards?: EditableIdentityCard[];
  showIdentityCards?: boolean;
}

interface HomeProjectCard {
  title: string;
  type: string;
  description: string;
  stack: string[];
  metric: string;
  featuredImageUrl?: string;
  liveUrl?: string;
}

interface HomeServiceCard {
  title: string;
  description: string;
  iconName?: string;
}

interface HomeDesignCard {
  title: string;
  subtitle?: string;
  category?: string;
  imageUrl?: string;
}

interface WorkSectionProps {
  items?: HomeProjectCard[];
}

interface ServicesSectionProps {
  title?: string;
  items?: HomeServiceCard[];
}

interface DesignSectionProps {
  items?: HomeDesignCard[];
}

interface ContactSectionProps {
  title?: string;
  text?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

const HERO_ROLE_CYCLE = [
  "Creative Software Engineer",
  "Developer",
  "Designer",
  "Digital Operator"
] as const;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
      <Sparkles className="h-4 w-4 text-sky-300" />
      {children}
    </div>
  );
}

function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mx-auto mb-12 max-w-3xl text-center"
    >
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{description}</p>
    </motion.div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-semibold text-ink transition group-hover:rotate-6">NP</span>
          <span className="hidden leading-tight sm:block">
            <span className="block font-display font-semibold text-white">Nadun Peiris</span>
            <span className="block text-xs text-slate-400">Creative Software Engineer</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href.startsWith("#") && !isHomePage ? `/${item.href}` : item.href}
              className="text-sm text-slate-300 transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href={isHomePage ? "#contact" : "/#contact"}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-medium text-ink transition hover:scale-105"
        >
          Let’s talk <ArrowRight className="h-4 w-4" />
        </Link>
      </nav>
    </header>
  );
}

function getIdentityVisual(title: string, index: number) {
  const normalized = title.toLowerCase();

  if (normalized.includes("developer")) {
    return defaultIdentityCards[0];
  }

  if (normalized.includes("designer")) {
    return defaultIdentityCards[1];
  }

  if (normalized.includes("operator")) {
    return defaultIdentityCards[2];
  }

  return defaultIdentityCards[index % defaultIdentityCards.length];
}

export function Hero({
  badge = "Hey there, I’m",
  title = "Nadun Peiris",
  subtitle = "I create modern websites, brand visuals, e-commerce content, and digital systems that help businesses look professional and work better online.",
  primaryCtaText = "View selected work",
  primaryCtaLink = "/work",
  secondaryCtaText = "Start a project",
  secondaryCtaLink = "/contact",
  identityCards = defaultIdentityCards.map((card, index) => ({
    id: `identity-${index}`,
    title: card.title,
    description: card.description,
    enabled: true
  })),
  showIdentityCards = true
}: HeroProps) {
  const [typedRole, setTypedRole] = useState("");
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);

  const identityCardFallbacks = [
    "I build modern, responsive, and scalable web experiences.",
    "I create brand visuals, UI layouts, and social media creatives.",
    "I support Shopify, WordPress, content updates, and digital campaigns."
  ];

  const enabledIdentityCards = identityCards.filter((card) => card.enabled).slice(0, 3);

  const visibleIdentityCards = (enabledIdentityCards.length
    ? enabledIdentityCards
    : [
        { id: "hero-developer", title: "Developer", description: identityCardFallbacks[0], enabled: true },
        { id: "hero-designer", title: "Designer", description: identityCardFallbacks[1], enabled: true },
        { id: "hero-operator", title: "Digital Operator", description: identityCardFallbacks[2], enabled: true }
      ]).map((card, index) => {
    const normalized = card.title.toLowerCase();
    const icon = normalized.includes("developer")
      ? Code2
      : normalized.includes("operator")
        ? Megaphone
        : getIdentityVisual(card.title, index).icon;

    const accentClassName = normalized.includes("developer")
      ? "from-sky-400/18 via-cyan-400/10 to-transparent"
      : normalized.includes("operator")
        ? "from-amber-300/16 via-orange-300/10 to-transparent"
        : "from-violet-400/18 via-fuchsia-400/10 to-transparent";

    return {
      id: card.id,
      title: card.title,
      description: card.description || identityCardFallbacks[index] || identityCardFallbacks[0],
      icon,
      accentClassName
    };
  });

  const heroName = title.trim().split(/\s+/).length <= 4 ? title : "Nadun Peiris";
  const heroIntro = badge.trim() || "Hey There!";
  const floatingCards = [
    { id: "solution-1", title: "THE BEST SOLUTION", subtitle: visibleIdentityCards[0]?.title ?? "Developer", className: "-left-2 top-10 md:left-0 md:top-16", rotate: -8, duration: 6.2 },
    { id: "solution-2", title: "THE BEST SOLUTION", subtitle: visibleIdentityCards[1]?.title ?? "Designer", className: "right-0 top-4 md:right-6 md:top-0", rotate: 8, duration: 6.8 },
    { id: "solution-3", title: "THE BEST SOLUTION", subtitle: visibleIdentityCards[2]?.title ?? "Digital Operator", className: "left-0 top-1/2 md:-left-10", rotate: -6, duration: 5.6 },
    { id: "solution-4", title: "THE BEST SOLUTION", subtitle: visibleIdentityCards[0]?.title ?? "Developer", className: "right-0 top-[58%] md:-right-6", rotate: 7, duration: 6.4 },
    { id: "solution-5", title: "THE BEST SOLUTION", subtitle: visibleIdentityCards[1]?.title ?? "Designer", className: "bottom-16 left-10 md:bottom-14 md:left-12", rotate: -5, duration: 7.1 },
    { id: "solution-6", title: "THE BEST SOLUTION", subtitle: visibleIdentityCards[2]?.title ?? "Digital Operator", className: "bottom-4 right-8 md:bottom-8 md:right-10", rotate: 6, duration: 6.6 }
  ];

  const socialLinks = [
    { label: "GitHub", href: siteSettings.github, icon: Github },
    { label: "LinkedIn", href: siteSettings.linkedIn, icon: Linkedin },
    { label: "Instagram", href: siteSettings.instagram, icon: Instagram }
  ].filter((item) => item.href && item.href !== "#");

  useEffect(() => {
    const currentRole = HERO_ROLE_CYCLE[activeRoleIndex];
    const isFullyTyped = typedRole === currentRole;
    const isEmpty = typedRole.length === 0;
    const delay = !isDeletingRole && isFullyTyped
      ? 1500
      : isDeletingRole && isEmpty
        ? 280
        : isDeletingRole
          ? 36
          : 62;

    const timer = window.setTimeout(() => {
      if (!isDeletingRole && !isFullyTyped) {
        setTypedRole(currentRole.slice(0, typedRole.length + 1));
        return;
      }

      if (!isDeletingRole && isFullyTyped) {
        setIsDeletingRole(true);
        return;
      }

      if (isDeletingRole && !isEmpty) {
        setTypedRole(currentRole.slice(0, typedRole.length - 1));
        return;
      }

      setIsDeletingRole(false);
      setActiveRoleIndex((currentIndex) => (currentIndex + 1) % HERO_ROLE_CYCLE.length);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [activeRoleIndex, isDeletingRole, typedRole]);

  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden px-5 pt-32 md:px-8">
      <div className="grid-bg absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#070A12]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(56,189,248,0.14),transparent_24%),radial-gradient(circle_at_82%_12%,rgba(139,92,246,0.16),transparent_30%),linear-gradient(180deg,rgba(7,10,18,0.08),rgba(7,10,18,0)_36%,rgba(7,10,18,0.12)_100%)]" />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-16rem] top-10 h-[34rem] w-[34rem] rounded-full border border-sky-300/8 bg-gradient-to-br from-sky-400/14 via-violet-500/10 to-transparent blur-3xl"
      />
      <motion.div
        aria-hidden
        animate={{ y: [0, -18, 0], opacity: [0.36, 0.58, 0.36] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[8%] top-36 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 pb-20 md:grid-cols-[0.92fr_1.08fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.75 }} className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.26em] text-sky-200/80">
            {heroIntro}
          </p>
          <h1 className="mt-5 font-display text-5xl font-bold tracking-tight text-white md:text-7xl">
            I&apos;m {heroName}
          </h1>
          <p className="mt-5 min-h-[2.5rem] text-2xl font-semibold text-slate-100 md:min-h-[3rem] md:text-[2rem]">
            {typedRole}
            <span className="ml-1 inline-block h-6 w-px animate-pulse bg-sky-300 align-middle md:h-8" />
          </p>
          <p className="mt-4 text-base font-medium text-sky-200 md:text-lg">
            Developer • Designer • Digital Operator
          </p>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300 md:text-xl">
            {subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href={primaryCtaLink}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-sky-300/30 bg-[linear-gradient(135deg,rgba(56,189,248,0.34),rgba(14,165,233,0.2))] px-7 py-4 font-medium text-cyan-50 shadow-[0_14px_32px_rgba(56,189,248,0.18)] transition hover:border-sky-200/40 hover:bg-[linear-gradient(135deg,rgba(56,189,248,0.42),rgba(14,165,233,0.28))]"
            >
              {primaryCtaText}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href={secondaryCtaLink}
              className="inline-flex items-center justify-center gap-3 rounded-full border border-white/14 bg-white/[0.03] px-6 py-4 font-medium text-white transition hover:border-cyan-300/28 hover:bg-white/[0.06]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 text-sky-200">
                <Play className="h-4 w-4 fill-current" />
              </span>
              {secondaryCtaText}
            </Link>
          </div>

          {socialLinks.length ? (
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
              {socialLinks.map((item) => (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer" className="transition hover:text-sky-200">
                  {item.label}
                </a>
              ))}
            </div>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="relative mx-auto flex min-h-[34rem] w-full max-w-[42rem] items-center justify-center md:min-h-[42rem]">
            <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.12),transparent_42%),radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_62%)]" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute h-[78%] w-[78%] rounded-full border border-dashed border-white/10"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute h-[88%] w-[88%] rounded-full border border-sky-300/10"
            />

            {showIdentityCards
              ? floatingCards.map((card, index) => (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: [0, index % 2 === 0 ? -12 : 12, 0] }}
                    transition={{
                      opacity: { duration: 0.5, delay: 0.12 + index * 0.08 },
                      y: { duration: card.duration, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className={`absolute z-20 hidden rounded-2xl border border-white/10 bg-[#0d1320]/88 px-4 py-3 shadow-[0_18px_40px_rgba(2,8,23,0.32)] backdrop-blur-xl md:block ${card.className}`}
                    style={{ transform: `rotate(${card.rotate}deg)` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/12 bg-gradient-to-br from-sky-400/18 to-violet-500/18 text-white">
                        <Sparkles className="h-4 w-4 text-sky-200" />
                      </div>
                      <div>
                        <p className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-slate-500">
                          {card.title}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              : null}

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-full max-w-[21rem] md:max-w-[24rem]"
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.34),rgba(14,165,233,0.12),transparent_74%)] blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.75rem] border border-cyan-300/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_28px_80px_rgba(2,8,23,0.46)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_36%)]" />
                <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0a101a]">
                  <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-5 py-4">
                    <span className="rounded-full border border-white/10 bg-[#0b1321]/80 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.26em] text-slate-300">
                      Portfolio
                    </span>
                    <span className="rounded-full border border-sky-300/18 bg-sky-300/10 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-sky-200">
                      Digital Operator
                    </span>
                  </div>

                  <div className="relative aspect-[4/5]">
                    {heroImageError ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_30%),linear-gradient(180deg,#111827,#0b1220)]">
                        <div className="grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-4xl font-semibold text-white">
                          NP
                        </div>
                      </div>
                    ) : (
                      <Image
                        src="/Adithya-profile.png"
                        alt="Nadun Peiris portrait"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 90vw, 40vw"
                        onError={() => setHeroImageError(true)}
                      />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,8,15,0.08),transparent_24%,rgba(4,8,15,0.16)_78%,rgba(4,8,15,0.42))]" />
                    <div className="absolute inset-x-5 bottom-5 rounded-[1.6rem] border border-white/10 bg-[#09111d]/78 px-5 py-4 backdrop-blur-xl">
                      <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400">
                        Creative Software Engineer
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold text-white">
                        {heroName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function WorkSection({
  items = defaultProjects
}: WorkSectionProps) {
  return <FeaturedWorkMarquee items={items} />;
}

export function DesignSection({
  items = designWork.map((item) => ({ title: item }))
}: DesignSectionProps) {
  return (
    <>
      <CreativeProfileSection />
      <DesignPortfolioShowcase items={items} />
    </>
  );
}

export function ServicesSection({
  title = "One person who understands the full digital journey.",
  items = defaultServices
}: ServicesSectionProps) {
  const iconByName = {
    "code-2": Code2,
    "layout-grid": LayoutGrid,
    "megaphone": Megaphone,
    "shopping-bag": ShoppingBag,
    "terminal-square": TerminalSquare,
    "wrench": Wrench
  } as const;

  const getServiceCategory = (service: HomeServiceCard) => {
    const normalized = `${service.title} ${service.description}`.toLowerCase();

    if (normalized.includes("social") || normalized.includes("content") || normalized.includes("brand") || normalized.includes("design")) {
      return "Design";
    }

    if (
      normalized.includes("shopify") ||
      normalized.includes("wordpress") ||
      normalized.includes("store") ||
      normalized.includes("commerce") ||
      normalized.includes("campaign") ||
      normalized.includes("promotion")
    ) {
      return "Marketing";
    }

    if (normalized.includes("maintenance") || normalized.includes("support")) {
      return "Development";
    }

    return "Development";
  };

  const getServiceIcon = (service: HomeServiceCard, index: number) => {
    if (service.iconName && service.iconName in iconByName) {
      return iconByName[service.iconName as keyof typeof iconByName];
    }

    return defaultServices[index % defaultServices.length]?.icon ?? TerminalSquare;
  };

  const tabs = ["Development", "Design", "Marketing"];
  const [activeTab, setActiveTab] = useState("Development");
  const visibleServices = items.filter((service) => getServiceCategory(service) === activeTab);

  const fallbackVisibleServices = items.slice(0, 3);
  const renderedServices = visibleServices.length ? visibleServices : fallbackVisibleServices;

  return (
    <section id="services" className="relative -mt-14 overflow-hidden px-5 pb-24 pt-10 md:-mt-20 md:px-8 md:pb-28 md:pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-[#080A0F]/20 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_62%,rgba(56,189,248,0.1),transparent_26%),radial-gradient(circle_at_82%_68%,rgba(139,92,246,0.1),transparent_24%),linear-gradient(180deg,rgba(8,10,15,0),rgba(8,10,15,0.08)_24%,rgba(8,10,15,0.12))]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Popular Services
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#c7c4bf] md:text-xl">
            {title}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mx-auto mt-12 flex max-w-4xl flex-col gap-4 sm:flex-row sm:justify-center"
        >
          {tabs.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveTab(category)}
              className={`min-w-[220px] rounded-full border px-8 py-5 text-xl font-medium transition md:min-w-[290px] ${
                    activeTab === category
                  ? "border-sky-300/25 bg-transparent text-sky-200"
                  : "border-transparent bg-white/[0.08] text-white hover:bg-white/[0.12]"
              }`}
                >
                  {category}
                </button>
          ))}
        </motion.div>

        <div className="mt-14 grid gap-6 xl:grid-cols-3">
          {renderedServices.map((service, index) => {
            const Icon = getServiceIcon(service, index);

            return (
              <motion.article
                key={`${activeTab}-${service.title}`}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="flex min-h-[30rem] flex-col rounded-[2rem] border border-white/10 bg-[#101522]/90 px-8 py-10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <div className="mx-auto grid h-36 w-36 place-items-center rounded-full bg-white/[0.08] text-sky-200">
                  <Icon className="h-14 w-14 stroke-[1.6]" />
                </div>

                <h3 className="mt-10 text-center font-display text-3xl font-semibold text-white">
                  {service.title}
                </h3>

                <p className="mt-6 text-center text-lg leading-9 text-[#cbc7c1]">
                  {service.description}
                </p>

                <div className="mt-auto pt-10 text-center">
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-4 text-xl font-medium text-white transition hover:text-[#ffe100]"
                  >
                    <span className="text-2xl leading-none">→</span>
                    Learn More
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section id="process" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Process"
          title="A clean workflow from idea to launch."
          description="Every project starts with understanding the goal, then moves through design, development, testing, and improvement."
        />
        <div className="grid gap-5 md:grid-cols-4">
          {process.map((item, index) => (
            <motion.div
              key={item.step}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
            >
              <span className="absolute -right-2 -top-6 font-display text-8xl font-bold text-white/[0.035]">{item.step}</span>
              <p className="font-display text-4xl font-bold text-sky-300">{item.step}</p>
              <h3 className="mt-8 font-display text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  const [imageError, setImageError] = useState(false);

  const stats = [
    { value: "3+", label: "Creative disciplines" },
    { value: "10+", label: "Web & design projects" },
    { value: "4+", label: "Platforms handled" },
    { value: "100%", label: "Brand-focused workflow" }
  ];

  const socialLinks = [
    { label: "GitHub", href: siteSettings.github, icon: Github },
    { label: "LinkedIn", href: siteSettings.linkedIn, icon: Linkedin },
    { label: "Instagram", href: siteSettings.instagram, icon: Instagram }
  ].filter((item) => item.href && item.href !== "#");

  return (
    <section id="about" className="relative -mt-10 overflow-hidden px-5 py-14 md:-mt-14 md:px-8 md:py-18">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#080A0F] via-[#080A0F]/16 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_40%,rgba(56,189,248,0.14),transparent_26%),radial-gradient(circle_at_32%_68%,rgba(14,165,233,0.05),transparent_20%)] [mask-image:linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.12)_14%,rgba(0,0,0,0.72)_24%,black_34%,black_100%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative order-1">
            <div className="relative mx-auto max-w-[29rem]">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.36),rgba(14,165,233,0.18),rgba(59,130,246,0.06),transparent_74%)] blur-3xl" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/18" />
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-[104%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-cyan-200/45 [transform:translate(-50%,-50%)_rotate(-18deg)] [mask-image:linear-gradient(135deg,transparent_8%,black_22%,black_74%,transparent_92%)]" />
              <div className="pointer-events-none absolute left-[57%] top-[56%] h-[86%] w-[84%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-violet-300/22 [transform:translate(-50%,-50%)_rotate(24deg)] [mask-image:linear-gradient(135deg,transparent_16%,black_30%,black_72%,transparent_88%)]" />

              <div className="relative mx-auto aspect-square w-full max-w-[24rem] overflow-hidden rounded-full border border-cyan-300/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_0_70px_rgba(56,189,248,0.12)]">
                {imageError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.2),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.18),transparent_28%),linear-gradient(180deg,#111827,#0b1220)]">
                    <div className="grid h-28 w-28 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-4xl font-semibold text-white">
                      NP
                    </div>
                  </div>
                ) : (
                  <Image
                    src="/Adithya-profile.png"
                    alt="Nadun Peiris portrait"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    onError={() => setImageError(true)}
                  />
                )}
                <div className="pointer-events-none absolute inset-0 rounded-full border border-white/8" />
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.06 }} className="relative order-2 max-w-2xl">
            <div className="pointer-events-none absolute -left-12 top-12 h-44 w-44 rounded-full bg-cyan-400/6 blur-3xl" />
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-400">
              About Me
            </p>
            <p className="mt-6 text-base font-medium text-slate-200">
              Hello, I&apos;m
            </p>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              Nadun Peiris
            </h2>
            <p className="mt-3 text-xl font-medium text-slate-100 md:text-2xl">
              And I&apos;m a <span className="text-sky-300">Creative Software Engineer</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-400 md:text-lg">
              I&apos;m a Software Engineering undergraduate from Sri Lanka, blending web development, graphic design, e-commerce support, and social media content to create polished digital experiences for modern brands.
            </p>

            {socialLinks.length ? (
              <div className="mt-7 flex flex-wrap gap-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center border border-cyan-300/18 bg-slate-950/35 text-sky-200 transition hover:-translate-y-0.5 hover:border-cyan-300/35 hover:text-white"
                      aria-label={item.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-7 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/work"
                className="inline-flex min-w-[158px] items-center justify-center gap-2 border border-sky-300/30 bg-[linear-gradient(135deg,rgba(56,189,248,0.34),rgba(14,165,233,0.22))] px-6 py-3.5 font-medium text-cyan-50 shadow-[0_12px_30px_rgba(56,189,248,0.18)] transition hover:border-sky-200/40 hover:bg-[linear-gradient(135deg,rgba(56,189,248,0.42),rgba(14,165,233,0.28))]"
              >
                View My Work
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-w-[158px] items-center justify-center gap-2 border border-white/14 bg-transparent px-6 py-3.5 font-medium text-white transition hover:border-cyan-300/24 hover:bg-white/[0.04]"
              >
                Contact Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {stats.map((item, index) => (
            <div
              key={item.label}
              className={`text-center md:px-6 ${index !== 0 ? "md:border-l md:border-white/10" : ""}`}
            >
              <p className="font-display text-3xl font-semibold text-white md:text-5xl">
                {item.value}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection({
  title = "Have a brand, website, or idea to build?",
  text = "Let’s create something that looks premium, works smoothly, and helps your digital presence stand out."
}: ContactSectionProps) {
  return (
    <section id="contact" className="px-5 py-24 md:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.045] to-sky-400/10 p-8 text-center shadow-glow md:p-14"
      >
        <SectionLabel>Contact</SectionLabel>
        <h2 className="font-display text-4xl font-semibold tracking-tight text-white md:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          {text}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="mailto:nadunthusharapeiris@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-ink transition hover:scale-105">
            <Mail className="h-5 w-5" /> Email me
          </a>
          <a href="https://github.com/Nadun-Peiris" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-medium text-white transition hover:bg-white/10">
            <Github className="h-5 w-5" /> GitHub
          </a>
        </div>
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-400">
          <MapPin className="h-4 w-4" /> Based in Sri Lanka — available for remote projects
        </div>
      </motion.div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
        <p>© {new Date().getFullYear()} Nadun Peiris. Built with Next.js.</p>
        <p>Code + Design + Digital</p>
      </div>
    </footer>
  );
}
