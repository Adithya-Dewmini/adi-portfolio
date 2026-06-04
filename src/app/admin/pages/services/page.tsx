import { saveServicesPageContentAction } from "@/app/admin/actions/page-actions";
import { toggleServiceFeaturedAction, toggleServiceShowOnServicesPageAction } from "@/app/admin/actions/service-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTextarea } from "@/components/admin/admin-textarea";
import { getAdminServicesData, getServicesPageEditorContent } from "@/lib/cms";

export default async function AdminServicesPageEditor() {
  const [content, services] = await Promise.all([
    getServicesPageEditorContent(),
    getAdminServicesData()
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Page Editor"
        title="Services Page Editor"
        description="Edit the messaging, calls to action, and featured services shown on the dedicated services page."
        actions={<AdminButton href="/services" variant="secondary">Preview Page</AdminButton>}
      />

      <form action={saveServicesPageContentAction} className="space-y-6">
        <AdminSectionCard title="Hero & CTA" description="Main services page headline and CTA controls.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Hero badge" name="heroBadge" defaultValue={content.heroBadge} />
            <AdminInput label="Primary CTA text" name="primaryCtaText" defaultValue={content.primaryCtaText} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Hero title" name="heroTitle" rows={3} defaultValue={content.heroTitle} />
            </div>
            <div className="lg:col-span-2">
              <AdminTextarea label="Hero subtitle" name="heroSubtitle" rows={4} defaultValue={content.heroSubtitle} />
            </div>
            <AdminInput label="Primary CTA link" name="primaryCtaLink" defaultValue={content.primaryCtaLink} />
            <AdminInput label="Secondary CTA text" name="secondaryCtaText" defaultValue={content.secondaryCtaText} />
            <AdminInput label="Secondary CTA link" name="secondaryCtaLink" defaultValue={content.secondaryCtaLink} />
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Section Headings" description="Edit the title blocks across the services page.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Services grid title" name="servicesGridTitle" defaultValue={content.servicesGridTitle} />
            <AdminInput label="Process section title" name="processSectionTitle" defaultValue={content.processSectionTitle} />
            <AdminInput label="Who I Can Help section title" name="audiencesSectionTitle" defaultValue={content.audiencesSectionTitle} />
            <AdminInput label="Final CTA title" name="finalCtaTitle" defaultValue={content.finalCtaTitle} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Final CTA text" name="finalCtaText" rows={4} defaultValue={content.finalCtaText} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">Save Changes</AdminButton>
      </form>

      <AdminSectionCard title="Services Preview" description="Preview editable services and mark what stays featured on the services page.">
        <div className="space-y-5">
          {services.map((service) => (
            <div key={service.id} className="rounded-[1.5rem] border border-[#1E293B] bg-slate-950/25 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-medium text-[#F8FAFC]">{service.title}</p>
                    <AdminStatusBadge status={service.status} />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{service.shortDescription}</p>
                </div>
                <div className="w-full max-w-xs space-y-3">
                  <AdminButton href={`/admin/content/services/${service.id}/edit`} variant="secondary">Edit Service</AdminButton>
                  <form action={toggleServiceShowOnServicesPageAction.bind(null, service.id)}>
                    <AdminButton type="submit" variant={service.showOnServicesPage ? "primary" : "secondary"}>
                      {service.showOnServicesPage ? "Featured on Services Page" : "Show on Services Page"}
                    </AdminButton>
                  </form>
                  <form action={toggleServiceFeaturedAction.bind(null, service.id)}>
                    <AdminButton type="submit" variant={service.featured ? "primary" : "secondary"}>
                      {service.featured ? "Featured" : "Mark Featured"}
                    </AdminButton>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
}
