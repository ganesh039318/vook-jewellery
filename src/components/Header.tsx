import { Link, NavLink, useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import { useCart } from '../store/cart';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
];

export default function Header() {
  const { count, openCart, justAdded } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10" style={{ background: 'hsl(30 16% 5% / 0.92)', backdropFilter: 'blur(8px)' }}>
      <div className="flex items-center justify-between px-5 md:px-10 h-16">
        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden type-nav cursor-pointer py-2 -ml-1 px-1"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        {/* Desktop nav — left */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `type-nav py-2 transition-colors duration-200 hover:text-primary ${
                  isActive ? 'text-primary' : 'text-foreground'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {['Earrings', 'Bracelets', 'Necklaces'].map((c) => (
            <Link
              key={c}
              to={`/shop?cat=${c}`}
              className="type-nav py-2 transition-colors duration-200 hover:text-primary"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              {c}
            </Link>
          ))}
        </nav>

        {/* Wordmark */}
        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 select-none"
          aria-label="Vook Jewellery — home"
          style={{ fontWeight: 500, fontSize: '22px', letterSpacing: '0.42em', paddingLeft: '0.42em' }}
        >
          VOOK
        </Link>

        {/* Cart */}
        <button
          type="button"
          onClick={openCart}
          className="type-nav relative cursor-pointer py-2 px-1 -mr-1 transition-colors duration-200 hover:text-primary"
          aria-label={`Open cart, ${count} item${count === 1 ? '' : 's'}`}
        >
          Cart&nbsp;·&nbsp;{count}
          <span
            aria-hidden="true"
            className={`absolute -top-0.5 -right-2.5 w-2 h-2 rounded-full ${justAdded ? 'cart-dot-blink' : ''}`}
            style={{
              background: 'hsl(var(--primary))',
              opacity: count > 0 ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          />
        </button>
      </div>

      {/* Mobile nav panel */}
      {menuOpen && (
        <nav id="mobile-nav" className="md:hidden border-t border-white/10 px-5 py-4 flex flex-col gap-1" aria-label="Mobile">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="type-nav py-3 border-b border-white/5">
              {item.label}
            </NavLink>
          ))}
          {['Earrings', 'Bracelets', 'Necklaces', 'Rings', 'Men'].map((c) => (
            <Link key={c} to={`/shop?cat=${c}`} className="type-nav py-3 border-b border-white/5" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {c}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
