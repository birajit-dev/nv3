'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { TrendingUp, Clock, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

interface TrendingArticle {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_category: string;
  post_image: string;
  author: string;
  update_date: string;
  news_id: number;
  viewCount?: number;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';

async function fetchTrendingNews(): Promise<TrendingArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/next/v1/trending`);

    if (!response.ok) {
      throw new Error('Failed to fetch trending news');
    }

    const data = await response.json();
    return data.data?.trendingNews || [];
  } catch (error) {
    console.error('Failed to fetch trending news:', error);
    return [];
  }
}

export default function TrendingSection() {
  const [trendingNews, setTrendingNews] = useState<TrendingArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrendingNews = async () => {
      try {
        const news = await fetchTrendingNews();
        setTrendingNews(news.slice(0, 6)); // Limit to 6 articles for sidebar
      } catch (error) {
        console.error('Error loading trending news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingNews();
  }, []);

  if (loading) {
    return (
      <section className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <TrendingUp className="text-red-600 mr-2" size={20} />
          <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-lg h-12"></div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="text-red-600 mr-2" size={20} />
        <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
      </div>
      <div className="space-y-3">
        {trendingNews.map((article, index) => (
          <Link
            key={article._id}
            href={`/${article.post_category || 'news'}/${article.post_url}`}
            className="group block hover:bg-gray-50 p-3 rounded-lg transition-colors duration-200"
          >
            <article className="flex items-start space-x-3">
              {/* Trending Number */}
              <div className="flex-shrink-0">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${
                  index < 2 ? 'bg-red-500' : index < 4 ? 'bg-yellow-500' : 'bg-green-500'
                }`}>
                  {index + 1}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {article.post_name}
                </h4>
                
                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock size={10} />
                    <span>{format(new Date(article.update_date), 'MMM dd')}</span>
                  </div>
                  {article.viewCount && (
                    <div className="flex items-center space-x-1">
                      <Eye size={10} />
                      <span>{article.viewCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      {/* View All Link */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Link
          href="/trending"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200 flex items-center justify-center"
        >
          View All Trending News
          <TrendingUp size={14} className="ml-1" />
        </Link>
      </div>
    </section>
  );
}
