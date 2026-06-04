import { ProjectFormScreen } from "@/components/admin/project-form-screen";
import { getAdminProjectsData } from "@/lib/cms";

interface AdminEditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditProjectPage({ params }: Readonly<AdminEditProjectPageProps>) {
  const { id } = await params;
  const projects = await getAdminProjectsData();
  const project = projects.find((item) => item.id === id) ?? null;

  return <ProjectFormScreen project={project} />;
}
