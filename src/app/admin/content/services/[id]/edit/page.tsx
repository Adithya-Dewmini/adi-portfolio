import { ServiceFormScreen } from "@/components/admin/service-form-screen";
import { getAdminServicesData } from "@/lib/cms";

interface AdminEditServicePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditServicePage({ params }: Readonly<AdminEditServicePageProps>) {
  const { id } = await params;
  const services = await getAdminServicesData();
  const service = services.find((item) => item.id === id) ?? null;

  return <ServiceFormScreen service={service} />;
}
