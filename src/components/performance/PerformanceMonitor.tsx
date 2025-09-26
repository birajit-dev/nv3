'use client';

import { useEffect } from 'react';

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

// Extend PerformanceEntry for FID measurements
interface FirstInputPerformanceEntry extends PerformanceEntry {
  processingStart: number;
}

// Interface for layout shift entries
interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput?: boolean;
  value?: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals monitoring
    const measureWebVitals = () => {
      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
        
        // Send to analytics if available
        if (typeof window !== 'undefined' && 'gtag' in window) {
          window.gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(lastEntry.startTime),
            event_category: 'Web Vitals'
          });
        }
        
        // Alert if LCP is too slow (> 3 seconds)
        if (lastEntry.startTime > 3000) {
          console.warn('LCP is slow:', lastEntry.startTime + 'ms');
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as FirstInputPerformanceEntry;
          const fid = fidEntry.processingStart - fidEntry.startTime;
          console.log('FID:', fid);
          
          if (typeof window !== 'undefined' && 'gtag' in window) {
            window.gtag('event', 'web_vitals', {
              name: 'FID',
              value: Math.round(fid),
              event_category: 'Web Vitals'
            });
          }
          
          if (fid > 100) {
            console.warn('FID is slow:', fid + 'ms');
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const layoutShiftEntry = entry as LayoutShiftEntry;
          if (!layoutShiftEntry.hadRecentInput) {
            clsValue += layoutShiftEntry.value || 0;
          }
        });
        console.log('CLS:', clsValue);
        
        if (typeof window !== 'undefined' && 'gtag' in window) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'Web Vitals'
          });
        }
        
        if (clsValue > 0.1) {
          console.warn('CLS is poor:', clsValue);
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // First Contentful Paint (FCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FCP:', entry.startTime);
          
          if (typeof window !== 'undefined' && 'gtag' in window) {
            window.gtag('event', 'web_vitals', {
              name: 'FCP',
              value: Math.round(entry.startTime),
              event_category: 'Web Vitals'
            });
          }
          
          if (entry.startTime > 2000) {
            console.warn('FCP is slow:', entry.startTime + 'ms');
          }
        });
      }).observe({ entryTypes: ['paint'] });
    };

    // Only measure in production
    if (process.env.NODE_ENV === 'production') {
      measureWebVitals();
    }

    // Page load time measurement
    const measurePageLoadTime = () => {
      window.addEventListener('load', () => {
        const loadTime = performance.now();
        console.log('Page load time:', Math.round(loadTime) + 'ms');
        
        // Send to analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          window.gtag('event', 'page_load_time', {
            value: Math.round(loadTime),
            event_category: 'Performance'
          });
        }
        
        // Check if loading time is under 3 seconds
        if (loadTime < 3000) {
          console.log('✅ Page loads in under 3 seconds!');
        } else {
          console.warn('⚠️ Page takes longer than 3 seconds to load:', Math.round(loadTime) + 'ms');
        }
      });
    };

    measurePageLoadTime();

    // Resource loading monitoring
    const monitorResourceLoading = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.duration > 1000) { // Resources taking more than 1 second
            console.warn('Slow resource:', entry.name, Math.round(entry.duration) + 'ms');
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    };

    monitorResourceLoading();

  }, []);

  return null; // This component doesn't render anything
}

// Performance optimization utilities
export const performanceUtils = {
  // Debounce function for performance
  debounce: <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: T) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle function for performance
  throttle: <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
    let inThrottle: boolean;
    return function executedFunction(...args: T) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Lazy load images
  lazyLoadImages: () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  },

  // Preload critical resources
  preloadCriticalResources: (resources: string[]) => {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
};
