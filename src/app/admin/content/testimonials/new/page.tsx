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

const booleanOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" }
];

export default function AdminNewTestimonialPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Add Testimonial"
        description="Create a new testimonial entry with client role, company, quote, and featured state."
        actions={
          <>
            <AdminButton href="/admin/content/testimonials" variant="secondary">
              Back to testimonials
            </AdminButton>
            <AdminButton type="submit">Save Testimonial</AdminButton>
          </>
        }
      />

      <form className="space-y-6">
        <AdminSectionCard title="Client feedback" description="Core testimonial details used on public trust sections later.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput label="Client name" placeholder="Ashen Fernando" />
            <AdminInput label="Role" placeholder="Founder" />
            <AdminInput label="Company" placeholder="Monsoon Lanka Tours" />
            <AdminSelect label="Status" options={statusOptions} defaultValue="Draft" />
            <AdminSelect label="Featured" options={booleanOptions} defaultValue="true" />
            <div className="md:col-span-2">
              <AdminTextarea label="Quote" rows={5} placeholder="Write the testimonial quote here." />
            </div>
          </div>
        </AdminSectionCard>
      </form>
    </div>
  );
}
