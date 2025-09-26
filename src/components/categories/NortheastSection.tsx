'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { MapPin, ChevronRight, Clock, User } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NortheastArticle {
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

async function fetchNortheastNews(): Promise<NortheastArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/northeast`);

    if (!response.ok) {
      throw new Error('Failed to fetch Northeast news');
    }

    const data = await response.json();
    return data.data?.northeastnews || [];
  } catch (error) {
    console.error('Failed to fetch Northeast news:', error);
    return [];
  }
}

export default function NortheastSection() {
  const [articles, setArticles] = useState<NortheastArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNortheastNews = async () => {
      try {
        setLoading(true);
        const northeastNews = await fetchNortheastNews();
            setArticles(northeastNews.slice(0, 10));
      } catch (error) {
        console.error('Failed to load Northeast news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadNortheastNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-red-600">
          <h2 className="text-2xl font-bold text-gray-900 uppercase">Northeast</h2>
          <MapPin size={20} className="text-red-600" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="bg-gray-200 animate-pulse h-80"></div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-32"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-red-600">
          <h2 className="text-2xl font-bold text-gray-900 uppercase">Northeast</h2>
          <MapPin size={20} className="text-red-600" />
        </div>
        <div className="bg-gray-50 p-6 text-center">
          <MapPin size={32} className="text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600">No Northeast news available at the moment.</p>
        </div>
      </section>
    );
  }

  const mainArticle = articles[0];
  const sideArticles = articles.slice(1, 5);
  const bottomArticles = articles.slice(5, 9);

  return (
    <section className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-red-600">
        <h2 className="text-2xl font-bold text-gray-900 uppercase">Northeast</h2>
        <Link 
          href="/northeast" 
          className="flex items-center space-x-1 text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
        >
          <span>View All</span>
          <ChevronRight size={16} />
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
        {/* Main Story - Large Left Side */}
        <div className="lg:col-span-2">
          {mainArticle && (
            <Link href={`/northeast/${mainArticle.post_url}`} className="block group">
              <article className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={mainArticle.post_image ? (mainArticle.post_image.startsWith('http') ? mainArticle.post_image : `https://app.neherald.com${mainArticle.post_image}`) : '/placeholder-news.jpg'}
                    alt={mainArticle.post_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors line-clamp-3 flex-1">
                    {mainArticle.post_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {mainArticle.post_summary}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 mt-auto">
                    <div className="flex items-center space-x-1">
                      <User size={12} />
                      <span>{mainArticle.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <time dateTime={mainArticle.update_date}>
                        {format(new Date(mainArticle.update_date), 'MMM dd, yyyy')}
                      </time>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        {/* Side Stories Grid - Right Side */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
          {sideArticles.map((article) => (
            <Link key={article._id} href={`/northeast/${article.post_url}`} className="block group">
              <article className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
                <div className="relative aspect-video">
                  <Image
                    src={article.post_image ? (article.post_image.startsWith('http') ? article.post_image : `https://app.neherald.com${article.post_image}`) : '/placeholder-news.jpg'}
                    alt={article.post_name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <div className="p-2 flex-1 flex flex-col">
                  <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors text-sm line-clamp-3 flex-1">
                    {article.post_name}
                  </h4>
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
      </div>

      {/* Bottom Row - 4 Column Grid */}
      {bottomArticles.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {bottomArticles.map((article) => (
                <Link key={article._id} href={`/northeast/${article.post_url}`} className="block group">
                <article className="bg-white border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col">
                  <div className="relative aspect-video">
                    <Image
                      src={article.post_image ? (article.post_image.startsWith('http') ? article.post_image : `https://app.neherald.com${article.post_image}`) : '/placeholder-news.jpg'}
                      alt={article.post_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-2 flex-1 flex flex-col">
                    <h4 className="font-medium text-gray-900 mb-2 group-hover:text-red-600 transition-colors text-sm line-clamp-3 flex-1">
                      {article.post_name}
                    </h4>
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
        </div>
      )}
    </section>
  );
}
