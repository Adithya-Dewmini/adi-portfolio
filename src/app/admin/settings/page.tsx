import { saveSiteSettingsAction } from "@/app/admin/actions/settings-actions";
import { AdminImageField } from "@/components/admin/admin-image-field";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminTextarea } from "@/components/admin/admin-textarea";
import { getSiteSettingsData } from "@/lib/cms";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettingsData();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Site Settings"
        title="Global site configuration"
        description="Control portfolio identity, personal details, default SEO values, and admin dashboard preferences from one central settings screen."
        actions={<AdminButton variant="secondary" href="/">Preview site</AdminButton>}
      />

      <form action={saveSiteSettingsAction} className="space-y-6">
        <section className="grid gap-6 xl:grid-cols-2">
          <AdminSectionCard title="Site identity" description="Default brand-level settings used across the public portfolio.">
            <div className="grid gap-5 md:grid-cols-2">
              <AdminInput label="Site name" name="siteName" defaultValue={settings.siteName} />
              <AdminInput label="Tagline" name="tagline" defaultValue={settings.tagline} />
              <div className="md:col-span-2">
                <AdminImageField label="Logo URL" name="logoUrl" defaultValue={settings.logoUrl} usedIn="Page" />
              </div>
              <AdminInput label="Favicon URL" name="faviconUrl" defaultValue={settings.faviconUrl} />
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="Personal info" description="Primary profile details shown throughout the public portfolio and contact surfaces.">
            <div className="grid gap-5 md:grid-cols-2">
              <AdminInput label="Full name" name="fullName" defaultValue={settings.fullName} />
              <AdminInput label="Professional title" name="professionalTitle" defaultValue={settings.professionalTitle} />
              <AdminInput label="Location" name="location" defaultValue={settings.location} />
              <AdminInput label="CV URL" name="cvUrl" defaultValue={settings.cvUrl} />
              <div className="md:col-span-2">
                <AdminTextarea label="Short bio" name="shortBio" rows={5} defaultValue={settings.shortBio} />
              </div>
            </div>
          </AdminSectionCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <AdminSectionCard title="Contact info" description="Public-facing communication channels and social destinations.">
            <div className="grid gap-5 md:grid-cols-2">
              <AdminInput label="Email" name="email" type="email" defaultValue={settings.email} />
              <AdminInput label="WhatsApp" name="whatsapp" defaultValue={settings.whatsapp} />
              <AdminInput label="Phone" name="phone" defaultValue={settings.phone} />
              <AdminInput label="LinkedIn" name="linkedIn" defaultValue={settings.linkedIn} />
              <AdminInput label="GitHub" name="github" defaultValue={settings.github} />
              <AdminInput label="Instagram" name="instagram" defaultValue={settings.instagram} />
              <AdminInput label="Behance" name="behance" defaultValue={settings.behance} />
            </div>
          </AdminSectionCard>

          <AdminSectionCard title="SEO defaults" description="Fallback metadata used when a page or content item does not override its own SEO fields.">
            <div className="grid gap-5">
              <AdminInput label="Default meta title" name="defaultMetaTitle" defaultValue={settings.defaultMetaTitle} />
              <AdminTextarea label="Default meta description" name="defaultMetaDescription" rows={5} defaultValue={settings.defaultMetaDescription} />
              <AdminImageField label="Default OG image URL" name="defaultOgImageUrl" defaultValue={settings.defaultOgImageUrl} usedIn="Page" />
            </div>
          </AdminSectionCard>
        </section>

        <AdminSectionCard title="Admin preferences" description="Use true or false for the placeholder dashboard preference toggles.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Dark mode enabled" name="darkModeEnabled" defaultValue={settings.darkModeEnabled ? "true" : "false"} />
            <AdminInput label="Dashboard compact mode" name="dashboardCompactMode" defaultValue={settings.dashboardCompactMode ? "true" : "false"} />
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">Save Changes</AdminButton>
      </form>
    </div>
  );
}
