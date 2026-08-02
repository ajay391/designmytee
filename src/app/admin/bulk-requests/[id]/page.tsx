"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatDate, generateWhatsAppLink } from "@/lib/utils";
import { CheckCircle, MessageCircle } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "new", label: "New" },
  { value: "quoted", label: "Quote Sent" },
  { value: "accepted", label: "Accepted" },
  { value: "converted", label: "Converted to Order" },
  { value: "closed", label: "Closed" },
];

export default function BulkRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [request, setRequest] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [quotedPrice, setQuotedPrice] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);

  useEffect(() => {
    supabase.from("bulk_requests").select("*").eq("id", id).single().then(({ data }) => {
      if (data) {
        setRequest(data);
        setStatus(data.status);
        setQuotedPrice(data.quoted_price?.toString() ?? "");
        setAdminNotes(data.admin_notes ?? "");
      }
      setLoading(false);
    });
  }, [id]);

  const save = async () => {
    setSaving(true);
    await supabase.from("bulk_requests").update({
      status,
      quoted_price: quotedPrice ? parseFloat(quotedPrice) : null,
      admin_notes: adminNotes,
    }).eq("id", id);
    setSaving(false);
  };

  const convertToOrder = async () => {
    if (!request) return;
    setConverting(true);
    await supabase.from("orders").insert({
      source: "bulk_request",
      bulk_request_id: id,
      items: [],
      subtotal: parseFloat(quotedPrice) || 0,
      shipping_fee: 0,
      total: parseFloat(quotedPrice) || 0,
      status: "confirmed",
      payment_status: "pending",
    });
    await supabase.from("bulk_requests").update({ status: "converted" }).eq("id", id);
    setConverting(false);
    router.push("/admin/orders");
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-[#F05A22] border-t-transparent rounded-full animate-spin" /></div>;
  if (!request) return <div className="text-center py-20 text-[#9A9A9A]">Not found</div>;

  const sizeMix = request.size_mix as Record<string, number> ?? {};
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210";
  const quoteMsg = `Hi ${request.contact_name}! Your bulk order request for ${request.quantity} ${request.product_type} has been reviewed. Our quote: ₹${quotedPrice || "TBD"} total. Please confirm to proceed.`;
  const whatsappLink = `https://wa.me/${(request.contact_phone as string).replace(/\D/g, "")}?text=${encodeURIComponent(quoteMsg)}`;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">Bulk Request</h1>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-[#6B6B6B] text-sm">{formatDate(request.created_at as string)}</p>
            <Badge status={status} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact + Specs */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-4">Contact</h3>
            <div className="space-y-2 text-sm">
              <p className="font-semibold text-[#1A1A1A]">{request.contact_name as string}</p>
              <p className="text-[#6B6B6B]">{request.contact_email as string}</p>
              <p className="text-[#6B6B6B]">{request.contact_phone as string}</p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 mt-4 bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#20b858] transition-colors w-fit"
            >
              <MessageCircle className="w-4 h-4" /> Send Quote on WhatsApp
            </a>
          </div>

          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-6">
            <h3 className="font-bold text-[#1A1A1A] mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "Product Type", value: request.product_type as string },
                { label: "Quantity", value: `${request.quantity} pcs` },
                { label: "Fabric", value: request.fabric as string },
                { label: "Print Type", value: request.print_type as string },
              ].map((item) => (
                <div key={item.label}>
                  <p className="text-[#9A9A9A] text-xs font-medium">{item.label}</p>
                  <p className="text-[#1A1A1A] font-semibold capitalize mt-0.5">{item.value?.replace(/-/g, " ") ?? "—"}</p>
                </div>
              ))}
            </div>
            {Object.keys(sizeMix).length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-medium text-[#9A9A9A] mb-2">Size Mix</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(sizeMix).map(([size, qty]) => (
                    <span key={size} className="px-3 py-1 bg-[#F8F7F5] rounded-lg text-sm font-medium">
                      {size}: <span className="text-[#F05A22]">{qty}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
            {(request.notes as string | null) && (
              <div className="mt-4">
                <p className="text-xs font-medium text-[#9A9A9A] mb-1">Notes</p>
                <p className="text-sm text-[#6B6B6B] leading-relaxed">{request.notes as string}</p>
              </div>
            )}
          </div>
        </div>

        {/* Admin Controls */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-6 space-y-4">
            <h3 className="font-bold text-[#1A1A1A]">Respond to Request</h3>
            <div>
              <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full h-11 rounded-xl border border-[#E5E3DF] px-4 text-sm outline-none focus:border-[#F05A22]"
              >
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Quoted Price (₹)</label>
              <input
                type="number"
                value={quotedPrice}
                onChange={(e) => setQuotedPrice(e.target.value)}
                className="w-full h-11 rounded-xl border border-[#E5E3DF] px-4 text-sm outline-none focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20"
                placeholder="Total price for entire bulk order"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Internal Notes</label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full rounded-xl border border-[#E5E3DF] px-4 py-3 text-sm outline-none focus:border-[#F05A22] resize-y min-h-[80px]"
                placeholder="Admin-only notes..."
              />
            </div>
            <Button onClick={save} loading={saving} className="w-full">Save Changes</Button>
          </div>

          {status === "accepted" && quotedPrice && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="text-sm font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Customer has accepted the quote
              </p>
              <Button onClick={convertToOrder} loading={converting} className="w-full">
                Convert to Production Order
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
