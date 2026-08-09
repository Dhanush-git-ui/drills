export default function BlueprintBlobBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-[#FAFAFA]">
      {/* Premium Technical Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: `40px 40px`
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(200,16,46,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200,16,46,0.1) 1px, transparent 1px)
          `,
          backgroundSize: `160px 160px`
        }}
      />
      
      {/* Soft Ambient Glows (Brand Colors) */}
      <div className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-red-600/5 blur-[120px] mix-blend-multiply" />
      <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] rounded-full bg-slate-400/10 blur-[100px] mix-blend-multiply" />
      <div className="absolute top-[20%] left-[40%] w-[40%] h-[40%] rounded-full bg-red-400/5 blur-[120px] mix-blend-multiply" />

      {/* Abstract Blueprint Nodes */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.35]" viewBox="0 0 1440 900" fill="none">
        <g stroke="currentColor" className="text-slate-400" strokeWidth="1">
          {/* Top Left Node */}
          <g className="animate-spin-slow" style={{ transformOrigin: '200px 250px' }}>
            <circle cx="200" cy="250" r="120" strokeDasharray="4 8" />
            <circle cx="200" cy="250" r="160" strokeOpacity="0.2" />
          </g>
          <circle cx="200" cy="250" r="3" fill="currentColor" />
          <circle cx="200" cy="250" r="40" strokeOpacity="0.1" fill="rgba(200,16,46,0.02)" />
          
          {/* Bottom Right Node */}
          <g className="animate-spin-slow" style={{ transformOrigin: '1200px 650px', animationDirection: 'reverse' }}>
            <circle cx="1200" cy="650" r="180" strokeDasharray="2 6" strokeOpacity="0.8" />
            <circle cx="1200" cy="650" r="240" strokeOpacity="0.2" />
            <circle cx="1200" cy="650" r="80" strokeDasharray="10 10" strokeOpacity="0.3" />
          </g>
          <circle cx="1200" cy="650" r="6" fill="none" strokeWidth="2" />
          
          {/* Interconnecting Lines */}
          <path d="M 200 250 L 550 350" strokeDasharray="4 4" strokeOpacity="0.4" />
          <circle cx="550" cy="350" r="5" fill="currentColor" className="text-red-400" />
          <circle cx="550" cy="350" r="12" stroke="currentColor" className="text-red-300" strokeOpacity="0.5" />
          
          <path d="M 1200 650 L 950 450" strokeDasharray="4 4" strokeOpacity="0.4" />
          <circle cx="950" cy="450" r="5" fill="currentColor" className="text-red-400" />
          
          <path d="M 550 350 L 950 450" strokeDasharray="2 6" strokeOpacity="0.2" />
          
          {/* Floating Accents */}
          <rect x="800" y="150" width="40" height="40" strokeOpacity="0.3" transform="rotate(45 820 170)" />
          <circle cx="820" cy="170" r="2" fill="currentColor" />
          
          <rect x="300" y="700" width="60" height="60" strokeOpacity="0.2" strokeDasharray="2 4" />
          <path d="M 300 700 L 360 760 M 300 760 L 360 700" strokeOpacity="0.2" />
        </g>
      </svg>
    </div>
  );
}
