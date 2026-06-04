import { ProjectFormScreen } from "@/components/admin/project-form-screen";
import { getAdminProjectsData } from "@/lib/cms";

interface AdminNewProjectPageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AdminNewProjectPage({ searchParams }: Readonly<AdminNewProjectPageProps>) {
  const params = (await searchParams) ?? {};
  const projects = await getAdminProjectsData();
  const projectId = params.id ?? "";
  const project = projectId ? projects.find((item) => item.id === projectId) : null;

  return <ProjectFormScreen project={project ?? null} />;
}
