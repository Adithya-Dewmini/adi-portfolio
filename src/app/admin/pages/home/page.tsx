import { saveHomePageContentAction } from "@/app/admin/actions/page-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminTextarea } from "@/components/admin/admin-textarea";
import { getHomePageEditorContent } from "@/lib/cms";

export default async function AdminHomePageEditor() {
  const content = await getHomePageEditorContent();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Page Editor"
        title="Home Page Editor"
        description="Control the core storytelling blocks on the homepage, including hero content, identity cards, preview sections, and the final call to action."
        actions={<AdminButton href="/" variant="secondary">Preview Page</AdminButton>}
      />

      <form action={saveHomePageContentAction} className="space-y-6">
        <AdminSectionCard title="Hero Content" description="Primary hero content and homepage CTA links.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Hero badge" name="heroBadge" defaultValue={content.heroBadge} />
            <AdminInput label="Primary CTA text" name="primaryCtaText" defaultValue={content.primaryCtaText} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Hero title" name="heroTitle" rows={3} defaultValue={content.heroTitle} />
            </div>
            <div className="lg:col-span-2">
              <AdminTextarea label="Hero subtitle" name="heroSubtitle" rows={5} defaultValue={content.heroSubtitle} />
            </div>
            <AdminInput label="Primary CTA link" name="primaryCtaLink" defaultValue={content.primaryCtaLink} />
            <AdminInput label="Secondary CTA text" name="secondaryCtaText" defaultValue={content.secondaryCtaText} />
            <AdminInput label="Secondary CTA link" name="secondaryCtaLink" defaultValue={content.secondaryCtaLink} />
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Identity Cards" description="Edit the three profile cards shown in the homepage hero section.">
          <div className="space-y-5">
            {content.identityCards.map((card) => (
              <div key={card.id} className="rounded-[1.5rem] border border-[#1E293B] bg-slate-950/25 p-5">
                <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                  <AdminInput label="Card title" name={card.id === "identity-developer" ? "identityDeveloperTitle" : card.id === "identity-designer" ? "identityDesignerTitle" : "identityOperatorTitle"} defaultValue={card.title} />
                  <AdminInput
                    label="Enabled"
                    name={card.id === "identity-developer" ? "identityDeveloperEnabled" : card.id === "identity-designer" ? "identityDesignerEnabled" : "identityOperatorEnabled"}
                    defaultValue={card.enabled ? "true" : "false"}
                    helper="Use true or false."
                  />
                  <div className="lg:col-span-2">
                    <AdminTextarea
                      label="Card description"
                      name={card.id === "identity-developer" ? "identityDeveloperDescription" : card.id === "identity-designer" ? "identityDesignerDescription" : "identityOperatorDescription"}
                      rows={4}
                      defaultValue={card.description}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Section Titles & CTA" description="Homepage supporting section headings and the closing CTA block.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Featured work section title" name="featuredWorkSectionTitle" defaultValue={content.featuredWorkSectionTitle} />
            <AdminInput label="Featured services section title" name="featuredServicesSectionTitle" defaultValue={content.featuredServicesSectionTitle} />
            <div className="lg:col-span-2">
              <AdminTextarea label="About preview text" name="aboutPreviewText" rows={4} defaultValue={content.aboutPreviewText} />
            </div>
            <AdminInput label="Final CTA title" name="finalCtaTitle" defaultValue={content.finalCtaTitle} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Final CTA text" name="finalCtaText" rows={4} defaultValue={content.finalCtaText} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Visibility Controls" description="Use true or false to show or hide major homepage sections.">
          <div className="grid gap-4 md:grid-cols-2">
            <AdminInput label="Show hero section" name="showHero" defaultValue={content.showHero ? "true" : "false"} />
            <AdminInput label="Show identity cards" name="showIdentityCards" defaultValue={content.showIdentityCards ? "true" : "false"} />
            <AdminInput label="Show featured work section" name="showFeaturedWork" defaultValue={content.showFeaturedWork ? "true" : "false"} />
            <AdminInput label="Show featured services section" name="showFeaturedServices" defaultValue={content.showFeaturedServices ? "true" : "false"} />
            <AdminInput label="Show about preview" name="showAboutPreview" defaultValue={content.showAboutPreview ? "true" : "false"} />
            <AdminInput label="Show final CTA" name="showFinalCta" defaultValue={content.showFinalCta ? "true" : "false"} />
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">Save Changes</AdminButton>
      </form>
    </div>
  );
}
