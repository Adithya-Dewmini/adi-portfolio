import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminSelect } from "@/components/admin/admin-select";
import { AdminTextarea } from "@/components/admin/admin-textarea";

const statusOptions = [
  { label: "Draft", value: "Draft" },
  { label: "Published", value: "Published" }
];

const categoryOptions = [
  { label: "Development", value: "Development" },
  { label: "Design", value: "Design" },
  { label: "Freelancing", value: "Freelancing" },
  { label: "E-commerce", value: "E-commerce" }
];

export default function AdminNewBlogPostPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Add Blog Post"
        description="Prepare a new blog post draft with category, excerpt, and publishing status."
        actions={
          <>
            <AdminButton href="/admin/content/blog-posts" variant="secondary">
              Back to blog posts
            </AdminButton>
            <AdminButton type="submit">Save Post</AdminButton>
          </>
        }
      />

      <form className="space-y-6">
        <AdminSectionCard title="Post details" description="Basic metadata and summary fields for future blog publishing.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput label="Title" placeholder="How I approach premium portfolio builds" />
            <AdminInput label="Slug" placeholder="how-i-approach-premium-portfolio-builds" />
            <AdminSelect label="Category" options={categoryOptions} defaultValue="Development" />
            <AdminSelect label="Status" options={statusOptions} defaultValue="Draft" />
            <div className="md:col-span-2">
              <AdminTextarea label="Excerpt" rows={4} placeholder="Short summary for listing cards and previews." />
            </div>
          </div>
        </AdminSectionCard>
      </form>
    </div>
  );
}
