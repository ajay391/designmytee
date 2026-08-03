"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Upload,
  ArrowUpRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    badge: "KOCHI'S #1 CUSTOM APPAREL STUDIO",
    headlineLine1: "THE MOST",
    headlineOrange: "EPIC PRINTS",
    headlineLine2: "IN KERALA.",
    desc: "Submit your raw idea. Our human graphic designers handle 300 DPI vector artwork, color separation & express delivery pan-India.",
    primaryCtaText: "Start Custom Request",
    primaryCtaLink: "/custom-request",
    secondaryCtaText: "Get Bulk Quote",
    secondaryCtaLink: "/bulk-order",
    image: "/images/hero.png",
    watermark: "DESIGNMYTEE",
    spotlightBadge: "DTF Print Proof",
    spotlightTitle: "Custom Batch Jersey Series",
    spotlightSpec: "SPEC: 240 GSM Oversized",
    spotlightDesc: "Combed cotton · 300 DPI high-density print",
    spotlightStatus: "● Vector Approved",
    spotlightImage: "/images/product1.png",
  },
  {
    id: 2,
    badge: "NEW DROP · 240 GSM HEAVYWEIGHT",
    headlineLine1: "STREETWEAR",
    headlineOrange: "OVERSIZED DROPS",
    headlineLine2: "BUILT TO LAST.",
    desc: "Experience boxy streetwear cuts with 240+ GSM combed cotton fabrics, puff print accents & reinforced collar stitching.",
    primaryCtaText: "Shop Ready-to-Wear Drops",
    primaryCtaLink: "/shop",
    secondaryCtaText: "Request Custom Fit",
    secondaryCtaLink: "/custom-request",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1600",
    watermark: "STREETWEAR",
    spotlightBadge: "240 GSM Combed",
    spotlightTitle: "Classic Heavyweight Drop",
    spotlightSpec: "FIT: Oversized Drop Shoulder",
    spotlightDesc: "Acid washed · High-density screen print",
    spotlightStatus: "● In Stock",
    spotlightImage: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    badge: "B2B SPECIALTY · 320+ STARTUPS",
    headlineLine1: "CORPORATE &",
    headlineOrange: "TEAM UNIFORMS",
    headlineLine2: "CRAFTED WITH CARE.",
    desc: "Elevate your startup team or event crew with custom high-density embroidered polos, fleece hoodies & department wear.",
    primaryCtaText: "Get Corporate Quote",
    primaryCtaLink: "/bulk-order",
    secondaryCtaText: "Explore Samples",
    secondaryCtaLink: "/gallery",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1600",
    watermark: "CORPORATE",
    spotlightBadge: "High-Density Embroidery",
    spotlightTitle: "Minimal Studio Collar Polo",
    spotlightSpec: "SPEC: Cotton Piqué Knit",
    spotlightDesc: "Reinforced collar · Custom logo embroidery",
    spotlightStatus: "● Bulk Discount",
    spotlightImage: "https://images.unsplash.com/photo-1625910513413-5627258380e2?auto=format&fit=crop&q=80&w=800",
  },
];

export function HeroSliderSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play slider every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative min-h-[80vh] lg:h-[85vh] lg:max-h-[820px] flex items-center bg-[#0F0F0F] text-white overflow-hidden border-b border-white/10">
      
      {/* Background Image Slides with Smooth Fade */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
        >
          <img
            src={s.image}
            alt={s.badge}
            className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
        </div>
      ))}

      {/* Giant Background Typography Watermark */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden select-none pointer-events-none z-0">
        <span className="text-[20vw] font-black tracking-tighter text-white/[0.03] uppercase leading-none block whitespace-nowrap font-mono transition-all duration-700">
          {slide.watermark}
        </span>
      </div>

      <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 w-full py-16 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Hero Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest shadow-xl">
              <span className="w-2 h-2 rounded-full bg-[#F05A22] animate-ping" />
              {slide.badge}
            </div>

            {/* Dynamic Poster Headline (Locked Height Container) */}
            <div className="min-h-[170px] sm:min-h-[210px] lg:min-h-[225px] flex flex-col justify-center">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.92] text-white">
                {slide.headlineLine1} <br />
                <span className="text-[#F05A22] drop-shadow-lg">{slide.headlineOrange}</span> <br />
                {slide.headlineLine2}
              </h1>
            </div>

            {/* Subtitle (Locked Height Container) */}
            <div className="min-h-[56px] flex items-center">
              <p className="text-base sm:text-lg text-white/80 leading-relaxed font-medium max-w-xl">
                {slide.desc}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <Link
                href={slide.primaryCtaLink}
                className="inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#F05A22] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-9 py-2.5 sm:py-4.5 rounded-full hover:bg-[#C8461A] hover:scale-105 transition-all duration-200 shadow-2xl shadow-[#F05A22]/40 border-2 border-[#F05A22]"
              >
                <Upload className="w-4 h-4" /> {slide.primaryCtaText}
              </Link>
              <Link
                href={slide.secondaryCtaLink}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white/5 border border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-wider px-5 sm:px-8 py-2.5 sm:py-4.5 rounded-full hover:bg-white/10 transition-all"
              >
                {slide.secondaryCtaText} <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Rating & Stats Glass Pill */}
            <div className="inline-flex flex-wrap items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-3 text-xs text-white/70 font-medium">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">4.9 / 5.0</span>
              </div>
              <span className="w-1 h-1 bg-white/30 rounded-full" />
              <span>2,400+ Prints Delivered</span>
              <span className="w-1 h-1 bg-white/30 rounded-full hidden sm:block" />
              <span className="hidden sm:inline">5–7 Days Turnaround</span>
            </div>
          </div>

          {/* RIGHT: Floating Interactive Spotlight Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative rounded-3xl bg-gradient-to-br from-white/15 via-white/5 to-transparent border border-white/20 p-6 shadow-2xl backdrop-blur-xl space-y-4 transform hover:rotate-1 transition-transform duration-500">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative bg-black border border-white/10">
                <img
                  src={slide.spotlightImage}
                  alt={slide.spotlightTitle}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <span className="absolute top-3 left-3 bg-[#F05A22] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider shadow-md">
                  {slide.spotlightBadge}
                </span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-white/60">
                  <span>{slide.spotlightSpec}</span>
                  <span className="text-green-400 font-bold">{slide.spotlightStatus}</span>
                </div>
                <h3 className="font-bold text-lg text-white">{slide.spotlightTitle}</h3>
                <p className="text-xs text-white/70 font-mono">{slide.spotlightDesc}</p>
              </div>
            </div>
          </div>

        </div>

        {/* SLIDER NAVIGATION CONTROLS BAR */}
        <div className="mt-10 sm:mt-14 pt-6 pb-2 border-t border-white/10 flex flex-col sm:grid sm:grid-cols-3 items-center gap-5 sm:gap-6 relative z-30">
          
          {/* Left Column: Count & Progress & Dots (Mobile) */}
          <div className="flex items-center justify-between sm:justify-start w-full gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-white/50">
                <strong className="text-[#F05A22] text-sm sm:text-base">{`0${currentSlide + 1}`}</strong> / 03
              </span>
              <div className="w-20 sm:w-36 h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#F05A22] transition-all duration-500 rounded-full"
                  style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Mobile Slide Dots */}
            <div className="flex sm:hidden items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer relative z-30 ${
                    currentSlide === idx
                      ? "w-6 bg-[#F05A22]"
                      : "w-2.5 bg-white/20 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Center Column: Perfectly Centered Slide Dots Selector (Desktop) */}
          <div className="hidden sm:flex items-center justify-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer relative z-30 ${
                  currentSlide === idx
                    ? "w-8 bg-[#F05A22]"
                    : "w-2.5 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Right Column: Arrow Buttons */}
          <div className="flex items-center justify-end w-full gap-2.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:border-[#F05A22] hover:bg-[#F05A22] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer relative z-30 touch-manipulation"
            >
              <ChevronLeft className="w-5 h-5 pointer-events-none" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:border-[#F05A22] hover:bg-[#F05A22] text-white flex items-center justify-center transition-all shadow-md active:scale-95 cursor-pointer relative z-30 touch-manipulation"
            >
              <ChevronRight className="w-5 h-5 pointer-events-none" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
