"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Check,
} from "lucide-react";

const products = [
  {
    id: "1",
    name: "Classic Heavyweight Oversized Tee",
    price: 699,
    comparePrice: 999,
    category: "240 GSM Oversized",
    filterCat: "Oversized",
    image: "/images/product1.png",
    colors: [
      { name: "Pitch Black", hex: "#1A1A1A" },
      { name: "Chalk White", hex: "#E5E3DF" },
      { name: "Olive Drab", hex: "#4B5320" },
    ],
    slug: "classic-heavyweight-oversized-tee",
    badge: "Bestseller",
    gsm: "240 GSM",
    printTech: "High-Density Screen",
    fabric: "100% Combed Cotton",
  },
  {
    id: "2",
    name: "Vintage Washed Acid Drop",
    price: 799,
    comparePrice: 1099,
    category: "Acid Washed Streetwear",
    filterCat: "Streetwear",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Washed Charcoal", hex: "#2E2E2E" },
      { name: "Acid Smoke", hex: "#4A4A4A" },
    ],
    slug: "vintage-washed-acid-drop",
    badge: "Limited Run",
    gsm: "260 GSM",
    printTech: "Puff Print & DTF",
    fabric: "Washed French Terry",
  },
  {
    id: "3",
    name: "Minimal Studio Collar Polo",
    price: 899,
    comparePrice: 1299,
    category: "Piqué Polo",
    filterCat: "Polo",
    image: "https://images.unsplash.com/photo-1625910513413-5627258380e2?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Navy Studio", hex: "#0F172A" },
      { name: "Bone White", hex: "#F8F7F5" },
    ],
    slug: "minimal-studio-collar-polo",
    badge: "Embroidery",
    gsm: "220 GSM",
    printTech: "High-Density Embroidery",
    fabric: "Cotton Piqué Knit",
  },
  {
    id: "4",
    name: "320 GSM Fleece Boxy Hoodie",
    price: 1499,
    comparePrice: 1999,
    category: "Heavyweight Fleece",
    filterCat: "Hoodies",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    colors: [
      { name: "Pitch Black", hex: "#1A1A1A" },
      { name: "Heather Gray", hex: "#9CA3AF" },
    ],
    slug: "320-gsm-fleece-boxy-hoodie",
    badge: "Winter Pack",
    gsm: "320 GSM",
    printTech: "Embroidery & Screen",
    fabric: "Brushed Fleece Blend",
  },
];

const categoriesFilter = ["All Drops", "Oversized", "Streetwear", "Polo", "Hoodies"];

export function OurOwnDesignsSection() {
  const [activeFilter, setActiveFilter] = useState("All Drops");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [activeColor, setActiveColor] = useState(products[0].colors[0]);

  // Mouse Drag-to-Scroll State
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredProducts =
    activeFilter === "All Drops"
      ? products
      : products.filter((p) => p.filterCat === activeFilter);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.6;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <section className="py-24 bg-[#121212] text-white border-b border-white/10 relative overflow-hidden">
      {/* Background Subtle Watermark */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full select-none pointer-events-none overflow-hidden z-0">
        <span className="text-[20vw] font-black tracking-tighter text-white/[0.02] uppercase leading-none block whitespace-nowrap font-mono">
          STUDIO DROPS
        </span>
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 w-full">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F05A22]/20 border border-[#F05A22]/40 text-[#F05A22] rounded-full px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-2.5">
              <Sparkles className="w-3.5 h-3.5" /> Studio Ready-to-Wear Drops
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white leading-none">
              OUR OWN DESIGNS
            </h2>
          </div>

          {/* Filter Pills + Arrow Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex flex-wrap p-1 bg-white/5 border border-white/10 rounded-full">
              {categoriesFilter.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                    activeFilter === cat
                      ? "bg-[#F05A22] text-white shadow-lg shadow-[#F05A22]/30"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 hover:border-[#F05A22] hover:bg-[#F05A22] text-white flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/15 hover:border-[#F05A22] hover:bg-[#F05A22] text-white flex items-center justify-center transition-all shadow-md active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Featured Spotlight Card + Mouse-Draggable Drop Carousel */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT: Compact Spotlight Panel (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-white/10 via-white/5 to-transparent border border-white/20 rounded-3xl p-6 shadow-2xl backdrop-blur-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#F05A22] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                  {selectedProduct.badge}
                </span>
                <span className="text-xs font-mono text-white/50">
                  GSM: <strong className="text-white">{selectedProduct.gsm}</strong>
                </span>
              </div>

              {/* Optimized Image Proportions */}
              <div className="h-[240px] sm:h-[260px] rounded-2xl overflow-hidden bg-black relative border border-white/10 group">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                />
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 text-[10px] font-mono text-white">
                  {selectedProduct.printTech}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono text-[#F05A22] uppercase tracking-wider block">
                  {selectedProduct.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-0.5 leading-snug">
                  {selectedProduct.name}
                </h3>
                <p className="text-xs text-white/60 font-medium mt-0.5">
                  Fabric: {selectedProduct.fabric}
                </p>
              </div>
            </div>

            {/* Color Swatches & Action Button */}
            <div className="space-y-4 pt-3 border-t border-white/10">
              <div>
                <p className="text-[10px] font-mono uppercase text-white/50 mb-1.5">
                  Select Color: <span className="text-white font-bold">{activeColor.name}</span>
                </p>
                <div className="flex items-center gap-2">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setActiveColor(c)}
                      aria-label={c.name}
                      className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                        activeColor.name === c.name
                          ? "border-[#F05A22] scale-110 shadow-lg"
                          : "border-white/20 hover:border-white/60"
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {activeColor.name === c.name && (
                        <Check className="w-3 h-3 text-white filter drop-shadow" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-2xl font-black text-[#F05A22]">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-xs text-white/40 line-through ml-2">
                    ₹{selectedProduct.comparePrice}
                  </span>
                </div>

                <Link
                  href={`/shop/${selectedProduct.slug}`}
                  className="inline-flex items-center gap-2 bg-[#F05A22] hover:bg-[#C8461A] text-white font-black text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-xl hover:scale-105"
                >
                  Shop Drop <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT: Mouse-Draggable Product Carousel (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              className={`flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory h-full select-none ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {filteredProducts.map((p) => {
                const isSelected = selectedProduct.id === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setActiveColor(p.colors[0]);
                    }}
                    className={`group flex-shrink-0 w-[240px] sm:w-[260px] h-[430px] bg-[#141414] border rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between snap-start ${
                      isSelected
                        ? "border-[#F05A22] shadow-2xl shadow-[#F05A22]/20 ring-1 ring-[#F05A22]"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="h-[210px] relative bg-black overflow-hidden flex-shrink-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] uppercase font-mono font-bold px-2.5 py-1 rounded-full">
                        {p.badge}
                      </span>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#F05A22] uppercase tracking-wider">
                          {p.category}
                        </span>
                        <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-[#F05A22] transition-colors leading-snug mt-0.5 line-clamp-2">
                          {p.name}
                        </h4>
                        <p className="text-[11px] text-white/40 mt-1 font-mono">
                          {p.gsm} · {p.printTech}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-black text-white text-base">
                            ₹{p.price}
                          </span>
                          <span className="text-[10px] text-white/40 line-through">
                            ₹{p.comparePrice}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-[#F05A22] group-hover:translate-x-1 transition-transform">
                          Inspect →
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Direct Catalog Helper Bar */}
            <div className="pt-3 flex items-center justify-between text-[11px] font-mono text-white/50 border-t border-white/10">
              <span>● CLICK OR DRAG TO SLIDE & PREVIEW</span>
              <Link
                href="/shop"
                className="text-white hover:text-[#F05A22] font-bold transition-colors flex items-center gap-1.5 uppercase"
              >
                Explore All {products.length} Studio Drops <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
