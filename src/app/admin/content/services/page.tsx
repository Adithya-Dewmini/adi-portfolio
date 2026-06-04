import { GripVertical, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  deleteServiceAction,
  toggleServiceFeaturedAction,
  toggleServiceShowOnHomeAction,
  toggleServiceShowOnServicesPageAction
} from "@/app/admin/actions/service-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminSectionCard } from "@/components/admin/admin-section-card";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { getAdminServicesData } from "@/lib/cms";

export default async function AdminContentServicesPage() {
  const services = await getAdminServicesData();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Content Manager"
        title="Services"
        description="Manage editable service cards, featured state, and where each service appears across the public site."
        actions={<AdminButton href="/admin/content/services/new"><Plus className="mr-2 h-4 w-4" />Add Service</AdminButton>}
      />

      <AdminSectionCard title="Services Library" description="Service editing cards with reorder placeholders and page visibility controls.">
        <div className="grid gap-5 xl:grid-cols-2">
          {services.map((service) => (
            <article key={service.id} className="rounded-[1.75rem] border border-[#1E293B] bg-slate-950/25 p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#1E293B] bg-[#0F172A] text-[#94A3B8]">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="font-medium text-[#F8FAFC]">{service.title}</p>
                      <AdminStatusBadge status={service.status} />
                    </div>
                    <p className="mt-2 text-sm text-[#94A3B8]">Slug: {service.slug} · Icon: {service.iconName}</p>
                  </div>
                </div>
                <AdminButton href={`/admin/content/services/${service.id}/edit`} variant="secondary">Edit</AdminButton>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#94A3B8]">{service.shortDescription}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {service.bulletPoints.map((point) => (
                  <span key={point} className="rounded-full border border-[#1E293B] px-3 py-1 text-xs text-[#CBD5E1]">
                    {point}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <form action={toggleServiceFeaturedAction.bind(null, service.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-amber-400/30 hover:text-amber-300">
                    <Star className="h-4 w-4" />
                    Featured
                  </button>
                </form>
                <form action={toggleServiceShowOnHomeAction.bind(null, service.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
                    Home
                  </button>
                </form>
                <form action={toggleServiceShowOnServicesPageAction.bind(null, service.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
                    Services Page
                  </button>
                </form>
                <form action={deleteServiceAction.bind(null, service.id)}>
                  <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-rose-400/30 hover:text-rose-300">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </form>
              </div>
            </article>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
}
