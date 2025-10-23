'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, User, Tag, ChevronLeft, ChevronRight, Loader2, Clock, Eye } from 'lucide-react';
import { getCategorySlug } from '@/lib/categories';

interface SearchResult {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_keyword: string;
  meta_description: string;
  post_category: string;
  post_image: string;
  meta_tags: string;
  post_topic: string;
  post_editor: string;
  ne_insight: string;
  author: string;
  update_date: string;
  news_id: number;
  __v: number;
}

interface SearchResponse {
  success: boolean;
  data: {
    searchResults: SearchResult[];
    searchQuery: string;
    pagination: {
      currentPage: number;
      totalPages: number;
      totalResults: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      limit: number;
    };
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [pagination, setPagination] = useState<SearchResponse['data']['pagination'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const query = searchParams.get('q') || '';
  const page = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    setSearchQuery(query);
    if (query) {
      performSearch(query, page);
    }
  }, [query, page]);

  const performSearch = async (searchTerm: string, pageNum: number = 1) => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}&page=${pageNum}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status} ${response.statusText}`);
      }

      const data: SearchResponse = await response.json();
      
      if (data.success) {
        setSearchResults(data.data.searchResults);
        setPagination(data.data.pagination);
      } else {
        throw new Error('Search request was not successful');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while searching');
      setSearchResults([]);
      setPagination(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      tripura: 'bg-blue-50 text-blue-700 border-blue-200',
      national: 'bg-green-50 text-green-700 border-green-200',
      international: 'bg-orange-50 text-orange-700 border-orange-200',
      showbiz: 'bg-purple-50 text-purple-700 border-purple-200',
      northeast: 'bg-red-50 text-red-700 border-red-200',
      health: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      finance: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      article: 'bg-gray-50 text-gray-700 border-gray-200',
    };
    return colors[category.toLowerCase()] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Search News & Articles</h1>
            <p className="text-gray-600">Find the latest news and stories from our extensive archive</p>
          </div>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for news, articles, topics..."
                className="block w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm placeholder-gray-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="mr-1 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Search'
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Quick Search Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-sm text-gray-500 mr-2">Popular:</span>
            {['Politics', 'Sports', 'Business', 'Health', 'Technology'].map((term) => (
              <Link
                key={term}
                href={`/search?q=${term.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          <>
            {/* Results Summary */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Search results for &quot;{query}&quot;
                  </h2>
                  {pagination && !isLoading && (
                    <p className="text-sm text-gray-600 mt-1">
                      {pagination.totalResults.toLocaleString()} results found
                      {pagination.totalResults > 0 && (
                        <span className="ml-2">
                          (Page {pagination.currentPage} of {pagination.totalPages})
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-600">Searching...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <div className="text-center">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <h3 className="text-sm font-medium text-red-800 mb-2">Search Error</h3>
                    <p className="text-sm text-red-700 mb-4">{error}</p>
                    <button
                      onClick={() => performSearch(query, page)}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* No Results */}
            {!isLoading && !error && searchResults.length === 0 && query && (
              <div className="bg-white rounded-lg border border-gray-200 p-12">
                <div className="text-center max-w-md mx-auto">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn&apos;t find any articles matching &quot;{query}&quot;. Try adjusting your search terms.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Search suggestions:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Check your spelling</li>
                      <li>• Try more general keywords</li>
                      <li>• Use fewer search terms</li>
                      <li>• Try related topics or synonyms</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Results List */}
            {!isLoading && !error && searchResults.length > 0 && (
              <div className="space-y-6">
                {searchResults.map((result) => (
                  <article key={result._id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <div className="p-6">
                      <div className="flex gap-6">
                        {/* Article Image */}
                        <div className="flex-shrink-0">
                          <Link href={`/${getCategorySlug(result.post_category)}/${result.post_url}`}>
                            <div className="relative w-40 h-28 bg-gray-100 rounded-lg overflow-hidden group">
                              {result.post_image ? (
                                <Image
                                  src={result.post_image}
                                  alt={result.post_name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                  <Search className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                          </Link>
                        </div>

                        {/* Article Content */}
                        <div className="flex-1 min-w-0">
                          {/* Category and Topic Tags */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${getCategoryColor(result.post_category)}`}>
                              {result.post_category.charAt(0).toUpperCase() + result.post_category.slice(1)}
                            </span>
                            {result.post_topic && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200">
                                <Tag className="h-3 w-3 mr-1" />
                                {result.post_topic}
                              </span>
                            )}
                            {result.ne_insight === 'yes' && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                                <Eye className="h-3 w-3 mr-1" />
                                NE Insight
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                            <Link 
                              href={`/${result.post_category}/${result.post_url}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {result.post_name}
                            </Link>
                          </h3>

                          {/* Description */}
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {(result.meta_description || result.post_summary)?.replace(/<[^>]*>/g, '')}
                          </p>

                          {/* Meta Information */}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              <span>{result.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{formatDate(result.update_date)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && !isLoading && (
              <div className="mt-8 bg-white rounded-lg border border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to {Math.min(pagination.currentPage * pagination.limit, pagination.totalResults)} of {pagination.totalResults.toLocaleString()} results
                  </div>
                  
                  <nav className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                        const pageNum = Math.max(1, pagination.currentPage - 2) + i;
                        if (pageNum > pagination.totalPages) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            className={`px-3 py-2 text-sm font-medium rounded-md ${
                              pageNum === pagination.currentPage
                                ? 'bg-blue-600 text-white border border-blue-600'
                                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </nav>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}
