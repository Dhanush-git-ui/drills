import { useState } from 'react';
import { useQuote } from '@/context/QuoteContext';
import { Link } from 'react-router-dom';
import { Trash2, Send, Drill, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Quote() {
  const { quoteItems, removeFromQuote, updateQuantity, clearQuote } = useQuote();
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    country: '',
    port: '',
    urgency: 'routine',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const items = quoteItems.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      category: item.product.category,
      quantity: item.quantity,
      specs: item.product.specs || {}
    }));

    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      country: formData.country,
      port: formData.port,
      urgency: formData.urgency,
      message: formData.message || null,
      items,
    };

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isLocal 
      ? 'http://localhost:3000/api/quotations' 
      : 'https://psrs-admin.vercel.app/api/quotations';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to submit quotation request');
      }

      setFormSubmitted(true);
      setTimeout(() => {
        clearQuote();
      }, 100);
    } catch (err) {
      console.error(err);
      alert('Failed to submit quotation. Please try again.');
    }
  };

  if (formSubmitted) {
    return (
      <div className="pt-32 pb-24 bg-white animate-fade-in select-text">
        <div className="max-w-xl mx-auto px-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-success/15 text-success flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} />
          </div>
          <span className="font-heading text-xs font-bold text-success uppercase tracking-widest">
            Request Logged
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-brand-charcoal tracking-tight">
            Quotation Inquiry Received
          </h1>
          <p className="font-sans text-sm text-brand-graphite leading-relaxed">
            Thank you for contacting PSR'S Rock Drills. Your custom quotation list has been compiled and dispatched to our heavy operations sales desk. An export officer will contact you within 24 business hours.
          </p>
          <div className="pt-6 border-t border-brand-bordergray flex justify-center gap-4">
            <Link
              to="/products"
              className="px-6 py-3 bg-brand-red hover:bg-brand-crimson text-white font-heading text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              Continue Browsing
            </Link>
            <Link
              to="/"
              className="px-6 py-3 border border-brand-bordergray hover:border-brand-charcoal text-brand-charcoal font-heading text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-white select-text">
      <div className="w-full px-8 md:px-16">
        {/* Header Block */}
        <div className="max-w-2xl space-y-4 mb-16">
          <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">
            Commercial Desk
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight">
            B2B Quotation Builder
          </h1>
          <p className="font-sans text-sm text-brand-graphite leading-relaxed">
            Assemble a custom request for items. Adjust quantities, review technical scopes, and submit the compiled file for a detailed price listing including custom configuration alternatives.
          </p>
        </div>

        {quoteItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Selected Items List */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between border-b border-brand-bordergray pb-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-brand-charcoal">
                  Selected Equipment List
                </h3>
                <button
                  onClick={clearQuote}
                  className="font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite/60 hover:text-brand-red transition-colors"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-4">
                {quoteItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-5 border border-brand-bordergray rounded-2xl bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-brand-red transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-lightgray flex items-center justify-center text-brand-charcoal shrink-0">
                        <Drill size={22} className="rotate-45 text-brand-red" />
                      </div>
                      <div className="space-y-1">
                        <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-graphite/50">
                          {item.product.category}
                        </span>
                        <h4 className="font-heading text-sm font-bold text-brand-charcoal">
                          {item.product.name}
                        </h4>
                        <p className="font-sans text-sm text-brand-graphite font-medium">
                          {item.product.specs.holeDiameter || 'Standard fittings'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-brand-bordergray rounded-lg bg-brand-softwhite px-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 font-mono text-sm font-bold text-brand-graphite hover:text-brand-red"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-mono text-xs font-bold text-brand-charcoal">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 font-mono text-sm font-bold text-brand-graphite hover:text-brand-red"
                        >
                          +
                        </button>
                      </div>

                      {/* Trash */}
                      <button
                        onClick={() => removeFromQuote(item.product.id)}
                        className="p-2 text-brand-graphite/40 hover:text-brand-red transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Inquiry Form */}
            <div className="lg:col-span-5 p-6 md:p-8 border border-brand-bordergray rounded-2xl bg-brand-softwhite">
              <h3 className="font-heading text-base font-bold uppercase tracking-widest text-brand-charcoal border-b border-brand-bordergray pb-3 mb-6">
                Request Summary Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div>
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                    Business Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="name@company.com"
                    className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      placeholder="Mining Corp"
                      className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+1 555-0199"
                      className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      placeholder="Chile"
                      className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                      Port of Delivery
                    </label>
                    <input
                      type="text"
                      name="port"
                      value={formData.port}
                      onChange={handleInputChange}
                      required
                      placeholder="Port of Valparaiso"
                      className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                    Shipping Urgency
                  </label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-heading text-xs font-bold uppercase tracking-widest text-brand-charcoal focus:outline-none"
                  >
                    <option value="routine">Routine (Next 3-6 months)</option>
                    <option value="urgent">Urgent (Deployment within 30 days)</option>
                    <option value="budgetary">Budgetary Inquiry only</option>
                  </select>
                </div>

                <div>
                  <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-1.5">
                    Custom Requirements / Technical Notes
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Specify target drill shanks, local PTO variations, altitude adjustments..."
                    className="w-full p-3 bg-white border border-brand-bordergray rounded-xl font-sans text-sm text-brand-charcoal placeholder-brand-graphite/40 focus:outline-none focus:border-brand-red resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-red hover:bg-brand-crimson text-white font-heading text-sm font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-brand-red/10"
                >
                  <Send size={14} /> Submit Quotation Request
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="text-center py-24 border border-dashed border-brand-bordergray rounded-3xl bg-brand-softwhite/40 max-w-lg mx-auto space-y-6">
            <Drill size={40} className="mx-auto text-brand-graphite/40 rotate-45" />
            <div className="space-y-1">
              <h3 className="font-heading text-base font-bold text-brand-charcoal">Your Quote List is Empty</h3>
              <p className="font-sans text-sm text-brand-graphite/60">
                Explore our wagon drills, crawler units, and DTH shanks to add them to your request.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-red hover:bg-brand-crimson text-white font-heading text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-md shadow-brand-red/10"
            >
              Browse Products
              <ChevronRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
