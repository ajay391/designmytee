import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact DesignMyTee | Kochi Custom T-Shirt Printing",
  description: "Get in touch with DesignMyTee for custom t-shirt printing queries, bulk orders, or support. Chat with us on WhatsApp for the fastest response.",
};

const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F5] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <span className="text-[#F05A22] font-semibold text-sm uppercase tracking-widest">Contact</span>
          <h1 className="text-5xl font-black text-[#1A1A1A] mt-3">Get in Touch</h1>
          <p className="text-[#6B6B6B] mt-4 max-w-md mx-auto">
            Fastest response: WhatsApp. We typically reply within an hour during business hours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact cards */}
          <div className="space-y-4">
            <a
              href={`https://wa.me/${wa}?text=${encodeURIComponent("Hi! I have a question about custom t-shirt printing.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-[#25D366] text-white rounded-2xl p-6 hover:bg-[#20b858] transition-colors"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-lg">Chat on WhatsApp</p>
                <p className="text-white/80 text-sm">Fastest response — reply within 1 hour</p>
              </div>
            </a>

            {[
              { Icon: Phone, label: "Call Us", value: "+91 98765 43210", href: "tel:+919876543210" },
              { Icon: Mail, label: "Email", value: "hello@designmytee.in", href: "mailto:hello@designmytee.in" },
              { Icon: MapPin, label: "Location", value: "Kochi, Kerala, India", href: "#" },
            ].map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-5 bg-white rounded-2xl p-6 border border-[#E5E3DF] hover:border-[#F05A22] hover:shadow-sm transition-all"
              >
                <div className="w-12 h-12 bg-[#F05A22]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#F05A22]" />
                </div>
                <div>
                  <p className="text-sm text-[#9A9A9A] font-medium">{label}</p>
                  <p className="font-semibold text-[#1A1A1A]">{value}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Hours + Info */}
          <div className="bg-white rounded-2xl border border-[#E5E3DF] p-8">
            <h2 className="font-black text-[#1A1A1A] text-xl mb-6">Business Hours</h2>
            <div className="space-y-3">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM" },
                { day: "Saturday", hours: "10:00 AM – 5:00 PM" },
                { day: "Sunday", hours: "WhatsApp only" },
              ].map(({ day, hours }) => (
                <div key={day} className="flex justify-between py-3 border-b border-[#F8F7F5] text-sm">
                  <span className="font-medium text-[#1A1A1A]">{day}</span>
                  <span className="text-[#6B6B6B]">{hours}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#F8F7F5] rounded-xl p-5">
              <p className="font-bold text-[#1A1A1A] mb-2">For bulk orders</p>
              <p className="text-sm text-[#6B6B6B]">
                Fill in our{" "}
                <a href="/bulk-order" className="text-[#F05A22] font-semibold hover:underline">bulk order form</a>
                {" "}and we&apos;ll get back with a quote within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
