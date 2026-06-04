import { saveServiceAction } from "@/app/admin/actions/service-actions";
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

interface ServiceFormScreenProps {
  service: {
    id: string;
    title: string;
    slug: string;
    iconName: string | null;
    shortDescription: string;
    fullDescription: string | null;
    bulletPoints: string[];
    status: "Published" | "Draft";
    featured: boolean;
    showOnHome: boolean;
    showOnServicesPage: boolean;
  } | null;
}

export function ServiceFormScreen({ service }: Readonly<ServiceFormScreenProps>) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title={service ? "Edit Service" : "Add Service"}
        description="Create or update a service card with detailed content, icon naming, and page placement controls."
        actions={<AdminButton href="/admin/content/services" variant="secondary">Back to services</AdminButton>}
      />

      <form action={saveServiceAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={service?.id ?? ""} />

        <AdminSectionCard title="Service details" description="Core content fields for the service library and public services page.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput label="Title" name="title" defaultValue={service?.title ?? ""} placeholder="Websites & Web Apps" />
            <AdminInput label="Slug" name="slug" defaultValue={service?.slug ?? ""} placeholder="websites-web-apps" />
            <AdminInput label="Icon name" name="iconName" defaultValue={service?.iconName ?? ""} placeholder="terminal-square" />
            <div className="md:col-span-2">
              <AdminTextarea label="Short description" name="shortDescription" rows={3} defaultValue={service?.shortDescription ?? ""} placeholder="A concise service summary for cards and previews." />
            </div>
            <div className="md:col-span-2">
              <AdminTextarea label="Full description" name="fullDescription" rows={5} defaultValue={service?.fullDescription ?? ""} placeholder="Expanded explanation of the service offering." />
            </div>
            <div className="md:col-span-2">
              <AdminTextarea label="Bullet points" name="bulletPoints" rows={5} defaultValue={service?.bulletPoints.join("\n") ?? ""} placeholder={"Portfolio and business websites\nLanding pages\nAdmin dashboards"} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Publishing" description="Visibility and publishing controls for this service card.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminSelect label="Status" name="status" options={statusOptions} defaultValue={service?.status ?? "Draft"} />
            <AdminSelect label="Featured" name="featured" options={booleanOptions} defaultValue={service?.featured ? "true" : "false"} />
            <AdminSelect label="Show on home" name="showOnHome" options={booleanOptions} defaultValue={service?.showOnHome ? "true" : "false"} />
            <AdminSelect label="Show on services page" name="showOnServicesPage" options={booleanOptions} defaultValue={service?.showOnServicesPage ? "true" : "false"} />
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">{service ? "Update Service" : "Save Service"}</AdminButton>
      </form>
    </div>
  );
}
