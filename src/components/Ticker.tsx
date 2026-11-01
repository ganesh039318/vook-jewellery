const messages = [
  'Free shipping across India on orders above ₹999',
  'Flat 10% off your first order — code VOOK10',
  '6-month plating warranty on every piece',
  'COD available · Easy 7-day returns',
];

export default function Ticker() {
  const row = messages.map((m, i) => (
    <span key={i} className="type-eyebrow inline-flex items-center shrink-0" style={{ color: 'hsl(var(--primary))' }}>
      <span className="px-8">{m}</span>
      <span aria-hidden="true" className="inline-block w-1 h-1 rotate-45" style={{ background: 'hsl(var(--primary))' }} />
    </span>
  ));
  return (
    <div className="overflow-hidden border-b border-white/10 py-2.5" style={{ background: 'hsl(30 18% 4%)' }} aria-label="Offers">
      <div className="ticker-track inline-flex whitespace-nowrap">
        {row}
        {row.map((el, i) => ({ ...el, key: `dup-${i}` }))}
      </div>
    </div>
  );
}
