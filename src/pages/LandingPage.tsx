import React from 'react';
import { Link } from 'react-router-dom';
import { BUSINESSES } from '../data/businesses';
import { Store, MapPin, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      <Helmet>
        <title>Vijayawada Dining Hub | 3 Real Local Spots in One Platform</title>
        <meta name="description" content="Explore A3 Kitchen, Froth and Friends Cafe, and Arise Cafe in Vijayawada. Unified platform featuring verified menus, ratings, locations & directions." />
      </Helmet>

      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight">Vijayawada Business Hub</h1>
              <p className="text-[11px] text-slate-400 font-medium">3 Premium Local Spots</p>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Listings</span>
          </div>
        </div>
      </header>

      <main className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Unified Multi-Tenant Platform</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Discover 3 Popular Local Spots in Vijayawada
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Choose a business below to experience their complete menu, opening hours, gallery, and location details inside one seamless platform.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(BUSINESSES).map((biz) => (
            <Link
              key={biz.id}
              to={`/${biz.slug}`}
              className={`group p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-2xl flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden ${biz.theme.cardBorder}`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-900 flex items-center justify-center shadow-inner">
                    <img src={biz.logo} alt={biz.name} className="w-full h-full object-contain p-1" />
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${biz.theme.badgeStyle}`}>
                    Est. {biz.openedDate}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                  {biz.name}
                </h3>
                <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
                  {biz.category}
                </p>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {biz.tagline}
                </p>

                <div className="mt-6 space-y-2 text-xs text-slate-400 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="truncate text-slate-300 font-medium">{biz.address.area}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {biz.rating} ({biz.reviewCount} reviews)
                    </span>
                    <span className="text-[11px] text-slate-400">Google Maps</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-amber-400 transition-colors">
                  Enter {biz.brandTitle}
                </span>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${biz.theme.buttonClass} transition-transform group-hover:translate-x-1`}>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

            </Link>
          ))}
        </div>

      </main>

      <footer className="py-6 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-400">
        <p>© {new Date().getFullYear()} Vijayawada Local Business Platform. Verified profiles for A3 Kitchen, Froth & Friends Cafe, and Arise Cafe.</p>
      </footer>
    </div>
  );
};
