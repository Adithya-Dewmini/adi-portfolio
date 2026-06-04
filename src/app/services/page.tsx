import Link from "next/link";
import { ArrowRight, BadgeCheck, Sparkles } from "lucide-react";
import { Footer, Navbar } from "@/components/sections";
import { getServicesPagePublicData } from "@/lib/cms";
import { serviceAudiences, serviceWorkflow } from "@/lib/data";

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

export default async function ServicesPage() {
  const { pageContent, services } = await getServicesPagePublicData();

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

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Service Scope"
            title={pageContent.servicesGridTitle}
            description="The homepage keeps a preview. This page goes deeper into the kind of work I can handle for brands, founders, and growing online businesses."
          />

          <div className="grid gap-6 xl:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="glass rounded-[2rem] p-7 shadow-card transition hover:-translate-y-1 hover:bg-white/[0.08] md:p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-ink">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-500">0{index + 1}</p>
                      <h3 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">{service.title}</h3>
                      <p className="mt-4 max-w-2xl leading-7 text-slate-400">{service.description}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.points.map((point) => (
                      <div key={point} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 text-sm text-slate-300">
                        <span className="mr-3 inline-block h-2 w-2 rounded-full bg-sky-300" />
                        {point}
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="How I Work"
            title={pageContent.processSectionTitle}
            description="Every service is shaped around clarity first, then design decisions, technical execution, and long-term usefulness."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceWorkflow.map((item) => (
              <article
                key={item.step}
                className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6"
              >
                <span className="absolute -right-2 -top-6 font-display text-8xl font-bold text-white/[0.035]">{item.step}</span>
                <p className="font-display text-4xl font-bold text-sky-300">{item.step}</p>
                <h3 className="mt-8 font-display text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Who I Can Help"
            title={pageContent.audiencesSectionTitle}
            description="I can support people who need polished digital execution without hiring a large team for every part of the process."
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {serviceAudiences.map((audience) => (
              <article key={audience} className="glass rounded-[2rem] p-6">
                <div className="mb-6 grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                  <BadgeCheck className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-white">{audience}</h3>
                <p className="mt-3 leading-7 text-slate-400">
                  Strong fit for {audience.toLowerCase()} that need premium presentation, dependable execution, and consistent digital support.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.045] to-sky-400/10 p-8 text-center shadow-glow md:p-14">
            <SectionBadge>Ready to Collaborate</SectionBadge>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              {pageContent.finalCtaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {pageContent.finalCtaText}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-ink transition hover:scale-105"
              >
                Contact Me <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                View Projects <BadgeCheck className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
