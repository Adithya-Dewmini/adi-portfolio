import type { ReactNode } from "react";

export interface AdminTableColumn<T> {
  header: string;
  className?: string;
  render: (item: T) => ReactNode;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  data: T[];
  rowKey: (item: T) => string;
  emptyState?: string;
}

export function AdminTable<T>({ columns, data, rowKey, emptyState = "No records found." }: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[#1E293B] bg-[#0F172A]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[#1E293B]">
          <thead className="bg-slate-950/40">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.header}
                  className={`px-5 py-4 text-left text-xs font-semibold uppercase tracking-[0.24em] text-[#64748B] ${column.className ?? ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E293B]">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={rowKey(item)} className="transition hover:bg-slate-950/30">
                  {columns.map((column) => (
                    <td key={column.header} className={`px-5 py-5 align-top text-sm text-[#F8FAFC] ${column.className ?? ""}`}>
                      {column.render(item)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-[#94A3B8]">
                  {emptyState}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
