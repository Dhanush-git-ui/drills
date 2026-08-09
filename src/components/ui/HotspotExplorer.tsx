import { useState } from 'react';
import type { ProductHotspot } from '@/data/products';
import { Info, ShieldCheck, Settings, Wrench } from 'lucide-react';

interface HotspotExplorerProps {
  hotspots: ProductHotspot[];
  productType: string;
}

export default function HotspotExplorer({ hotspots, productType }: HotspotExplorerProps) {
  const [activeHotspot, setActiveHotspot] = useState<ProductHotspot | null>(null);

  // Generate a premium dynamic schematic SVG based on the product type as a high-tech backdrop
  const renderSchematicBackdrop = () => {
    return (
      <svg
        className="w-full h-full text-brand-bordergray stroke-current"
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Engineering grid lines */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(229, 229, 229, 0.4)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Schematic details and labels */}
        <g strokeWidth="1" className="stroke-brand-graphite/20 fill-brand-graphite/5" opacity="0.4">
          <circle cx="100" cy="100" r="30" />
          <circle cx="100" cy="100" r="4" />
          <line x1="50" y1="100" x2="150" y2="100" />
          <line x1="100" y1="50" x2="100" y2="150" />
          <text x="60" y="150" className="font-mono text-[9px] font-bold fill-brand-graphite/40 stroke-none">REF: PSR-ENG-REV3</text>
        </g>
        
        <g strokeWidth="1.5" opacity="0.9" className="stroke-brand-graphite/50">
          {productType === 'wagon' ? (
            <>
              {/* Detailed Wagon Drill */}
              <circle cx="220" cy="410" r="35" className="fill-brand-lightgray/10" />
              <circle cx="220" cy="410" r="8" />
              <circle cx="580" cy="410" r="35" className="fill-brand-lightgray/10" />
              <circle cx="580" cy="410" r="8" />
              <line x1="220" y1="410" x2="580" y2="410" />
              
              <rect x="250" y="380" width="300" height="25" rx="3" className="fill-brand-lightgray/5" />
              <line x1="220" y1="410" x2="250" y2="390" />
              <path d="M 580 410 L 630 390 L 680 395" />
              
              <rect x="260" y="405" width="10" height="25" />
              <line x1="265" y1="430" x2="265" y2="445" strokeWidth="2" />
              <line x1="255" y1="445" x2="275" y2="445" strokeWidth="3" />
              
              <rect x="540" y="405" width="10" height="25" />
              <line x1="545" y1="430" x2="545" y2="445" strokeWidth="2" />
              <line x1="535" y1="445" x2="555" y2="445" strokeWidth="3" />

              <circle cx="400" cy="350" r="20" className="fill-white" />
              <circle cx="400" cy="350" r="14" strokeDasharray="3,3" />
              <path d="M 330 380 L 400 350 L 470 380" />
              
              <g transform="rotate(-10, 400, 350)">
                <rect x="375" y="80" width="50" height="340" rx="3" className="fill-brand-lightgray/5" />
                <line x1="385" y1="80" x2="385" y2="420" strokeDasharray="2,2" />
                <line x1="415" y1="80" x2="415" y2="420" strokeDasharray="2,2" />
                <circle cx="400" cy="85" r="12" />
                <path d="M 375 120 L 425 150 M 425 120 L 375 150" strokeWidth="1" opacity="0.5" />
                <path d="M 375 200 L 425 230 M 425 200 L 375 230" strokeWidth="1" opacity="0.5" />
                <path d="M 375 280 L 425 310 M 425 280 L 375 310" strokeWidth="1" opacity="0.5" />
                <rect x="365" y="180" width="70" height="40" rx="4" className="fill-brand-red/10 stroke-brand-red" strokeWidth="2" />
                <line x1="400" y1="220" x2="400" y2="440" strokeWidth="3" className="stroke-brand-red" />
                <circle cx="400" cy="445" r="8" className="fill-brand-charcoal" />
              </g>

              <g className="fill-brand-graphite/60 font-mono text-[9px] stroke-none">
                <text x="470" y="100">FEED CHAIN TOWER</text>
                <line x1="435" y1="100" x2="465" y2="100" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="470" y="200">ROTARY MOTOR HEAD</text>
                <line x1="440" y1="200" x2="465" y2="200" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="600" y="375">TOWING CHASSIS</text>
                <line x1="565" y1="390" x2="595" y2="375" strokeWidth="0.5" className="stroke-brand-graphite/40" />
              </g>
            </>
          ) : productType === 'crawler' ? (
            <>
              {/* Detailed Crawler Drill Rig */}
              <rect x="220" y="375" width="360" height="55" rx="27.5" className="fill-brand-lightgray/5" />
              <line x1="220" y1="402" x2="580" y2="402" strokeDasharray="3,3" />
              
              <circle cx="255" cy="402" r="18" />
              <circle cx="310" cy="402" r="15" />
              <circle cx="365" cy="402" r="15" />
              <circle cx="420" cy="402" r="15" />
              <circle cx="475" cy="402" r="15" />
              <circle cx="545" cy="402" r="18" />
              <rect x="210" y="370" width="380" height="65" rx="32.5" strokeDasharray="10,5" strokeWidth="1" opacity="0.3" />

              <path d="M 260 375 L 260 270 L 400 270 L 430 330 L 450 330 L 450 375 Z" className="fill-brand-lightgray/5" />
              <rect x="280" y="290" width="90" height="55" rx="4" />
              <line x1="280" y1="320" x2="370" y2="320" />
              <line x1="330" y1="290" x2="330" y2="345" />
              
              <line x1="290" y1="270" x2="290" y2="230" strokeWidth="3" />
              <path d="M 290 230 L 305 220" strokeWidth="2" />

              <line x1="410" y1="350" x2="490" y2="260" strokeWidth="4" />
              <line x1="380" y1="375" x2="470" y2="290" strokeWidth="2" className="stroke-brand-red" />

              <g transform="rotate(12, 490, 260)">
                <rect x="475" y="40" width="45" height="340" rx="3" className="fill-brand-lightgray/5" />
                <path d="M 475 100 L 520 130 M 520 100 L 475 130" strokeWidth="1" opacity="0.4" />
                <path d="M 475 200 L 520 230 M 520 200 L 475 230" strokeWidth="1" opacity="0.4" />
                <path d="M 475 300 L 520 330 M 520 300 L 475 330" strokeWidth="1" opacity="0.4" />
                
                <circle cx="497" cy="65" r="15" />
                <circle cx="497" cy="65" r="8" />

                <rect x="465" y="140" width="65" height="45" rx="4" className="fill-brand-red/10 stroke-brand-red" strokeWidth="2" />
                
                <line x1="497" y1="185" x2="497" y2="385" strokeWidth="4" className="stroke-brand-red" />
                <path d="M 491 385 L 503 385 L 506 395 L 488 395 Z" className="fill-brand-charcoal" />
              </g>

              <g className="fill-brand-graphite/60 font-mono text-[9px] stroke-none">
                <text x="560" y="80">HOSE REEL ASSEMBLY</text>
                <line x1="515" y1="80" x2="555" y2="80" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="560" y="160">ROTARY SPINDLE HEAD</text>
                <line x1="535" y1="160" x2="555" y2="160" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="130" y="340">OSCILLATING TRACK</text>
                <line x1="225" y1="375" x2="165" y2="345" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="130" y="270">HEAVY DIESEL ENGINE</text>
                <line x1="260" y1="285" x2="185" y2="275" strokeWidth="0.5" className="stroke-brand-graphite/40" />
              </g>
            </>
          ) : productType === 'inwell' ? (
            <>
              {/* Detailed Truck Well Drilling Rig */}
              <circle cx="200" cy="405" r="35" className="fill-brand-lightgray/5" />
              <circle cx="200" cy="405" r="10" />
              <circle cx="460" cy="405" r="35" className="fill-brand-lightgray/5" />
              <circle cx="460" cy="405" r="10" />
              <circle cx="530" cy="405" r="35" className="fill-brand-lightgray/5" />
              <circle cx="530" cy="405" r="10" />

              <rect x="140" y="325" width="460" height="45" rx="4" className="fill-brand-lightgray/5" />
              <line x1="200" y1="405" x2="530" y2="405" />

              <path d="M 140 325 L 140 230 L 210 230 L 250 325 Z" className="fill-brand-lightgray/5" />
              <rect x="160" y="245" width="55" height="50" rx="3" />
              
              <line x1="580" y1="365" x2="580" y2="445" strokeWidth="4" className="stroke-brand-charcoal" />
              <rect x="565" y="440" width="30" height="8" className="fill-brand-charcoal" />
              
              <line x1="160" y1="365" x2="160" y2="445" strokeWidth="4" className="stroke-brand-charcoal" />
              <rect x="145" y="440" width="30" height="8" className="fill-brand-charcoal" />

              <rect x="335" y="40" width="70" height="285" rx="3" className="fill-brand-lightgray/5" />
              <path d="M 335 80 L 405 130 M 405 80 L 335 130" strokeWidth="1" opacity="0.4" />
              <path d="M 335 160 L 405 210 M 405 160 L 335 210" strokeWidth="1" opacity="0.4" />
              <path d="M 335 240 L 405 290 M 405 240 L 335 290" strokeWidth="1" opacity="0.4" />
              
              <rect x="325" y="110" width="90" height="50" rx="5" className="fill-brand-red/10 stroke-brand-red" strokeWidth="2" />
              <circle cx="370" cy="110" r="10" />
              <path d="M 370 100 L 370 70 L 310 90" strokeWidth="2" className="stroke-brand-red" />

              <line x1="370" y1="160" x2="370" y2="325" strokeWidth="5" className="stroke-brand-red" />

              <g className="fill-brand-graphite/60 font-mono text-[9px] stroke-none">
                <text x="430" y="90">HYDRAULIC WATER SWIVEL</text>
                <line x1="380" y1="100" x2="425" y2="90" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="430" y="145">TOP DRIVE GEARED HEAD</text>
                <line x1="415" y1="145" x2="425" y2="145" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="430" y="220">HEAVY DRILL PIPE (6M)</text>
                <line x1="375" y1="220" x2="425" y2="220" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="610" y="430">STABILIZING OUTRIGGER</text>
                <line x1="580" y1="430" x2="605" y2="430" strokeWidth="0.5" className="stroke-brand-graphite/40" />
              </g>
            </>
          ) : productType === 'rock_drill' ? (
            <>
              {/* Detailed Handheld Rock Drill */}
              <path d="M 240 180 Q 240 130 330 140" strokeWidth="4" />
              <rect x="220" y="160" width="30" height="80" rx="15" className="fill-brand-lightgray/10" />
              
              <path d="M 560 180 Q 560 130 470 140" strokeWidth="4" />
              <rect x="550" y="160" width="30" height="80" rx="15" className="fill-brand-lightgray/10" />

              <circle cx="490" cy="140" r="12" />
              <line x1="490" y1="140" x2="520" y2="110" strokeWidth="3" />

              <rect x="330" y="130" width="140" height="230" rx="8" className="fill-brand-lightgray/5" />
              
              <line x1="330" y1="170" x2="470" y2="170" />
              <line x1="330" y1="210" x2="470" y2="210" />
              <line x1="330" y1="250" x2="470" y2="250" />
              <line x1="330" y1="290" x2="470" y2="290" />
              <line x1="330" y1="330" x2="470" y2="330" />
              
              <path d="M 350 360 L 370 410 L 430 410 L 450 360 Z" className="fill-brand-lightgray/10" />
              
              <path d="M 370 380 L 360 430 L 390 430" strokeWidth="3" className="stroke-brand-red" />

              <line x1="400" y1="410" x2="400" y2="470" strokeWidth="4" className="stroke-brand-red" />

              <g className="fill-brand-graphite/60 font-mono text-[9px] stroke-none">
                <text x="520" y="90">AIR HOSE CONNECTION</text>
                <line x1="505" y1="120" x2="515" y2="95" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="500" y="230">PERCUSSION PISTON CHAMBER</text>
                <line x1="450" y1="230" x2="495" y2="230" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="210" y="270">RETAINER LATCH</text>
                <line x1="365" y1="400" x2="280" y2="275" strokeWidth="0.5" className="stroke-brand-graphite/40" />
              </g>
            </>
          ) : productType === 'slim_drill' ? (
            <>
              {/* Detailed Confined Space Core Drill */}
              <rect x="250" y="410" width="300" height="20" rx="3" className="fill-brand-lightgray/5" />
              <line x1="280" y1="410" x2="280" y2="445" strokeWidth="4" />
              <line x1="520" y1="410" x2="520" y2="445" strokeWidth="4" />

              <rect x="365" y="80" width="70" height="330" rx="4" className="fill-brand-lightgray/5" />
              <line x1="380" y1="80" x2="380" y2="410" />
              <line x1="420" y1="80" x2="420" y2="410" />
              
              <line x1="400" y1="80" x2="400" y2="410" strokeDasharray="1,2" strokeWidth="2" />
              
              <rect x="350" y="160" width="100" height="50" rx="6" className="fill-brand-red/10 stroke-brand-red" strokeWidth="2" />
              
              <circle cx="435" cy="185" r="12" />
              <line x1="435" y1="185" x2="455" y2="185" strokeWidth="2" />
              
              <line x1="400" y1="210" x2="400" y2="440" strokeWidth="3" className="stroke-brand-red" />

              <g className="fill-brand-graphite/60 font-mono text-[9px] stroke-none">
                <text x="470" y="110">THREADED FEED SCREW</text>
                <line x1="415" y1="110" x2="465" y2="110" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="470" y="165">SLIDING ROTARY DRIVE</text>
                <line x1="440" y1="165" x2="465" y2="165" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="210" y="270">LIGHTWEIGHT FRAME</text>
                <line x1="365" y1="320" x2="280" y2="275" strokeWidth="0.5" className="stroke-brand-graphite/40" />
              </g>
            </>
          ) : (
            <>
              {/* Generic bit/cylindrical schematic */}
              <rect x="320" y="100" width="160" height="300" rx="10" className="fill-brand-lightgray/5" />
              <path d="M 320 250 L 480 250 M 320 320 L 480 320" />
              <path d="M 350 400 L 320 450 L 480 450 L 450 400 Z" className="fill-brand-lightgray/10" />
              <circle cx="360" cy="425" r="10" className="fill-brand-red" />
              <circle cx="400" cy="425" r="10" className="fill-brand-red" />
              <circle cx="440" cy="425" r="10" className="fill-brand-red" />

              <g className="fill-brand-graphite/60 font-mono text-[9px] stroke-none">
                <text x="500" y="150">CYLINDRICAL CORE</text>
                <line x1="460" y1="150" x2="495" y2="150" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="500" y="280">FLUSHING VENTS</text>
                <line x1="430" y1="280" x2="495" y2="280" strokeWidth="0.5" className="stroke-brand-graphite/40" />
                <text x="500" y="425">CARBIDE BUTTONS</text>
                <line x1="455" y1="425" x2="495" y2="425" strokeWidth="0.5" className="stroke-brand-graphite/40" />
              </g>
            </>
          )}
        </g>
      </svg>
    );
  };

  return (
    <div className="relative w-full border border-brand-bordergray rounded-2xl overflow-hidden bg-brand-softwhite p-4 md:p-8 flex flex-col items-center">
      <div className="absolute top-4 left-6 z-10">
        <h4 className="font-heading text-xs font-semibold uppercase tracking-widest text-brand-graphite">
          Interactive Design Draft
        </h4>
        <span className="font-sans text-[10px] text-brand-graphite/60">
          Hover points to inspect engineering specifications
        </span>
      </div>

      {/* Main Schematic Wrapper */}
      <div className="relative w-full max-w-[800px] aspect-[8/5] select-none">
        {renderSchematicBackdrop()}

        {/* Hotspot Dots */}
        {hotspots.map((hs) => {
          const isActive = activeHotspot?.id === hs.id;
          return (
            <div
              key={hs.id}
              className="absolute hotspot-dot cursor-pointer z-20 group"
              style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
              onMouseEnter={() => setActiveHotspot(hs)}
              onClick={() => setActiveHotspot(hs)}
            >
              {/* Glowing Trigger */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'bg-brand-red scale-110 shadow-lg ring-4 ring-brand-red/30' 
                    : 'bg-brand-charcoal hover:bg-brand-red ring-2 ring-white'
                }`}
              >
                <span className="text-[10px] font-bold text-white font-mono">
                  {hs.id.replace('hs', '')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Display Overlay */}
      <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-brand-bordergray pt-6">
        {activeHotspot ? (
          <>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-brand-red text-white font-mono text-xs font-bold">
                  {activeHotspot.id.replace('hs', '')}
                </span>
                <h5 className="font-heading text-base font-bold text-brand-charcoal">
                  {activeHotspot.name}
                </h5>
              </div>
              <p className="font-sans text-sm text-brand-graphite leading-relaxed">
                {activeHotspot.function}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-brand-bordergray/50 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-red">
                  <ShieldCheck size={14} />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider">Material</span>
                </div>
                <p className="font-sans text-xs text-brand-graphite font-medium">
                  {activeHotspot.material}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-brand-bordergray/50 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-red">
                  <Settings size={14} />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider">Benefit</span>
                </div>
                <p className="font-sans text-xs text-brand-graphite font-medium">
                  {activeHotspot.benefit}
                </p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-brand-bordergray/50 space-y-1">
                <div className="flex items-center gap-1.5 text-brand-red">
                  <Wrench size={14} />
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider">Maintenance</span>
                </div>
                <p className="font-sans text-xs text-brand-graphite font-medium">
                  {activeHotspot.maintenance || 'Standard periodic inspection'}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-6 text-center text-brand-graphite/60 bg-white/40 border border-dashed border-brand-bordergray rounded-xl">
            <Info size={24} className="mb-2 text-brand-graphite/40" />
            <h6 className="font-heading text-sm font-semibold">No Component Selected</h6>
            <p className="font-sans text-xs mt-1">
              Select or hover a glowing hotspot index above to view technical design breakdowns.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
