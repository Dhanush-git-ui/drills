import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Phone, Mail, MapPin, Layers, HeartHandshake } from 'lucide-react';
import { QuoteProvider, useQuote } from '@/context/QuoteContext';
import SmoothScroll from '@/components/ui/SmoothScroll';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Quote from '@/pages/Quote';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Inventory from '@/pages/Inventory';

// Scroll to top helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Inner App with Routing Shell
function AppContent() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { quoteItems } = useQuote();
  const location = useLocation();

  const isHeroPage = location.pathname === '/' || location.pathname === '/about';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavScrolled(true);
      } else {
        setNavScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalQuoteCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-brand-red selection:text-white">
      {/* Sticky Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          navScrolled
            ? 'glass-nav py-4 shadow-sm'
            : isHeroPage
            ? 'bg-transparent py-6 border-b border-white/10'
            : 'bg-white py-6 border-b border-brand-bordergray'
        }`}
      >
        <div className="w-full px-8 md:px-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded bg-brand-red flex items-center justify-center text-white font-display font-extrabold text-lg tracking-tighter">
              P
            </span>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-black tracking-tight text-brand-charcoal transition-colors">
                PSR'S
              </span>
              <span className="font-mono text-[9px] font-bold tracking-widest text-brand-graphite transition-colors">
                ROCK DRILLS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-heading text-sm font-semibold uppercase tracking-wider">
            {[
              { label: 'Products', path: '/products' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative py-1 transition-colors hover:text-brand-red ${
                    isActive
                      ? 'text-brand-red'
                      : 'text-brand-charcoal'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-red animate-fade-in" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action & Mobilizer */}
          <div className="flex items-center gap-4">
            <Link
              to="/quote"
              className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-heading text-xs font-semibold uppercase tracking-widest transition-all duration-300 border ${
                navScrolled
                  ? 'bg-brand-red border-brand-red text-white hover:bg-brand-crimson hover:shadow-lg'
                  : 'bg-brand-red border-brand-red text-white hover:bg-brand-crimson'
              }`}
            >
              Request Quote
              {totalQuoteCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-brand-charcoal text-white flex items-center justify-center text-[10px] font-bold font-mono">
                  {totalQuoteCount}
                </span>
              )}
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg transition-colors text-brand-charcoal hover:bg-brand-lightgray"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-brand-bordergray shadow-xl py-6 px-6 animate-fade-in">
            <nav className="flex flex-col gap-4 font-heading text-base font-bold uppercase tracking-wide">
              {[
                { label: 'Products', path: '/products' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-brand-lightgray transition-colors hover:text-brand-red ${
                    location.pathname === link.path ? 'text-brand-red' : 'text-brand-charcoal'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/quote"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 py-3 bg-brand-red text-white rounded-xl text-center flex items-center justify-center gap-2 hover:bg-brand-crimson"
              >
                Quote Builder list ({totalQuoteCount})
                <ArrowRight size={16} />
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Pages Content */}
      <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:category/:slug" element={<ProductDetail />} />
            <Route path="/spare-parts" element={<Navigate to="/products" replace />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/comparison" element={<Navigate to="/products" replace />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
      </main>

      {/* Global Footer */}
      <footer className="bg-brand-charcoal text-brand-white border-t border-brand-graphite/40 pt-16 pb-8">
        <div className="w-full px-8 md:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded bg-brand-red flex items-center justify-center text-white font-display font-extrabold text-lg">
                P
              </span>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg font-black tracking-tight">PSR'S</span>
                <span className="font-mono text-[9px] font-bold tracking-widest text-brand-white/60">
                  ROCK DRILLS
                </span>
              </div>
            </div>
            <p className="font-sans text-sm text-brand-white/70 leading-relaxed">
              Global manufacturer of premium wagon drills, crawler rigs, and DTH rock drilling accessories. Engineered for extreme terrains and deep-bore reliability.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded bg-brand-graphite/50 text-white hover:bg-brand-red transition-colors">
                <Layers size={18} />
              </a>
              <a href="#" className="p-2 rounded bg-brand-graphite/50 text-white hover:bg-brand-red transition-colors">
                <HeartHandshake size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-white/80">
              Product Categories
            </h5>
            <ul className="space-y-2.5 font-sans text-sm text-brand-white/60">
              <li><Link to="/products" className="hover:text-brand-red transition-colors">Wagon Drills</Link></li>
              <li><Link to="/products" className="hover:text-brand-red transition-colors">Crawler Drills</Link></li>
              <li><Link to="/products" className="hover:text-brand-red transition-colors">Inwell Drilling Rigs</Link></li>
              <li><Link to="/products" className="hover:text-brand-red transition-colors">DTH Hammers & Bits</Link></li>
              <li><Link to="/products" className="hover:text-brand-red transition-colors">Spare Parts & Spares</Link></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div className="space-y-4">
            <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-white/80">
              Corporate
            </h5>
            <ul className="space-y-2.5 font-sans text-sm text-brand-white/60">
              <li><Link to="/about" className="hover:text-brand-red transition-colors">About PSR'S</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact Office</Link></li>
            </ul>
          </div>

          {/* Address and Contact info */}
          <div className="space-y-4">
            <h5 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-white/80">
              Global Headquarters
            </h5>
            <ul className="space-y-3 font-sans text-sm text-brand-white/60">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-red shrink-0 mt-0.5" />
                <span>A-13, IDA, Balanagar, Hyderabad, Telangana 500037, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-red shrink-0" />
                <span>+91 80 4920 1200</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-red shrink-0" />
                <span>sales@psrsrockdrills.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copy lines */}
        <div className="w-full px-8 md:px-16 border-t border-brand-graphite/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-sm text-brand-white/40">
          <p>© {new Date().getFullYear()} PSR'S Rock Drills. All engineering patents and product rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-red">Privacy Policy</a>
            <a href="#" className="hover:text-brand-red">Terms & Conditions</a>
            <a href="#" className="hover:text-brand-red">Site Map</a>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918049201200"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-green-400/40"
        style={{ background: 'linear-gradient(135deg, #25d366 0%, #128C7E 100%)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.655 4.615 1.792 6.528L4 29l7.688-1.775A11.946 11.946 0 0016 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10S21.523 27 16 27a9.946 9.946 0 01-4.99-1.34l-.36-.211-3.744.865.882-3.629-.233-.376A9.955 9.955 0 016 15c0-5.523 4.477-10 10-10zm-3.07 5.5c-.198 0-.52.074-.793.369-.272.295-1.04 1.016-1.04 2.477s1.065 2.873 1.213 3.072c.149.198 2.095 3.198 5.076 4.362.708.273 1.26.435 1.69.557.71.202 1.357.174 1.868.105.57-.076 1.754-.716 2.002-1.408.248-.692.248-1.285.174-1.408-.074-.124-.272-.198-.57-.347-.297-.149-1.754-.866-2.025-.965-.272-.099-.47-.149-.668.149-.198.297-.767.965-.94 1.163-.173.198-.347.223-.644.074-.297-.149-1.254-.462-2.388-1.474-.883-.787-1.479-1.76-1.652-2.057-.173-.297-.018-.457.13-.605.133-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.049-.372-.025-.52-.074-.149-.668-1.61-.915-2.203-.24-.578-.486-.5-.668-.509l-.568-.01z" />
        </svg>
      </a>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <QuoteProvider>
        <SmoothScroll>
          <ScrollToTop />
          <AppContent />
        </SmoothScroll>
      </QuoteProvider>
    </BrowserRouter>
  );
}
