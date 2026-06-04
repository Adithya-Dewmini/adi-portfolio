import { Plus, Trash2 } from "lucide-react";
import { adminTestimonials, type AdminTestimonial } from "@/lib/admin-data";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";

const columns: AdminTableColumn<AdminTestimonial>[] = [
  {
    header: "Testimonial",
    render: (item) => (
      <div>
        <p className="font-medium text-[#F8FAFC]">{item.name}</p>
        <p className="mt-2 text-sm text-[#94A3B8]">{item.role} · {item.company}</p>
        <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{item.quote}</p>
      </div>
    )
  },
  {
    header: "Status",
    render: (item) => (
      <div className="space-y-2">
        <AdminStatusBadge status={item.status} />
        <p className="text-xs text-[#94A3B8]">{item.featured ? "Featured" : "Standard"}</p>
      </div>
    )
  },
  {
    header: "Updated",
    render: (item) => <span className="text-[#94A3B8]">{item.updatedAt}</span>
  },
  {
    header: "Actions",
    className: "w-[180px]",
    render: () => (
      <div className="flex flex-wrap gap-2">
        <AdminButton variant="secondary">Edit</AdminButton>
        <button type="button" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-rose-400/30 hover:text-rose-300">
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    )
  }
];

export default function AdminContentTestimonialsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Testimonials"
        description="Manage client feedback, quote visibility, and which testimonials should be featured across the site."
        actions={<AdminButton href="/admin/content/testimonials/new"><Plus className="mr-2 h-4 w-4" />Add Testimonial</AdminButton>}
      />
      <AdminTable columns={columns} data={adminTestimonials} rowKey={(item) => item.id} />
    </div>
  );
}
