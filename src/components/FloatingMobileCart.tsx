import React from 'react';
import type { Business } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface FloatingMobileCartProps {
  business: Business;
}

export const FloatingMobileCart: React.FC<FloatingMobileCartProps> = ({ business }) => {
  const { cartTotalCount, cartSubtotal, setIsCartOpen } = useCart();

  if (cartTotalCount === 0) return null;

  return (
    <div className="lg:hidden fixed bottom-4 left-4 right-4 z-40 animate-in slide-in-from-bottom-4 duration-200">
      <button
        onClick={() => setIsCartOpen(true)}
        className={`w-full py-3.5 px-5 rounded-2xl shadow-2xl flex items-center justify-between ${business.theme.buttonClass} border border-white/10`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-950/20 flex items-center justify-center font-extrabold text-sm">
            <ShoppingBag className="w-5 h-5 text-slate-950" />
          </div>
          <div className="text-left">
            <span className="text-xs font-extrabold tracking-wide uppercase block text-slate-950/80">
              {cartTotalCount} {cartTotalCount === 1 ? 'Item' : 'Items'} Added
            </span>
            <span className="text-base font-extrabold text-slate-950">
              ₹{cartSubtotal}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs font-extrabold text-slate-950 bg-white/20 px-3 py-1.5 rounded-xl backdrop-blur-md">
          <span>VIEW CART</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
};
