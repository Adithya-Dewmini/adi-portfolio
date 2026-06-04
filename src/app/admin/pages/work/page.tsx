import { saveWorkPageContentAction } from "@/app/admin/actions/page-actions";
import { toggleDesignWorkFeaturedAction, toggleDesignWorkShowOnWorkPageAction } from "@/app/admin/actions/design-work-actions";
import { toggleProjectFeaturedAction, toggleProjectShowOnWorkPageAction } from "@/app/admin/actions/project-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminInput } from "@/components/admin/admin-input";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTextarea } from "@/components/admin/admin-textarea";
import { getAdminDesignWorkData, getAdminProjectsData, getWorkPageEditorContent } from "@/lib/cms";

export default async function AdminWorkPageEditor() {
  const [content, projects, designWorks] = await Promise.all([
    getWorkPageEditorContent(),
    getAdminProjectsData(),
    getAdminDesignWorkData()
  ]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Page Editor"
        title="Work Page Editor"
        description="Manage work page copy, filter categories, supporting sections, and which projects or design pieces are surfaced there."
        actions={<AdminButton href="/work" variant="secondary">Preview Page</AdminButton>}
      />

      <form action={saveWorkPageContentAction} className="space-y-6">
        <AdminSectionCard title="Hero & CTA" description="Update the work page opening copy and button links.">
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

        <AdminSectionCard title="Page Structure" description="Control the visible headings across the work page.">
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminInput label="Work categories" name="workCategories" defaultValue={content.workCategories.join(", ")} helper="Comma separated list for the filter tabs." />
            <AdminInput label="Featured work section title" name="featuredWorkSectionTitle" defaultValue={content.featuredWorkSectionTitle} />
            <AdminInput label="Case study preview section title" name="caseStudySectionTitle" defaultValue={content.caseStudySectionTitle} />
            <AdminInput label="Design showcase section title" name="designShowcaseSectionTitle" defaultValue={content.designShowcaseSectionTitle} />
            <AdminInput label="Tools section title" name="toolsSectionTitle" defaultValue={content.toolsSectionTitle} />
            <AdminInput label="Final CTA title" name="finalCtaTitle" defaultValue={content.finalCtaTitle} />
            <div className="lg:col-span-2">
              <AdminTextarea label="Final CTA text" name="finalCtaText" rows={4} defaultValue={content.finalCtaText} />
            </div>
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">Save Changes</AdminButton>
      </form>

      <AdminSectionCard title="Connected Content Preview" description="Preview which projects and design works are currently marked to appear on the work page.">
        <div className="space-y-5">
          <div>
            <h4 className="mb-4 font-display text-xl font-semibold text-[#F8FAFC]">Projects</h4>
            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="rounded-[1.5rem] border border-[#1E293B] bg-slate-950/25 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-medium text-[#F8FAFC]">{project.title}</p>
                        <AdminStatusBadge status={project.status} />
                      </div>
                      <p className="mt-2 text-sm text-[#94A3B8]">{project.category}</p>
                      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{project.shortDescription}</p>
                    </div>
                    <form action={toggleProjectShowOnWorkPageAction.bind(null, project.id)}>
                      <AdminButton type="submit" variant={project.showOnWorkPage ? "primary" : "secondary"}>
                        {project.showOnWorkPage ? "Shown on Work Page" : "Show on Work Page"}
                      </AdminButton>
                    </form>
                    <form action={toggleProjectFeaturedAction.bind(null, project.id)}>
                      <AdminButton type="submit" variant={project.featured ? "primary" : "secondary"}>
                        {project.featured ? "Featured" : "Mark Featured"}
                      </AdminButton>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-display text-xl font-semibold text-[#F8FAFC]">Design Work</h4>
            <div className="space-y-4">
              {designWorks.map((item) => (
                <div key={item.id} className="rounded-[1.5rem] border border-[#1E293B] bg-slate-950/25 p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-medium text-[#F8FAFC]">{item.title}</p>
                        <AdminStatusBadge status={item.status} />
                      </div>
                      <p className="mt-2 text-sm text-[#94A3B8]">{item.category} · {item.brandClient}</p>
                      <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{item.description}</p>
                    </div>
                    <form action={toggleDesignWorkShowOnWorkPageAction.bind(null, item.id)}>
                      <AdminButton type="submit" variant={item.showOnWorkPage ? "primary" : "secondary"}>
                        {item.showOnWorkPage ? "Shown on Work Page" : "Show on Work Page"}
                      </AdminButton>
                    </form>
                    <form action={toggleDesignWorkFeaturedAction.bind(null, item.id)}>
                      <AdminButton type="submit" variant={item.featured ? "primary" : "secondary"}>
                        {item.featured ? "Featured" : "Mark Featured"}
                      </AdminButton>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AdminSectionCard>
    </div>
  );
}
