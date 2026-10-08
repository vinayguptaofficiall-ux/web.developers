import React from 'react';
import type { Business } from '../data/businesses';
import { MapPin, Phone, Clock, Star, Calendar, CheckCircle2, ShieldCheck, Navigation } from 'lucide-react';

interface BusinessInfoProps {
  business: Business;
}

export const BusinessInfo: React.FC<BusinessInfoProps> = ({ business }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-slate-950 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Local Business Details</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            About {business.name}
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Key operational details, verified contact information, and Google location.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Google Rating</h3>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{business.rating}</span>
              <span className="text-sm text-amber-400 font-bold">/ 5.0</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">
              Based on {business.reviewCount}+ verified customer reviews on Google Maps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Operating Hours</h3>
            <div className="mt-2 space-y-1 text-xs sm:text-sm">
              <div className="flex justify-between text-slate-200">
                <span className="text-slate-400">Mon – Fri:</span>
                <span className="font-semibold">{business.hours.weekdays}</span>
              </div>
              <div className="flex justify-between text-slate-200">
                <span className="text-slate-400">Sat – Sun:</span>
                <span className="font-semibold">{business.hours.weekends}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{business.hours.status} Today</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Address</h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              {business.address.fullAddress}
            </p>
            {business.address.landmark && (
              <p className="mt-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">Landmark:</span> {business.address.landmark}
              </p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-200">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Phone & Info</h3>
            <a
              href={`tel:${business.phone}`}
              className="mt-1 text-base font-bold text-white hover:text-amber-400 transition-colors block"
            >
              {business.phone}
            </a>
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Opened: <strong className="text-slate-200">{business.openedDate}</strong></span>
            </div>
          </div>

        </div>

        <div className="mt-10 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Open in Google Maps</h4>
              <p className="text-xs text-slate-400">Navigate directly to {business.name} in Vijayawada</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold ${business.theme.buttonClass} transition-all`}
            >
              Get Directions
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
