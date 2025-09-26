'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Camera, Calendar, Eye, ChevronRight, ChevronLeft } from 'lucide-react';

interface Gallery {
  _id: string;
  gallery_title: string;
  gallery_path: string[];
  gallery_keyword: string;
  gallery_description: string;
  gallery_url: string;
  update_date: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface PhotoAlbumData {
  galleries: Gallery[];
  pagination: Pagination;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

// Helper function to get the correct image URL
function getImageUrl(imageUrl: string): string {
  if (!imageUrl) return '/placeholder-gallery.jpg';
  
  // If it's already an absolute URL (starts with http:// or https://), use it as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // If it's a relative URL, prepend the local server URL
  return `https://app.neherald.com/uploads/gallery/${imageUrl}`;
}

async function fetchPhotoAlbums(page: number = 1): Promise<PhotoAlbumData> {
  try {
    const response = await fetch(`${API_BASE_URL}/photoalbum?page=${page}&limit=24`);

    if (!response.ok) {
      throw new Error('Failed to fetch photo albums');
    }

    const data = await response.json();
    return {
      galleries: data.data?.galleries || [],
      pagination: data.data?.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 24,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  } catch (error) {
    console.error('Failed to fetch photo albums:', error);
    return { 
      galleries: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 24,
        hasNextPage: false,
        hasPrevPage: false
      }
    };
  }
}

export default function PhotoAlbumPage() {
  const [albumData, setAlbumData] = useState<PhotoAlbumData>({ 
    galleries: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 24,
      hasNextPage: false,
      hasPrevPage: false
    }
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const loadPhotoAlbums = async (page: number) => {
    setLoading(true);
    try {
      const data = await fetchPhotoAlbums(page);
      setAlbumData(data);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading photo albums:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhotoAlbums(1);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= albumData.pagination.totalPages) {
      loadPhotoAlbums(page);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPaginationButtons = () => {
    const { currentPage, totalPages, hasPrevPage, hasNextPage } = albumData.pagination;
    const buttons = [];
    
    // Previous button
    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={`px-3 py-2 rounded-lg flex items-center space-x-1 ${
          hasPrevPage
            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <ChevronLeft size={16} />
        <span>Previous</span>
      </button>
    );

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 rounded-lg ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 py-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={`px-3 py-2 rounded-lg flex items-center space-x-1 ${
          hasNextPage
            ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span>Next</span>
        <ChevronRight size={16} />
      </button>
    );

    return buttons;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="border-b-4 border-blue-600 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 bg-blue-600 text-white px-4 py-2 inline-block">
              PHOTO GALLERY
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600 text-lg">
              Explore our collection of news photos and visual stories
            </p>
            {albumData.pagination.totalItems > 0 && (
              <p className="text-sm text-gray-500">
                Showing {((albumData.pagination.currentPage - 1) * albumData.pagination.itemsPerPage) + 1} - {Math.min(albumData.pagination.currentPage * albumData.pagination.itemsPerPage, albumData.pagination.totalItems)} of {albumData.pagination.totalItems} galleries
              </p>
            )}
          </div>
        </div>

        {/* Photo Albums Grid */}
        {albumData.galleries.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {albumData.galleries.map((gallery) => (
                <Link 
                  key={gallery._id} 
                  href={`/photo-album/${gallery.gallery_url}`}
                  className="group block"
                >
                  <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Thumbnail Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={getImageUrl(gallery.gallery_path[0])}
                        alt={gallery.gallery_title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Photo Count Overlay */}
                      <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Camera size={12} />
                        <span>{gallery.gallery_path.length}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {gallery.gallery_title}
                      </h2>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {gallery.gallery_description}
                      </p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <time dateTime={gallery.update_date}>
                            {format(new Date(gallery.update_date), 'MMM dd, yyyy')}
                          </time>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Eye size={12} />
                            <span>View Gallery</span>
                          </div>
                          <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {albumData.pagination.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                {renderPaginationButtons()}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Camera className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Photo Albums Available</h3>
            <p className="text-gray-600">Check back later for new photo galleries.</p>
          </div>
        )}
      </div>
    </div>
  );
}
