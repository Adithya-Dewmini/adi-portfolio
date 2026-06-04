import { Plus, Trash2 } from "lucide-react";
import { adminBlogPosts, type AdminBlogPost } from "@/lib/admin-data";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";

const columns: AdminTableColumn<AdminBlogPost>[] = [
  {
    header: "Post",
    render: (post) => (
      <div>
        <p className="font-medium text-[#F8FAFC]">{post.title}</p>
        <p className="mt-2 text-sm text-[#94A3B8]">{post.slug}</p>
        <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{post.excerpt}</p>
      </div>
    )
  },
  {
    header: "Category",
    render: (post) => <span className="text-[#F8FAFC]">{post.category}</span>
  },
  {
    header: "Status",
    render: (post) => <AdminStatusBadge status={post.status} />
  },
  {
    header: "Updated",
    render: (post) => <span className="text-[#94A3B8]">{post.updatedAt}</span>
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

export default function AdminContentBlogPostsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Blog Posts"
        description="Prepare future blog content, organize categories, and keep post drafts in one place before the blog system is connected."
        actions={<AdminButton href="/admin/content/blog-posts/new"><Plus className="mr-2 h-4 w-4" />Add Blog Post</AdminButton>}
      />
      <AdminTable columns={columns} data={adminBlogPosts} rowKey={(post) => post.id} />
    </div>
  );
}
