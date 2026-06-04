"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Github, Mail, MapPin, MousePointer2, Sparkles } from "lucide-react";
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
  services as defaultServices,
  skills
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

interface AboutSectionProps {
  text?: string;
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
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-ink transition group-hover:rotate-6">NP</span>
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
  return (
    <section id="services" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Services"
          title={title}
          description="From visuals and content to development and maintenance, I can support brands across the complete online workflow."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((service, index) => {
            const Icon = defaultServices[index % defaultServices.length]?.icon ?? defaultServices[0].icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="glass rounded-[2rem] p-7"
              >
                <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-white text-ink">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{service.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{service.description}</p>
              </motion.div>
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

export function AboutSection({
  text = "I’m a software engineering undergraduate from Sri Lanka with hands-on experience in full-stack development, graphic design, e-commerce support, and social media handling. I enjoy building digital products that do not only work technically, but also look premium and communicate clearly."
}: AboutSectionProps) {
  return (
    <section id="about" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 md:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionLabel>About Nadun</SectionLabel>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">
              I sit between engineering, design, and digital business.
            </h2>
          </motion.div>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
            <p className="text-lg leading-8 text-slate-300">
              {text}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                  {skill}
                </span>
              ))}
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
