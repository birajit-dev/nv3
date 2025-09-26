'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
}

export default function LazySection({
  children,
  fallback = <div className="h-32 bg-gray-100 animate-pulse rounded" />,
  threshold = 0.1,
  rootMargin = '100px', // Increased for earlier loading
  className = ''
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use requestIdleCallback for better performance
    const scheduleObserver = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => setupObserver());
      } else {
        setTimeout(setupObserver, 0);
      }
    };

    const setupObserver = () => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasLoaded) {
            setIsVisible(true);
            setHasLoaded(true);
            observer.disconnect(); // Disconnect immediately after loading
          }
        },
        {
          threshold,
          rootMargin
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }
    };

    scheduleObserver();

    return () => {
      // Cleanup handled by disconnect in observer
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}

// Preload critical sections
export function CriticalSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}

// Lazy load images with intersection observer
export function LazyImage({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  placeholder = true 
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  placeholder?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={`relative ${className}`}>
      {placeholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
        />
      )}
    </div>
  );
}
