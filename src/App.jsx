import React, { useEffect, useMemo, useState } from 'react';

/*
  Lawyer Visit-Card Website — Andersen/LegalLab-like styling with Dark Blue + Red accents
  ---------------------------------------------------------------------------------------
  • Palette:
    - Primary Dark Blue: #0B1B3D
    - Accent Red:       #C62828
    - Dark BG:          #0B1220
  • Sections: Hero, About, Expertise, Services, Credentials, Results, Testimonials, FAQ, Contact, Footer
  • Clean lines, uppercase nav, serif headlines, more dark blue blocks + red highlights
*/

// -----------------------------
// Small UI primitives
// -----------------------------
const Container = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 md:px-6 lg:px-8 ${className}`}>{children}</div>
);

const Eyebrow = ({ children }) => (
  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C62828]" />
    {children}
  </div>
);

const SectionTitle = ({ eyebrow, title, subtitle, align = 'left' }) => (
  <div className={`${align === 'center' ? 'text-center' : 'text-left'}`}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100 md:text-4xl">{title}</h2>
    {subtitle && <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300 md:text-lg">{subtitle}</p>}
    <div className="mt-6 h-[2px] w-28 bg-gradient-to-r from-[#C62828] to-[#0B1B3D]" />
  </div>
);

const Button = ({ children, href, onClick, variant = 'primary', className = '', ...props }) => {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  const styles = {
    primary: 'bg-[#0B1B3D] text-white hover:bg-[#0A1631] focus:ring-[#0B1B3D]',
    accent: 'bg-[#C62828] text-white hover:bg-[#A71F20] focus:ring-[#C62828]',
    outline:
      'border border-[#0B1B3D] text-[#0B1B3D] hover:bg-[#0B1B3D] hover:text-white focus:ring-[#0B1B3D] dark:border-slate-100 dark:text-slate-100',
    subtle: 'bg-[#E7ECF5] text-[#0B1B3D] hover:bg-[#D9E2F0] focus:ring-[#0B1B3D]/30',
    ghost: 'text-[#0B1B3D] hover:bg-[#0B1B3D]/5 dark:text-slate-100 dark:hover:bg-white/5',
  };
  const Comp = href ? 'a' : 'button';
  return (
    <Comp href={href} onClick={onClick} className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </Comp>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] dark:border-slate-800 dark:bg-slate-900 ${className}`}>{children}</div>
);

// -----------------------------
// Icons (inline SVG)
// -----------------------------
const Icon = {
  scales: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3v18M4 21h16M7 9l-4 7h8l-4-7zm10 0l-4 7h8l-4-7z" />
    </svg>
  ),
  document: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
      <path d="M14 3v6h6" />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 3l7 3v6c0 4.97-3.582 8.774-7 9-3.418-.226-7-4.03-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  briefcase: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2m-5 5h18" />
    </svg>
  ),
  phone: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M22 16.92v2a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 1h2a2 2 0 0 1 2 1.72c.12.9.31 1.78.57 2.63a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.45-1.14a2 2 0 0 1 2.11-.45c.85.26 1.73.45 2.63.57A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  mail: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      <path d="M22 6l-10 7L2 6" />
    </svg>
  ),
  location: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  quote: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M7 7h4v4H8a3 3 0 0 0-3 3v3H2v-3a7 7 0 0 1 7-7zM17 7h4v4h-3a3 3 0 0 0-3 3v3h-3v-3a7 7 0 0 1 7-7z"/>
    </svg>
  ),
  arrowRight: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
};

// Dark mode icons
const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5.64 5.64l-1.41-1.41M19.78 19.78l-1.41-1.41M5.64 18.36l-1.41 1.41M19.78 4.22l-1.41 1.41" />
  </svg>
);
const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

// -----------------------------
// Content data (replace with real)
// -----------------------------
const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Services', href: '#services' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Results', href: '#results' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const EXPERTISE = [
  { title: 'Corporate & Commercial', desc: 'Incorporation, M&A, governance, shareholder relations.', icon: Icon.briefcase },
  { title: 'Contracts', desc: 'Drafting, review, and negotiation across B2B/B2C.', icon: Icon.document },
  { title: 'IP & Tech', desc: 'Trademarks, licensing, privacy & data protection.', icon: Icon.shield },
  { title: 'Disputes', desc: 'Negotiation, pre‑trial strategy, settlements.', icon: Icon.scales },
];

const SERVICES = [
  { title: 'General Counsel', points: ['On‑demand advisory', 'Compliance playbooks', 'Board communications'] },
  { title: 'Contract Suite', points: ['MSA/SOW/NDA', 'Vendor & partner', 'Lifecycle guidance'] },
  { title: 'Startup Launch', points: ['Entity & founders', 'Cap table & ESOP', 'Hiring docs'] },
  { title: 'Regulatory Readiness', points: ['GDPR baseline', 'Policies & terms', 'Risk roadmap'] },
];

const CREDENTIALS = [
  'Armenian Bar Association',
  'LL.M. — Business Law',
  'WIPO IP Summer School',
  'IFRS for Lawyers (Certificate)',
];

const RESULTS = [
  { kpi: '95%', label: 'Matters closed on time' },
  { kpi: '$12M+', label: 'Deals supported' },
  { kpi: '120+', label: 'Clients served' },
  { kpi: '9/10', label: 'Satisfaction' },
];

const TESTIMONIALS = [
  { quote: 'Clear, pragmatic advice delivered quickly.', author: 'CEO, SaaS' },
  { quote: 'Investor‑ready documents and calm execution.', author: 'Founder, Fintech' },
  { quote: 'Professional, empathetic, and effective.', author: 'HR Lead' },
];

const FAQ = [
  { q: 'Do you offer fixed‑fee packages?', a: 'Yes — formation, contract bundles, and policies can be fixed‑fee.' },
  { q: 'Can you work alongside our team?', a: 'Absolutely. I integrate with founders and in‑house stakeholders.' },
  { q: 'Response times?', a: 'Within one business day; faster for active matters.' },
];

// -----------------------------
// Utility hooks
// -----------------------------
function useScrollActive(ids) {
  const [active, setActive] = useState(ids?.[0] || null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { threshold: 0.5 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// -----------------------------
// Main component
// -----------------------------
export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState('');
  const [dark, setDark] = useState(false);

  const sectionIds = useMemo(() => NAV.map((n) => n.href.replace('#', '')), []);
  const active = useScrollActive(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Initialize dark mode based on preference/localStorage
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefers = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    const enable = stored ? stored === 'dark' : !!prefers;
    setDark(enable);
    document.documentElement.classList.toggle('dark', enable);
  }, []);

  const toggleDark = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle('dark', next);
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  return (
    <div className={`${dark ? 'dark ' : ''}min-h-screen bg-white text-slate-900 dark:bg-[#0B1220] dark:text-slate-100`}>
      {/* Top bar */}
      <header className={`sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition dark:border-slate-800 dark:bg-[#0B1220]/85 ${scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.04)]' : ''}`}>
        <Container className="flex items-center justify-between py-3">
          <a href="#top" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1B3D] font-serif text-sm font-semibold tracking-wider text-white">LC</span>
            <span className="font-serif text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">Lawyer Counsel</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] transition hover:bg-[#0B1B3D]/5 dark:hover:bg-white/5 ${active === item.href ? 'text-[#0B1B3D] dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#0B1B3D]/5 dark:hover:bg-white/5"
              onClick={toggleDark}
              aria-label="Toggle dark mode"
              title={dark ? 'Switch to light' : 'Switch to dark'}
            >
              {dark ? <SunIcon className="h-5 w-5"/> : <MoonIcon className="h-5 w-5"/>}
            </button>
            <Button href="#contact" variant="outline" className="hidden md:inline-flex">Book Consultation</Button>
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-[#0B1B3D]/5 dark:hover:bg-white/5 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className="block h-0.5 w-6 bg-slate-800 dark:bg-slate-200" />
                <span className="block h-0.5 w-6 bg-slate-800 dark:bg-slate-200" />
                <span className="block h-0.5 w-6 bg-slate-800 dark:bg-slate-200" />
              </div>
            </button>
          </div>
        </Container>
        {mobileOpen && (
          <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-[#0B1220] md:hidden">
            <Container className="flex flex-col gap-1 py-3">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-3 py-2 text-sm transition hover:bg-[#0B1B3D]/5 dark:hover:bg-white/5 ${active === item.href ? 'text-[#0B1B3D] dark:text-slate-100' : 'text-slate-700 dark:text-slate-300'}`}
                >
                  {item.label}
                </a>
              ))}
              <Button href="#contact" className="mt-1" variant="outline">Book Consultation</Button>
            </Container>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <Container className="grid items-center gap-14 py-16 md:grid-cols-12 md:py-24">
          <div className="md:col-span-7 lg:col-span-6">
            <Eyebrow>Business Law • Yerevan</Eyebrow>
            <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Clear, business‑first legal counsel
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-300">
              I help founders and operators make confident decisions — with precise documents, practical advice, and responsive support.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button href="#contact" variant="accent">Request Consultation</Button>
              <Button href="#services" variant="outline">View Services</Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 text-[12px] text-slate-600 dark:text-slate-300">
              <div className="border-l border-[#0B1B3D]/25 pl-4"><div className="font-semibold text-slate-900 dark:text-slate-100">10+ yrs</div>experience</div>
              <div className="border-l border-[#0B1B3D]/25 pl-4"><div className="font-semibold text-slate-900 dark:text-slate-100">120+</div>clients</div>
              <div className="border-l border-[#0B1B3D]/25 pl-4"><div className="font-semibold text-slate-900 dark:text-slate-100">Fast</div>response</div>
            </div>
          </div>
          <div className="md:col-span-5 lg:col-span-6">
            <div className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:max-w-none">
              <img
                alt="Lawyer portrait"
                src="https://images.unsplash.com/photo-1549921296-3b4a6b1d1f55?q=80&w=1200&auto=format&fit=crop"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        </Container>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionTitle
            eyebrow="About"
            title="From complexity to clarity"
            subtitle="I translate legal risk into straightforward options aligned with your commercial goals."
          />
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {['Business‑minded', 'Responsive', 'Transparent'].map((t) => (
              <div key={t} className="rounded-xl border border-slate-200 p-6">
                <div className="font-serif text-xl">{t}</div>
                <p className="mt-3 text-slate-600 dark:text-slate-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at tellus in ipsum finibus.</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Expertise */}
      <section id="expertise" className="scroll-mt-24 bg-[#F6F8FC] dark:bg-slate-950 py-16 md:py-24">
        <Container>
          <SectionTitle eyebrow="Expertise" title="Focused capabilities" subtitle="Targeted support across core business law domains." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {EXPERTISE.map((p, i) => (
              <div key={p.title} className="group rounded-2xl border border-slate-200 p-6 transition hover:bg-white dark:hover:bg-slate-900">
                <div className="flex items-start gap-3">
                  <p.icon className="mt-1 h-6 w-6 text-[#0B1B3D] dark:text-slate-100" />
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{p.desc}</p>
                  </div>
                </div>
                <div className="mt-6 h-px w-full bg-slate-200" />
                <div className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[#C62828]">0{i + 1}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionTitle eyebrow="Services" title="Ways to engage" subtitle="Clear scopes and structured delivery." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {SERVICES.map((s) => (
              <Card key={s.title}>
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-xl">{s.title}</h3>
                  <Button href="#contact" variant="ghost" className="rounded-full px-3 py-1 text-xs">Inquire</Button>
                </div>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {s.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="mt-2 inline-block h-1 w-1 rounded-full bg-[#C62828]"/> {pt}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Credentials */}
      <section id="credentials" className="scroll-mt-24 bg-[#F6F8FC] dark:bg-slate-950 py-16 md:py-24">
        <Container>
          <SectionTitle eyebrow="Credentials" title="Education & memberships" subtitle="A foundation of quality and ethics." />
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CREDENTIALS.map((c) => (
              <div key={c} className="flex items-center justify-between rounded-xl border border-slate-200 p-6">
                <div className="font-medium">{c}</div>
                <span className="text-xs text-slate-500 dark:text-slate-400">Verified</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Results */}
      <section id="results" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionTitle eyebrow="Results" title="Outcomes that matter" subtitle="Measuring the impact of our work." />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESULTS.map((r) => (
              <div key={r.label} className="rounded-2xl border border-slate-200 p-6 text-center">
                <div className="font-serif text-3xl text-[#0B1B3D] dark:text-slate-100">{r.kpi}</div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">{r.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-24 bg-[#F6F8FC] dark:bg-slate-950 py-16 md:py-24">
        <Container>
          <SectionTitle eyebrow="Testimonials" title="What clients say" subtitle="Trusted by leaders across industries." />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Card key={i}>
                <Icon.quote className="h-6 w-6 text-[#C62828]" />
                <p className="mt-3 text-slate-700 dark:text-slate-200">“{t.quote}”</p>
                <div className="mt-4 text-sm font-medium">{t.author}</div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 py-16 md:py-24">
        <Container>
          <SectionTitle eyebrow="FAQ" title="Common questions" subtitle="If you don’t see yours, just ask." />
          <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {FAQ.map((item, idx) => (
              <details key={idx} className="group p-6" open={idx === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between">
                  <span className="font-medium">{item.q}</span>
                  <span className="ml-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EDE7E9] text-[#C62828] transition group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-24 bg-[#0B1B3D] py-16 text-white md:py-24">
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <Eyebrow>Contact</Eyebrow>
              <h3 className="mt-3 font-serif text-3xl">Let’s talk</h3>
              <p className="mt-3 max-w-md text-white/80">Tell me about your matter and timeline. I’ll reply within one business day.</p>
              <div className="mt-6 grid gap-3 text-white/90">
                <a className="inline-flex items-center gap-2 hover:underline" href="tel:+374000000"><Icon.phone className="h-5 w-5"/> +374 00 00 00</a>
                <a className="inline-flex items-center gap-2 hover:underline" href="mailto:hello@lawyercounsel.am"><Icon.mail className="h-5 w-5"/> hello@lawyercounsel.am</a>
                <div className="inline-flex items-start gap-2"><Icon.location className="mt-0.5 h-5 w-5"/> 10 Northern Ave, Yerevan, Armenia</div>
              </div>
            </div>
            <div>
              <Card className="bg-white/95">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setToast("Thanks! I'll get back to you shortly.");
                    const form = e.currentTarget;
                    form.reset();
                  }}
                  className="grid gap-4"
                >
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                    <input required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0B1B3D] focus:ring" placeholder="Jane Doe" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Email</label>
                      <input type="email" required className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0B1B3D] focus:ring" placeholder="jane@company.com" />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-medium text-slate-700">Phone (optional)</label>
                      <input className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0B1B3D] focus:ring" placeholder="+374 …" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Service</label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 outline-none ring-[#0B1B3D] focus:ring">
                      {SERVICES.map((s) => (
                        <option key={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">Message</label>
                    <textarea rows={4} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none ring-[#0B1B3D] focus:ring" placeholder="Briefly describe your matter…" />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <label className="inline-flex items-center gap-2 text-sm">
                      <input type="checkbox" className="rounded border-slate-300 text-[#0B1B3D] focus:ring-[#0B1B3D]" defaultChecked />
                      I agree to the <a href="#" className="underline">privacy policy</a>.
                    </label>
                    <Button type="submit" variant="accent">Send</Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-[#C62828] bg-white py-10 dark:bg-[#0B1220]">
        <Container className="grid items-center justify-between gap-6 md:grid-cols-3">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#0B1B3D] font-serif text-sm font-semibold text-white">LC</span>
            <div>
              <div className="font-serif text-sm font-semibold">Lawyer Counsel</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} All rights reserved.</div>
            </div>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] uppercase tracking-[0.18em]">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-slate-600 hover:text-[#0B1B3D] dark:text-slate-300 dark:hover:text-white">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="text-center text-[12px] md:text-right">
            <a href="#" className="text-slate-600 hover:text-[#0B1B3D] dark:text-slate-300 dark:hover:text-white">Privacy</a>
            <span className="mx-2 text-slate-300">•</span>
            <a href="#" className="text-slate-600 hover:text-[#0B1B3D] dark:text-slate-300 dark:hover:text-white">Terms</a>
          </div>
        </Container>
      </footer>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-3 z-50 mx-auto w-full max-w-md rounded-full border border-slate-200 bg-white/90 p-2 shadow backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 md:hidden">
        <div className="flex items-center gap-2">
          <Button href="tel:+374000000" className="flex-1" variant="primary"><Icon.phone className="h-4 w-4"/> Call</Button>
          <Button href="mailto:hello@lawyercounsel.am" variant="subtle" className="flex-1"><Icon.mail className="h-4 w-4"/> Email</Button>
          <Button href="#contact" variant="accent" className="flex-1"><Icon.arrowRight className="h-4 w-4"/> Consult</Button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed inset-x-0 top-4 z-50 mx-auto w-fit rounded-full bg-[#0B1B3D] px-4 py-2 text-sm text-white shadow dark:bg-white dark:text-[#0B1B3D]">{toast}</div>
      )}
    </div>
  );
}

