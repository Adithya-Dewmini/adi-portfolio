import { Eye, MailCheck, MailOpen, Trash2 } from "lucide-react";
import { deleteMessageAction, markMessageAsReadAction, markMessageAsRepliedAction } from "@/app/admin/actions/message-actions";
import { AdminButton } from "@/components/admin/admin-button";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminStatusBadge } from "@/components/admin/admin-status-badge";
import { AdminTable, type AdminTableColumn } from "@/components/admin/admin-table";
import { getAdminMessagesData } from "@/lib/cms";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessagesData();

  const columns: AdminTableColumn<(typeof messages)[number]>[] = [
    {
      header: "Sender",
      render: (message) => (
        <div>
          <p className="font-medium text-[#F8FAFC]">{message.name}</p>
          <p className="mt-2 text-sm text-[#94A3B8]">{message.email}</p>
        </div>
      )
    },
    {
      header: "Message",
      render: (message) => (
        <div>
          <p className="font-medium text-[#F8FAFC]">{message.subject}</p>
          <p className="mt-3 text-sm leading-6 text-[#94A3B8]">{message.preview}</p>
        </div>
      )
    },
    {
      header: "Date",
      render: (message) => <span className="text-[#94A3B8]">{message.receivedAt}</span>
    },
    {
      header: "Status",
      render: (message) => <AdminStatusBadge status={message.status} />
    },
    {
      header: "Actions",
      className: "w-[320px]",
      render: (message) => (
        <div className="flex flex-wrap gap-2">
          <AdminButton variant="secondary"><Eye className="mr-2 h-4 w-4" />View</AdminButton>
          <form action={markMessageAsReadAction.bind(null, message.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
              <MailOpen className="h-4 w-4" />
              Mark as read
            </button>
          </form>
          <form action={markMessageAsRepliedAction.bind(null, message.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#F8FAFC] transition hover:border-sky-400/30 hover:text-[#38BDF8]">
              <MailCheck className="h-4 w-4" />
              Mark replied
            </button>
          </form>
          <form action={deleteMessageAction.bind(null, message.id)}>
            <button type="submit" className="inline-flex items-center gap-2 rounded-2xl border border-[#1E293B] px-3 py-2 text-xs font-medium text-[#94A3B8] transition hover:border-rose-400/30 hover:text-rose-300">
              <Trash2 className="h-4 w-4" />
              Delete
            </button>
          </form>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        eyebrow="Inbox"
        title="Messages"
        description="Portfolio inquiries saved from the public contact form."
        actions={<AdminButton variant="secondary">Live Inbox</AdminButton>}
      />
      <AdminTable columns={columns} data={messages} rowKey={(message) => message.id} />
    </div>
  );
}
