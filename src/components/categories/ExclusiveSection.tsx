'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Star, ChevronRight, Clock, User, Crown } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ExclusiveArticle {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_content: string;
  post_image: string;
  author: string;
  update_date: string;
  news_id: number;
  meta_description: string;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchExclusiveNews(): Promise<ExclusiveArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/article`);

    if (!response.ok) {
      throw new Error('Failed to fetch Exclusive news');
    }

    const data = await response.json();
    return data.data?.articlenews || [];
  } catch (error) {
    console.error('Failed to fetch Exclusive news:', error);
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

export default function ExclusiveSection() {
  const [articles, setArticles] = useState<ExclusiveArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExclusiveNews = async () => {
      try {
        setLoading(true);
        const exclusiveNews = await fetchExclusiveNews();
        setArticles(exclusiveNews.slice(0, 10));
      } catch (error) {
        console.error('Failed to load Exclusive news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadExclusiveNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-amber-400">
            <div className="flex items-center space-x-3">
              <Crown size={24} className="text-amber-600" />
              <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">Exclusive</h2>
              <div className="bg-amber-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                PREMIUM
              </div>
            </div>
            <Star size={20} className="text-amber-600" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <div className="bg-gray-200 animate-pulse h-96 rounded-lg"></div>
            </div>
            <div className="lg:col-span-3 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-200 animate-pulse h-24 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-amber-400">
            <div className="flex items-center space-x-3">
              <Crown size={24} className="text-amber-600" />
              <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">Exclusive</h2>
              <div className="bg-amber-600 text-white px-2 py-1 text-xs font-bold rounded-full">
                PREMIUM
              </div>
            </div>
            <Star size={20} className="text-amber-600" />
          </div>
          <div className="text-center py-8">
            <Crown size={48} className="text-amber-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No exclusive content available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 4);
  const bottomArticles = articles.slice(4, 6);

  return (
    <section className="mb-8">
      {/* Premium Container */}
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-lg p-6 shadow-lg">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-amber-400">
          <div className="flex items-center space-x-3">
            <Crown size={24} className="text-amber-600" />
            <h2 className="text-3xl font-bold text-gray-900 uppercase tracking-wide">Exclusive</h2>
            <div className="bg-amber-600 text-white px-3 py-1 text-xs font-bold rounded-full animate-pulse">
              PREMIUM
            </div>
          </div>
          <Link 
            href="/article" 
            className="flex items-center space-x-1 text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors bg-white px-3 py-1 rounded-full border border-amber-200 hover:border-amber-300"
          >
            <span>View All</span>
            <ChevronRight size={16} />
          </Link>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
          {/* Featured Story - Smaller Left Side */}
          <div className="lg:col-span-2">
            {featuredArticle && (
              <Link href={`/article/${featuredArticle.post_url}`} className="block group">
                <article className="bg-white border-2 border-amber-300 hover:border-amber-400 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
                  {/* Premium Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 text-xs font-bold rounded-full flex items-center space-x-1">
                    <Star size={10} />
                    <span>EXCLUSIVE</span>
                  </div>
                  
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={getImageSrc(featuredArticle.post_image)}
                      alt={featuredArticle.post_name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                  
                  <div className="p-3 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-3 flex-1">
                      {featuredArticle.post_name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {featuredArticle.meta_description || featuredArticle.post_summary}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2 border-t border-amber-100">
                      <div className="flex items-center space-x-1">
                        <User size={12} />
                        <span className="font-medium">{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <time dateTime={featuredArticle.update_date}>
                          {format(new Date(featuredArticle.update_date), 'MMM dd, yyyy')}
                        </time>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            )}
          </div>

          {/* Side Stories - Wider Right Side */}
          <div className="lg:col-span-3 space-y-4">
            {sideArticles.map((article, index) => (
              <Link key={article._id} href={`/article/${article.post_url}`} className="block group">
                <article className="bg-white border border-amber-200 hover:border-amber-300 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 flex relative">
                  {/* Mini Premium Badge */}
                  <div className="absolute top-2 left-2 z-10 bg-amber-500 text-white px-2 py-0.5 text-xs font-bold rounded-full">
                    <Star size={8} />
                  </div>
                  
                  <div className="relative w-32 h-24 flex-shrink-0">
                  <Image
                    src={getImageSrc(article.post_image)}
                    alt={article.post_name}
                    fill
                    sizes="128px"
                    className="!object-fill" // force override
                  />
                  </div>
                  
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <h4 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors text-sm line-clamp-2 mb-2">
                      {article.post_name}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="truncate max-w-32">{article.author}</span>
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

        {/* Bottom Row - 2 Column Grid */}
        {bottomArticles.length > 0 && (
          <div className="border-t border-amber-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bottomArticles.map((article) => (
                <Link key={article._id} href={`/article/${article.post_url}`} className="block group">
                  <article className="bg-white border border-amber-200 hover:border-amber-300 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 h-full flex flex-col relative">
                    {/* Premium Badge */}
                    <div className="absolute top-2 right-2 z-10 bg-amber-500 text-white px-2 py-1 text-xs font-bold rounded-full flex items-center space-x-1">
                      <Star size={10} />
                      <span>EXCLUSIVE</span>
                    </div>
                    
                    <div className="relative aspect-video">
                      <Image
                        src={getImageSrc(article.post_image)}
                        alt={article.post_name}
                        fill
                        className="object-fill group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    
                    <div className="p-3 flex-1 flex flex-col">
                      <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors text-sm line-clamp-3 flex-1">
                        {article.post_name}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2 border-t border-amber-100">
                        <div className="flex items-center space-x-1">
                          <User size={10} />
                          <span className="truncate max-w-20">{article.author}</span>
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
      </div>
    </section>
  );
}
