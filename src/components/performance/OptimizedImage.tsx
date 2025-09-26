'use client';
import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  fill = false
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Optimize image URL for better performance
  const getOptimizedSrc = (originalSrc: string) => {
    // If it's already optimized, return as is
    if (originalSrc.includes('w_') || originalSrc.includes('q_auto')) {
      return originalSrc;
    }

    // For app.neherald.com, return as is
    if (originalSrc.startsWith('https://app.neherald.com')) {
      return originalSrc;
    }

    // For external URLs, add optimization parameters
    if (originalSrc.startsWith('https://') || originalSrc.startsWith('http://')) {
      try {
        const url = new URL(originalSrc);
        
        // Add WebP format and quality optimization
        if (url.hostname.includes('ibb.co') || url.hostname.includes('i.imgur.com')) {
          // For common image hosting services, use their optimization
          return originalSrc;
        }
        
        // For other services, try to add optimization parameters
        url.searchParams.set('w', width?.toString() || '800');
        url.searchParams.set('q', 'auto');
        url.searchParams.set('f', 'webp');
        
        return url.toString();
      } catch {
        return originalSrc;
      }
    }

    return originalSrc;
  };

  const optimizedSrc = getOptimizedSrc(src);

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image failed to load</span>
      </div>
    );
  }

  const imageProps = {
    src: optimizedSrc,
    alt,
    className: `transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`,
    priority,
    onLoad: () => setIsLoading(false),
    onError: () => {
      setHasError(true);
      setIsLoading(false);
    },
    ...(fill ? { fill: true } : { width, height }),
    sizes
  };

  return (
    <div className={`relative ${fill ? 'w-full h-full' : ''}`}>
      {/* Loading skeleton */}
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`}
          style={!fill ? { width, height } : {}}
        />
      )}
      
      <Image
        {...imageProps}
        quality={priority ? 90 : 75} // Higher quality for priority images
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      />
    </div>
  );
}
