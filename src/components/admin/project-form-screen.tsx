import { saveProjectAction } from "@/app/admin/actions/project-actions";
import { AdminImageField } from "@/components/admin/admin-image-field";
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
  { label: "Full-Stack Systems", value: "Full-Stack Systems" },
  { label: "Web Development", value: "Web Development" },
  { label: "UI Design", value: "UI Design" },
  { label: "E-commerce", value: "E-commerce" },
  { label: "Social Media", value: "Social Media" }
];

const booleanOptions = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" }
];

interface ProjectFormScreenProps {
  project: {
    id: string;
    title: string;
    slug: string;
    category: string;
    shortDescription: string;
    fullDescription: string | null;
    problem: string | null;
    solution: string | null;
    result: string | null;
    techStack: string[];
    featuredImageUrl: string | null;
    liveUrl: string | null;
    githubUrl: string | null;
    status: "Published" | "Draft";
    featured: boolean;
    showOnHome: boolean;
    showOnWorkPage: boolean;
  } | null;
}

export function ProjectFormScreen({ project }: Readonly<ProjectFormScreenProps>) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title={project ? "Edit Project" : "Add Project"}
        description="Create or update a portfolio project entry with case-study content, visibility settings, and publishing status."
        actions={<AdminButton href="/admin/content/projects" variant="secondary">Back to projects</AdminButton>}
      />

      <form action={saveProjectAction} className="space-y-6">
        <input type="hidden" name="id" defaultValue={project?.id ?? ""} />

        <AdminSectionCard title="Project details" description="Primary content fields for the project card and full case study.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput label="Project title" name="title" defaultValue={project?.title ?? ""} placeholder="Eventify" />
            <AdminInput label="Slug" name="slug" defaultValue={project?.slug ?? ""} placeholder="eventify" />
            <div className="md:col-span-2">
              <AdminTextarea label="Short description" name="shortDescription" rows={3} defaultValue={project?.shortDescription ?? ""} placeholder="Student event publishing and registration platform." />
            </div>
            <div className="md:col-span-2">
              <AdminTextarea label="Full description" name="fullDescription" rows={5} defaultValue={project?.fullDescription ?? ""} placeholder="Describe the project in more detail." />
            </div>
            <AdminTextarea label="Problem" name="problem" rows={4} defaultValue={project?.problem ?? ""} placeholder="What challenge did this project solve?" />
            <AdminTextarea label="Solution" name="solution" rows={4} defaultValue={project?.solution ?? ""} placeholder="How did you solve the challenge?" />
            <div className="md:col-span-2">
              <AdminTextarea label="Result" name="result" rows={4} defaultValue={project?.result ?? ""} placeholder="What was the final outcome or improvement?" />
            </div>
          </div>
        </AdminSectionCard>

        <AdminSectionCard title="Project setup" description="Metadata, links, and publishing controls for this project.">
          <div className="grid gap-5 md:grid-cols-2">
            <AdminInput label="Tech stack" name="techStack" defaultValue={project?.techStack.join(", ") ?? ""} placeholder="Next.js, Node.js, MongoDB, JWT" />
            <AdminSelect label="Category" name="category" options={categoryOptions} defaultValue={project?.category ?? "Full-Stack Systems"} />
            <div className="md:col-span-2">
              <AdminImageField label="Featured image URL" name="featuredImageUrl" defaultValue={project?.featuredImageUrl ?? ""} usedIn="Project" />
            </div>
            <AdminInput label="Live URL" name="liveUrl" defaultValue={project?.liveUrl ?? ""} placeholder="https://..." />
            <AdminInput label="GitHub URL" name="githubUrl" defaultValue={project?.githubUrl ?? ""} placeholder="https://github.com/..." />
            <AdminSelect label="Status" name="status" options={statusOptions} defaultValue={project?.status ?? "Draft"} />
            <AdminSelect label="Featured" name="featured" options={booleanOptions} defaultValue={project?.featured ? "true" : "false"} />
            <AdminSelect label="Show on home" name="showOnHome" options={booleanOptions} defaultValue={project?.showOnHome ? "true" : "false"} />
            <AdminSelect label="Show on work page" name="showOnWorkPage" options={booleanOptions} defaultValue={project?.showOnWorkPage ? "true" : "false"} />
          </div>
        </AdminSectionCard>

        <AdminButton type="submit">{project ? "Update Project" : "Save Project"}</AdminButton>
      </form>
    </div>
  );
}
