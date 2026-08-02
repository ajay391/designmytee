"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ArrowRight, MessageCircle, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";

const productTypes = [
  { value: "oversized-tshirt", label: "Oversized T-shirt" },
  { value: "regular-tshirt", label: "Regular Fit T-shirt" },
  { value: "polo", label: "Polo / Collar T-shirt" },
  { value: "hoodie", label: "Hoodie / Sweatshirt" },
  { value: "jersey", label: "Sports Jersey" },
  { value: "mixed", label: "Mixed / Multiple types" },
];

const fabricOptions = [
  { value: "100-cotton", label: "100% Cotton" },
  { value: "cotton-polyester", label: "Cotton-Polyester Blend" },
  { value: "polyester", label: "100% Polyester (for sublimation)" },
  { value: "not-sure", label: "Not sure — advise me" },
];

const printTypes = [
  { value: "dtf", label: "DTF (Direct to Film)" },
  { value: "sublimation", label: "Sublimation" },
  { value: "screen", label: "Screen Printing" },
  { value: "embroidery", label: "Embroidery" },
  { value: "not-sure", label: "Not sure — advise me" },
];

const discountTiers = [
  { qty: "10–49 Pcs", discount: "10% OFF", desc: "Small groups, fest coordinators & clubs", badge: "TIER 01" },
  { qty: "50–99 Pcs", discount: "20% OFF", desc: "Corporate teams, department batches", badge: "TIER 02" },
  { qty: "100–499 Pcs", discount: "35% OFF", desc: "College fests & major events", badge: "TIER 03" },
  { qty: "500+ Pcs", discount: "CUSTOM B2B", desc: "Wholesale & brand manufacturing", badge: "VIP B2B" },
];

const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export default function BulkOrderPage() {
  const [form, setForm] = useState({
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    product_type: "",
    quantity: "",
    fabric: "",
    print_type: "",
    notes: "",
  });
  const [sizeMix, setSizeMix] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const totalFromSizes = Object.values(sizeMix).reduce((a, b) => a + (b || 0), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { error: insertError } = await supabase.from("bulk_requests").insert({
      user_id: user?.id ?? null,
      contact_name: form.contact_name,
      contact_phone: form.contact_phone,
      contact_email: form.contact_email,
      product_type: form.product_type,
      quantity: parseInt(form.quantity) || totalFromSizes,
      fabric: form.fabric,
      print_type: form.print_type,
      size_mix: sizeMix,
      notes: form.notes,
    });

    if (insertError) {
      setError("Failed to submit. Please try WhatsApp instead.");
      setLoading(false);
      return;
    }

    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    const waMsg = `Hi! I just submitted a bulk order request on the website. Name: ${form.contact_name}, Qty: ${form.quantity || totalFromSizes}, Type: ${form.product_type}. Please send me a quote.`;
    return (
      <div className="min-h-screen bg-[#FAF9F6] text-[#141414] flex items-center justify-center px-4 py-20 font-sans">
        <div className="max-w-lg w-full text-center bg-white border border-[#EAEAEA] rounded-[24px] p-10 shadow-2xl space-y-6">
          <div className="w-20 h-20 bg-[#F05A22]/10 border-2 border-[#F05A22] rounded-3xl flex items-center justify-center mx-auto shadow-md">
            <CheckCircle className="w-10 h-10 text-[#F05A22]" />
          </div>
          <h1 className="text-3xl font-black text-[#141414] uppercase tracking-tight">Bulk Request Submitted!</h1>
          <p className="text-[#666666] font-medium text-sm max-w-sm mx-auto leading-relaxed">
            Our Kochi studio team will calculate your volume discount and send a official PDF quote to <strong>{form.contact_email}</strong> within 24 hours.
          </p>
          <div className="pt-4">
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5" /> Direct WhatsApp Quick Quote
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141414] font-sans">
      
      {/* Dark Hero Section */}
      <section className="py-20 bg-[#121212] text-white relative overflow-hidden border-b border-white/10">
        {/* Background Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <span className="text-[22vw] font-black tracking-tighter text-white/[0.02] uppercase leading-none font-mono">
            BULK MERCH
          </span>
          <div className="absolute w-[500px] h-[500px] bg-[#F05A22]/15 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F05A22]/15 border border-[#F05A22]/30 text-[#F05A22] rounded-full px-4.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Kochi Studio B2B Quotes
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            VOLUME PRINTS & <span className="text-[#F05A22]">COLLEGE FESTS</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Tiered volume discounts for 10+ pieces. Free vector artwork setup, fabric GSM calibration & doorstep delivery pan-India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        
        {/* Discount Tier Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {discountTiers.map((tier) => (
            <div key={tier.qty} className="bg-white rounded-[24px] border border-[#EAEAEA] p-6 shadow-md shadow-black/[0.03] space-y-2 hover:border-[#F05A22] hover:-translate-y-1 transition-all">
              <span className="text-[10px] font-mono font-bold bg-[#F05A22]/10 text-[#F05A22] px-3 py-1 rounded-full inline-block">
                {tier.badge}
              </span>
              <h3 className="text-2xl font-black text-[#141414] uppercase tracking-tight">{tier.discount}</h3>
              <p className="text-xs font-mono font-bold text-[#F05A22]">{tier.qty}</p>
              <p className="text-xs text-[#666666] font-medium">{tier.desc}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. Contact Details */}
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-8 sm:p-10 space-y-6 shadow-xl shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
              <h2 className="font-black text-[#141414] text-xl uppercase tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#F05A22] text-white flex items-center justify-center text-xs font-mono">01</span>
                Contact Information
              </h2>
              <span className="text-xs font-mono text-[#666666] font-bold">STEP 01/03</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                id="bulk-name"
                value={form.contact_name}
                onChange={(e) => handleChange("contact_name", e.target.value)}
                placeholder="Arjun Menon"
                required
              />
              <Input
                label="Phone Number"
                id="bulk-phone"
                type="tel"
                value={form.contact_phone}
                onChange={(e) => handleChange("contact_phone", e.target.value)}
                placeholder="+91 98765 43210"
                required
              />
            </div>

            <Input
              label="Email Address (for PDF Quote)"
              id="bulk-email"
              type="email"
              value={form.contact_email}
              onChange={(e) => handleChange("contact_email", e.target.value)}
              placeholder="arjun@college.edu"
              required
            />
          </div>

          {/* 2. Product Specs */}
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-8 sm:p-10 space-y-6 shadow-xl shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
              <h2 className="font-black text-[#141414] text-xl uppercase tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#F05A22] text-white flex items-center justify-center text-xs font-mono">02</span>
                Apparel & Quantity Specs
              </h2>
              <span className="text-xs font-mono text-[#666666] font-bold">STEP 02/03</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Product Type"
                id="product-type"
                options={productTypes}
                value={form.product_type}
                onChange={(e) => handleChange("product_type", e.target.value)}
                placeholder="Select type..."
                required
              />
              <Input
                label="Estimated Total Quantity"
                id="bulk-quantity"
                type="number"
                min="10"
                value={form.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                placeholder="e.g. 120"
                hint="Min 10 pieces for bulk rate discount"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="Fabric Preference"
                id="bulk-fabric"
                options={fabricOptions}
                value={form.fabric}
                onChange={(e) => handleChange("fabric", e.target.value)}
                placeholder="Select fabric..."
              />
              <Select
                label="Print Technique"
                id="bulk-print-type"
                options={printTypes}
                value={form.print_type}
                onChange={(e) => handleChange("print_type", e.target.value)}
                placeholder="Select technique..."
              />
            </div>
          </div>

          {/* 3. Size Matrix Breakdown */}
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-8 sm:p-10 space-y-6 shadow-xl shadow-black/[0.03]">
            <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
              <h2 className="font-black text-[#141414] text-xl uppercase tracking-tight flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#F05A22] text-white flex items-center justify-center text-xs font-mono">03</span>
                Size Matrix Breakdown (Optional)
              </h2>
              <span className="text-xs font-mono text-[#666666]">MIX & MATCH</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {SIZES.map((size) => (
                <div key={size} className="text-center bg-[#FAF9F6] p-3 rounded-2xl border border-[#EAEAEA]">
                  <label className="text-xs font-mono font-bold text-[#141414] block mb-1.5">{size}</label>
                  <input
                    type="number"
                    min="0"
                    value={sizeMix[size] || ""}
                    onChange={(e) =>
                      setSizeMix((prev) => ({
                        ...prev,
                        [size]: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full h-10 rounded-xl border border-[#EAEAEA] bg-white text-center text-sm font-bold text-[#141414] focus:border-[#F05A22] focus:ring-2 focus:ring-[#F05A22]/20 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>

            {totalFromSizes > 0 && (
              <div className="inline-flex items-center gap-2 bg-[#F05A22]/10 text-[#F05A22] border border-[#F05A22]/30 px-4 py-2 rounded-full font-mono text-xs font-bold">
                ⚡ Total pieces calculated: {totalFromSizes} pieces
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-8 sm:p-10 shadow-xl shadow-black/[0.03]">
            <Textarea
              label="Additional Order Notes"
              id="bulk-notes"
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              placeholder="Tell us about deadlines, color splits, logo placements or special packaging requirements..."
              className="min-h-[120px]"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-6 py-4 rounded-2xl font-medium">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            loading={loading}
            className="w-full bg-[#F05A22] hover:bg-[#C8461A] text-white font-black text-sm uppercase tracking-wider py-4 rounded-full shadow-xl shadow-[#F05A22]/20"
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
          >
            Submit Bulk Quote Request
          </Button>

          <p className="text-center text-xs text-[#666666] font-medium">
            Need urgent assistance?{" "}
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent("Hi! I want to place a bulk order for custom t-shirts.")}`}
              className="text-[#F05A22] font-bold hover:underline"
            >
              Chat on WhatsApp with a Kochi Studio Rep
            </a>
          </p>
        </form>

      </div>
    </div>
  );
}
