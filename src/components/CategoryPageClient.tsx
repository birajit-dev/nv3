'use client';

import { useEffect, useState } from 'react';
import { NewsArticle } from '@/types/news';
import NewsCard from '@/components/ui/NewsCard';
import FeaturedNewsCard from '@/components/ui/FeaturedNewsCard';
import AdBanner from '@/components/ui/AdBanner';
import { Filter, Calendar } from 'lucide-react';
import { CATEGORIES } from '@/lib/categories';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchCategoryNews(category: string): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/${category}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} news`);
    }

    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error(`Failed to fetch ${category} news:`, error);
    return [];
  }
}

interface CategoryPageClientProps {
  category: string;
}

export default function CategoryPageClient({ category }: CategoryPageClientProps) {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryNews = async () => {
      try {
        setLoading(true);
        const categoryNews = await fetchCategoryNews(category);
        setArticles(categoryNews.slice(0, 20));
      } catch (error) {
        console.error('Failed to load category news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategoryNews();
  }, [category]);

  const categoryInfo = CATEGORIES[category as keyof typeof CATEGORIES];

  if (!categoryInfo) {
    return <div>Category not found</div>;
  }

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gray-200 animate-pulse rounded-lg h-8 w-64 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
                <div className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return <div>No articles found</div>;
  }

  // Separate featured and regular articles
  const featuredArticles = articles.filter(article => article.isFeatured);
  const regularArticles = articles.filter(article => !article.isFeatured);

  return (
    <div className="bg-white min-h-screen">
      {/* Category Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: categoryInfo.color }}
              >
                {categoryInfo.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{categoryInfo.name}</h1>
                <p className="text-gray-600 mt-1">{categoryInfo.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Calendar size={16} />
                <span>Latest Updates</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Filter size={16} />
                <span>{articles.length} Articles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Articles */}
            {featuredArticles.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {featuredArticles.slice(0, 2).map((article) => (
                    <FeaturedNewsCard
                      key={article._id}
                      article={article}
                      variant="large"
                    />
                  ))}
                </div>

                {/* Horizontal Ad after featured */}
                <div className="mb-8">
                  <AdBanner type="horizontal" />
                </div>
              </section>
            )}

            {/* Latest Articles Section */}
            <section className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-1 h-8 rounded-full"
                    style={{ backgroundColor: categoryInfo.color }}
                  ></div>
                  <h2 className="text-2xl font-bold text-gray-900">Latest in {categoryInfo.name}</h2>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{regularArticles.length} articles</span>
                </div>
              </div>

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {regularArticles.map((article, index) => (
                  <div key={article._id}>
                    <NewsCard article={article} variant="default" />
                    {/* Insert ads every 6 articles */}
                    {(index + 1) % 6 === 0 && index < regularArticles.length - 1 && (
                      <div className="col-span-full my-8">
                        <AdBanner type="horizontal" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More */}
              {articles.length >= 20 && (
                <div className="text-center">
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Load More
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Sidebar Ad */}
              <AdBanner type="sidebar" />

              {/* Popular This Week */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular This Week</h3>
                <div className="space-y-4">
                  {articles.slice(0, 3).map((article, index) => (
                    <div key={article._id} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
                          {article.post_name}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          {article.views?.toLocaleString()} views
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Square Ad */}
              <AdBanner type="square" />

              {/* Category Stats */}
              <section className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Category Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Articles</span>
                    <span className="font-semibold text-gray-900">{articles.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Featured Stories</span>
                    <span className="font-semibold text-gray-900">{featuredArticles.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Views</span>
                    <span className="font-semibold text-gray-900">
                      {articles.reduce((sum, article) => sum + (article.views || 0), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </section>

              {/* Newsletter Signup */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get the latest {categoryInfo.name.toLowerCase()} news delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
