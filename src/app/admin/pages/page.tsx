import { Eye, Pencil } from "lucide-react";
import Link from "next/link";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { getAdminPageSummaries } from "@/lib/cms";

export default async function AdminPagesPage() {
  const pages = await getAdminPageSummaries();

  const columns: AdminTableColumn<(typeof pages)[number]>[] = [
    {
      header: "Page",
      render: (page) => (
        <div>
          <p className="font-medium text-[#F8FAFC]">{page.title}</p>
          <p className="mt-2 text-sm text-[#94A3B8]">{page.slug}</p>
        </div>
      )
    },
    {
      header: "Updated",
      render: (page) => <span className="text-[#94A3B8]">{page.updatedAt}</span>
    },
    {
      header: "Status",
      render: (page) => <AdminStatusBadge status={page.status} />
    },
    {
      header: "Actions",
      className: "w-[240px]",
      render: (page) => (
        <div className="flex flex-wrap gap-2">
          <Link href={page.editorHref} className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <Link href={page.previewHref} className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-sky-400/30 hover:text-white">
            <Eye className="h-4 w-4" />
            Preview
          </Link>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Page Manager"
        title="Public Pages"
        description="Manage the editable content blocks behind the home, work, services, and contact pages."
        actions={<AdminButton href="/admin/dashboard" variant="secondary">Back to dashboard</AdminButton>}
      />
      <AdminTable columns={columns} data={pages} rowKey={(page) => page.id} />
    </div>
  );
}
