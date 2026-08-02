import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | DesignMyTee" };
export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-5xl font-black text-[#1A1A1A] mb-10">Privacy Policy</h1>
        <div className="space-y-6 text-sm text-[#6B6B6B] leading-relaxed">
          <p>Last updated: {new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</p>
          <p>DesignMyTee (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This policy describes how we collect, use, and protect your personal data.</p>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Data We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Account information (name, email, phone) when you register</li>
              <li>Order and shipping details when you place an order</li>
              <li>Design files and reference images you upload</li>
              <li>Payment information (processed securely by Razorpay — we never store card details)</li>
            </ul>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">How We Use Your Data</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To process and fulfil your orders</li>
              <li>To communicate order status updates</li>
              <li>To improve our services</li>
            </ul>
          </section>
          <section><h2 className="text-xl font-black text-[#1A1A1A] mb-3">Contact</h2>
            <p>For any privacy concerns, email us at <a href="mailto:hello@designmytee.in" className="text-[#F05A22] hover:underline">hello@designmytee.in</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
