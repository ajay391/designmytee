import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { ShoppingBag, ArrowUpRight, Sparkles, Filter } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Designs | DesignMyTee",
  description: "Browse our premium ready-made t-shirt designs. Add to cart and get them delivered to your door.",
};

const CATEGORIES = ["All", "oversized", "regular", "polo", "hoodie", "jersey"];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const category = params.category ?? "";
  const supabase = await createClient();

  let query = supabase.from("products").select("*").eq("is_active", true).order("is_featured", { ascending: false }).order("created_at", { ascending: false });
  if (category && category !== "All") query = query.eq("category", category);

  const { data: products } = await query;

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#141414] font-sans">
      
      {/* Dark Hero Section */}
      <section className="py-24 bg-[#121212] text-white relative overflow-hidden border-b border-white/10">
        {/* Background Watermark */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <span className="text-[22vw] font-black tracking-tighter text-white/[0.02] uppercase leading-none font-mono">
            DROPS
          </span>
          <div className="absolute w-[500px] h-[500px] bg-[#F05A22]/15 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#F05A22]/15 border border-[#F05A22]/30 text-[#F05A22] rounded-full px-4.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Kochi Studio Drops
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
            READY-TO-WEAR <span className="text-[#F05A22]">DROPS</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Heavyweight combed cotton, custom streetwear cuts & pre-printed studio artwork. Ready to ship to your door.
          </p>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Category Filters Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#666666] uppercase tracking-wider">
            <Filter className="w-4 h-4 text-[#F05A22]" /> Filter Collection:
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {CATEGORIES.map((cat) => {
              const isActive = (cat === "All" && !category) || category === cat;
              return (
                <Link
                  key={cat}
                  href={cat === "All" ? "/shop" : `/shop?category=${cat}`}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-mono font-bold transition-all capitalize shadow-sm ${
                    isActive
                      ? "bg-[#F05A22] text-white shadow-md shadow-[#F05A22]/20"
                      : "bg-white border border-[#EAEAEA] text-[#666666] hover:text-[#141414] hover:border-[#F05A22]"
                  }`}
                >
                  {cat}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {(products ?? []).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {(products ?? []).map((product) => (
              <Link
                key={product.id}
                href={`/shop/${product.slug}`}
                className="group bg-white rounded-[24px] border border-[#EAEAEA] overflow-hidden shadow-md shadow-black/[0.03] hover:shadow-2xl hover:shadow-[#F05A22]/15 hover:border-[#F05A22] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Showcase */}
                <div className="aspect-[4/3] bg-[#FAF9F6] flex items-center justify-center relative overflow-hidden border-b border-[#EAEAEA]">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-[1.05]"
                    />
                  ) : (
                    <span className="text-7xl">
                      {product.category === "hoodie" ? "🧥" : product.category === "polo" ? "👔" : "👕"}
                    </span>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.is_featured && (
                      <span className="bg-[#F05A22] text-white text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full shadow-md">
                        FEATURED DROP
                      </span>
                    )}
                    <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full border border-white/20">
                      {product.category}
                    </span>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#F05A22] font-bold uppercase tracking-wider block">
                      {product.category}
                    </span>
                    <h3 className="font-black text-[#141414] text-base group-hover:text-[#F05A22] transition-colors leading-snug mt-1 line-clamp-2">
                      {product.name}
                    </h3>
                    {product.colors?.length > 0 && (
                      <p className="text-xs text-[#666666] font-mono mt-1 line-clamp-1">
                        Colors: {product.colors.join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#EAEAEA]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-black text-[#F05A22] text-xl">
                        {formatPrice(product.price)}
                      </span>
                      {product.compare_at_price && (
                        <span className="text-xs text-[#999999] line-through font-mono">
                          {formatPrice(product.compare_at_price)}
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-mono font-bold text-[#141414] group-hover:text-[#F05A22] flex items-center gap-1 transition-colors">
                      Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] border border-[#EAEAEA] p-16 text-center shadow-md max-w-2xl mx-auto space-y-4">
            <ShoppingBag className="w-16 h-16 mx-auto text-[#F05A22]/50" />
            <h3 className="font-black text-[#141414] text-2xl uppercase tracking-tight">No Products Found</h3>
            <p className="text-[#666666] font-medium text-sm">
              We couldn&apos;t find ready-made pieces matching this filter. Submit a custom request to have our Kochi studio print it for you!
            </p>
            <div className="pt-2">
              <Link
                href="/custom-request"
                className="inline-flex items-center gap-2 bg-[#F05A22] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-[#C8461A] transition-all shadow-lg shadow-[#F05A22]/20"
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
