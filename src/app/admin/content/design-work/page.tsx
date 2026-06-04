import { Eye, Pencil, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  deleteDesignWorkAction,
  toggleDesignWorkFeaturedAction,
  toggleDesignWorkShowOnHomeAction,
  toggleDesignWorkShowOnWorkPageAction
} from "@/app/admin/actions/design-work-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { getAdminDesignWorkData } from "@/lib/cms";

interface AdminContentDesignWorkPageProps {
  searchParams?: Promise<{
    q?: string;
    category?: string;
  }>;
}

export default async function AdminContentDesignWorkPage({ searchParams }: Readonly<AdminContentDesignWorkPageProps>) {
  const params = (await searchParams) ?? {};
  const items = await getAdminDesignWorkData();
  const query = (params.q ?? "").toLowerCase();
  const categoryFilter = params.category ?? "All";
  const categories = ["All", ...Array.from(new Set(items.map((item) => item.category)))];

  const filteredWorks = items.filter((item) => {
    const matchesSearch = !query || [item.title, item.slug, item.brandClient ?? ""].some((value) => value.toLowerCase().includes(query));
    const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Design Work"
        description="Manage design entries, client visuals, categories, and where each piece appears across the portfolio."
        actions={<AdminButton href="/admin/content/design-work/new"><Plus className="mr-2 h-4 w-4" />Add Design Work</AdminButton>}
      />

      <AdminSectionCard title="Filters" description="Search design work and filter by category.">
        <form className="grid gap-4 xl:grid-cols-[1fr_240px]">
          <input
            type="text"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search by title, slug, or client"
            className="rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none"
          />
          <select name="category" defaultValue={categoryFilter} className="rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <AdminButton type="submit" variant="secondary">Apply Filters</AdminButton>
        </form>
      </AdminSectionCard>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredWorks.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A]">
            <div className="relative h-44 border-b border-[#1E293B] bg-gradient-to-br from-sky-400/20 via-violet-500/15 to-slate-950">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%)]" />
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                <div>
                  <span className="rounded-full border border-white/10 bg-slate-950/50 px-3 py-1 text-xs font-medium text-[#94A3B8]">
                    {item.category}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-[#F8FAFC]">{item.title}</h3>
                </div>
                <AdminStatusBadge status={item.status} />
              </div>
            </div>

            <div className="p-5">
              <p className="text-sm text-[#94A3B8]">{item.brandClient}</p>
              <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{item.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {item.toolsUsed.map((tool) => (
                  <span key={tool} className="rounded-full border border-[#1E293B] px-3 py-1 text-xs text-[#F8FAFC]">
                    {tool}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/admin/content/design-work/${item.id}/edit`} className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
                  <Pencil className="h-4 w-4" />
                  Edit
                </Link>
                <Link href="/work" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
                  <Eye className="h-4 w-4" />
                  Preview
                </Link>
                <form action={toggleDesignWorkFeaturedAction.bind(null, item.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-amber-400/30 hover:text-amber-300">
                    <Star className="h-4 w-4" />
                    Featured
                  </button>
                </form>
                <form action={toggleDesignWorkShowOnHomeAction.bind(null, item.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
                    Home
                  </button>
                </form>
                <form action={toggleDesignWorkShowOnWorkPageAction.bind(null, item.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
                    Work
                  </button>
                </form>
                <form action={deleteDesignWorkAction.bind(null, item.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-rose-400/30 hover:text-rose-300">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
