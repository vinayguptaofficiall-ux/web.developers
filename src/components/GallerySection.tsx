import React, { useState } from 'react';
import type { Business, BusinessGalleryItem } from '../data/businesses';
import { Image as ImageIcon, X, Maximize2, Sparkles } from 'lucide-react';

interface GallerySectionProps {
  business: Business;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ business }) => {
  const [selectedItem, setSelectedItem] = useState<BusinessGalleryItem | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-slate-950/90 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300">
            <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Venue & Food Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Spot Gallery & Ambience
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Real food preparations & dining atmosphere for {business.name}.
          </p>
        </div>

        {/* Asymmetric Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {business.gallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer shadow-xl border border-slate-800 hover:border-slate-700 transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

              {/* Top Category Badge & Expand Icon */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${business.theme.badgeStyle}`}>
                  {item.category}
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-950/70 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-slate-900 backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Caption & Title */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-1 truncate">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex items-center justify-center p-4">
            <div className="relative max-w-3xl w-full rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-4">
              
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${business.theme.badgeStyle}`}>
                    {selectedItem.category}
                  </span>
                  <span className="text-xs text-slate-400">• Verified Venue Asset</span>
                </div>
                <h4 className="text-xl font-extrabold text-white">{selectedItem.title}</h4>
                <p className="text-xs text-slate-300 mt-1">{selectedItem.caption}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-4">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  {business.name} — Vijayawada
                </span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700"
                >
                  Close Lightbox
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
