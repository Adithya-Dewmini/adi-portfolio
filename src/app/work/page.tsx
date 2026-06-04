import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Footer, Navbar } from "@/components/sections";
import { VisualShowcase } from "@/components/work/visual-showcase";
import { WorkFilter } from "@/components/work/work-filter";
import { getStaticWorkTools, getWorkPagePublicData } from "@/lib/cms";
import { workCaseStudyPoints } from "@/lib/data";

function SectionBadge({ children }: Readonly<{ children: string }>) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
      <Sparkles className="h-4 w-4 text-sky-300" />
      {children}
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description
}: Readonly<{
  eyebrow: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <SectionBadge>{eyebrow}</SectionBadge>
      <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-slate-400 md:text-lg">{description}</p>
    </div>
  );
}

export default async function WorkPage() {
  const { pageContent, projects, showcase, tabs } = await getWorkPagePublicData();
  const workTools = getStaticWorkTools();

  return (
    <main>
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-24 pt-32 md:px-8">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(139,92,246,0.18),transparent_26%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <SectionBadge>{pageContent.heroBadge}</SectionBadge>
            <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              {pageContent.heroTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              {pageContent.heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={pageContent.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition hover:scale-105"
              >
                {pageContent.primaryCtaText} <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={pageContent.secondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                {pageContent.secondaryCtaText} <BadgeCheck className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Work Categories"
            title={pageContent.featuredWorkSectionTitle}
            description="Use the filters to move through the different kinds of projects I handle across development, design, social content, and commerce support."
          />
          <WorkFilter tabs={tabs as readonly ("All" | "Web Development" | "UI Design" | "Graphic Design" | "E-commerce" | "Social Media" | "Full-Stack Systems")[]} items={projects} />
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="How I Present My Work"
            title={pageContent.caseStudySectionTitle}
            description="I focus on why the project mattered, what was built or designed, how the work was executed, and what value the final result created."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {workCaseStudyPoints.map((point, index) => (
              <article key={point.title} className="glass rounded-[2rem] p-6">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">0{index + 1}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{point.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{point.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <VisualShowcase title={pageContent.designShowcaseSectionTitle} items={showcase} />

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Tools Behind The Work"
            title={pageContent.toolsSectionTitle}
            description="The stack changes by project, but these are the tools I regularly use across product builds, e-commerce operations, and creative brand work."
          />

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {workTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <article key={tool.name} className="glass rounded-[1.75rem] p-5 transition hover:bg-white/[0.08]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-ink">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{tool.name}</h3>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.045] to-sky-400/10 p-8 text-center shadow-glow md:p-14">
            <SectionBadge>Built End To End</SectionBadge>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              {pageContent.finalCtaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {pageContent.finalCtaText}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition hover:scale-105"
              >
                Start a Project <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Contact Me <BadgeCheck className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
