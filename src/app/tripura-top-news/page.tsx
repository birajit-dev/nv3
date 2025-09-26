import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { User, Eye, Calendar, ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { generateSEOMetadata } from '@/lib/seo';
import AdBanner from '@/components/ui/AdBanner';

export const metadata: Metadata = generateSEOMetadata({
  title: "Tripura Top News | Latest Tripura Headlines Today | Northeast Herald",
  description: "Get latest Tripura top news, breaking headlines, and important updates from Tripura today. Northeast Herald brings you the most important Tripura news stories.",
});

// Extended interface for articles with additional fields
interface ExtendedNewsArticle extends NewsArticle {
  post_category?: string;
  post_views?: number;
  ibns_id?: string;
  news_id: number;
  post_topic?: string;
  post_editor?: string;
  ne_insight?: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalNews: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

interface TripuraTopNewsResponse {
  success: boolean;
  data: {
    topheadlines: ExtendedNewsArticle[];
    pagination: PaginationInfo;
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';

async function fetchTripuraTopNews(page: number = 1): Promise<TripuraTopNewsResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/next/v1/topnewstripura?page=${page}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch Tripura top news:', error);
    return null;
  }
}

function getImageUrl(imagePath: string): string {
  if (!imagePath) {
    console.log('No image path provided, using placeholder');
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgODBMMjIwIDEwMEwyMDAgMTIwTDE4MCAxMDBMMjAwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4=';
  }
  if (imagePath.startsWith('http')) return imagePath;
  
  const fullUrl = `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  console.log('Image URL:', fullUrl);
  return fullUrl;
}

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function TripuraTopNewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const newsData = await fetchTripuraTopNews(currentPage);

  if (!newsData || !newsData.success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tripura Top News</h1>
            <p className="text-gray-600">Unable to load news at the moment. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const { topheadlines = [], pagination } = newsData.data;

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, pagination.currentPage - delta);
      i <= Math.min(pagination.totalPages - 1, pagination.currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (pagination.currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (pagination.currentPage + delta < pagination.totalPages - 1) {
      rangeWithDots.push('...', pagination.totalPages);
    } else {
      rangeWithDots.push(pagination.totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Go to homepage"
                >
                  <Home size={16} className="mr-1" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <ChevronRight size={14} className="text-gray-400" />
              </li>
              <li>
                <Link 
                  href="/tripura" 
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  Tripura
                </Link>
              </li>
              <li>
                <ChevronRight size={14} className="text-gray-400" />
              </li>
              <li>
                <span className="text-gray-900 font-medium" aria-current="page">
                  Top News
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-green-600">
                Tripura
              </span>{' '}
              <span className="text-gray-900">Top News</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 leading-relaxed">
              Stay updated with the latest breaking news, politics, sports, and developments from Tripura state.
            </p>
          </div>
        </div>

        

        {/* News Grid */}
        {topheadlines && topheadlines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {topheadlines.map((article, index) => (
              <Link
                key={article._id}
                href={`/${article.post_category || 'tripura'}/${article.post_url}`}
                className="group block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-200 h-full flex flex-col"
              >
                <article className="h-full flex flex-col">
                  {/* Image - Fixed Size Container */}
                  <div className="relative w-full h-48 overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={getImageUrl(article.post_image || '')}
                      alt={article.post_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      priority={index < 6}
                    />
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                        {article.post_topic || 'Tripura'}
                      </span>
                    </div>
                  </div>

                  {/* Content - Flex grow to fill remaining space */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {article.post_name}
                    </h2>
                    
                    {article.post_summary && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-1">
                        {article.post_summary.replace(/<[^>]*>/g, '')}
                      </p>
                    )}

                    {/* Meta Information - Pushed to bottom */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <User size={12} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <time dateTime={article.update_date}>
                            {format(new Date(article.update_date), 'MMM dd')}
                          </time>
                        </div>
                      </div>
                      {article.post_views && (
                        <div className="flex items-center space-x-1">
                          <Eye size={12} />
                          <span>{article.post_views}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No news articles found.</p>
          </div>
        )}

        {/* Pagination */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 mb-8">
            {/* Previous Button */}
            <div className="flex items-center">
              {pagination.hasPrevPage ? (
                <Link
                  href={`/tripura-top-news?page=${pagination.prevPage}`}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </Link>
              ) : (
                <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                  <ChevronLeft size={16} className="mr-1" />
                  Previous
                </span>
              )}
            </div>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {generatePaginationNumbers().map((pageNum, index) => (
                <div key={index}>
                  {pageNum === '...' ? (
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <Link
                      href={`/tripura-top-news?page=${pageNum}`}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        pageNum === pagination.currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:text-blue-600'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Next Button */}
            <div className="flex items-center">
              {pagination.hasNextPage ? (
                <Link
                  href={`/tripura-top-news?page=${pagination.nextPage}`}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-blue-600 transition-colors"
                >
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              ) : (
                <span className="flex items-center px-4 py-2 text-sm font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed">
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </span>
              )}
            </div>
          </div>
        )}

        {/* Bottom Ad Banner */}
        <div className="mt-12">
          <AdBanner type="horizontal" />
        </div>
      </div>
    </div>
  );
}
