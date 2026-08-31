export default function BlueprintBlobBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#FFFFFF]">
      {/* 1. Ultra-Clean Technical Engineering Grid */}
      <div 
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: `48px 48px`
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200,16,46,0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200,16,46,0.12) 1px, transparent 1px)
          `,
          backgroundSize: `192px 192px`
        }}
      />
      
      {/* 2. Soft Brand Red & Pure Light Atmospheric Glows */}
      <div className="absolute top-[-10%] right-[15%] w-[55%] h-[55%] rounded-full bg-red-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[45%] h-[45%] rounded-full bg-red-600/4 blur-[120px] pointer-events-none" />
      <div className="absolute top-[35%] left-[20%] w-[30%] h-[30%] rounded-full bg-slate-200/50 blur-[100px] pointer-events-none" />

      {/* 3. Minimalist CAD Precision Engineering Schematics (Red & Steel) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.3]" viewBox="0 0 1440 900" fill="none">
        <g stroke="currentColor" className="text-slate-400" strokeWidth="1">
          {/* Top Center-Right Technical Radar Crosshair */}
          <g style={{ transformOrigin: '950px 320px' }}>
            <circle cx="950" cy="320" r="220" stroke="rgba(200,16,46,0.08)" strokeDasharray="4 8" />
            <circle cx="950" cy="320" r="340" stroke="rgba(0,0,0,0.04)" strokeOpacity="0.5" />
            <circle cx="950" cy="320" r="100" stroke="rgba(200,16,46,0.12)" strokeDasharray="2 6" />
            <line x1="700" y1="320" x2="1200" y2="320" stroke="rgba(200,16,46,0.1)" strokeDasharray="3 6" />
            <line x1="950" y1="70" x2="950" y2="570" stroke="rgba(200,16,46,0.1)" strokeDasharray="3 6" />
          </g>
          
          {/* Subtle Top Left Coordinate Indicator */}
          <text x="72" y="120" className="font-mono text-[10px] font-bold fill-brand-red/40 stroke-none tracking-widest uppercase">
            PSRS // HYD-PLANT • LAT 17.478° N • LON 78.441° E
          </text>
          <line x1="72" y1="128" x2="320" y2="128" stroke="rgba(200,16,46,0.2)" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
