import { ServiceFormScreen } from "@/components/admin/service-form-screen";
import { getAdminServicesData } from "@/lib/cms";

interface AdminNewServicePageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AdminNewServicePage({ searchParams }: Readonly<AdminNewServicePageProps>) {
  const params = (await searchParams) ?? {};
  const services = await getAdminServicesData();
  const serviceId = params.id ?? "";
  const service = serviceId ? services.find((item) => item.id === serviceId) : null;

  return <ServiceFormScreen service={service ?? null} />;
}
