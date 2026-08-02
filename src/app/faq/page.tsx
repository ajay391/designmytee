import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | DesignMyTee",
  description: "Frequently asked questions about custom t-shirt printing at DesignMyTee — process, pricing, delivery, and more.",
};

const faqs = [
  {
    category: "The Process",
    questions: [
      { q: "How does the custom request process work?", a: "You submit a request with your idea and reference images. We review it, assign a designer, and upload a concept for your feedback. Once you approve, we print and deliver." },
      { q: "Do I need to have a design ready?", a: "No. We create the design from your idea. Even a rough sketch, a reference photo, or a description is enough to start." },
      { q: "How many revisions do I get?", a: "We offer revisions until you're happy with the design before approving it for print." },
      { q: "How long does the whole process take?", a: "Typically 5–7 working days after design approval. Bulk orders may take 8–12 days. Rush options available — ask us." },
    ],
  },
  {
    category: "Pricing & Orders",
    questions: [
      { q: "What's the minimum order quantity?", a: "No minimum for custom requests — even one piece. For bulk discounts, 10+ pieces." },
      { q: "How is pricing determined?", a: "Pricing depends on the garment type, quantity, fabric, and printing method. We'll give you an exact quote once we review your brief." },
      { q: "Do you offer bulk discounts?", a: "Yes — the more you order, the lower the per-piece price. Use our bulk order form for a quote." },
      { q: "What payment methods do you accept?", a: "We accept all major UPI, debit/credit cards, and net banking via Razorpay. COD is not available." },
    ],
  },
  {
    category: "Printing & Quality",
    questions: [
      { q: "What printing methods do you use?", a: "DTF (Direct to Film), sublimation, screen printing, and embroidery — we recommend the best method based on your design and fabric." },
      { q: "What fabrics do you print on?", a: "We work with 100% cotton, cotton-polyester blends, and 100% polyester (for sublimation). GSM ranges from 180 to 320 depending on the garment." },
      { q: "Will the print fade?", a: "When properly cared for (cold wash, inside-out), our prints retain their quality for 50+ washes." },
    ],
  },
  {
    category: "Delivery",
    questions: [
      { q: "Where do you deliver?", a: "Pan-India shipping. We're based in Kochi, Kerala, and deliver to all major cities and most pin codes." },
      { q: "How long does delivery take?", a: "2–5 business days after dispatch, depending on your location." },
      { q: "Is there free shipping?", a: "Yes — free shipping on shop orders above ₹999. Shipping on custom orders is calculated at checkout." },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#F05A22] font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h1 className="text-5xl font-black text-[#1A1A1A] mt-3">Frequently Asked Questions</h1>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="text-xl font-black text-[#1A1A1A] mb-4 pl-1">{section.category}</h2>
              <div className="space-y-3">
                {section.questions.map((faq, i) => (
                  <details key={i} className="group bg-[#F8F7F5] rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-semibold text-[#1A1A1A] list-none">
                      {faq.q}
                      <ChevronDown className="w-5 h-5 text-[#9A9A9A] group-open:rotate-180 transition-transform flex-shrink-0 ml-4" />
                    </summary>
                    <div className="px-6 pb-5">
                      <p className="text-[#6B6B6B] text-sm leading-relaxed">{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 bg-[#F05A22] rounded-3xl p-8 text-center text-white">
          <h2 className="text-2xl font-black mb-2">Still have questions?</h2>
          <p className="text-white/80 mb-6">Chat with us on WhatsApp — we reply within the hour.</p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-[#F05A22] font-bold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
