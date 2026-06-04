import Link from "next/link";
import { BriefcaseBusiness, FileText, FolderKanban, ImageIcon, Mail, PenSquare, Plus, Settings2 } from "lucide-react";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminStatCard } from "@/components/admin/admin-stat-card";
import {
  adminBlogPosts,
  recentActivity
} from "@/lib/admin-data";
import {
  getAdminDesignWorkData,
  getAdminMediaItemsData,
  getAdminMessagesData,
  getAdminPageSummaries,
  getAdminProjectsData,
  getAdminServicesData
} from "@/lib/cms";

const quickActions = [
  { label: "Manage Pages", href: "/admin/pages", icon: FileText },
  { label: "Add Project", href: "/admin/content/projects/new", icon: Plus },
  { label: "Add Design Work", href: "/admin/content/design-work/new", icon: ImageIcon },
  { label: "Review Messages", href: "/admin/messages", icon: Mail },
  { label: "Edit Site Settings", href: "/admin/settings", icon: Settings2 }
];

export default async function AdminDashboardPage() {
  const [adminProjects, adminDesignWorks, adminServices, contactMessages, adminPages, adminMediaItems] = await Promise.all([
    getAdminProjectsData(),
    getAdminDesignWorkData(),
    getAdminServicesData(),
    getAdminMessagesData(),
    getAdminPageSummaries(),
    getAdminMediaItemsData()
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Dashboard"
        title="Portfolio CMS overview"
        description="Manage the public website, featured work, messages, and global settings from one WordPress-style content panel."
        actions={
          <>
            <AdminButton href="/admin/pages" variant="secondary">
              Edit public pages
            </AdminButton>
            <AdminButton href="/admin/messages">Open inbox</AdminButton>
          </>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard title="Total Projects" value={adminProjects.length} detail="Portfolio development entries" icon={FolderKanban} />
        <AdminStatCard title="Total Design Works" value={adminDesignWorks.length} detail="Creative visuals and campaigns" icon={ImageIcon} accent="violet" />
        <AdminStatCard title="Total Services" value={adminServices.length} detail="Current offers and packages" icon={BriefcaseBusiness} />
        <AdminStatCard title="Contact Messages" value={contactMessages.length} detail="Inbox items from the portfolio form" icon={Mail} accent="violet" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminSectionCard
          title="Latest content changes"
          description="Recent activity across page editing, portfolio content, and ongoing maintenance."
          actions={
            <span className="rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1 text-xs font-medium text-[#38BDF8]">
              {recentActivity.length} items
            </span>
          }
        >
          <div className="space-y-4">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-3xl border border-[#1E293B] bg-slate-950/30 p-4">
                <div className="mt-1 h-3 w-3 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#8B5CF6]" />
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium text-[#F8FAFC]">{item.title}</p>
                    <span className="text-xs uppercase tracking-[0.2em] text-[#64748B]">{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[#94A3B8]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <div className="space-y-6">
          <AdminSectionCard
            title="Quick actions"
            description="Jump into the most common publishing and maintenance tasks."
          >
            <div className="grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon;

                return (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center justify-between rounded-3xl border border-[#1E293B] bg-slate-950/40 px-4 py-4 text-sm font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:bg-sky-400/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-[#38BDF8]">
                        <Icon className="h-5 w-5" />
                      </span>
                      {action.label}
                    </span>
                    <Plus className="h-4 w-4 text-[#64748B]" />
                  </Link>
                );
              })}

              <Link
                href="/admin/content/blog-posts/new"
                className="flex items-center justify-between rounded-3xl border border-dashed border-[#1E293B] bg-slate-950/30 px-4 py-4 text-left text-sm font-medium text-[#94A3B8] transition hover:border-violet-400/30 hover:text-[#F8FAFC]"
              >
                <span className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-900 text-[#8B5CF6]">
                    <PenSquare className="h-5 w-5" />
                  </span>
                  Add Blog Post
                </span>
                <span className="rounded-full border border-[#1E293B] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[#64748B]">
                  Mock
                </span>
              </Link>
            </div>
          </AdminSectionCard>

          <AdminSectionCard
            title="Latest messages"
            description="Recent inquiries coming in from the public contact page."
            actions={<AdminButton href="/admin/messages" variant="secondary">Open all</AdminButton>}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#94A3B8]">Contact Inbox</p>
              </div>
              <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300">
                {contactMessages.filter((item) => item.status === "New").length} new
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {contactMessages.slice(0, 3).map((message) => (
                <div key={message.id} className="rounded-3xl border border-[#1E293B] bg-slate-950/30 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-medium text-[#F8FAFC]">{message.subject}</p>
                    <AdminStatusBadge status={message.status} />
                  </div>
                  <p className="mt-2 text-sm text-[#94A3B8]">
                    {message.name} · {message.email}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{message.preview}</p>
                </div>
              ))}
            </div>
          </AdminSectionCard>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <AdminSectionCard
          title="Managed public pages"
          description="These routes are already wired into the portfolio and can now be edited from the CMS."
          actions={<AdminButton href="/admin/pages" variant="secondary">Page manager</AdminButton>}
        >
          <div className="grid gap-3">
            {adminPages.map((page) => (
              <div key={page.id} className="flex flex-col gap-3 rounded-3xl border border-[#1E293B] bg-slate-950/30 p-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-[#F8FAFC]">{page.title}</p>
                  <p className="mt-1 text-sm text-[#94A3B8]">
                    {page.slug} · Updated {page.updatedAt}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <AdminStatusBadge status={page.status} />
                  <AdminButton href={page.editorHref} variant="secondary">
                    Edit
                  </AdminButton>
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Library snapshot" description="Quick visibility into supporting content types used by the public site.">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { label: "Pages", value: adminPages.length, href: "/admin/pages" },
              { label: "Blog posts", value: adminBlogPosts.length, href: "/admin/content/blog-posts" },
              { label: "Media items", value: adminMediaItems.length, href: "/admin/media" },
              { label: "Unread messages", value: contactMessages.filter((item) => item.status === "New").length, href: "/admin/messages" }
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-3xl border border-[#1E293B] bg-slate-950/30 p-4 transition hover:border-sky-400/30 hover:bg-sky-400/5"
              >
                <p className="text-sm font-medium text-[#94A3B8]">{item.label}</p>
                <p className="mt-3 text-3xl font-semibold text-[#F8FAFC]">{item.value}</p>
              </Link>
            ))}
          </div>
        </AdminSectionCard>
      </section>
    </div>
  );
}
