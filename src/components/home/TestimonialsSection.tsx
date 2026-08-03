"use client";

import { Star, Quote, Sparkles, Award } from "lucide-react";

const testimonials = [
  {
    name: "Arjun Menon",
    role: "NSS Fest Coordinator, MEC Thrissur",
    rating: 5,
    text: "Ordered 120 jerseys for our college fest. The designer nailed our logo on the first revision and delivered 2 days ahead of schedule.",
    avatar: "A",
    tag: "College Fest Batch",
    metric: "120 Jerseys · Delivered in 5 Days",
  },
  {
    name: "Priya Nair",
    role: "Founder, KiloEats Kochi",
    rating: 5,
    text: "Got 50 company polo tees. Having a real human designer tweak our logo placement made all the difference.",
    avatar: "P",
    tag: "Corporate Team",
    metric: "50 Embroidered Polos",
  },
  {
    name: "Rahul Krishnan",
    role: "FC Kochi Youth Coach",
    rating: 5,
    text: "Best jersey quality we've used in 4 seasons. The sublimation print hasn't faded even after 20 heavy matches.",
    avatar: "R",
    tag: "Sports Sublimation",
    metric: "4 Seasons · Zero Print Fade",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-28 bg-white text-[#141414] relative overflow-hidden border-b border-[#EAEAEA]">
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
        <span className="text-[20vw] font-black tracking-tighter text-black/[0.03] uppercase leading-none font-mono">
          REVIEWS
        </span>
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F05A22]/10 border border-[#F05A22]/20 text-[#F05A22] rounded-full px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Client Reviews & Case Studies
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#141414] leading-none">
              TRUSTED BY TEAMS & <span className="text-[#F05A22]">FESTS</span>
            </h2>
          </div>

          {/* Rating Pill */}
          <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 bg-[#FAF9F6] border border-[#EAEAEA] rounded-2xl px-4 sm:px-5 py-2.5 sm:py-3 text-[11px] sm:text-xs font-mono text-[#666666] shadow-sm whitespace-nowrap">
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 fill-amber-500 flex-shrink-0" />
              <span className="text-[#141414] font-black text-xs sm:text-sm">4.9 / 5.0</span>
            </div>
            <span className="w-1 h-1 bg-[#EAEAEA] rounded-full hidden sm:block" />
            <span className="font-semibold text-[#141414] whitespace-nowrap">340+ Reviews</span>
            <span className="w-1 h-1 bg-[#EAEAEA] rounded-full hidden sm:block" />
            <span className="text-[#F05A22] font-black whitespace-nowrap">100% Satisfaction</span>
          </div>
        </div>

        {/* 3 High-End Review Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="group relative bg-[#FAF9F6] border border-[#EAEAEA] hover:border-[#F05A22] rounded-[24px] p-8 shadow-sm hover:shadow-xl hover:shadow-[#F05A22]/10 transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="space-y-5">
                {/* Header Tag & Rating */}
                <div className="flex items-center justify-between">
                  <span className="bg-[#F05A22]/10 text-[#F05A22] border border-[#F05A22]/20 text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full">
                    {t.tag}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <p className="text-[#141414] text-sm sm:text-base leading-relaxed font-medium pt-2">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Footer Author Info */}
              <div className="space-y-4 pt-6 border-t border-[#EAEAEA] mt-6">
                <div className="text-[11px] font-mono text-[#666666] font-semibold">
                  ⚡ {t.metric}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#F05A22] text-white rounded-2xl flex items-center justify-center font-bold text-xs shadow-md shadow-[#F05A22]/20">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#141414] text-sm group-hover:text-[#F05A22] transition-colors">
                      {t.name}
                    </p>
                    <p className="text-[#666666] text-xs font-mono">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
