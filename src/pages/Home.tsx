import { useState } from 'react';
import { Link } from 'react-router';
import Spine from '../components/Spine';
import Reveal from '../components/Reveal';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Home() {
  const featured = products.slice(0, 4);
  const bestsellers = products.filter((p) => ['mens-chain', 'gold-ring', 'layered-necklace'].includes(p.id));
  const [email, setEmail] = useState('');
  const [newsletterMsg, setNewsletterMsg] = useState<string | null>(null);

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setNewsletterMsg('Please enter a valid email address.');
      return;
    }
    setNewsletterMsg('Welcome to the house of Vook — your 10% code is VOOK10.');
    setEmail('');
  };

  return (
    <div>
      {/* Split-screen hero with numbered spine */}
      <section className="relative border-b border-white/10">
        <div className="grid md:grid-cols-2 min-h-[82vh]">
          <div className="relative overflow-hidden min-h-[50vh] md:min-h-0">
            <img
              src="/images/hero-left.jpg"
              alt="Model wearing Vook gold plated pearl earring"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(30 16% 5% / 0.75), transparent 55%)' }} />
            <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-md">
              <p className="type-eyebrow mb-4" style={{ color: 'hsl(var(--primary))' }}>New collection · 2026</p>
              <h1 className="uppercase font-medium leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 46px)', letterSpacing: '0.14em' }}>
                Gold that lives on skin
              </h1>
            </div>
          </div>
          <div className="relative overflow-hidden min-h-[50vh] md:min-h-0 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-between">
            <p className="type-eyebrow p-6 md:p-10" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Earrings · Cuffs · Chains · Rings
            </p>
            <div className="p-6 md:p-10 flex flex-col items-start gap-6">
              <p className="text-base md:text-lg" style={{ color: 'hsl(40 30% 93% / 0.85)', maxWidth: '38ch' }}>
                18K gold plated jewellery — sculpted cuffs, pearl drops and chains made for every day.
              </p>
              <p className="uppercase font-medium leading-tight" style={{ fontSize: 'clamp(24px, 3vw, 40px)', letterSpacing: '0.14em', maxWidth: '16ch' }}>
                Worn close, kept long
              </p>
              <Link to="/shop" className="btn-invert w-auto">
                Shop the collection
              </Link>
            </div>
            <div
              aria-hidden="true"
              className="h-px mx-6 md:mx-10 mb-10"
              style={{ background: 'linear-gradient(to right, hsl(var(--primary)), transparent)' }}
            />
          </div>
        </div>
        <Spine className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 py-6" />
      </section>

      {/* Featured collection — asymmetric editorial grid */}
      <section className="px-5 md:px-10 pt-20 md:pt-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="type-eyebrow mb-3" style={{ color: 'hsl(var(--primary))' }}>01 — Featured</p>
              <h2 className="uppercase font-medium" style={{ fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '0.14em' }}>
                The collection
              </h2>
            </div>
            <Link to="/shop" className="type-nav shrink-0 underline underline-offset-8 transition-colors hover:text-primary">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} className={i % 2 === 1 ? 'lg:mt-14' : ''}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Editorial story — inverted cream scheme */}
      <section className="mt-24 md:mt-32" style={{ background: 'hsl(40 30% 93%)', color: 'hsl(30 20% 10%)' }}>
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-16 flex flex-col justify-center">
            <Reveal>
              <p className="type-eyebrow mb-5" style={{ color: 'hsl(38 45% 38%)' }}>02 — The craft</p>
              <h2 className="uppercase font-medium leading-tight" style={{ fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '0.14em' }}>
                Plated in 18K gold, priced for real life
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ maxWidth: '52ch', color: 'hsl(30 12% 28%)' }}>
                Every Vook piece begins as a brass or steel form, polished by hand, then bathed in 18K gold.
                The result is jewellery with the weight, warmth and glow of gold — without the gold price.
                Each piece carries a plating warranty, because everyday luxury should last.
              </p>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  ['18K', 'gold plating'],
                  ['6 mo', 'warranty'],
                  ['7 day', 'returns'],
                ].map(([big, small]) => (
                  <div key={small} className="border-t pt-4" style={{ borderColor: 'hsl(30 20% 10% / 0.25)' }}>
                    <p className="font-medium" style={{ fontSize: '22px', letterSpacing: '0.06em' }}>{big}</p>
                    <p className="type-eyebrow mt-1" style={{ color: 'hsl(30 12% 40%)' }}>{small}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="relative min-h-[40vh] md:min-h-0">
            <img
              src="/images/wings-cuff.jpg"
              alt="Vook gold plated wings cuff bracelet close-up"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="px-5 md:px-10 pt-20 md:pt-28">
        <Reveal>
          <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
            <div>
              <p className="type-eyebrow mb-3" style={{ color: 'hsl(var(--primary))' }}>03 — Most loved</p>
              <h2 className="uppercase font-medium" style={{ fontSize: 'clamp(22px, 3vw, 34px)', letterSpacing: '0.14em' }}>
                Bestsellers
              </h2>
            </div>
            <Link to="/shop" className="type-nav shrink-0 underline underline-offset-8 transition-colors hover:text-primary">
              View all
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {bestsellers.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
          <Reveal delay={bestsellers.length * 80}>
            <Link
              to="/shop"
              className="flex flex-col items-center justify-center gap-5 border border-white/15 aspect-[4/5] transition-colors duration-200 hover:border-primary group"
            >
              <span className="type-nav transition-colors group-hover:text-primary">Shop all {products.length} pieces</span>
              <span aria-hidden="true" className="inline-block w-2 h-2 rotate-45" style={{ background: 'hsl(var(--primary))' }} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Newsletter */}
      <section className="px-5 md:px-10 mt-24 md:mt-32">
        <div className="border border-white/10 px-6 md:px-16 py-14 md:py-20 text-center max-w-4xl mx-auto">
          <Reveal>
            <p className="type-eyebrow mb-4" style={{ color: 'hsl(var(--primary))' }}>04 — Stay close</p>
            <h2 className="uppercase font-medium" style={{ fontSize: 'clamp(20px, 2.6vw, 30px)', letterSpacing: '0.14em' }}>
              10% off your first order
            </h2>
            <p className="mt-4 text-base" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '44ch', marginInline: 'auto' }}>
              New drops, styling notes and early access — straight to your inbox.
            </p>
            <form onSubmit={subscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent border border-white/20 px-5 py-4 text-base placeholder:text-white/30 focus:border-primary outline-none transition-colors"
              />
              <button type="submit" className="btn-gold w-auto">
                Subscribe
              </button>
            </form>
            {newsletterMsg && (
              <p role="status" className="mt-4 text-sm" style={{ color: 'hsl(var(--primary))' }}>
                {newsletterMsg}
              </p>
            )}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
