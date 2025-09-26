import Head from 'next/head';

interface PerformanceHeadProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

export default function PerformanceHead({ 
  title, 
  description, 
  canonicalUrl 
}: PerformanceHeadProps) {
  return (
    <Head>
      {/* Critical performance optimizations */}
      
      {/* DNS Prefetch - Critical external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
      
      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
      
      {/* Resource hints for better performance */}
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/trending`} />
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/tripura`} />
      
      {/* Critical inline CSS for above-the-fold content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Critical CSS for performance - Above the fold */
          * { box-sizing: border-box; }
          body { 
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
            margin: 0; 
            background-color: #f9fafb;
            line-height: 1.6;
            color: #1f2937;
          }
          .container { max-width: 1280px; margin: 0 auto; padding: 0 1rem; }
          .grid { display: grid; gap: 1rem; }
          .flex { display: flex; }
          .hidden { display: none; }
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
            border-radius: 0.5rem;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          /* Hide content until loaded */
          .js-loading { opacity: 0; }
          .js-loaded { opacity: 1; transition: opacity 0.2s ease; }
          /* Critical above-the-fold styles */
          .header { background: white; border-bottom: 1px solid #e5e7eb; }
          .hero-section { padding: 2rem 0; }
          .news-card { background: white; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        `
      }} />
      
      {/* Performance meta tags */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Canonical URL for SEO and performance */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Title and description for SEO */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
    </Head>
  );
}

// Critical resource preloader
export function CriticalResourcePreloader() {
  return (
    <>
      {/* Preload critical API endpoints - only the most important ones */}
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/trending`} />
      
      {/* Preload critical images - only logo */}
      <link rel="preload" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/images/neherald_logo.png`} as="image" />
    </>
  );
}
