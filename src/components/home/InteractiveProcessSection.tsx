"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Upload,
  UserCheck,
  Palette,
  CheckCircle,
  Printer,
  Truck,
  ArrowRight,
  ShieldCheck,
  PackageCheck,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stepsData = [
  {
    id: 1,
    stepNum: "01",
    tag: "PHASE 01 · INITIAL BRIEF",
    title: "Upload & Describe Your Idea",
    desc: "Drag & drop reference images, sketches, or a simple text description. Tell us your fabric preference, shirt fit (oversized, regular, polo, hoodie), and target deadline.",
    watermark: "UPLOAD",
    badge: "Instant Brief Submission",
    ctaText: "Start Custom Request",
    ctaLink: "/custom-request",
    accentColor: "#F05A22",
  },
  {
    id: 2,
    stepNum: "02",
    tag: "PHASE 02 · STUDIO ASSIGNMENT",
    title: "Dedicated Human Designer",
    desc: "No automated print bots. Our admin assigns a specialist graphic designer in our Kochi studio who personally reviews your artwork, color separation & vector specs.",
    watermark: "ARTWORK",
    badge: "Kochi Studio Designer",
    ctaText: "Meet Our Studio",
    ctaLink: "/about",
    accentColor: "#7C3AED",
  },
  {
    id: 3,
    stepNum: "03",
    tag: "PHASE 03 · PROOFING & REVISION",
    title: "HD 3D Concept & Approval",
    desc: "Your designer uploads high-resolution 3D digital mockups directly to your request dashboard. Request unlimited tweaks until the artwork is 100% ready.",
    watermark: "PROOFING",
    badge: "Unlimited Revisions",
    ctaText: "View Sample Proofs",
    ctaLink: "/gallery",
    accentColor: "#0EA5E9",
  },
  {
    id: 4,
    stepNum: "04",
    tag: "PHASE 04 · INDUSTRIAL PRINTING",
    title: "Precision Print Production",
    desc: "We calibrate industrial DTF, full-bleed sublimation, screen printing, or high-density embroidery tailored specifically to your chosen GSM fabric.",
    watermark: "PRINTING",
    badge: "DTF & Sublimation",
    ctaText: "Explore Print Methods",
    ctaLink: "/custom-request",
    accentColor: "#16A34A",
  },
  {
    id: 5,
    stepNum: "05",
    tag: "PHASE 05 · QUALITY CONTROL",
    title: "100-Point Inspection",
    desc: "Every single shirt undergoes stitch integrity, color vibrance, and wash-durability inspection before being tagged with our seal of quality.",
    watermark: "QUALITY",
    badge: "Zero-Defect Guarantee",
    ctaText: "Our Quality Standard",
    ctaLink: "/faq",
    accentColor: "#D97706",
  },
  {
    id: 6,
    stepNum: "06",
    tag: "PHASE 06 · EXPRESS DISPATCH",
    title: "Eco-Packed & Delivered",
    desc: "Folded, eco-packed with care, and shipped pan-India with live WhatsApp tracking updates from dispatch straight to your doorstep.",
    watermark: "DISPATCH",
    badge: "Pan-India Shipping",
    ctaText: "Track Your Order",
    ctaLink: "/account/orders",
    accentColor: "#F05A22",
  },
];

export function InteractiveProcessSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  useEffect(() => {
    if (!wrapperRef.current || !pinTargetRef.current) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: GSAP Pinning + Timeline Scrubbing (min-width: 1024px)
      mm.add("(min-width: 1024px)", () => {
        const totalSteps = stepsData.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            pin: pinTargetRef.current,
            pinSpacing: true,
            start: "top top",
            end: "+=2400",
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const progress = self.progress;
              const stepIndex = Math.min(
                Math.floor(progress * totalSteps),
                totalSteps - 1
              );
              setActiveStepIndex(stepIndex);
            },
          },
        });

        scrollTriggerRef.current = tl.scrollTrigger || null;

        // Step-by-step crossfade timeline with autoAlpha
        stepsData.forEach((_, idx) => {
          if (idx === 0) return;

          const prevCard = `.process-card-${idx - 1}`;
          const currentCard = `.process-card-${idx}`;
          const prevVisual = `.process-visual-${idx - 1}`;
          const currentVisual = `.process-visual-${idx}`;

          tl.to(
            prevCard,
            { autoAlpha: 0, y: -30, scale: 0.95, duration: 0.6, ease: "power1.inOut" },
            idx
          )
            .to(
              prevVisual,
              { autoAlpha: 0, y: -40, scale: 0.92, duration: 0.6, ease: "power1.inOut" },
              idx
            )
            .fromTo(
              currentCard,
              { autoAlpha: 0, y: 40, scale: 0.95 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power1.out" },
              idx
            )
            .fromTo(
              currentVisual,
              { autoAlpha: 0, y: 45, scale: 0.94 },
              { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: "power1.out" },
              idx
            );
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Programmatically scroll to targeted step when sidebar button is clicked
  const handleStepClick = (stepIndex: number) => {
    setActiveStepIndex(stepIndex);

    if (scrollTriggerRef.current) {
      const st = scrollTriggerRef.current;
      const start = st.start;
      const end = st.end;
      const totalSteps = stepsData.length;
      const targetScroll = start + (stepIndex / (totalSteps - 1)) * (end - start);

      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      handleStepClick(activeStepIndex - 1);
    }
  };

  const handleNext = () => {
    if (activeStepIndex < stepsData.length - 1) {
      handleStepClick(activeStepIndex + 1);
    }
  };

  return (
    // Outer Light Wrapper
    <div
      ref={wrapperRef}
      className="relative bg-[#F6F4F1] text-[#141414] w-full overflow-hidden border-y border-[#EAEAEA]"
    >
      {/* Pinned Stage Container */}
      <div
        ref={pinTargetRef}
        className="relative bg-[#F6F4F1] text-[#141414] w-full min-h-screen flex flex-col justify-between py-6"
      >
        {/* Dynamic Watermark Background */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center z-0">
          {stepsData.map((step, idx) => (
            <span
              key={step.id}
              className={`absolute text-[22vw] font-black tracking-tighter uppercase leading-none transition-all duration-700 font-mono ${
                activeStepIndex === idx
                  ? "opacity-[0.04] scale-100 blur-0 text-[#141414]"
                  : "opacity-0 scale-90 blur-xl text-[#141414]"
              }`}
            >
              {step.watermark}
            </span>
          ))}
          {/* Ambient Soft Glow */}
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 transition-all duration-700 pointer-events-none"
            style={{
              backgroundColor: stepsData[activeStepIndex]?.accentColor || "#F05A22",
            }}
          />
        </div>

        {/* Header Bar inside Section */}
        <div className="relative z-20 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 w-full pt-6 pb-4 flex items-center justify-between border-b border-[#EAEAEA]">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#F05A22]/10 border border-[#F05A22]/20 text-[#F05A22] rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest mb-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5" /> Interactive Print Journey
            </div>
            <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-[#141414]">
              FROM BRIEF TO <span className="text-[#F05A22]">DISPATCH</span>
            </h2>
          </div>

          {/* Progress Count Badge */}
          <div className="flex items-center gap-3 bg-white border border-[#EAEAEA] rounded-full px-4 sm:px-5 py-2 shadow-sm">
            <span className="text-xs font-mono text-[#666666]">STEP</span>
            <span className="text-base font-black text-[#F05A22]">
              {stepsData[activeStepIndex]?.stepNum}
            </span>
            <span className="text-xs font-mono text-[#999999]">/ 06</span>
          </div>
        </div>

        {/* MOBILE HORIZONTAL PHASE TAB BAR (< 1024px) */}
        <div className="flex lg:hidden overflow-x-auto gap-2 py-3 px-4 scrollbar-none border-b border-[#EAEAEA] relative z-20 bg-white/70 backdrop-blur-md">
          {stepsData.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all ${
                activeStepIndex === idx
                  ? "bg-[#F05A22] text-white shadow-md shadow-[#F05A22]/30"
                  : "bg-white border border-[#EAEAEA] text-[#666666] hover:text-[#141414]"
              }`}
            >
              {step.stepNum} {step.title.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Main Stage Grid */}
        <div className="relative z-20 max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 w-full flex-1 flex items-center py-4 lg:py-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
            
            {/* LEFT COLUMN: Vertical Timeline Indicator (Desktop Only, 3 cols) */}
            <div className="hidden lg:block lg:col-span-3 space-y-2.5 pr-4 border-r border-[#EAEAEA]">
              <p className="text-[10px] font-mono uppercase tracking-widest text-[#666666] font-bold mb-3">
                // PROCESS PHASES
              </p>
              {stepsData.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                const isCompleted = activeStepIndex > idx;
                return (
                  <button
                    key={step.id}
                    onClick={() => handleStepClick(idx)}
                    className={`w-full text-left transition-all duration-300 flex items-center gap-3.5 p-3 rounded-2xl border ${
                      isActive
                        ? "bg-white border-[#F05A22] text-[#141414] shadow-lg shadow-black/[0.04] translate-x-2"
                        : isCompleted
                        ? "bg-white/60 border-[#EAEAEA] text-[#141414] hover:bg-white"
                        : "bg-transparent border-transparent text-[#666666] hover:text-[#141414]"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-black transition-all ${
                        isActive
                          ? "bg-[#F05A22] text-white"
                          : isCompleted
                          ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30"
                          : "bg-black/5 text-[#666666]"
                      }`}
                    >
                      {isCompleted ? "✓" : step.stepNum}
                    </div>
                    <div>
                      <p className="text-xs font-black leading-tight">
                        {step.title.split(" ")[0]} {step.title.split(" ")[1] || ""}
                      </p>
                      <p className="text-[10px] font-mono text-[#666666] uppercase mt-0.5 font-medium">
                        Phase {step.stepNum}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CENTER COLUMN: Text & Typography Panel (4 cols) */}
            <div className="lg:col-span-4 relative min-h-[300px] sm:min-h-[340px] flex items-center">
              {stepsData.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={step.id}
                    className={`process-card-${idx} ${
                      isActive
                        ? "relative z-20 opacity-100 visible block"
                        : "hidden lg:block absolute inset-0 z-10 opacity-0 invisible pointer-events-none"
                    } space-y-5`}
                  >
                    {/* Step Tag */}
                    <div className="inline-flex items-center gap-2 bg-white border border-[#EAEAEA] text-[#141414] shadow-sm rounded-full px-4 py-1.5 text-xs font-mono font-bold tracking-wider">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: step.accentColor }}
                      />
                      {step.tag}
                    </div>

                    {/* Outlined Number */}
                    <div className="flex items-baseline gap-4">
                      <span
                        className="text-6xl sm:text-8xl font-black font-mono tracking-tighter leading-none"
                        style={{
                          WebkitTextStroke: `2px ${step.accentColor}`,
                          color: "transparent",
                        }}
                      >
                        {step.stepNum}
                      </span>
                      <span className="text-xs font-bold text-[#666666] bg-white px-3.5 py-1 rounded-full border border-[#EAEAEA] shadow-sm">
                        {step.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2.5">
                      <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#141414] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[#666666] text-sm leading-relaxed font-medium">
                        {step.desc}
                      </p>
                    </div>

                    {/* Action Pill Button */}
                    <div className="pt-2">
                      <Link
                        href={step.ctaLink}
                        className="inline-flex items-center gap-3 font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-full text-white transition-all shadow-lg hover:scale-105"
                        style={{ backgroundColor: step.accentColor }}
                      >
                        {step.ctaText} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT COLUMN: Animated Visual Stage (5 cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[340px] lg:min-h-[420px] flex items-center justify-center">
              {stepsData.map((step, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={step.id}
                    className={`process-visual-${idx} ${
                      isActive
                        ? "relative z-20 opacity-100 visible block"
                        : "hidden lg:block absolute inset-0 z-10 opacity-0 invisible pointer-events-none"
                    } w-full`}
                  >
                    {/* Visual Card Wrapper */}
                    <div className="relative rounded-[24px] bg-white border border-[#EAEAEA] p-6 sm:p-7 shadow-xl shadow-black/[0.04] overflow-hidden group">
                      
                      {/* Step 1 Visual: Upload Drag-Drop */}
                      {step.id === 1 && (
                        <div className="space-y-5 text-center py-4">
                          <div className="w-20 h-20 bg-[#F05A22]/10 border-2 border-dashed border-[#F05A22] rounded-3xl flex items-center justify-center mx-auto animate-pulse">
                            <Upload className="w-9 h-9 text-[#F05A22]" />
                          </div>
                          <div className="bg-[#FAF9F6] rounded-2xl p-4 border border-[#EAEAEA] text-left space-y-2">
                            <div className="flex items-center justify-between text-xs text-[#666666] font-medium">
                              <span>Reference_sketch_2025.png</span>
                              <span className="text-emerald-600 font-bold">100% Uploaded</span>
                            </div>
                            <div className="h-2 w-full bg-[#EAEAEA] rounded-full overflow-hidden">
                              <div className="h-full bg-[#F05A22] w-full rounded-full" />
                            </div>
                          </div>
                          <div className="flex gap-2 justify-center">
                            {["Oversized Fit", "240 GSM", "Front+Back"].map((t) => (
                              <span key={t} className="text-[10px] font-bold bg-white border border-[#EAEAEA] px-3 py-1 rounded-full text-[#666666]">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 2 Visual: Vector Studio */}
                      {step.id === 2 && (
                        <div className="space-y-4 py-3">
                          <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2.5">
                            <div className="flex items-center gap-2">
                              <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-[10px] font-mono text-[#666666]">Vector_Studio_v2.ai</span>
                          </div>
                          <div className="aspect-video bg-[#141414] rounded-2xl border border-black/10 p-4 flex flex-col justify-between relative overflow-hidden text-white">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#7C3AED]/20 to-transparent" />
                            <div className="flex items-center justify-between z-10">
                              <span className="text-[11px] font-mono text-[#7C3AED] font-bold">● LIVE VECTOR ARTWORK</span>
                              <span className="text-[11px] font-mono text-white/60">300 DPI</span>
                            </div>
                            <div className="text-center z-10 my-auto">
                              <p className="text-xl font-black uppercase text-white tracking-wider">DESIGNMYTEE</p>
                              <p className="text-[10px] text-[#7C3AED] font-mono mt-1">Color Separated · DTF Ready</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 3 Visual: 3D Proof Approval */}
                      {step.id === 3 && (
                        <div className="space-y-5 text-center py-4">
                          <div className="relative inline-block">
                            <div className="w-28 h-28 bg-[#FAF9F6] border border-[#EAEAEA] rounded-3xl flex items-center justify-center mx-auto shadow-md">
                              <span className="text-5xl">👕</span>
                            </div>
                            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-2 shadow-lg animate-bounce">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <span className="inline-block bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black uppercase px-4 py-1.5 rounded-full">
                              100% ARTWORK APPROVED
                            </span>
                            <p className="text-xs text-[#666666] font-medium mt-1.5">Ready for print production</p>
                          </div>
                        </div>
                      )}

                      {/* Step 4 Visual: DTF Printer */}
                      {step.id === 4 && (
                        <div className="space-y-4 py-3">
                          <div className="flex items-center justify-between text-xs font-mono text-[#666666] border-b border-[#EAEAEA] pb-2.5">
                            <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                              <Printer className="w-4 h-4" /> DTF PRINTER ONLINE
                            </span>
                            <span>TEMP: 165°C</span>
                          </div>
                          <div className="bg-[#141414] text-white rounded-2xl p-4 border border-black/10 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span>Substrate: 100% Combed Cotton</span>
                              <span className="text-amber-400 font-bold">Layer 2/2</span>
                            </div>
                            <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden p-0.5">
                              <div className="h-full bg-gradient-to-r from-amber-500 to-[#F05A22] w-3/4 rounded-full animate-pulse" />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 5 Visual: Quality Check */}
                      {step.id === 5 && (
                        <div className="space-y-3 py-3">
                          <div className="flex items-center justify-between text-xs font-mono text-[#666666] border-b border-[#EAEAEA] pb-2.5">
                            <span className="flex items-center gap-1.5 text-amber-600 font-bold">
                              <ShieldCheck className="w-4 h-4" /> QUALITY CONTROL PASSED
                            </span>
                          </div>
                          <div className="space-y-2 text-xs">
                            {[
                              { label: "Fabric GSM & Weight Check", ok: true },
                              { label: "Print Stretch & Wash Resistance Test", ok: true },
                              { label: "Stitching Integrity & Hem Inspection", ok: true },
                            ].map((check) => (
                              <div key={check.label} className="flex items-center justify-between bg-[#FAF9F6] p-2.5 rounded-xl border border-[#EAEAEA]">
                                <span className="text-[#141414] font-medium">{check.label}</span>
                                <span className="text-emerald-600 font-bold">✓ PASSED</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 6 Visual: Package Dispatch */}
                      {step.id === 6 && (
                        <div className="space-y-4 text-center py-4">
                          <div className="w-18 h-18 bg-[#F05A22]/10 border border-[#F05A22] rounded-3xl flex items-center justify-center mx-auto text-[#F05A22] shadow-md p-4">
                            <PackageCheck className="w-9 h-9" />
                          </div>
                          <div className="space-y-1">
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold px-4 py-1 rounded-full inline-block">
                              TRACKING: DMT-KCH-8492
                            </span>
                            <p className="text-xs text-[#666666] font-medium mt-1.5">Dispatched via BlueDart Express · Pan-India</p>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* MOBILE NEXT/PREV STEP BUTTONS (< 1024px) */}
        <div className="flex lg:hidden items-center justify-between px-4 sm:px-6 py-3 border-t border-[#EAEAEA] relative z-20">
          <button
            onClick={handlePrev}
            disabled={activeStepIndex === 0}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white border border-[#EAEAEA] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="text-xs font-mono text-[#666666]">
            {activeStepIndex + 1} of {stepsData.length}
          </span>

          <button
            onClick={handleNext}
            disabled={activeStepIndex === stepsData.length - 1}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-[#F05A22] text-white shadow-md disabled:opacity-30 disabled:pointer-events-none"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footer Progress Tracker Line inside Section */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-6 pt-2 border-t border-[#EAEAEA]">
          <div className="flex items-center justify-between text-xs font-mono text-[#666666] mb-2 font-medium">
            <span>START: BRIEF SUBMISSION</span>
            <span className="text-[#F05A22] font-bold">
              {Math.round(((activeStepIndex + 1) / stepsData.length) * 100)}% COMPLETE
            </span>
            <span>END: DOORSTEP DELIVERY</span>
          </div>
          <div className="h-1.5 w-full bg-[#EAEAEA] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F05A22] via-purple-600 to-[#F05A22] transition-all duration-500 rounded-full"
              style={{
                width: `${((activeStepIndex + 1) / stepsData.length) * 100}%`,
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
