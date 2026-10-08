import React from 'react';
import type { Business } from '../data/businesses';
import {
  Star, MapPin, ArrowRight, Utensils,
  Clock, ShoppingBag, Navigation, Phone,
} from 'lucide-react';

interface HeroProps {
  business: Business;
}

export const Hero: React.FC<HeroProps> = ({ business }) => {
  const accent = business.theme.accentHex;
  const isA3 = business.id === 'a3-kitchen';
  const isFroth = business.id === 'froth-and-friends';

  const pulseDot = isA3
    ? 'bg-amber-400'
    : isFroth
    ? 'bg-emerald-400'
    : 'bg-rose-400';

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-end sm:items-center overflow-hidden bg-slate-950"
    >
      {/* ── Cinematic Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={business.hero.bgImage}
          alt={business.name}
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* multi-layer gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
      </div>

      {/* ── Accent glow ── */}
      <div
        className="absolute bottom-0 left-0 w-[700px] h-[400px] rounded-full blur-[120px] opacity-20 pointer-events-none"
        style={{ background: accent }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* LEFT — text */}
          <div className="lg:col-span-7 space-y-7">

            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-950/70 border border-slate-700/60 backdrop-blur-xl shadow-xl">
              <span className={`relative flex h-2.5 w-2.5`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${pulseDot}`} />
                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${pulseDot}`} />
              </span>
              <span className="text-xs font-bold text-slate-200 tracking-wide">
                {business.hero.highlightBadge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              {business.hero.headline
                .split(' ')
                .reduce<React.ReactNode[]>((acc, word, i, arr) => {
                  // last 2 words get accent colour
                  const isAccent = i >= arr.length - 2;
                  acc.push(
                    <span
                      key={i}
                      style={isAccent ? { color: accent } : undefined}
                    >
                      {word}
                      {i < arr.length - 1 ? ' ' : ''}
                    </span>
                  );
                  return acc;
                }, [])}
            </h1>

            {/* Sub */}
            <p className="text-base sm:text-lg text-slate-300/90 max-w-xl leading-relaxed">
              {business.hero.subheadline}
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2.5">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                <span className="text-sm font-extrabold text-white">{business.rating}</span>
                <span className="text-xs text-slate-400">{business.reviewCount}+ reviews</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-300">{business.address.area}</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-xs text-slate-300">{business.hours.weekdays}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <a
                href="#menu"
                className={`group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 shadow-2xl ${business.theme.buttonClass}`}
              >
                <ShoppingBag className="w-4 h-4" />
                Order Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href="#menu"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-sm font-bold bg-white/10 hover:bg-white/15 border border-white/20 text-white backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <Utensils className="w-4 h-4" />
                View Menu
              </a>

              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2.5 px-5 py-4 rounded-2xl text-sm font-bold bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-xl transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Call</span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-5 py-4 rounded-2xl text-sm font-bold bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white backdrop-blur-xl transition-all duration-200"
              >
                <Navigation className="w-4 h-4" />
                <span className="hidden sm:inline">Directions</span>
              </a>
            </div>

          </div>

          {/* RIGHT — floating card (desktop only) */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="w-full max-w-sm rounded-3xl bg-slate-900/80 border border-slate-700/60 shadow-2xl backdrop-blur-2xl overflow-hidden">

              {/* Card header */}
              <div
                className="px-6 py-5 flex items-center gap-4 border-b border-slate-800"
                style={{ background: `linear-gradient(135deg, ${accent}18, transparent)` }}
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0 bg-slate-900 flex items-center justify-center"
                  style={{ borderColor: `${accent}40` }}>
                  <img src={business.logo} alt={business.name} className="w-full h-full object-contain p-1" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Now Open</p>
                  <h3 className="text-lg font-black text-white truncate">{business.name}</h3>
                  <p className="text-xs text-slate-400 truncate">{business.category}</p>
                </div>
              </div>

              {/* Highlights */}
              <div className="px-5 py-4 space-y-3">
                {business.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-black"
                      style={{ background: `${accent}20`, color: accent }}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{item.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-5 pb-5">
                <a
                  href="#menu"
                  className={`w-full py-3.5 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 ${business.theme.buttonClass}`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  Browse Full Menu
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom fade into next section ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
    </section>
  );
};
