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
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/85 backdrop-blur-2xl border-b border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-md shrink-0">
              <img
                src={currentBusiness.logo}
                alt={currentBusiness.name}
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <div>
              <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                {currentBusiness.name}
              </span>
              <p className="text-[11px] font-semibold text-slate-400 truncate max-w-[170px] sm:max-w-none">
                {currentBusiness.category}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 transition-all duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side Desktop Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-lg">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <a
              href="#menu"
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold ${currentBusiness.theme.buttonClass} transition-all`}
            >
              Order Now
            </a>

            {/* Business Switcher */}
            <BusinessSwitcher currentBusiness={currentBusiness} variant="navbar" />
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            {/* Mobile Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[9px] flex items-center justify-center">
                  {cartTotalCount}
                </span>
              )}
            </button>

            <BusinessSwitcher currentBusiness={currentBusiness} variant="navbar" />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${currentBusiness.phone}`}
              className={`w-full py-3 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-2 ${currentBusiness.theme.buttonClass}`}
            >
              <Phone className="w-4 h-4" />
              <span>Call {currentBusiness.name}</span>
            </a>

            <a
              href={currentBusiness.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl text-center text-xs font-bold bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-800 flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
