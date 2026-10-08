import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Business } from '../data/businesses';
import { useCart } from '../context/CartContext';
import { BusinessSwitcher } from './BusinessSwitcher';
import { Menu as MenuIcon, X, Phone, MapPin, ShoppingBag } from 'lucide-react';

interface NavbarProps {
  currentBusiness: Business;
}

export const Navbar: React.FC<NavbarProps> = ({ currentBusiness }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartTotalCount, setIsCartOpen } = useCart();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Menu', href: '#menu' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-20 gap-2">

          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center shrink-0">
              <img src={currentBusiness.logo} alt={currentBusiness.name} className="w-full h-full object-contain p-0.5" />
            </div>
            <div className="min-w-0">
              <span className="block text-sm sm:text-lg font-black tracking-tight text-white truncate max-w-[120px] sm:max-w-none">
                {currentBusiness.name}
              </span>
              <span className="hidden sm:block text-[11px] font-semibold text-slate-400 truncate">
                {currentBusiness.category}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right */}
          <div className="hidden sm:flex items-center gap-3">
            <button onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              aria-label="Open Cart">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg">
                  {cartTotalCount}
                </span>
              )}
            </button>
            <a href="#menu" className={`px-4 py-2.5 rounded-2xl text-xs font-bold ${currentBusiness.theme.buttonClass} transition-all`}>
              Order Now
            </a>
            <BusinessSwitcher currentBusiness={currentBusiness} variant="navbar" />
          </div>

          {/* Mobile Right — cart + switcher + hamburger */}
          <div className="flex sm:hidden items-center gap-1.5 shrink-0">
            <button onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800"
              aria-label="Open Cart">
              <ShoppingBag className="w-4.5 h-4.5 text-amber-400 w-[18px] h-[18px]" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {cartTotalCount}
                </span>
              )}
            </button>

            <BusinessSwitcher currentBusiness={currentBusiness} variant="navbar" />

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Toggle Menu">
              {mobileMenuOpen ? <X className="w-[18px] h-[18px]" /> : <MenuIcon className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-4 pt-2 pb-5">
          {/* Business Switcher at top of drawer */}
          <div className="mb-3 pb-3 border-b border-slate-800">
            <BusinessSwitcher currentBusiness={currentBusiness} variant="navbar" />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all">
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a href={`tel:${currentBusiness.phone}`}
              className={`w-full py-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 ${currentBusiness.theme.buttonClass}`}>
              <Phone className="w-4 h-4" />
              <span>Call {currentBusiness.name}</span>
            </a>
            <a href={currentBusiness.googleMapsUrl} target="_blank" rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-center text-xs font-bold bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
