import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Gauge, Cpu, CheckCircle2 } from 'lucide-react';

interface MetricPreset {
  id: string;
  title: string;
  sub: string;
  curve1: string; // Total uptake / total energy
  curve2: string; // CO2 / Efficiency
  curve3: string; // H2O / Impact
  xLabel: string;
  yLeft: string;
  val1: string;
  val2: string;
}

const PRESETS: MetricPreset[] = [
  {
    id: 'efficiency',
    title: 'Efficiency vs Load',
    sub: 'Real-time efficiency and thermal response under continuous rated load.',
    curve1: 'M 20,150 Q 150,40 450,60', // Efficiency (rises then flattens)
    curve2: 'M 20,200 Q 250,180 450,120', // Winding Temp (rises)
    curve3: '',
    xLabel: 'Load (%)',
    yLeft: 'Efficiency (%)',
    val1: '92%',
    val2: '5.5 kW / 3000 RPM',
  },
  {
    id: 'torque',
    title: 'Torque vs Speed',
    sub: 'Real-time efficiency and thermal response under continuous rated load.',
    curve1: 'M 20,40 Q 200,40 450,200',
    curve2: 'M 20,220 Q 250,120 450,40',
    curve3: '',
    xLabel: 'Speed (RPM)',
    yLeft: 'Torque (Nm)',
    val1: '92%',
    val2: '5.5 kW / 3000 RPM',
  },
  {
    id: 'thermal_rise',
    title: 'Thermal Rise vs Runtime',
    sub: 'Real-time efficiency and thermal response under continuous rated load.',
    curve1: 'M 20,200 Q 150,80 450,60',
    curve2: 'M 20,80 Q 220,80 450,80',
    curve3: '',
    xLabel: 'Runtime (Hours)',
    yLeft: 'Temperature (°C)',
    val1: '92%',
    val2: '5.5 kW / 3000 RPM',
  },
];

export default function MeasurementChart() {
  const [activeTab, setActiveTab] = useState<string>('efficiency');
  const current = PRESETS.find((p) => p.id === activeTab) || PRESETS[0];

  return (
    <div className="w-full max-w-xl p-8 bg-white/80 backdrop-blur-xl border border-sky-100 shadow-2xl rounded-3xl text-slate-800 space-y-6">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-mono uppercase font-bold tracking-widest text-sky-600 flex items-center gap-1.5">
            <Activity size={14} className="animate-pulse" /> PERFORMANCE TELEMETRY
          </span>
          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 mt-1">
            Measurement examples
          </h3>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-sky-50 rounded-full border border-sky-200/60 text-sky-700 text-xs font-medium">
          <CheckCircle2 size={13} className="text-sky-600" /> Live Data
        </div>
      </div>

      {/* Tab Selectors */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PRESETS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === p.id
                ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
            }`}
          >
            {p.title}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed font-sans">{current.sub}</p>

      {/* SVG Chart Container */}
      <div className="relative w-full h-[260px] bg-slate-50/70 border border-slate-200/60 rounded-2xl p-4 overflow-hidden">
        {/* Background Grid Lines */}
        <svg className="absolute inset-0 w-full h-full stroke-slate-200" width="100%" height="100%">
          <defs>
            <pattern id="chart-grid" width="60" height="40" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="2 2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chart-grid)" />
        </svg>

        {/* Dynamic Animated Curves */}
        <AnimatePresence mode="wait">
          <motion.svg
            key={current.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-[200px] overflow-visible"
            viewBox="0 0 500 240"
          >
            {/* Curve 1: Efficiency (Black curve) */}
            <motion.path
              d={current.curve1}
              fill="none"
              stroke="#0f172a"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            {/* Curve 2: Temp (Blue curve) */}
            <motion.path
              d={current.curve2}
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: 0.1 }}
            />

            {/* Curve Legend Annotations */}
            <text x="320" y="80" fill="#0f172a" fontSize="11" fontWeight="bold">
              Efficiency
            </text>
            <text x="340" y="145" fill="#0284c7" fontSize="11" fontWeight="bold">
              Winding Temp
            </text>
          </motion.svg>
        </AnimatePresence>

        {/* Axes Labels */}
        <div className="absolute bottom-2 left-12 right-12 flex justify-between text-[10px] font-mono font-medium text-slate-400">
          <span>0</span>
          <span>20</span>
          <span>40</span>
          <span>60</span>
        </div>
        <div className="absolute top-4 right-3 flex flex-col justify-between h-[180px] text-[10px] font-mono text-sky-700 font-medium">
          <span>0.20</span>
          <span>0.15</span>
          <span>0.10</span>
          <span>0.05</span>
          <span>0.00</span>
        </div>
        <div className="absolute bottom-2 right-1/2 translate-x-1/2 text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
          {current.xLabel}
        </div>
      </div>

      {/* Footer Metric Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3.5 bg-sky-50/70 border border-sky-100 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-600/10 text-sky-600 flex items-center justify-center shrink-0">
            <Gauge size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">PEAK EFFICIENCY</span>
            <span className="text-sm font-mono font-bold text-slate-900">{current.val1}</span>
          </div>
        </div>
        <div className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-900/10 text-slate-800 flex items-center justify-center shrink-0">
            <Cpu size={18} />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">RATED OUTPUT</span>
            <span className="text-sm font-mono font-bold text-slate-900">{current.val2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
