import { createClient } from "@/lib/supabase/server";
import { StatCard } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatDate, getStatusLabel } from "@/lib/utils";
import Link from "next/link";
import {
  ClipboardList, Package, ShoppingBag, Clock,
  AlertCircle, CheckCircle, TrendingUp, Users
} from "lucide-react";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Try fetching aggregated stats via single RPC call
  const { data: rpcStats } = await supabase.rpc("get_admin_dashboard_stats");

  let totalRequests = rpcStats?.total_requests ?? 0;
  let pendingRequests = rpcStats?.pending_requests ?? 0;
  let inProgressRequests = rpcStats?.in_progress_requests ?? 0;
  let awaitingFeedback = rpcStats?.awaiting_feedback ?? 0;
  let totalOrders = rpcStats?.total_orders ?? 0;
  let pendingOrders = rpcStats?.pending_orders ?? 0;
  let totalBulkRequests = rpcStats?.total_bulk_requests ?? 0;
  let newBulkRequests = rpcStats?.new_bulk_requests ?? 0;

  // Recent data queries
  const [{ data: recentRequests }, { data: recentOrders }] = await Promise.all([
    supabase
      .from("design_requests")
      .select("id, tracking_code, title, status, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("orders")
      .select("id, source, total, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  // Fallback count queries if RPC isn't deployed yet
  if (!rpcStats) {
    const [
      { count: reqCount },
      { count: pendReqCount },
      { count: inProgCount },
      { count: awaitCount },
      { count: ordCount },
      { count: pendOrdCount },
      { count: bulkCount },
      { count: newBulkCount },
    ] = await Promise.all([
      supabase.from("design_requests").select("*", { count: "exact", head: true }),
      supabase.from("design_requests").select("*", { count: "exact", head: true }).in("status", ["submitted", "in_review"]),
      supabase.from("design_requests").select("*", { count: "exact", head: true }).in("status", ["assigned", "in_progress"]),
      supabase.from("design_requests").select("*", { count: "exact", head: true }).eq("status", "awaiting_feedback"),
      supabase.from("orders").select("*", { count: "exact", head: true }),
      supabase.from("orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
      supabase.from("bulk_requests").select("*", { count: "exact", head: true }),
      supabase.from("bulk_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    ]);

    totalRequests = reqCount ?? 0;
    pendingRequests = pendReqCount ?? 0;
    inProgressRequests = inProgCount ?? 0;
    awaitingFeedback = awaitCount ?? 0;
    totalOrders = ordCount ?? 0;
    pendingOrders = pendOrdCount ?? 0;
    totalBulkRequests = bulkCount ?? 0;
    newBulkRequests = newBulkCount ?? 0;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-[#1A1A1A]">Dashboard</h1>
        <p className="text-[#6B6B6B] mt-1">Welcome back — here&apos;s what needs your attention.</p>
      </div>

      {/* Actionable alerts */}
      {((pendingRequests ?? 0) > 0 || (awaitingFeedback ?? 0) > 0 || (newBulkRequests ?? 0) > 0) && (
        <div className="space-y-3">
          {(pendingRequests ?? 0) > 0 && (
            <Link href="/admin/design-requests?status=submitted" className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 hover:bg-amber-100 transition-colors">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm font-medium text-amber-800">
                <strong>{pendingRequests}</strong> design request{(pendingRequests ?? 0) > 1 ? "s" : ""} waiting for review
              </p>
              <span className="ml-auto text-xs font-semibold text-amber-600">Review →</span>
            </Link>
          )}
          {(awaitingFeedback ?? 0) > 0 && (
            <Link href="/admin/design-requests?status=awaiting_feedback" className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-5 py-4 hover:bg-blue-100 transition-colors">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
              <p className="text-sm font-medium text-blue-800">
                <strong>{awaitingFeedback}</strong> request{(awaitingFeedback ?? 0) > 1 ? "s" : ""} awaiting customer feedback
              </p>
              <span className="ml-auto text-xs font-semibold text-blue-600">View →</span>
            </Link>
          )}
          {(newBulkRequests ?? 0) > 0 && (
            <Link href="/admin/bulk-requests?status=new" className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-2xl px-5 py-4 hover:bg-purple-100 transition-colors">
              <Package className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <p className="text-sm font-medium text-purple-800">
                <strong>{newBulkRequests}</strong> new bulk request{(newBulkRequests ?? 0) > 1 ? "s" : ""} need quoting
              </p>
              <span className="ml-auto text-xs font-semibold text-purple-600">Quote →</span>
            </Link>
          )}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Design Requests"
          value={totalRequests ?? 0}
          icon={<ClipboardList className="w-5 h-5" />}
          change={`${pendingRequests ?? 0} pending review`}
          changeType="neutral"
        />
        <StatCard
          title="In Progress"
          value={inProgressRequests ?? 0}
          icon={<TrendingUp className="w-5 h-5" />}
          change="Active jobs"
          changeType="neutral"
          color="#7C3AED"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders ?? 0}
          icon={<ShoppingBag className="w-5 h-5" />}
          change={`${pendingOrders ?? 0} pending`}
          changeType="neutral"
          color="#0EA5E9"
        />
        <StatCard
          title="Bulk Requests"
          value={totalBulkRequests ?? 0}
          icon={<Package className="w-5 h-5" />}
          change={`${newBulkRequests ?? 0} need quoting`}
          changeType="neutral"
          color="#16A34A"
        />
      </div>

      {/* Recent requests + orders */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Design Requests */}
        <div className="bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E3DF]">
            <h2 className="font-bold text-[#1A1A1A]">Recent Design Requests</h2>
            <Link href="/admin/design-requests" className="text-xs text-[#F05A22] font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#E5E3DF]">
            {(recentRequests ?? []).map((req) => (
              <Link
                key={req.id}
                href={`/admin/design-requests/${req.id}`}
                className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F7F5] transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1A1A] text-sm truncate">{req.title}</p>
                  <p className="text-xs text-[#9A9A9A] mt-0.5">{req.tracking_code} · {formatDate(req.created_at)}</p>
                </div>
                <Badge status={req.status} />
              </Link>
            ))}
            {(recentRequests ?? []).length === 0 && (
              <div className="px-6 py-10 text-center text-[#9A9A9A] text-sm">No requests yet</div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E3DF]">
            <h2 className="font-bold text-[#1A1A1A]">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-[#F05A22] font-semibold hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[#E5E3DF]">
            {(recentOrders ?? []).map((order) => (
              <div key={order.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1A1A1A] text-sm capitalize">
                    {order.source.replace(/_/g, " ")} order
                  </p>
                  <p className="text-xs text-[#9A9A9A] mt-0.5">{formatDate(order.created_at)}</p>
                </div>
                <p className="font-bold text-[#1A1A1A] text-sm mr-3">₹{order.total}</p>
                <Badge status={order.status} />
              </div>
            ))}
            {(recentOrders ?? []).length === 0 && (
              <div className="px-6 py-10 text-center text-[#9A9A9A] text-sm">No orders yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
