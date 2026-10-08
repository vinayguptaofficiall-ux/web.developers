import React, { useState } from 'react';
import type { Business, MenuItem } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { Sparkles, Flame, Plus, ShoppingBag, Info, CheckCircle2, ChevronRight } from 'lucide-react';

interface MenuSectionProps {
  business: Business;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ business }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const { addToCart, setSelectedFoodItem } = useCart();
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const filteredMenu = activeCategory === 'All'
    ? business.menu
    : business.menu.filter(item => item.category === activeCategory);

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart(item, business.id, 1);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => setAddedItemIds((prev) => ({ ...prev, [item.id]: false })), 800);
  };

  return (
    <section id="menu" className="py-12 sm:py-20 lg:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Commercial Menu</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight">
            Our Menu & Dishes
          </h2>
          <p className="text-sm sm:text-lg text-slate-400 leading-relaxed">
            Handcrafted specialties prepared fresh daily for {business.name}.
          </p>
        </div>

        {/* Category Filter — horizontally scrollable on mobile */}
        <div className="mt-8 sm:mt-12 -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center sm:flex-wrap">
            {business.menuCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 border shrink-0 ${
                    isActive
                      ? `${business.theme.buttonClass} border-transparent shadow-lg`
                      : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredMenu.map((item: MenuItem) => {
            const isJustAdded = addedItemIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFoodItem(item)}
                className="group rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer flex flex-col"
              >
                {/* Food Image — 16:9 aspect ratio */}
                <div className="relative w-full overflow-hidden bg-slate-950" style={{ aspectRatio: '16/9' }}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                  {/* Badges — top left, compact */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 z-10 flex-wrap max-w-[calc(100%-48px)]">
                    <span className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                      item.isVeg ? 'border-emerald-500 bg-emerald-950/90' : 'border-rose-500 bg-rose-950/90'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                    </span>

                    {item.isBestseller && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-amber-500/95 text-slate-950 flex items-center gap-0.5 shadow-sm leading-none">
                        <Sparkles className="w-2.5 h-2.5 shrink-0" /> BEST
                      </span>
                    )}

                    {item.isSpicy && (
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-rose-600/95 text-white flex items-center gap-0.5 shadow-sm leading-none">
                        <Flame className="w-2.5 h-2.5 shrink-0" /> SPICY
                      </span>
                    )}
                  </div>

                  {/* Price — bottom right of image */}
                  <div className="absolute bottom-2 right-2 bg-slate-950/90 border border-slate-700/80 px-2.5 py-1 rounded-lg text-sm font-black text-white backdrop-blur-md shadow-md">
                    ₹{item.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between gap-2.5">
                  <div className="min-w-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      {item.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-400 transition-colors mt-0.5 leading-snug line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-slate-800/80">
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedFoodItem(item); }}
                      className="flex items-center gap-0.5 text-[11px] text-slate-400 hover:text-slate-200 transition-colors font-medium shrink-0"
                    >
                      View details <ChevronRight className="w-3 h-3" />
                    </button>

                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-md shrink-0 min-h-[36px] ${
                        isJustAdded
                          ? 'bg-emerald-500 text-slate-950'
                          : business.theme.buttonClass
                      }`}
                    >
                      {isJustAdded ? (
                        <><CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> Added</>
                      ) : (
                        <><Plus className="w-3.5 h-3.5 stroke-[3]" /> Add</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-8 sm:mt-12 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>All menu prices & listings are verified for {business.name}.</span>
        </div>

      </div>
    </section>
  );
};
