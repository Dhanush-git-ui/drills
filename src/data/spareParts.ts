export interface SparePart {
  id: string;
  originalFilename: string;
  verifiedName: string;
  category: 'Crankcase' | 'Piston Assembly' | 'Valves' | 'Bearings & Seals' | 'Fasteners' | 'Air System';
  status: 'Verified' | 'Corrected';
  correctionNotes?: string;
  dimensions?: string;
  function: string;
  description: string;
}

export const SPARE_PARTS: SparePart[] = [
  {
    id: 'sp-air-filter',
    originalFilename: 'Air tech filter.HEIC',
    verifiedName: 'Pneumatic Air Filter Element',
    category: 'Air System',
    status: 'Verified',
    dimensions: 'Standard 70L intake diameter fitting',
    function: 'Removes moisture, oil vapors, and abrasive particles from the compressed air line.',
    description: 'Ensures that the air supply entering the rotary valve chest is free of particles, preventing internal cylinder wear and extending valve life.'
  },
  {
    id: 'sp-bolt-m10',
    originalFilename: 'BOlt - m10  l30.HEIC',
    verifiedName: 'M10 Hex Cap Bolt (30mm)',
    category: 'Fasteners',
    status: 'Verified',
    dimensions: 'Thread: M10, Length: 30mm, Grade: 8.8 High-tensile',
    function: 'Fastens the cylinder caps, valve chests, and end covers to the crankcase.',
    description: 'High-tensile zinc-plated hex bolts designed to withstand the vibration and high backpressures (up to 18 bar) generated during pneumatic operation.'
  },
  {
    id: 'sp-bearing-6208',
    originalFilename: 'Bearing-6208 2rs.HEIC',
    verifiedName: 'Deep Groove Ball Bearing 6208 2RS',
    category: 'Bearings & Seals',
    status: 'Verified',
    dimensions: '40 mm (ID) x 80 mm (OD) x 18 mm (W)',
    function: 'Supports the rear end of the motor crankshaft, absorbing radial rotation loads.',
    description: 'Equipped with rubber seals (2RS) on both sides to retain grease lubrication and prevent the ingress of abrasive coal/quartz drilling dust.'
  },
  {
    id: 'sp-bearing-6210',
    originalFilename: 'Bearing-6210 2rs.HEIC',
    verifiedName: 'Deep Groove Ball Bearing 6210 2RS',
    category: 'Bearings & Seals',
    status: 'Verified',
    dimensions: '50 mm (ID) x 90 mm (OD) x 20 mm (W)',
    function: 'Supports the main front drive output shaft of the rotation motor.',
    description: 'A heavy-duty bearing designed for high torque loads, sealed to ensure reliable performance under continuous drilling stress.'
  },
  {
    id: 'sp-balance-weight',
    originalFilename: 'balance with filter.HEIC',
    verifiedName: 'Crankshaft Counterbalance Weight',
    category: 'Crankcase',
    status: 'Corrected',
    correctionNotes: 'Parsed "balance with filter" to identify the crankshaft counterbalance web with integrated air ventilation ports.',
    function: 'Balances the reciprocating weight of the 4 radial pistons and connecting rods.',
    description: 'Crucial for reducing dynamic motor vibration at speeds up to 1500 RPM, preventing bearing fatigue and ensuring straight borehole guide-rig stability.'
  },
  {
    id: 'sp-circlip',
    originalFilename: 'circling.HEIC',
    verifiedName: 'Piston Pin Circlip (Retaining Ring)',
    category: 'Bearings & Seals',
    status: 'Corrected',
    correctionNotes: 'Corrected typo "circling" to industrial standard "Circlip" snap retaining ring.',
    dimensions: 'Internal/External snap fitting',
    function: 'Secures the wrist pin (gudgeon pin) inside the piston boss, preventing lateral drift.',
    description: 'A spring-steel snap ring that fits into machined grooves, ensuring the connecting rod pin stays locked and does not score the cylinder walls.'
  },
  {
    id: 'sp-conn-rod',
    originalFilename: 'connecting rod.HEIC',
    verifiedName: 'Engine Connecting Rod',
    category: 'Piston Assembly',
    status: 'Verified',
    function: 'Transfers the linear pressure force of the piston to the rotating crank pin.',
    description: 'Forged from high-alloy steel with precision bushed journals to withstand repetitive high-impact compression strokes without bending.'
  },
  {
    id: 'sp-crank-bush',
    originalFilename: 'crank bush.HEIC',
    verifiedName: 'Crankshaft Bushing Sleeve',
    category: 'Bearings & Seals',
    status: 'Verified',
    dimensions: 'Phosphor Bronze alloy sleeve',
    function: 'Serves as a friction-reducing sleeve bearing for the crankshaft journal.',
    description: 'Made of wear-resistant phosphor bronze to maintain oil film lubrication and protect the crank pin from scoring under heavy shock loads.'
  },
  {
    id: 'sp-crankcase',
    originalFilename: 'crank case.HEIC',
    verifiedName: 'Cast Iron Crankcase Housing',
    category: 'Crankcase',
    status: 'Verified',
    dimensions: '70mm radial piston cylinder mounts',
    function: 'Houses the internal crankshaft, oil sump, and provides mounting flanges for cylinders.',
    description: 'The rigid foundation of the motor, sand-cast from high-strength iron to absorb dynamic mechanical stress and secure the unit to the rig foot.'
  },
  {
    id: 'sp-linear-block',
    originalFilename: 'linear block.HEIC',
    verifiedName: 'Crosshead Guide Slide Block',
    category: 'Crankcase',
    status: 'Verified',
    function: 'Guides the crosshead in a straight line, eliminating lateral forces on the piston.',
    description: 'Precision-ground slider block that keeps the piston stroke centered, reducing cylinder wall ovalization and pressure leaks.'
  },
  {
    id: 'sp-o-ring',
    originalFilename: 'o ring.HEIC',
    verifiedName: 'Rubber O-Ring Seal',
    category: 'Bearings & Seals',
    status: 'Verified',
    dimensions: 'NBR Nitrile rubber high-temp seals',
    function: 'Provides static seals at casing joints and cover connections.',
    description: 'Nitrile rubber seal offering high resistance to grease, heat, and high-pressure compressed air leakage.'
  },
  {
    id: 'sp-piston',
    originalFilename: 'piston.HEIC',
    verifiedName: 'Reciprocating Piston Head',
    category: 'Piston Assembly',
    status: 'Verified',
    dimensions: '70 mm diameter piston head fitting',
    function: 'Converts air pressure energy into linear force via sliding strokes.',
    description: 'CNC-turned aluminum/steel piston head containing ring grooves, designed for low thermal expansion and tight pressure clearances.'
  },
  {
    id: 'sp-piston-ring',
    originalFilename: 'piston ring.HEIC',
    verifiedName: 'Piston Compression Ring',
    category: 'Piston Assembly',
    status: 'Verified',
    function: 'Seals the gap between the piston and the cylinder wall.',
    description: 'High-elasticity cast-iron split rings that expand against the bore, preventing compressed air from leaking into the crankcase sump.'
  },
  {
    id: 'sp-rotary-valve',
    originalFilename: 'rotary valve.HEIC',
    verifiedName: 'Rotary Air Distribution Valve',
    category: 'Valves',
    status: 'Verified',
    function: 'Sequentially distributes compressed air into each cylinder at the correct stroke phase.',
    description: 'The "heart" of the air motor. Rotates in sync with the crankshaft to direct pressurized air to cylinders on power strokes and exhaust spent air.'
  },
  {
    id: 'sp-top-cover',
    originalFilename: 'top cover.HEIC',
    verifiedName: 'Crankcase Top Cover plate',
    category: 'Crankcase',
    status: 'Verified',
    function: 'Seals the top inspection opening of the motor crankcase.',
    description: 'Heavy cast plate holding the main lubrication ports, allowing access for crankshaft inspection and connecting rod bearing assembly.'
  },
  {
    id: 'sp-valve-head',
    originalFilename: 'valve head.HEIC',
    verifiedName: 'Cylinder Valve Head Cap',
    category: 'Valves',
    status: 'Verified',
    function: 'Clamps and seals the cylinder barrel head, containing air port vents.',
    description: 'Equipped with cooling fins, this cap blocks off the cylinder top and connects to air intake/exhaust pipes.'
  },
  {
    id: 'sp-valve-packing',
    originalFilename: 'valve head packing.HEIC',
    verifiedName: 'Valve Head Gasket (Packing)',
    category: 'Bearings & Seals',
    status: 'Verified',
    function: 'Seals the high-pressure interface between the cylinder barrel and valve head.',
    description: 'A thin composite packing sheet designed to prevent pressure loss during maximum intake bursts.'
  }
];
