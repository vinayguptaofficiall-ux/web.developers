import React, { useState, useEffect } from 'react';
import type { Business } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { ImageWithFallback } from './ImageWithFallback';
import { X, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

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
    if (selectedFoodItem.price === null) return;
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

        {/* Top Image Banner */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-950 shrink-0">
          <ImageWithFallback
            itemName={selectedFoodItem.name}
            restaurantSlug={business.slug}
            fallbackSrc={selectedFoodItem.image}
            alt={selectedFoodItem.name}
            className="w-full h-full"
            accentColor={business.theme.accentHex}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent pointer-events-none"></div>

          {/* Labels */}
          {(selectedFoodItem.labels ?? []).length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
              {(selectedFoodItem.labels ?? []).map((label) => (
                <span key={label} className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-slate-300 border border-slate-700">
                  {label}
                </span>
              ))}
            </div>
          )}
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
              {selectedFoodItem.price !== null ? `₹${selectedFoodItem.price}` : 'Price on request'}
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedFoodItem.description || 'No description available.'}
          </p>


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
            disabled={addedSuccess || selectedFoodItem.price === null}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
              addedSuccess
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : selectedFoodItem.price === null
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : business.theme.buttonClass
            }`}
          >
            {addedSuccess ? (
              <><Check className="w-4 h-4 stroke-[3]" /> Added to Cart!</>
            ) : selectedFoodItem.price === null ? (
              <>Price on request</>
            ) : (
              <><ShoppingBag className="w-4 h-4" /> Add to Cart • ₹{selectedFoodItem.price * quantity}</>
            )}
          </button>

        </div>

      </div>
    </div>
  );
};
