import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = { title: "Bulk Requests | Admin" };

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "quoted", label: "Quoted" },
  { value: "accepted", label: "Accepted" },
  { value: "converted", label: "Converted" },
  { value: "closed", label: "Closed" },
];

export default async function AdminBulkRequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const params = await searchParams;
  const status = params.status ?? "";
  const supabase = await createClient();

  let query = supabase
    .from("bulk_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);

  const { data: requests } = await query;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[#1A1A1A]">Bulk Requests</h1>
        <p className="text-[#6B6B6B] mt-1">Review bulk order requests and send quotes</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {STATUS_TABS.map((tab) => (
          <Link
            key={tab.value}
            href={tab.value ? `/admin/bulk-requests?status=${tab.value}` : "/admin/bulk-requests"}
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

      <div className="bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F7F5] border-b border-[#E5E3DF]">
                {["Contact", "Product", "Quantity", "Status", "Quoted Price", "Date", ""].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DF]">
              {(requests ?? []).map((req) => (
                <tr key={req.id} className="hover:bg-[#F8F7F5] transition-colors">
                  <td className="px-5 py-4">
                    <p className="font-medium text-[#1A1A1A] text-sm">{req.contact_name}</p>
                    <p className="text-xs text-[#9A9A9A]">{req.contact_email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-[#6B6B6B] capitalize">{req.product_type?.replace(/-/g, " ")}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#1A1A1A]">{req.quantity} pcs</p>
                  </td>
                  <td className="px-5 py-4"><Badge status={req.status} /></td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#1A1A1A]">
                      {req.quoted_price ? `₹${req.quoted_price}` : "—"}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs text-[#9A9A9A]">{formatDate(req.created_at)}</p>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/bulk-requests/${req.id}`}
                      className="flex items-center gap-1 text-[#F05A22] text-xs font-semibold hover:underline"
                    >
                      Open <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(requests ?? []).length === 0 && (
            <div className="text-center py-16 text-[#9A9A9A] text-sm">No bulk requests found</div>
          )}
        </div>
      </div>
    </div>
  );
}
