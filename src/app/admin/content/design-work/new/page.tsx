import { DesignWorkFormScreen } from "@/components/admin/design-work-form-screen";
import { getAdminDesignWorkData } from "@/lib/cms";

interface AdminNewDesignWorkPageProps {
  searchParams?: Promise<{ id?: string }>;
}

export default async function AdminNewDesignWorkPage({ searchParams }: Readonly<AdminNewDesignWorkPageProps>) {
  const params = (await searchParams) ?? {};
  const items = await getAdminDesignWorkData();
  const designWorkId = params.id ?? "";
  const item = designWorkId ? items.find((entry) => entry.id === designWorkId) : null;

  return <DesignWorkFormScreen item={item ?? null} />;
}
