import { createClient } from "@/lib/supabase/server";
import { formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";

export const metadata = { title: "Orders | Admin" };

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, customer:profiles!orders_user_id_fkey(name, email)")
    .order("created_at", { ascending: false })
    .limit(50);

  const SOURCE_LABELS: Record<string, string> = {
    shop: "Shop Purchase",
    design_request: "Custom Design",
    bulk_request: "Bulk Order",
  };

  const STATUS_OPTIONS = ["pending","confirmed","printing","shipped","delivered","cancelled"];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-black text-[#1A1A1A]">Orders</h1>
      <div className="bg-white rounded-2xl border border-[#E5E3DF] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F8F7F5] border-b border-[#E5E3DF]">
                {["Order ID", "Customer", "Source", "Total", "Payment", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#9A9A9A] uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E3DF]">
              {(orders ?? []).map((order) => {
                const customer = Array.isArray(order.customer) ? order.customer[0] : order.customer;
                return (
                  <tr key={order.id} className="hover:bg-[#F8F7F5] transition-colors">
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs text-[#9A9A9A]">#{order.id.slice(-8).toUpperCase()}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-[#1A1A1A]">{customer?.name ?? "Guest"}</p>
                      <p className="text-xs text-[#9A9A9A]">{customer?.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-medium text-[#6B6B6B]">{SOURCE_LABELS[order.source]}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-bold text-[#1A1A1A] text-sm">{formatPrice(order.total)}</span>
                    </td>
                    <td className="px-5 py-4"><Badge status={order.payment_status} /></td>
                    <td className="px-5 py-4"><Badge status={order.status} /></td>
                    <td className="px-5 py-4"><span className="text-xs text-[#9A9A9A]">{formatDate(order.created_at)}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {(orders ?? []).length === 0 && (
            <div className="text-center py-16 text-[#9A9A9A] text-sm">No orders yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
