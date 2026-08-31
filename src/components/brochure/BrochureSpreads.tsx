import React from 'react';
import { 
  Shield, 
  Zap, 
  Globe, 
  Factory, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Mail, 
  Wrench,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';
import CompanyLogo from './CompanyLogo';

// ==========================================================================
// PAGE 1: FRONT COVER (Striking, professional, authentic)
// ==========================================================================
export const BrochureCoverPage: React.FC = () => {
  return (
    <div className="brochure-page-a4 w-full bg-white text-brand-charcoal flex flex-col justify-between p-10 md:p-12 shadow-xl rounded-2xl border border-brand-bordergray relative overflow-hidden">
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b-2 border-brand-red pb-5">
        <div className="flex items-center gap-3">
          <CompanyLogo variant="red" size="sm" showText={false} />
          <div>
            <span className="font-serif font-black text-2xl tracking-tight text-brand-charcoal block leading-none">
              PSRS <span className="text-brand-red">Rock Drills</span>
            </span>
            <span className="font-mono text-[10px] font-bold text-brand-red tracking-widest uppercase block mt-1">
              Heavy Drilling Machinery & Tools • Est. 1998
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-red/10 text-brand-red font-bold text-[10px] uppercase rounded-full tracking-wider border border-brand-red/20">
            <Shield size={12} /> ISO 9001:2015 Certified
          </span>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="my-auto space-y-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-softwhite border border-brand-bordergray rounded-full text-xs font-mono font-bold text-brand-red uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            Company Brochure & Product Guide
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-black text-brand-charcoal tracking-tight leading-[1.05]">
            BUILT FOR THE<br />
            <span className="text-brand-red">HARDEST ROCK</span><br />
            ON EARTH.
          </h1>

          <p className="font-sans text-sm sm:text-base text-brand-graphite max-w-lg leading-relaxed font-medium">
            We manufacture heavy crawler drill rigs, pneumatic wagon drills, air motors, and high-strength drilling tools for tough mines and quarries worldwide.
          </p>
        </div>

        {/* Hero Machine Photograph */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-gradient-to-b from-brand-softwhite to-brand-lightgray border border-brand-bordergray p-2 flex items-center justify-center shadow-md">
          <img 
            src="/images/products/crawler_drill_rig.png" 
            alt="PSR-C300 Heavy Crawler Drill Rig"
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
          />
          <div className="absolute bottom-3 left-3 bg-brand-charcoal/90 text-white px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase backdrop-blur-sm">
            Flagship Rig: PSR-C300 Heavy Crawler
          </div>
        </div>

        {/* 4 Feature Badges in Simple English */}
        <div className="grid grid-cols-4 gap-3 text-center font-sans">
          <div className="bg-brand-softwhite p-3 rounded-xl border border-brand-bordergray">
            <span className="font-display text-lg font-extrabold text-brand-red block leading-none">25+ Yrs</span>
            <span className="text-[10px] text-brand-graphite font-semibold block mt-1">Experience</span>
          </div>
          <div className="bg-brand-softwhite p-3 rounded-xl border border-brand-bordergray">
            <span className="font-display text-lg font-extrabold text-brand-charcoal block leading-none">12,000 m²</span>
            <span className="text-[10px] text-brand-graphite font-semibold block mt-1">Factory in Hyderabad</span>
          </div>
          <div className="bg-brand-softwhite p-3 rounded-xl border border-brand-bordergray">
            <span className="font-display text-lg font-extrabold text-brand-charcoal block leading-none">35+ Nations</span>
            <span className="text-[10px] text-brand-graphite font-semibold block mt-1">Global Deliveries</span>
          </div>
          <div className="bg-brand-softwhite p-3 rounded-xl border border-brand-bordergray">
            <span className="font-display text-lg font-extrabold text-brand-red block leading-none">100%</span>
            <span className="text-[10px] text-brand-graphite font-semibold block mt-1">Tested Before Shipping</span>
          </div>
        </div>
      </div>

      {/* Footer Cover Row */}
      <div className="pt-4 border-t border-brand-bordergray flex items-center justify-between text-xs font-mono text-brand-graphite">
        <span>PSRS ROCK DRILLS • HYDERABAD, INDIA</span>
        <span className="font-bold text-brand-charcoal">PAGE 1 OF 4</span>
        <span className="text-brand-red font-bold">www.psrsrockdrills.com</span>
      </div>
    </div>
  );
};

// ==========================================================================
// PAGE 2: WHO WE ARE & OUR MANUFACTURING PLANT
// ==========================================================================
export const BrochureAboutPage: React.FC = () => {
  return (
    <div className="brochure-page-a4 w-full bg-white text-brand-charcoal flex flex-col justify-between p-10 md:p-12 shadow-xl rounded-2xl border border-brand-bordergray">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-brand-red pb-4">
        <div className="flex items-center gap-3">
          <CompanyLogo variant="red" size="sm" showText={false} />
          <div>
            <span className="font-serif font-black text-xl tracking-tight text-brand-charcoal block leading-none">
              PSRS <span className="text-brand-red">Rock Drills</span>
            </span>
            <span className="font-mono text-[9px] font-bold text-brand-red tracking-widest uppercase block mt-1">
              Who We Are • Plant & Capabilities
            </span>
          </div>
        </div>
        <div className="text-right font-mono text-xs text-brand-graphite">
          <span>CORPORATE OVERVIEW</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="my-auto space-y-5">
        {/* Story */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <h2 className="font-heading text-base font-extrabold uppercase tracking-wider text-brand-charcoal">
              About PSRS Rock Drills
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-graphite leading-relaxed">
            Since <strong>1998</strong>, PSRS Rock Drills has been making heavy-duty drilling machines and tools that do not stop working. Drilling in hard granite, basalt, and rocky ground puts huge stress on equipment. That is why we forge, machine, and test every part inside our own factory in Hyderabad, India.
          </p>
        </div>

        {/* Factory Image Frame */}
        <div className="relative rounded-2xl overflow-hidden aspect-[16/8] bg-brand-lightgray border border-brand-bordergray shadow-md">
          <img 
            src="/images/products/factory_plant.png" 
            alt="PSRS Manufacturing Plant Hyderabad"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 text-white">
            <span className="font-display text-lg font-bold block">Our 12,000 m² Manufacturing Facility</span>
            <span className="font-mono text-[10px] text-white/80">Equipped with Japanese CNC turning centers & heat treatment furnaces in Hyderabad</span>
          </div>
        </div>

        {/* 4 Pillars in Simple English */}
        <div className="grid grid-cols-2 gap-3 font-sans">
          <div className="bg-brand-softwhite p-3.5 rounded-xl border border-brand-bordergray space-y-1">
            <div className="flex items-center gap-2 text-brand-red font-heading font-extrabold text-xs uppercase">
              <Factory size={16} />
              <span>In-House Forging & CNC</span>
            </div>
            <p className="text-xs text-brand-graphite leading-relaxed">
              We cut, forge, and machine steel parts with tight Japanese CNC accuracy so every tool fits smoothly and lasts longer.
            </p>
          </div>

          <div className="bg-brand-softwhite p-3.5 rounded-xl border border-brand-bordergray space-y-1">
            <div className="flex items-center gap-2 text-brand-red font-heading font-extrabold text-xs uppercase">
              <Shield size={16} />
              <span>Heat-Treated Tough Steel</span>
            </div>
            <p className="text-xs text-brand-graphite leading-relaxed">
              Our steel undergoes heat treatment to make the outer surface extra hard while keeping the inner core flexible against heavy shocks.
            </p>
          </div>

          <div className="bg-brand-softwhite p-3.5 rounded-xl border border-brand-bordergray space-y-1">
            <div className="flex items-center gap-2 text-brand-red font-heading font-extrabold text-xs uppercase">
              <Zap size={16} />
              <span>100% Tested on Air Benches</span>
            </div>
            <p className="text-xs text-brand-graphite leading-relaxed">
              Every rock drill, wagon drill, and rotation motor is live-tested under high air pressure before packing to ensure zero defects.
            </p>
          </div>

          <div className="bg-brand-softwhite p-3.5 rounded-xl border border-brand-bordergray space-y-1">
            <div className="flex items-center gap-2 text-brand-red font-heading font-extrabold text-xs uppercase">
              <Globe size={16} />
              <span>Global Support & Spares</span>
            </div>
            <p className="text-xs text-brand-graphite leading-relaxed">
              We export to 35+ countries and keep a complete warehouse of spare parts ready for quick dispatch whenever you need them.
            </p>
          </div>
        </div>

        {/* Why Buy From Us Banner */}
        <div className="bg-brand-charcoal text-white p-3.5 rounded-xl flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand-red block">
              Our Promise
            </span>
            <p className="font-sans text-xs text-white/90">
              Low fuel consumption, simple maintenance, and high drilling speed in hard rocks.
            </p>
          </div>
          <span className="font-mono text-xs font-bold text-white px-3 py-1 bg-brand-red rounded-lg shrink-0">
            25+ YRS
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-brand-bordergray flex items-center justify-between text-xs font-mono text-brand-graphite">
        <span>PSRS ROCK DRILLS • COMPANY OVERVIEW</span>
        <span className="font-bold text-brand-charcoal">PAGE 2 OF 4</span>
        <span>sales@psrsrockdrills.com</span>
      </div>
    </div>
  );
};

// ==========================================================================
// PAGE 3: WHAT WE OFFER (OUR COMPLETE PRODUCT RANGE)
// ==========================================================================
export const BrochureProductsPage: React.FC = () => {
  const products = [
    {
      name: 'PSR-C300 Crawler Drill',
      cat: 'Heavy Hydraulic Rig',
      img: '/images/products/crawler_drill_rig.png',
      dia: '102 – 165 mm',
      depth: '30 meters',
      power: '225 HP Cat Diesel',
      desc: 'Heavy tracks for steep slopes, automatic rod changer, and high-power rotation head for open pit mining.'
    },
    {
      name: 'PSR-W100 Wagon Drill',
      cat: 'Pneumatic Wheeled Rig',
      img: '/images/products/wagon_drill.png',
      dia: '50 – 76 mm',
      depth: '15 meters',
      power: '4 HP Air Motor',
      desc: 'Low-cost 3-wheel wagon drill that is easy to move by hand in quarries for stone splitting and blast holes.'
    },
    {
      name: 'PSR-H6 Water Well Rig',
      cat: 'Truck-Mounted Derrick',
      img: '/images/products/inwell_drill.png',
      dia: '150 – 250 mm',
      depth: '350 meters',
      power: '160 HP Deck Engine',
      desc: 'Strong lifting derrick mast and top-drive motor to drill deep water borewells for farms and drinking water.'
    },
    {
      name: 'Slim Drill LD4 Machine',
      cat: 'Compact Gallery Rig',
      img: '/images/products/slim_drill.png',
      dia: '90 – 115 mm',
      depth: '30 meters',
      power: '2.8 HP Air Feed',
      desc: 'Lightweight aluminum frame designed to fit inside narrow 1.2m underground mining tunnels and galleries.'
    },
    {
      name: 'Airtech Rock Drill',
      cat: 'Percussion Hand Drill',
      img: '/images/products/rock_drill.png',
      dia: '32 – 45 mm',
      depth: '6 meters',
      power: '3.2 kW Hammer',
      desc: 'Durable cast-iron hand drill for secondary granite boulder splitting and quick blast holes in quarries.'
    },
    {
      name: 'DTH Hammers & Bits',
      cat: 'Carbide Drilling Tools',
      img: '/images/products/drilling_tools.png',
      dia: '4" & 5" Hammers',
      depth: '2m & 3m Rods',
      power: 'API Threaded',
      desc: 'Carburized alloy drill rods, high-pressure DTH hammers, and tungsten carbide button bits that cut rocks fast.'
    }
  ];

  return (
    <div className="brochure-page-a4 w-full bg-white text-brand-charcoal flex flex-col justify-between p-10 md:p-12 shadow-xl rounded-2xl border border-brand-bordergray">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-brand-red pb-4">
        <div className="flex items-center gap-3">
          <CompanyLogo variant="red" size="sm" showText={false} />
          <div>
            <span className="font-serif font-black text-xl tracking-tight text-brand-charcoal block leading-none">
              PSRS <span className="text-brand-red">Rock Drills</span>
            </span>
            <span className="font-mono text-[9px] font-bold text-brand-red tracking-widest uppercase block mt-1">
              What We Offer • Core Machinery & Tools
            </span>
          </div>
        </div>
        <div className="text-right font-mono text-xs text-brand-graphite">
          <span>PRODUCT CATALOG</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="my-auto space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <h2 className="font-heading text-base font-extrabold uppercase tracking-wider text-brand-charcoal">
              Our Core Products & Machinery
            </h2>
          </div>
          <span className="text-[10px] font-mono text-brand-graphite font-bold uppercase">
            6 Main Product Lines
          </span>
        </div>

        {/* 6 Clean Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {products.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white border border-brand-bordergray hover:border-brand-red/60 rounded-xl p-3 flex flex-col justify-between shadow-sm transition-all h-[210px]"
            >
              <div>
                <h3 className="font-heading text-xs font-extrabold text-brand-charcoal leading-tight">
                  {p.name}
                </h3>
                <span className="font-mono text-[8px] font-bold text-brand-red block uppercase mt-0.5">
                  {p.cat}
                </span>
              </div>

              {/* Photo */}
              <div className="h-24 w-full flex items-center justify-center my-1 bg-brand-softwhite rounded-lg p-1.5">
                <img 
                  src={p.img} 
                  alt={p.name}
                  className="max-h-full max-w-full object-contain filter drop-shadow-sm"
                />
              </div>

              {/* Specs & description */}
              <div className="space-y-1 text-[9px] font-sans border-t border-brand-bordergray/60 pt-1.5">
                <div className="flex justify-between font-mono font-bold text-brand-charcoal">
                  <span>{p.dia}</span>
                  <span className="text-brand-red">{p.depth}</span>
                </div>
                <p className="text-brand-graphite leading-tight line-clamp-2">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-brand-bordergray flex items-center justify-between text-xs font-mono text-brand-graphite">
        <span>PSRS ROCK DRILLS • DRILLING MACHINERY & TOOLS</span>
        <span className="font-bold text-brand-charcoal">PAGE 3 OF 4</span>
        <span>sales@psrsrockdrills.com</span>
      </div>
    </div>
  );
};

// ==========================================================================
// PAGE 4: MATERIALS WE USE & CONTACT DETAILS (BACK COVER)
// ==========================================================================
export const BrochureMaterialsContactPage: React.FC = () => {
  const materials = [
    {
      name: 'Ductile Cast Iron (SG 500-7)',
      usedIn: 'Used for engine crankcases & motor bodies',
      benefit: 'Absorbs heavy vibration and does not crack under high 15-bar air pressure.',
      badge: 'Shock Resistant'
    },
    {
      name: 'Hardened Alloy Steel (20CrNiMo)',
      usedIn: 'Used for drill rods & drive threads',
      benefit: 'Special heat-treated outer skin stops thread wear and prevents drill rods from jamming.',
      badge: 'High Wear Life'
    },
    {
      name: 'Tungsten Carbide Button Inserts',
      usedIn: 'Used for DTH button drill bits',
      benefit: 'Super-hard carbide buttons (89–92 HRA) crush hard granite, basalt, and quartz without breaking.',
      badge: 'Hard Rock Grade'
    },
    {
      name: 'Japanese CNC Machining Precision',
      usedIn: 'Used for valves, cylinders & pistons',
      benefit: 'Cut with exact ±0.005mm accuracy to stop air leaks and give maximum drilling power.',
      badge: 'Micron Accuracy'
    }
  ];

  return (
    <div className="brochure-page-a4 w-full bg-white text-brand-charcoal flex flex-col justify-between p-10 md:p-12 shadow-xl rounded-2xl border border-brand-bordergray">
      {/* Header */}
      <div className="flex items-center justify-between border-b-2 border-brand-red pb-4">
        <div className="flex items-center gap-3">
          <CompanyLogo variant="red" size="sm" showText={false} />
          <div>
            <span className="font-serif font-black text-xl tracking-tight text-brand-charcoal block leading-none">
              PSRS <span className="text-brand-red">Rock Drills</span>
            </span>
            <span className="font-mono text-[9px] font-bold text-brand-red tracking-widest uppercase block mt-1">
              Quality Materials • Factory Address & Contacts
            </span>
          </div>
        </div>
        <div className="text-right font-mono text-xs text-brand-graphite">
          <span>CONTACT & SPECIFICATIONS</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-auto space-y-4">
        {/* Section 1: Quality Materials */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <h2 className="font-heading text-sm font-extrabold uppercase tracking-wider text-brand-charcoal">
                Quality Materials We Use
              </h2>
            </div>
            <span className="text-[10px] font-mono text-brand-red font-bold uppercase">
              Forged For Long Life
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {materials.map((m, i) => (
              <div key={i} className="bg-brand-softwhite border border-brand-bordergray rounded-xl p-3 space-y-1">
                <div className="flex items-start justify-between gap-1">
                  <h4 className="font-heading text-xs font-extrabold text-brand-charcoal leading-tight">
                    {m.name}
                  </h4>
                  <span className="font-mono text-[8px] font-bold px-1.5 py-0.5 bg-brand-red text-white rounded shrink-0">
                    {m.badge}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-brand-red block font-semibold">
                  {m.usedIn}
                </span>
                <p className="font-sans text-[10px] text-brand-graphite leading-relaxed">
                  {m.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Air Motor & Spares Callout */}
        <div className="bg-brand-charcoal text-white rounded-xl p-3.5 flex items-center justify-between gap-4">
          <div className="space-y-0.5 max-w-md">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand-red text-white text-[8px] font-mono font-bold uppercase rounded">
              OEM Air Motor & Spares
            </div>
            <h4 className="font-heading text-xs font-extrabold text-white">
              Airtech 70L4R 4-Piston Radial Pneumatic Motor
            </h4>
            <p className="font-sans text-[10px] text-white/70 leading-relaxed">
              Standard rotation drive for wagon and crawler drills. 70mm bore, 450–520 CFM @ 12–15 bar, 0–1500 RPM. Crankcases, pistons, valves, and bearings always in stock for fast delivery.
            </p>
          </div>
          <div className="w-24 h-16 bg-white/10 rounded-lg p-1 shrink-0 flex items-center justify-center">
            <img 
              src="/images/products/pneumatic_motor.png" 
              alt="Airtech Motor"
              className="max-h-full max-w-full object-contain filter drop-shadow"
            />
          </div>
        </div>

        {/* Section 3: Applications */}
        <div className="space-y-1.5">
          <span className="font-heading text-xs font-bold uppercase tracking-wider text-brand-charcoal block">
            Industries We Serve
          </span>
          <div className="grid grid-cols-4 gap-2 text-center font-sans text-xs">
            <div className="p-2 rounded-lg bg-brand-softwhite border border-brand-bordergray font-semibold text-[10px]">
              Quarry & Granite
            </div>
            <div className="p-2 rounded-lg bg-brand-softwhite border border-brand-bordergray font-semibold text-[10px]">
              Open-Pit Mining
            </div>
            <div className="p-2 rounded-lg bg-brand-softwhite border border-brand-bordergray font-semibold text-[10px]">
              Deep Water Wells
            </div>
            <div className="p-2 rounded-lg bg-brand-softwhite border border-brand-bordergray font-semibold text-[10px]">
              Roads & Anchoring
            </div>
          </div>
        </div>

        {/* Section 4: Address & Contact */}
        <div className="bg-brand-softwhite border-2 border-brand-charcoal rounded-xl p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Address */}
            <div className="space-y-1">
              <span className="font-mono text-[9px] font-bold text-brand-red uppercase tracking-wider block">
                HEAD OFFICE & FACTORY
              </span>
              <h4 className="font-heading text-xs font-extrabold text-brand-charcoal">
                PSR'S Rock Drills Manufacturing Plant
              </h4>
              <div className="flex items-start gap-1.5 text-brand-graphite text-[11px] font-sans">
                <MapPin size={13} className="text-brand-red shrink-0 mt-0.5" />
                <span>A-13, IDA, Balanagar, Hyderabad, Telangana 500037, India</span>
              </div>
            </div>

            {/* Contacts */}
            <div className="grid grid-cols-2 gap-3 border-t sm:border-t-0 sm:border-l border-brand-bordergray pt-2 sm:pt-0 sm:pl-4 text-xs font-sans">
              <div>
                <span className="font-mono text-[8px] text-brand-red font-bold uppercase block">Sales Email</span>
                <a href="mailto:sales@psrsrockdrills.com" className="font-bold text-brand-charcoal hover:text-brand-red block text-[11px]">
                  sales@psrsrockdrills.com
                </a>
                <span className="text-[10px] text-brand-graphite block">info@psrsrockdrills.com</span>
              </div>

              <div>
                <span className="font-mono text-[8px] text-brand-red font-bold uppercase block">Phone / WhatsApp</span>
                <span className="font-bold text-brand-charcoal block text-[11px]">+91 80 4920 1200</span>
                <span className="text-[10px] text-brand-graphite block">+91 40 2377 0000</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-brand-bordergray/80 flex items-center justify-between text-[10px] font-mono text-brand-graphite">
            <div className="flex items-center gap-2">
              <span className="text-brand-charcoal font-bold">www.psrsrockdrills.com</span>
              <span>•</span>
              <span>ISO 9001:2015 CERTIFIED</span>
            </div>
            <span className="text-brand-red font-bold">DIRECT FACTORY PRICES</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-brand-bordergray flex items-center justify-between text-xs font-mono text-brand-graphite">
        <span>© {new Date().getFullYear()} PSRS ROCK DRILLS. ALL RIGHTS RESERVED.</span>
        <span className="font-bold text-brand-charcoal">PAGE 4 OF 4</span>
        <span>A-13 IDA BALANAGAR, HYDERABAD</span>
      </div>
    </div>
  );
};
