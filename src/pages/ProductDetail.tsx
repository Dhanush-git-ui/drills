import { useParams, Link, useNavigate } from 'react-router-dom';
import { PRODUCTS, BASE_PRODUCTS, convertInventoryToProduct } from '@/data/products';
import type { Product } from '@/data/products';
import { useQuote } from '@/context/QuoteContext';
import HotspotExplorer from '@/components/ui/HotspotExplorer';
import { ArrowLeft, Download, FileText, HelpCircle, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToQuote, quoteItems, removeFromQuote } = useQuote();
  const [customization, setCustomization] = useState({
    engineType: 'Standard Pneumatic',
    mastLength: 'Standard 3.6m',
    spindleThread: 'Standard Keyed 38mm',
    materialGrade: 'Standard Forged Steel (40Cr)',
    greaseSeal: 'Standard NBR rubber'
  });

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

  // Find current product
  const product = productsList.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="pt-32 pb-24 text-center">
        <h2 className="font-heading text-lg font-bold text-brand-charcoal">Product Not Found</h2>
        <Link to="/products" className="mt-4 inline-block text-brand-red font-heading text-xs font-bold uppercase tracking-wider">
          Return to Catalog
        </Link>
      </div>
    );
  }

  // Check if item is already added to quote list
  const isAlreadyInQuote = quoteItems.some((item) => item.product.id === product.id);

  // Related products (same category, excluding current product)
  const relatedProducts = productsList.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 3);


  return (
    <div className="pt-28 pb-24 bg-white select-text">
      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-brand-bordergray py-4 px-6 md:px-12 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4 hidden sm:flex">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-brand-graphite">
            Current Selection:
          </span>
          <span className="font-heading text-sm font-bold text-brand-charcoal">{product.name}</span>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {isAlreadyInQuote ? (
            <button
              onClick={() => removeFromQuote(product.id)}
              className="flex-grow sm:flex-grow-0 px-6 py-3 bg-brand-charcoal hover:bg-black text-white font-heading text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300"
            >
              Remove from Quote List
            </button>
          ) : (
            <button
              onClick={() => addToQuote(product)}
              className="flex-grow sm:flex-grow-0 px-6 py-3 bg-brand-red hover:bg-brand-crimson text-white font-heading text-xs font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md shadow-brand-red/10"
            >
              Add to Quote Builder
            </button>
          )}
          
          <Link
            to="/quote"
            className="px-6 py-3 border border-brand-bordergray hover:border-brand-charcoal text-brand-charcoal font-heading text-xs font-semibold uppercase tracking-widest rounded-xl transition-all"
          >
            Checkout List
          </Link>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Back Link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-brand-graphite hover:text-brand-red mb-8 transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>

        {/* Hero Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red px-2.5 py-1 rounded bg-brand-red/5 border border-brand-red/15 inline-block">
              {product.category}
            </span>
            
            <h1 className="font-display text-4xl md:text-5xl font-black text-brand-charcoal tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="font-sans text-lg font-medium text-brand-red uppercase tracking-wider">
              {product.tagline}
            </p>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-brand-softwhite border border-brand-bordergray/60 mb-6">
              <img
                src={product.imageUrl}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600';
                }}
              />
            </div>

            <p className="font-sans text-sm text-brand-graphite leading-relaxed">
              {product.longDescription}
            </p>

            {/* Application list */}
            <div className="space-y-3 border-t border-brand-bordergray pt-6">
              <h5 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-charcoal">
                Designed for Applications:
              </h5>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-brand-lightgray border border-brand-bordergray/60 font-sans text-xs text-brand-graphite"
                  >
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Customization Options Section */}
            <div className="p-6 border border-brand-bordergray rounded-2xl bg-brand-softwhite/40 space-y-6 mt-8">
              <div className="space-y-1">
                <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-brand-charcoal">
                  Custom Engineering Options
                </h4>
                <p className="font-sans text-[11px] text-brand-graphite leading-relaxed">
                  Configure settings for your local drilling conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.categorySlug === 'rigs-machinery' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="block font-heading text-[9px] font-bold uppercase tracking-wider text-brand-graphite">Power Source / Engine</label>
                      <select 
                        value={customization.engineType}
                        onChange={(e) => setCustomization(prev => ({ ...prev, engineType: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-brand-bordergray rounded-xl font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="Standard Pneumatic">Standard Pneumatic Drive (4 HP)</option>
                        <option value="Diesel Caterpillar">Diesel Caterpillar C7 (225 HP)</option>
                        <option value="Siemens Electric">Siemens Industrial Electric Deck (160 HP)</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-heading text-[9px] font-bold uppercase tracking-wider text-brand-graphite">Mast Travel length</label>
                      <select 
                        value={customization.mastLength}
                        onChange={(e) => setCustomization(prev => ({ ...prev, mastLength: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-brand-bordergray rounded-xl font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="Standard 3.6m">Standard Guide Mast (3.6m)</option>
                        <option value="Extended 6.0m">Extended Deep-Aquifer Mast (6.0m)</option>
                        <option value="Double 8.5m">Heavy Crawler Derrick Mast (8.5m)</option>
                      </select>
                    </div>
                  </>
                )}

                {product.categorySlug === 'rotation-motors' && (
                  <>
                    <div className="space-y-1.5">
                      <label className="block font-heading text-[9px] font-bold uppercase tracking-wider text-brand-graphite">Spindle Connection Thread</label>
                      <select 
                        value={customization.spindleThread}
                        onChange={(e) => setCustomization(prev => ({ ...prev, spindleThread: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-brand-bordergray rounded-xl font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="Standard Keyed 38mm">Standard Keyed Cylindrical (38mm)</option>
                        <option value="2-7/8 API Joint">Threaded Spindle 2-7/8" API Joint</option>
                        <option value="Spline Taper">Heavy Spline Taper Nose Cap</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-heading text-[9px] font-bold uppercase tracking-wider text-brand-graphite">Bearing Seals Spec</label>
                      <select 
                        value={customization.greaseSeal}
                        onChange={(e) => setCustomization(prev => ({ ...prev, greaseSeal: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-brand-bordergray rounded-xl font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="Standard NBR rubber">Standard NBR Nitrile (Single-Lip)</option>
                        <option value="Heavy Double-Lip">Wet Aquifer Double-Lip NBR</option>
                        <option value="Fluorocarbon FMC">High-Temp Fluorocarbon FMC (Viton)</option>
                      </select>
                    </div>
                  </>
                )}

                {!['rigs-machinery', 'rotation-motors'].includes(product.categorySlug) && (
                  <>
                    <div className="space-y-1.5">
                      <label className="block font-heading text-[9px] font-bold uppercase tracking-wider text-brand-graphite">Forging Alloy Grade</label>
                      <select 
                        value={customization.materialGrade}
                        onChange={(e) => setCustomization(prev => ({ ...prev, materialGrade: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-brand-bordergray rounded-xl font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="Standard Steel">Standard Steel/Cast Body</option>
                        <option value="High-Tensile 10.9">High-Tensile Hardened Alloy</option>
                        <option value="Sub-micron ISO fit">Sub-micron ISO tolerance fit</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-heading text-[9px] font-bold uppercase tracking-wider text-brand-graphite">Grease Seals</label>
                      <select 
                        value={customization.greaseSeal}
                        onChange={(e) => setCustomization(prev => ({ ...prev, greaseSeal: e.target.value }))}
                        className="w-full p-2.5 bg-white border border-brand-bordergray rounded-xl font-sans text-xs text-brand-charcoal focus:outline-none focus:border-brand-red cursor-pointer"
                      >
                        <option value="Standard NBR rubber">Standard NBR Nitrile rubber</option>
                        <option value="Fluorocarbon FMC">Fluorocarbon FMC (High Temp/Wear)</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Downloads & Action Box */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-brand-softwhite border border-brand-bordergray rounded-2xl space-y-6 lg:sticky lg:top-28">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-brand-charcoal border-b border-brand-bordergray pb-3">
              Engineering Materials
            </h4>

            <div className="space-y-3">
              <a
                href={product.brochureUrl}
                download
                className="flex items-center justify-between p-4 bg-white border border-brand-bordergray/60 rounded-xl hover:border-brand-red transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-brand-charcoal">Download Brochure</h5>
                    <span className="font-sans text-[10px] text-brand-graphite/60">PDF catalog files (3.4 MB)</span>
                  </div>
                </div>
                <Download size={16} className="text-brand-graphite/40 group-hover:text-brand-red group-hover:translate-y-0.5 transition-all" />
              </a>

              <a
                href={product.datasheetUrl}
                download
                className="flex items-center justify-between p-4 bg-white border border-brand-bordergray/60 rounded-xl hover:border-brand-red transition-all duration-300 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-brand-red/10 text-brand-red flex items-center justify-center">
                    <FileText size={18} />
                  </div>
                  <div>
                    <h5 className="font-heading text-xs font-bold uppercase tracking-wider text-brand-charcoal">Technical Datasheet</h5>
                    <span className="font-sans text-[10px] text-brand-graphite/60">Engineering dimensions & limits (1.2 MB)</span>
                  </div>
                </div>
                <Download size={16} className="text-brand-graphite/40 group-hover:text-brand-red group-hover:translate-y-0.5 transition-all" />
              </a>
            </div>

            <div className="p-4 rounded-xl bg-brand-lightgray border border-brand-bordergray/60 font-sans text-[11px] text-brand-graphite leading-relaxed">
              <strong>Export Info:</strong> Certified for global shipping under API and ISO rules.
            </div>
          </div>
        </div>

        {/* 2. Interactive Hotspots Explorer */}
        {product.hotspots.length > 0 && (
          <div className="space-y-6 mb-16">
            <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-brand-charcoal border-b border-brand-bordergray pb-3">
              Design and Part Details
            </h3>
            <HotspotExplorer hotspots={product.hotspots} productType={product.image} />
          </div>
        )}

        {/* 3. Technical Specifications Grid (Space Grotesk Font) */}
        <div className="space-y-6 mb-16">
          <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-brand-charcoal border-b border-brand-bordergray pb-3">
            Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono">
            {Object.entries(product.specs).map(([key, val]) => {
              // Convert camelCase key to readable title
              const label = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, (str) => str.toUpperCase());
              return (
                <div
                  key={key}
                  className="p-5 bg-brand-softwhite border border-brand-bordergray rounded-xl flex flex-col justify-between"
                >
                  <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-brand-graphite/50 mb-2">
                    {label}
                  </span>
                  <span className="text-xl md:text-2xl font-bold text-brand-charcoal">
                    {val}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Features & Benefits layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="p-8 border border-brand-bordergray rounded-2xl bg-white space-y-6 shadow-sm">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-brand-red flex items-center gap-2">
              <CheckCircle size={18} />
              Key Features
            </h4>
            <ul className="space-y-3 font-sans text-sm text-brand-graphite leading-relaxed">
              {product.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0 mt-2" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 border border-brand-bordergray rounded-2xl bg-white space-y-6 shadow-sm">
            <h4 className="font-heading text-sm font-bold uppercase tracking-widest text-brand-red flex items-center gap-2">
              <CheckCircle size={18} />
              Benefits
            </h4>
            <ul className="space-y-3 font-sans text-sm text-brand-graphite leading-relaxed">
              {product.benefits.map((ben, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-red shrink-0 mt-2" />
                  <span>{ben}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. FAQs Section */}
        {product.faqs.length > 0 && (
          <div className="space-y-6 mb-16">
            <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-brand-charcoal border-b border-brand-bordergray pb-3">
              FAQ & Technical Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.faqs.map((faq, i) => (
                <div key={i} className="p-6 bg-brand-softwhite rounded-xl border border-brand-bordergray/40 space-y-3">
                  <div className="flex items-center gap-2 text-brand-red font-heading text-xs font-bold uppercase tracking-wider">
                    <HelpCircle size={16} />
                    <span>{faq.question}</span>
                  </div>
                  <p className="font-sans text-xs text-brand-graphite leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* 7. Related Products Slider */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="font-heading text-lg font-bold uppercase tracking-widest text-brand-charcoal border-b border-brand-bordergray pb-3">
              Related Systems in Category
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/products/${p.categorySlug}/${p.slug}`}
                  className="group p-5 border border-brand-bordergray rounded-2xl hover:border-brand-red transition-all duration-300 bg-white"
                >
                  <span className="font-heading text-[8px] font-bold uppercase tracking-widest text-brand-red">
                    {p.category}
                  </span>
                  <h4 className="font-heading text-sm font-bold text-brand-charcoal group-hover:text-brand-red transition-colors mt-1.5">
                    {p.name}
                  </h4>
                  <p className="font-sans text-[11px] text-brand-graphite mt-2 line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                  <div className="flex items-center gap-1.5 font-heading text-[9px] font-bold uppercase tracking-widest text-brand-charcoal/60 group-hover:text-brand-red transition-colors mt-4">
                    Explore details <ArrowLeft size={10} className="transform rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
