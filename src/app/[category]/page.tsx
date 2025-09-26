import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { format } from 'date-fns';
import { getCategoryBySlug } from '@/lib/categories';
import { generateSEOMetadata } from '@/lib/seo';
import AdBanner from '@/components/ui/AdBanner';
import LazySection, { CriticalSection } from '@/components/performance/LazySection';
import OptimizedImage from '@/components/performance/OptimizedImage';
import { Eye, ChevronRight, ChevronLeft } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
  searchParams: {
    page?: string;
  };
}

interface NewsArticle {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_content: string;
  post_category: string;
  post_image: string;
  author: string;
  update_date: string;
  news_id: number;
}

interface CategoryNewsResponse {
  success: boolean;
  data: {
    categoryNews: NewsArticle[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalNews: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
    };
  };
}

async function fetchCategoryNews(category: string, page: number = 1): Promise<CategoryNewsResponse> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/api/next/v1/category?q=${category}&page=${page}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch category news');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching category news:', error);
    return {
      success: false,
      data: {
        categoryNews: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalNews: 0,
          hasNextPage: false,
          hasPrevPage: false,
          limit: 10,
        },
      },
    };
  }
}

function getImageUrl(imagePath: string): string {
  if (!imagePath) {
    console.log('No image path provided, using placeholder');
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgODBMMjIwIDEwMEwyMDAgMTIwTDE4MCAxMDBMMjAwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4=';
  }
  if (imagePath.startsWith('http')) return imagePath;
  
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';
  // Ensure imagePath starts with a slash
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  
  try {
    // Validate the URL construction
    new URL(cleanPath, baseUrl);
    const fullUrl = `${baseUrl}${cleanPath}`;
    console.log('Image URL:', fullUrl);
    return fullUrl;
  } catch (error) {
    console.error('Invalid image URL:', imagePath, error);
    return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjE5MiIgdmlld0JveD0iMCAwIDQwMCAxOTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMTkyIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgODBMMjIwIDEwMEwyMDAgMTIwTDE4MCAxMDBMMjAwIDgwWiIgZmlsbD0iIzlDQTNBRiIvPgo8dGV4dCB4PSIyMDAiIHk9IjE0MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOUNBM0FGIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBub3QgYXZhaWxhYmxlPC90ZXh0Pgo8L3N2Zz4=';
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = params;
  const categoryData = getCategoryBySlug(category);
  
  if (!categoryData) {
    return {
      title: 'Category Not Found',
    };
  }

  // Special SEO optimization for Tripura category
  if (category === 'tripura') {
    return generateSEOMetadata({
      title: `Tripura News | Latest Tripura News Today | Northeast Herald`,
      description: `Get latest Tripura news, Agartala news, Tripura politics, and Northeast India updates from Northeast Herald. Your trusted source for Tripura breaking news today.`,
      path: `/tripura`,
    });
  }

  return generateSEOMetadata({
    title: `${categoryData.name} News - Northeast Herald`,
    description: `Latest ${categoryData.name.toLowerCase()} news, updates, and analysis from Northeast Herald. Stay informed with comprehensive coverage.`,
    path: `/${category}`,
  });
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = params;
  const { page } = searchParams;
  const currentPage = parseInt(page || '1', 10);
  
  const categoryData = getCategoryBySlug(category);
  
  if (!categoryData) {
    notFound();
  }

  const newsData = await fetchCategoryNews(category, currentPage);

  if (!newsData.success || newsData.data.categoryNews.length === 0) {
    return (
      <>
        {/* Modern Breadcrumb with Background */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {categoryData.name}
              </h1>
              <div className="text-lg text-gray-600 max-w-2xl mx-auto">
                <p>{categoryData.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
              <Eye size={32} className="text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Stories Available</h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              We&apos;re working on bringing you the latest {categoryData.name.toLowerCase()} news. Check back soon for updates.
            </p>
          </div>
        </div>
      </>
    );
  }

  const { categoryNews, pagination } = newsData.data;

  return (
    <>
      {/* Modern Breadcrumb with Background */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-sm mb-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-medium">{categoryData.name}</span>
          </nav>
          
          {/* Category Header */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {categoryData.name}
            </h1>
            <div className="text-gray-600">
              <p>{categoryData.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* News Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {categoryNews.map((article, index) => (
                <Link key={article._id} href={`/${category}/${article.post_url}`} className="group block h-full">
                  <article className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
                    {/* Image - Fixed Size Container */}
                    <div className="relative w-full h-48 overflow-hidden flex-shrink-0 bg-gray-100">
                      <OptimizedImage
                        src={getImageUrl(article.post_image)}
                        alt={article.post_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        priority={index < 6}
                      />
                    </div>
                    {/* Content - Flex grow to fill remaining space */}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {article.post_name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">
                        {article.post_summary?.replace(/<[^>]*>/g, '') || ''}
                      </p>
                      {/* Meta Information - Pushed to bottom */}
                      <div className="flex items-center text-xs text-gray-500 space-x-2 mt-auto pt-2">
                        <span className="truncate">{article.author}</span>
                        <span>•</span>
                        <span>{format(new Date(article.update_date), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-center mt-8 space-x-2">
                {pagination.hasPrevPage && (
                  <Link
                    href={`/${category}${pagination.currentPage - 1 > 1 ? `?page=${pagination.currentPage - 1}` : ''}`}
                    className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
                  >
                    <ChevronLeft size={16} />
                  </Link>
                )}
                
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  let pageNum;
                  if (pagination.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.currentPage >= pagination.totalPages - 2) {
                    pageNum = pagination.totalPages - 4 + i;
                  } else {
                    pageNum = pagination.currentPage - 2 + i;
                  }
                  
                  const isActive = pageNum === pagination.currentPage;
                  
                  return (
                    <Link
                      key={pageNum}
                      href={`/${category}${pageNum > 1 ? `?page=${pageNum}` : ''}`}
                      className={`px-3 py-2 text-sm border rounded ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {pageNum}
                    </Link>
                  );
                })}
                
                {pagination.hasNextPage && (
                  <Link
                    href={`/${category}?page=${pagination.currentPage + 1}`}
                    className="px-3 py-2 text-sm border rounded hover:bg-gray-50"
                  >
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Ad Banner 1 - Critical (Above the fold) */}
              <CriticalSection>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <AdBanner 
                    type="sidebar"
                    className="w-full"
                  />
                </div>
              </CriticalSection>

              {/* Ad Banner 2 - Lazy load */}
              <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <AdBanner 
                    type="sidebar"
                    className="w-full"
                  />
                </div>
              </LazySection>

              {/* Ad Banner 3 - Lazy load */}
              <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <AdBanner 
                    type="sidebar"
                    className="w-full"
                  />
                </div>
              </LazySection>

              {/* Custom Banner Ad */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-600 text-sm mb-4">Get the latest news delivered to your inbox</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                  Subscribe Now
                </button>
              </div>

              {/* Another Custom Banner */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Follow Us</h3>
                <p className="text-gray-600 text-sm mb-4">Connect with us on social media</p>
                <div className="flex justify-center space-x-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600">Facebook</button>
                  <button className="bg-blue-400 text-white px-3 py-1 rounded text-xs hover:bg-blue-500">Twitter</button>
                  <button className="bg-pink-500 text-white px-3 py-1 rounded text-xs hover:bg-pink-600">Instagram</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}