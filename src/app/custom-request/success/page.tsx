"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, MessageCircle, ArrowRight } from "lucide-react";
import { useState, Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const code = params.get("code") ?? "DMT-XXXX";
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappMsg = `Hi! I just submitted a custom t-shirt request. My tracking code is ${code}. Could you give me an update?`;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

  return (
    <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Success icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <span className="absolute -top-2 -right-2 w-8 h-8 bg-[#F05A22] rounded-full flex items-center justify-center text-white text-lg">
            🎉
          </span>
        </div>

        <h1 className="text-4xl font-black text-[#1A1A1A] mb-3">Request Submitted!</h1>
        <p className="text-[#6B6B6B] max-w-sm mx-auto">
          Your design request has been received. Our team will review it and assign a designer within a few hours.
        </p>

        {/* Tracking code */}
        <div className="bg-white rounded-3xl border-2 border-[#F05A22]/30 p-8 mt-10 mb-6">
          <p className="text-sm text-[#9A9A9A] mb-2 font-medium">Your Tracking Code</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-black text-[#F05A22] tracking-wider">{code}</span>
            <button
              onClick={copyCode}
              className="p-2 rounded-xl hover:bg-[#F8F7F5] transition-colors text-[#9A9A9A] hover:text-[#F05A22]"
              title="Copy tracking code"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-[#9A9A9A] mt-3">
            Save this code to track your request status
          </p>
        </div>

        {/* What happens next */}
        <div className="bg-white rounded-3xl border border-[#E5E3DF] p-7 mb-8 text-left">
          <h3 className="font-bold text-[#1A1A1A] mb-4">What happens next?</h3>
          <div className="space-y-3">
            {[
              { step: "1", text: "Admin reviews your brief (within a few hours)" },
              { step: "2", text: "A designer is assigned to your request" },
              { step: "3", text: "Designer uploads the concept for your feedback" },
              { step: "4", text: "Once you approve, we start printing" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#F05A22] text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  {item.step}
                </span>
                <p className="text-sm text-[#6B6B6B]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://wa.me/${wa}?text=${encodeURIComponent(whatsappMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#20b858] transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Follow up on WhatsApp
          </a>
          <Link
            href="/account/design-requests"
            className="flex items-center justify-center gap-2 bg-[#F05A22] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#C8461A] transition-colors"
          >
            View My Requests <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-[#9A9A9A]">
          Want to submit another request?{" "}
          <Link href="/custom-request" className="text-[#F05A22] font-semibold hover:underline">
            Start a new one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F7F5] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#F05A22] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
