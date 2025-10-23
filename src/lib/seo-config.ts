export const SEO_CONFIG = {
  // Site Information
  siteName: 'Northeast Herald',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com',
  description: 'Tripura\'s #1 News Source | Latest News from Agartala, Northeast India | Breaking News, Politics, Sports, Finance & More',
  
  // Tripura & Northeast India Keywords - OPTIMIZED FOR #1 RANKINGS
  primaryKeywords: [
    'Tripura news',
    'Agartala news',
    'Northeast Herald',
    'Tripura news today',
    'Agartala news today',
    'Northeast India news',
    'Tripura politics',
    'Agartala updates',
    'Northeast India updates',
    'Tripura breaking news',
    'Agartala politics',
    'Tripura government',
    'Tripura CM',
    'neherald.com',
    'Northeast Herald Tripura',
    'Northeast Herald Agartala'
  ],
  
  // Location-based keywords
  locations: [
    'Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia', 'Sabroom',
    'Manipur', 'Assam', 'Meghalaya', 'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim'
  ],
  
  // Category-specific keywords
  categoryKeywords: {
    tripura: [
      'Tripura news', 'Agartala news', 'Tripura politics', 'Tripura government',
      'Tripura CM', 'Tripura assembly', 'Agartala updates', 'Tripura development',
      'Tripura infrastructure', 'Tripura education', 'Tripura health',
      'Tripura tourism', 'Tripura culture', 'Tripura festivals', 'Tripura sports'
    ],
    national: [
      'India news', 'National politics', 'Delhi news', 'Mumbai news',
      'Bangalore news', 'Chennai news', 'Kolkata news', 'Hyderabad news',
      'Indian government', 'Parliament news', 'Election news', 'Indian politics'
    ],
    world: [
      'World news', 'International politics', 'Global news', 'Foreign affairs',
      'International relations', 'World economy', 'Global politics'
    ],
    sports: [
      'Sports news', 'Cricket news', 'Football news', 'Olympics', 'Sports updates',
      'Tripura sports', 'Northeast sports', 'Indian sports', 'World sports',
      'Agartala sports', 'Northeast football', 'Northeast cricket'
    ],
    finance: [
      'Business news', 'Finance news', 'Economic news', 'Stock market',
      'Banking news', 'Trade news', 'Investment news', 'Northeast business',
      'Tripura economy', 'Indian economy', 'Agartala business'
    ],
    articles: [
      'Opinion', 'Editorial', 'Analysis', 'Commentary', 'Perspective',
      'Northeast perspective', 'Tripura analysis', 'Indian perspective'
    ]
  },
  
  // Google News specific settings
  googleNews: {
    publicationName: 'Northeast Herald',
    language: 'en',
    maxArticles: 1000, // Maximum articles to include in Google News sitemap
    maxDays: 2, // Maximum days back to include articles
  },
  
  // Social Media
  socialMedia: {
    facebook: 'https://www.facebook.com/neherald/',
    twitter: 'https://x.com/HeraldNortheast',
    youtube: 'https://www.youtube.com/@northeastherald5966',
    instagram: 'https://instagram.com/northeastherald'
  },
  
  // Contact Information
  contact: {
    email: 'neherald.com@gmail.com',
    phone: '+91 9436120508',
    officePhone: '0381-3587566',
    address: {
      locality: 'Agartala',
      region: 'Tripura',
      postalCode: '799004',
      country: 'IN'
    }
  },
  
  // SEO Meta Tags
  metaTags: {
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#2563eb',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    googlebot: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    author: 'Northeast Herald Editorial Team',
    publisher: 'Northeast Herald',
    copyright: '© 2025 Northeast Herald. All rights reserved.',
    language: 'en-IN',
    geo: {
      region: 'IN-TR',
      placename: 'Tripura, India',
      position: '23.9408;91.9882',
      ICBM: '23.9408, 91.9882'
    }
  },
  
  // Structured Data
  structuredData: {
    organization: {
      type: 'NewsMediaOrganization',
      foundingDate: '2025',
      alternateName: ['NH', 'Northeast Herald News']
    },
    website: {
      type: 'WebSite',
      potentialAction: {
        type: 'SearchAction',
        target: '{siteUrl}/search?q={search_term_string}',
        queryInput: 'required name=search_term_string'
      }
    }
  }
};

export function getKeywordsForCategory(category: string): string[] {
  const baseKeywords = SEO_CONFIG.primaryKeywords;
  const categoryKeywords = SEO_CONFIG.categoryKeywords[category as keyof typeof SEO_CONFIG.categoryKeywords] || [];
  const locationKeywords = SEO_CONFIG.locations;
  
  return [...baseKeywords, ...categoryKeywords, ...locationKeywords];
}

export function generateMetaDescription(title: string, category?: string): string {
  const categoryKeywords = category ? SEO_CONFIG.categoryKeywords[category as keyof typeof SEO_CONFIG.categoryKeywords]?.slice(0, 3) || [] : [];
  const locationKeywords = SEO_CONFIG.locations.slice(0, 2);
  
  const keywords = [...categoryKeywords, ...locationKeywords].join(', ');
  const baseDescription = `Latest news from Tripura and Northeast India. ${title}`;
  
  return `${baseDescription}. Stay updated with ${keywords} and more breaking news from Agartala.`;
}

export function getCanonicalUrl(path: string): string {
  return `${SEO_CONFIG.siteUrl}${path}`;
}
