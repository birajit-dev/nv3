'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Trophy, Target, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

interface SportsArticle {
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

async function fetchSportsNews(): Promise<SportsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/sports`);

    if (!response.ok) {
      throw new Error('Failed to fetch sports news');
    }

    const data = await response.json();
    return data.data?.sportsnews || [];
  } catch (error) {
    console.error('Failed to fetch sports news:', error);
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

export default function SportsSection() {
  const [articles, setArticles] = useState<SportsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSportsNews = async () => {
      try {
        setLoading(true);
        const sportsNews = await fetchSportsNews();
        setArticles(sportsNews.slice(0, 10));
      } catch (error) {
        console.error('Failed to load sports news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSportsNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="relative mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">SPORTS</h2>
            <Trophy className="text-orange-600" size={28} />
          </div>
          <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-orange-600 to-red-600"></div>
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
            <div className="w-1 h-8 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">SPORTS</h2>
            <Trophy className="text-orange-600" size={28} />
          </div>
          <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-orange-600 to-red-600"></div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-12 text-center rounded-2xl border border-orange-200">
          <Trophy size={64} className="text-orange-300 mx-auto mb-6" />
          <p className="text-orange-600 text-xl font-medium">No sports news stories available</p>
        </div>
      </section>
    );
  }

  const gridArticles = articles.slice(0, 4);
  const listArticles = articles.slice(4, 10);

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-orange-600">
        <div className="flex items-center space-x-3">
          <Trophy className="text-orange-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">Sports</h2>
        </div>
        <Link 
          href="/sports" 
          className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200"
        >
          <span>View All</span>
          <ChevronRight size={18} />
        </Link>
      </div>

      {/* Grid Layout - 4 articles in 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {gridArticles.map((article, index) => (
          <Link key={article._id} href={`/sports/${article.post_url}`} className="block group">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-orange-100 hover:border-orange-300 h-full">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={getImageUrl(article.post_image)}
                      alt={article.post_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="64px"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Trophy size={12} className="text-orange-600" />
                    <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                      Sports
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300 leading-tight text-sm">
                    {article.post_name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">{article.author}</span>
                    <time dateTime={article.update_date} className="text-orange-600 font-semibold">
                      {format(new Date(article.update_date), 'MMM dd')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom List Articles - More Sports News */}
      {listArticles.length > 0 && (
        <div className="bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-2xl p-6 border border-orange-100">
          <div className="flex items-center space-x-3 mb-6">
            <Target className="text-orange-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">More Sports News</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listArticles.map((article, index) => (
              <Link key={article._id} href={`/sports/${article.post_url}`} className="block group">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg hover:bg-orange-50 transition-all duration-300 border border-transparent hover:border-orange-200">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 5}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors duration-300">
                      {article.post_name}
                    </h4>
                    <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
                      <span>{article.author}</span>
                      <span>•</span>
                      <time dateTime={article.update_date}>
                        {format(new Date(article.update_date), 'MMM dd, yyyy')}
                      </time>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
