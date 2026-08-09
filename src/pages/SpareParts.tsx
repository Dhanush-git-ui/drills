import { useState } from 'react';
import { SPARE_PARTS } from '@/data/spareParts';
import type { SparePart } from '@/data/spareParts';
import { useQuote } from '@/context/QuoteContext';
import type { Product } from '@/data/products';
import { INVENTORY } from '@/data/inventory';
import { Search, SlidersHorizontal, Settings2, ShieldCheck, Check, Info, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export default function SpareParts() {
  const { addToQuote, quoteItems } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedParts, setExpandedParts] = useState<Record<string, boolean>>({});

  const categories = ['all', 'Crankcase', 'Piston Assembly', 'Valves', 'Bearings & Seals', 'Fasteners', 'Air System'];

  // Map spare part IDs to inventory database SKUs
  const skuMap: Record<string, string> = {
    'sp-air-filter': 'AT-PAFE-013',
    'sp-bolt-m10': 'AT-FAS-M10-30',
    'sp-bearing-6208': 'AT-BRG-6208',
    'sp-bearing-6210': 'AT-BRG-6210',
    'sp-balance-weight': 'AT-CCW-006',
    'sp-circlip': 'AT-PPC-008',
    'sp-conn-rod': 'AT-ECR-003',
    'sp-crank-bush': 'AT-CBS-007',
    'sp-crankcase': 'AT-CCH-001',
    'sp-linear-block': 'AT-CGSB-012',
    'sp-o-ring': 'AT-ORS-009',
    'sp-piston': 'AT-RPH-002',
    'sp-rotary-valve': 'AT-RADV-004',
    'sp-top-cover': 'AT-TCP-011',
    'sp-valve-head': 'AT-CVHC-005',
    'sp-valve-packing': 'AT-VHP-010'
  };

  const filteredParts = SPARE_PARTS.filter((part) => {
    const matchesSearch =
      part.verifiedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.originalFilename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.function.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || part.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Convert SparePart to a mock Product to add it to the Quote List
  const handleAddPartToQuote = (part: SparePart) => {
    const mockProduct: Product = {
      id: part.id,
      name: part.verifiedName,
      slug: part.id,
      category: 'Spare Parts',
      categorySlug: 'spare-parts',
      tagline: `OEM File Ref: ${part.originalFilename}`,
      description: part.function,
      longDescription: part.description,
      features: [part.dimensions || 'OEM standard specifications'],
      benefits: [],
      applications: ['Airtech rotation motor replacement', 'Rig maintenance overhaul'],
      specs: {
        dimensions: part.dimensions || 'Standard size'
      },
      hotspots: [],
      faqs: [],
      brochureUrl: '#',
      datasheetUrl: '#',
      image: 'bit',
      imageUrl: `/images/inventory/${part.originalFilename.slice(0, -5)}.jpg`
    };
    addToQuote(mockProduct);
  };

  return (
    <div className="pt-28 pb-24 bg-white select-text">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Banner Section */}
        <div className="relative p-8 md:p-16 rounded-2xl bg-brand-charcoal text-white overflow-hidden mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,16,46,0.12),transparent_50%)]" />
          <div className="relative z-10 max-w-xl space-y-4">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">
              Precision Logistics
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Interactive Spare Parts Explorer
            </h1>
            <p className="font-sans text-sm text-white/70">
              Verified list of spare parts for the Airtech Piston Rotation Motor. Check files and request quotes.
            </p>
          </div>
          
          <div className="relative z-10 px-4 py-3 border border-white/20 bg-white/5 rounded-xl font-sans text-xs text-white/80 leading-relaxed max-w-[280px]">
            <strong>Info:</strong> All spare parts have been checked and verified for compatibility.
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-12 border-b border-brand-bordergray pb-8">
          {/* Search bar */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-graphite/40" size={18} />
            <input
              type="text"
              placeholder="Search by verified part name or file ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 border border-brand-bordergray rounded-full focus:outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red bg-brand-softwhite/40 font-sans text-sm text-brand-charcoal"
            />
          </div>

          {/* Details */}
          <div className="flex items-center gap-2 text-xs text-brand-graphite font-heading">
            <SlidersHorizontal size={14} className="text-brand-red" />
            <span className="font-semibold uppercase tracking-wider">Parts Index:</span>
            <span className="font-mono text-brand-red font-bold">({filteredParts.length} files logged)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar categories */}
          <div className="lg:col-span-1 space-y-4">
            <div className="p-5 border border-brand-bordergray rounded-2xl bg-brand-softwhite">
              <h5 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-charcoal mb-4 flex items-center gap-1.5 border-b border-brand-bordergray pb-3">
                <Settings2 size={14} className="text-brand-red" />
                Filter Category
              </h5>
              
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full py-2.5 px-3 rounded-lg text-left font-heading text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      selectedCategory === cat
                        ? 'bg-brand-red text-white'
                        : 'text-brand-charcoal hover:bg-brand-lightgray'
                    }`}
                  >
                    {cat === 'all' ? 'All Spares' : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* QA Certification Note */}
            <div className="p-5 border border-brand-bordergray rounded-2xl bg-brand-charcoal text-white space-y-4">
              <div className="flex items-center gap-1.5 text-brand-red">
                <ShieldCheck size={16} />
                <h6 className="font-heading text-xs font-bold uppercase tracking-wider">Verified Authenticity</h6>
              </div>
              <p className="font-sans text-[11px] text-white/70 leading-relaxed font-medium">
                All listed spare parts have been checked against original design logs.
              </p>
            </div>
          </div>

          {/* Parts Grid */}
          <div className="lg:col-span-3">
            {filteredParts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredParts.map((part) => {
                  const isInQuote = quoteItems.some((item) => item.product.id === part.id);
                  const isExpanded = !!expandedParts[part.id];
                  const inventoryItem = INVENTORY.find(item => item.sku === skuMap[part.id]);
                  
                  return (
                    <div
                      key={part.id}
                      className="p-6 border border-brand-bordergray rounded-2xl bg-white hover:border-brand-red transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        {/* Converted JPG Image Preview */}
                        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-softwhite border border-brand-bordergray flex items-center justify-center p-2">
                          <img
                            src={`/images/inventory/${part.originalFilename.slice(0, -5)}.jpg`}
                            alt={part.verifiedName}
                            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1537462715879-360eeb61a0bc?q=80&w=300';
                            }}
                          />
                        </div>

                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="font-heading text-[8px] font-bold uppercase tracking-widest text-brand-red px-2 py-0.5 rounded bg-brand-red/5 border border-brand-red/10 inline-block mb-1.5">
                              {part.category}
                            </span>
                            <h3 className="font-heading text-base font-bold text-brand-charcoal">
                              {part.verifiedName}
                            </h3>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded font-heading text-[8px] font-bold uppercase tracking-wider border ${
                            part.status === 'Verified' 
                              ? 'bg-success/5 border-success/20 text-success' 
                              : 'bg-warning/5 border-warning/20 text-warning'
                          }`}>
                            {part.status}
                          </span>
                        </div>

                        <div className="space-y-2 border-t border-brand-lightgray pt-3">
                          <div className="flex items-start gap-1 font-sans text-[10px] text-brand-graphite/60">
                            <FileText size={12} className="shrink-0 mt-0.5" />
                            <span>File Ref: <code>{part.originalFilename}</code></span>
                          </div>
                          {part.correctionNotes && (
                            <div className="p-2.5 rounded-lg bg-warning/5 border border-warning/10 font-sans text-[10px] text-brand-graphite leading-relaxed">
                              <strong>Note:</strong> {part.correctionNotes}
                            </div>
                          )}
                          <p className="font-sans text-xs text-brand-graphite leading-relaxed pt-2">
                            {part.function}
                          </p>

                          {/* Expand Trigger */}
                          <div className="pt-3 border-t border-brand-lightgray/50 mt-3">
                            <button
                              onClick={() => setExpandedParts(prev => ({ ...prev, [part.id]: !prev[part.id] }))}
                              className="font-heading text-[10px] font-bold uppercase tracking-wider text-brand-red hover:text-brand-crimson flex items-center gap-1.5"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp size={12} />
                                  Hide Details
                                </>
                              ) : (
                                <>
                                  <ChevronDown size={12} />
                                  View Details
                                </>
                              )}
                            </button>
                          </div>

                          {/* Collapsible specifications grid */}
                          {isExpanded && inventoryItem && (
                            <div className="mt-3 p-3 rounded-xl bg-brand-softwhite border border-brand-bordergray space-y-2 text-xs font-sans animate-fade-in">
                              <div className="flex justify-between py-0.5 border-b border-brand-bordergray/40">
                                <span className="text-brand-graphite font-medium">B2B Price</span>
                                <span className="font-mono font-bold text-brand-red">{inventoryItem.currency} {inventoryItem.sellingPrice.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between py-0.5 border-b border-brand-bordergray/40">
                                <span className="text-brand-graphite font-medium">Dimensions</span>
                                <span className="font-mono text-brand-charcoal">{inventoryItem.dimensions || 'Standard size'}</span>
                              </div>
                              <div className="flex justify-between py-0.5 border-b border-brand-bordergray/40">
                                <span className="text-brand-graphite font-medium">Weight</span>
                                <span className="text-brand-charcoal">{inventoryItem.weight || 'Standard weight'}</span>
                              </div>
                              <div className="flex justify-between py-0.5 border-b border-brand-bordergray/40">
                                <span className="text-brand-graphite font-medium">Material</span>
                                <span className="text-brand-charcoal">{inventoryItem.material}</span>
                              </div>
                              <div className="flex justify-between py-0.5 border-b border-brand-bordergray/40">
                                <span className="text-brand-graphite font-medium">Availability</span>
                                <span className="text-success font-semibold">
                                  {inventoryItem.currentStock} units in stock
                                </span>
                              </div>
                              <div className="flex justify-between py-0.5 text-[9px] text-brand-graphite/60">
                                <span>Storage Lot</span>
                                <span className="font-mono">{inventoryItem.warehouse} (Rack {inventoryItem.rack})</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-6 border-t border-brand-lightgray mt-4">
                        <button
                          onClick={() => handleAddPartToQuote(part)}
                          className={`w-full py-2.5 rounded-lg font-heading text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 ${
                            isInQuote
                              ? 'bg-brand-charcoal text-white hover:bg-black'
                              : 'bg-brand-red text-white hover:bg-brand-crimson'
                          }`}
                        >
                          {isInQuote ? (
                            <>
                              <Check size={12} />
                              Added
                            </>
                          ) : (
                            'Add to Quote'
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 border border-dashed border-brand-bordergray rounded-2xl bg-brand-softwhite/40">
                <Info size={24} className="mx-auto text-brand-graphite/40 mb-2" />
                <h4 className="font-heading text-base font-bold text-brand-charcoal">No Spares Found</h4>
                <p className="font-sans text-xs text-brand-graphite/60 mt-1">
                  Adjust your search or click different category buttons.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
