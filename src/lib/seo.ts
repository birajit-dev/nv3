import { Metadata } from 'next';
import { NewsArticle } from '@/types/news';

const SITE_NAME = 'Northeast Herald';
const SITE_DESCRIPTION = 'Northeast Herald - Tripura\'s #1 News Source | Latest News from Agartala, Northeast India | Breaking News, Politics, Sports, Finance & More';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com';

// Tripura and Northeast India specific keywords
export const TRIPURA_KEYWORDS = [
  'Tripura news', 'Agartala news', 'Northeast India news', 'Tripura politics',
  'Manipur news', 'Assam news', 'Meghalaya news', 'Nagaland news', 'Mizoram news',
  'Arunachal Pradesh news', 'Sikkim news', 'Tripura government', 'Agartala updates',
  'Northeast India updates', 'Tripura breaking news', 'Agartala politics',
  'Tripura sports', 'Northeast sports', 'Tripura finance', 'Northeast business',
  'Tripura entertainment', 'Northeast culture', 'Tripura education',
  'Northeast development', 'Tripura infrastructure', 'Agartala development'
];

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'tripura': [
    'Tripura news', 'Agartala news', 'Tripura politics', 'Tripura government',
    'Tripura CM', 'Tripura assembly', 'Agartala updates', 'Tripura development',
    'Tripura infrastructure', 'Tripura education', 'Tripura health',
    'Tripura tourism', 'Tripura culture', 'Tripura festivals'
  ],
  'national': [
    'India news', 'National politics', 'Delhi news', 'Mumbai news',
    'Bangalore news', 'Chennai news', 'Kolkata news', 'Hyderabad news',
    'Indian government', 'Parliament news', 'Election news'
  ],
  'international': [
    'World news', 'International politics', 'Global news', 'Foreign affairs',
    'International relations', 'World economy', 'Global politics'
  ],
  'sports': [
    'Sports news', 'Cricket news', 'Football news', 'Olympics', 'Sports updates',
    'Tripura sports', 'Northeast sports', 'Indian sports', 'World sports'
  ],
  'finance': [
    'Business news', 'Finance news', 'Economic news', 'Stock market',
    'Banking news', 'Trade news', 'Investment news', 'Northeast business',
    'Tripura economy', 'Indian economy'
  ],
  'articles': [
    'Opinion', 'Editorial', 'Analysis', 'Commentary', 'Perspective',
    'Northeast perspective', 'Tripura analysis', 'Indian perspective'
  ]
};

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image,
  article,
  category,
  noIndex = false,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  article?: NewsArticle;
  category?: string;
  noIndex?: boolean;
}): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const fullDescription = description || SITE_DESCRIPTION;
  const fullUrl = `${SITE_URL}${path}`;
  const ogImage = image || `${SITE_URL}/og-default.jpg`;

  // Generate keywords based on category and content
  const keywords = generateKeywords(title, category, article);
  
  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords.join(', '),
    authors: article ? [{ name: article.author }] : undefined,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_IN',
      type: article ? 'article' : 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      site: '@northeastherald',
      creator: '@northeastherald',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'geo.region': 'IN-TR',
      'geo.placename': 'Tripura, India',
      'geo.position': '23.9408;91.9882',
      'ICBM': '23.9408, 91.9882',
    },
  };

  // Add article-specific metadata
  if (article) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.update_date,
      modifiedTime: article.update_date,
      authors: article.author ? [article.author] : [],
      tags: article.tags || keywords,
    };
    
    // Add news-specific metadata
    metadata.other = {
      'article:published_time': article.update_date,
      'article:modified_time': article.update_date,
      'article:author': article.author || '',
      'article:section': category || 'General',
    };
  }

  return metadata;
}

function generateKeywords(title: string, category?: string, article?: NewsArticle): string[] {
  const keywords = new Set<string>();
  
  // Add Tripura-specific keywords
  TRIPURA_KEYWORDS.slice(0, 5).forEach(keyword => keywords.add(keyword));
  
  // Add category-specific keywords
  if (category && CATEGORY_KEYWORDS[category]) {
    CATEGORY_KEYWORDS[category].slice(0, 3).forEach(keyword => keywords.add(keyword));
  }
  
  // Add keywords from title
  const titleWords = title.toLowerCase().split(' ');
  titleWords.forEach(word => {
    if (word.length > 3) {
      keywords.add(word);
    }
  });
  
  // Add article tags if available
  if (article?.tags) {
    article.tags.forEach(tag => keywords.add(tag));
  }
  
  return Array.from(keywords).slice(0, 15); // Limit to 15 keywords
}

export function generateNewsArticleJsonLd(article: NewsArticle, fullUrl: string, category?: string) {
  const keywords = generateKeywords(article.post_name, category, article);
  
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.post_name,
    description: article.post_summary,
    image: article.post_image ? [article.post_image] : undefined,
    datePublished: article.update_date,
    dateModified: article.update_date,
    author: {
      '@type': 'Person',
      name: article.author,
      url: `${SITE_URL}/author/${article.author?.toLowerCase().replace(/\s+/g, '-') || 'Subrata Ghosh'}`,
    },
    publisher: {
      '@type': 'NewsMediaOrganization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/neherald_logo.png`,
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
    }))
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
