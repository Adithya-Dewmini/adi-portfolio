import Image from "next/image";
import { Trash2 } from "lucide-react";
import { deleteMediaItemAction } from "@/app/admin/actions/media-actions";
import { CloudinaryUpload } from "@/components/admin/cloudinary-upload";
import { CopyUrlButton } from "@/components/admin/copy-url-button";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { getAdminMediaItemsData } from "@/lib/cms";

export default async function AdminMediaPage() {
  const mediaItems = await getAdminMediaItemsData();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Media Library"
        title="Media Library"
        description="Upload and manage Cloudinary media items used across projects, design work, and public pages."
        actions={<AdminButton variant="secondary" href="/admin/dashboard">Back to dashboard</AdminButton>}
      />

      <CloudinaryUpload label="Upload to Cloudinary" usedIn="Media Library" />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {mediaItems.map((item) => (
          <article key={item.id} className="overflow-hidden rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A]">
            <div className="relative h-44 border-b border-[#1E293B] bg-slate-950">
              <Image src={item.url} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-5">
              <p className="font-medium text-[#F8FAFC]">{item.title}</p>
              <p className="mt-2 truncate text-sm text-[#94A3B8]">{item.url}</p>
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-[#64748B]">Used in: {item.usedIn}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#64748B]">Public ID: {item.publicId}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <CopyUrlButton value={item.url} />
                <form action={deleteMediaItemAction.bind(null, item.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-rose-400/30 hover:text-rose-300">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
