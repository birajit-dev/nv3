'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { Star, Film, Music, Tv, Camera, ExternalLink, Sparkles, Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCategorySlug } from '@/lib/categories';

interface EntertainmentArticle {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_content: string;
  post_image: string;
  post_category: string;
  author: string;
  update_date: string;
  news_id: number;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchEntertainmentNews(): Promise<EntertainmentArticle[]> {
  try {
    console.log('Fetching entertainment news from:', `${API_BASE_URL}/showbiz`);
    const response = await fetch(`${API_BASE_URL}/showbiz`);

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      throw new Error(`Failed to fetch entertainment news: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    console.log('Entertainment news array:', data.data?.showbiznews);
    
    return data.data?.showbiznews || [];
  } catch (error) {
    console.error('Failed to fetch entertainment news:', error);
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

// Helper function to strip HTML tags and decode HTML entities
function stripHtml(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags
  const withoutTags = html.replace(/<[^>]*>/g, '');
  
  // Decode common HTML entities
  const decoded = withoutTags
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '...')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–');
  
  return decoded.trim();
}

export default function EntertainmentSection() {
  const [articles, setArticles] = useState<EntertainmentArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEntertainmentNews = async () => {
      try {
        console.log('Loading entertainment news...');
        setLoading(true);
        setError(null);
        const entertainmentNews = await fetchEntertainmentNews();
        console.log('Fetched entertainment news:', entertainmentNews);
        console.log('Number of articles:', entertainmentNews.length);
        setArticles(entertainmentNews.slice(0, 12));
      } catch (error) {
        console.error('Failed to load entertainment news:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadEntertainmentNews();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-white/20 rounded w-64 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white/20 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full py-12">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-center text-white">
          <Film className="mx-auto mb-4" size={48} />
          <p className="mb-2">Error loading entertainment news</p>
          <p className="text-white/70 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="w-full py-12">
        <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-center text-white">
          <Film className="mx-auto mb-4" size={48} />
          <p>No entertainment news available at the moment.</p>
        </div>
      </section>
    );
  }

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1, 9);
  const listArticles = articles.slice(9);

  return (
    <section className="w-full py-12">


      {/* Luxury Entertainment Container */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl p-8 text-white">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
            <Star className="text-white" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Entertainment</h2>
            <p className="text-white/90">Latest showbiz news and celebrity updates</p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <a 
            href="https://variety.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <Film className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">Movies</h4>
            <p className="text-white/80 text-sm">Latest film news</p>
          </a>
          
          <a 
            href="https://www.billboard.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <Music className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">Music</h4>
            <p className="text-white/80 text-sm">Charts & music news</p>
          </a>

          <a 
            href="https://www.tvguide.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <Tv className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">TV Shows</h4>
            <p className="text-white/80 text-sm">Television updates</p>
          </a>
          
          <a 
            href="https://people.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <Camera className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">Celebrity</h4>
            <p className="text-white/80 text-sm">Celebrity news</p>
          </a>
        </div>

        {/* Featured Article - Full Width */}
        <div className="mb-8">
          <Link href={`/${getCategorySlug(featuredArticle.post_category)}/${featuredArticle.post_url}`} className="block group">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-80">
                  <Image
                    src={getImageUrl(featuredArticle.post_image)}
                    alt={featuredArticle.post_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-4">
                    <Sparkles size={16} className="text-yellow-300" />
                    <span className="text-sm font-bold text-yellow-300 uppercase tracking-wider">
                      Featured Entertainment
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                    {stripHtml(featuredArticle.post_name)}
                  </h2>
                  <p className="text-white/80 mb-6 line-clamp-3 leading-relaxed">
                    {stripHtml(featuredArticle.post_summary)}
                  </p>
                  <div className="flex items-center justify-between text-sm text-white/70">
                    <span className="font-medium">{featuredArticle.author}</span>
                    <time dateTime={featuredArticle.update_date} className="text-yellow-300 font-semibold">
                      {format(new Date(featuredArticle.update_date), 'MMM dd, yyyy')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Grid Layout - 8 articles in responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {gridArticles.map((article, index) => (
            <Link key={article._id} href={`/${getCategorySlug(article.post_category)}/${article.post_url}`} className="block group">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                <div className="relative h-48">
                  <Image
                    src={getImageUrl(article.post_image)}
                    alt={article.post_name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-3 left-3">
                    <div className="bg-yellow-400 text-purple-900 px-2 py-1 rounded-full text-xs font-bold">
                      Entertainment
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300 leading-tight">
                    {stripHtml(article.post_name)}
                  </h3>
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {stripHtml(article.post_summary)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span className="font-medium">{article.author}</span>
                    <time dateTime={article.update_date} className="text-yellow-300 font-semibold">
                      {format(new Date(article.update_date), 'MMM dd')}
                    </time>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom List Articles - More Entertainment News */}
        {listArticles.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center space-x-3 mb-6">
              <Award className="text-yellow-300" size={24} />
              <h3 className="text-xl font-bold text-white">More Entertainment News</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-white/30 to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listArticles.map((article, index) => (
                <Link key={article._id} href={`/entertainment/${article.post_url}`} className="block group">
                  <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg hover:bg-white/15 transition-all duration-300 border border-white/10 hover:border-white/30">
                    <div className="w-8 h-8 bg-yellow-400 text-purple-900 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 10}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-white line-clamp-1 group-hover:text-yellow-300 transition-colors duration-300">
                        {stripHtml(article.post_name)}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-white/60">
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
      </div>
    </section>
  );
}
