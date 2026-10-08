import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESSES, type Business } from '../data/businesses';
import { BusinessSwitcher } from './BusinessSwitcher';
import { MapPin, Phone, Clock, Store, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  business: Business;
}

export const Footer: React.FC<FooterProps> = ({ business }) => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center shrink-0">
                <img src={business.logo} alt={business.name} className="w-full h-full object-contain p-0.5" />
              </div>
              <div>
                <span className="text-lg font-black text-white">{business.name}</span>
                <span className={`ml-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${business.theme.badgeStyle}`}>
                  Active Restaurant
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {business.tagline}. Located in {business.address.area}, Vijayawada.
            </p>

            <div className="space-y-2 pt-1 text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{business.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{business.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{business.hours.weekdays}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2.5 text-slate-300">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Spot</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">View Menu & Order</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Spot Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Guest Reviews</a></li>
              <li><a href="#location" className="hover:text-white transition-colors">Google Location</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">All 3 Spots</h4>
            <ul className="space-y-2.5 text-slate-300">
              {Object.values(BUSINESSES).map((b) => (
                <li key={b.id}>
                  <Link
                    to={`/${b.slug}`}
                    className={`flex items-center justify-between hover:text-white transition-colors ${
                      b.id === business.id ? 'text-amber-400 font-bold' : ''
                    }`}
                  >
                    <span>{b.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Switch Business</h4>
            <p className="text-slate-400 text-[11px]">
              Switch to another local spot in Vijayawada:
            </p>
            <BusinessSwitcher currentBusiness={business} variant="footer" />
          </div>

        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <Store className="w-4 h-4 text-amber-400" />
            <span>Unified Local Business Platform — Vijayawada</span>
          </div>

          <div>
            <span>© {new Date().getFullYear()} {business.name}. All verified rights reserved.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
