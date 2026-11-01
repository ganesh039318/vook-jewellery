import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24">
      <div className="px-5 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <p style={{ fontWeight: 500, fontSize: '20px', letterSpacing: '0.42em' }}>VOOK</p>
          <p className="text-sm mt-4" style={{ color: 'hsl(var(--muted-foreground))', maxWidth: '30ch' }}>
            Gold plated fashion jewellery, designed for every day and every celebration.
          </p>
        </div>
        <nav aria-label="Shop">
          <p className="type-eyebrow mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>Shop</p>
          <ul className="space-y-3">
            {['Earrings', 'Bracelets', 'Necklaces', 'Rings', 'Men'].map((c) => (
              <li key={c}>
                <Link to={`/shop?cat=${c}`} className="text-sm transition-colors hover:text-primary">
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Help">
          <p className="type-eyebrow mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>Help</p>
          <ul className="space-y-3">
            <li><Link to="/shop" className="text-sm transition-colors hover:text-primary">Shipping &amp; returns</Link></li>
            <li><Link to="/shop" className="text-sm transition-colors hover:text-primary">Plating warranty</Link></li>
            <li><Link to="/shop" className="text-sm transition-colors hover:text-primary">Care guide</Link></li>
          </ul>
        </nav>
        <div>
          <p className="type-eyebrow mb-5" style={{ color: 'hsl(var(--muted-foreground))' }}>Contact</p>
          <ul className="space-y-3 text-sm">
            <li><a href="mailto:care@vook.example" className="transition-colors hover:text-primary">care@vook.example</a></li>
            <li><a href="tel:+911800000000" className="transition-colors hover:text-primary">1800 000 000 (toll free)</a></li>
            <li style={{ color: 'hsl(var(--muted-foreground))' }}>Mon–Sat, 10am–7pm IST</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 md:px-10 py-5 flex flex-col md:flex-row gap-2 items-center justify-between">
        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          © 2026 Vook Jewellery — demo storefront
        </p>
        <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
          Crafted in gold, worn with love
        </p>
      </div>
    </footer>
  );
}
