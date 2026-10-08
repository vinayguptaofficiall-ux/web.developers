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
    <div
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <button
        onClick={() => setIsCartOpen(true)}
        className={`w-full rounded-2xl shadow-2xl flex items-center justify-between px-4 py-3 ${business.theme.buttonClass} border border-white/10`}
        style={{ minHeight: '56px' }}
      >
        {/* Left: count badge + label */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-950/25 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-4 h-4 text-slate-950" />
          </div>
          <div className="text-left leading-tight">
            <span className="text-[11px] font-bold uppercase tracking-wide text-slate-950/70 block">
              {cartTotalCount} {cartTotalCount === 1 ? 'item' : 'items'} in cart
            </span>
            <span className="text-base font-black text-slate-950">
              ₹{cartSubtotal}
            </span>
          </div>
        </div>

        {/* Right: View Cart CTA */}
        <div className="flex items-center gap-1.5 bg-slate-950/20 px-3.5 py-2 rounded-xl">
          <span className="text-xs font-extrabold text-slate-950">View Cart</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
        </div>
      </button>
    </div>
  );
};
