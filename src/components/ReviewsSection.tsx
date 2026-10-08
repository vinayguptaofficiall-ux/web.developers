import React from 'react';
import type { Business, BusinessReview } from '../data/businesses';
import { Star, MessageSquareQuote, ExternalLink, ShieldCheck } from 'lucide-react';

interface ReviewsSectionProps {
  business: Business;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ business }) => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Customer Reviews</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Guest Experiences
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real feedback shared by dining guests at {business.name}.
          </p>
        </div>

        {/* Rating Banner */}
        <div className="mt-12 p-8 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto shadow-2xl">
          <div className="flex items-center gap-5 text-center sm:text-left">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-3xl font-black shrink-0">
              {business.rating}
            </div>
            <div>
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="text-xl font-extrabold text-white mt-1">Excellent Public Reputation</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Over {business.reviewCount}+ verified customer ratings on Google Maps.
              </p>
            </div>
          </div>

          <a
            href={business.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl text-xs font-bold ${business.theme.buttonClass} flex items-center justify-center gap-2 transition-all shadow-lg`}
          >
            <span>Read Reviews on Google</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Review Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {business.reviews.map((rev: BusinessReview) => (
            <div
              key={rev.id}
              className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 text-slate-200 font-black text-xs flex items-center justify-center">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{rev.author}</h4>
                      <span className="text-[10px] text-slate-400">{rev.source} • {rev.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(rev.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative pt-1">
                  <MessageSquareQuote className="w-6 h-6 text-slate-800 absolute -top-1 -left-2 -z-0" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed relative z-10 italic">
                    "{rev.comment}"
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Diner
                </span>
                <span>Vijayawada</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
