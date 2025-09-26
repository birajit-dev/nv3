import { NewsArticle } from '@/types/news';

interface StructuredDataProps {
  article?: NewsArticle;
  type: 'article' | 'organization' | 'website' | 'breadcrumb';
  breadcrumbs?: Array<{ name: string; url: string }>;
  category?: string;
  fullUrl?: string;
}

export default function StructuredData({ 
  article, 
  type, 
  breadcrumbs, 
  category, 
  fullUrl 
}: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com';
  
  const generateOrganizationJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    name: 'Northeast Herald',
    alternateName: ['NH', 'Northeast Herald News', 'Tripura News'],
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/images/neherald_logo.png`,
      width: 200,
      height: 60
    },
    foundingDate: '2025',
    description: 'Tripura\'s #1 News Source covering latest news from Agartala, Northeast India including politics, sports, finance, and more',
    keywords: [
      'Tripura news', 'Agartala news', 'Northeast India news', 'Tripura politics',
      'Manipur news', 'Assam news', 'Meghalaya news', 'Nagaland news', 'Mizoram news',
      'Arunachal Pradesh news', 'Sikkim news', 'Tripura government', 'Agartala updates'
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Agartala',
      addressRegion: 'Tripura',
      postalCode: '799001',
      addressCountry: 'IN'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Editorial',
      email: 'neherald.com@gmail.com',
      telephone: '+91-XXX-XXXXXXX',
      availableLanguage: ['English', 'Hindi', 'Bengali']
    },
    sameAs: [
      'https://facebook.com/northeastherald',
      'https://twitter.com/northeastherald',
      'https://youtube.com/c/northeastherald',
      'https://instagram.com/northeastherald'
    ],
    publishingPrinciples: `${siteUrl}/pages/editorial-policy`,
    ethicsPolicy: `${siteUrl}/pages/ethics-policy`,
    diversityPolicy: `${siteUrl}/pages/diversity-policy`,
    masthead: `${siteUrl}/pages/masthead`,
    missionCoveragePrioritiesPolicy: `${siteUrl}/pages/mission-coverage-policy`,
    verificationFactCheckingPolicy: `${siteUrl}/pages/fact-checking-policy`,
    actionableFeedbackPolicy: `${siteUrl}/pages/feedback-policy`,
    correctionsPolicy: `${siteUrl}/pages/corrections-policy`,
    unnammedSourcesPolicy: `${siteUrl}/pages/sources-policy`,
  });

  const generateArticleJsonLd = () => {
    if (!article || !fullUrl) return null;
    
    const keywords = [
      'Tripura news', 'Agartala news', 'Northeast India news', 'Tripura politics',
      category === 'tripura' ? 'Tripura government' : 'Northeast India updates'
    ];
    
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.post_name,
      description: article.post_summary,
      image: article.post_image ? [{
        '@type': 'ImageObject',
        url: article.post_image.startsWith('http') ? article.post_image : `${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}${article.post_image}`,
        width: 1200,
        height: 630
      }] : undefined,
      datePublished: article.update_date,
      dateModified: article.update_date,
      author: {
        '@type': 'Person',
        name: article.author,
        url: `${siteUrl}/author/${article.author?.toLowerCase().replace(/\s+/g, '-') || 'Subrata Ghosh'}`,
        jobTitle: 'Staff Reporter',
        worksFor: {
          '@type': 'NewsMediaOrganization',
          name: 'Northeast Herald'
        }
      },
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: 'Northeast Herald',
        url: siteUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/neherald_logo.png`,
          width: 200,
          height: 60,
        },
        sameAs: [
          'https://facebook.com/northeastherald',
          'https://twitter.com/northeastherald',
          'https://youtube.com/c/northeastherald'
        ],
        foundingDate: '2025',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Agartala',
          addressRegion: 'Tripura',
          postalCode: '799001',
          addressCountry: 'IN'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      articleSection: category || article.category || 'General',
      keywords: keywords.join(', '),
      wordCount: article.post_content ? article.post_content.split(' ').length : 500,
      timeRequired: `PT${article.readTime || 3}M`,
      inLanguage: 'en-IN',
      isAccessibleForFree: true,
      genre: 'News',
      about: {
        '@type': 'Thing',
        name: category === 'tripura' ? 'Tripura News' : 'Northeast India News'
      },
      mentions: keywords.map(keyword => ({
        '@type': 'Thing',
        name: keyword
      })),
      // News-specific properties
      dateline: category === 'tripura' ? 'Agartala, Tripura' : 'Northeast India',
      locationCreated: {
        '@type': 'Place',
        name: category === 'tripura' ? 'Agartala' : 'Northeast India',
        address: {
          '@type': 'PostalAddress',
          addressRegion: category === 'tripura' ? 'Tripura' : 'Northeast India',
          addressCountry: 'IN'
        }
      }
    };
  };

  const generateWebsiteJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Northeast Herald',
    alternateName: ['NH', 'Northeast Herald News'],
    url: siteUrl,
    description: 'Tripura\'s #1 News Source | Latest News from Agartala, Northeast India',
    inLanguage: 'en-IN',
    copyrightYear: 2025,
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: 'Northeast Herald',
      url: siteUrl
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'SiteNavigationElement',
          name: 'Tripura News',
          url: `${siteUrl}/tripura`
        },
        {
          '@type': 'SiteNavigationElement',
          name: 'National News',
          url: `${siteUrl}/national`
        },
        {
          '@type': 'SiteNavigationElement',
          name: 'Sports',
          url: `${siteUrl}/sports`
        },
        {
          '@type': 'SiteNavigationElement',
          name: 'Finance',
          url: `${siteUrl}/finance`
        }
      ]
    }
  });

  const generateBreadcrumbJsonLd = () => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })) || []
  });

  const getJsonLd = () => {
    switch (type) {
      case 'organization':
        return generateOrganizationJsonLd();
      case 'article':
        return generateArticleJsonLd();
      case 'website':
        return generateWebsiteJsonLd();
      case 'breadcrumb':
        return generateBreadcrumbJsonLd();
      default:
        return null;
    }
  };

  const jsonLd = getJsonLd();
  
  if (!jsonLd) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
