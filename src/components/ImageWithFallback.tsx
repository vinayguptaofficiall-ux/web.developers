import React, { useState } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  aspectRatio?: string;
  accentColor?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = '4/3',
  accentColor = '#f59e0b',
}) => {
  const [failed, setFailed] = useState(false);
  const hasSrc = src && src.trim() !== '';

  if (!hasSrc || failed) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-900 ${className}`}
        style={{ aspectRatio }}
        aria-label={alt}
      >
        <UtensilsCrossed
          className="w-8 h-8 opacity-20"
          style={{ color: accentColor }}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover w-full h-full ${className}`}
      style={{ aspectRatio }}
    />
  );
};
