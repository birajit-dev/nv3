'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

const sampleAds: Record<string, AdConfig[]> = {
  sidebar: [
    {
      id: 'sidebar-1',
      title: 'ONGC Advertisement',
      image: 'https://app.neherald.com/images/ongc_ads.png',
      width: 300,
      height: 600,
    },
    {
      id: 'sidebar-2',
      title: 'ICFAI University',
      image: 'https://i.ibb.co/3529h4qD/icfai-ads.png',
      width: 300,
      height: 250,
    },
  ],
  horizontal: [
    {
      id: 'horizontal-1',
      title: 'Banking Services',
      image: '#',
      width: 728,
      height: 90,
    },
  ],
  square: [
    {
      id: 'square-1',
      title: 'Education Services',
      image: '#',
      width: 300,
      height: 300,
    },
  ],
  mobile: [
    {
      id: 'mobile-1',
      title: 'Mobile App',
      image: '#',
      width: 320,
      height: 100,
    },
  ],
};

export default function AdBanner({ type, className = '' }: AdBannerProps) {
  const [currentAd, setCurrentAd] = useState<AdConfig | null>(null);

  useEffect(() => {
    const ads = sampleAds[type] || [];
    if (ads.length > 0) {
      const randomIndex = Math.floor(Math.random() * ads.length);
      setCurrentAd(ads[randomIndex]);
    }
  }, [type]);

  if (!currentAd) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <div className="text-xs text-gray-400 mb-1">Advertisement</div>
      <div className="border border-gray-200 rounded overflow-hidden bg-white">
        <div className="relative" style={{ width: currentAd.width, height: currentAd.height, maxWidth: '100%' }}>
          <Image
            src={currentAd.image}
            alt={currentAd.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
        </div>
      </div>
    </div>
  );
}
