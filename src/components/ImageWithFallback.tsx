import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';
import menuImages from '../data/menu-images.json';

type MenuImagesMap = Record<string, Record<string, string>>;

const MAP = menuImages as MenuImagesMap;

interface ImageWithFallbackProps {
  /** Exact item name as it appears in the menu JSON */
  itemName: string;
  /** Restaurant slug: 'a3-kitchen' | 'froth-and-friends' | 'arise-cafe' */
  restaurantSlug: string;
  /** Fallback src — used only if no mapping exists (e.g. a pre-existing Unsplash URL) */
  fallbackSrc?: string | null;
  alt: string;
  className?: string;
  accentColor?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  itemName,
  restaurantSlug,
  fallbackSrc,
  alt,
  className = '',
  accentColor = '#f59e0b',
}) => {
  const [imgError, setImgError] = useState(false);

  // 1. Look up exact mapping first
  const mappedSrc = MAP[restaurantSlug]?.[itemName] ?? null;

  // 2. Decide which src to use
  const src = mappedSrc ?? (fallbackSrc && fallbackSrc.trim() !== '' ? fallbackSrc : null);

  // 3. If no src or image failed to load → branded placeholder
  if (!src || imgError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-slate-900 gap-2 ${className}`}
        aria-label={alt}
      >
        <UtensilsCrossed className="w-7 h-7 opacity-20" style={{ color: accentColor }} />
        <span className="text-[10px] font-semibold text-slate-600 text-center px-2 leading-tight line-clamp-2">
          {itemName}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setImgError(true)}
      className={`object-cover w-full h-full ${className}`}
    />
  );
};
