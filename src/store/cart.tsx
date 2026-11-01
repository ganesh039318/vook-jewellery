import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getProduct } from '../data/products';

export interface CartLine {
  id: string;
  qty: number;
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  justAdded: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'vook-cart-v1';

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed.filter((l) => getProduct(l.id) && l.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((s, l) => s + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.qty * (getProduct(l.id)?.price ?? 0), 0);
    return {
      lines,
      count,
      subtotal,
      isOpen,
      justAdded,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add: (id, qty = 1) => {
        setLines((prev) => {
          const found = prev.find((l) => l.id === id);
          if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
          return [...prev, { id, qty }];
        });
        setJustAdded(true);
        window.setTimeout(() => setJustAdded(false), 1800);
      },
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      setQty: (id, qty) => {
        if (qty <= 0) {
          setLines((prev) => prev.filter((l) => l.id !== id));
        } else {
          setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
        }
      },
      clear: () => setLines([]),
    };
  }, [lines, isOpen, justAdded]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
