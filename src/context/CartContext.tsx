import React, { createContext, useContext, useState, useEffect } from 'react';
import type { MenuItem, Business } from '../data/businesses';

export interface CartItem {
  item: MenuItem;
  quantity: number;
  businessId: string;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  orderType: 'delivery' | 'pickup';
  address?: string;
  landmark?: string;
  pincode?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, businessId: string, qty?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedFoodItem: MenuItem | null;
  setSelectedFoodItem: (item: MenuItem | null) => void;
  getWhatsAppOrderUrl: (details: CustomerDetails, business: Business) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('multi_business_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('multi_business_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToCart = (item: MenuItem, businessId: string, qty: number = 1) => {
    setCart((prevCart) => {
      // If adding from a different business, confirm/switch cart scope
      const existingBusinessItem = prevCart.find((ci) => ci.businessId !== businessId);
      let newCart = existingBusinessItem ? [] : [...prevCart];

      const existingIndex = newCart.findIndex((ci) => ci.item.id === item.id);
      if (existingIndex > -1) {
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + qty,
        };
      } else {
        newCart.push({ item, quantity: qty, businessId });
      }
      return newCart;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotalCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const cartSubtotal = cart.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

  const getWhatsAppOrderUrl = (details: CustomerDetails, business: Business) => {
    const deliveryFee = details.orderType === 'delivery' ? 40 : 0;
    const grandTotal = cartSubtotal + deliveryFee;

    const itemsText = cart
      .map(
        (ci) =>
          `• ${ci.quantity}x ${ci.item.name} (₹${ci.item.price * ci.quantity})`
      )
      .join('\n');

    const message = `*NEW ORDER FOR ${business.name.toUpperCase()}*

*Customer Details:*
• Name: ${details.name}
• Phone: ${details.phone}
• Type: ${details.orderType.toUpperCase()}
${details.orderType === 'delivery' ? `• Address: ${details.address}, ${details.landmark || ''} (${details.pincode})` : ''}

*Order Items:*
${itemsText}

-----------------------------
*Subtotal:* ₹${cartSubtotal}
${details.orderType === 'delivery' ? `*Delivery Fee:* ₹${deliveryFee}\n` : ''}*Grand Total:* ₹${grandTotal}

_Sent via ${business.name} Website Hub_`;

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedFoodItem,
        setSelectedFoodItem,
        getWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
