'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface PerformanceOptimizerProps {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
}

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Extend PerformanceEntry for FID measurements
interface FirstInputPerformanceEntry extends PerformanceEntry {
  processingStart: number;
}

export default function PerformanceOptimizer({ 
  googleAnalyticsId,
  googleTagManagerId 
}: PerformanceOptimizerProps) {
  
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalFonts = [
        '/fonts/inter-var.woff2',
        '/fonts/inter-latin.woff2'
      ];
      
      criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    };

    // Optimize images loading
    const optimizeImageLoading = () => {
      if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading supported
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
          img.setAttribute('loading', 'lazy');
        });
      } else {
        // Fallback for browsers without native lazy loading
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
      }
    };

    // Preconnect to external domains
    const addPreconnects = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://www.google-analytics.com',
        'https://www.googletagmanager.com'
      ];
      
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        if (domain.includes('gstatic')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeImageLoading();
    addPreconnects();

    // Service Worker registration for caching
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Core Web Vitals monitoring
      const measureWebVitals = () => {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
          
          if (googleAnalyticsId && typeof window !== 'undefined' && 'gtag' in window) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lastEntry.startTime),
              event_category: 'Web Vitals'
            });
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const fidEntry = entry as FirstInputPerformanceEntry;
            console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
            
            if (googleAnalyticsId && typeof window !== 'undefined' && 'gtag' in window) {
              window.gtag('event', 'web_vitals', {
                name: 'FID',
                value: Math.round(fidEntry.processingStart - fidEntry.startTime),
                event_category: 'Web Vitals'
              });
            }
          });
        }).observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            const layoutShiftEntry = entry as PerformanceEntry & {
              hadRecentInput?: boolean;
              value?: number;
            };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value || 0;
            }
          });
          console.log('CLS:', clsValue);
          
          if (googleAnalyticsId && typeof window !== 'undefined' && 'gtag' in window) {
            window.gtag('event', 'web_vitals', {
              name: 'CLS',
              value: Math.round(clsValue * 1000),
              event_category: 'Web Vitals'
            });
          }
        }).observe({ entryTypes: ['layout-shift'] });
      };

      // Only measure in production
      if (process.env.NODE_ENV === 'production') {
        measureWebVitals();
      }
    }
  }, [googleAnalyticsId]);

  const handleCriticalCSSLoad = () => {
    // This function will be called when the CSS loads
    return;
  };

  return (
    <>
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_title: document.title,
                page_location: window.location.href,
                custom_map: {
                  'custom_parameter_1': 'tripura_news',
                  'custom_parameter_2': 'northeast_india'
                }
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {googleTagManagerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `}
          </Script>
        </>
      )}

      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Preload critical CSS */}
      <link 
        rel="preload" 
        href="/styles/critical.css" 
        as="style" 
        onLoad={handleCriticalCSSLoad}
      />
      
      {/* Fallback for browsers that don't support preload */}
      <noscript>
        <link rel="stylesheet" href="/styles/critical.css" />
      </noscript>
    </>
  );
}
