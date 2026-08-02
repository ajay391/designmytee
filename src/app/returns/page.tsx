import type { Metadata } from "next";
export const metadata: Metadata = { title: "Returns & Refunds | DesignMyTee" };
export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-5xl font-black text-[#1A1A1A] mb-10">Returns & Refunds</h1>
        <div className="space-y-6 text-sm text-[#6B6B6B] leading-relaxed">
          <p>Since all our products are custom-made to order, we generally do not accept returns unless there is a manufacturing defect or a significant error on our part.</p>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Eligible for Refund/Reprint</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Manufacturing defects (tears, holes, printing errors)</li>
              <li>Wrong item/size/color delivered (different from what was approved)</li>
              <li>Order not delivered within 30 days of dispatch</li>
            </ul>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Not Eligible for Refund</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Customer-approved design that was printed correctly</li>
              <li>Slight colour variations due to screen vs. print differences</li>
              <li>Change of mind after production has started</li>
            </ul>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">How to Request a Refund</h2>
            <p>Contact us within 48 hours of receiving your order via WhatsApp or email with photos of the defect. We&apos;ll arrange a reprint or refund within 7 business days.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
