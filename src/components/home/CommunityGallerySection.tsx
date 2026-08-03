"use client";

import { useState } from "react";
import { MapPin, Sparkles, ArrowUpRight, X, ExternalLink, Tag } from "lucide-react";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const communityPhotos = [
  {
    id: "1",
    title: "MEC Thrissur College Fest 2025",
    tag: "Batch Jerseys",
    filterCat: "Batch Jerseys",
    location: "Thrissur, Kerala",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800",
    fabric: "100% Combed Cotton · 220 GSM",
    printTech: "High-Density DTF Print",
    quantity: "120 Pieces",
    turnaround: "5 Days Turnaround",
    featured: true,
  },
  {
    id: "2",
    title: "KiloEats Corporate Uniforms",
    tag: "Custom Polos",
    filterCat: "Polos",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    fabric: "Cotton Piqué Knit · 240 GSM",
    printTech: "High-Density Embroidery",
    quantity: "50 Pieces",
    turnaround: "4 Days Turnaround",
    featured: false,
  },
  {
    id: "3",
    title: "FC Kochi Youth Squad Kit",
    tag: "Sublimation Kit",
    filterCat: "Sublimation",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=800",
    fabric: "Dri-Fit Performance Mesh",
    printTech: "Full-Bleed Sublimation",
    quantity: "35 Kits",
    turnaround: "6 Days Turnaround",
    featured: false,
  },
  {
    id: "4",
    title: "Kochi Streetwear Drop",
    tag: "240 GSM Oversized",
    filterCat: "Streetwear",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    fabric: "240 GSM Heavyweight Cotton",
    printTech: "Puff Print & DTF",
    quantity: "100 Pieces",
    turnaround: "7 Days Turnaround",
    featured: true,
  },
  {
    id: "5",
    title: "Kochi Tech Meetup Merch",
    tag: "Event Tees",
    filterCat: "Event Tees",
    location: "Infopark Kochi",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
    fabric: "180 GSM Ring-Spun Cotton",
    printTech: "Screen Printing",
    quantity: "200 Pieces",
    turnaround: "3 Days Turnaround",
    featured: false,
  },
  {
    id: "6",
    title: "Studio Print Production Proof",
    tag: "DTF Printing",
    filterCat: "Batch Jerseys",
    location: "Studio Kochi",
    image: "/images/designer.png",
    fabric: "Vector Studio Proof",
    printTech: "300 DPI Vector Setup",
    quantity: "Studio Proof",
    turnaround: "Same Day Setup",
    featured: false,
  },
];

const categories = ["All Projects", "Batch Jerseys", "Polos", "Sublimation", "Streetwear", "Event Tees"];

export function CommunityGallerySection() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [selectedItem, setSelectedItem] = useState<(typeof communityPhotos)[0] | null>(null);

  const filteredItems =
    activeCategory === "All Projects"
      ? communityPhotos
      : communityPhotos.filter((item) => item.filterCat === activeCategory);

  return (
    <section className="py-28 bg-[#FAF9F6] text-[#141414] relative overflow-hidden border-b border-[#EAEAEA]">
      {/* Background Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
        <span className="text-[20vw] font-black tracking-tighter text-black/[0.03] uppercase leading-none font-mono">
          SHOWCASE
        </span>
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 w-full space-y-12">
        
        {/* Header Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F05A22]/10 border border-[#F05A22]/20 text-[#F05A22] rounded-full px-4 py-1 text-xs font-mono font-bold uppercase tracking-widest mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" /> Real Client Deliveries
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#141414] leading-none">
              LOOK WHAT WE <span className="text-[#F05A22]">PRINTED</span>
            </h2>
          </div>

          {/* Category Filter Pills & Instagram Link */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 bg-white border border-[#EAEAEA] shadow-sm rounded-full overflow-x-auto scrollbar-none max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCategory(cat);
                  }}
                  className={`whitespace-nowrap flex-shrink-0 px-3 sm:px-3.5 py-1.5 rounded-full font-mono text-[11px] sm:text-xs font-bold transition-all cursor-pointer relative z-30 touch-manipulation ${
                    activeCategory === cat
                      ? "bg-[#F05A22] text-white shadow-md shadow-[#F05A22]/30"
                      : "text-[#666666] hover:text-[#141414]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white border border-[#EAEAEA] hover:border-[#F05A22] text-[#141414] text-[11px] sm:text-xs font-mono font-bold px-4 sm:px-5 py-2 rounded-full transition-all shadow-sm hover:shadow-md self-start sm:self-auto cursor-pointer relative z-30 touch-manipulation shrink-0"
            >
              <span className="text-[#F05A22] pointer-events-none"><InstagramIcon /></span> @designmytee.in
            </a>
          </div>
        </div>

        {/* Asymmetrical Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer relative rounded-[24px] overflow-hidden bg-white border border-[#EAEAEA] hover:border-[#F05A22] transition-all duration-500 shadow-lg shadow-black/[0.03] hover:shadow-2xl hover:shadow-[#F05A22]/15 aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.9] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Category & Location Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="bg-black/70 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/20">
                  {item.tag}
                </span>
                <span className="bg-[#F05A22] text-white text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                  Inspect Spec →
                </span>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white z-10 space-y-1">
                <p className="text-[11px] text-[#F05A22] font-mono font-bold flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {item.location}
                </p>
                <h3 className="font-bold text-lg tracking-tight leading-snug group-hover:text-[#F05A22] transition-colors flex items-center justify-between">
                  {item.title}
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[#F05A22]" />
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Inspector Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
            <div className="relative w-full max-w-2xl bg-white border border-[#EAEAEA] rounded-[24px] p-6 sm:p-8 space-y-6 shadow-2xl text-[#141414]">
              <button
                onClick={() => setSelectedItem(null)}
                aria-label="Close modal"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FAF9F6] border border-[#EAEAEA] text-[#141414] hover:bg-[#F05A22] hover:text-white flex items-center justify-center transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="aspect-video rounded-2xl overflow-hidden bg-[#FAF9F6] border border-[#EAEAEA] relative">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-[#F05A22] text-white text-xs font-mono font-bold px-3 py-1 rounded-full">
                  {selectedItem.tag}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#F05A22] font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedItem.location}
                  </span>
                  <span className="text-xs font-mono text-[#666666] font-medium">{selectedItem.turnaround}</span>
                </div>

                <h3 className="text-2xl font-black uppercase text-[#141414] tracking-tight">
                  {selectedItem.title}
                </h3>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#EAEAEA] text-xs font-mono">
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#666666] block text-[10px] font-bold">FABRIC SPEC</span>
                    <span className="text-[#141414] font-bold">{selectedItem.fabric}</span>
                  </div>
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#666666] block text-[10px] font-bold">PRINT TECHNIQUE</span>
                    <span className="text-[#141414] font-bold">{selectedItem.printTech}</span>
                  </div>
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#666666] block text-[10px] font-bold">QUANTITY</span>
                    <span className="text-[#141414] font-bold">{selectedItem.quantity}</span>
                  </div>
                  <div className="bg-[#FAF9F6] p-3 rounded-xl border border-[#EAEAEA]">
                    <span className="text-[#666666] block text-[10px] font-bold">QUALITY CHECK</span>
                    <span className="text-emerald-600 font-bold">✓ 100% Passed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
