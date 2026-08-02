"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Input";
import { formatDate, generateWhatsAppLink, getStatusLabel } from "@/lib/utils";
import {
  Send, Upload, ExternalLink, RefreshCw, ShoppingBag,
  User, Clock, Image as ImageIcon, X
} from "lucide-react";

const STATUS_OPTIONS = [
  { value: "submitted", label: "Submitted" },
  { value: "in_review", label: "In Review" },
  { value: "assigned", label: "Assigned" },
  { value: "in_progress", label: "In Progress" },
  { value: "awaiting_feedback", label: "Awaiting Customer Feedback" },
  { value: "revision_requested", label: "Revision Requested" },
  { value: "approved", label: "Approved" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
];

const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "normal", label: "Normal" },
  { value: "high", label: "High" },
  { value: "urgent", label: "Urgent" },
];

export default function DesignRequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [request, setRequest] = useState<Record<string, unknown> | null>(null);
  const [revisions, setRevisions] = useState<Record<string, unknown>[]>([]);
  const [messages, setMessages] = useState<Record<string, unknown>[]>([]);
  const [designers, setDesigners] = useState<{ id: string; name: string }[]>([]);
  const [currentUser, setCurrentUser] = useState<{ id: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [sendingMsg, setSendingMsg] = useState(false);
  const [uploadingRevision, setUploadingRevision] = useState(false);
  const [convertingToOrder, setConvertingToOrder] = useState(false);
  const [showConvertModal, setShowConvertModal] = useState(false);
  const [orderTotal, setOrderTotal] = useState("");

  // Local editable fields
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [assignedDesignerId, setAssignedDesignerId] = useState("");
  const [internalNotes, setInternalNotes] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadData = async () => {
    setLoading(true);

    const [
      { data: req },
      { data: revs },
      { data: msgs },
      { data: designerList },
      { data: { user } },
    ] = await Promise.all([
      supabase.from("design_requests")
        .select(`*, customer:profiles!design_requests_user_id_fkey(id, name, email, phone)`)
        .eq("id", id)
        .single(),
      supabase.from("design_revisions")
        .select(`*, uploader:profiles!design_revisions_uploaded_by_fkey(name, role)`)
        .eq("request_id", id)
        .order("created_at", { ascending: true }),
      supabase.from("design_messages")
        .select(`*, sender:profiles!design_messages_sender_id_fkey(name, role)`)
        .eq("request_id", id)
        .order("created_at", { ascending: true }),
      supabase.from("profiles").select("id, name").eq("role", "designer"),
      supabase.auth.getUser(),
    ]);

    if (req) {
      setRequest(req);
      setStatus(req.status);
      setPriority(req.priority);
      setAssignedDesignerId(req.assigned_designer_id ?? "");
      setInternalNotes(req.internal_notes ?? "");
    }

    setRevisions(revs ?? []);
    setMessages(msgs ?? []);
    setDesigners(designerList ?? []);

    if (user) {
      const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
      setCurrentUser({ id: user.id, role: profile?.role ?? "admin" });
    }

    setLoading(false);
  };

  const saveChanges = async () => {
    setSaving(true);
    await supabase.from("design_requests").update({
      status,
      priority,
      assigned_designer_id: assignedDesignerId || null,
      internal_notes: internalNotes,
    }).eq("id", id);
    setSaving(false);
    await loadData();
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;
    setSendingMsg(true);
    await supabase.from("design_messages").insert({
      request_id: id,
      sender_id: currentUser.id,
      sender_role: currentUser.role,
      message_text: newMessage.trim(),
    });
    setNewMessage("");
    await loadData();
    setSendingMsg(false);
  };

  const uploadRevision = async (file: File) => {
    if (!currentUser) return;
    setUploadingRevision(true);
    const ext = file.name.split(".").pop();
    const path = `revisions/${id}/${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("design-files").upload(path, file);
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("design-files").getPublicUrl(path);
      const nextVersion = revisions.length + 1;
      await supabase.from("design_revisions").insert({
        request_id: id,
        version_number: nextVersion,
        file_url: publicUrl,
        uploaded_by: currentUser.id,
        comment: `Version ${nextVersion}`,
      });
      await loadData();
    }
    setUploadingRevision(false);
  };

  const convertToOrder = async () => {
    if (!orderTotal) return;
    setConvertingToOrder(true);
    const { data: order } = await supabase.from("orders").insert({
      user_id: (request?.customer as Record<string, unknown>)?.id ?? null,
      source: "design_request",
      design_request_id: id,
      items: [],
      subtotal: parseFloat(orderTotal),
      shipping_fee: 99,
      total: parseFloat(orderTotal) + 99,
      status: "confirmed",
      payment_status: "pending",
    }).select().single();

    if (order) {
      await supabase.from("design_requests").update({ status: "completed" }).eq("id", id);
      setShowConvertModal(false);
      router.push("/admin/orders");
    }
    setConvertingToOrder(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-[#F05A22] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!request) {
    return <div className="text-center py-20 text-[#9A9A9A]">Request not found</div>;
  }

  const customer = request.customer as Record<string, string> | null;
  const referenceImages = (request.reference_images as string[]) ?? [];
  const latestRevision = revisions[revisions.length - 1] as Record<string, unknown> | undefined;

  const designerOptions = [
    { value: "", label: "— Unassigned —" },
    ...designers.map((d) => ({ value: d.id, label: d.name })),
  ];

  const whatsappMsg = `Hi ${customer?.name ?? ""}! Regarding your design request ${request.tracking_code as string} — ${getStatusLabel(status)}. ${internalNotes ? "Notes: " + internalNotes : ""}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-mono text-lg font-black text-[#F05A22]">{request.tracking_code as string}</span>
            <Badge status={status} />
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A]">{request.title as string}</h1>
          <p className="text-[#9A9A9A] text-sm mt-1">Submitted {formatDate(request.created_at as string)}</p>
        </div>
        <div className="flex gap-3">
          <a
            href={generateWhatsAppLink(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919876543210", whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#20b858] transition-colors"
          >
            WhatsApp Customer
          </a>
          {status === "approved" && (
            <Button onClick={() => setShowConvertModal(true)} icon={<ShoppingBag className="w-4 h-4" />}>
              Convert to Order
            </Button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT: Customer + Brief */}
        <div className="space-y-5">
          {/* Customer info */}
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-5">
            <h3 className="font-bold text-[#1A1A1A] mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-[#F05A22]" /> Customer
            </h3>
            {customer ? (
              <div className="space-y-2 text-sm">
                <p className="font-semibold text-[#1A1A1A]">{customer.name}</p>
                <p className="text-[#6B6B6B]">{customer.email}</p>
                {customer.phone && <p className="text-[#6B6B6B]">{customer.phone}</p>}
              </div>
            ) : (
              <p className="text-[#9A9A9A] text-sm italic">No account — guest request</p>
            )}
          </div>

          {/* Brief */}
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-5 space-y-3">
            <h3 className="font-bold text-[#1A1A1A]">Brief</h3>
            <p className="text-sm text-[#6B6B6B] leading-relaxed">{request.description as string}</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                { label: "T-shirt Type", value: request.tshirt_type as string },
                { label: "Print Placement", value: request.print_placement as string },
                { label: "Colors", value: request.preferred_colors as string },
                { label: "Quantity", value: `${request.quantity} pcs` },
                { label: "Budget", value: request.budget_range as string },
                { label: "Deadline", value: request.deadline ? formatDate(request.deadline as string) : "—" },
              ].map((item) => item.value && (
                <div key={item.label}>
                  <p className="text-[#9A9A9A] font-medium">{item.label}</p>
                  <p className="text-[#1A1A1A] font-semibold capitalize">{item.value?.replace(/-/g, " ")}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reference images */}
          {referenceImages.length > 0 && (
            <div className="bg-white rounded-2xl border border-[#E5E3DF] p-5">
              <h3 className="font-bold text-[#1A1A1A] mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#F05A22]" /> References
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {referenceImages.map((url, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block">
                    <img src={url} alt="" className="w-full aspect-square object-cover rounded-xl hover:opacity-90 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CENTER: Revisions */}
        <div className="space-y-5">
          {/* Latest revision preview */}
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#1A1A1A]">Design Revisions</h3>
              <span className="text-xs text-[#9A9A9A]">{revisions.length} version{revisions.length !== 1 ? "s" : ""}</span>
            </div>

            {latestRevision ? (
              <div>
                <div className="bg-[#F8F7F5] rounded-xl overflow-hidden mb-3">
                  <img
                    src={latestRevision.file_url as string}
                    alt={`Version ${latestRevision.version_number}`}
                    className="w-full max-h-72 object-contain"
                  />
                </div>
                <p className="text-sm font-semibold text-[#1A1A1A]">Version {latestRevision.version_number as number} (Latest)</p>
                <p className="text-xs text-[#9A9A9A] mt-0.5">
                  {formatDate(latestRevision.created_at as string)}
                </p>
                <a
                  href={latestRevision.file_url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#F05A22] text-xs font-semibold mt-2 hover:underline"
                >
                  <ExternalLink className="w-3 h-3" /> View full size
                </a>
              </div>
            ) : (
              <div className="text-center py-10 text-[#9A9A9A]">
                <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No designs uploaded yet</p>
              </div>
            )}

            {/* Upload revision */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && uploadRevision(e.target.files[0])}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full mt-4"
              loading={uploadingRevision}
              icon={<Upload className="w-4 h-4" />}
            >
              Upload New Version
            </Button>
          </div>

          {/* Version history */}
          {revisions.length > 1 && (
            <div className="bg-white rounded-2xl border border-[#E5E3DF] p-5">
              <h3 className="font-bold text-[#1A1A1A] mb-3">Version History</h3>
              <div className="space-y-2">
                {[...revisions].reverse().slice(1).map((rev) => {
                  const r = rev as Record<string, unknown>;
                  return (
                    <a
                      key={r.id as string}
                      href={r.file_url as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#F8F7F5] transition-colors"
                    >
                      <img src={r.file_url as string} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-medium text-[#1A1A1A]">Version {r.version_number as number}</p>
                        <p className="text-xs text-[#9A9A9A]">{formatDate(r.created_at as string)}</p>
                      </div>
                      <ExternalLink className="w-3 h-3 text-[#9A9A9A] ml-auto" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Controls + Messages */}
        <div className="space-y-5">
          {/* Status controls */}
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-5 space-y-4">
            <h3 className="font-bold text-[#1A1A1A]">Manage Request</h3>
            <Select
              label="Status"
              id="request-status"
              options={STATUS_OPTIONS}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
            <Select
              label="Priority"
              id="request-priority"
              options={PRIORITY_OPTIONS}
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
            <Select
              label="Assign Designer"
              id="assign-designer"
              options={designerOptions}
              value={assignedDesignerId}
              onChange={(e) => setAssignedDesignerId(e.target.value)}
            />
            <div>
              <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Internal Notes</label>
              <textarea
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                className="w-full rounded-xl border border-[#E5E3DF] px-4 py-3 text-sm outline-none focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 resize-y min-h-[80px]"
                placeholder="Notes visible only to admin/designer..."
              />
            </div>
            <Button onClick={saveChanges} loading={saving} className="w-full" icon={<RefreshCw className="w-4 h-4" />}>
              Save Changes
            </Button>
          </div>

          {/* Message thread */}
          <div className="bg-white rounded-2xl border border-[#E5E3DF] flex flex-col" style={{ height: "400px" }}>
            <div className="px-5 py-4 border-b border-[#E5E3DF]">
              <h3 className="font-bold text-[#1A1A1A]">Customer Messages</h3>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map((msg) => {
                const m = msg as Record<string, unknown>;
                const sender = m.sender as Record<string, string> | null;
                const isAdmin = sender?.role === "admin" || sender?.role === "designer";
                return (
                  <div key={m.id as string} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
                    <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                      isAdmin
                        ? "bg-[#F05A22] text-white rounded-tr-sm"
                        : "bg-[#F8F7F5] text-[#1A1A1A] rounded-tl-sm"
                    }`}>
                      {m.message_text as string}
                    </div>
                    <p className="text-xs text-[#9A9A9A] mt-1 px-1">
                      {sender?.name ?? "Unknown"} · {formatDate(m.created_at as string)}
                    </p>
                  </div>
                );
              })}
              {messages.length === 0 && (
                <p className="text-center text-[#9A9A9A] text-sm py-8">No messages yet</p>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="px-4 py-3 border-t border-[#E5E3DF] flex gap-2">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 h-9 px-3 text-sm rounded-xl border border-[#E5E3DF] focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={sendingMsg || !newMessage.trim()}
                className="w-9 h-9 bg-[#F05A22] text-white rounded-xl flex items-center justify-center hover:bg-[#C8461A] transition-colors disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Convert to Order Modal */}
      {showConvertModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-[#1A1A1A]">Convert to Order</h2>
              <button onClick={() => setShowConvertModal(false)} className="p-2 hover:bg-[#F8F7F5] rounded-xl">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-[#6B6B6B] mb-6">
              This will create a production order for <strong>{request.tracking_code as string}</strong>. Enter the agreed total price (excluding shipping).
            </p>
            <div className="mb-6">
              <label className="text-sm font-medium text-[#1A1A1A] block mb-1.5">Order Total (₹)</label>
              <input
                type="number"
                value={orderTotal}
                onChange={(e) => setOrderTotal(e.target.value)}
                className="w-full h-11 rounded-xl border border-[#E5E3DF] px-4 text-sm focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 outline-none"
                placeholder="e.g. 8400"
              />
              <p className="text-xs text-[#9A9A9A] mt-1">+ ₹99 shipping will be added automatically</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => setShowConvertModal(false)} className="flex-1">Cancel</Button>
              <Button onClick={convertToOrder} loading={convertingToOrder} className="flex-1">
                Create Order
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
