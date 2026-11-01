export default function Spine({ className = '' }: { className?: string }) {
  const numbers = Array.from({ length: 99 }, (_, i) => String(i + 1).padStart(2, '0'));
  return (
    <div
      aria-hidden="true"
      className={`spine-numbers overflow-hidden text-center ${className}`}
      style={{ color: 'hsl(36 12% 62% / 0.45)' }}
    >
      {numbers.map((n) => (
        <div key={n}>{n}</div>
      ))}
    </div>
  );
}
