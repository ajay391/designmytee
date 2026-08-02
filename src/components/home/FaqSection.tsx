"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, MessageSquare, Zap, ArrowRight } from "lucide-react";

const faqs = [
  {
    num: "01",
    q: "What is the minimum order quantity for custom designs?",
    a: "No minimum order quantity! You can order a single custom t-shirt or thousands. For bulk orders (10+ pieces), volume discount rates apply automatically in your quote.",
    tag: "MOQ Specs",
  },
  {
    num: "02",
    q: "How long does the design and delivery process take?",
    a: "First 3D vector design concepts are uploaded to your dashboard within 24–48 hours. Once approved by you, precision printing and express delivery take 5–7 working days pan-India.",
    tag: "Turnaround",
  },
  {
    num: "03",
    q: "What if I only have a rough sketch or photo reference?",
    a: "That's perfect. Our human graphic designers redraw, vectorise, and polish your rough ideas into print-ready 300 DPI vector artwork at no extra cost.",
    tag: "Vector Artwork",
  },
  {
    num: "04",
    q: "Which printing methods do you support?",
    a: "We calibrate industrial DTF (Direct to Film), full-bleed sublimation, screen printing, and high-density embroidery based on your fabric choice and design details.",
    tag: "Techniques",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 bg-[#F6F4F1] text-[#141414] relative overflow-hidden border-b border-[#EAEAEA]">
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
        <span className="text-[22vw] font-black tracking-tighter text-black/[0.03] uppercase leading-none font-mono">
          QUESTIONS
        </span>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#F05A22]/10 border border-[#F05A22]/20 text-[#F05A22] rounded-full px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
            <Zap className="w-3.5 h-3.5" /> Studio FAQs & Support
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#141414] leading-none">
            FREQUENTLY ASKED <span className="text-[#F05A22]">QUESTIONS</span>
          </h2>
          <p className="text-[#666666] text-sm font-medium max-w-md mx-auto">
            Everything you need to know about our custom print process, vector proofing & express delivery.
          </p>
        </div>

        {/* Minimal Luxury Light Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.num}
                className={`rounded-[24px] border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-white border-[#F05A22] shadow-xl shadow-[#F05A22]/10"
                    : "bg-white border-[#EAEAEA] hover:border-black/20 shadow-sm"
                }`}
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-4 sm:gap-6 pr-4">
                    <span
                      className={`font-mono text-sm sm:text-base font-black px-3.5 py-1 rounded-xl transition-colors ${
                        isOpen
                          ? "bg-[#F05A22] text-white"
                          : "bg-[#FAF9F6] text-[#666666] border border-[#EAEAEA]"
                      }`}
                    >
                      {faq.num}
                    </span>
                    <h3 className="font-bold text-[#141414] text-base sm:text-lg leading-snug">
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all flex-shrink-0 ${
                      isOpen
                        ? "bg-[#F05A22] border-[#F05A22] text-white rotate-180"
                        : "border-[#EAEAEA] bg-[#FAF9F6] text-[#666666]"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 pl-16 sm:pl-20 border-t border-[#EAEAEA] space-y-3">
                    <p className="text-[#666666] text-sm sm:text-base leading-relaxed font-medium">
                      {faq.a}
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono font-bold bg-[#FAF9F6] text-[#F05A22] border border-[#F05A22]/30 px-3 py-1 rounded-full uppercase">
                        TAG: {faq.tag}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Studio Support Helper Band */}
        <div className="bg-white border border-[#EAEAEA] p-6 rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md shadow-black/[0.03]">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-2xl bg-[#F05A22]/10 border border-[#F05A22]/20 text-[#F05A22] flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-[#141414] text-sm">Have a unique design or bulk question?</p>
              <p className="text-xs text-[#666666] font-mono">Chat directly with a Kochi studio designer on WhatsApp</p>
            </div>
          </div>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-black font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-md flex-shrink-0"
          >
            WhatsApp Support <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
