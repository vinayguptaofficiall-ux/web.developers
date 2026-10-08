import React from 'react';
import type { Business } from '../data/businesses';
import { Phone, Navigation, MessageCircle, ArrowRight } from 'lucide-react';

interface ContactCTAProps {
  business: Business;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ business }) => {
  return (
    <section id="contact" className={`py-20 sm:py-28 bg-gradient-to-b ${business.theme.heroGradient} border-t border-slate-900 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-bold text-slate-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Now Accepting Orders & Visitors</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Planning a visit to {business.name}?
          </h2>

          <p className="text-base sm:text-xl text-slate-300 max-w-xl mx-auto leading-relaxed">
            Drop by today or give us a call for table reservations, takeaway orders, and menu details in {business.address.area}.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            
            <a
              href={`tel:${business.phone}`}
              className={`px-8 py-4 rounded-2xl text-sm font-black flex items-center gap-2 ${business.theme.buttonClass} transition-all transform hover:-translate-y-0.5 shadow-2xl`}
            >
              <Phone className="w-4 h-4" />
              <span>Call Now ({business.phone})</span>
            </a>

            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white flex items-center gap-2 transition-all"
            >
              <Navigation className="w-4 h-4 text-amber-400" />
              <span>Get Directions</span>
            </a>

            {business.whatsappNumber && (
              <a
                href={`https://wa.me/${business.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl text-sm font-bold bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 transition-all shadow-xl shadow-emerald-600/20"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
