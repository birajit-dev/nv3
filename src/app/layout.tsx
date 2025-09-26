import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { generateSEOMetadata } from "@/lib/seo";
import PerformanceHead, { CriticalResourcePreloader } from "@/components/performance/PerformanceHead";
import PerformanceMonitor from "@/components/performance/PerformanceMonitor";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Tripura News | Agartala News | Northeast Herald - Latest Breaking News Today",
  description: "Northeast Herald - Tripura's #1 News Source. Get latest Tripura news, Agartala news, breaking news today. Your trusted source for Northeast India news, politics, sports, finance & more.",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Tag Manager - Defer to improve initial load */}
        <Script
          id="gtm-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KD2BK9QW');
            `,
          }}
        />
        {/* End Google Tag Manager */}
        
        {/* Performance Head Component */}
        <PerformanceHead 
          title="Tripura News | Agartala News | Northeast Herald - Latest Breaking News Today"
          description="Northeast Herald - Tripura's #1 News Source. Get latest Tripura news, Agartala news, breaking news today."
          canonicalUrl="https://neherald.com"
        />
        
        {/* Critical Resource Preloader */}
        <CriticalResourcePreloader />
        
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4PKRRJ1GE4"
          strategy="afterInteractive"
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4PKRRJ1GE4');
            `,
          }}
        />
        
        {/* Google AdSense Auto Ads - Defer for better initial performance */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2682479332426024"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        
        {/* Favicon */}
        <link rel="icon" href="/images/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/images/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/images/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/images/favicon/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/images/favicon/browserconfig.xml" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#2563eb" />
        
        {/* Google AdSense Account */}
        <meta name="google-adsense-account" content="ca-pub-2682479332426024" />
        
        {/* Verification tags */}
        <meta name="google-site-verification" content="FK9NR0AATT321BoVLPzZEJhIEwIqs3m3Q_5OZbSu0cI" />
        
        {/* Optimized performance script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Optimized performance measurement
              (function() {
                // Show content immediately
                document.body.classList.add('js-loaded');
                document.body.classList.remove('js-loading');
                
                // Defer analytics until after load
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    if (typeof gtag !== 'undefined') {
                      gtag('event', 'page_load_time', {
                        value: Math.round(performance.now()),
                        event_category: 'Performance'
                      });
                    }
                  }, 1000);
                });
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900 js-loading`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-KD2BK9QW"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        
        {/* Performance Monitor */}
        <PerformanceMonitor />
        
        {/* Enhanced Schema.org Organization markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "Northeast Herald",
              "alternateName": ["NH", "Northeast Herald News", "Tripura News"],
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com",
              "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/images/neherald_logo.png`,
                "width": 200,
                "height": 60
              },
              "foundingDate": "2025",
              "description": "Tripura's #1 News Source covering latest news from Agartala, Northeast India including politics, sports, finance, and more",
              "keywords": [
                "Tripura news", "Agartala news", "Northeast India news", "Tripura politics",
                "Manipur news", "Assam news", "Meghalaya news", "Nagaland news", "Mizoram news",
                "Arunachal Pradesh news", "Sikkim news", "Tripura government", "Agartala updates"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Agartala",
                "addressRegion": "Tripura",
                "postalCode": "799001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "Editorial",
                "email": "neherald.com@gmail.com",
                "telephone": "+91-XXX-XXXXXXX",
                "availableLanguage": ["English", "Hindi", "Bengali"]
              },
              "sameAs": [
                "https://facebook.com/northeastherald",
                "https://twitter.com/northeastherald",
                "https://youtube.com/c/northeastherald",
                "https://instagram.com/northeastherald"
              ],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "publishingPrinciples": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/editorial-policy`,
              "ethicsPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/ethics-policy`,
              "diversityPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/diversity-policy`,
              "correctionsPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/corrections-policy`,
              "masthead": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/masthead`,
              "missionCoveragePrioritiesPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/mission-coverage-policy`,
              "verificationFactCheckingPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/fact-checking-policy`,
              "actionableFeedbackPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/feedback-policy`,
              "unnammedSourcesPolicy": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/pages/sources-policy`
            })
          }}
        />
        
        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Northeast Herald",
              "alternateName": ["NH", "Northeast Herald News"],
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com",
              "description": "Tripura's #1 News Source | Latest News from Agartala, Northeast India",
              "inLanguage": "en-IN",
              "copyrightYear": 2025,
              "publisher": {
                "@type": "NewsMediaOrganization",
                "name": "Northeast Herald",
                "url": process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || "https://neherald.com"}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
