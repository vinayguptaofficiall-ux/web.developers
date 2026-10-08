import React, { useState } from 'react';
import type { Business, MenuItem } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { Sparkles, Flame, Plus, ShoppingBag, Info, CheckCircle2 } from 'lucide-react';

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
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 800);
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Commercial Menu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Our Menu & Dishes
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Handcrafted specialties & authentic dishes prepared fresh daily for {business.name}.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-12 flex items-center justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {business.menuCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
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

        {/* Food Items Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenu.map((item: MenuItem) => {
            const isJustAdded = addedItemIds[item.id];
            return (
              <div
                key={item.id}
                onClick={() => setSelectedFoodItem(item)}
                className="group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl overflow-hidden cursor-pointer flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Top Food Image Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

                  {/* Dietary & Highlight Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span className={`w-5 h-5 rounded-md border flex items-center justify-center backdrop-blur-md ${
                      item.isVeg ? 'border-emerald-500 bg-emerald-950/80' : 'border-rose-500 bg-rose-950/80'
                    }`}>
                      <span className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                    </span>

                    {item.isBestseller && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/90 text-slate-950 flex items-center gap-1 shadow-md">
                        <Sparkles className="w-3 h-3" /> BESTSELLER
                      </span>
                    )}

                    {item.isSpicy && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-600/90 text-white flex items-center gap-1 shadow-md">
                        <Flame className="w-3 h-3" /> SPICY
                      </span>
                    )}
                  </div>

                  {/* Price Tag Overlay */}
                  <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 px-3 py-1 rounded-xl text-sm font-black text-white backdrop-blur-md shadow-md">
                    ₹{item.price}
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      {item.category}
                    </span>
                    <h3 className="text-base font-extrabold text-white group-hover:text-amber-400 transition-colors mt-0.5 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Card Bottom Quick Add Bar */}
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-semibold">
                      Click for details
                    </span>

                    <button
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                        isJustAdded
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : business.theme.buttonClass
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> Added
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* Data Integrity Footer Note */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 text-center max-w-xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>All menu prices & food listings are verified from public dining sources for {business.name}.</span>
        </div>

      </div>
    </section>
  );
};
