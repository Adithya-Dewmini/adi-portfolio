import { Eye, Pencil, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  deleteProjectAction,
  toggleProjectFeaturedAction,
  toggleProjectShowOnHomeAction,
  toggleProjectShowOnWorkPageAction
} from "@/app/admin/actions/project-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { getAdminProjectsData } from "@/lib/cms";

interface AdminContentProjectsPageProps {
  searchParams?: Promise<{
    q?: string;
    category?: string;
    status?: string;
  }>;
}

export default async function AdminContentProjectsPage({ searchParams }: Readonly<AdminContentProjectsPageProps>) {
  const params = (await searchParams) ?? {};
  const projects = await getAdminProjectsData();

  const query = (params.q ?? "").toLowerCase();
  const categoryFilter = params.category ?? "All";
  const statusFilter = params.status ?? "All";
  const categories = ["All", ...Array.from(new Set(projects.map((project) => project.category)))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = !query || [project.title, project.slug, project.category].some((value) => value.toLowerCase().includes(query));
    const matchesCategory = categoryFilter === "All" || project.category === categoryFilter;
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const columns: AdminTableColumn<(typeof filteredProjects)[number]>[] = [
    {
      header: "Project",
      render: (project) => (
        <div>
          <p className="font-medium text-[#F8FAFC]">{project.title}</p>
          <p className="mt-2 text-sm text-[#94A3B8]">{project.shortDescription}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#64748B]">{project.slug}</p>
        </div>
      )
    },
    {
      header: "Category",
      render: (project) => (
        <div>
          <p className="text-[#F8FAFC]">{project.category}</p>
          <p className="mt-2 text-sm text-[#94A3B8]">{project.techStack.join(" · ")}</p>
        </div>
      )
    },
    {
      header: "Status",
      render: (project) => (
        <div className="space-y-2">
          <AdminStatusBadge status={project.status} />
          <p className="text-xs text-[#94A3B8]">{project.featured ? "Featured" : "Standard"}</p>
        </div>
      )
    },
    {
      header: "Visibility",
      render: (project) => (
        <div className="space-y-2 text-xs text-[#94A3B8]">
          <p>{project.showOnHome ? "Shown on Home" : "Hidden from Home"}</p>
          <p>{project.showOnWorkPage ? "Shown on Work Page" : "Hidden from Work Page"}</p>
        </div>
      )
    },
    {
      header: "Updated",
      render: (project) => <span className="text-[#94A3B8]">{project.updatedAt}</span>
    },
    {
      header: "Actions",
      className: "w-[320px]",
      render: (project) => (
        <div className="flex flex-wrap gap-2">
          <Link href={`/admin/content/projects/${project.id}/edit`} className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <Link href="/work" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
            <Eye className="h-4 w-4" />
            Preview
          </Link>
          <form action={toggleProjectFeaturedAction.bind(null, project.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-amber-400/30 hover:text-amber-300">
              <Star className="h-4 w-4" />
              Featured
            </button>
          </form>
          <form action={toggleProjectShowOnHomeAction.bind(null, project.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
              Home
            </button>
          </form>
          <form action={toggleProjectShowOnWorkPageAction.bind(null, project.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
              Work
            </button>
          </form>
          <form action={deleteProjectAction.bind(null, project.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-rose-400/30 hover:text-rose-300">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </form>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Projects"
        description="Manage project content, publishing state, and where each project appears across the public portfolio."
        actions={<AdminButton href="/admin/content/projects/new"><Plus className="mr-2 h-4 w-4" />Add Project</AdminButton>}
      />

      <AdminSectionCard title="Filters" description="Search and filter projects by category or publishing status.">
        <form className="grid gap-4 xl:grid-cols-[1fr_220px_220px]">
          <input
            type="text"
            name="q"
            defaultValue={params.q ?? ""}
            placeholder="Search projects by title, slug, or category"
            className="rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none"
          />
          <select name="category" defaultValue={categoryFilter} className="rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select name="status" defaultValue={statusFilter} className="rounded-2xl border border-[#1E293B] bg-slate-950/40 px-4 py-3 text-sm text-[#F8FAFC] outline-none">
            {["All", "Published", "Draft"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <AdminButton type="submit" variant="secondary">Apply Filters</AdminButton>
        </form>
      </AdminSectionCard>

      <AdminTable columns={columns} data={filteredProjects} rowKey={(project) => project.id} emptyState="No projects match the current filters." />
    </div>
  );
}
