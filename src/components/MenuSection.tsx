import React, { useState, useMemo, useEffect } from 'react';
import type { Business, MenuItem } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { Search, X, Plus, Minus, ShoppingBag, Info } from 'lucide-react';

interface RawItem {
  name: string;
  price: number | null;
  description?: string | null;
  image?: string | null;
  category: string;
  labels?: string[];
}

interface AllMenusJson {
  restaurants: Array<{
    slug: string;
    items: RawItem[];
  }>;
}

const IMAGE_MAP: [string, string][] = [
  ['biryani','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=75'],
  ['butter chicken','https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=75'],
  ['tikka','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=75'],
  ['lollipop','https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=75'],
  ['wings','https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=75'],
  ['satay','https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=400&q=75'],
  ['korean','https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=75'],
  ['hong kong','https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=75'],
  ['mexican','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=75'],
  ['italian chicken','https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&q=75'],
  ['chicken','https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=400&q=75'],
  ['mutton','https://images.unsplash.com/photo-1574484284002-952d92a03a05?w=400&q=75'],
  ['prawn','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=75'],
  ['fish n chips','https://images.unsplash.com/photo-1579208575657-c595a05383b7?w=400&q=75'],
  ['fish','https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&q=75'],
  ['paneer','https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=75'],
  ['pizza','https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&q=75'],
  ['lasagna','https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=75'],
  ['spaghetti','https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=75'],
  ['mac','https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=75'],
  ['pasta','https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&q=75'],
  ['burger','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75'],
  ['sandwich','https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=75'],
  ['wrap','https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=75'],
  ['burrito','https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&q=75'],
  ['taco','https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=75'],
  ['shawarma','https://images.unsplash.com/photo-1561651823-34feb02250e4?w=400&q=75'],
  ['cigar roll','https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=75'],
  ['loaded fries','https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=75'],
  ['peri peri','https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=75'],
  ['peri-peri','https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=75'],
  ['fries','https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=75'],
  ['nachos','https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=75'],
  ['garlic bread','https://images.unsplash.com/photo-1619535860434-cf9b902a0e97?w=400&q=75'],
  ['momo','https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400&q=75'],
  ['bao','https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=75'],
  ['spring roll','https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=75'],
  ['popcorn','https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=400&q=75'],
  ['soup','https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=75'],
  ['salad','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=75'],
  ['thai green','https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=75'],
  ['thai red','https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=75'],
  ['thai curry','https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=75'],
  ['mongolian','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=75'],
  ['mangolian','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=75'],
  ['rice bowl','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=75'],
  ['fried rice','https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=75'],
  ['rice','https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=400&q=75'],
  ['noodle','https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=75'],
  ['espresso martini','https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=75'],
  ['espresso','https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=400&q=75'],
  ['affogato','https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=75'],
  ['latte','https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&q=75'],
  ['cappuccino','https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=75'],
  ['frappe','https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=75'],
  ['cold brew','https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=75'],
  ['americano','https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=400&q=75'],
  ['mocha','https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=75'],
  ['vietnamese','https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=75'],
  ['coffee','https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=75'],
  ['iced tea','https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=75'],
  ['green tea','https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=75'],
  ['tea','https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=75'],
  ['thickshake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=75'],
  ['biscoff','https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=75'],
  ['nutella','https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=400&q=75'],
  ['oreo','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=75'],
  ['kitkat','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=75'],
  ['shake','https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=75'],
  ['limoncello','https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=75'],
  ['pina colada','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=75'],
  ['mojito','https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=75'],
  ['mocktail','https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=75'],
  ['lassi','https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=75'],
  ['buttermilk','https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=75'],
  ['juice','https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=75'],
  ['soda','https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=75'],
  ['churro','https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=75'],
  ['konafah','https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&q=75'],
  ['dessert','https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=75'],
  ['naan','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75'],
  ['paratha','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75'],
  ['roti','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75'],
  ['kulcha','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75'],
  ['bread','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=75'],
  ['egg','https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&q=75'],
  ['dal','https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=75'],
  ['mushroom','https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75'],
  ['curry','https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&q=75'],
  ['papad','https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=75'],
];

function resolveImage(name: string, category: string): string {
  const hay = `${name} ${category}`.toLowerCase();
  for (const [kw, url] of IMAGE_MAP) {
    if (hay.includes(kw)) return url;
  }
  return 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=75';
}

function formatLabel(s: string): string {
  return s.split(/[-_ ]/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

interface MenuSectionProps { business: Business; }

export const MenuSection: React.FC<MenuSectionProps> = ({ business }) => {
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');
  const { addToCart, updateQuantity, cart } = useCart();

  useEffect(() => {
    setLoading(true);
    setActiveCategory('all');
    setSearch('');
    fetch('/data/menus/all-menus.json')
      .then(r => r.json())
      .then((data: AllMenusJson) => {
        const restaurant = data.restaurants.find(r => r.slug === business.slug);
        const raw: RawItem[] = restaurant?.items ?? [];
        const items: MenuItem[] = raw.map((item, idx) => ({
          id: `${business.slug}-${idx}`,
          name: item.name,
          price: item.price ?? null,
          description: item.description || null,
          image: (item.image && item.image.trim()) ? item.image : resolveImage(item.name, item.category),
          category: item.category,
          labels: item.labels ?? [],
        }));
        setAllItems(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [business.slug]);

  const categories = useMemo(() => {
    const seen = new Set<string>();
    const cats: string[] = [];
    for (const item of allItems) {
      if (!seen.has(item.category)) { seen.add(item.category); cats.push(item.category); }
    }
    return cats;
  }, [allItems]);

  const filtered = useMemo(() => {
    let items = activeCategory === 'all' ? allItems : allItems.filter(i => i.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(i => i.name.toLowerCase().includes(q));
    }
    return items;
  }, [allItems, activeCategory, search]);

  const getQty = (id: string) => cart.find(c => c.item.id === id)?.quantity ?? 0;

  const handleAdd = (item: MenuItem) => {
    if (item.price === null) return;
    addToCart(item, business.id, 1);
  };
  const handleInc = (item: MenuItem) => {
    if (item.price === null) return;
    const q = getQty(item.id);
    if (q === 0) addToCart(item, business.id, 1);
    else updateQuantity(item.id, q + 1);
  };
  const handleDec = (item: MenuItem) => {
    const q = getQty(item.id);
    if (q > 0) updateQuantity(item.id, q - 1);
  };

  const accent = business.theme.accentHex;

  return (
    <section id="menu" className="py-12 sm:py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            <ShoppingBag className="w-3.5 h-3.5" style={{ color: accent }} />
            <span>Full Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">Our Menu</h2>
          {!loading && (
            <p className="text-sm text-slate-400">{allItems.length} items · {categories.length} categories</p>
          )}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            placeholder="Search menu…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-slate-600 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        {!loading && (
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap sm:justify-center">
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
              {categories.map(cat => {
                const count = allItems.filter(i => i.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                      activeCategory === cat
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
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden animate-pulse">
                <div className="bg-slate-800" style={{ aspectRatio: '4/3' }} />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-slate-800 rounded w-1/3" />
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No results */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm font-semibold">No items found{search ? ` for "${search}"` : ''}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map(item => {
              const qty = getQty(item.id);
              const hasPrice = item.price !== null;
              const labels = item.labels ?? [];
              return (
                <div key={item.id} className="group rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-200 overflow-hidden flex flex-col">
                  {/* Image */}
                  <div className="relative w-full overflow-hidden bg-slate-950" style={{ aspectRatio: '4/3' }}>
                    <ImageWithFallback
                      itemName={item.name}
                      restaurantSlug={business.slug}
                      fallbackSrc={item.image}
                      alt={item.name}
                      className="group-hover:scale-105 transition-transform duration-500"
                      accentColor={accent}
                    />
                    {labels.length > 0 && (
                      <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-12px)]">
                        {labels.map(label => (
                          <span key={label} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/90 border border-slate-700 text-slate-300 leading-none">
                            {label}
                          </span>
                        ))}
                      </div>
                    )}
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
                      <h3 className="text-sm font-extrabold text-white mt-0.5 leading-snug">{item.name}</h3>
                      {item.description && (
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">{item.description}</p>
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
                          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add
                        </button>
                      ) : (
                        <>
                          <span className="text-xs font-bold text-white">₹{(item.price! * qty).toLocaleString('en-IN')}</span>
                          <div className="flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-950 p-0.5">
                            <button onClick={() => handleDec(item)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
                              <Minus className="w-3 h-3 stroke-[3]" />
                            </button>
                            <span className="w-6 text-center text-xs font-black text-white">{qty}</span>
                            <button onClick={() => handleInc(item)} className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-colors">
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
        )}

        {/* A3 Kitchen price note */}
        {!loading && business.slug === 'a3-kitchen' && (
          <div className="mt-10 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-400">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Prices for A3 Kitchen are available at the restaurant. Call to confirm before ordering.</span>
          </div>
        )}

      </div>
    </section>
  );
};
