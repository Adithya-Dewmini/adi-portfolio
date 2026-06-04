"use client";

import { useMemo, useState } from "react";
import type { WorkProject } from "@/lib/data";
import { WorkCard } from "@/components/work/work-card";

type WorkFilterTab =
  | "All"
  | "Web Development"
  | "UI Design"
  | "Graphic Design"
  | "E-commerce"
  | "Social Media"
  | "Full-Stack Systems";

interface WorkFilterProps {
  tabs: readonly WorkFilterTab[];
  items: WorkProject[];
}

export function WorkFilter({ tabs, items }: Readonly<WorkFilterProps>) {
  const [activeTab, setActiveTab] = useState<WorkFilterTab>("All");

  const filteredItems = useMemo(() => {
    if (activeTab === "All") {
      return items;
    }

    return items.filter((item) => item.category === activeTab);
  }, [activeTab, items]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap justify-center gap-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full border px-4 py-3 text-sm font-medium transition ${
              activeTab === tab
                ? "border-sky-400/30 bg-sky-400/10 text-sky-300"
                : "border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/[0.08] hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
            <WorkCard
              key={`${item.slug ?? item.title}-${item.category}`}
              title={item.title}
              category={item.category}
              shortDescription={item.description}
              featuredImageUrl={item.featuredImageUrl}
              techStack={item.tags}
              slug={item.slug}
              result={item.result}
              liveUrl={item.liveUrl}
              githubUrl={item.githubUrl}
              featured={item.featured}
              previewClassName={item.previewClassName}
            />
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 text-center">
          <p className="font-display text-2xl font-semibold text-white">No work added in this filter yet.</p>
          <p className="mt-3 leading-7 text-slate-400">
            The current selected work set focuses on live development, graphic design, social content, and e-commerce support case studies.
          </p>
        </div>
      )}
    </div>
  );
}
