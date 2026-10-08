import React from 'react';
import type { Business } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, ArrowRight, UtensilsCrossed } from 'lucide-react';

interface CartDrawerProps {
  business: Business;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ business }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotalCount,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Overlay backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center shrink-0">
                <img src={business.logo} alt={business.name} className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-white">Your Food Cart</h2>
                <p className="text-xs text-slate-400">{business.name} • {cartTotalCount} items</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-3xl bg-slate-950 border border-slate-800 text-slate-600 flex items-center justify-center">
                  <UtensilsCrossed className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Your cart is empty</h3>
                  <p className="text-xs text-slate-400 max-w-xs mt-1">
                    Explore the menu and add delicious items to get started with your order.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                  <span>Items ({cartTotalCount})</span>
                  <button
                    onClick={clearCart}
                    className="hover:text-rose-400 transition-colors"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs font-semibold text-amber-400 mt-0.5">
                        ₹{item.price}
                      </p>

                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.id, quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-white">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:text-white"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-extrabold text-white ml-auto">
                          ₹{item.price * quantity}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Charges</span>
                  <span className="text-slate-400">Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-base font-extrabold text-white">
                <span>Total</span>
                <span className="text-xl text-amber-400">₹{cartSubtotal}</span>
              </div>

              <button
                onClick={handleCheckout}
                className={`w-full py-4 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 ${business.theme.buttonClass} transition-all`}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
