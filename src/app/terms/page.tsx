import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service | DesignMyTee" };
export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-5xl font-black text-[#1A1A1A] mb-10">Terms of Service</h1>
        <div className="space-y-6 text-sm text-[#6B6B6B] leading-relaxed">
          <p>By using DesignMyTee, you agree to these terms.</p>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Intellectual Property</h2>
            <p>You confirm that reference images and design ideas you submit are either your own, copyright-free, or used with the rights holder&apos;s permission. DesignMyTee is not liable for copyright infringement caused by customer-supplied content.</p>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Order Approval</h2>
            <p>By approving a design concept, you confirm it is correct and ready for production. Changes after approval may incur additional charges.</p>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Payments</h2>
            <p>All prices are in Indian Rupees (₹). Payment is required before production begins. We use Razorpay for secure payment processing.</p>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Limitation of Liability</h2>
            <p>DesignMyTee&apos;s maximum liability is limited to the amount paid for the specific order in question.</p>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Governing Law</h2>
            <p>These terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Kochi, Kerala.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
