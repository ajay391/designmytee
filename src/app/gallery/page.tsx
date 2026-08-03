import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Sparkles, ArrowRight, ArrowUpRight, Image as ImageIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Latest Work | DesignMyTee",
  description: "See our latest custom t-shirt printing work. Real jobs, real results — from college jerseys to corporate tees.",
};

export default async function GalleryPage() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("gallery_items")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141414] font-sans">
      
      {/* Dark Hero Section */}
      <section className="py-20 bg-[#121212] text-white relative overflow-hidden border-b border-white/10">
        {/* Background Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <span className="text-[22vw] font-black tracking-tighter text-white/[0.02] uppercase leading-none font-mono">
            ARCHIVES
          </span>
          <div className="absolute w-[500px] h-[500px] bg-[#F05A22]/15 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F05A22]/15 border border-[#F05A22]/30 text-[#F05A22] rounded-full px-4.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Kochi Studio Portfolio
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
            OUR PRINTED <span className="text-[#F05A22]">ARCHIVES</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Real orders, real clients, precision vector artwork. From college fest batch tees to high-density embroidered polos.
          </p>
        </div>
      </section>

      {/* Main Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {(items ?? []).length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {(items ?? []).map((item) => (
              <div
                key={item.id}
                className="break-inside-avoid group relative overflow-hidden rounded-[24px] bg-white border border-[#EAEAEA] shadow-md hover:shadow-2xl hover:border-[#F05A22] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-mono text-[#F05A22] font-bold uppercase tracking-wider block">
                    {item.technique || "Custom Print"}
                  </span>
                  <p className="text-white font-black text-base uppercase tracking-tight leading-snug">{item.title}</p>
                </div>
                {item.is_featured && (
                  <div className="absolute top-3 left-3 bg-[#F05A22] text-white text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full shadow-md z-10">
                    FEATURED SPEC
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-16 text-center shadow-md max-w-2xl mx-auto space-y-4">
            <div className="w-20 h-20 bg-[#F05A22]/10 border border-[#F05A22]/20 text-[#F05A22] rounded-3xl flex items-center justify-center mx-auto shadow-md">
              <ImageIcon className="w-10 h-10" />
            </div>
            <h3 className="font-black text-[#141414] text-2xl uppercase tracking-tight">Gallery Archives Updating</h3>
            <p className="text-[#666666] font-medium text-sm max-w-md mx-auto">
              We&apos;re uploading recent print jobs from our Kochi studio. In the meantime, submit your custom request to get featured!
            </p>
            <div className="pt-2">
              <Link
                href="/custom-request"
                className="inline-flex items-center gap-2 bg-[#F05A22] text-white font-black text-xs uppercase tracking-wider px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full hover:bg-[#C8461A] transition-all shadow-lg shadow-[#F05A22]/20"
              >
                Start Custom Request <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
