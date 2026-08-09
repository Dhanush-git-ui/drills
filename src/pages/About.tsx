import { Check, Award, Eye, Flame, ArrowRight, Globe, Factory, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const milestones = [
    { year: '1998', title: 'Company Founded', desc: 'PSR started with hand-held rock drills and spare parts in Hyderabad.' },
    { year: '2005', title: 'DTH Hammer Line', desc: 'Launched our first 4″ and 6″ DTH hammers serving local Indian mines.' },
    { year: '2012', title: 'Full Rig Manufacturing', desc: 'Built the PSR-W100 Pneumatic Wagon Drill — our first complete drilling rig.' },
    { year: '2018', title: 'Smart Factory Upgrade', desc: 'Moved to a modern 12,000 sqm plant equipped with advanced CNC machining centers.' },
    { year: '2022', title: 'Global Exports', desc: 'Exporting to 35+ countries across South Africa, Latin America, and Southeast Asia.' },
  ];

  const stats = [
    { value: '25+', label: 'Years of Experience', icon: Zap },
    { value: '35+', label: 'Countries Served', icon: Globe },
    { value: '12,000', label: 'sqm Factory', icon: Factory },
    { value: '500+', label: 'Products Delivered', icon: Users },
  ];

  return (
    <div className="select-text">

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] w-full overflow-hidden flex items-end pb-20">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1920')` }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(29,29,29,0.97) 0%, rgba(29,29,29,0.85) 50%, rgba(42,16,16,0.92) 100%)' }} />
        </div>

        {/* Glow accents */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />

        <div className="relative z-10 w-full px-8 md:px-16 pt-36">
          <div className="max-w-3xl space-y-6">
            <span className="inline-flex items-center gap-2 font-heading text-xs font-bold uppercase tracking-widest text-brand-red">
              <span className="w-6 h-px bg-brand-red" />
              About PSR'S Rock Drills
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Built for the<br />
              <span className="text-brand-red">Hardest Rock</span><br />
              on Earth.
            </h1>
            <p className="font-sans text-base text-white/60 max-w-xl leading-relaxed">
              Since 1998, we've been engineering precision drilling machines and tools from our Hyderabad factory — trusted by miners and drillers across 35+ countries.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-heading text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)', boxShadow: '0 8px 24px rgba(200,16,46,0.35)' }}
              >
                Our Products <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-heading text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:bg-white/10"
                style={{ border: '1.5px solid rgba(255,255,255,0.2)' }}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── METRICS STRIP ── */}
      <section className="bg-white border-b border-brand-bordergray">
        <div className="w-full px-8 md:px-16 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)' }}
              >
                <s.icon size={20} className="text-white" />
              </div>
              <div>
                <p className="font-display text-3xl font-extrabold text-brand-charcoal leading-none">{s.value}</p>
                <p className="font-sans text-sm text-brand-graphite mt-0.5">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY & VISION ── */}
      <section className="py-24 bg-white">
        <div className="w-full px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Our Story</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight">
              Drilling Tools Built for<br />Hard Rocks.
            </h2>
            <p className="font-sans text-base text-brand-graphite leading-relaxed">
              At PSR, we make sure your work does not stop due to tool failures. The high stress of drilling requires strong metal parts — that is why we design, forge, and test every product inside our own factory.
            </p>
            <p className="font-sans text-base text-brand-graphite leading-relaxed">
              Every cylinder sleeve, button bit, and thread connection is engineered in our Hyderabad headquarters. This keeps our quality high and delivery times short.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div
              className="p-7 rounded-2xl space-y-4 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1D1D1D 0%, #2a1010 100%)', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20 blur-xl" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />
              <div className="w-10 h-10 rounded-xl flex items-center justify-center relative z-10" style={{ background: 'rgba(200,16,46,0.2)' }}>
                <Eye size={20} className="text-brand-red" />
              </div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white relative z-10">Our Vision</h4>
              <p className="font-sans text-sm text-white/70 leading-relaxed relative z-10">
                To be the global leader in heavy drilling tools, offering long tool life and low fuel use.
              </p>
            </div>

            <div className="p-7 rounded-2xl space-y-4 bg-brand-softwhite" style={{ border: '1.5px solid #E5E5E5' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(200,16,46,0.1)' }}>
                <Flame size={20} className="text-brand-red" />
              </div>
              <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-charcoal">Our Mission</h4>
              <p className="font-sans text-sm text-brand-graphite leading-relaxed">
                Provide durable, simple-to-use, and powerful drilling solutions that keep workers safe and productive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FACTORY SECTION ── */}
      <section className="py-24" style={{ background: 'linear-gradient(180deg, #f8f8f8 0%, #f2f2f2 100%)' }}>
        <div className="w-full px-8 md:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="space-y-3 max-w-xl">
              <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Our Factory</span>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight leading-tight">
                A Modern Plant<br />Built for Scale.
              </h2>
            </div>
            <p className="font-sans text-base text-brand-graphite max-w-sm leading-relaxed">
              Our 12,000+ sqm Hyderabad facility handles everything from raw steel forging to full rig pressure-testing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                title: 'High-Precision CNC Bay',
                desc: 'Equipped with Japanese machining centers. Steel bars are turned and threads cut with high accuracy, ensuring parts fit perfectly and resist wear.',
                metric: 'Micron-Level Accuracy'
              },
              {
                num: '02',
                title: 'Heat Treatment Furnace',
                desc: 'We heat steel parts to create a hard outer surface while keeping the core flexible — essential for absorbing continuous hammer impact without cracking.',
                metric: 'Advanced Steel Hardening'
              },
              {
                num: '03',
                title: 'Live Air Test Bench',
                desc: 'Every wagon drill and hammer is tested on our pressure rig before shipping. Impact speeds, valve seals, and air flow are all verified on site.',
                metric: '100% Tested Before Shipping'
              }
            ].map((inf, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-2xl space-y-5 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300"
                style={{ border: '1.5px solid #E5E5E5', boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(200,16,46,0.10)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(0,0,0,0.04)'}
              >
                <div className="space-y-4">
                  <span className="font-mono text-4xl font-extrabold text-brand-bordergray">{inf.num}</span>
                  <h4 className="font-heading text-base font-bold text-brand-charcoal uppercase tracking-wider">
                    {inf.title}
                  </h4>
                  <p className="font-sans text-sm text-brand-graphite leading-relaxed">
                    {inf.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-brand-lightgray flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-red" />
                  <span className="font-mono text-sm font-bold text-brand-red">{inf.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="py-24 bg-white">
        <div className="w-full px-8 md:px-16">
          <div className="space-y-3 mb-16">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Our Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-brand-charcoal tracking-tight">
              25 Years of Growth.
            </h2>
          </div>

          {/* Horizontal timeline on large screens, vertical on mobile */}
          <div className="hidden lg:flex items-start gap-0 relative">
            {/* connecting line */}
            <div className="absolute top-5 left-0 right-0 h-px bg-brand-bordergray" />
            {milestones.map((mil, i) => (
              <div key={i} className="flex-1 relative group">
                {/* Dot */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold text-white relative z-10 mx-auto transition-all duration-200 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)', boxShadow: '0 4px 12px rgba(200,16,46,0.35)' }}
                >
                  {i + 1}
                </div>
                <div className="pt-6 px-4 space-y-2">
                  <span className="font-mono text-sm font-bold text-brand-red block">{mil.year}</span>
                  <h4 className="font-heading text-sm font-bold text-brand-charcoal uppercase tracking-wider">{mil.title}</h4>
                  <p className="font-sans text-sm text-brand-graphite leading-relaxed">{mil.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile vertical timeline */}
          <div className="lg:hidden relative border-l-2 border-brand-bordergray ml-4 space-y-10">
            {milestones.map((mil, i) => (
              <div key={i} className="relative pl-8">
                <div className="absolute -left-3 top-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)' }}>
                  <span className="font-mono text-[10px] font-bold text-white">{i + 1}</span>
                </div>
                <span className="font-mono text-sm font-bold text-brand-red block mb-1">{mil.year}</span>
                <h4 className="font-heading text-sm font-bold text-brand-charcoal uppercase tracking-wider">{mil.title}</h4>
                <p className="font-sans text-sm text-brand-graphite leading-relaxed mt-1">{mil.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY STANDARDS ── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1D1D1D 0%, #2a1010 60%, #1D1D1D 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />

        <div className="w-full px-8 md:px-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-brand-red">Quality Standards</span>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Certified to the<br />Highest Standards.
                </h2>
                <p className="font-sans text-base text-white/60 leading-relaxed">
                  We check quality at every step of our process. Our factory follows global industrial safety and performance rules — ensuring every product that leaves our plant is reliable.
                </p>
              </div>
              <div className="space-y-4">
                {[
                  'ISO 9001:2015 Certified Manufacturing Plant',
                  'API Thread Profile Compliant Components',
                  'Mine Safety Standards — Fully Compliant',
                  'In-House Pressure & Impact Testing Lab'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(200,16,46,0.2)' }}>
                      <Check size={13} className="text-brand-red" />
                    </div>
                    <span className="font-heading text-sm font-semibold tracking-wide text-white/80">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-heading text-sm font-bold uppercase tracking-widest text-white transition-all duration-200 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #C8102E 0%, #A0001C 100%)', boxShadow: '0 8px 24px rgba(200,16,46,0.35)' }}
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                {
                  title: 'ISO 9001 Certification',
                  subtitle: 'Quality Management System',
                  desc: 'We trace steel quality, heat treatments, and dimensional tolerances step-by-step across our entire production line.'
                },
                {
                  title: 'API Standards',
                  subtitle: 'Thread Profile Alignment',
                  desc: 'Drill rod threads match standard international systems to prevent bind-ups and extend rod life.'
                },
                {
                  title: 'Impact Tested',
                  subtitle: 'Live Pressure Bench',
                  desc: 'Every hammer and drill is tested at rated air pressure before it leaves our factory doors.'
                },
                {
                  title: 'Global Compliance',
                  subtitle: 'Export Ready',
                  desc: 'Our products meet import requirements for 35+ countries including all major mining markets.'
                }
              ].map((cert, i) => (
                <div
                  key={i}
                  className="p-6 rounded-2xl space-y-3 transition-all duration-200 hover:bg-white/10"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Award className="text-brand-red" size={24} />
                  <div>
                    <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white">{cert.title}</h4>
                    <span className="font-sans text-xs text-white/40">{cert.subtitle}</span>
                  </div>
                  <p className="font-sans text-sm text-white/60 leading-relaxed">{cert.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
