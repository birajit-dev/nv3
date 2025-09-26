'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Heart, ChevronRight, Clock, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface HealthArticle {
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

async function fetchHealthNews(): Promise<HealthArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error('Failed to fetch Health news');
    }

    const data = await response.json();
    return data.data?.healthnews || [];
  } catch (error) {
    console.error('Failed to fetch Health news:', error);
    return [];
  }
}

function getImageSrc(postImage: string): string {
  if (!postImage) {
    return '/placeholder-news.jpg';
  }
  
  // If it's already an absolute URL, return as is
  if (postImage.startsWith('http://') || postImage.startsWith('https://')) {
    return postImage;
  }
  
  // If it starts with a slash, it's a relative path from the API server
  if (postImage.startsWith('/')) {
    return `https://app.neherald.com${postImage}`;
  }
  
  // Otherwise, assume it's a relative path that needs a leading slash
  return `https://app.neherald.com/${postImage}`;
}

export default function HealthSection() {
  const [articles, setArticles] = useState<HealthArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHealthNews = async () => {
      try {
        setLoading(true);
        const healthNews = await fetchHealthNews();
        setArticles(healthNews.slice(0, 4));
      } catch (error) {
        console.error('Failed to load Health news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadHealthNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 uppercase">Health</h2>
          <Heart size={20} className="text-green-600" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-64"></div>
          ))}
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-green-600">
          <h2 className="text-2xl font-bold text-gray-900 uppercase">Health</h2>
          <Heart size={20} className="text-green-600" />
        </div>
        <div className="bg-gray-50 p-6 text-center">
          <Heart size={32} className="text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No Health news available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-green-600">
        <h2 className="text-2xl font-bold text-gray-900 uppercase">Health</h2>
        <Link 
          href="/health" 
          className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
        >
          <span>View All</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* 4 Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.map((article) => (
          <Link key={article._id} href={`/health/${article.post_url}`} className="block group">
            <article className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
              <div className="relative aspect-video">
                <Image
                  src={getImageSrc(article.post_image)}
                  alt={article.post_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col">
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors text-sm line-clamp-3 flex-1">
                  {article.post_name}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                  <div className="flex items-center space-x-1">
                    <User size={10} />
                    <span className="truncate max-w-16">{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={10} />
                    <time dateTime={article.update_date}>
                      {format(new Date(article.update_date), 'MMM dd')}
                    </time>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
