import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Activity,
  ShieldCheck,
  Drill,
  ChevronDown,
  Gauge,
  Compass,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import BlueprintBlobBackground from "./BlueprintBlobBackground";
import AirtechMotor3DViewer from "./AirtechMotor3DViewer";

// ─── PSRS Rock Drills Product Showcase Slides (Core Machinery Itinerary) ────
const SLIDES = [
  {
    id: "crawler",
    img: "/images/products/crawler_drill_rig.png",
    name: "PSR-C300 Heavy Hydraulic Crawler Rig",
    series: "SERIES: CR-HEAVY // 2026",
    tag: "OPEN-PIT MINING & QUARRYING",
    desc: "Heavy-duty crawler drill with automated rod handling and high-torque rotary head, engineered for steep quarry inclines and tough rock formations.",
    specs: [
      { label: "Hole Diameter", val: "102 – 165 mm", icon: Compass },
      { label: "Drill Depth", val: "30 Meters", icon: Gauge },
      { label: "Engine Power", val: "225 HP Diesel", icon: Zap },
    ],
    badge: "HEAVY DUTY",
    efficiency: "98.8%",
  },
  {
    id: "rock-drill",
    img: "/images/products/rock_drill.png",
    name: "PSR-75 Heavy Pneumatic Sinker Rock Drill",
    series: "SERIES: RD-PNEUMATIC",
    tag: "UNDERGROUND MINING & TUNNELLING",
    desc: "High-frequency pneumatic rock drill delivering extreme impact energy with reduced air consumption and anti-vibration damping for operator safety.",
    specs: [
      { label: "Impact Rate", val: "1,200+ BPM", icon: Zap },
      { label: "Hole Range", val: "32 – 45 mm", icon: Compass },
      { label: "Air Consumption", val: "58 L/s @ 6 Bar", icon: Gauge },
    ],
    badge: "HIGH IMPACT",
    efficiency: "99.2%",
  },
  {
    id: "wagon",
    img: "/images/products/wagon_drill.png",
    name: "PSR-W200 High-Pressure Wagon Drill Rig",
    series: "SERIES: WG-SURFACE",
    tag: "SURFACE DRILLING & CIVIL ANCHORING",
    desc: "Versatile four-wheel steer wagon drill with 360-degree mast articulation for fast secondary blasting and geotechnical foundation drilling.",
    specs: [
      { label: "Drill Capacity", val: "100 – 150 mm", icon: Compass },
      { label: "Feed Length", val: "3.2 Meters", icon: Gauge },
      { label: "Operating Pressure", val: "7 – 14 Bar", icon: Zap },
    ],
    badge: "VERSATILE",
    efficiency: "97.5%",
  },
  {
    id: "inwell",
    img: "/images/products/inwell_drill.png",
    name: "PSR-IW400 Deep Bore In-Well Drill System",
    series: "SERIES: IW-BOREHOLE",
    tag: "DEEP WATER WELL & GEOTHERMAL",
    desc: "Engineered for deep-strata penetration with high-torque hydraulic rotation, reinforced mast guides, and downhole mud/air flushing.",
    specs: [
      { label: "Max Depth", val: "150+ Meters", icon: Gauge },
      { label: "Hole Diameter", val: "115 – 254 mm", icon: Compass },
      { label: "Torque Output", val: "4,500 Nm", icon: Zap },
    ],
    badge: "DEEP BORE",
    efficiency: "98.1%",
  },
  {
    id: "tools",
    img: "/images/products/drilling_tools.png",
    name: "PSR Tungsten DTH Hammers & Button Bits",
    series: "SERIES: DTH-CARBIDE",
    tag: "CONSUMABLES & TOOLING SYSTEMS",
    desc: "Premium tungsten-carbide button bits and valveless DTH hammers forged from aerospace-grade alloy steel for maximum wear resistance.",
    specs: [
      { label: "Bit Hardness", val: "1,600+ HV", icon: Zap },
      { label: "Size Range", val: '3.0" – 12.0"', icon: Compass },
      { label: "Fatigue Life", val: "+45% Extended", icon: Gauge },
    ],
    badge: "ISO GRADE",
    efficiency: "99.6%",
  },
  {
    id: "slim",
    img: "/images/products/slim_drill.png",
    name: "PSR-SL50 Compact Exploration Slim Drill",
    series: "SERIES: SL-EXPLORE",
    tag: "MINERAL EXPLORATION & CORE SAMPLING",
    desc: "Ultra-compact modular drill rig designed for tight underground galleries, heli-portable exploration camps, and core sampling.",
    specs: [
      { label: "Hole Size", val: "45 – 76 mm", icon: Compass },
      { label: "Module Weight", val: "< 180 kg / part", icon: Gauge },
      { label: "Feed Force", val: "18 kN", icon: Zap },
    ],
    badge: "MODULAR",
    efficiency: "96.9%",
  },
];

// Slideshow interval (3.2 seconds)
const INTERVAL_MS = 3200;

interface CalloutSpec {
  label: string;
  value: string;
}

interface Callout {
  id: string;
  tag: string;
  title: string;
  category: string;
  desc: string;
  coordLabel: string;
  specs: CalloutSpec[];
  top: string;
  left: string;
}

const CALLOUTS: Callout[] = [
  {
    id: "bearing",
    tag: "01",
    title: "Sealed Bearings",
    category: "ROTARY DRIVE",
    desc: "Matched precision deep-groove bearings engineered for severe radial & axial shock loads with zero lubrication maintenance.",
    coordLabel: "BEARING // IP67 SEALED // 52100 STEEL",
    specs: [
      { label: "Dynamic Load", value: "48.5 kN Rating" },
      { label: "Protection", value: "IP67 Dual Lip Seal" },
      { label: "Material", value: "52100 Chrome Steel" },
      { label: "Service Life", value: "20,000+ Hours" },
    ],
    top: "18%",
    left: "20%",
  },
  {
    id: "stator",
    tag: "02",
    title: "Stator Housing & Coils",
    category: "ELECTROMAGNETIC CORE",
    desc: "High-density oxygen-free copper coils with Class H insulation provide sustained 90%+ electrical efficiency in high-ambient drilling.",
    coordLabel: "STATOR // 92.8% EFF // CLASS H 180°C",
    specs: [
      { label: "Winding", value: "99.9% OFHC Copper" },
      { label: "Efficiency", value: "92.8% at Full Load" },
      { label: "Insulation", value: "Class H (180°C Max)" },
      { label: "Core", value: "Silicon Steel M400" },
    ],
    top: "18%",
    left: "40%",
  },
  {
    id: "rotor",
    tag: "03",
    title: "Precision Rotor Shaft",
    category: "POWER TRANSMISSION",
    desc: "ISO G1.0 dynamically balanced rotor with forged high-tensile shaft prevents harmful harmonics during continuous 3,000 RPM operation.",
    coordLabel: "ROTOR // 3000 RPM // ISO G1.0 BALANCED",
    specs: [
      { label: "Balance Grade", value: "ISO G1.0 Precision" },
      { label: "Shaft Alloy", value: "EN24T Forged Steel" },
      { label: "Max Speed", value: "3,000 RPM Rated" },
      { label: "Peak Torque", value: "280 Nm Output" },
    ],
    top: "18%",
    left: "60%",
  },
  {
    id: "cooling",
    tag: "04",
    title: "Cooling Fan & Housing",
    category: "THERMAL MANAGEMENT",
    desc: "Aerodynamically shaped forced-draft cooling fan and heavy finned heat-sink frame maintain continuous peak duty without thermal derating.",
    coordLabel: "COOLING // 220 CFM // IP55 ENCLOSURE",
    specs: [
      { label: "Airflow", value: "220 CFM Forced Draft" },
      { label: "Frame Alloy", value: "Cast Aluminum A380" },
      { label: "Ambient Temp", value: "-20°C to +55°C" },
      { label: "Enclosure", value: "IP55 Dust & Splash" },
    ],
    top: "18%",
    left: "80%",
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D viewer state
  const [renderMode, setRenderMode] = useState<"blueprint" | "photorealistic">("blueprint");
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [rawScrollVal, setRawScrollVal] = useState(0);
  scrollYProgress.on("change", setRawScrollVal);

  // Derived opacities
  const heroOpacity = rawScrollVal < 0.12 ? 1 : Math.max(0, 1 - (rawScrollVal - 0.12) / 0.12);
  const heroY = rawScrollVal < 0.25 ? -(rawScrollVal / 0.25) * 100 : -100;
  const viewerOpacity = rawScrollVal < 0.18 ? 0 : rawScrollVal < 0.32 ? (rawScrollVal - 0.18) / 0.14 : 1;
  // Reveal part name labels ONLY after motor disassembly completes (scroll >= 0.70)
  const isDisassembled = rawScrollVal >= 0.70;
  const hotspotsOpacity = rawScrollVal < 0.70 ? 0 : Math.min(1, (rawScrollVal - 0.70) / 0.04);

  // Slideshow state
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  const activeSlide = SLIDES[current];

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-white">
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/*  STICKY FULLSCREEN VIEWPORT                                   */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        {/* Layered Clean Technical Background in Red & White */}
        <BlueprintBlobBackground />

        {/* ══════════════════════════════════════════════════════════════
            STAGE 1 — HIGH-IMPACT PRODUCT SLIDESHOW SHOWCASE
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="absolute inset-0 z-20 flex flex-col justify-between pt-24 pb-4 px-6 md:px-12 lg:px-16 pointer-events-none"
        >
          {/* Main Grid: Left Spec Console + Right Cinema Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 max-w-7xl mx-auto w-full">
            
            {/* ── LEFT COLUMN (6 cols): Specifications & Call to Action ── */}
            <div className="lg:col-span-6 flex flex-col justify-center pointer-events-auto space-y-4">
              
              {/* Header Badge Row with Handshake Emblem */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-red text-white font-mono text-[10px] font-bold tracking-widest uppercase shadow-sm shadow-brand-red/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  {activeSlide.badge}
                </span>
                <span className="font-mono text-xs font-bold text-brand-red tracking-wider">
                  {activeSlide.series}
                </span>
                <span className="text-brand-bordergray">|</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-600 uppercase">
                  <ShieldCheck size={14} className="text-brand-red" /> ISO 9001:2015
                </span>
              </div>

              {/* Machine Category Tag */}
              <div className="flex items-center gap-2 text-brand-red font-heading text-xs font-bold uppercase tracking-[0.2em]">
                <Sparkles size={14} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`tag-${current}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeSlide.tag}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Main Machine Name Headline */}
              <div className="min-h-[78px] flex items-center">
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={`title-${current}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="font-display font-black text-brand-charcoal text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.1]"
                  >
                    {activeSlide.name}
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Description */}
              <div className="min-h-[48px]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`desc-${current}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, delay: 0.05 }}
                    className="font-sans text-sm md:text-base text-brand-graphite leading-relaxed line-clamp-2"
                  >
                    {activeSlide.desc}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Live Technical Specs Pods (3 Columns in Red & White Theme) */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <AnimatePresence mode="wait">
                  {activeSlide.specs.map((s, idx) => {
                    const IconComp = s.icon;
                    return (
                      <motion.div
                        key={`spec-${current}-${idx}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, delay: idx * 0.06 }}
                        className="p-3 rounded-2xl bg-white border border-brand-bordergray shadow-sm hover:border-brand-red/60 transition-all flex flex-col justify-between relative overflow-hidden group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                            {s.label}
                          </span>
                          <IconComp size={13} className="text-brand-red/60 group-hover:text-brand-red transition-colors" />
                        </div>
                        <span className="font-heading font-black text-xs sm:text-sm text-brand-charcoal mt-1.5 block">
                          {s.val}
                        </span>
                        {/* Top red accent line */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-red opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Action Buttons & Manual Controls */}
              <div className="flex items-center gap-3.5 pt-2 flex-wrap">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-brand-red text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-brand-crimson hover:shadow-lg hover:shadow-red-600/30 transition-all duration-200 group"
                >
                  <Drill size={15} className="rotate-45" />
                  Request Factory Quote
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-brand-bordergray font-heading text-xs font-bold uppercase tracking-wider text-brand-charcoal hover:border-brand-red hover:text-brand-red transition-all shadow-sm"
                >
                  Explore Catalog
                </Link>

                {/* Slide Capsule & Arrow Controls */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <div className="px-2.5 py-1 rounded-full bg-white border border-brand-bordergray font-mono text-[11px] font-bold text-brand-charcoal shadow-sm">
                    <span className="text-brand-red">0{current + 1}</span> / 0{SLIDES.length}
                  </div>
                  <button
                    onClick={prev}
                    aria-label="Previous Slide"
                    className="w-9 h-9 rounded-full bg-white border border-brand-bordergray hover:border-brand-red hover:text-brand-red flex items-center justify-center text-brand-charcoal transition-all shadow-sm"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={next}
                    aria-label="Next Slide"
                    className="w-9 h-9 rounded-full bg-white border border-brand-bordergray hover:border-brand-red hover:text-brand-red flex items-center justify-center text-brand-charcoal transition-all shadow-sm"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN (6 cols): Immersive Cinematic Showcase ── */}
            <div
              className="lg:col-span-6 relative flex items-center justify-center pointer-events-auto"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {/* Media Glass Showcase Frame */}
              <div className="relative w-full max-w-[460px] sm:max-w-[480px] lg:max-w-[500px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-2 border-white bg-white/70 backdrop-blur-xl group mx-auto">
                
                {/* Product Image Crossfade with Ken-Burns Motion */}
                <AnimatePresence mode="sync">
                  <motion.div
                    key={`img-box-${current}`}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={activeSlide.img}
                      alt={activeSlide.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Overlays: Subtle Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent pointer-events-none" />

                {/* HUD Top Left: Telemetry Data */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none">
                  <div className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] font-bold flex items-center gap-2">
                    <Activity size={12} className="text-emerald-400 animate-pulse" />
                    <span>SYS EFF: {activeSlide.efficiency}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-brand-red text-white font-mono text-[10px] font-bold shadow-sm shadow-brand-red/30">
                    DRILL READY
                  </div>
                </div>

                {/* HUD Bottom Left: Machine Identifier */}
                <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                  <div className="px-3.5 py-2 rounded-xl bg-black/70 backdrop-blur-md border border-white/20 text-white">
                    <span className="font-mono text-[9px] font-bold text-red-400 tracking-wider uppercase block">
                      {activeSlide.tag}
                    </span>
                    <span className="font-heading font-extrabold text-sm text-white block mt-0.5">
                      {activeSlide.name.split(" ")[0]} {activeSlide.name.split(" ")[1]}
                    </span>
                  </div>
                </div>

                {/* Corner Target Reticles in Brand Red */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                  <path d="M 3 10 L 3 3 L 10 3" fill="none" stroke="rgba(200,16,46,0.9)" strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M 90 3 L 97 3 L 97 10" fill="none" stroke="rgba(200,16,46,0.9)" strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M 3 90 L 3 97 L 10 97" fill="none" stroke="rgba(200,16,46,0.9)" strokeWidth="0.9" strokeLinecap="round" />
                  <path d="M 90 97 L 97 97 L 97 90" fill="none" stroke="rgba(200,16,46,0.9)" strokeWidth="0.9" strokeLinecap="round" />
                </svg>

                {/* Progress bar inside card bottom */}
                {!paused && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <motion.div
                      key={`card-prog-${current}`}
                      className="h-full bg-brand-red origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL_MS / 1000, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── BOTTOM ROW: Interactive Machine Carousel Deck (Itinerary Bar) ── */}
          <div className="w-full max-w-7xl mx-auto pointer-events-auto pt-2 pb-1">
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 p-2 rounded-2xl bg-white/90 backdrop-blur-md border border-brand-bordergray shadow-lg">
              {SLIDES.map((slide, i) => {
                const isSelected = i === current;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setCurrent(i)}
                    className={`group relative flex items-center gap-2 p-1.5 rounded-xl transition-all duration-200 text-left ${
                      isSelected
                        ? "bg-brand-charcoal text-white shadow-md ring-2 ring-brand-red"
                        : "hover:bg-brand-softwhite text-brand-charcoal border border-transparent hover:border-brand-bordergray"
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-black/10 bg-slate-100">
                      <img
                        src={slide.img}
                        alt={slide.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="hidden sm:flex flex-col overflow-hidden">
                      <span
                        className={`font-mono text-[8px] font-bold uppercase tracking-wider ${
                          isSelected ? "text-red-400" : "text-brand-red"
                        }`}
                      >
                        0{i + 1} // {slide.badge}
                      </span>
                      <span className="font-heading text-[11px] font-bold truncate">
                        {slide.name.split(" ")[0]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            STAGE 2 — 3D DISASSEMBLY VIEWER (scroll 0.25 → 1.0)
        ══════════════════════════════════════════════════════════════ */}
        <motion.div
          style={{ opacity: viewerOpacity, zIndex: 10 }}
          className="absolute inset-0 pointer-events-none"
        >
          <AirtechMotor3DViewer
            scrollProgress={rawScrollVal}
            renderMode={renderMode}
            activeHotspotId={activeHotspotId}
          />
        </motion.div>

        {/* ══════════════════════════════════════════════════════════════
            STAGE 3 — CLEAN TECHNICAL PART LABELS (near each part)
        ══════════════════════════════════════════════════════════════ */}
        {isDisassembled && (
          <div
            style={{ zIndex: 40 }}
            className="absolute inset-0 pointer-events-none"
          >
              {CALLOUTS.map((spot) => {
                const isActive = activeHotspotId === spot.id;
                
                // Smart horizontal alignment to avoid screen edge clipping
                const cardTranslateClass =
                  spot.id === "cooling"
                    ? "-translate-x-[80%]"
                    : spot.id === "bearing"
                    ? "-translate-x-[20%]"
                    : "-translate-x-1/2";
                const caretTranslateClass =
                  spot.id === "cooling"
                    ? "right-16"
                    : spot.id === "bearing"
                    ? "left-16"
                    : "left-1/2 -translate-x-1/2";

                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left, zIndex: isActive ? 50 : 40 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
                    onMouseEnter={() => setActiveHotspotId(spot.id)}
                    onMouseLeave={() => setActiveHotspotId(null)}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* High-Prominence Technical Name Pill */}
                      <button
                        onClick={() => setActiveHotspotId(isActive ? null : spot.id)}
                        className={`relative flex items-center gap-2.5 px-4 py-2.5 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-brand-red text-white border-white shadow-[0_0_30px_rgba(200,16,46,0.9)] scale-110 ring-4 ring-brand-red/40 z-30"
                            : "bg-white text-brand-charcoal border-brand-red/60 hover:border-brand-red shadow-lg hover:shadow-xl hover:scale-105"
                        }`}
                      >
                        {/* Glowing Pin Indicator */}
                        <span
                          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                            isActive
                              ? "bg-white ring-4 ring-white/40 animate-ping"
                              : "bg-brand-red ring-2 ring-brand-red/30 animate-pulse"
                          }`}
                        />
                        <span className="font-heading text-xs font-black whitespace-nowrap tracking-wide">
                          {spot.title}
                        </span>
                      </button>

                      {/* Leader pin pointing towards 3D motor component */}
                      <div className="w-[2px] h-4 bg-gradient-to-b from-brand-red to-transparent mx-auto pointer-events-none" />

                      {/* ULTRA-PROMINENT TACTICAL HUD SPECIFICATION CARD */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.95 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className={`absolute top-full mt-2 w-[350px] sm:w-[390px] z-50 pointer-events-auto text-left ${cardTranslateClass}`}
                          >
                            <div className="relative p-5 bg-[#080a10] text-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.98),0_0_40px_rgba(200,16,46,0.6)] border-2 border-brand-red ring-1 ring-white/20">
                              {/* Top glowing red hairline accent */}
                              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-red via-rose-400 to-brand-red rounded-t-2xl" />

                              {/* Caret Pointer Arrow */}
                              <div
                                className={`absolute -top-2 w-4 h-4 bg-[#080a10] border-t-2 border-l-2 border-brand-red rotate-45 z-10 ${caretTranslateClass}`}
                              />

                              {/* Corner Reticles (CAD Blueprint Crosshairs) */}
                              <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-brand-red/60 pointer-events-none" />
                              <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-brand-red/60 pointer-events-none" />

                              {/* Top Header Row */}
                              <div className="flex items-center justify-between gap-2 mb-2.5 relative z-20">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-md bg-brand-red text-white font-mono text-[11px] font-black tracking-wider shadow-sm shadow-red-600/50">
                                    {spot.tag}
                                  </span>
                                  <span className="font-mono text-[10px] font-black text-red-400 uppercase tracking-widest">
                                    {spot.category}
                                  </span>
                                </div>
                                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold text-slate-200 bg-white/10 border border-white/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  ISO 9001 SPEC
                                </span>
                              </div>

                              {/* Component Title & S/N Subtitle */}
                              <div className="relative z-20 mb-2">
                                <h4 className="font-heading text-base font-black text-white tracking-wide leading-tight">
                                  {spot.title}
                                </h4>
                                <div className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                  REF: {spot.coordLabel}
                                </div>
                              </div>

                              {/* Technical Description Box */}
                              <div className="relative z-20 bg-[#121622] p-2.5 rounded-xl border border-white/10 mb-3">
                                <p className="font-sans text-xs text-slate-100 leading-relaxed font-normal">
                                  {spot.desc}
                                </p>
                              </div>

                              {/* 4 Key Specs Grid */}
                              <div className="grid grid-cols-2 gap-2 relative z-20">
                                {spot.specs.map((spec) => (
                                  <div
                                    key={spec.label}
                                    className="relative overflow-hidden bg-[#131722] hover:bg-[#181d2c] px-3 py-2 rounded-xl border border-white/10 transition-colors shadow-inner"
                                  >
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-red" />
                                    <div className="text-[9px] font-mono font-bold uppercase text-slate-400 tracking-wider pl-1">
                                      {spec.label}
                                    </div>
                                    <div className="text-xs font-mono font-black text-white mt-0.5 tracking-tight pl-1">
                                      {spec.value}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* Quality Assurance Footer */}
                              <div className="-mx-5 -mb-5 mt-4 px-5 py-3 rounded-b-2xl bg-[#040608] border-t border-white/10 flex items-center justify-between text-[10px] font-mono font-bold relative z-20">
                                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                                  <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                                  HEAVY MINING GRADE
                                </span>
                                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                                  100% FACTORY TESTED
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* ── Bottom HUD Footer: Scroll Prompt & Telemetry ── */}
        <div className="absolute bottom-3 left-6 md:left-12 z-30 flex items-center gap-3 pointer-events-none select-none">
          <div className="w-1.5 h-10 bg-red-200/80 rounded-full relative overflow-hidden">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-brand-red origin-top rounded-full"
            />
          </div>
          <div className="flex flex-col text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            <span className="text-brand-charcoal flex items-center gap-1">
              SCROLL INTERACTIVE <ChevronDown size={12} className="animate-bounce text-brand-red" />
            </span>
            <span>{Math.round(rawScrollVal * 100)}% EXPLORED</span>
          </div>
        </div>

        {/* ── Stage Indicator Chips (Bottom Right) ── */}
        <div className="absolute bottom-3 right-6 md:right-12 z-30 flex items-center gap-2 pointer-events-none select-none">
          {[
            { label: "01 Products", active: rawScrollVal < 0.25 },
            { label: "02 Disassembly", active: rawScrollVal >= 0.25 && rawScrollVal < 0.72 },
            { label: "03 Internals", active: rawScrollVal >= 0.72 },
          ].map((s) => (
            <span
              key={s.label}
              className={`font-mono text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full transition-all duration-300 ${
                s.active
                  ? "bg-brand-red text-white shadow-sm"
                  : "bg-white/80 text-slate-500 border border-brand-bordergray"
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
