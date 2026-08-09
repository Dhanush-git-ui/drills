import { INVENTORY } from './inventory';

export interface ProductHotspot {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  function: string;
  material: string;
  benefit: string;
  maintenance: string;
}

export interface ProductSpecs {
  holeDiameter?: string;
  drillDepth?: string;
  motorType?: string;
  rotationSpeed?: string;
  airConsumption?: string;
  weight?: string;
  feedLength?: string;
  operatingPressure?: string;
  dimensions?: string;
  compatibleAccessories?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  categorySlug: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  applications: string[];
  specs: ProductSpecs;
  hotspots: ProductHotspot[];
  faqs: { question: string; answer: string }[];
  brochureUrl: string;
  brochurePath?: string;
  datasheetUrl: string;
  image: string; 
  imageUrl: string;
  // Stock / availability fields (only present for spare-parts / inventory items)
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  stockQty?: number;
}

export const CATEGORIES = [
  { name: 'Drilling Rigs & Machinery', slug: 'rigs-machinery', desc: 'Crawler drills, pneumatic and rotary wagon drills, and water well drilling rigs.' },
  { name: 'Rotation Motors', slug: 'rotation-motors', desc: 'Powerful 4-piston radial pneumatic rotation drives.' },
  { name: 'Crankcase', slug: 'crankcase', desc: 'Cast engine bodies, top covers, and counterbalance weights.' },
  { name: 'Piston Assembly', slug: 'piston-assembly', desc: 'Reciprocating pistons, wrist pins, liners, and conrods.' },
  { name: 'Valves', slug: 'valves', desc: 'Rotary air distribution valves and cylinder heads.' },
  { name: 'Bearings & Seals', slug: 'bearings-seals', desc: 'Deep groove ball bearings, O-ring grease rings, and composites.' },
  { name: 'Fasteners', slug: 'fasteners', desc: 'High-tensile hex bolts, feather keys, and snap circlips.' },
  { name: 'Air System', slug: 'air-system', desc: 'Inlet filter elements and exhaust deflector silencers.' }
];

export const BASE_PRODUCTS: Product[] = [
  {
    id: 'psr-c300-crawler',
    name: 'PSR-C300 Heavy Hydraulic Crawler Drill',
    slug: 'psr-c300-heavy-hydraulic-crawler-drill',
    category: 'Drilling Rigs & Machinery',
    categorySlug: 'rigs-machinery',
    tagline: 'Heavy Crawler Drill for Tough Rocks.',
    description: 'A strong crawler drill machine for mining and deep hole drilling.',
    longDescription: 'The PSR-C300 is a powerful crawler drill rig. It moves easily on steep slopes using heavy tracks. It features an automated rod changer and a strong rotation head, making it ideal for fast quarry drilling.',
    features: [
      'Heavy tracks for steep slopes',
      'Automatic rod changer',
      'Dust collection system',
      'Simple control panel'
    ],
    benefits: [
      'Works on rough ground',
      'Saves rod change time',
      'Cleans air for safety'
    ],
    applications: [
      'Open pit mine holes',
      'Civil anchoring',
      'Geothermal boring'
    ],
    specs: {
      holeDiameter: '102 – 165 mm',
      drillDepth: '30 meters (continuous)',
      motorType: 'Caterpillar C7.1 Diesel Engine (225 HP)',
      rotationSpeed: '0 – 120 RPM',
      weight: '12,500 kg',
      feedLength: '6.8 meters'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Heavy Tracks',
        x: 24,
        y: 76,
        function: 'Independent tracks for rough ground.',
        material: 'High-Strength Steel',
        benefit: 'Moves easily on steep slopes.',
        maintenance: 'Clean and grease every 50 operating hours.'
      },
      {
        id: 'hs2',
        name: 'Hydraulic Mast',
        x: 42,
        y: 55,
        function: 'Lifts and levels the drill guides.',
        material: 'Reinforced Steel',
        benefit: 'Ensures accurate drilling angles.',
        maintenance: 'Check hydraulic fluid level daily.'
      },
      {
        id: 'hs3',
        name: 'Rotary Head',
        x: 52,
        y: 25,
        function: 'Turns the drill rods with high power.',
        material: 'Tempered Alloy Steel',
        benefit: 'Drills fast in hard rock.',
        maintenance: 'Inspect gear oil every 100 hours.'
      }
    ],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'crawler',
    imageUrl: '/images/products/crawler_drill_rig.png'
  },
  {
    id: 'psr-w100-wagon',
    name: 'PSR-W100 Pneumatic Wagon Drill',
    slug: 'psr-w100-pneumatic-wagon-drill',
    category: 'Drilling Rigs & Machinery',
    categorySlug: 'rigs-machinery',
    tagline: 'Pneumatic Wagon Drill on Wheels.',
    description: 'A versatile wheeled rig for quick shallow drilling in quarries.',
    longDescription: 'The PSR-W100 is a simple, low-cost wagon drill. It has three wheels so operators can move it manually. It uses standard compressors and is easy to maintain.',
    features: [
      'Three wheels with leveling jacks',
      'Pneumatic feed system',
      'Supports 3-meter rods',
      'In-line oiler lubrication'
    ],
    benefits: [
      'Easy to move by hand',
      'Simple to repair',
      'Low fuel costs'
    ],
    applications: [
      'Quarry stone splitting',
      'Road anchoring',
      'Grout holes'
    ],
    specs: {
      holeDiameter: '50 – 76 mm',
      drillDepth: '15 meters',
      motorType: 'Pneumatic Feed Motor (4 HP)',
      rotationSpeed: '0 – 150 RPM',
      weight: '980 kg',
      feedLength: '3.6 meters'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Tire Wheels',
        x: 31,
        y: 80,
        function: 'Three wheels for simple manual transport.',
        material: 'Heavy-Duty Rubber & Steel',
        benefit: 'Easy to move around the quarry.',
        maintenance: 'Check tire pressure weekly.'
      },
      {
        id: 'hs2',
        name: 'Feed Mast',
        x: 50,
        y: 40,
        function: 'Pushes the drill down using air power.',
        material: 'Structural Steel',
        benefit: 'Delivers steady drilling pressure.',
        maintenance: 'Check air lines for leaks daily.'
      },
      {
        id: 'hs3',
        name: 'Drill Bit Joint',
        x: 50,
        y: 92,
        function: 'Connects the bit to the drill rod.',
        material: 'Hardened Tool Steel',
        benefit: 'Quick and safe bit replacement.',
        maintenance: 'Clean and apply thread grease before use.'
      }
    ],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'wagon',
    imageUrl: '/images/products/wagon_drill.png'
  },
  {
    id: 'psr-h6-waterwell',
    name: 'PSR-H6 Water Well Drilling Rig',
    slug: 'psr-h6-water-well-boring-rig',
    category: 'Drilling Rigs & Machinery',
    categorySlug: 'rigs-machinery',
    tagline: 'Truck-Mounted Water Well Rig.',
    description: 'A heavy truck rig to drill deep water wells.',
    longDescription: 'The PSR-H6 is a heavy derrick drilling rig mounted on a truck. It uses strong hydraulic power to drill deep water wells quickly and handle heavy pipes.',
    features: [
      'Hydraulic top drive rotation',
      '6.5-meter derrick mast',
      'Water/soap injection pump',
      'High hoisting force'
    ],
    benefits: [
      'Drills water wells up to 350m deep',
      'Fast highway travel between sites',
      'Handles long drill pipes easily'
    ],
    applications: [
      'Agricultural water wells',
      'Mine dewatering wells',
      'Geotechnical boring'
    ],
    specs: {
      holeDiameter: '150 – 250 mm',
      drillDepth: '350 meters',
      motorType: 'Onboard Deck Diesel Engine (160 HP)',
      rotationSpeed: '0 – 80 RPM',
      weight: '6,200 kg (mast & deck assembly)',
      feedLength: '6.5 meters'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Stabilizer Jacks',
        x: 23,
        y: 80,
        function: 'Keeps the truck stable during drilling.',
        material: 'Heavy Steel Plates',
        benefit: 'Prevents the truck from shifting.',
        maintenance: 'Check hydraulic locks before operations.'
      },
      {
        id: 'hs2',
        name: 'Derrick Mast',
        x: 51,
        y: 52,
        function: 'Supports the long heavy drill pipes.',
        material: 'Structural Steel Frame',
        benefit: 'Handles heavy aquifer loads easily.',
        maintenance: 'Inspect structural welds monthly.'
      },
      {
        id: 'hs3',
        name: 'Top Spindle Drive',
        x: 51,
        y: 12,
        function: 'Pushes and rotates the casing pipes.',
        material: 'Forged Alloy Steel',
        benefit: 'High torque rotation for deep wells.',
        maintenance: 'Grease top bearings daily.'
      }
    ],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'inwell',
    imageUrl: '/images/products/inwell_drill.png'
  },
  {
    id: 'at-pneumatic-rock-drill',
    name: 'Airtech Pneumatic Rock Drill',
    slug: 'airtech-pneumatic-rock-drill',
    category: 'Drilling Rigs & Machinery',
    categorySlug: 'rigs-machinery',
    tagline: 'Robust Handheld Percussion Drill.',
    description: 'A strong cast iron rock drill for blast holes.',
    longDescription: 'The Airtech Pneumatic Rock Drill is a heavy percussion tool for quarries. Its cast iron body absorbs shock well, and its internal piston hits rock with high energy.',
    features: [
      'High-frequency hammer piston',
      'Cast iron body',
      'Air-water flushing tube',
      'Comfortable handles'
    ],
    benefits: [
      'Drills fast in hard rock',
      'Reduces vibration for the operator',
      'Easy to clean and fix'
    ],
    applications: [
      'Blast holes in quarries',
      'Road anchoring',
      'Concrete splitting'
    ],
    specs: {
      holeDiameter: '32 – 45 mm',
      drillDepth: '6 meters',
      motorType: 'Pneumatic Hammer (3.2 kW)',
      weight: '24 kg',
      dimensions: '580 x 220 x 180 mm'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Operating Handles',
        x: 31,
        y: 35,
        function: 'Gives the operator a safe, steady grip.',
        material: 'Vibration-Dampened Rubber',
        benefit: 'Reduces operator hand fatigue.',
        maintenance: 'Check handle mounts for tightness.'
      },
      {
        id: 'hs2',
        name: 'Cast Iron Body',
        x: 50,
        y: 45,
        function: 'Contains the main hammer piston.',
        material: 'Heavy Cast Iron',
        benefit: 'Absorbs heavy shock impacts.',
        maintenance: 'Keep outer casing clean of dust.'
      },
      {
        id: 'hs3',
        name: 'Steel Retainer',
        x: 50,
        y: 75,
        function: 'Holds the drill rod firmly in place.',
        material: 'Carburized Steel',
        benefit: 'Prevents rods from slipping out.',
        maintenance: 'Replace latch spring if worn.'
      }
    ],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'rock_drill',
    imageUrl: '/images/products/rock_drill.png'
  },
  {
    id: 'slim-drill-ld4',
    name: 'Slim Drill LD4 Machine',
    slug: 'slim-drill-ld4-machine',
    category: 'Drilling Rigs & Machinery',
    categorySlug: 'rigs-machinery',
    tagline: 'Compact Core Drill for Confined Spaces.',
    description: 'A small core drilling machine for narrow workspaces.',
    longDescription: 'The Slim Drill LD4 is a compact, lightweight rig built for narrow galleries. It has a lightweight aluminum frame that is easy to carry and set up in tight spaces.',
    features: [
      'Very small sliding mast',
      'Lightweight aluminum frame',
      'Pneumatic feed screw',
      'Compact rotation motor'
    ],
    benefits: [
      'Fits in tight spaces down to 1.2m',
      'Easy to carry by hand',
      'Accurate vertical and angle holes'
    ],
    applications: [
      'Narrow mining galleries',
      'Basement anchoring',
      'Confined quarry benches'
    ],
    specs: {
      holeDiameter: '90 – 115 mm',
      drillDepth: '30 meters',
      motorType: 'Pneumatic Feed Screw (2.8 HP)',
      weight: '180 kg',
      dimensions: '1100 x 480 x 780 mm'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Aluminum Frame',
        x: 46,
        y: 45,
        function: 'Supports the guide sliding mast.',
        material: 'Lightweight Aluminum Alloy',
        benefit: 'Easy to carry in narrow tunnels.',
        maintenance: 'Wipe rails clean after work.'
      },
      {
        id: 'hs2',
        name: 'Feed Screw',
        x: 50,
        y: 25,
        function: 'Pushes the drill head along the mast.',
        material: 'High-Tensile Carbon Steel',
        benefit: 'Smooth feed rate in tight spaces.',
        maintenance: 'Apply clean gear grease weekly.'
      },
      {
        id: 'hs3',
        name: 'Boring Bit',
        x: 50,
        y: 90,
        function: 'Cuts through hard quarry walls.',
        material: 'Tungsten Carbide Button Bit',
        benefit: 'Fast penetration in hard granite.',
        maintenance: 'Inspect carbide buttons for chips.'
      }
    ],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'slim_drill',
    imageUrl: '/images/products/slim_drill.png'
  },
  {
    id: 'at-70l4r-std',
    name: 'Airtech 70L4R Standard Pneumatic Motor',
    slug: 'airtech-70l4r-standard-pneumatic-motor',
    category: 'Rotation Motors',
    categorySlug: 'rotation-motors',
    tagline: 'Standard 4-Piston Pneumatic Motor.',
    description: 'A 4-cylinder air motor for drill rotation.',
    longDescription: 'The Airtech 70L4R Standard is a reliable pneumatic rotation drive. It uses four 70mm cylinders to deliver high torque. It is self-lubricating and can reverse rotation instantly.',
    features: [
      'Four 70mm cylinders',
      'Dual shaft bearings',
      'Rotary timing valve',
      'Ductile iron casing'
    ],
    benefits: [
      'Fits any wagon mast',
      'High starting torque',
      'Low internal air leaks'
    ],
    applications: [
      'Limestone blast holes',
      'Construction anchoring',
      'Shallow water boring'
    ],
    specs: {
      motorType: 'Piston Radial Air Motor (70mm Bore)',
      rotationSpeed: '0 – 1500 RPM',
      airConsumption: '450 CFM at 12 bar',
      weight: '48.5 kg (106 lbs)',
      dimensions: '650 x 280 x 290 mm',
      compatibleAccessories: '6210 Bearings, M10 Bolt Flanges'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Rotary Timing Valve',
        x: 75,
        y: 35,
        function: 'Synchronizes air intake and exhaust with crankshaft rotations.',
        material: 'Case-Hardened Tool Steel.',
        benefit: 'Ensures zero power lag on stroke reversals.',
        maintenance: 'Check air filter seals every 100 hours of boring.'
      },
      {
        id: 'hs2',
        name: 'Cast Iron Crankcase',
        x: 45,
        y: 50,
        function: 'Supports the cylinders and holds oil lubricant sump.',
        material: 'SG Ductile Iron.',
        benefit: 'Extremely high rigidity preventing casing cracks under drill pipe vibration.',
        maintenance: 'Drain and refill gear lubrication oil every 500 operating hours.'
      }
    ],
    faqs: [
      {
        question: 'What is the required air supply line pressure?',
        answer: 'The standard motor operates efficiently at 12 bar (174 PSI). It can function down to 7 bar with reduced torque, but should not exceed 15 bar to prevent bearing seal fatigue.'
      }
    ],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'wagon',
    imageUrl: '/images/products/pneumatic_motor.png'
  },
  {
    id: 'at-70l4r-t',
    name: 'Airtech 70L4R-T High-Torque Pneumatic Motor',
    slug: 'airtech-70l4r-t-high-torque-pneumatic-motor',
    category: 'Rotation Motors',
    categorySlug: 'rotation-motors',
    tagline: 'High-Torque Pneumatic Motor.',
    description: 'An upgraded air motor for drilling hard rocks.',
    longDescription: 'The 70L4R-T is a high-torque air motor with a reinforced nose bearing cap. It works up to 15 bar pressure, preventing stalls when drilling hard granite or basalt.',
    features: [
      'Reinforced front bearing cap',
      'Composite cylinder liners',
      'Large timing valve ports',
      'Thermal resistant coat'
    ],
    benefits: [
      'Prevents stalling in hard rock',
      'Longer bearing life',
      'Resists sand and mud entry'
    ],
    applications: [
      'Hard rock blast holes',
      'Deep anchoring systems',
      'DTH hammer drives'
    ],
    specs: {
      motorType: 'Piston Radial Air Motor (70mm Bore)',
      rotationSpeed: '0 – 1200 RPM',
      airConsumption: '520 CFM at 15 bar',
      weight: '52.0 kg (114 lbs)',
      dimensions: '675 x 280 x 290 mm',
      compatibleAccessories: '6210 Bearings, Valve Head Gaskets'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'Tapered Nose bearing cap',
        x: 25,
        y: 40,
        function: 'Supports the output shaft under heavy axial thrust.',
        material: 'High-alloy machined steel.',
        benefit: 'Reduces runout tolerances, protecting the internal gear coupling.',
        maintenance: 'Inject high-pressure grease daily via the front nipple.'
      }
    ],
    faqs: [
      {
        question: 'Does this model require a separate inline lubricator?',
        answer: 'Yes, like all pneumatic motors, a line oiler delivering rock drill oil (ISO 100 or equivalent) at a rate of 2-3 drops per minute is essential.'
      }
    ],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'crawler',
    imageUrl: '/images/products/pneumatic_motor.png'
  },
  {
    id: 'at-70l4r-l',
    name: 'Airtech 70L4R-L Deep Borewell Pneumatic Motor',
    slug: 'airtech-70l4r-l-deep-borewell-pneumatic-motor',
    category: 'Rotation Motors',
    categorySlug: 'rotation-motors',
    tagline: 'Deep Borewell Pneumatic Motor.',
    description: 'A pneumatic motor with long splined shaft for deep wells.',
    longDescription: 'The 70L4R-L is built for deep water well rigs. It features an extended front drive spindle and double rubber seals to prevent mud and water from entering the motor.',
    features: [
      'Extended front drive spindle',
      'Double rubber grease seals',
      'Silenced exhaust cap',
      'Built-in oil separator'
    ],
    benefits: [
      'Keeps mud and water out of the motor',
      'Works well at depths over 200m',
      'Reduces exhaust noise'
    ],
    applications: [
      'Deep agricultural wells',
      'Geothermal loop drilling',
      'Mine shaft dewatering'
    ],
    specs: {
      motorType: 'Piston Radial Air Motor (70mm Bore)',
      rotationSpeed: '0 – 1000 RPM',
      airConsumption: '580 CFM at 18 bar',
      weight: '56.5 kg (124 lbs)',
      dimensions: '710 x 280 x 290 mm',
      compatibleAccessories: '6210 Bearings, Bronze Crank Bush'
    },
    hotspots: [
      {
        id: 'hs1',
        name: 'API Spindle Thread Lock',
        x: 20,
        y: 45,
        function: 'Connects output rotation directly to the water swivel rod strings.',
        material: 'Heat-treated 40Cr steel.',
        benefit: 'Ensures no spindle spin-offs on rotational shock load changes.',
        maintenance: 'Apply thread copper grease before coupling rods.'
      }
    ],
    faqs: [
      {
        question: 'Can this motor handle detergent/foam injection drilling?',
        answer: 'Yes. The double-lip front seals are designed to resist soap and foam chemicals, keeping the internal oil sump clean.'
      }
    ],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'inwell',
    imageUrl: '/images/products/pneumatic_motor.png'
  },
  {
    id: 'heavy-drilling-spares',
    name: 'Heavy Drilling Machine Spares Package',
    slug: 'heavy-drilling-machine-spares-package',
    category: 'Crankcase',
    categorySlug: 'crankcase',
    tagline: 'OEM Gear and Drivetrain Spares.',
    description: 'Precision gears, shaft assemblies, and worm wheels.',
    longDescription: 'Keep your rotation heads running smoothly with our gear spares package. These gears are made of case-hardened steel and cut to precise sizes to ensure smooth power transfer.',
    features: [
      'Case-hardened steel gears',
      'Precise teeth cut',
      'High-strength shafts',
      'Fits standard rigs'
    ],
    benefits: [
      'Prevents gear damage under heavy load',
      'Improves rotation efficiency',
      'Extends gearbox lifespan'
    ],
    applications: [
      'Wagon drill rotation head repair',
      'Crawler drill gearbox maintenance',
      'General rotary head overhauls'
    ],
    specs: {
      motorType: 'Drivetrain Gears Set',
      dimensions: 'Various sizing packages',
      weight: '15.4 kg (combined package)',
      compatibleAccessories: 'NSK Bearings, Gear Oil ISO 150'
    },
    hotspots: [],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'spares',
    imageUrl: '/images/products/drivetrain_spares.png'
  },
  {
    id: 'drilling-tools-pkg',
    name: 'Drilling Tools Package',
    slug: 'heavy-duty-drilling-tools-package',
    category: 'Air System',
    categorySlug: 'air-system',
    tagline: 'High-Strength Drill Rods & Bits.',
    description: 'Drill rods (2m to 3m), DTH hammers, and button bits.',
    longDescription: 'A complete high-performance drilling toolset including high-strength carburized drill rods, DTH hammer assemblies, and tungsten carbide button bits.',
    features: [
      'Carburized steel drill rods',
      'Tungsten carbide button bits',
      'High-flow flushing valves',
      'Impact hammer pistons'
    ],
    benefits: [
      'Drills up to 25% faster',
      'Rods last longer in hard granite',
      'Cleans dust out of holes efficiently'
    ],
    applications: [
      'Basalt and granite blast holes',
      'Deep water well drilling',
      'General rock excavations'
    ],
    specs: {
      motorType: 'Boring Tools Package',
      dimensions: '2m & 3m rod lengths, 4" & 5" bits',
      weight: '38.0 kg (combined package)',
      compatibleAccessories: 'Thread lubricant, seal rings'
    },
    hotspots: [],
    faqs: [],
    brochureUrl: '/brochure.pdf',
    datasheetUrl: '/datasheet.pdf',
    image: 'tools',
    imageUrl: '/images/products/drilling_tools.png'
  }
];

// Helper to convert InventoryItem to Product
export function convertInventoryToProduct(item: any): Product {
  const categorySlugMap: Record<string, string> = {
    'Rotation Motors': 'rotation-motors',
    'Crankcase': 'crankcase',
    'Piston Assembly': 'piston-assembly',
    'Valves': 'valves',
    'Bearings & Seals': 'bearings-seals',
    'Fasteners': 'fasteners',
    'Air System': 'air-system'
  };

  return {
    id: item.sku.toLowerCase(),
    name: item.name,
    slug: item.sku.toLowerCase(),
    category: item.category,
    categorySlug: categorySlugMap[item.category] || 'spare-parts',
    tagline: `OEM Part | Code: ${item.productCode} | Sanath Nagar Forging`,
    description: item.description,
    longDescription: item.longDescription || item.description,
    features: [
      `Material Structure: ${item.material}`,
      `Precision Dimensions: ${item.dimensions}`,
      `Overall Weight: ${item.weight}`,
      `Warehouse Storage: ${item.warehouse} (Rack: ${item.rack}, Pos: ${item.rackPosition || 'N/A'})`
    ],
    benefits: [
      'High metallurgy resilience',
      'Matches exact OEM fittings'
    ],
    applications: item.compatibleMachine ? item.compatibleMachine.split(',') : ['Industrial Drilling'],
    specs: {
      dimensions: item.dimensions,
      weight: item.weight,
      motorType: item.subCategory
    },
    hotspots: [],
    faqs: [],
    brochureUrl: '#',
    datasheetUrl: '#',
    image: 'bit',
    imageUrl: item.images[0] || '/images/inventory/IMG_3086.jpg',
    stockStatus: item.status as 'In Stock' | 'Low Stock' | 'Out of Stock',
    stockQty: item.currentStock
  };
}

// Map the items from INVENTORY (excluding the full assembly rotation motor, which is represented by at-70l4r-std)
const inventoryProducts = INVENTORY.filter(item => item.sku !== 'PRM-AT-70L4R').map(convertInventoryToProduct);

export const PRODUCTS: Product[] = [
  ...BASE_PRODUCTS,
  ...inventoryProducts
];

export const COMPARISONS = [
  {
    feature: 'Piston Diameter',
    '70L4R Standard': '70 mm',
    '70L4R-T (High-Torque)': '70 mm',
    '70L4R-L (Deep Borewell)': '70 mm'
  },
  {
    feature: 'Air Pressure Rating',
    '70L4R Standard': '12 bar (174 PSI)',
    '70L4R-T (High-Torque)': '15 bar (217 PSI)',
    '70L4R-L (Deep Borewell)': '18 bar (261 PSI)'
  },
  {
    feature: 'Max Speed',
    '70L4R Standard': '1500 RPM',
    '70L4R-T (High-Torque)': '1200 RPM',
    '70L4R-L (Deep Borewell)': '1000 RPM'
  },
  {
    feature: 'Shaft Profile',
    '70L4R Standard': 'Keyed Cylinder (38mm)',
    '70L4R-T (High-Torque)': 'Tapered Spline Nose',
    '70L4R-L (Deep Borewell)': 'API Long Spindle Thread'
  },
  {
    feature: 'Operating Weight',
    '70L4R Standard': '48.5 kg',
    '70L4R-T (High-Torque)': '52.0 kg',
    '70L4R-L (Deep Borewell)': '56.5 kg'
  },
  {
    feature: 'Air Consumption',
    '70L4R Standard': '450 CFM',
    '70L4R-T (High-Torque)': '520 CFM',
    '70L4R-L (Deep Borewell)': '580 CFM'
  }
];
