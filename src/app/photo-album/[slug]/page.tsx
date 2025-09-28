'use client';
import { useState, useEffect, use, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  ArrowLeft, 
  Calendar, 
  Download, 
  ZoomIn, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Share2, 
  Heart,
  Maximize2,
  Info
} from 'lucide-react';

interface Gallery {
  _id: string;
  gallery_title: string;
  gallery_path: string[];
  gallery_keyword: string;
  gallery_description: string;
  gallery_url: string;
  update_date: string;
  gallery_id: number;
}

interface GalleryData {
  gallery: Gallery;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';

async function fetchGallery(slug: string): Promise<GalleryData | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/next/v1/gallery/single?gurl=${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch gallery');
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
    return null;
  }
}

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [galleryData, setGalleryData] = useState<GalleryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showImageInfo, setShowImageInfo] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const resolvedParams = use(params);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      try {
        const data = await fetchGallery(resolvedParams.slug);
        setGalleryData(data);
      } catch (error) {
        console.error('Error loading gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [resolvedParams.slug]);

  const openLightbox = useCallback((index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
    if (typeof window !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
    setIsFullscreen(false);
    setShowImageInfo(false);
    if (typeof window !== 'undefined' && document.body) {
      document.body.style.overflow = 'unset';
    }
  }, []);

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    if (!galleryData || selectedImageIndex === null) return;
    
    const totalImages = galleryData.gallery.gallery_path.length;
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = selectedImageIndex === 0 ? totalImages - 1 : selectedImageIndex - 1;
    } else {
      newIndex = selectedImageIndex === totalImages - 1 ? 0 : selectedImageIndex + 1;
    }
    
    setSelectedImageIndex(newIndex);
  }, [galleryData, selectedImageIndex]);

  const toggleFavorite = useCallback((index: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(index)) {
        newFavorites.delete(index);
      } else {
        newFavorites.add(index);
      }
      return newFavorites;
    });
  }, []);

  const shareImage = useCallback(async (index: number) => {
    if (!galleryData) return;
    
    const imageUrl = `${API_BASE_URL}/uploads/gallery/${encodeURIComponent(galleryData.gallery.gallery_path[index])}`;
    const shareData = {
      title: `${galleryData.gallery.gallery_title} - Photo ${index + 1}`,
      text: `Check out this photo from ${galleryData.gallery.gallery_title}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  }, [galleryData]);

  const downloadImage = (imagePath: string, imageName: string) => {
    if (typeof window === 'undefined' || !document.body) return;
    
    const imageUrl = `${API_BASE_URL}/uploads/gallery/${encodeURIComponent(imagePath)}`;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = imageName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      switch (event.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, galleryData, closeLightbox, navigateImage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="animate-pulse">
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-full max-w-xs sm:max-w-sm mb-4 sm:mb-6"></div>
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-full max-w-sm sm:max-w-md mb-6 sm:mb-8"></div>
            <div className="h-4 sm:h-6 bg-gray-200 rounded w-full max-w-xs sm:max-w-sm mb-3 sm:mb-4"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-full max-w-xs mb-6 sm:mb-8"></div>
            <div className="space-y-4 sm:space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded h-48 sm:h-64"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!galleryData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Gallery Not Found</h1>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">The requested photo gallery could not be found.</p>
          <Link 
            href="/photo-album"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Back to Photo Albums</span>
          </Link>
        </div>
      </div>
    );
  }

  const { gallery } = galleryData;

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 text-xs sm:text-sm md:text-base text-gray-600 mb-4 sm:mb-6 md:mb-8 overflow-x-auto scrollbar-hide">
            <Link href="/" className="flex items-center space-x-1 hover:text-blue-600 transition-colors whitespace-nowrap flex-shrink-0">
              <Home size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
              <span className="hidden xs:inline">Home</span>
            </Link>
            <ChevronRight size={12} className="text-gray-400 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
            <Link href="/photo-album" className="hover:text-blue-600 transition-colors whitespace-nowrap flex-shrink-0">
              <span className="hidden sm:inline">Photo Albums</span>
              <span className="sm:hidden">Albums</span>
            </Link>
            <ChevronRight size={12} className="text-gray-400 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-gray-900 font-medium truncate max-w-[120px] sm:max-w-[200px] md:max-w-none" title={gallery.gallery_title}>
              {gallery.gallery_title}
            </span>
          </nav>

          {/* Back Button */}
          <Link 
            href="/photo-album"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
          >
            <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
            <span>Back to Photo Albums</span>
          </Link>

          {/* Gallery Header */}
          <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              {gallery.gallery_title}
            </h1>
            
            <p className="text-gray-700 text-base sm:text-lg mb-3 sm:mb-4 leading-relaxed">
              {gallery.gallery_description}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar size={14} className="sm:w-4 sm:h-4" />
                <time dateTime={gallery.update_date}>
                  {format(new Date(gallery.update_date), 'MMM dd, yyyy')}
                </time>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>{gallery.gallery_path.length} photos</span>
            </div>
          </div>

          {/* Simple Photo List */}
          <div className="space-y-6 sm:space-y-8">
            {gallery.gallery_path.map((imagePath, index) => {
              const imageUrl = `${API_BASE_URL}/uploads/gallery/${encodeURIComponent(imagePath)}`;
              
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                  {/* Image Header */}
                  <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        Photo {index + 1}
                      </h3>
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <button
                          onClick={() => downloadImage(imagePath, `${gallery.gallery_title}-${index + 1}.jpg`)}
                          className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                          title="Download"
                        >
                          <Download size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(index)}
                          className={`transition-colors p-1 ${
                            favorites.has(index) 
                              ? 'text-red-500' 
                              : 'text-gray-600 hover:text-red-500'
                          }`}
                          title={favorites.has(index) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart size={16} className={`sm:w-4.5 sm:h-4.5 ${favorites.has(index) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => openLightbox(index)}
                          className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                          title="View full size"
                        >
                          <ZoomIn size={16} className="sm:w-4.5 sm:h-4.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="p-3 sm:p-6">
                    <div className="relative bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={`Photo ${index + 1} from ${gallery.gallery_title}`}
                        className="w-full h-auto cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => openLightbox(index)}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = `
                              <div class="flex items-center justify-center h-48 sm:h-64 bg-gray-100 text-gray-500">
                                <div class="text-center px-4">
                                  <p class="text-sm">Image not available</p>
                                  <p class="text-xs mt-1 break-all">${imagePath}</p>
                                </div>
                              </div>
                            `;
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Image Info */}
                  <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                    <p className="text-xs sm:text-sm text-gray-600 break-all">
                      File: {imagePath}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Responsive Modal */}
      {isModalOpen && selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-2 sm:p-4"
          onClick={closeLightbox}
        >
          <div className="relative w-full h-full max-w-4xl max-h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-black bg-opacity-50 text-white p-2 sm:p-2 rounded hover:bg-opacity-70 transition-colors"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>
            
            {/* Image */}
            <img
              src={`${API_BASE_URL}/uploads/gallery/${encodeURIComponent(gallery.gallery_path[selectedImageIndex])}`}
              alt={`Photo ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Navigation */}
            {gallery.gallery_path.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded hover:bg-opacity-70 transition-colors"
                >
                  <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 sm:p-3 rounded hover:bg-opacity-70 transition-colors"
                >
                  <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                </button>
              </>
            )}
            
            {/* Image counter */}
            <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base">
              {selectedImageIndex + 1} / {gallery.gallery_path.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}