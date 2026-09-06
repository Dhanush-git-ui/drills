import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { PRODUCTS, CATEGORIES, BASE_PRODUCTS, convertInventoryToProduct } from '@/data/products';
import type { Product } from '@/data/products';
import { useQuote } from '@/context/QuoteContext';
import { Search, SlidersHorizontal, ChevronRight, HelpCircle, Settings2, Sparkles } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToQuote } = useQuote();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);

  useEffect(() => {
    const fetchDynamicProducts = async () => {
      const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocal 
        ? 'http://localhost:3000/api/inventory' 
        : 'https://psrs-admin-dhanush-git-uis-projects.vercel.app/api/inventory';

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        if (data && data.length > 0) {
          const mappedInventory = data
            .filter((item: any) => item.sku !== 'PRM-AT-70L4R')
            .map(convertInventoryToProduct);
          
          setProductsList([
            ...BASE_PRODUCTS,
            ...mappedInventory
          ]);
        }
      } catch (err) {
        console.warn('Unable to connect to live products API. Using local offline fallback data.', err);
      }
    };
    fetchDynamicProducts();
  }, []);
  
  // AI Assistant States
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiStep, setAiStep] = useState(1);
  const [aiAnswers, setAiAnswers] = useState({
    industry: '',
    diameter: '',
    depth: '',
    strata: ''
  });
  const [aiRecommendation, setAiRecommendation] = useState<Product[]>([]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Handle category tabs
  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    if (categorySlug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categorySlug);
    }
    setSearchParams(searchParams);
  };

  // Filter products based on search term & category selection
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.tagline.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.categorySlug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // AI Recommendation Engine Logic
  const handleAiOption = (field: string, val: string) => {
    setAiAnswers((prev) => ({ ...prev, [field]: val }));
    setAiStep((prev) => prev + 1);
  };

  const getAiRecommendation = () => {
    // Basic heuristics based on selections
    let matches: Product[] = [];
    
    if (aiAnswers.industry === 'water-well' || aiAnswers.depth === 'deep') {
      // Recommend Inwell Rig and Deep Borewell Motors
      matches = productsList.filter((p) => p.id === 'psr-h6-waterwell' || p.id === 'at-70l4r-l');
    } else if (aiAnswers.industry === 'mining' || aiAnswers.diameter === 'large') {
      // Recommend Crawler Drill and high torque motor
      matches = productsList.filter((p) => p.id === 'psr-c300-crawler' || p.id === 'at-70l4r-t');
    } else {
      // Recommend Wagon Drill and standard motor
      matches = productsList.filter((p) => p.id === 'psr-w100-wagon' || p.id === 'at-70l4r-std');
    }

    setAiRecommendation(matches);
  };

  const resetAiAssistant = () => {
    setAiStep(1);
    setAiAnswers({ industry: '', diameter: '', depth: '', strata: '' });
    setAiRecommendation([]);
  };

  useEffect(() => {
    if (aiStep === 5) {
      getAiRecommendation();
    }
  }, [aiStep]);

  return (
    <div className="pt-28 pb-24 bg-white">
      <div className="w-full px-6 md:px-12 lg:px-20">
        {/* Banner Section */}
        <div className="relative p-8 md:p-16 rounded-3xl overflow-hidden mb-16 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ background: 'linear-gradient(135deg, #1D1D1D 0%, #2a1a1a 50%, #1D1D1D 100%)' }}
        >
          {/* Animated gradient blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />

          <div className="relative z-10 max-w-xl space-y-5">
            <span className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-brand-red">
              <span className="w-6 h-px bg-brand-red" />
              Engineering Catalog
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Drill Systems
              <span className="block text-brand-red">& Spare Parts</span>
            </h1>
            <p className="font-sans text-base text-white/60 max-w-md leading-relaxed">
              Browse precision-engineered rock drills, crawler rigs, and high-performance drilling components.
            </p>
          </div>
          
          {/* AI Helper Trigger */}
          <button
            onClick={() => setAiAssistantOpen(true)}
            className="relative z-10 group px-7 py-4 text-white font-heading text-sm font-bold uppercase tracking-widest rounded-2xl flex items-center gap-3 shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)', boxShadow: '0 8px 32px rgba(200,16,46,0.4)' }}
          >
            <Sparkles size={18} className="animate-pulse" />
            AI Recommendation Tool
          </button>
        </div>

        {/* AI Recommendation Assistant Modal */}
        {aiAssistantOpen && (
          <div className="fixed inset-0 z-50 bg-brand-charcoal/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white border border-brand-bordergray rounded-2xl p-6 md:p-10 relative overflow-hidden max-h-[90vh] overflow-y-auto">
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => { setAiAssistantOpen(false); resetAiAssistant(); }}
                  className="p-1 text-brand-graphite/60 hover:text-brand-charcoal bg-brand-lightgray rounded-full"
                >
                  ✕
                </button>
              </div>

              {aiStep === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <span className="font-heading text-[10px] font-bold text-brand-red uppercase tracking-wider">Step 1 of 4</span>
                  <h3 className="font-display text-2xl font-bold text-brand-charcoal">Select your primary industry application:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'mining', label: 'Open-Cast / Pit Mining' },
                      { id: 'water-well', label: 'Deep Water Well Boring' },
                      { id: 'quarrying', label: 'Hard Rock Quarrying' },
                      { id: 'construction', label: 'Civil Infrastructure & Anchor' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAiOption('industry', opt.id)}
                        className="p-5 border border-brand-bordergray hover:border-brand-red hover:bg-brand-softwhite rounded-xl text-left font-heading text-xs font-semibold uppercase tracking-wider text-brand-charcoal transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStep === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <span className="font-heading text-[10px] font-bold text-brand-red uppercase tracking-wider">Step 2 of 4</span>
                  <h3 className="font-display text-2xl font-bold text-brand-charcoal">What is your target borehole diameter?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'small', label: '85mm – 115mm (3" – 4.5")' },
                      { id: 'medium', label: '115mm – 152mm (4.5" – 6")' },
                      { id: 'large', label: '152mm – 250mm (6" – 10")' },
                      { id: 'any', label: 'Variable / Accessories' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAiOption('diameter', opt.id)}
                        className="p-5 border border-brand-bordergray hover:border-brand-red hover:bg-brand-softwhite rounded-xl text-left font-heading text-xs font-semibold uppercase tracking-wider text-brand-charcoal transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStep === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <span className="font-heading text-[10px] font-bold text-brand-red uppercase tracking-wider">Step 3 of 4</span>
                  <h3 className="font-display text-2xl font-bold text-brand-charcoal">What is the typical depth parameter of your bores?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'shallow', label: 'Up to 30 meters (100 ft)' },
                      { id: 'mid', label: '30 to 100 meters (100 - 330 ft)' },
                      { id: 'deep', label: '100 to 200+ meters (330 - 650 ft)' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAiOption('depth', opt.id)}
                        className="p-5 border border-brand-bordergray hover:border-brand-red hover:bg-brand-softwhite rounded-xl text-left font-heading text-xs font-semibold uppercase tracking-wider text-brand-charcoal transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStep === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <span className="font-heading text-[10px] font-bold text-brand-red uppercase tracking-wider">Step 4 of 4</span>
                  <h3 className="font-display text-2xl font-bold text-brand-charcoal">What is the predominant geological rock strata?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: 'quartz', label: 'Granite & Abrasive Quartz' },
                      { id: 'basalt', label: 'Basalt & Hard Igneous Rock' },
                      { id: 'limestone', label: 'Limestone & Medium Sandstone' },
                      { id: 'clay', label: 'Clay, Sand & Swelling Soil' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleAiOption('strata', opt.id)}
                        className="p-5 border border-brand-bordergray hover:border-brand-red hover:bg-brand-softwhite rounded-xl text-left font-heading text-xs font-semibold uppercase tracking-wider text-brand-charcoal transition-colors"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {aiStep === 5 && (
                <div className="space-y-6 animate-fade-in">
                  <span className="font-heading text-[10px] font-bold text-brand-red uppercase tracking-wider">Recommendation Result</span>
                  <h3 className="font-display text-2xl font-bold text-brand-charcoal">Recommended PSR Configurations:</h3>
                  <p className="font-sans text-xs text-brand-graphite">
                    Based on your choices, we suggest these tools for your work.
                  </p>

                  <div className="space-y-4 pt-2">
                    {aiRecommendation.map((prod) => (
                      <div key={prod.id} className="p-4 bg-brand-lightgray border border-brand-bordergray rounded-xl flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-brand-red">
                            {prod.category}
                          </span>
                          <h4 className="font-heading text-sm font-bold text-brand-charcoal">{prod.name}</h4>
                          <p className="font-sans text-[11px] text-brand-graphite/80 max-w-sm line-clamp-1">{prod.tagline}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/products/${prod.categorySlug}/${prod.slug}`}
                            onClick={() => setAiAssistantOpen(false)}
                            className="px-4 py-2 border border-brand-charcoal hover:border-brand-red hover:text-brand-red text-brand-charcoal font-heading text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => {
                              addToQuote(prod);
                            }}
                            className="px-4 py-2 bg-brand-red hover:bg-brand-crimson text-white font-heading text-[10px] font-bold uppercase tracking-wider rounded-lg transition-colors"
                          >
                            Add Quote
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-3 border-t border-brand-bordergray pt-6 mt-4">
                    <button
                      onClick={resetAiAssistant}
                      className="px-5 py-2.5 bg-brand-lightgray hover:bg-brand-bordergray/40 text-brand-charcoal font-heading text-xs font-semibold uppercase tracking-wider rounded-xl"
                    >
                      Start Over
                    </button>
                    <button
                      onClick={() => { setAiAssistantOpen(false); resetAiAssistant(); }}
                      className="px-5 py-2.5 bg-brand-charcoal hover:bg-black text-white font-heading text-xs font-semibold uppercase tracking-wider rounded-xl"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Toolbar & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-10">
          {/* Search bar */}
          <div className="relative w-full lg:max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-graphite/40" size={18} />
            <input
              type="text"
              placeholder="Search products, specs, part numbers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 rounded-2xl font-sans text-sm text-brand-charcoal focus:outline-none transition-all duration-300"
              style={{ border: '1.5px solid #E5E5E5', background: 'white', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
              onFocus={e => (e.target.style.boxShadow = '0 0 0 3px rgba(200,16,46,0.12), 0 2px 12px rgba(0,0,0,0.04)', e.target.style.borderColor = '#C8102E')}
              onBlur={e => (e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)', e.target.style.borderColor = '#E5E5E5')}
            />
          </div>

          {/* Helper details */}
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-brand-charcoal/5 border border-brand-bordergray">
            <SlidersHorizontal size={15} className="text-brand-red" />
            <span className="font-heading text-sm font-semibold text-brand-graphite uppercase tracking-wider">Portfolio:</span>
            <span className="font-mono text-sm text-brand-red font-bold">{filteredProducts.length} products</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden" style={{ border: '1.5px solid #E5E5E5', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
              <div className="px-5 py-4 flex items-center gap-2 border-b border-brand-bordergray" style={{ background: 'linear-gradient(135deg, #1D1D1D 0%, #2d2d2d 100%)' }}>
                <Settings2 size={15} className="text-brand-red" />
                <h5 className="font-heading text-sm font-bold uppercase tracking-widest text-white">Filter by Category</h5>
              </div>
              <div className="p-3 bg-white flex flex-col gap-1">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`w-full py-2.5 px-4 rounded-xl text-left font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                    selectedCategory === 'all'
                      ? 'text-white shadow-md'
                      : 'text-brand-charcoal hover:bg-brand-lightgray'
                  }`}
                  style={selectedCategory === 'all' ? { background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)' } : {}}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${selectedCategory === 'all' ? 'bg-white' : 'bg-brand-graphite/30'}`} />
                  All Categories
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`w-full py-2.5 px-4 rounded-xl text-left font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-2 ${
                      selectedCategory === cat.slug
                        ? 'text-white shadow-md'
                        : 'text-brand-charcoal hover:bg-brand-lightgray'
                    }`}
                    style={selectedCategory === cat.slug ? { background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)' } : {}}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedCategory === cat.slug ? 'bg-white' : 'bg-brand-graphite/30'}`} />
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Helper Widget */}
            <div className="p-6 rounded-2xl text-white space-y-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1D1D1D 0%, #2a1a1a 100%)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
              <div className="flex items-center gap-2 text-brand-red">
                <HelpCircle size={18} />
                <h6 className="font-heading text-sm font-bold uppercase tracking-wider">Need Custom Specs?</h6>
              </div>
              <p className="font-sans text-sm text-white/70 leading-relaxed">
                Contact our Hyderabad office for custom guides, special gears, or other custom tools.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading text-xs font-bold uppercase tracking-widest text-white transition-all duration-200 hover:gap-3"
                style={{ background: 'rgba(200,16,46,0.15)', border: '1px solid rgba(200,16,46,0.3)' }}
              >
                Contact Sales Desk <ChevronRight size={13} />
              </Link>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="group border border-brand-bordergray rounded-2xl overflow-hidden bg-white hover:border-brand-red transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {/* Visual box */}
                    <Link
                      to={`/products/${prod.categorySlug}/${prod.slug}`}
                      className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-brand-softwhite block cursor-pointer group/img"
                    >
                      {/* Subtle red glow accent */}
                      <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        loading="lazy"
                        className="relative z-10 w-full h-full object-contain p-2.5 group-hover/img:scale-105 transition-transform duration-500 drop-shadow-lg"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=300';
                        }}
                      />
                    </Link>

                    {/* Metadata */}
                    <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-1.5">
                        <Link
                          to={`/products/${prod.categorySlug}/${prod.slug}`}
                          className="block font-heading text-base font-bold text-brand-charcoal hover:text-brand-red transition-colors leading-snug cursor-pointer"
                        >
                          {prod.name}
                        </Link>
                        <p className="font-sans text-xs font-semibold text-brand-red uppercase tracking-wider">
                          {prod.tagline}
                        </p>
                        <p className="font-sans text-sm text-brand-graphite leading-relaxed line-clamp-2">
                          {prod.description}
                        </p>
                      </div>

                      {/* Availability Badge */}
                      <div className="flex items-center gap-2">
                        {prod.stockStatus ? (
                          <>
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider ${
                                prod.stockStatus === 'In Stock'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : prod.stockStatus === 'Low Stock'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-red-50 text-red-600 border border-red-200'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  prod.stockStatus === 'In Stock'
                                    ? 'bg-emerald-500'
                                    : prod.stockStatus === 'Low Stock'
                                    ? 'bg-amber-500'
                                    : 'bg-red-500'
                                }`}
                              />
                              {prod.stockStatus === 'Out of Stock' ? 'Not Available' : prod.stockStatus}
                            </span>
                            {(prod.stockStatus === 'In Stock' || prod.stockStatus === 'Low Stock') && prod.stockQty !== undefined && (
                              <span className="font-mono text-xs text-brand-graphite/70 font-semibold">
                                {prod.stockQty} unit{prod.stockQty !== 1 ? 's' : ''} available
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-heading text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
                            <span className="w-2 h-2 rounded-full bg-sky-500" />
                            Contact for Availability
                          </span>
                        )}
                      </div>

                      {/* Specs */}
                      {(prod.specs.holeDiameter || prod.specs.drillDepth) && (
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-brand-lightgray">
                          {prod.specs.holeDiameter && (
                            <div className="flex flex-col gap-0.5">
                              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-brand-graphite/50">Hole Diameter</span>
                              <span className="font-semibold text-sm text-brand-charcoal">{prod.specs.holeDiameter}</span>
                            </div>
                          )}
                          {prod.specs.drillDepth && (
                            <div className="flex flex-col gap-0.5">
                              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-brand-graphite/50">Drill Depth</span>
                              <span className="font-semibold text-sm text-brand-charcoal">{prod.specs.drillDepth}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* CTA Buttons */}
                      <div className="flex items-center gap-2 pt-1">
                        <Link
                          to={`/products/${prod.categorySlug}/${prod.slug}`}
                          className="flex-grow text-center py-2.5 px-3 border border-brand-charcoal hover:border-brand-red hover:text-brand-red text-brand-charcoal font-heading text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200"
                        >
                          View Details
                        </Link>
                        
                        {/* WhatsApp Booking / Inquiry Button */}
                        <a
                          href={`https://wa.me/919666316818?text=${encodeURIComponent(
                            `Hello PSRS Rock Drills, I want to book / inquire about the product: ${prod.name} (Category: ${prod.category}). Please share pricing and availability details.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-all flex items-center justify-center shrink-0 shadow-sm hover:scale-105 active:scale-95"
                          title="Book / Inquire on WhatsApp (+91 96663 16818)"
                        >
                          <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.655 4.615 1.792 6.528L4 29l7.688-1.775A11.946 11.946 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 27 16 27a9.946 9.946 0 01-4.99-1.34l-.36-.211-3.744.865.882-3.629-.233-.376A9.955 9.955 0 016 15c0-5.523 4.477-10 10-10zm-3.07 5.5c-.198 0-.52.074-.793.369-.272.295-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.072c.149.198 2.095 3.198 5.076 4.362.708.273 1.26.435 1.69.557.71.202 1.357.174 1.868.105.57-.076 1.754-.716 2.002-1.408.248-.692.248-1.285.174-1.408-.074-.124-.272-.198-.57-.347-.297-.149-1.754-.866-2.025-.965-.272-.099-.47-.149-.668.149-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.074-.297-.149-1.254-.462-2.388-1.474-.883-.787-1.479-1.76-1.652-2.057-.173-.297-.018-.457.13-.605.133-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.049-.372-.025-.52-.074-.149-.668-1.61-.915-2.203-.24-.578-.486-.5-.668-.509l-.568-.01z" />
                          </svg>
                        </a>

                        <button
                          onClick={() => addToQuote(prod)}
                          className="px-3.5 py-2.5 text-white font-heading text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
                          style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)', boxShadow: '0 3px 10px rgba(200,16,46,0.25)' }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 rounded-2xl" style={{ border: '1.5px dashed #E5E5E5', background: '#fafafa' }}>
                <div className="w-16 h-16 rounded-2xl bg-brand-lightgray flex items-center justify-center mx-auto mb-4">
                  <Search size={28} className="text-brand-graphite/30" />
                </div>
                <h4 className="font-heading text-base font-bold text-brand-charcoal">No Products Found</h4>
                <p className="font-sans text-sm text-brand-graphite/60 mt-2">
                  Adjust your filters or try a different search query.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
