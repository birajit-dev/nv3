'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Flag, ChevronRight, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NationalArticle {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_content: string;
  post_image: string;
  author: string;
  update_date: string;
  news_id: number;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchNationalNews(): Promise<NationalArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/national`);

    if (!response.ok) {
      throw new Error('Failed to fetch national news');
    }

    const data = await response.json();
    return data.data?.nationalnews || [];
  } catch (error) {
    console.error('Failed to fetch national news:', error);
    return [];
  }
}

// Helper function to get the correct image URL
function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return '/placeholder-news.jpg';
  
  // If it's already an absolute URL (starts with http:// or https://), use it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative URL, prepend the API base URL
  // Make sure to not add double slashes
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `https://app.neherald.com${cleanUrl}`;
}

export default function NationalSection() {
  const [articles, setArticles] = useState<NationalArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNationalNews = async () => {
      try {
        setLoading(true);
        const nationalNews = await fetchNationalNews();
        setArticles(nationalNews.slice(0, 10));
      } catch (error) {
        console.error('Failed to load national news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNationalNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="relative mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-red-600 rounded-full"></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">NATIONAL</h2>
            <TrendingUp className="text-blue-600" size={28} />
          </div>
          <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-blue-600 to-red-600"></div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-gray-200 animate-pulse h-80 rounded-xl"></div>
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-28 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="mb-16">
        <div className="relative mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-red-600 rounded-full"></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">NATIONAL</h2>
            <TrendingUp className="text-blue-600" size={28} />
          </div>
          <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-blue-600 to-red-600"></div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-12 text-center rounded-2xl border border-gray-200">
          <Flag size={64} className="text-gray-300 mx-auto mb-6" />
          <p className="text-gray-500 text-xl font-medium">No national news stories available</p>
        </div>
      </section>
    );
  }

  const featuredArticle = articles[0];
  const secondaryArticles = articles.slice(1, 6);
  const listArticles = articles.slice(6, 10);

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-red-600">
        <div className="flex items-center space-x-3">
          <Flag className="text-red-600" size={24} />
          <h2 className="text-2xl font-bold text-gray-900 uppercase">National</h2>
        </div>
        <Link 
          href="/national" 
          className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-semibold text-sm"
        >
          <span>View All</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Simple Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Main Story */}
        <div className="lg:col-span-1">
          {featuredArticle && (
            <Link href={`/national/${featuredArticle.post_url}`} className="block group">
              <article className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={getImageUrl(featuredArticle.post_image)}
                    alt={featuredArticle.post_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-red-600 transition-colors line-clamp-3 flex-1">
                    {featuredArticle.post_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {featuredArticle.post_summary?.replace(/<[^>]*>/g, '')}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <span>{featuredArticle.author}</span>
                    <time dateTime={featuredArticle.update_date}>
                      {format(new Date(featuredArticle.update_date), 'MMM dd, yyyy')}
                    </time>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Secondary Stories */}
        <div className="lg:col-span-1 space-y-4">
          {secondaryArticles.map((article) => (
            <Link key={article._id} href={`/national/${article.post_url}`} className="block group">
              <article className="flex bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 shadow-sm">
                <div className="relative w-24 h-20 flex-shrink-0">
                  <Image
                    src={getImageUrl(article.post_image)}
                    alt={article.post_name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 p-3 flex flex-col justify-between">
                  <h4 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-2 min-h-[2.5rem]">
                    {article.post_name}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="truncate max-w-20">{article.author}</span>
                    <time dateTime={article.update_date}>
                      {format(new Date(article.update_date), 'MMM dd')}
                    </time>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section - More Stories */}
      {listArticles.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">More National News</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listArticles.map((article) => (
              <Link key={article._id} href={`/national/${article.post_url}`} className="block group">
                <article className="flex items-start space-x-3 p-3 hover:bg-gray-50 transition-colors">
                  <div className="w-16 h-12 relative flex-shrink-0">
                    <Image
                      src={getImageUrl(article.post_image)}
                      alt={article.post_name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 mb-1">
                      {article.post_name}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>•</span>
                      <time dateTime={article.update_date}>
                        {format(new Date(article.update_date), 'MMM dd')}
                      </time>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}