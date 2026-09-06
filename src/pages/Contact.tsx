import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, MessageCircle, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    department: 'sales',
    name: '',
    email: '',
    company: '',
    country: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(formData.subject || `Inquiry from ${formData.name} - ${formData.company}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company}\n` +
      `Country: ${formData.country}\n` +
      `Department: ${formData.department}\n\n` +
      `Message:\n${formData.message}`
    );
    window.location.href = `mailto:promptservices.ups@gmail.com?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ department: 'sales', name: '', email: '', company: '', country: '', subject: '', message: '' });
    }, 5000);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl font-sans text-sm text-brand-charcoal bg-white focus:outline-none transition-all duration-200 placeholder-brand-graphite/40";

  return (
    <div className="min-h-screen bg-white select-text">

      {/* HERO SPLIT SECTION */}
      <div className="flex flex-col lg:flex-row min-h-[92vh] pt-20">

        {/* LEFT — Dark Info Panel */}
        <div
          className="lg:w-2/5 flex flex-col justify-between p-10 md:p-16 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #1D1D1D 0%, #2a1010 60%, #1D1D1D 100%)' }}
        >
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
          <div className="absolute bottom-10 left-0 w-60 h-60 rounded-full opacity-10 blur-2xl pointer-events-none" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />

          <div className="relative z-10 space-y-8 pt-8">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-brand-red">
                <span className="w-6 h-px bg-brand-red" />
                Get In Touch
              </span>
              <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Let's Talk<br />
                <span className="text-brand-red">Drilling.</span>
              </h1>
              <p className="font-sans text-base text-white/60 leading-relaxed max-w-sm">
                Whether you need a quote, technical specs, or want to become a distributor — our team is ready to help.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="tel:+919666316818"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-white/10 group"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(200,16,46,0.2)' }}>
                  <Phone size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-white/50 mb-0.5">Phone</p>
                  <p className="font-mono text-base font-bold text-white group-hover:text-brand-red transition-colors">+91 96663 16818</p>
                </div>
              </a>

              <a
                href="mailto:promptservices.ups@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:bg-white/10 group"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(200,16,46,0.2)' }}>
                  <Mail size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-white/50 mb-0.5">Email</p>
                  <p className="font-mono text-sm font-bold text-white group-hover:text-brand-red transition-colors">promptservices.ups@gmail.com</p>
                </div>
              </a>

              <div
                className="flex items-start gap-4 p-4 rounded-2xl"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(200,16,46,0.2)' }}>
                  <MapPin size={18} className="text-brand-red" />
                </div>
                <div>
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-white/50 mb-0.5">Factory & HQ</p>
                  <p className="font-sans text-sm text-white leading-relaxed">A-13, IDA, Balanagar,<br />Hyderabad, Telangana 500037</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919666316818"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-2xl font-heading text-sm font-bold text-white uppercase tracking-wider transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #25d366, #128C7E)', boxShadow: '0 6px 20px rgba(37,211,102,0.3)' }}
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="relative z-10 flex items-center gap-3 pt-8 border-t border-white/10 mt-8">
            <Clock size={16} className="text-brand-red shrink-0" />
            <span className="font-sans text-sm text-white/50">Mon – Sat: 9:00 AM – 6:30 PM IST &nbsp;|&nbsp; Sun: Closed</span>
          </div>
        </div>

        {/* RIGHT — Form Panel */}
        <div className="lg:w-3/5 flex items-center justify-center p-8 md:p-16 bg-white">
          <div className="w-full max-w-2xl">
            {formSubmitted ? (
              <div className="flex flex-col items-center text-center space-y-6 py-16">
                <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F9D58, #0d7a47)' }}>
                  <CheckCircle2 size={40} className="text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-3xl font-bold text-brand-charcoal">Message Sent!</h3>
                  <p className="font-sans text-base text-brand-graphite leading-relaxed max-w-sm">
                    Thank you for reaching out. Our sales team will get back to you within 24 business hours.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-10">
                  <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Send Us a Message</span>
                  <h2 className="font-display text-3xl md:text-4xl font-extrabold text-brand-charcoal tracking-tight">
                    Start a Conversation
                  </h2>
                  <p className="font-sans text-sm text-brand-graphite">
                    Fill out the form and our team will be in touch shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">
                      I'm inquiring about
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className={inputClass}
                      style={{ border: '1.5px solid #E5E5E5' }}
                    >
                      <option value="sales">Rig & Machinery Sales</option>
                      <option value="export">International / Export Orders</option>
                      <option value="dealer">Become a Dealer / Distributor</option>
                      <option value="support">Technical Support & Spares</option>
                      <option value="careers">Engineering Careers</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">Full Name *</label>
                      <input
                        type="text" name="name" value={formData.name} onChange={handleInputChange}
                        required placeholder="John Doe"
                        className={inputClass} style={{ border: '1.5px solid #E5E5E5' }}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#C8102E'}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">Business Email *</label>
                      <input
                        type="email" name="email" value={formData.email} onChange={handleInputChange}
                        required placeholder="name@company.com"
                        className={inputClass} style={{ border: '1.5px solid #E5E5E5' }}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#C8102E'}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#E5E5E5'}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">Company *</label>
                      <input
                        type="text" name="company" value={formData.company} onChange={handleInputChange}
                        required placeholder="Mining Corp Ltd"
                        className={inputClass} style={{ border: '1.5px solid #E5E5E5' }}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#C8102E'}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#E5E5E5'}
                      />
                    </div>
                    <div>
                      <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">Country *</label>
                      <input
                        type="text" name="country" value={formData.country} onChange={handleInputChange}
                        required placeholder="South Africa"
                        className={inputClass} style={{ border: '1.5px solid #E5E5E5' }}
                        onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#C8102E'}
                        onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#E5E5E5'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">Subject *</label>
                    <input
                      type="text" name="subject" value={formData.subject} onChange={handleInputChange}
                      required placeholder="e.g. Quote request for PSR-C300 Crawler Drill"
                      className={inputClass} style={{ border: '1.5px solid #E5E5E5' }}
                      onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#C8102E'}
                      onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#E5E5E5'}
                    />
                  </div>

                  <div>
                    <label className="block font-heading text-xs font-bold uppercase tracking-wider text-brand-graphite mb-2">Message *</label>
                    <textarea
                      name="message" value={formData.message} onChange={handleInputChange}
                      rows={5} required
                      placeholder="Tell us about your drilling project, required specifications, or any specific questions..."
                      className={`${inputClass} resize-none`} style={{ border: '1.5px solid #E5E5E5' }}
                      onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#C8102E'}
                      onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = '#E5E5E5'}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl text-white font-heading text-sm font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                    style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)', boxShadow: '0 8px 24px rgba(200,16,46,0.30)' }}
                  >
                    <Send size={16} />
                    Send Message
                  </button>

                  <p className="text-center font-sans text-xs text-brand-graphite/50">
                    We typically respond within 4–8 business hours.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* MAP SECTION */}
      <div className="h-[420px] w-full relative">
        <div className="absolute inset-x-0 top-0 h-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to bottom, white, transparent)' }} />
        <iframe
          title="PSR Hyderabad HQ Location"
          src="https://maps.google.com/maps?q=17.4748,78.4501&z=15&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        />
      </div>

    </div>
  );
}
