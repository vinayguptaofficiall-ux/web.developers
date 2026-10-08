import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BUSINESSES, type Business } from '../data/businesses';
import { ChevronDown, Check, Store, MapPin, Calendar, Star } from 'lucide-react';

interface BusinessSwitcherProps {
  currentBusiness: Business;
  variant?: 'navbar' | 'floating' | 'footer';
}

export const BusinessSwitcher: React.FC<BusinessSwitcherProps> = ({ currentBusiness, variant = 'navbar' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    navigate(`/${slug}`);
  };

  const getBusinessIcon = (biz: typeof currentBusiness) => (
    <img src={biz.logo} alt={biz.name} className="w-full h-full object-contain p-0.5" />
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 px-3.5 py-2 rounded-2xl border transition-all duration-200 group text-left ${
          variant === 'footer'
            ? 'bg-slate-900 border-slate-800 hover:border-slate-700 w-full sm:w-auto'
            : 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-700/60 hover:border-slate-600 shadow-xl backdrop-blur-xl'
        }`}
        aria-label="Switch Business"
      >
        <div className={`w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-inner shrink-0 border ${
          currentBusiness.id === 'a3-kitchen' ? 'bg-amber-500/10 border-amber-500/20' :
          currentBusiness.id === 'froth-and-friends' ? 'bg-emerald-500/10 border-emerald-500/20' :
          'bg-rose-500/10 border-rose-500/20'
        }`}>
          {getBusinessIcon(currentBusiness)}
        </div>

        <div className="flex-1 min-w-[130px] max-w-[190px]">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Switch Spot</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-sm font-extrabold text-white truncate group-hover:text-amber-400 transition-colors">
            {currentBusiness.name}
          </p>
        </div>

        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-white' : 'group-hover:text-slate-300'}`} />
      </button>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-3xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Switch Restaurant</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
              3 Spots Available
            </span>
          </div>

          <div className="p-2 space-y-2 max-h-[420px] overflow-y-auto">
            {Object.values(BUSINESSES).map((biz) => {
              const isSelected = biz.id === currentBusiness.id;
              return (
                <button
                  key={biz.id}
                  onClick={() => handleSelect(biz.slug)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 border flex items-start gap-3.5 relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-amber-500/50 shadow-inner'
                      : 'bg-slate-950/40 hover:bg-slate-800/50 border-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center shrink-0 border ${
                    biz.id === 'a3-kitchen' ? 'bg-amber-500/10 border-amber-500/20' :
                    biz.id === 'froth-and-friends' ? 'bg-emerald-500/10 border-emerald-500/20' :
                    'bg-rose-500/10 border-rose-500/20'
                  }`}>
                    {getBusinessIcon(biz)}
                  </div>

                  <div className="flex-1 min-w-0 pr-6">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white truncate">{biz.name}</h4>
                      {isSelected && (
                        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{biz.category}</p>
                    
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1 text-slate-300">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {biz.address.area}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {biz.rating} ({biz.reviewCount})
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Opened {biz.openedDate}
                    </div>
                  </div>

                  {isSelected && (
                    <div className="absolute right-3.5 top-3.5 w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              Unified Vijayawada local business platform
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
