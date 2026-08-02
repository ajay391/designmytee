import type { Metadata } from "next";

export const metadata: Metadata = { title: "Shipping Policy | DesignMyTee" };

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-5xl font-black text-[#1A1A1A] mb-10">Shipping Policy</h1>
        <div className="prose text-[#6B6B6B] space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-[#1A1A1A] mb-3">Delivery Timeframes</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Standard orders:</strong> 5–7 working days after design approval and payment</li>
              <li><strong>Bulk orders (50+ pieces):</strong> 8–12 working days</li>
              <li><strong>Rush orders:</strong> Available on request — additional charges apply</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-black text-[#1A1A1A] mb-3">Shipping Coverage</h2>
            <p>We ship pan-India via trusted courier partners. Delivery times vary by location (typically 2–5 business days after dispatch).</p>
          </section>
          <section>
            <h2 className="text-xl font-black text-[#1A1A1A] mb-3">Shipping Charges</h2>
            <ul className="space-y-2 list-disc pl-5">
              <li><strong>Shop orders above ₹999:</strong> FREE shipping</li>
              <li><strong>Shop orders below ₹999:</strong> ₹99 flat</li>
              <li><strong>Custom and bulk orders:</strong> Shipping included in the quoted price</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl font-black text-[#1A1A1A] mb-3">Order Tracking</h2>
            <p>Once your order is dispatched, you&apos;ll receive a tracking number via WhatsApp/email. You can also track from your account dashboard.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
