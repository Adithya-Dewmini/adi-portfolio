import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";

interface VisualShowcaseItem {
  title: string;
  subtitle: string;
  category?: string;
  imageUrl?: string;
  size?: "tall" | "medium" | "compact";
  accentClassName?: string;
}

interface VisualShowcaseProps {
  title: string;
  items: VisualShowcaseItem[];
}

function getSafeImageUrl(value?: string) {
  const imageUrl = value?.trim() ?? "";
  return imageUrl.startsWith("http") ? imageUrl : "";
}

function getLayoutClassName(index: number) {
  const classes = [
    "lg:col-span-7 lg:row-span-2 min-h-[30rem]",
    "lg:col-span-5 min-h-[20rem]",
    "lg:col-span-5 min-h-[20rem]",
    "lg:col-span-4 min-h-[18rem]",
    "lg:col-span-4 min-h-[18rem]",
    "lg:col-span-4 min-h-[18rem]"
  ];

  return classes[index] ?? "lg:col-span-4 min-h-[18rem]";
}

function getFallbackAccent(index: number) {
  const accents = [
    "from-cyan-400/24 via-sky-400/12 to-slate-950",
    "from-violet-400/24 via-fuchsia-400/10 to-slate-950",
    "from-cyan-300/22 via-indigo-400/10 to-slate-950",
    "from-amber-300/22 via-orange-300/10 to-slate-950",
    "from-emerald-400/18 via-cyan-400/10 to-slate-950",
    "from-rose-400/20 via-fuchsia-400/10 to-slate-950"
  ];

  return accents[index % accents.length];
}

export function VisualShowcase({ title, items }: Readonly<VisualShowcaseProps>) {
  const visibleItems = items.slice(0, 6);

  return (
    <section id="design-work" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
            <Sparkles className="h-4 w-4 text-sky-300" />
            Selected Visual Work
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white md:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-400 md:text-lg">
            A curated selection of social media creatives, product campaigns, web visuals, and interface-focused design work.
          </p>
          <Link
            href="/work#design-work"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/[0.08] hover:text-cyan-100"
          >
            View All Design Work
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {visibleItems.map((item, index) => {
            const safeUrl = getSafeImageUrl(item.imageUrl);
            const accentClassName = item.accentClassName ?? getFallbackAccent(index);

            return (
              <article
                key={`${item.title}-${index}`}
                className={`group relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_80px_rgba(2,8,23,0.4)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-400/25 ${getLayoutClassName(index)}`}
              >
                <div className="absolute inset-0">
                  {safeUrl ? (
                    <Image
                      src={safeUrl}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${accentClassName}`}>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_26%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.14),transparent_30%)]" />
                      <div className="absolute inset-x-6 bottom-6 grid grid-cols-4 gap-2 opacity-80">
                        {Array.from({ length: 8 }).map((_, blockIndex) => (
                          <div key={`${item.title}-${blockIndex}`} className="h-10 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm" />
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                </div>

                <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex rounded-full border border-white/10 bg-slate-950/65 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-slate-300 backdrop-blur-md">
                      {item.category ?? title}
                    </span>
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition group-hover:scale-105">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>

                  <div className="mt-24 md:mt-32">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white md:text-[2rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[36rem] text-sm leading-7 text-slate-300 md:text-[15px]">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
