import { useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { ArrowRight, Layers, Eye, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlueprintBlobBackground from './BlueprintBlobBackground';
import AirtechMotor3DViewer from './AirtechMotor3DViewer';

interface CalloutHotspot {
  id: string;
  title: string;
  desc: string;
  coordLabel: string;
  top: string;
  left: string;
}

const CALLOUTS: CalloutHotspot[] = [
  {
    id: 'stator',
    title: 'High-Density Copper Stator Winding',
    desc: 'Precision-wound copper coils maximize magnetic flux and minimize resistive losses for consistent high-efficiency output.',
    coordLabel: 'COPPER // 90% EFF',
    top: '45%',
    left: '50%',
  },
  {
    id: 'rotor',
    title: 'Precision-Balanced Rotor Assembly',
    desc: 'Stacked steel laminations reduce eddy-current losses while a dynamically balanced rotor keeps vibration and noise to a minimum at rated RPM.',
    coordLabel: 'ROTOR // 3000 RPM',
    top: '48%',
    left: '35%',
  },
  {
    id: 'bearing',
    title: 'Front & Rear Sealed Bearings',
    desc: 'Matched front and rear bearings support the shaft with low-friction, long-life operation under continuous industrial duty cycles.',
    coordLabel: 'BEARING // SEALED',
    top: '55%',
    left: '20%',
  },
  {
    id: 'cooling',
    title: 'Finned Housing & Rear Cooling Fan',
    desc: 'Ribbed housing fins paired with rear-fan-driven airflow pull heat away from the stator, sustaining full output without thermal derating.',
    coordLabel: 'COOLING // IP55',
    top: '45%',
    left: '70%',
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<'blueprint' | 'photorealistic'>('blueprint');
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  // Scroll Progress tracking inside the sticky container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track raw scroll numeric value for 3D model camera/transform interpolation
  const [rawScrollVal, setRawScrollVal] = useState(0);

  scrollYProgress.on('change', (val) => {
    setRawScrollVal(val);
  });

  // Derived scroll values for reliable rendering
  // Text fades out between 0.05 and 0.15
  const textOpacityVal = rawScrollVal < 0.05 ? 1 : Math.max(0, 1 - (rawScrollVal - 0.05) / 0.1);
  const textYVal = rawScrollVal < 0.15 ? -(rawScrollVal / 0.15) * 100 : -100;

  // Hotspots fade in between 0.75 and 0.85
  const hotspotsOpacityVal = rawScrollVal < 0.75 ? 0 : Math.min(1, (rawScrollVal - 0.75) / 0.1);

  return (
    <div ref={containerRef} className="relative w-full h-[400vh] bg-[#f4f7f9]">
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* Animated Blueprint Background */}
        <BlueprintBlobBackground />

        {/* CTA & Controls (Render Mode Switcher) */}
        <div className="absolute top-6 right-6 md:right-12 z-40 pointer-events-auto">
          <div className="hidden lg:flex items-center gap-2 p-1 bg-white/20 backdrop-blur-md rounded-full shadow-sm border border-white/30">
            <button
              onClick={() => setRenderMode('blueprint')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                renderMode === 'blueprint'
                  ? 'bg-red-600 text-white shadow'
                  : 'text-slate-600 hover:text-red-600'
              }`}
            >
              <Eye size={13} /> Blueprint
            </button>
            <button
              onClick={() => setRenderMode('photorealistic')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                renderMode === 'photorealistic'
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Layers size={13} /> 3D Mode
            </button>
          </div>
        </div>

        {/* Center 3D Three.js Canvas */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <AirtechMotor3DViewer
            scrollProgress={rawScrollVal}
            renderMode={renderMode}
            activeHotspotId={activeHotspotId}
          />
        </div>

        {/* ================= STAGE 1 & 2: HERO TEXT OVERLAY (0 - 0.30 SCROLL) ================= */}
        <motion.div
          style={{ opacity: textOpacityVal, y: textYVal }}
          className="relative mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center items-center text-center z-20 pointer-events-none"
        >
          <div className="max-w-4xl space-y-6 flex flex-col items-center pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50/80 border border-red-100 backdrop-blur-sm text-red-600 font-mono text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
              <Sparkles size={14} className="text-red-500" />
              Our Solutions
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.05] max-w-5xl text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 pb-2">
              Materials characterization testing services for fast, reliable insights
              <span className="block mt-5 text-3xl md:text-4xl lg:text-5xl font-medium text-slate-500 leading-tight">
                and instrumentation for rapid screening of sorbents
              </span>
            </h1>

            <div className="pt-10">
              <Link
                to="/contact"
                className="inline-flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-full font-display text-lg font-semibold hover:bg-red-600 hover:shadow-xl hover:shadow-red-600/20 transition-all duration-300 group"
              >
                Contact Us
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ================= STAGE 4: INTERACTIVE CALLOUT HOTSPOTS (0.8 - 1.0 SCROLL) ================= */}
        <motion.div
          style={{ opacity: hotspotsOpacityVal }}
          className="absolute inset-0 z-20 pointer-events-none"
        >
          {CALLOUTS.map((spot) => {
            const isActive = activeHotspotId === spot.id;
            return (
              <div
                key={spot.id}
                style={{ top: spot.top, left: spot.left }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <div className="relative group">
                  <button
                    onClick={() => setActiveHotspotId(isActive ? null : spot.id)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      isActive ? 'scale-125 bg-red-600 text-white shadow-lg' : 'bg-white/90 text-red-600 hover:scale-110 shadow-md border border-red-300'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
                    <Sparkles size={14} className="relative z-10" />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.85, scale: isActive ? 1.05 : 1 }}
                    className={`mt-3 w-64 md:w-72 p-4 bg-white/90 backdrop-blur-xl border ${
                      isActive ? 'border-red-500 shadow-xl ring-2 ring-red-400/30' : 'border-red-200/80 shadow-md'
                    } rounded-2xl transition-all`}
                  >
                    <span className="font-mono text-[9px] font-bold text-red-600 tracking-wider uppercase block">
                      {spot.coordLabel}
                    </span>
                    <h4 className="font-heading text-sm font-bold text-slate-900 mt-1">
                      {spot.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-600 mt-1 leading-relaxed">
                      {spot.desc}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll Progress Indicator Bar at Bottom */}
        <div className="absolute bottom-6 left-6 md:left-12 z-30 flex items-center gap-3 pointer-events-none select-none">
          <div className="w-1.5 h-12 bg-red-200/80 rounded-full relative overflow-hidden">
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute top-0 left-0 w-full h-full bg-red-600 origin-top rounded-full"
            />
          </div>
          <div className="flex flex-col text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
            <span className="text-slate-900">SCROLL INTERACTIVE</span>
            <span>{Math.round(rawScrollVal * 100)}% EXPLORED</span>
          </div>
        </div>
      </div>
    </div>
  );
}
