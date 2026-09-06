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
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  const PDF_URL = "/PSR'S Rock Drills.pdf";
  const PDF_FILENAME = "PSRS_Rock_Drills_Company_Brochure.pdf";

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = PDF_URL;
    link.download = PDF_FILENAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToastMsg("Brochure PDF downloaded!");
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleWhatsAppShare = async () => {
    // Try native Web Share API with PDF file first (Mobile Chrome/Safari/Edge)
    try {
      const response = await fetch(PDF_URL);
      const blob = await response.blob();
      const pdfFile = new File([blob], PDF_FILENAME, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: "PSRS Rock Drills — Company Brochure (PDF)",
          text: "Official PSR'S Rock Drills Company Brochure & Product Guide (PDF)",
          files: [pdfFile],
        });
        setToastMsg("Brochure PDF shared to WhatsApp!");
        setTimeout(() => setToastMsg(null), 3500);
        return;
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
      console.warn("Native file sharing unavailable, proceeding to download & WhatsApp fallback:", err);
    }

    // Desktop / Fallback flow:
    // 1. Trigger instant download of the PDF file
    handleDownloadPdf();

    // 2. Open WhatsApp with prefilled message
    const msg = encodeURIComponent(
      "Hello! Here is the official PSR'S Rock Drills Company Brochure (PDF) with full equipment specifications and catalog. Please find the attached PDF."
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');

    // 3. Show guidance modal
    setShowShareModal(true);
  };

  const handleShare = async () => {
    try {
      const response = await fetch(PDF_URL);
      const blob = await response.blob();
      const pdfFile = new File([blob], PDF_FILENAME, { type: 'application/pdf' });

      if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
        await navigator.share({
          title: "PSRS Rock Drills — Official Company Brochure (PDF)",
          text: "Explore heavy crawler drill rigs, pneumatic sinker rock drills, and precision air motors from PSR'S Rock Drills.",
          files: [pdfFile],
        });
        setToastMsg("Brochure PDF shared!");
        setTimeout(() => setToastMsg(null), 3000);
        return;
      }
    } catch (err: any) {
      if (err.name === 'AbortError') return;
    }

    // Fallback: Download the PDF directly
    handleDownloadPdf();
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
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
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toast Notification */}
          {toastMsg && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-heading font-bold uppercase tracking-wider animate-fade-in">
              <Check size={13} className="text-emerald-600" />
              {toastMsg}
            </span>
          )}

          {/* WhatsApp Share Button (Shares actual PDF document) */}
          <button
            onClick={handleWhatsAppShare}
            className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition-all flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            title="Share Brochure PDF on WhatsApp"
          >
            <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.655 4.615 1.792 6.528L4 29l7.688-1.775A11.946 11.946 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 27 16 27a9.946 9.946 0 01-4.99-1.34l-.36-.211-3.744.865.882-3.629-.233-.376A9.955 9.955 0 016 15c0-5.523 4.477-10 10-10zm-3.07 5.5c-.198 0-.52.074-.793.369-.272.295-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.072c.149.198 2.095 3.198 5.076 4.362.708.273 1.26.435 1.69.557.71.202 1.357.174 1.868.105.57-.076 1.754-.716 2.002-1.408.248-.692.248-1.285.174-1.408-.074-.124-.272-.198-.57-.347-.297-.149-1.754-.866-2.025-.965-.272-.099-.47-.149-.668.149-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.074-.297-.149-1.254-.462-2.388-1.474-.883-.787-1.479-1.76-1.652-2.057-.173-.297-.018-.457.13-.605.133-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.049-.372-.025-.52-.074-.149-.668-1.61-.915-2.203-.24-.578-.486-.5-.668-.509l-.568-.01z" />
            </svg>
            <span className="hidden md:inline">Share PDF on WhatsApp</span>
          </button>

          {/* Copy Link / Native Share Button */}
          <button
            onClick={handleShare}
            className="p-2.5 rounded-xl bg-brand-softwhite border border-brand-bordergray text-brand-graphite hover:text-brand-charcoal hover:border-brand-charcoal transition-all flex items-center gap-1.5 text-xs font-heading font-bold uppercase tracking-wider cursor-pointer"
            title="Share / Download PDF"
          >
            {copied ? <Check size={15} className="text-brand-red" /> : <Share2 size={15} />}
            <span className="hidden md:inline">{copied ? "PDF Ready!" : "Share PDF"}</span>
          </button>

          {/* Direct PDF Download Button */}
          <button
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-charcoal text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-black transition-all shadow-md active:scale-95 cursor-pointer"
            title="Download PDF directly"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          {/* Print Button */}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-red text-white font-heading text-xs font-bold uppercase tracking-wider hover:bg-brand-crimson transition-all shadow-md active:scale-95 cursor-pointer"
            title="Print or Save via Browser"
          >
            <Printer size={15} />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </header>

      {/* ── WHATSAPP SHARE GUIDANCE MODAL (Desktop Fallback) ── */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-brand-bordergray rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl animate-fade-in relative">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md">
                <svg viewBox="0 0 32 32" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.655 4.615 1.792 6.528L4 29l7.688-1.775A11.946 11.946 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 27 16 27a9.946 9.946 0 01-4.99-1.34l-.36-.211-3.744.865.882-3.629-.233-.376A9.955 9.955 0 016 15c0-5.523 4.477-10 10-10zm-3.07 5.5c-.198 0-.52.074-.793.369-.272.295-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.072c.149.198 2.095 3.198 5.076 4.362.708.273 1.26.435 1.69.557.71.202 1.357.174 1.868.105.57-.076 1.754-.716 2.002-1.408.248-.692.248-1.285.174-1.408-.074-.124-.272-.198-.57-.347-.297-.149-1.754-.866-2.025-.965-.272-.099-.47-.149-.668.149-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.074-.297-.149-1.254-.462-2.388-1.474-.883-.787-1.479-1.76-1.652-2.057-.173-.297-.018-.457.13-.605.133-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.049-.372-.025-.52-.074-.149-.668-1.61-.915-2.203-.24-.578-.486-.5-.668-.509l-.568-.01z" />
                </svg>
              </div>
              <div>
                <h4 className="font-heading text-base font-bold text-brand-charcoal">Brochure PDF Downloaded!</h4>
                <p className="font-sans text-xs text-brand-graphite">Ready to send in your WhatsApp chat.</p>
              </div>
            </div>

            <div className="bg-brand-softwhite border border-brand-bordergray rounded-xl p-4 space-y-3 font-sans text-xs text-brand-charcoal">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                <span><strong>PDF File Saved:</strong> <code className="bg-white px-1.5 py-0.5 rounded border border-brand-bordergray font-mono text-[11px]">PSR'S Rock Drills.pdf</code> is in your Downloads.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                <span><strong>In WhatsApp:</strong> Click the attachment clip icon (📎) or drag & drop the PDF into the chat window to send.</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={handleDownloadPdf}
                className="px-4 py-2 border border-brand-bordergray hover:border-brand-charcoal text-brand-charcoal font-heading text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Download Again
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

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
                PSRS Rock Drills — 4-Page Company Brochure (PDF)
              </h4>
              <p className="font-sans text-xs text-brand-graphite mt-0.5">
                Full machinery lineup, technical parameters, quality materials, and factory contact details.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleWhatsAppShare}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.655 4.615 1.792 6.528L4 29l7.688-1.775A11.946 11.946 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 27 16 27a9.946 9.946 0 01-4.99-1.34l-.36-.211-3.744.865.882-3.629-.233-.376A9.955 9.955 0 016 15c0-5.523 4.477-10 10-10zm-3.07 5.5c-.198 0-.52.074-.793.369-.272.295-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.072c.149.198 2.095 3.198 5.076 4.362.708.273 1.26.435 1.69.557.71.202 1.357.174 1.868.105.57-.076 1.754-.716 2.002-1.408.248-.692.248-1.285.174-1.408-.074-.124-.272-.198-.57-.347-.297-.149-1.754-.866-2.025-.965-.272-.099-.47-.149-.668.149-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.074-.297-.149-1.254-.462-2.388-1.474-.883-.787-1.479-1.76-1.652-2.057-.173-.297-.018-.457.13-.605.133-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.049-.372-.025-.52-.074-.149-.668-1.61-.915-2.203-.24-.578-.486-.5-.668-.509l-.568-.01z" />
              </svg>
              Send on WhatsApp
            </button>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-charcoal hover:bg-black text-white font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
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
          <span>+91 96663 16818</span>
          <span>•</span>
          <span>sales@psrsrockdrills.com</span>
          <span>•</span>
          <span className="text-brand-red font-bold">ISO 9001:2015</span>
        </div>
      </footer>
    </div>
  );
}
