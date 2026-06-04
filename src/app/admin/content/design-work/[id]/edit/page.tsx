import { DesignWorkFormScreen } from "@/components/admin/design-work-form-screen";
import { getAdminDesignWorkData } from "@/lib/cms";

interface AdminEditDesignWorkPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminEditDesignWorkPage({ params }: Readonly<AdminEditDesignWorkPageProps>) {
  const { id } = await params;
  const items = await getAdminDesignWorkData();
  const item = items.find((entry) => entry.id === id) ?? null;

  return <DesignWorkFormScreen item={item} />;
}
