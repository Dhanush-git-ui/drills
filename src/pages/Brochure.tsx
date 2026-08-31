import { useState } from 'react';
import { 
  Printer, 
  ArrowLeft, 
  Download, 
  Share2, 
  Check, 
  FileText,
  Layers,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BrochureCoverPage, 
  BrochureAboutPage, 
  BrochureProductsPage, 
  BrochureMaterialsContactPage 
} from '@/components/brochure/BrochureSpreads';
import CompanyLogo from '@/components/brochure/CompanyLogo';

export default function Brochure() {
  const [activeTab, setActiveTab] = useState<'all' | 'page1' | 'page2' | 'page3' | 'page4'>('all');
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-brand-charcoal flex flex-col selection:bg-brand-red selection:text-white">
      {/* ── TOP ACTION TOOLBAR (Hidden in Print) ── */}
      <header className="brochure-toolbar sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-bordergray px-6 md:px-12 py-3 flex flex-wrap items-center justify-between gap-4 no-print shadow-sm">
        {/* Left: Brand & Return */}
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-wider text-brand-charcoal hover:text-brand-red transition-colors bg-brand-softwhite px-3.5 py-2 rounded-xl border border-brand-bordergray"
          >
            <ArrowLeft size={14} className="text-brand-red" />
            <span>Back to Website</span>
          </Link>

          <div className="h-6 w-px bg-brand-bordergray hidden sm:block" />

          <div className="flex items-center gap-3">
            <CompanyLogo variant="red" size="sm" showText={true} horizontal={true} />
          </div>
        </div>

        {/* Center: Page Tab Controls */}
        <div className="flex items-center gap-1 bg-brand-softwhite p-1 rounded-xl border border-brand-bordergray overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'all' 
                ? 'bg-brand-charcoal text-white shadow-sm' 
                : 'text-brand-graphite hover:text-brand-charcoal'
            }`}
          >
            All 4 Pages (Booklet)
          </button>
          <button
            onClick={() => setActiveTab('page1')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'page1' 
                ? 'bg-brand-charcoal text-white shadow-sm' 
                : 'text-brand-graphite hover:text-brand-charcoal'
            }`}
          >
            Page 1: Cover
          </button>
          <button
            onClick={() => setActiveTab('page2')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'page2' 
                ? 'bg-brand-charcoal text-white shadow-sm' 
                : 'text-brand-graphite hover:text-brand-charcoal'
            }`}
          >
            Page 2: About Us
          </button>
          <button
            onClick={() => setActiveTab('page3')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'page3' 
                ? 'bg-brand-charcoal text-white shadow-sm' 
                : 'text-brand-graphite hover:text-brand-charcoal'
            }`}
          >
            Page 3: Products
          </button>
          <button
            onClick={() => setActiveTab('page4')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-heading font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
              activeTab === 'page4' 
                ? 'bg-brand-charcoal text-white shadow-sm' 
                : 'text-brand-graphite hover:text-brand-charcoal'
            }`}
          >
            Page 4: Materials & Contact
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-brand-softwhite border border-brand-bordergray text-brand-graphite hover:text-brand-charcoal transition-colors"
            title="Copy Brochure Link to Share"
          >
            {copied ? <Check size={16} className="text-brand-red" /> : <Share2 size={16} />}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-brand-crimson transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Printer size={15} />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </header>

      {/* ── BROCHURE DOCUMENT CONTAINER ── */}
      <main className="brochure-print-container flex-1 w-full max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Printable Notice Banner */}
        <div className="no-print bg-white p-4 rounded-2xl border border-brand-bordergray shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 mt-0.5">
              <FileText size={20} />
            </div>
            <div>
              <h4 className="font-heading text-sm font-bold text-brand-charcoal uppercase tracking-wider">
                PSRS Rock Drills — 4-Page Company Brochure
              </h4>
              <p className="font-sans text-xs text-brand-graphite mt-0.5">
                Simple English, full product lineup, quality materials, and factory contact details. Click <strong>"Print / Save as PDF"</strong> to download a clean 4-page PDF ready to share with clients.
              </p>
            </div>
          </div>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-charcoal text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-brand-red transition-colors shrink-0 cursor-pointer"
          >
            <Download size={14} /> Download 4-Page PDF
          </button>
        </div>

        {/* Page 1: Front Cover */}
        {(activeTab === 'all' || activeTab === 'page1') && (
          <div className="space-y-2">
            <div className="no-print flex items-center justify-between text-xs font-mono text-brand-graphite px-2">
              <span className="font-bold text-brand-red">PAGE 1 // FRONT COVER</span>
              <span>Standard A4 Portrait (210mm × 297mm)</span>
            </div>
            <BrochureCoverPage />
          </div>
        )}

        {/* Page 2: About Us & Factory */}
        {(activeTab === 'all' || activeTab === 'page2') && (
          <div className="space-y-2">
            <div className="no-print flex items-center justify-between text-xs font-mono text-brand-graphite px-2">
              <span className="font-bold text-brand-red">PAGE 2 // ABOUT US & 12,000 m² FACTORY</span>
              <span>Standard A4 Portrait (210mm × 297mm)</span>
            </div>
            <BrochureAboutPage />
          </div>
        )}

        {/* Page 3: Products & Machinery */}
        {(activeTab === 'all' || activeTab === 'page3') && (
          <div className="space-y-2">
            <div className="no-print flex items-center justify-between text-xs font-mono text-brand-graphite px-2">
              <span className="font-bold text-brand-red">PAGE 3 // COMPLETE DRILLING MACHINERY LINEUP</span>
              <span>Standard A4 Portrait (210mm × 297mm)</span>
            </div>
            <BrochureProductsPage />
          </div>
        )}

        {/* Page 4: Materials & Contact */}
        {(activeTab === 'all' || activeTab === 'page4') && (
          <div className="space-y-2">
            <div className="no-print flex items-center justify-between text-xs font-mono text-brand-graphite px-2">
              <span className="font-bold text-brand-red">PAGE 4 // MATERIALS WE USE & FACTORY CONTACTS</span>
              <span>Standard A4 Portrait (210mm × 297mm)</span>
            </div>
            <BrochureMaterialsContactPage />
          </div>
        )}
      </main>

      {/* ── FOOTER (Hidden in print) ── */}
      <footer className="no-print mt-auto border-t border-brand-bordergray bg-white py-4 px-6 md:px-12 text-xs font-sans text-brand-graphite flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-bold text-brand-charcoal">PSR'S Rock Drills</span>
          <span>•</span>
          <span>A-13, IDA Balanagar, Hyderabad 500037, Telangana, India</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono">
          <span>+91 80 4920 1200</span>
          <span>•</span>
          <span>sales@psrsrockdrills.com</span>
          <span>•</span>
          <span className="text-brand-red font-bold">ISO 9001:2015</span>
        </div>
      </footer>
    </div>
  );
}
