import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";

export const metadata = { title: "My Design Requests | DesignMyTee" };

export default async function AccountDesignRequestsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirectTo=/account/design-requests");

  const { data: requests } = await supabase
    .from("design_requests")
    .select(`*, designer:profiles!design_requests_assigned_designer_id_fkey(name)`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210";

  return (
    <div className="min-h-screen bg-[#F8F7F5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1A1A1A]">My Design Requests</h1>
            <p className="text-[#6B6B6B] mt-1">Track the status of your custom orders</p>
          </div>
          <Link
            href="/custom-request"
            className="bg-[#F05A22] text-white font-bold px-5 py-2.5 rounded-xl hover:bg-[#C8461A] transition-colors text-sm"
          >
            + New Request
          </Link>
        </div>

        {(requests ?? []).length > 0 ? (
          <div className="space-y-4">
            {(requests ?? []).map((req) => {
              const designer = Array.isArray(req.designer) ? req.designer[0] : req.designer;
              const waMsg = `Hi! Following up on my custom request ${req.tracking_code} — "${req.title}". Could you give me a status update?`;
              return (
                <div
                  key={req.id}
                  className="bg-white rounded-2xl border border-[#E5E3DF] p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono font-black text-[#F05A22]">{req.tracking_code}</span>
                        <Badge status={req.status} />
                      </div>
                      <h3 className="font-bold text-[#1A1A1A] text-lg">{req.title}</h3>
                      <div className="flex flex-wrap gap-4 mt-3 text-sm text-[#6B6B6B]">
                        <span>Qty: <strong>{req.quantity}</strong></span>
                        {req.tshirt_type && <span>Type: <strong className="capitalize">{req.tshirt_type.replace(/-/g, " ")}</strong></span>}
                        {designer?.name && <span>Designer: <strong>{designer.name}</strong></span>}
                        <span>Submitted: <strong>{formatDate(req.created_at)}</strong></span>
                        <span>Updated: <strong>{formatDate(req.updated_at)}</strong></span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <a
                        href={`https://wa.me/${wa}?text=${encodeURIComponent(waMsg)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 rounded-xl text-xs font-semibold hover:bg-[#25D366] hover:text-white transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Status progress */}
                  <div className="mt-5 pt-4 border-t border-[#E5E3DF]">
                    <div className="flex items-center gap-1 overflow-x-auto">
                      {["submitted", "in_review", "assigned", "in_progress", "awaiting_feedback", "approved", "completed"].map((step, i, arr) => {
                        const stepIndex = arr.indexOf(req.status);
                        const currentIndex = i;
                        const isDone = currentIndex < stepIndex;
                        const isCurrent = currentIndex === stepIndex;
                        return (
                          <div key={step} className="flex items-center gap-1">
                            <div className={`flex-shrink-0 w-2 h-2 rounded-full ${isDone ? "bg-[#F05A22]" : isCurrent ? "bg-[#F05A22] ring-4 ring-[#F05A22]/20" : "bg-[#E5E3DF]"}`} />
                            {i < arr.length - 1 && (
                              <div className={`h-0.5 w-6 ${isDone ? "bg-[#F05A22]" : "bg-[#E5E3DF]"}`} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-3">No requests yet</h3>
            <p className="text-[#6B6B6B] mb-8">Submit your first custom design request and we&apos;ll get started.</p>
            <Link href="/custom-request" className="bg-[#F05A22] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#C8461A] transition-colors">
              Start a Custom Request
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
