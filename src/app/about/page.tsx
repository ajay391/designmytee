import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowUpRight, CheckCircle, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "About DesignMyTee | Custom T-Shirt Printing in Kochi",
  description: "DesignMyTee is Kochi's custom t-shirt printing service. We turn your ideas into premium prints — for individuals, teams, and businesses.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141414] font-sans">
      
      {/* ====== 1. HERO SECTION (Dark Theme) ====== */}
      <section className="py-24 bg-[#121212] text-white relative overflow-hidden border-b border-white/10">
        {/* Background Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <span className="text-[20vw] font-black tracking-tighter text-white/[0.02] uppercase leading-none font-mono">
            KOCHI STUDIO
          </span>
          <div className="absolute w-[500px] h-[500px] bg-[#F05A22]/15 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 bg-[#F05A22]/15 border border-[#F05A22]/30 text-[#F05A22] rounded-full px-4.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Kochi Studio Philosophy
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            FROM CONCEPT TO <span className="text-[#F05A22]">COTTON</span>
          </h1>
          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            We believe every T-shirt should tell a story. At DesignMyTee, we turn your raw sketches into 300 DPI vector artwork, calibrated for 100% combed cotton.
          </p>
        </div>
      </section>

      {/* ====== 2. THREE PILLARS (Light Theme) ====== */}
      <section className="py-28 bg-[#FAF9F6] text-[#141414] relative overflow-hidden border-b border-[#EAEAEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3">
            <span className="bg-[#F05A22]/10 text-[#F05A22] border border-[#F05A22]/20 font-mono text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block">
              // HOW WE WORK
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#141414]">
              THE THREE <span className="text-[#F05A22]">STUDIO PILLARS</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                emoji: "💡",
                title: "You Dream It",
                desc: "Send us your raw idea, photo reference, or sketch. No polished design brief needed — even a text description works.",
                badge: "NO BRIEF REQUIRED",
              },
              {
                num: "02",
                emoji: "✏️",
                title: "We Detail It",
                desc: "Our human graphic designers vectorise, color separate, and polish your artwork into a 3D digital proof for your approval.",
                badge: "HUMAN DESIGNER",
              },
              {
                num: "03",
                emoji: "📦",
                title: "We Deliver It",
                desc: "Printed on 100% combed cotton, quality checked, and shipped express pan-India directly to your doorstep.",
                badge: "EXPRESS DISPATCH",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-[24px] border border-[#EAEAEA] p-8 sm:p-10 shadow-xl shadow-black/[0.03] hover:shadow-2xl hover:border-[#F05A22] hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{item.emoji}</span>
                    <span className="font-mono text-xs font-black text-[#F05A22] bg-[#F05A22]/10 px-3 py-1 rounded-full">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-[#141414] uppercase tracking-tight">{item.title}</h3>
                  <p className="text-[#666666] text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
                <div className="pt-4 border-t border-[#EAEAEA]">
                  <span className="text-[10px] font-mono font-bold text-[#666666] uppercase tracking-wider block">
                    ⚡ {item.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====== 3. STUDIO STORY (Dark Theme) ====== */}
      <section className="py-28 bg-[#121212] text-white relative overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] bg-black border border-white/15 shadow-2xl">
                <img
                  src="/images/designer.png"
                  alt="DesignMyTee Kochi print studio"
                  className="w-full h-full object-cover filter contrast-[1.15]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 bg-black/70 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs font-mono">
                  <p className="font-bold text-white">⚡ KOCHI PRINT STUDIO HEADQUARTERS</p>
                  <p className="text-white/60 text-[11px] mt-0.5">Serving colleges, corporate teams & creators pan-India</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 pl-0 lg:pl-6">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-[#F05A22]" /> Our Origin Story
              </span>

              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                BUILT OUT OF FRUSTRATION WITH <span className="text-[#F05A22]">GENERIC PRINTERS</span>
              </h2>

              <div className="space-y-4 text-white/80 text-base leading-relaxed font-medium">
                <p>
                  DesignMyTee started with a simple frustration: ordering custom t-shirts online was overly complex, slow, and always a gamble on fabric weight and print durability.
                </p>
                <p>
                  We built a clean, transparent process where you submit your raw idea and a dedicated human designer in our Kochi studio takes over. No confusing design tools, no guessing about fabric quality, and no endless chasing for updates.
                </p>
                <p>
                  Based in Kochi, Kerala, we print for college fest coordinators, tech startups, sports clubs, and independent streetwear creators across India.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#F05A22]" /> 1-on-1 Designer Collaboration
                  </span>
                  <p className="text-[11px] text-white/50 font-mono">Human designer assigns & reviews artwork</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
                  <span className="text-xs font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#F05A22]" /> Industrial DTF & Sublimation
                  </span>
                  <p className="text-[11px] text-white/50 font-mono">Calibrated to 240+ GSM fabric</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====== 4. CTA BAND (Full Bleed Orange Accent) ====== */}
      <section className="py-24 bg-[#F05A22] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8 relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-white/30">
            // READY TO START YOUR ORDER?
          </span>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            BRING YOUR T-SHIRT IDEA TO LIFE TODAY
          </h2>

          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Submit a custom request in under 3 minutes or browse our ready-to-wear drops.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link
              href="/custom-request"
              className="inline-flex items-center justify-center gap-3 bg-white text-[#F05A22] font-black text-sm uppercase tracking-wider px-9 py-4 rounded-full hover:bg-white/90 hover:scale-105 transition-all shadow-2xl"
            >
              Start Custom Request <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2.5 bg-black/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-black/30 transition-all"
            >
              Explore Drops <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
