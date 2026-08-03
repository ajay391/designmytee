"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Upload,
  Star,
  ChevronDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  ShoppingBag,
  Sliders,
  Layers,
  Award,
} from "lucide-react";
import { HeroSliderSection } from "@/components/home/HeroSliderSection";
import { InteractiveProcessSection } from "@/components/home/InteractiveProcessSection";
import { OurOwnDesignsSection } from "@/components/home/OurOwnDesignsSection";
import { CommunityGallerySection } from "@/components/home/CommunityGallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const categories = [
  {
    name: "College & Fest Batch Jerseys",
    subtitle: "Custom department apparel, coordinator tees & fest merchandise.",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=1000",
    href: "/custom-request",
    tag: "FEATURED CATEGORY",
    featured: true,
    stats: "850+ Fests Delivered",
  },
  {
    name: "Corporate & Team Wear",
    subtitle: "Custom embroidered polos, hoodies & team uniforms.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    href: "/custom-request",
    tag: "B2B SPECIALTY",
    stats: "320+ Startups",
  },
  {
    name: "Sublimated Sports Kit",
    subtitle: "Full-bleed tournament kits for football & cricket clubs.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=800",
    href: "/custom-request",
    tag: "SUBLIMATION",
    stats: "High-Durability Fabric",
  },
  {
    name: "Oversized Streetwear Drops",
    subtitle: "Heavyweight 240+ GSM drop-shoulder streetwear cuts.",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    href: "/shop",
    tag: "NEW DROP",
    stats: "240 GSM Combed Cotton",
  },
];

const ownDesigns = [
  {
    id: "1",
    name: "Classic Heavyweight Oversized Tee",
    price: 699,
    comparePrice: 999,
    category: "240 GSM Oversized",
    image: "/images/product1.png",
    colors: ["Pitch Black", "Chalk White", "Olive Drab"],
    slug: "classic-heavyweight-oversized-tee",
    badge: "Bestseller",
  },
  {
    id: "2",
    name: "Vintage Washed Acid Drop",
    price: 799,
    comparePrice: 1099,
    category: "Streetwear",
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    colors: ["Washed Charcoal", "Acid Smoke"],
    slug: "vintage-washed-acid-drop",
    badge: "Limited Run",
  },
  {
    id: "3",
    name: "Minimal Studio Collar Polo",
    price: 899,
    comparePrice: 1299,
    category: "Piqué Polo",
    image: "https://images.unsplash.com/photo-1625910513413-5627258380e2?auto=format&fit=crop&q=80&w=800",
    colors: ["Navy Studio", "Bone White"],
    slug: "minimal-studio-collar-polo",
    badge: "Embroidery",
  },
  {
    id: "4",
    name: "320 GSM Fleece Boxy Hoodie",
    price: 1499,
    comparePrice: 1999,
    category: "320 GSM Heavy Fleece",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
    colors: ["Pitch Black", "Heather Gray"],
    slug: "320-gsm-fleece-boxy-hoodie",
    badge: "Winter Pack",
  },
];

const communityPhotos = [
  {
    title: "MEC Thrissur College Fest 2025",
    tag: "Batch Jerseys",
    location: "Thrissur, Kerala",
    image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "KiloEats Corporate Uniforms",
    tag: "Custom Polos",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "FC Kochi Youth Squad",
    tag: "Sublimation Kit",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Kochi Streetwear Drop",
    tag: "240 GSM Oversized",
    location: "Kochi, Kerala",
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Kochi Tech Meetup Merch",
    tag: "Event Tees",
    location: "Infopark Kochi",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Studio Print Production Proof",
    tag: "DTF Printing",
    location: "Studio Kochi",
    image: "/images/designer.png",
  },
];

const testimonials = [
  {
    name: "Arjun Menon",
    role: "NSS Fest Coordinator, MEC Thrissur",
    rating: 5,
    text: "Ordered 120 jerseys for our college fest. The designer nailed our logo on the first revision and delivered 2 days ahead of schedule.",
    avatar: "A",
    tag: "College Fest Batch",
  },
  {
    name: "Priya Nair",
    role: "Founder, KiloEats Kochi",
    rating: 5,
    text: "Got 50 company polo tees. Having a real human designer tweak our logo placement made all the difference.",
    avatar: "P",
    tag: "Corporate Team",
  },
  {
    name: "Rahul Krishnan",
    role: "FC Kochi Youth Coach",
    rating: 5,
    text: "Best jersey quality we've used in 4 seasons. The sublimation print hasn't faded even after 20 heavy matches.",
    avatar: "R",
    tag: "Sports Sublimation",
  },
];

const faqs = [
  {
    num: "01",
    q: "What is the minimum order quantity for custom designs?",
    a: "No minimum quantity! You can order a single custom t-shirt or thousands. For bulk orders (10+ pieces), volume discount rates apply.",
  },
  {
    num: "02",
    q: "How long does the design and delivery process take?",
    a: "First vector design concepts are uploaded within 24–48 hours. Once approved by you, precision printing and express delivery take 5–7 working days across India.",
  },
  {
    num: "03",
    q: "What if I only have a rough sketch or photo reference?",
    a: "That's perfect. Our human graphic designers redraw, vectorise, and polish your rough ideas into print-ready 300 DPI vector artwork.",
  },
  {
    num: "04",
    q: "Which printing methods do you support?",
    a: "We calibrate industrial DTF (Direct to Film), full-bleed sublimation, screen printing, and high-density embroidery based on your fabric and artwork specs.",
  },
];

export default function HomePage() {
  const collectionScrollRef = useRef<HTMLDivElement>(null);

  const scrollCollection = (direction: "left" | "right") => {
    if (!collectionScrollRef.current) return;
    const amount = 360;
    collectionScrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-[#0A0A0A] text-white overflow-hidden font-sans">
      
      {/* ====== 1. CINEMATIC EDITORIAL HERO SLIDER SECTION ====== */}
      <HeroSliderSection />

      {/* ====== 2. ASYMMETRICAL CATEGORY SHOWCASE (Light Editorial Grid) ====== */}
      <section className="py-28 bg-[#FAF9F6] text-[#141414] relative overflow-hidden border-b border-[#EAEAEA]">
        {/* Background Watermark Text */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <span className="text-[22vw] font-black tracking-tighter text-black/[0.03] uppercase leading-none font-mono">
            CATEGORIES
          </span>
        </div>

        <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="bg-[#F05A22]/10 text-[#F05A22] border border-[#F05A22]/20 font-mono text-xs uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-3 font-bold">
                // 01 PRINT SPECIALTIES
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#141414]">
                CRAFTED FOR <span className="text-[#F05A22]">EVERY PURPOSE</span>
              </h2>
            </div>
            <p className="text-[#666666] text-base font-medium max-w-md">
              From college fests to high-end corporate merch drops, we tailor fabric GSM & printing technique to your exact brief.
            </p>
          </div>

          {/* Asymmetrical Editorial Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Featured Hero Category Card (7 cols) */}
            <Link
              href={categories[0].href}
              className="lg:col-span-7 group relative rounded-[24px] overflow-hidden aspect-[16/10] bg-white border border-[#EAEAEA] hover:border-[#F05A22] transition-all duration-500 shadow-xl shadow-black/[0.04] hover:shadow-2xl hover:shadow-[#F05A22]/15 flex flex-col justify-end p-8 sm:p-10"
            >
              <img
                src={categories[0].image}
                alt={categories[0].name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.85]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              <div className="relative z-10 space-y-3">
                <span className="bg-[#F05A22] text-white text-[11px] font-black uppercase px-3.5 py-1 rounded-full tracking-wider inline-block shadow-md">
                  {categories[0].tag}
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight group-hover:text-[#F05A22] transition-colors flex items-center justify-between">
                  {categories[0].name}
                  <ArrowUpRight className="w-8 h-8 text-[#F05A22] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </h3>
                <p className="text-sm sm:text-base text-white/80 font-medium max-w-lg">
                  {categories[0].subtitle}
                </p>
                <div className="pt-2 text-xs font-mono text-white/70 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F05A22]" /> {categories[0].stats}
                </div>
              </div>
            </Link>

            {/* 3 Secondary Stacked Cards (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {categories.slice(1).map((cat) => (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative rounded-[24px] overflow-hidden bg-white border border-[#EAEAEA] hover:border-[#F05A22] transition-all duration-300 p-6 flex items-center gap-6 shadow-md shadow-black/[0.03] hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FAF9F6] flex-shrink-0 relative border border-[#EAEAEA]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-mono text-[#F05A22] font-bold uppercase tracking-wider block">
                      {cat.tag}
                    </span>
                    <h4 className="font-black text-lg sm:text-xl text-[#141414] group-hover:text-[#F05A22] transition-colors flex items-center justify-between">
                      {cat.name}
                      <ArrowUpRight className="w-4 h-4 text-[#666666] group-hover:text-[#F05A22] transition-colors" />
                    </h4>
                    <p className="text-xs text-[#666666] line-clamp-1 font-medium">{cat.subtitle}</p>
                    <div className="text-[10px] font-mono text-[#666666] pt-1">
                      ⚡ {cat.stats}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* ====== 3. HUMAN DESIGNER GUARANTEE (Cinematic Dark Section) ====== */}
      <section className="py-28 bg-[#121212] text-white relative overflow-hidden border-b border-white/10">
        {/* Background Watermark & Spotlight */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          <span className="text-[20vw] font-black tracking-tighter text-white/[0.02] uppercase leading-none font-mono">
            KOCHI STUDIO
          </span>
          <div className="absolute w-[600px] h-[600px] bg-[#F05A22]/15 rounded-full blur-[160px]" />
        </div>

        <div className="relative z-10 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Photographer Image Card with Glass Badges */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-[24px] overflow-hidden aspect-[4/5] bg-black border border-white/15 shadow-2xl group">
                <img
                  src="/images/designer.png"
                  alt="Lead graphic designer in Kochi print studio"
                  className="w-full h-full object-cover filter contrast-[1.15] group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Live Status Badge */}
                <div className="absolute top-5 left-5 bg-black/70 backdrop-blur-md border border-white/20 text-white rounded-full px-4 py-1.5 text-[10px] font-mono font-bold tracking-wider inline-flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE STUDIO · KOCHI
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white text-xs font-mono space-y-2 bg-black/70 backdrop-blur-md p-5 rounded-2xl border border-white/15 shadow-xl">
                  <p className="font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F05A22]" /> 1-on-1 Vector Proofing Included
                  </p>
                  <p className="text-white/60 text-[11px] font-medium">Human designer assigned within 2 hours of request</p>
                </div>
              </div>
            </div>

            {/* Right: Studio Statement & Action */}
            <div className="lg:col-span-7 space-y-8 pl-0 lg:pl-6">
              <div className="inline-flex items-center gap-2 bg-[#F05A22]/15 border border-[#F05A22]/30 text-[#F05A22] rounded-full px-4.5 py-1.5 text-xs font-mono font-bold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" /> Human Designer Guarantee
              </div>

              <blockquote className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-white leading-[0.95]">
                WE DON&apos;T PRESS PRINT UNTIL YOUR ARTWORK IS <span className="text-[#F05A22]">100% PERFECT</span>.
              </blockquote>

              <p className="text-white/70 text-base sm:text-lg leading-relaxed font-medium">
                Unlike automated print bots or generic template sites, every DesignMyTee order is assigned personally to a graphic designer in our Kochi studio who polishes your vector lines, color separations, and fabric specs.
              </p>

              {/* Feature Highlights */}
              <div className="grid sm:grid-cols-3 gap-4 pt-2">
                {[
                  { label: "Vector Redraws", desc: "300 DPI vector artwork" },
                  { label: "Color Separation", desc: "Tailored to fabric type" },
                  { label: "24h 3D Proofs", desc: "Unlimited revisions" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 border border-white/10 p-4.5 rounded-2xl space-y-1 hover:border-[#F05A22]/40 transition-colors">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#F05A22]" /> {item.label}
                    </span>
                    <p className="text-[11px] text-white/50 font-mono">{item.desc}</p>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-4">
                <Link
                  href="/custom-request"
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#F05A22] text-white font-black text-xs uppercase tracking-wider px-5 sm:px-8 py-2.5 sm:py-4 rounded-full hover:bg-[#C8461A] transition-all shadow-xl shadow-[#F05A22]/30 hover:scale-105"
                >
                  <Upload className="w-4 h-4" /> Work Directly With a Designer
                </Link>
                <Link
                  href="/gallery"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 sm:px-7 py-2.5 sm:py-4 rounded-full hover:bg-white/10 transition-all"
                >
                  View Sample Proofs <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ====== 4. INTERACTIVE GSAP SCROLLTRIGGER PROCESS SECTION (OUR BENCHMARK) ====== */}
      <InteractiveProcessSection />

      {/* ====== 5. OUR OWN DESIGNS (High-End Interactive Studio Drops Showcase) ====== */}
      <OurOwnDesignsSection />

      {/* ====== 6. MILESTONE COUNTER (Dramatic Orange Banner) ====== */}
      <section className="py-24 bg-[#F05A22] text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-8 relative z-10">
          <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-widest px-5 py-2 rounded-full border border-white/30">
            // STUDIO MILESTONE COUNTER
          </span>

          <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
            2,400+ PRINTS <br /> DELIVERED
          </h2>

          <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Help us hit our <strong>5,000 custom prints goal</strong> this year across college fests, corporate teams & sports tournaments.
          </p>

          {/* Goal Progress Bar */}
          <div className="max-w-xl mx-auto space-y-2">
            <div className="h-6 w-full bg-black/30 rounded-full overflow-hidden p-1 relative border border-white/30">
              <div
                className="h-full bg-white rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
                style={{ width: "48%" }}
              >
                <span className="text-[10px] font-black text-[#F05A22] uppercase">
                  48%
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs font-mono text-white/90 px-1 font-bold">
              <span>0 prints</span>
              <span>Goal: 5,000 prints</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/custom-request"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-white text-[#F05A22] font-black text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-10 py-2.5 sm:py-4.5 rounded-full hover:bg-white/90 hover:scale-105 transition-all shadow-2xl"
            >
              Start Your Request <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ====== 7. COMMUNITY GALLERY ("LOOK WHAT WE PRINTED" Lightbox Showcase) ====== */}
      <CommunityGallerySection />

      {/* ====== 8. TESTIMONIALS (High-End Dark Glass Reviews) ====== */}
      <TestimonialsSection />

      {/* ====== 9. FREQUENTLY ASKED QUESTIONS (Minimal Luxury Accordions & Support) ====== */}
      <FaqSection />

      {/* ====== 9. FINAL STATEMENT CTA BAND ====== */}
      <section className="py-28 bg-[#0F0F0F] text-white border-t border-white/10 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F05A22]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 text-center space-y-8">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white rounded-full px-5 py-2 text-xs font-mono font-bold uppercase tracking-widest">
            <Zap className="w-3.5 h-3.5 text-[#F05A22]" /> KOCHI PRINT STUDIO
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-tight">
            READY TO BRING YOUR IDEA TO LIFE?
          </h2>
          
          <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto font-medium">
            Submit a custom request in under 3 minutes. Our human graphic designers will be in touch with vector artwork concepts.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4">
            <Link
              href="/custom-request"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#F05A22] text-white font-black text-xs sm:text-sm uppercase tracking-wider px-5 sm:px-10 py-2.5 sm:py-4.5 rounded-full hover:bg-[#C8461A] transition-all shadow-2xl shadow-[#F05A22]/30 border-2 border-[#F05A22]"
            >
              <Upload className="w-4 h-4 sm:w-5 sm:h-5" /> Start Custom Request
            </Link>
            <Link
              href="/bulk-order"
              className="inline-flex items-center justify-center gap-2 sm:gap-2.5 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-wider px-5 sm:px-9 py-2.5 sm:py-4.5 rounded-full hover:bg-white/10 transition-all"
            >
              Get Bulk Quote <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
