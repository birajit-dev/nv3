'use client';

import { useState, useEffect } from 'react';

interface AdBannerProps {
  type: 'sidebar' | 'horizontal' | 'square' | 'mobile';
  className?: string;
}

interface AdConfig {
  id: string;
  title: string;
  image: string;
  width: number;
  height: number;
}

// Validate image paths exist
const validateImagePath = (path: string): boolean => {
  // In a real app, you might want to check if the file exists
  // For now, we'll just ensure the path is properly formatted
  return path.startsWith('/') && path.includes('.');
};

const sampleAds: Record<string, AdConfig[]> = {
  sidebar: [
    {
      id: 'sidebar-1',
      title: 'ONGC Advertisement',
      image: '/images/ads/ongc_ads.avif',
      width: 300,
      height: 600,
    },
    {
      id: 'sidebar-2',
      title: 'ICFAI University',
      image: '/images/ads/icfai.avif',
      width: 300,
      height: 250,
    },
  ],
  horizontal: [
    {
      id: 'horizontal-1',
      title: 'Banking Services',
      image: '/images/ads/shyam.avif',
      width: 728,
      height: 90,
    },
  ],
  square: [
    {
      id: 'square-1',
      title: 'Education Services',
      image: '/images/ads/smart-meter.avif',
      width: 300,
      height: 300,
    },
  ],
  mobile: [
    {
      id: 'mobile-1',
      title: 'Mobile App',
      image: '/images/ads/smart-meter.avif',
      width: 320,
      height: 100,
    },
  ],
};

export default function AdBanner({ type, className = '' }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState<AdConfig | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const ads = sampleAds[type] || [];
    if (ads.length > 0) {
      // Filter ads with valid image paths
      const validAds = ads.filter(ad => validateImagePath(ad.image));
      if (validAds.length > 0) {
        const randomIndex = Math.floor(Math.random() * validAds.length);
        setCurrentAd(validAds[randomIndex]);
        setImageError(false);
      } else {
        console.warn(`No valid ads found for type: ${type}`);
        setCurrentAd(null);
      }
    }
  }, [type]);

  if (!currentAd) {
    return null;
  }

  if (imageError) {
    return (
      <div className={`${className}`}>
        <div className="text-xs text-gray-400 mb-1">Advertisement</div>
        <div className="border border-gray-200 rounded overflow-hidden bg-gray-100 p-4 text-center">
          <p className="text-sm text-gray-500">Ad content unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <div className="text-xs text-gray-400 mb-1">Advertisement</div>
      <div className="border border-gray-200 rounded overflow-hidden bg-white">
        <div 
          className="relative" 
          style={{
            width: '100%',
            maxWidth: currentAd.width,
            aspectRatio: `${currentAd.width}/${currentAd.height}`,
          }}
        >
          <img
            src={currentAd.image}
            alt={currentAd.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Failed to load image: ${currentAd.image}`, e);
              setImageError(true);
            }}
            onLoad={() => {
              console.log(`Successfully loaded image: ${currentAd.image}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
