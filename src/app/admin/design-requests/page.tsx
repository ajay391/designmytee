import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

export const metadata = { title: "Design Requests | Admin" };

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "submitted", label: "Submitted" },
  { value: "in_review", label: "In Review" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "awaiting_feedback", label: "Awaiting Feedback" },
  { value: "approved", label: "Approved" },
  { value: "completed", label: "Completed" },
];

export default async function AdminDesignRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "";
  const page = parseInt(params.page ?? "1");
  const pageSize = 20;
  const offset = (page - 1) * pageSize;

  const supabase = await createClient();

  let query = supabase
    .from("design_requests")
    .select(`
      id, tracking_code, title, status, priority, quantity,
      created_at, updated_at,
      profiles!design_requests_user_id_fkey(name, email),
      designer:profiles!design_requests_assigned_designer_id_fkey(name)
    `)
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data: requests } = await query;

  const priorityColor: Record<string, string> = {
    urgent: "text-red-600 bg-red-50",
    high: "text-orange-600 bg-orange-50",
    normal: "text-gray-600 bg-gray-50",
    low: "text-blue-600 bg-blue-50",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#1A1A1A]">Design Requests</h1>
          <p className="text-[#6B6B6B] mt-1">Manage the full custom design pipeline</p>
        </div>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value ? `/admin/design-requests?status=${tab.value}` : "/admin/design-requests"}
            className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              status === tab.value
                ? "bg-[#F05A22] text-white"
                : "bg-white border border-[#E5E3DF] text-[#6B6B6B] hover:text-[#1A1A1A] hover:border-[#F05A22]"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F7F5] border-b border-[#E5E3DF]">
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Code</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Customer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Designer</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Qty</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Priority</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DF]">
              {(requests ?? []).map((req) => {
                const customer = Array.isArray(req.profiles) ? req.profiles[0] : req.profiles;
                const designer = Array.isArray(req.designer) ? req.designer[0] : req.designer;
                return (
                  <tr key={req.id} className="hover:bg-[#F8F7F5] transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-bold text-[#F05A22]">{req.tracking_code}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-[#1A1A1A] text-sm max-w-[180px] truncate">{req.title}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-[#6B6B6B] truncate max-w-[140px]">{customer?.name ?? "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm text-[#6B6B6B]">{designer?.name ?? <span className="text-[#9A9A9A] italic">Unassigned</span>}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[#1A1A1A]">{req.quantity}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${priorityColor[req.priority] ?? priorityColor.normal}`}>
                        {req.priority}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <Badge status={req.status} />
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-[#9A9A9A]">{formatDate(req.created_at)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/design-requests/${req.id}`}
                        className="flex items-center gap-1 text-[#F05A22] text-xs font-semibold hover:underline"
                      >
                        Open <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {(requests ?? []).length === 0 && (
            <div className="text-center py-16 text-[#9A9A9A]">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No design requests found</p>
              <p className="text-sm mt-1">
                {status ? `No requests with status "${status}"` : "Requests will appear here once customers submit them"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Fix missing import
function ClipboardList({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}
