import React, { useState, useEffect } from 'react';
import type { Business } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Sparkles, Flame, Check } from 'lucide-react';

interface FoodDetailModalProps {
  business: Business;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({ business }) => {
  const { selectedFoodItem, setSelectedFoodItem, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setAddedSuccess(false);
  }, [selectedFoodItem]);

  if (!selectedFoodItem) return null;

  const handleAdd = () => {
    addToCart(selectedFoodItem, business.id, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      setSelectedFoodItem(null);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedFoodItem(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/70 border border-slate-800 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top High-Res Image Banner */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950 shrink-0">
          <img
            src={selectedFoodItem.image}
            alt={selectedFoodItem.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>

          {/* Dietary Badge */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
              selectedFoodItem.isVeg
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                : 'bg-rose-950/80 text-rose-400 border-rose-500/40'
            }`}>
              <span className={`w-2 h-2 rounded-full ${selectedFoodItem.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
              {selectedFoodItem.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
            </span>

            {selectedFoodItem.isBestseller && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Bestseller
              </span>
            )}

            {selectedFoodItem.isSpicy && (
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Spicy
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {selectedFoodItem.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                {selectedFoodItem.name}
              </h3>
            </div>
            <span className="text-xl font-extrabold text-white bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              ₹{selectedFoodItem.price}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedFoodItem.description}
          </p>

          {selectedFoodItem.ingredients && selectedFoodItem.ingredients.length > 0 && (
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Key Ingredients
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedFoodItem.ingredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 text-xs font-medium text-slate-300 border border-slate-800"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center gap-4 shrink-0">
          
          {/* Quantity Selector */}
          <div className="flex items-center rounded-xl bg-slate-900 border border-slate-800 p-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-bold text-white text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            disabled={addedSuccess}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              addedSuccess
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : business.theme.buttonClass
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" /> Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                Add to Cart • ₹{selectedFoodItem.price * quantity}
              </>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};
