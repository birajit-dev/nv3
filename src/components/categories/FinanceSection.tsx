'use client';

import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { TrendingUp, DollarSign, BarChart3, ChevronRight, ExternalLink, Search, Activity } from 'lucide-react';
import { useEffect, useState } from 'react';

interface FinanceArticle {
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

async function fetchFinanceNews(): Promise<FinanceArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/finance`);

    if (!response.ok) {
      throw new Error('Failed to fetch finance news');
    }

    const data = await response.json();
    return data.data?.financenews || [];
  } catch (error) {
    console.error('Failed to fetch finance news:', error);
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

export default function FinanceSection() {
  const [articles, setArticles] = useState<FinanceArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFinanceNews = async () => {
      try {
        setLoading(true);
        const financeNews = await fetchFinanceNews();
        setArticles(financeNews.slice(0, 8));
      } catch (error) {
        console.error('Failed to load finance news:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFinanceNews();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-green-600">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Finance & Business</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-200 animate-pulse h-32 rounded-lg"></div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-green-50 via-white to-green-50 rounded-2xl p-6 border border-green-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse h-16 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-green-600">
          <div className="flex items-center space-x-3">
            <DollarSign className="text-green-600" size={24} />
            <h2 className="text-2xl font-bold text-gray-900">Finance & Business</h2>
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-12 text-center rounded-2xl border border-green-200">
          <DollarSign size={64} className="text-green-300 mx-auto mb-6" />
          <p className="text-green-600 text-xl font-medium">No finance news available</p>
        </div>
      </section>
    );
  }

  const gridArticles = articles.slice(0, 4);
  const listArticles = articles.slice(4, 8);

  return (
    <section className="mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-green-600">
        <div className="flex items-center space-x-3">
          <DollarSign className="text-green-600" size={32} />
          <h2 className="text-3xl font-bold text-gray-900">Finance & Business</h2>
        </div>
        <Link 
          href="/finance" 
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
        >
          <span>View All</span>
          <ChevronRight size={18} />
        </Link>
      </div>

      {/* Market Tools Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 mb-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <BarChart3 className="text-white" size={24} />
          <h3 className="text-xl font-bold">Market Tools</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="https://finviz.com/screener.ashx" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <Search className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">Stock Screener</h4>
            <p className="text-white/80 text-sm">Filter stocks by criteria</p>
          </a>
          
          <a 
            href="https://tradingview.com/markets/stocks-usa/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <Activity className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">Live Charts</h4>
            <p className="text-white/80 text-sm">Real-time market data</p>
          </a>
          
          <a 
            href="https://finance.yahoo.com/markets/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="text-white" size={20} />
              <ExternalLink className="text-white/70 group-hover:text-white" size={16} />
            </div>
            <h4 className="font-semibold text-white mb-1">Market Overview</h4>
            <p className="text-white/80 text-sm">Global market indices</p>
          </a>
        </div>
      </div>

      {/* Grid Layout - 4 articles in 2x2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {gridArticles.map((article, index) => (
          <Link key={article._id} href={`/finance/${article.post_url}`} className="block group">
            <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 hover:border-green-300 h-full">
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
                    <DollarSign size={12} className="text-green-600" />
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wider">
                      Finance
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-green-600 transition-colors duration-300 leading-tight text-sm">
                    {article.post_name}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span className="font-medium">{article.author}</span>
                    <time dateTime={article.update_date} className="text-green-600 font-semibold">
                      {format(new Date(article.update_date), 'MMM dd')}
                    </time>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom List Articles - More Finance News */}
      {listArticles.length > 0 && (
        <div className="bg-gradient-to-r from-green-50 via-white to-green-50 rounded-2xl p-6 border border-green-100">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-gray-900">More Business News</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-green-200 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listArticles.map((article, index) => (
              <Link key={article._id} href={`/finance/${article.post_url}`} className="block group">
                <div className="flex items-center space-x-4 p-4 bg-white rounded-lg hover:bg-green-50 transition-all duration-300 border border-transparent hover:border-green-200">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 5}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
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
