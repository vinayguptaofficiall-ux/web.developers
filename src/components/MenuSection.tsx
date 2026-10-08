import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Business, MenuItem } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Search, X, Plus, Minus, ShoppingBag, Info } from 'lucide-react';

import a3Data from '../data/a3-kitchen.json';
import frothData from '../data/froth-and-friends.json';
import ariseData from '../data/arise-cafe.json';

interface RawItem {
  name: string;
  price: number | null;
  description?: string | null;
  image?: string | null;
  category: string;
  labels?: string[];
}

// A3 Kitchen JSON has top-level `items`; Froth & Arise have top-level `items` too
const RAW: Record<string, RawItem[]> = {
  'a3-kitchen': (a3Data as { items: RawItem[] }).items,
  'froth-and-friends': (frothData as { items: RawItem[] }).items,
  'arise-cafe': (ariseData as { items: RawItem[] }).items,
};

function buildMenuItems(slug: string): MenuItem[] {
  const raw = RAW[slug] ?? [];
  return raw.map((item, idx) => ({
    id: `${slug}-${idx}`,
    name: item.name,
    price: item.price ?? null,
    description: item.description || null,
    image: item.image || null,
    category: item.category,
    labels: item.labels ?? [],
  }));
}

function getCategories(items: MenuItem[]): string[] {
  const seen = new Set<string>();
  const cats: string[] = [];
  for (const item of items) {
    if (!seen.has(item.category)) {
      seen.add(item.category);
      cats.push(item.category);
    }
  }
  return cats;
}

function formatLabel(cat: string): string {
  return cat
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

interface MenuSectionProps {
  business: Business;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ business }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [search, setSearch] = useState('');
  const { addToCart, updateQuantity, cart } = useCart();
  const tabsRef = useRef<HTMLDivElement>(null);

  const allItems = useMemo(() => buildMenuItems(business.slug), [business.slug]);
  const categories = useMemo(() => getCategories(allItems), [allItems]);

  useEffect(() => {
    setActiveCategory('all');
    setSearch('');
  }, [business.slug]);

  const filtered = useMemo(() => {
    let items = activeCategory === 'all'
      ? allItems
      : allItems.filter((i) => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter((i) => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [allItems, activeCategory, search]);

  const getCartQty = (itemId: string) => {
    const ci = cart.find((c) => c.item.id === itemId);
    return ci ? ci.quantity : 0;
  };

  const handleAdd = (item: MenuItem) => {
    if (item.price === null) return;
    addToCart(item, business.id, 1);
  };

  const handleIncrease = (item: MenuItem) => {
    if (item.price === null) return;
    const qty = getCartQty(item.id);
    if (qty === 0) addToCart(item, business.id, 1);
    else updateQuantity(item.id, qty + 1);
  };

  const handleDecrease = (item: MenuItem) => {
    const qty = getCartQty(item.id);
    if (qty > 0) updateQuantity(item.id, qty - 1);
  };

  const accentHex = business.theme.accentHex;

  return (
    <section id="menu" className="py-12 sm:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: accentHex }} />
            <span>Full Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Our Menu</h2>
          <p className="text-sm text-slate-400">
            {allItems.length} items · {categories.length} categories
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search menu…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="-mx-4 sm:mx-0 px-4 sm:px-0 mb-8">
          <div ref={tabsRef} className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                activeCategory === 'all'
                  ? `${business.theme.buttonClass} border-transparent`
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              All ({allItems.length})
            </button>
            {categories.map((cat) => {
              const count = allItems.filter((i) => i.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? `${business.theme.buttonClass} border-transparent`
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {formatLabel(cat)} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* No results */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">No items found for "{search}"</p>
          </div>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {filtered.map((item) => {
            const qty = getCartQty(item.id);
            const hasPrice = item.price !== null;
            const labels = item.labels ?? [];

            return (
              <div
                key={item.id}
                className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative w-full overflow-hidden bg-slate-950" style={{ aspectRatio: '4/3' }}>
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="group-hover:scale-105 transition-transform duration-500"
                    accentColor={accentHex}
                  />
                  {/* Labels */}
                  {labels.length > 0 && (
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-12px)]">
                      {labels.map((label) => (
                        <span key={label} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/90 border border-slate-700 text-slate-300 leading-none">
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Price badge */}
                  {hasPrice && (
                    <div className="absolute bottom-2 right-2 bg-slate-950/90 border border-slate-700/80 px-2.5 py-1 rounded-lg text-sm font-black text-white backdrop-blur-sm">
                      ₹{item.price}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col gap-2.5">
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      {formatLabel(item.category)}
                    </span>
                    <h3 className="text-sm font-extrabold text-white mt-0.5 leading-snug">
                      {item.name}
                    </h3>
                    {item.description && (
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Add / Stepper */}
                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800">
                    {!hasPrice ? (
                      <span className="text-xs text-slate-500 italic">Price at restaurant</span>
                    ) : qty === 0 ? (
                      <button
                        onClick={() => handleAdd(item)}
                        className={`ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${business.theme.buttonClass}`}
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[3]" />
                        Add
                      </button>
                    ) : (
                      <>
                        <span className="text-xs font-bold text-white">
                          ₹{(item.price! * qty).toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-950 p-0.5">
                          <button
                            onClick={() => handleDecrease(item)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            <Minus className="w-3 h-3 stroke-[3]" />
                          </button>
                          <span className="w-6 text-center text-xs font-black text-white">{qty}</span>
                          <button
                            onClick={() => handleIncrease(item)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                          >
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* A3 Kitchen price note */}
        {business.slug === 'a3-kitchen' && (
          <div className="mt-10 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Prices for A3 Kitchen are available at the restaurant. Call to confirm before ordering.</span>
          </div>
        )}

      </div>
    </section>
  );
};
