import { useEffect, useState } from 'react';
import { useCart } from '../store/cart';
import { formatINR, getProduct } from '../data/products';

export default function CartDrawer() {
  const { lines, subtotal, isOpen, closeCart, setQty, remove, clear } = useCart();
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (!isOpen) setPlaced(false);
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeCart]);

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;

  const placeOrder = () => {
    setPlaced(true);
    clear();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: 'rgba(0,0,0,0.55)', opacity: isOpen ? 1 : 0 }}
        onClick={closeCart}
      />
      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="absolute top-0 right-0 h-full w-full max-w-md flex flex-col border-l border-white/10"
        style={{
          background: 'hsl(30 14% 7%)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.83, 0, 0.17, 1)',
          visibility: isOpen ? 'visible' : 'hidden',
        }}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
          <span className="type-nav">Your Cart</span>
          <button type="button" onClick={closeCart} className="type-nav cursor-pointer py-2 transition-colors hover:text-primary">
            Close
          </button>
        </div>

        {placed ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
            <span
              aria-hidden="true"
              className="inline-block w-3 h-3 rotate-45"
              style={{ background: 'hsl(var(--primary))' }}
            />
            <p className="type-nav">Order placed</p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '32ch' }}>
              Thank you! This is a demo store — no payment was taken and no order was actually shipped.
            </p>
            <button type="button" onClick={closeCart} className="btn-outline w-auto">
              Continue browsing
            </button>
          </div>
        ) : lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 text-center">
            <p className="type-nav" style={{ color: 'hsl(var(--muted-foreground))' }}>Your cart is empty</p>
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '30ch' }}>
              Gold plated jewellery, crafted to be worn every day.
            </p>
            <button type="button" onClick={closeCart} className="btn-gold w-auto">
              Shop the collection
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-white/5 px-6">
              {lines.map((line) => {
                const p = getProduct(line.id);
                if (!p) return null;
                return (
                  <li key={line.id} className="py-5 flex gap-4">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-20 h-24 object-cover shrink-0"
                      style={{ background: 'hsl(30 12% 10%)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="type-nav leading-relaxed">{p.name}</p>
                      <p className="text-sm mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
                        {formatINR(p.price)}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="inline-flex items-center border border-white/15">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${p.name}`}
                            className="w-9 h-9 cursor-pointer transition-colors hover:text-primary text-lg leading-none"
                            onClick={() => setQty(line.id, line.qty - 1)}
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-sm">{line.qty}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${p.name}`}
                            className="w-9 h-9 cursor-pointer transition-colors hover:text-primary text-lg leading-none"
                            onClick={() => setQty(line.id, line.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.id)}
                          className="text-xs uppercase tracking-[0.18em] cursor-pointer underline underline-offset-4 transition-colors hover:text-primary"
                          style={{ color: 'hsl(var(--muted-foreground))' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-white/10 px-6 py-5 shrink-0 space-y-2">
              <div className="flex justify-between text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <span>Subtotal</span>
                <span>{formatINR(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span>
              </div>
              <div className="flex justify-between type-nav pt-2 border-t border-white/10">
                <span>Total</span>
                <span style={{ color: 'hsl(var(--primary))' }}>{formatINR(subtotal + shipping)}</span>
              </div>
              <button type="button" onClick={placeOrder} className="btn-invert mt-4">
                Place order · {formatINR(subtotal + shipping)}
              </button>
              <p className="text-xs text-center pt-2" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Demo store — checkout is simulated.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
