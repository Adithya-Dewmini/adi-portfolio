import { saveDesignWorkAction } from "@/app/admin/actions/design-work-actions";
import { AdminImageField } from "@/components/admin/admin-image-field";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminSelect } from "@/components/admin/admin-select";
import { AdminTextarea } from "@/components/admin/admin-textarea";
const categoryOptions = [
  { label: "Graphic Design", value: "Graphic Design" },
  { label: "Social Media", value: "Social Media" },
  { label: "Branding", value: "Branding" },
  { label: "UI Design", value: "UI Design" }
];

const statusOptions = [
  { label: "Draft", value: "Draft" },
  { label: "Published", value: "Published" }
];

const booleanOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" }
];

interface DesignWorkFormScreenProps {
  item: {
    id: string;
    title: string;
    slug: string;
    category: string;
    brandClient: string | null;
    description: string;
    imageUrl: string | null;
    toolsUsed: string[];
    status: "Published" | "Draft";
    featured: boolean;
    showOnHome: boolean;
    showOnWorkPage: boolean;
  } | null;
}

export function DesignWorkFormScreen({ item }: Readonly<DesignWorkFormScreenProps>) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title={item ? "Edit Design Work" : "Add Design Work"}
        description="Create or update a design work item with client details, image references, and page visibility."
        actions={<AdminButton href="/admin/content/design-work" variant="secondary">Back to design work</AdminButton>}
      />

      <form action={saveDesignWorkAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={item?.id ?? ""} />

        <AdminSectionCard title="Design details" description="Core visual work information for the CMS and public portfolio.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput label="Title" name="title" defaultValue={item?.title ?? ""} placeholder="Creative Brand Visuals" />
            <AdminInput label="Slug" name="slug" defaultValue={item?.slug ?? ""} placeholder="creative-brand-visuals" />
            <AdminSelect label="Category" name="category" options={categoryOptions} defaultValue={item?.category ?? "Graphic Design"} />
            <AdminInput label="Brand/client name" name="brandClient" defaultValue={item?.brandClient ?? ""} placeholder="La Rocher Ceylon" />
            <div className="md:col-span-2">
              <AdminTextarea label="Description" name="description" rows={5} defaultValue={item?.description ?? ""} placeholder="Describe the design work." />
            </div>
            <div className="md:col-span-2">
              <AdminImageField label="Image URL" name="imageUrl" defaultValue={item?.imageUrl ?? ""} usedIn="Design Work" />
            </div>
            <AdminInput label="Tools used" name="toolsUsed" defaultValue={item?.toolsUsed.join(", ") ?? ""} placeholder="Photoshop, Illustrator, Canva" />
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Publishing" description="Status, featured flag, and placement settings for this item.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminSelect label="Status" name="status" options={statusOptions} defaultValue={item?.status ?? "Draft"} />
            <AdminSelect label="Featured" name="featured" options={booleanOptions} defaultValue={item?.featured ? "true" : "false"} />
            <AdminSelect label="Show on home" name="showOnHome" options={booleanOptions} defaultValue={item?.showOnHome ? "true" : "false"} />
            <AdminSelect label="Show on work page" name="showOnWorkPage" options={booleanOptions} defaultValue={item?.showOnWorkPage ? "true" : "false"} />
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">{item ? "Update Design Work" : "Save Design Work"}</AdminButton>
      </form>
    </div>
  );
}
