'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TrendingUp, ChevronRight, Eye, Share2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TopNewsArticle {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_content: string;
  post_image: string;
  author: string;
  post_category: string;
  update_date: string;
  news_id: number;
}

interface TopNewsData {
  topnews: TopNewsArticle[];
  latestnews: TopNewsArticle[];
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchTopNews(): Promise<TopNewsData> {
  try {
    const response = await fetch(`${API_BASE_URL}/topnews`);

    if (!response.ok) {
      throw new Error('Failed to fetch top news');
    }

    const data = await response.json();
    return {
      topnews: data.data?.topnews || [],
      latestnews: data.data?.latestnews || []
    };
  } catch (error) {
    console.error('Failed to fetch top news:', error);
    return { topnews: [], latestnews: [] };
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

// Helper function to strip HTML tags from summary
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export default function TopNew() {
  const [newsData, setNewsData] = useState<TopNewsData>({ topnews: [], latestnews: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await fetchTopNews();
        setNewsData(data);
      } catch (error) {
        console.error('Error loading news:', error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-12">
        <div className="border-b-4 border-red-600 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 bg-red-600 text-white px-4 py-2 inline-block">
            TOP STORIES
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <div className="bg-gray-200 animate-pulse h-96 rounded"></div>
          </div>
          <div className="lg:col-span-4 space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-20 rounded"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const topArticle = newsData.topnews[0];
  const latestArticles = newsData.latestnews.slice(0, 5);

  if (!topArticle && latestArticles.length === 0) {
    return (
      <section className="mb-12">
        <div className="border-b-4 border-red-600 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 bg-red-600 text-white px-4 py-2 inline-block">
            TOP STORIES
          </h2>
        </div>
        <div className="bg-gray-50 p-8 text-center rounded border">
          <TrendingUp className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Top Stories Available</h3>
          <p className="text-gray-600">Please check back later for updates.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 -mt-5">
      {/* Header - Times of India style */}
      <div className="border-b-2 border-red-600 mb-4">
        <h2 className="text-xl font-bold text-gray-900 bg-red-600 text-white px-3 py-1.5 inline-block">
          TOP STORIES
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Story - Left Side (8/12 width) */}
        {topArticle && (
          <div className="lg:col-span-8">
            <Link href={`/tripura-top-news`} className="group block">
              <div className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={getImageUrl(topArticle.post_image)}
                    alt={topArticle.post_name}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 67vw, 67vw"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <span className="bg-red-600 text-white px-2 py-1 text-xs font-semibold uppercase tracking-wide">
                      BREAKING
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors duration-200 leading-tight">
                    {topArticle.post_name}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {stripHtml(topArticle.post_summary)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-600 border-t pt-3">
                    <div className="flex items-center space-x-4">
                      <span className="font-medium uppercase tracking-wide">{topArticle.author}</span>
                      <span className="text-gray-400">|</span>
                      <time dateTime={topArticle.update_date} className="uppercase">
                        {format(new Date(topArticle.update_date), 'MMM dd, yyyy • HH:mm')}
                      </time>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye size={12} />
                        <span>2.1k</span>
                      </div>
                      <Share2 size={12} className="text-gray-400 hover:text-red-600 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Latest News Sidebar - Right Side (4/12 width) */}
        {latestArticles.length > 0 && (
          <div className="lg:col-span-4 space-y-1">
            <div className="bg-gray-100 px-3 py-2 border-l-4 border-red-600 mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">LATEST NEWS</h3>
            </div>
            {latestArticles.map((article, index) => (
              <Link key={article._id} href={`/${article.post_category}/${article.post_url}`} className="group block">
                <div className="bg-white border-b border-gray-200 p-3 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex space-x-3">
                    <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden">
                      <Image
                        src={getImageUrl(article.post_image)}
                        alt={article.post_name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-gray-900 mb-2 line-clamp-3 group-hover:text-red-600 transition-colors duration-200 leading-tight">
                        {article.post_name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <time dateTime={article.update_date} className="uppercase font-medium">
                          {format(new Date(article.update_date), 'MMM dd • HH:mm')}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* More News Link */}
            <Link href="/tripura-top-news" className="block">
              <div className="bg-red-600 text-white p-3 text-center hover:bg-red-700 transition-colors duration-200">
                <span className="text-sm font-semibold uppercase tracking-wide">VIEW ALL NEWS</span>
                <ChevronRight className="inline ml-1" size={14} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
