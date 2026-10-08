import React from 'react';
import type { Business } from '../data/businesses';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react';

interface LocationSectionProps {
  business: Business;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ business }) => {
  return (
    <section id="location" className="py-20 sm:py-28 bg-slate-950/90 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Vijayawada Location</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Find & Visit Us
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Easily navigate to {business.name} in {business.address.area}.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card */}
          <div className="lg:col-span-5 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6 shadow-2xl">
            <div className="space-y-6">
              
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${business.theme.badgeStyle}`}>
                  {business.category}
                </span>
                <h3 className="text-2xl font-black text-white mt-2">{business.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Est. Opened: {business.openedDate}</p>
              </div>

              {/* Address Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Address</h4>
                  <p className="text-sm font-bold text-white mt-0.5 leading-relaxed">
                    {business.address.fullAddress}
                  </p>
                  {business.address.landmark && (
                    <p className="text-xs text-slate-400 mt-1">
                      Landmark: {business.address.landmark}
                    </p>
                  )}
                </div>
              </div>

              {/* Hours Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="w-full">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Operating Hours</h4>
                  <div className="mt-1 space-y-1 text-xs text-slate-200">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mon - Fri:</span>
                      <span className="font-semibold">{business.hours.weekdays}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Sat - Sun:</span>
                      <span className="font-semibold">{business.hours.weekends}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone Item */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Telephone Contact</h4>
                  <a href={`tel:${business.phone}`} className="text-base font-extrabold text-white hover:text-amber-400 transition-colors">
                    {business.phone}
                  </a>
                </div>
              </div>

            </div>

            {/* Direct Directions Button */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-4 rounded-2xl text-xs font-extrabold ${business.theme.buttonClass} flex items-center justify-center gap-2 shadow-xl transition-all`}
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

          </div>

          {/* Right Google Maps Styled Interactive Preview */}
          <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden relative min-h-[400px] flex flex-col justify-between p-8 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-pulse"></div>
                <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">Live Google Location Pin</span>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-400 font-medium">
                Vijayawada, AP
              </span>
            </div>

            {/* Visual Location Card */}
            <div className="my-auto py-8 text-center space-y-4 max-w-md mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 text-amber-400 mx-auto flex items-center justify-center shadow-inner">
                <Navigation className="w-10 h-10" />
              </div>
              <h4 className="text-2xl font-black text-white">{business.name}</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                {business.address.fullAddress}
              </p>

              <div className="pt-2 flex justify-center gap-3 flex-wrap">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 transition-all shadow-lg"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>
                <a
                  href={business.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View on Maps</span>
                </a>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Est. {business.openedDate}
              </span>
              <span className="text-emerald-400 font-bold">Verified Business Coordinates</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
