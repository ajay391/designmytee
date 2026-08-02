import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata = { title: "My Orders | DesignMyTee" };

export default async function AccountOrdersPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/account/orders");

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const SOURCE_LABELS: Record<string, string> = {
    shop: "Shop Purchase",
    design_request: "Custom Design",
    bulk_request: "Bulk Order",
  };

  return (
    <div className="min-h-screen bg-[#F8F7F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-black text-[#1A1A1A] mb-8">My Orders</h1>

        {(orders ?? []).length > 0 ? (
          <div className="space-y-4">
            {(orders ?? []).map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-[#E5E3DF] p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-sm font-bold text-[#9A9A9A]">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <Badge status={order.status} />
                      <Badge status={order.payment_status} />
                    </div>
                    <p className="font-semibold text-[#1A1A1A]">{SOURCE_LABELS[order.source]}</p>
                    <p className="text-sm text-[#9A9A9A] mt-0.5">{formatDate(order.created_at)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-[#F05A22]">{formatPrice(order.total)}</p>
                    <p className="text-xs text-[#9A9A9A]">incl. shipping</p>
                  </div>
                </div>

                {Array.isArray(order.items) && order.items.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[#E5E3DF]">
                    <div className="space-y-2">
                      {(order.items as Array<{ name: string; size: string; color: string; quantity: number; price: number }>).map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-[#6B6B6B]">{item.name} × {item.quantity} ({item.size})</span>
                          <span className="font-medium text-[#1A1A1A]">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">No orders yet</h3>
            <p className="text-[#6B6B6B] mb-8">Browse our shop or submit a custom request to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
