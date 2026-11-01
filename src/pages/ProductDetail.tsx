import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { formatINR, getProduct, products } from '../data/products';
import { useCart } from '../store/cart';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { add, openCart } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/shop" replace />;

  const discount = Math.round((1 - product.price / product.mrp) * 100);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fill = products.filter((p) => p.id !== product.id && p.category !== product.category);
  const suggestions = [...related, ...fill].slice(0, 4);

  return (
    <div className="px-5 md:px-10">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-8 type-eyebrow flex gap-3 flex-wrap" style={{ color: 'hsl(var(--muted-foreground))' }}>
        <Link to="/" className="transition-colors hover:text-primary">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to={`/shop?cat=${product.category}`} className="transition-colors hover:text-primary">{product.category}</Link>
        <span aria-hidden="true">/</span>
        <span style={{ color: 'hsl(var(--foreground))' }}>{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 pt-8 md:pt-12">
        {/* Image */}
        <div className="relative overflow-hidden self-start" style={{ background: 'hsl(30 12% 10%)' }}>
          <img src={product.image} alt={product.name} className="w-full aspect-[4/5] object-cover" />
          {product.badge && (
            <span
              className="absolute top-4 left-4 type-eyebrow px-3 py-1.5"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="type-eyebrow" style={{ color: 'hsl(var(--primary))' }}>{product.tagline}</p>
          <h1 className="uppercase font-medium mt-4 leading-tight" style={{ fontSize: 'clamp(24px, 3vw, 38px)', letterSpacing: '0.1em' }}>
            {product.name}
          </h1>

          <p className="mt-5 flex items-baseline gap-3 flex-wrap">
            <span className="font-medium" style={{ fontSize: '26px', color: 'hsl(var(--primary))' }}>
              {formatINR(product.price)}
            </span>
            <span className="line-through text-base" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {formatINR(product.mrp)}
            </span>
            <span className="type-eyebrow" style={{ color: 'hsl(var(--muted-foreground))' }}>
              Save {discount}%
            </span>
          </p>
          <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Inclusive of all taxes
          </p>

          <p className="mt-7 text-base leading-relaxed" style={{ color: 'hsl(40 30% 93% / 0.85)', maxWidth: '56ch' }}>
            {product.description}
          </p>

          {/* Specs */}
          <dl className="mt-9 border-t border-white/10">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-6 py-3 border-b border-white/5 text-sm">
                <dt className="type-eyebrow shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }}>{s.label}</dt>
                <dd className="text-right">{s.value}</dd>
              </div>
            ))}
          </dl>

          {/* Qty + CTA */}
          <div className="mt-9 flex items-stretch gap-4">
            <div className="inline-flex items-center border border-white/20 shrink-0">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="w-12 h-full min-h-[52px] cursor-pointer text-xl transition-colors hover:text-primary"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-10 text-center" aria-live="polite">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="w-12 h-full min-h-[52px] cursor-pointer text-xl transition-colors hover:text-primary"
                onClick={() => setQty((q) => Math.min(9, q + 1))}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="btn-invert flex-1"
              onClick={() => {
                add(product.id, qty);
                openCart();
              }}
            >
              Add to cart · {formatINR(product.price * qty)}
            </button>
          </div>

          <ul className="mt-7 space-y-2 text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            <li>· Free shipping on orders above ₹999</li>
            <li>· COD available · 7-day easy returns</li>
            <li>· Ships in 24–48 hours from Jaipur</li>
          </ul>
        </div>
      </div>

      {/* You may also like */}
      <section className="pt-20 md:pt-28">
        <Reveal>
          <p className="type-eyebrow mb-3" style={{ color: 'hsl(var(--primary))' }}>Continue the story</p>
          <h2 className="uppercase font-medium mb-10 md:mb-14" style={{ fontSize: 'clamp(20px, 2.6vw, 30px)', letterSpacing: '0.14em' }}>
            You may also like
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-8">
          {suggestions.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
