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
      
      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/fonts/inter-var.woff2`}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/styles/critical.css`}
        as="style"
        onLoad={(e) => {
          const link = e.target as HTMLLinkElement;
          link.onload = null;
          link.rel = 'stylesheet';
        }}
      />
      <noscript>
        <link rel="stylesheet" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/styles/critical.css`} />
      </noscript>
      
      {/* Resource hints for better performance */}
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/trending`} />
      
      {/* Critical inline CSS for above-the-fold content */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Critical CSS for performance */
          body { 
            font-family: system-ui, -apple-system, sans-serif; 
            margin: 0; 
            background-color: #f9fafb;
          }
          .loading-skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          /* Hide content until loaded */
          .js-loading { opacity: 0; }
          .js-loaded { opacity: 1; transition: opacity 0.3s ease; }
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
      {/* Preload critical API endpoints */}
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/trending`} />
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/tripura`} />
      
      {/* Preload critical images */}
      <link rel="preload" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/images/neherald_logo.png`} as="image" />
      
      {/* Preload next page likely to be visited */}
      <link rel="prefetch" href={`${process.env.NEXT_PUBLIC_API_URL || 'https://neherald.com'}/tripura`} />
    </>
  );
}
