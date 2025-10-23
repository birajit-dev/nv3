import Head from 'next/head';
import { NewsArticle } from '@/types/news';

interface SEOHeadProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  article?: NewsArticle;
  category?: string;
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export default function SEOHead({
  title,
  description,
  image,
  url,
  article,
  category,
  keywords = [],
  noIndex = false,
  publishedTime,
  modifiedTime,
  author
}: SEOHeadProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com';
  const fullTitle = title.includes('Northeast Herald') ? title : `${title} | Northeast Herald`;
  const fullDescription = description || 'Tripura\'s #1 News Source | Latest News from Agartala, Northeast India | Breaking News, Politics, Sports, Finance & More';
  const fullUrl = url || siteUrl;
  const ogImage = image || `${siteUrl}/images/neherald_logo.png`;
  
  // Generate comprehensive keywords
  const allKeywords = [
    ...keywords,
    'Tripura news', 'Agartala news', 'Northeast India news', 'Tripura politics',
    'Northeast India updates', 'Tripura breaking news', 'Agartala updates'
  ];
  
  if (category) {
    const categoryKeywords = {
      tripura: ['Tripura government', 'Tripura CM', 'Tripura assembly', 'Agartala politics'],
      national: ['India news', 'National politics', 'Delhi news', 'Indian government'],
      world: ['World news', 'International politics', 'Global news'],
      sports: ['Sports news', 'Cricket news', 'Football news', 'Tripura sports'],
      finance: ['Business news', 'Finance news', 'Economic news', 'Tripura economy']
    };
    allKeywords.push(...(categoryKeywords[category as keyof typeof categoryKeywords] || []));
  }

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      <meta name="author" content={author || 'Northeast Herald Editorial Team'} />
      <meta name="robots" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
      <meta name="googlebot" content={noIndex ? 'noindex,nofollow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Language and Locale */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta name="language" content="English" />
      <meta name="geo.region" content="IN-TR" />
      <meta name="geo.placename" content="Tripura, India" />
      <meta name="geo.position" content="23.9408;91.9882" />
      <meta name="ICBM" content="23.9408, 91.9882" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:site_name" content="Northeast Herald" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      
      {/* Article-specific Open Graph tags */}
      {article && (
        <>
          <meta property="article:published_time" content={publishedTime || article.update_date} />
          <meta property="article:modified_time" content={modifiedTime || article.update_date} />
          <meta property="article:author" content={author || article.author} />
          <meta property="article:section" content={category || 'News'} />
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@northeastherald" />
      <meta name="twitter:creator" content="@northeastherald" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* News-specific meta tags */}
      <meta name="news_keywords" content={allKeywords.slice(0, 10).join(', ')} />
      <meta name="article:section" content={category || 'News'} />
      <meta name="article:tag" content={allKeywords.join(', ')} />
      
      {/* Mobile and App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Northeast Herald" />
      <meta name="application-name" content="Northeast Herald" />
      
      {/* Theme and Colors */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* RSS and Feeds */}
      <link rel="alternate" type="application/rss+xml" title="Northeast Herald RSS Feed" href={`${siteUrl}/rss.xml`} />
      <link rel="alternate" type="application/atom+xml" title="Northeast Herald Atom Feed" href={`${siteUrl}/atom.xml`} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="revisit-after" content="1 hour" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Structured Data for News */}
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'NewsArticle',
              headline: article.post_name,
              description: article.post_summary,
              image: article.post_image ? [article.post_image] : undefined,
              datePublished: publishedTime || article.update_date,
              dateModified: modifiedTime || article.update_date,
              author: {
                '@type': 'Person',
                name: author || article.author,
                url: `${siteUrl}/author/${(author || article.author || 'unknown').toLowerCase().replace(/\s+/g, '-')}`
              },
              publisher: {
                '@type': 'NewsMediaOrganization',
                name: 'Northeast Herald',
                url: siteUrl,
                logo: {
                  '@type': 'ImageObject',
                  url: `${siteUrl}/images/neherald_logo.png`,
                  width: 200,
                  height: 60
                }
              },
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': fullUrl
              },
              articleSection: category || 'News',
              keywords: allKeywords.join(', '),
              inLanguage: 'en-IN',
              isAccessibleForFree: true
            })
          }}
        />
      )}
    </Head>
  );
}
