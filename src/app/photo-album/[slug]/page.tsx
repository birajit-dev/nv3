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

  // Helper function to get thumbnail images around current selection
  const getThumbnailImages = () => {
    if (!galleryData || selectedImageIndex === null) return [];
    
    const totalImages = galleryData.gallery.gallery_path.length;
    const thumbnailCount = Math.min(5, totalImages); // Show max 5 thumbnails
    const halfCount = Math.floor(thumbnailCount / 2);
    
    let startIndex = selectedImageIndex - halfCount;
    let endIndex = selectedImageIndex + halfCount;
    
    // Adjust bounds if we're near the beginning or end
    if (startIndex < 0) {
      endIndex = Math.min(thumbnailCount - 1, totalImages - 1);
      startIndex = 0;
    } else if (endIndex >= totalImages) {
      startIndex = Math.max(0, totalImages - thumbnailCount);
      endIndex = totalImages - 1;
    }
    
    const thumbnails = [];
    for (let i = startIndex; i <= endIndex; i++) {
      thumbnails.push({
        index: i,
        path: galleryData.gallery.gallery_path[i]
      });
    }
    
    return thumbnails;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-300 rounded w-96 mb-6"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mb-8"></div>
            <div className="h-6 bg-gray-300 rounded w-96 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-48 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 bg-gray-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!galleryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Gallery Not Found</h1>
          <p className="text-gray-600 mb-6">The requested photo gallery could not be found.</p>
          <Link 
            href="/photo-album"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Photo Albums</span>
          </Link>
        </div>
      </div>
    );
  }

  const { gallery } = galleryData;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <Link href="/photo-album" className="hover:text-blue-600 transition-colors">
              Photo Albums
            </Link>
            <ChevronRight size={14} className="text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {gallery.gallery_title}
            </span>
          </nav>

          {/* Back Button */}
          <Link 
            href="/photo-album"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Photo Albums</span>
          </Link>

          {/* Gallery Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {gallery.gallery_title}
            </h1>
            
            <p className="text-gray-600 text-lg mb-4">
              {gallery.gallery_description}
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar size={16} />
                <time dateTime={gallery.update_date}>
                  {format(new Date(gallery.update_date), 'MMM dd, yyyy')}
                </time>
              </div>
              <span>•</span>
              <span>{gallery.gallery_path.length} photos</span>
            </div>
          </div>

          {/* Compact Photo Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-2">
            {gallery.gallery_path.map((imagePath, index) => {
              const imageUrl = `${API_BASE_URL}/uploads/gallery/${encodeURIComponent(imagePath)}`;
              console.log(`Image ${index + 1} URL:`, imageUrl);
              
              return (
                <div key={index} className="bg-white rounded-md shadow-sm overflow-hidden group">
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={imageUrl}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-300"
                      onClick={() => openLightbox(index)}
                      onLoad={() => console.log(`Image ${index + 1} loaded successfully`)}
                      onError={() => console.error(`Image ${index + 1} failed to load:`, imageUrl)}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadImage(imagePath, `${gallery.gallery_title}-${index + 1}.jpg`);
                          }}
                          className="bg-white/90 text-gray-700 p-1 rounded-full hover:bg-white hover:scale-110 transition-all duration-200"
                          title="Download"
                        >
                          <Download size={10} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(index);
                          }}
                          className={`p-1 rounded-full hover:scale-110 transition-all duration-200 ${
                            favorites.has(index) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white/90 text-gray-700 hover:bg-white'
                          }`}
                          title={favorites.has(index) ? 'Remove from favorites' : 'Add to favorites'}
                        >
                          <Heart size={10} className={favorites.has(index) ? 'fill-current' : ''} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Image number */}
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1 py-0.5 rounded-full">
                      {index + 1}
                    </div>
                    
                    {/* Favorite badge */}
                    {favorites.has(index) && (
                      <div className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full">
                        <Heart size={8} className="fill-current" />
                      </div>
                    )}
                  </div>
                  
                  {/* Image info */}
                  <div className="p-1">
                    <p className="text-xs text-gray-600 truncate" title={imagePath}>
                      {index + 1}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Simple Modal */}
      {isModalOpen && selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Image */}
            <img
              src={`${API_BASE_URL}/uploads/gallery/${encodeURIComponent(gallery.gallery_path[selectedImageIndex])}`}
              alt={`Photo ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
            
            {/* Navigation */}
            {gallery.gallery_path.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full">
              {selectedImageIndex + 1} / {gallery.gallery_path.length}
            </div>
            
            {/* Actions */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => downloadImage(
                  gallery.gallery_path[selectedImageIndex], 
                  `${gallery.gallery_title}-${selectedImageIndex + 1}.jpg`
                )}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                title="Download"
              >
                <Download size={20} />
              </button>
              <button
                onClick={() => toggleFavorite(selectedImageIndex)}
                className={`p-2 rounded-full transition-colors ${
                  favorites.has(selectedImageIndex) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-black/50 text-white hover:bg-black/70'
                }`}
                title={favorites.has(selectedImageIndex) ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart size={20} className={favorites.has(selectedImageIndex) ? 'fill-current' : ''} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}