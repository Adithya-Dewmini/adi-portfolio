"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, Code2, Github, GraduationCap, LayoutGrid, Mail, MapPin, Megaphone, MonitorCog, MousePointer2, ShoppingBag, Sparkles, TerminalSquare, Wrench } from "lucide-react";
import { CreativeProfileSection } from "@/components/home/creative-profile-section";
import { DesignPortfolioShowcase } from "@/components/home/design-showcase-section";
import { FeaturedWorkMarquee } from "@/components/home/featured-work-marquee";
import {
  designWork,
  highlights,
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
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-bold text-ink transition group-hover:rotate-6">NP</span>
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
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:scale-105"
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
  badge = "Available for web, design & digital projects",
  title = "I design, build & grow digital brands.",
  subtitle = "Software engineering undergraduate, full-stack web developer, graphic designer, freelancer, and social media creative — combining code, visuals, and digital strategy into premium online experiences.",
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
  const visibleIdentityCards = identityCards.filter((card) => card.enabled !== false);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pt-32 md:px-8">
      <div className="grid-bg absolute inset-0" />
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute right-[-16rem] top-24 h-[34rem] w-[34rem] rounded-full border border-white/10 bg-gradient-to-br from-sky-400/20 via-violet-500/10 to-transparent blur-2xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 pb-24 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ duration: 0.75 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-300" />
            </span>
            {badge}
          </div>
          <h1 className="font-display text-5xl font-bold tracking-tight text-white md:text-7xl lg:text-8xl">
            {title.includes("digital brands.") ? (
              <>
                {title.replace("digital brands.", "")}
                <span className="gradient-text">digital brands.</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            {subtitle}
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link href={primaryCtaLink} className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition hover:scale-105">
              {primaryCtaText} <MousePointer2 className="h-5 w-5" />
            </Link>
            <Link href={secondaryCtaLink} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
              {secondaryCtaText} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
            {highlights.map((item) => (
              <div key={item.label} className="glass rounded-3xl p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-sky-400/20 via-violet-500/20 to-transparent blur-2xl" />
          <div className="glass relative overflow-hidden rounded-[2.5rem] p-5 shadow-card">
            <div className="rounded-[2rem] border border-white/10 bg-ink/80 p-5">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-400">portfolio.tsx</span>
              </div>
              <div className="space-y-4 font-mono text-sm text-slate-300">
                <p><span className="text-violet-300">const</span> identity = &#123;</p>
                <p className="pl-5"><span className="text-sky-300">role</span>: &#34;Creative Developer&#34;,</p>
                <p className="pl-5"><span className="text-sky-300">skills</span>: [&#34;Code&#34;, &#34;Design&#34;, &#34;Social&#34;],</p>
                <p className="pl-5"><span className="text-sky-300">mission</span>: &#34;Build premium digital experiences&#34;,</p>
                <p>&#125;</p>
              </div>
              <div className="mt-8 grid gap-4">
                {showIdentityCards
                  ? visibleIdentityCards.map((card, index) => {
                      const visual = getIdentityVisual(card.title, index);
                      const Icon = visual.icon;
                  return (
                    <motion.div
                      key={card.id}
                      whileHover={{ x: 8, scale: 1.02 }}
                      className={`rounded-3xl border border-white/10 bg-gradient-to-br ${visual.accent} p-5`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">0{index + 1}</p>
                          <h3 className="font-display text-xl font-semibold text-white">{card.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-slate-300">{card.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                    })
                  : null}
              </div>
            </div>
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
                  className={`min-w-[220px] rounded-full border px-8 py-5 text-xl font-semibold transition md:min-w-[290px] ${
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
                    className="inline-flex items-center gap-4 text-xl font-semibold text-white transition hover:text-[#ffe100]"
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
  const aboutStats = [
    {
      title: "Software Engineering Undergraduate",
      text: "Technical foundation focused on modern web systems and product thinking.",
      icon: GraduationCap
    },
    {
      title: "Creative Designer & Freelancer",
      text: "Brand visuals, campaign assets, and premium digital presentation.",
      icon: BriefcaseBusiness
    },
    {
      title: "Web, E-commerce & Social Media",
      text: "One workflow across websites, commerce support, and content execution.",
      icon: MonitorCog
    }
  ];

  const aboutSkills = [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Neon",
    "Firebase",
    "Tailwind CSS",
    "WordPress",
    "Shopify",
    "Photoshop",
    "Illustrator",
    "Meta Ads",
    "Content Planning"
  ];

  return (
    <section id="about" className="relative -mt-8 px-5 py-16 md:-mt-10 md:px-8 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.12),transparent_24%),radial-gradient(circle_at_78%_24%,rgba(139,92,246,0.12),transparent_24%)]" />
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_90px_rgba(2,8,23,0.28)] backdrop-blur-2xl md:p-10 lg:p-12">
        <div className="pointer-events-none absolute left-[-4rem] top-10 h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-3rem] right-10 h-44 w-44 rounded-full bg-violet-500/12 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <SectionLabel>About Nadun</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl lg:text-[3.4rem]">
              I connect software, design, and digital brand execution.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 md:text-lg">
              I&apos;m a Software Engineering undergraduate and creative freelancer from Sri Lanka. I build modern web experiences, create brand visuals, and support digital platforms like Shopify, WordPress, and social media.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-medium text-ink transition hover:scale-[1.02]"
              >
                More About Me
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.08 }}>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {aboutStats.map((item) => {
                const Icon = item.icon;

                return (
                  <article
                    key={item.title}
                    className="rounded-[1.7rem] border border-white/10 bg-slate-950/35 p-5 backdrop-blur-xl"
                  >
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.text}
                    </p>
                  </article>
                );
              })}
            </div>
            <div className="mt-5 rounded-[1.8rem] border border-white/10 bg-slate-950/30 p-5 backdrop-blur-xl md:p-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-xl font-semibold text-white">
                  Tools I work with
                </h3>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-slate-400">
                  Daily Stack
                </span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {aboutSkills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
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
        <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
          {text}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <a href="mailto:nadunthusharapeiris@gmail.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition hover:scale-105">
            <Mail className="h-5 w-5" /> Email me
          </a>
          <a href="https://github.com/Nadun-Peiris" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10">
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
