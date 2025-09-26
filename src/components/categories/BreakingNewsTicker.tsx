'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface BreakingNewsItem {
  _id: string;
  breaking_title: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/breaking`);

    if (!response.ok) {
      throw new Error('Failed to fetch breaking news');
    }

    const data = await response.json();
    return data.data?.breakingNews || [];
  } catch (error) {
    console.error('Failed to fetch breaking news:', error);
    return [];
  }
}

export default function BreakingNewsTicker() {
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const loadBreakingNews = async () => {
      setIsLoading(true);
      const news = await fetchBreakingNews();
      setBreakingNews(news);
      setIsLoading(false);
    };

    loadBreakingNews();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (isLoading) {
    return (
      <div className="bg-red-600 text-white py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <span className="bg-white text-red-600 px-3 py-1 text-xs font-bold rounded-full flex-shrink-0">
              BREAKING
            </span>
            <div className="flex animate-pulse">
              <span className="text-sm font-medium whitespace-nowrap">
                Loading breaking news...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (breakingNews.length === 0 || !isVisible) {
    return null;
  }

  return (
    <div className="bg-red-600 text-white py-2 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <span className="bg-white text-red-600 px-3 py-1 text-xs font-bold rounded-full flex-shrink-0">
            BREAKING
          </span>
          <div className="flex animate-scroll space-x-8 flex-1">
            {breakingNews.map((item) => (
              <span key={item._id} className="text-sm font-medium whitespace-nowrap">
                {item.breaking_title}
              </span>
            ))}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 hover:bg-red-700 rounded-full transition-colors"
            aria-label="Close breaking news ticker"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}