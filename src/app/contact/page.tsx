import Link from "next/link";
import { ArrowRight, Mail, MapPin, MessageCircle, Sparkles } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { Footer, Navbar } from "@/components/sections";
import { getContactPagePublicData } from "@/lib/cms";

const briefingCards = [
  {
    title: "Project type",
    text: "Mention whether you need a website, dashboard, visual design support, social content, or e-commerce help."
  },
  {
    title: "Timeline",
    text: "Share when you want to start and whether the project has a launch deadline or phased schedule."
  },
  {
    title: "Budget range",
    text: "A rough budget range helps shape the right scope, priorities, and execution approach from the start."
  },
  {
    title: "Design direction",
    text: "If you already have references, brand assets, or a visual style in mind, include that in your message."
  }
] as const;

const availabilityTags = ["Web Development", "Graphic Design", "Social Media", "E-commerce"] as const;

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

export default async function ContactPage() {
  const { pageContent } = await getContactPagePublicData();
  const contactCards = [
    {
      title: "Email me",
      text: pageContent.emailDisplayText,
      href: `mailto:${pageContent.emailAddress}`,
      action: "Send Email",
      icon: Mail
    },
    ...(pageContent.showWhatsAppCard
      ? [
          {
            title: "Message on WhatsApp",
            text: pageContent.whatsappDisplayText,
            href: pageContent.whatsappLink,
            action: "Chat on WhatsApp",
            icon: MessageCircle
          }
        ]
      : []),
    {
      title: pageContent.locationTitle,
      text: pageContent.locationDescription,
      href: "#availability",
      action: "View Location",
      icon: MapPin
    }
  ] as const;

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
                href="#message"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-ink transition hover:scale-105"
              >
                Send a Message <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-medium text-white transition hover:bg-white/10"
              >
                View Services <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Get In Touch"
            title="Choose the channel that fits your project best."
            description="If you already know what you need, reach out directly. If not, send a message and I’ll help you define the right scope."
          />

          <div className="grid gap-5 lg:grid-cols-3">
            {contactCards.map((card) => {
              const Icon = card.icon;
              const isExternal = card.href.startsWith("http") || card.href.startsWith("mailto:");

              return (
                <article key={card.title} className="glass rounded-[2rem] p-7 shadow-card">
                  <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-white text-ink">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="mt-4 min-h-14 leading-7 text-slate-400">{card.text}</p>
                  {isExternal ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noreferrer" : undefined}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.1]"
                    >
                      {card.action} <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <Link
                      href={card.href}
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition hover:bg-white/[0.1]"
                    >
                      {card.action} <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="message" className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 xl:grid-cols-[1.08fr_0.92fr]">
          <div>
            <SectionIntro
              eyebrow={pageContent.contactFormHeading}
              title="Tell me what you want to build."
              description="Share the project context, the kind of support you need, and any ideas or references you already have."
            />
            {pageContent.showContactForm ? <ContactForm /> : null}
          </div>

          {pageContent.showMapCard ? <div id="availability" className="xl:pt-[7.25rem]">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-card md:p-8">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] opacity-60" />
              <div className="absolute left-[18%] top-[24%] h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
              <div className="absolute right-[12%] top-[18%] h-32 w-32 rounded-full bg-violet-500/15 blur-3xl" />

              <div className="relative min-h-[29rem] rounded-[2rem] border border-white/10 bg-ink/60 p-6">
                <div className="flex flex-wrap gap-3">
                  {availabilityTags.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="relative mt-16 flex h-[16rem] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,rgba(2,6,23,0.9),rgba(15,23,42,0.75))]">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:28px_28px] opacity-50" />
                  <div className="relative">
                    <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/20 blur-2xl" />
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-sky-300/40 bg-sky-400/15 shadow-[0_0_40px_rgba(56,189,248,0.35)]">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink">
                        <MapPin className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Availability</p>
                  <h3 className="mt-3 font-display text-3xl font-semibold text-white">{pageContent.mapCardTitle}</h3>
                  <p className="mt-3 text-lg text-slate-300">{pageContent.availabilityText}</p>
                  <p className="mt-3 leading-7 text-slate-400">
                    Open to independent projects, long-term support work, and collaborations with clients and creative teams.
                  </p>
                </div>
              </div>
            </div>
          </div> : null}
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionIntro
            eyebrow="Before You Contact Me"
            title="A few details make the first conversation much more useful."
            description="You do not need a perfect brief. Even a rough idea is enough, but these points help me give clearer guidance faster."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {briefingCards.map((card, index) => (
              <article key={card.title} className="glass rounded-[2rem] p-6">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">0{index + 1}</p>
                <h3 className="mt-5 font-display text-2xl font-semibold text-white">{card.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24 pt-10 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.1] via-white/[0.045] to-sky-400/10 p-8 text-center shadow-glow md:p-14">
            <SectionBadge>Ready to Start</SectionBadge>
            <h2 className="mt-6 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              {pageContent.finalCtaTitle}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              {pageContent.finalCtaText}
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="#message"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 font-medium text-ink transition hover:scale-105"
              >
                Contact Me <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-4 font-medium text-white transition hover:bg-white/10"
              >
                View Projects <Sparkles className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
