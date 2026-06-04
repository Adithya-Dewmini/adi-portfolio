import { saveContactPageContentAction } from "@/app/admin/actions/page-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminTextarea } from "@/components/admin/admin-textarea";
import { getContactPageEditorContent } from "@/lib/cms";

export default async function AdminContactPageEditor() {
  const content = await getContactPageEditorContent();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Page Editor"
        title="Contact Page Editor"
        description="Manage contact page hero content, communication details, availability messaging, and visibility toggles."
        actions={<AdminButton href="/contact" variant="secondary">Preview Page</AdminButton>}
      />

      <form action={saveContactPageContentAction} className="space-y-6">
        <AdminSectionCard title="Hero Content" description="Opening contact page headline and introduction.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Hero badge" name="heroBadge" defaultValue={content.heroBadge} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Hero title" name="heroTitle" rows={3} defaultValue={content.heroTitle} />
            </div>
            <div className="lg:col-span-2">
              <AdminTextarea label="Hero subtitle" name="heroSubtitle" rows={4} defaultValue={content.heroSubtitle} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Contact Cards" description="Edit the visible email, WhatsApp, and location contact blocks.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Email display text" name="emailDisplayText" defaultValue={content.emailDisplayText} />
            <AdminInput label="Email address" name="emailAddress" defaultValue={content.emailAddress} />
            <AdminInput label="WhatsApp display text" name="whatsappDisplayText" defaultValue={content.whatsappDisplayText} />
            <AdminInput label="WhatsApp number" name="whatsappNumber" defaultValue={content.whatsappNumber} />
            <div className="lg:col-span-2">
              <AdminInput label="WhatsApp link" name="whatsappLink" defaultValue={content.whatsappLink} />
            </div>
            <AdminInput label="Location title" name="locationTitle" defaultValue={content.locationTitle} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Location description" name="locationDescription" rows={3} defaultValue={content.locationDescription} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Form, Availability & Final CTA" description="Edit form heading, map card messaging, and the final CTA block.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Contact form heading" name="contactFormHeading" defaultValue={content.contactFormHeading} />
            <AdminInput label="Map/location card title" name="mapCardTitle" defaultValue={content.mapCardTitle} />
            <AdminInput label="Availability text" name="availabilityText" defaultValue={content.availabilityText} />
            <AdminInput label="Final CTA title" name="finalCtaTitle" defaultValue={content.finalCtaTitle} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Final CTA text" name="finalCtaText" rows={4} defaultValue={content.finalCtaText} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Visibility Controls" description="Use true or false to toggle individual contact page blocks.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Show contact form" name="showContactForm" defaultValue={content.showContactForm ? "true" : "false"} />
            <AdminInput label="Show map card" name="showMapCard" defaultValue={content.showMapCard ? "true" : "false"} />
            <AdminInput label="Show WhatsApp card" name="showWhatsAppCard" defaultValue={content.showWhatsAppCard ? "true" : "false"} />
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">Save Changes</AdminButton>
      </form>
    </div>
  );
}
