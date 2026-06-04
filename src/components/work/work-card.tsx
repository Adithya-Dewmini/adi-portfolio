import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Github, Globe2, Sparkles } from "lucide-react";

interface WorkCardProps {
  title: string;
  category: string;
  shortDescription: string;
  featuredImageUrl?: string;
  techStack: string[];
  slug?: string;
  result?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  previewClassName?: string;
}

export function WorkCard({
  title,
  category,
  shortDescription,
  featuredImageUrl,
  techStack,
  slug,
  result,
  liveUrl,
  githubUrl,
  featured = false,
  previewClassName = "from-sky-400/20 via-violet-400/10 to-transparent"
}: Readonly<WorkCardProps>) {
  const imageUrl = featuredImageUrl?.trim() ?? "";
  const hasImage = imageUrl.startsWith("http");
  const primaryHref = liveUrl || githubUrl || "/contact";
  const primaryLabel = liveUrl ? "Open project" : githubUrl ? "View code" : "View Case Study";

  return (
    <article className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/70 p-4 text-white shadow-2xl shadow-cyan-950/20 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-cyan-950/30">
      <div className="relative overflow-hidden rounded-[24px] border border-white/10">
        <div className="relative aspect-[16/10] bg-slate-950">
          {hasImage ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            />
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${previewClassName}`}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.24),transparent_28%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.22),transparent_32%)]" />
              <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                <span className="rounded-full border border-cyan-300/25 bg-slate-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-100 backdrop-blur-md">
                  {category}
                </span>
                {featured ? (
                  <span className="rounded-full border border-violet-300/25 bg-slate-950/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-100 backdrop-blur-md">
                    Featured
                  </span>
                ) : null}
              </div>
              <div className="absolute inset-x-6 bottom-6 grid grid-cols-4 gap-2 opacity-85">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={`${title}-${index}`} className="h-9 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm" />
                ))}
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />

          <Link
            href={primaryHref}
            target={liveUrl || githubUrl ? "_blank" : undefined}
            rel={liveUrl || githubUrl ? "noreferrer" : undefined}
            className="absolute bottom-4 right-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-slate-950 shadow-[0_18px_38px_rgba(14,165,233,0.32)] transition hover:scale-105 hover:bg-cyan-300"
            aria-label={primaryLabel}
          >
            <ArrowUpRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
            {category}
          </span>
          {featured ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-violet-300/20 bg-violet-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-200">
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </span>
          ) : null}
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-white md:text-[1.9rem]">
          {title}
        </h3>

        <div className="mt-5 h-px w-full bg-white/10" />

        <p className="mt-5 text-sm leading-7 text-slate-300 md:text-[15px]">
          {shortDescription}
        </p>

        {result ? (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <p className="text-sm font-medium text-slate-200">
            {result}
            </p>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap gap-2">
          {techStack.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href={primaryHref}
            target={liveUrl || githubUrl ? "_blank" : undefined}
            rel={liveUrl || githubUrl ? "noreferrer" : undefined}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-cyan-300"
          >
            {liveUrl ? <Globe2 className="h-4 w-4" /> : githubUrl ? <Github className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
            {primaryLabel}
          </Link>
          {slug ? <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{slug}</span> : null}
        </div>
      </div>
    </article>
  );
}
