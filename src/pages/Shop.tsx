import { useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const cat = params.get('cat') ?? 'All';

  const filtered = useMemo(
    () => (cat === 'All' ? products : products.filter((p) => p.category === cat)),
    [cat]
  );

  return (
    <div className="px-5 md:px-10">
      {/* Page head */}
      <div className="pt-14 md:pt-20 pb-10 border-b border-white/10">
        <p className="type-eyebrow mb-4" style={{ color: 'hsl(var(--primary))' }}>The collection</p>
        <h1 className="uppercase font-medium" style={{ fontSize: 'clamp(26px, 4vw, 44px)', letterSpacing: '0.14em' }}>
          Shop {cat !== 'All' ? cat : 'all jewellery'}
        </h1>
        <p className="mt-4 text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
          {filtered.length} piece{filtered.length === 1 ? '' : 's'} · 18K gold plated · ships across India
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 py-6 border-b border-white/10" role="tablist" aria-label="Filter by category">
        {categories.map((c) => {
          const active = c === cat;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setParams(c === 'All' ? {} : { cat: c }, { preventScrollReset: true })}
              className="type-nav cursor-pointer pb-1 transition-colors duration-200"
              style={{
                color: active ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                borderBottom: active ? '1px solid hsl(var(--primary))' : '1px solid transparent',
              }}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="py-24 text-center type-nav" style={{ color: 'hsl(var(--muted-foreground))' }}>
          No pieces in this category yet
        </p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8 pt-10 md:pt-14">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 70} className={i % 2 === 1 ? 'lg:mt-14' : ''}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
