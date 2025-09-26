import { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/categories';

interface Article {
  _id: string;
  post_name: string;
  post_url: string;
  post_category: string;
  update_date: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    articles: Article[];
  };
}

// Function to fetch news articles from the API
async function fetchNewsArticles(): Promise<Article[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://app.neherald.com'}/api/next/v1/sitemap`;
    console.log('Fetching from:', apiUrl); // Debug log
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    console.log('API Response:', apiResponse); // Debug log
    
    return apiResponse.success ? apiResponse.data.articles : [];
  } catch (error) {
    console.error('Error fetching sitemap articles:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com';
  
  // Get all categories
  const categories = getAllCategories();
  
  // Static routes with enhanced SEO priorities
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pages/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pages/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/pages/about-tripura`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pages/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/pages/terms-condition`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tripura-top-news`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.95,
    },
  ];

  // Category routes - include all news categories
  const categoryRoutes: MetadataRoute.Sitemap = categories.map(category => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'hourly' as const,
    priority: category.slug === 'tripura' ? 0.95 : 
             category.slug === 'top-news' ? 0.9 :
             category.slug === 'national' ? 0.85 :
             category.slug === 'international' ? 0.8 :
             category.slug === 'sports' ? 0.8 :
             category.slug === 'finance' ? 0.8 : 0.75,
  }));

  // Fetch and add individual article routes
  try {
    const articles = await fetchNewsArticles();
    console.log(`Found ${articles.length} articles for sitemap`); // Debug log
    
    const articleRoutes: MetadataRoute.Sitemap = articles.map(article => ({
      url: `${baseUrl}/${article.post_category}/${article.post_url}`,
      lastModified: new Date(article.update_date),
      changeFrequency: 'weekly' as const,
      priority: article.post_category === 'tripura' ? 0.9 : 0.8,
    }));

    return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
  } catch (error) {
    console.error('Error fetching articles for sitemap:', error);
    return [...staticRoutes, ...categoryRoutes];
  }
}
