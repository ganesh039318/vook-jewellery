export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Earrings' | 'Bracelets' | 'Necklaces' | 'Rings' | 'Men';
  price: number;
  mrp: number;
  image: string;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  badge?: string;
}

export const products: Product[] = [
  {
    id: 'wings-cuff',
    name: 'Ethereal Wings Cuff Bracelet',
    category: 'Bracelets',
    price: 899,
    mrp: 1599,
    image: '/images/wings-cuff.jpg',
    tagline: 'Sculpted to take flight',
    description:
      'An open cuff sculpted like a pair of delicate wings in flight. The gold plated finish catches light from every angle — a statement piece that needs no company.',
    specs: [
      { label: 'Material', value: 'Brass alloy, 18K gold plating' },
      { label: 'Design', value: 'Open cuff, wing motif' },
      { label: 'Diameter', value: '6.0 cm (adjustable)' },
      { label: 'Weight', value: '18 g' },
      { label: 'Fit', value: 'Free size, gently adjustable' },
      { label: 'Warranty', value: '6 months plating warranty' },
    ],
    badge: 'New',
  },
  {
    id: 'luxury-bracelet',
    name: 'Golden Luxury Bracelet Elegance',
    category: 'Bracelets',
    price: 999,
    mrp: 1899,
    image: '/images/luxury-bracelet.jpg',
    tagline: 'Filigree that whispers luxury',
    description:
      'Intricate filigree links strung with tiny crystals, finished in a rich gold plating. A bracelet that moves like silk and reads like heirloom.',
    specs: [
      { label: 'Material', value: 'Brass alloy, 18K gold plating' },
      { label: 'Stones', value: 'AAA cubic zirconia' },
      { label: 'Length', value: '19 cm + 3 cm extender' },
      { label: 'Weight', value: '14 g' },
      { label: 'Closure', value: 'Lobster clasp' },
      { label: 'Warranty', value: '6 months plating warranty' },
    ],
  },
  {
    id: 'mens-chain',
    name: 'Stylish Gold Plated Chain For Men',
    category: 'Men',
    price: 1099,
    mrp: 1999,
    image: '/images/mens-chain.jpg',
    tagline: 'Weight you can feel',
    description:
      'A bold curb-link chain with real presence. Thick, warm gold plating over a solid core — built for daily wear, styled for everything.',
    specs: [
      { label: 'Material', value: 'Stainless steel core, gold plating' },
      { label: 'Link', value: 'Curb link, 8 mm width' },
      { label: 'Length', value: '55 cm' },
      { label: 'Weight', value: '42 g' },
      { label: 'Closure', value: 'Lobster clasp' },
      { label: 'Warranty', value: '1 year plating warranty' },
    ],
    badge: 'Bestseller',
  },
  {
    id: 'adorned-earrings',
    name: 'Adorned Elegance Earrings',
    category: 'Earrings',
    price: 749,
    mrp: 1399,
    image: '/images/adorned-earrings.jpg',
    tagline: 'Emerald drops, golden frames',
    description:
      'Chandelier earrings set with deep green stones in delicate gold plated frames. Festive enough for the big night, refined enough for everything after.',
    specs: [
      { label: 'Material', value: 'Brass alloy, 18K gold plating' },
      { label: 'Stones', value: 'Emerald-tone glass crystals' },
      { label: 'Drop length', value: '5.0 cm' },
      { label: 'Weight', value: '9 g (pair)' },
      { label: 'Closure', value: 'Fish-hook' },
      { label: 'Warranty', value: '6 months plating warranty' },
    ],
  },
  {
    id: 'gold-ring',
    name: 'Regal Gold Plated Ring',
    category: 'Rings',
    price: 549,
    mrp: 999,
    image: '/images/gold-ring.jpg',
    tagline: 'Braided in gold',
    description:
      'A statement ring with a hand-braided band texture. Bold enough to wear alone, balanced enough to stack.',
    specs: [
      { label: 'Material', value: 'Brass alloy, 18K gold plating' },
      { label: 'Design', value: 'Braided band, high polish' },
      { label: 'Band width', value: '6 mm' },
      { label: 'Weight', value: '7 g' },
      { label: 'Sizes', value: 'Adjustable (fits 14–18)' },
      { label: 'Warranty', value: '6 months plating warranty' },
    ],
  },
  {
    id: 'layered-necklace',
    name: 'Celestial Layered Necklace',
    category: 'Necklaces',
    price: 1299,
    mrp: 2499,
    image: '/images/layered-necklace.jpg',
    tagline: 'Three chains, one sky',
    description:
      'Three delicate gold plated chains layered at graduating lengths, scattered with tiny star charms. The layered look, without the tangle.',
    specs: [
      { label: 'Material', value: 'Brass alloy, 18K gold plating' },
      { label: 'Layers', value: '3 chains, star charms' },
      { label: 'Lengths', value: '38 / 43 / 48 cm' },
      { label: 'Weight', value: '13 g' },
      { label: 'Closure', value: 'Single lobster clasp' },
      { label: 'Warranty', value: '6 months plating warranty' },
    ],
    badge: 'New',
  },
];

export const categories = ['All', 'Earrings', 'Bracelets', 'Necklaces', 'Rings', 'Men'] as const;

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
