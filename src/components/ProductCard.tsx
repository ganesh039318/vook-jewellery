import { Link } from 'react-router';
import { formatINR, type Product } from '../data/products';
import { useCart } from '../store/cart';

export default function ProductCard({ product, index }: { product: Product; index?: number }) {
  const { add, openCart } = useCart();
  const discount = Math.round((1 - product.price / product.mrp) * 100);

  return (
    <article className="group relative">
      <Link to={`/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
        <div className="relative overflow-hidden" style={{ background: 'hsl(30 12% 10%)' }}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            style={{ transitionTimingFunction: 'cubic-bezier(0.33,0,0,1)' }}
          />
          {product.badge && (
            <span
              className="absolute top-3 left-3 type-eyebrow px-3 py-1.5"
              style={{ background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))' }}
            >
              {product.badge}
            </span>
          )}
          {typeof index === 'number' && (
            <span
              aria-hidden="true"
              className="absolute bottom-3 right-3 spine-numbers"
              style={{ color: 'hsl(40 30% 93% / 0.6)' }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          )}
        </div>
      </Link>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link to={`/product/${product.id}`} className="type-nav leading-relaxed transition-colors hover:text-primary">
            {product.name}
          </Link>
          <p className="text-sm mt-1.5 flex items-baseline gap-2 flex-wrap">
            <span style={{ color: 'hsl(var(--primary))' }}>{formatINR(product.price)}</span>
            <span className="line-through" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {formatINR(product.mrp)}
            </span>
            <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {discount}% off
            </span>
          </p>
        </div>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={() => {
            add(product.id);
            openCart();
          }}
          className="shrink-0 w-11 h-11 border border-white/20 cursor-pointer text-xl leading-none transition-colors duration-200 hover:border-primary hover:text-primary"
        >
          +
        </button>
      </div>
    </article>
  );
}
