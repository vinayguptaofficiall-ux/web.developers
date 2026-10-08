import React, { useState } from 'react';
import type { Business } from '../data/businesses';
import { useCart, type CustomerDetails } from '../context/CartContext';
import { X, MessageCircle, CreditCard, MapPin, Phone, User, CheckCircle, Sparkles, Clock, ArrowRight, Receipt } from 'lucide-react';

interface CheckoutModalProps {
  business: Business;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ business }) => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    getWhatsAppOrderUrl,
    clearCart,
  } = useCart();

  const [form, setForm] = useState<CustomerDetails>({
    name: '',
    phone: '',
    orderType: 'delivery',
    address: '',
    landmark: '',
    pincode: '520008',
  });

  const [error, setError] = useState('');
  const [orderState, setOrderState] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [placedOrderData, setPlacedOrderData] = useState<{
    orderId: string;
    items: typeof cart;
    total: number;
    details: CustomerDetails;
  } | null>(null);

  if (!isCheckoutOpen) return null;

  const deliveryFee = form.orderType === 'delivery' ? 40 : 0;
  const grandTotal = cartSubtotal + deliveryFee;

  const validate = () => {
    if (!form.name.trim()) {
      setError('Please enter your full name');
      return false;
    }
    if (!form.phone.trim() || form.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (form.orderType === 'delivery' && !form.address?.trim()) {
      setError('Please enter your delivery street address');
      return false;
    }
    setError('');
    return true;
  };

  const handlePlaceOrder = (mode: 'whatsapp' | 'card') => {
    if (!validate()) return;

    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    setPlacedOrderData({
      orderId,
      items: [...cart],
      total: grandTotal,
      details: { ...form },
    });

    setOrderState('processing');

    setTimeout(() => {
      setOrderState('success');

      if (mode === 'whatsapp') {
        const url = getWhatsAppOrderUrl(form, business);
        window.open(url, '_blank');
      }
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderState('checkout');
    setPlacedOrderData(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 my-8 overflow-hidden">
        
        {/* Modal Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* STATE 1: PROCESSING ANIMATION */}
        {orderState === 'processing' && (
          <div className="py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-500 animate-spin"></div>
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-amber-400">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-black text-white">Placing Your Order...</h3>
              <p className="text-xs text-slate-400 mt-1">Connecting with {business.name} kitchen...</p>
            </div>
          </div>
        )}

        {/* STATE 2: SUCCESS ORDER PLACED SCREEN (NO CHEAP BROWSER ALERT) */}
        {orderState === 'success' && placedOrderData && (
          <div className="py-6 space-y-6 animate-in fade-in zoom-in-95 duration-300">
            
            {/* Animated Celebration Icon */}
            <div className="text-center space-y-3">
              <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-2xl animate-bounce ${
                business.id === 'a3-kitchen' ? 'bg-amber-500 text-slate-950 shadow-amber-500/30' :
                business.id === 'froth-and-friends' ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30' :
                'bg-rose-600 text-white shadow-rose-600/30'
              }`}>
                <CheckCircle className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> ORDER CONFIRMED
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Order ID: <strong className="text-amber-400 font-mono">{placedOrderData.orderId}</strong>
                </p>
              </div>
            </div>

            {/* Delivery Status Banner */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Estimated Delivery Time</h4>
                  <p className="text-sm font-extrabold text-white mt-0.5">25 – 35 minutes</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Kitchen Preparing
              </span>
            </div>

            {/* Customer & Address Details */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Customer Name:</span>
                <span className="font-bold text-white">{placedOrderData.details.name}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Contact Number:</span>
                <span className="font-bold text-white">{placedOrderData.details.phone}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Fulfilment:</span>
                <span className="font-bold uppercase text-amber-400">{placedOrderData.details.orderType}</span>
              </div>

              {placedOrderData.details.orderType === 'delivery' && (
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Address:</span>
                  <span className="font-medium text-white text-right max-w-[240px] truncate">
                    {placedOrderData.details.address} ({placedOrderData.details.pincode})
                  </span>
                </div>
              )}
            </div>

            {/* Order Items Receipt Summary */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                <Receipt className="w-3.5 h-3.5 text-amber-400" />
                <span>Receipt Summary</span>
              </div>

              <div className="max-h-32 overflow-y-auto space-y-1.5 text-xs text-slate-300 pr-1">
                {placedOrderData.items.map(({ item, quantity }) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="truncate">{quantity}x {item.name}</span>
                    <span className="font-bold text-white">₹{(item.price ?? 0) * quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline text-sm font-extrabold text-white">
                <span>Grand Total Paid</span>
                <span className="text-xl text-amber-400">₹{placedOrderData.total}</span>
              </div>
            </div>

            {/* Success Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={getWhatsAppOrderUrl(placedOrderData.details, business)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-1/2 py-3.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Receipt</span>
              </a>

              <button
                onClick={handleClose}
                className="w-full sm:w-1/2 py-3.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all"
              >
                <span>Back to Restaurant</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* STATE 3: FORM CHECKOUT SCREEN */}
        {orderState === 'checkout' && (
          <>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center shrink-0">
                  <img src={business.logo} alt={business.name} className="w-full h-full object-contain p-0.5" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white">Complete Your Order</h3>
                  <p className="text-xs text-slate-400">{business.name} Checkout</p>
                </div>
              </div>
            </div>

            <form className="space-y-4">
              
              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs font-semibold text-rose-400">
                  {error}
                </div>
              )}

              {/* Order Type Tabs */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Order Type
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, orderType: 'delivery' })}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      form.orderType === 'delivery'
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🚀 Home Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, orderType: 'pickup' })}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      form.orderType === 'pickup'
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    🛍️ Pickup / Dining
                  </button>
                </div>
              </div>

              {/* Customer Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1 mb-1">
                    <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1 mb-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Delivery Address Fields */}
              {form.orderType === 'delivery' && (
                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-xs font-medium text-slate-300 flex items-center gap-1 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> Delivery Street Address *
                    </label>
                    <input
                      type="text"
                      placeholder="House/Flat No., Building, Area"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-slate-300 mb-1 block">
                        Landmark (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Near landmark"
                        value={form.landmark}
                        onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-300 mb-1 block">
                        Pincode
                      </label>
                      <input
                        type="text"
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Order Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
                  Order Summary ({cart.length} items)
                </h4>
                <div className="max-h-28 overflow-y-auto space-y-1.5 text-xs text-slate-300 pr-1">
                  {cart.map(({ item, quantity }) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="truncate">{quantity}x {item.name}</span>
                      <span className="font-semibold shrink-0">₹{(item.price ?? 0) * quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white font-semibold">₹{cartSubtotal}</span>
                  </div>
                  {form.orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="text-white font-semibold">₹40</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1 border-t border-slate-800 text-sm font-extrabold text-white">
                    <span>Grand Total</span>
                    <span className="text-amber-400 text-base">₹{grandTotal}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handlePlaceOrder('whatsapp')}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>ORDER VIA WHATSAPP</span>
                </button>

                <button
                  type="button"
                  onClick={() => handlePlaceOrder('card')}
                  className="w-full py-3.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center justify-center gap-2 transition-all"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>PAY & PLACE ORDER</span>
                </button>
              </div>

            </form>
          </>
        )}

      </div>
    </div>
  );
};
