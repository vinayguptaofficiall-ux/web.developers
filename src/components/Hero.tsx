import React from 'react';
import type { Business } from '../data/businesses';
import { Star, MapPin, ArrowRight, Utensils, Calendar, Sparkles, Navigation, ShoppingBag } from 'lucide-react';

interface HeroProps {
  business: Business;
}

export const Hero: React.FC<HeroProps> = ({ business }) => {
  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950">
      
      {/* Background High-Res Photography with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={business.hero.bgImage}
          alt={business.name}
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${business.theme.heroGradient}`}></div>
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Decorative Glow */}
      <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-20 pointer-events-none ${business.theme.accentGlow}`}></div>

      {/* Main Hero Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10 w-full text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Top Verified Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold border bg-slate-950/80 backdrop-blur-md shadow-xl border-slate-700/80">
              <span className={`w-2.5 h-2.5 rounded-full animate-ping ${
                business.id === 'a3-kitchen' ? 'bg-amber-400' :
                business.id === 'froth-and-friends' ? 'bg-emerald-400' :
                'bg-rose-400'
              }`}></span>
              <span className="text-slate-200">{business.hero.highlightBadge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.1]">
              {business.hero.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {business.hero.subheadline}
            </p>

            {/* Key Quick Facts */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-extrabold text-white">{business.rating}</span>
                <span className="text-slate-400">({business.reviewCount}+ Google Reviews)</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>{business.address.area}</span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Opened {business.openedDate}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className={`px-8 py-4 rounded-2xl text-sm font-extrabold flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-2xl ${business.theme.buttonClass}`}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#menu"
                className="px-8 py-4 rounded-2xl text-sm font-bold bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700 text-white flex items-center gap-2 backdrop-blur-xl transition-all"
              >
                <Utensils className="w-4 h-4 text-amber-400" />
                <span>VIEW MENU</span>
              </a>

              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-2xl text-sm font-bold bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-2 transition-all"
              >
                <Navigation className="w-4 h-4 text-slate-400" />
                <span>DIRECTIONS</span>
              </a>
            </div>

          </div>

          {/* Right Floating Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800/90 shadow-2xl backdrop-blur-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center shrink-0">
                    <img src={business.logo} alt={business.name} className="w-full h-full object-contain p-0.5" />
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Verified Listing</span>
                    <h3 className="text-xl font-black text-white mt-0.5">{business.name}</h3>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${business.theme.badgeStyle}`}>
                  {business.category}
                </span>
              </div>

              <div className="space-y-3">
                {business.highlights.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      business.id === 'a3-kitchen' ? 'bg-amber-500/20 text-amber-400' :
                      business.id === 'froth-and-friends' ? 'bg-emerald-500/20 text-emerald-400' :
                      'bg-rose-500/20 text-rose-400'
                    }`}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  {business.hours.status} Today
                </span>
                <span>{business.hours.weekdays}</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
