'use client';
import { useState, useEffect, use, useCallback, useMemo } from 'react';
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
  RotateCw,
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

// Enhanced image URL helper with better fallback logic
function getImageFallbackUrls(imageUrl: string): string[] {
  if (!imageUrl) return ['/images/placeholder-gallery.jpg'];
  
  // Clean the image path
  const cleanPath = imageUrl.replace(/^[\/\\]+/, '').replace(/\\/g, '/');
  
  // If it's already a full URL, use it directly
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return [imageUrl, '/images/placeholder-gallery.jpg'];
  }
  
  return [
    // Primary API path
    `${API_BASE_URL}/uploads/gallery/${cleanPath}`,
    
    // Alternative API paths
    `${API_BASE_URL}/uploads/${cleanPath}`,
    `${API_BASE_URL}/images/${cleanPath}`,
    `${API_BASE_URL}/gallery/${cleanPath}`,
    `${API_BASE_URL}/${cleanPath}`,
    
    // Try with different extensions
    `${API_BASE_URL}/uploads/gallery/${cleanPath.replace(/\.[^/.]+$/, '.jpg')}`,
    `${API_BASE_URL}/uploads/gallery/${cleanPath.replace(/\.[^/.]+$/, '.jpeg')}`,
    `${API_BASE_URL}/uploads/gallery/${cleanPath.replace(/\.[^/.]+$/, '.png')}`,
    
    // Placeholder as final fallback
    '/images/placeholder-gallery.jpg'
  ];
}

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
  const [imageFailureCount, setImageFailureCount] = useState<Map<number, number>>(new Map());
  const [imageLoadStates, setImageLoadStates] = useState<Set<number>>(new Set());
  const [imageCurrentUrls, setImageCurrentUrls] = useState<Map<number, string>>(new Map());
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
        
        // Initialize image URLs
        if (data?.gallery.gallery_path) {
          const initialUrls = new Map<number, string>();
          data.gallery.gallery_path.forEach((imagePath, index) => {
            const fallbacks = getImageFallbackUrls(imagePath);
            initialUrls.set(index, fallbacks[0]);
          });
          setImageCurrentUrls(initialUrls);
        }
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
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedImageIndex(null);
    setIsModalOpen(false);
    setIsFullscreen(false);
    setShowImageInfo(false);
    document.body.style.overflow = 'unset';
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

  const getCurrentImageUrl = (index: number) => {
    return imageCurrentUrls.get(index) || '/placeholder-gallery.jpg';
  };

  const shareImage = useCallback(async (index: number) => {
    if (!galleryData) return;
    
    const imageUrl = getCurrentImageUrl(index);
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
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  }, [galleryData, getCurrentImageUrl]);

  const downloadImage = (imageUrl: string, imageName: string) => {
    const link = document.createElement('a');
    link.href = imageCurrentUrls.get(galleryData?.gallery.gallery_path.indexOf(imageUrl) || 0) || imageUrl;
    link.download = imageName;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImageError = (index: number) => {
    if (!galleryData) return;
    
    const currentFailures = imageFailureCount.get(index) || 0;
    const imagePath = galleryData.gallery.gallery_path[index];
    const fallbackUrls = getImageFallbackUrls(imagePath);
    
    console.warn(`Image ${index + 1} failed to load (attempt ${currentFailures + 1}):`, imageCurrentUrls.get(index));
    
    // Try next fallback URL
    const nextFailureCount = currentFailures + 1;
    
    if (nextFailureCount < fallbackUrls.length) {
      setImageFailureCount(prev => new Map(prev).set(index, nextFailureCount));
      setImageCurrentUrls(prev => new Map(prev).set(index, fallbackUrls[nextFailureCount]));
      console.log(`Trying fallback ${nextFailureCount + 1} for image ${index + 1}:`, fallbackUrls[nextFailureCount]);
    } else {
      console.error(`All fallback URLs exhausted for image ${index + 1}`);
      setImageFailureCount(prev => new Map(prev).set(index, nextFailureCount));
    }
  };

  const handleImageLoad = (index: number) => {
    console.log(`Image ${index + 1} loaded successfully:`, imageCurrentUrls.get(index));
    setImageLoadStates(prev => new Set(prev).add(index));
  };

  const isImageCompletelyFailed = (index: number) => {
    if (!galleryData) return false;
    const failures = imageFailureCount.get(index) || 0;
    const fallbackUrls = getImageFallbackUrls(galleryData.gallery.gallery_path[index]);
    return failures >= fallbackUrls.length;
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

          {/* Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {gallery.gallery_path.map((imagePath, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
                onClick={() => openLightbox(index)}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  {isImageCompletelyFailed(index) ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-center text-gray-500 p-4">
                        <div className="text-3xl mb-3">📷</div>
                        <div className="text-sm font-medium">Image not available</div>
                        <div className="text-xs mt-2 text-red-500 break-all max-w-full opacity-75">
                          Unable to load image
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Loading Spinner */}
                      {!imageLoadStates.has(index) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 z-10">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                            <div className="text-xs text-gray-600">Loading...</div>
                          </div>
                        </div>
                      )}
                      
                      {/* Image */}
                      <Image
                        key={`img-${index}-${imageFailureCount.get(index) || 0}`}
                        src={getCurrentImageUrl(index)}
                        alt={`${gallery.gallery_title} - Photo ${index + 1}`}
                        fill
                        className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                          imageLoadStates.has(index) ? 'opacity-100' : 'opacity-0'
                        }`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        onError={() => handleImageError(index)}
                        onLoad={() => handleImageLoad(index)}
                        priority={index < 6}
                        unoptimized={true}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                    </>
                  )}
                  
                  {/* Overlay with Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
                      <button 
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                        title="View full size"
                      >
                        <ZoomIn size={18} className="text-gray-700" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadImage(imagePath, `${gallery.gallery_title}-${index + 1}.jpg`);
                        }}
                        className="bg-white/90 backdrop-blur-sm p-3 rounded-full hover:bg-white hover:scale-110 transition-all duration-200 shadow-lg"
                        title="Download image"
                      >
                        <Download size={18} className="text-gray-700" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(index);
                        }}
                        className={`p-3 rounded-full hover:scale-110 transition-all duration-200 shadow-lg ${
                          favorites.has(index) 
                            ? 'bg-red-500/90 text-white' 
                            : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
                        }`}
                        title={favorites.has(index) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart size={18} className={favorites.has(index) ? 'fill-current' : ''} />
                      </button>
                    </div>
                  </div>

                  {/* Image Counter Badge */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    {index + 1}
                  </div>

                  {/* Favorite Badge */}
                  {favorites.has(index) && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full">
                      <Heart size={12} className="fill-current" />
                    </div>
                  )}
                </div>
                
                {/* Card Footer */}
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Photo {index + 1} of {gallery.gallery_path.length}
                  </p>
                  <p className="text-xs text-gray-500 truncate" title={imagePath}>
                    {imagePath.split('/').pop() || 'Image'}
                  </p>
                  {imageFailureCount.has(index) && imageFailureCount.get(index)! > 0 && (
                    <p className="text-xs text-amber-600 mt-1 flex items-center">
                      <RotateCw size={10} className="mr-1" />
                      Using fallback source #{imageFailureCount.get(index)! + 1}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Lightbox Modal */}
      {isModalOpen && selectedImageIndex !== null && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            isModalOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 100%)',
            backdropFilter: 'blur(10px)'
          }}
          onClick={closeLightbox}
        >
          <div 
            className={`relative w-full h-full flex flex-col transition-all duration-300 ${
              isModalOpen ? 'scale-100' : 'scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-white text-lg font-semibold truncate max-w-md">
                    {gallery.gallery_title}
                  </h2>
                  <div className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    {selectedImageIndex + 1} of {gallery.gallery_path.length}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowImageInfo(!showImageInfo)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
                    title="Image info"
                  >
                    <Info size={20} />
                  </button>
                  <button
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
                    title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                  >
                    <Maximize2 size={20} />
                  </button>
                  <button
                    onClick={closeLightbox}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 rounded-full transition-all duration-200"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {gallery.gallery_path.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 group"
                  title="Previous image"
                >
                  <ChevronLeft size={24} className="group-hover:scale-110 transition-transform" />
                </button>

                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200 group"
                  title="Next image"
                >
                  <ChevronRight size={24} className="group-hover:scale-110 transition-transform" />
                </button>
              </>
            )}

            {/* Main Image Container */}
            <div className="flex-1 flex items-center justify-center p-4 pt-20 pb-20">
              <div className="relative max-w-full max-h-full">
                {isImageCompletelyFailed(selectedImageIndex) ? (
                  <div className="w-96 h-96 flex items-center justify-center bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20">
                    <div className="text-center text-white p-8">
                      <div className="text-6xl mb-6">📷</div>
                      <div className="text-xl font-medium mb-2">Image not available</div>
                      <div className="text-sm text-gray-300">
                        Unable to load this image from any source
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <Image
                      key={`lightbox-${selectedImageIndex}-${imageFailureCount.get(selectedImageIndex) || 0}`}
                      src={getCurrentImageUrl(selectedImageIndex)}
                      alt={`${gallery.gallery_title} - Photo ${selectedImageIndex + 1}`}
                      width={1400}
                      height={1000}
                      className={`max-h-[85vh] max-w-[90vw] object-contain transition-all duration-500 ${
                        isFullscreen ? 'max-h-[95vh] max-w-[95vw]' : ''
                      }`}
                      style={{ width: 'auto', height: 'auto' }}
                      priority
                      unoptimized={true}
                      onError={() => handleImageError(selectedImageIndex)}
                      onLoad={() => handleImageLoad(selectedImageIndex)}
                    />
                    
                    {/* Image Loading Overlay */}
                    {!imageLoadStates.has(selectedImageIndex) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-2xl">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent"></div>
                          <div className="text-white text-sm">Loading image...</div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleFavorite(selectedImageIndex)}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      favorites.has(selectedImageIndex)
                        ? 'bg-red-500/80 text-white hover:bg-red-500'
                        : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
                    }`}
                    title={favorites.has(selectedImageIndex) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={20} className={favorites.has(selectedImageIndex) ? 'fill-current' : ''} />
                  </button>
                  
                  <button
                    onClick={() => shareImage(selectedImageIndex)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
                    title="Share image"
                  >
                    <Share2 size={20} />
                  </button>
                  
                  <button
                    onClick={() => downloadImage(
                      gallery.gallery_path[selectedImageIndex], 
                      `${gallery.gallery_title}-${selectedImageIndex + 1}.jpg`
                    )}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-200"
                    title="Download image"
                  >
                    <Download size={20} />
                  </button>
                </div>

                {/* Image Info Panel */}
                {showImageInfo && (
                  <div className="bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg max-w-md">
                    <h3 className="font-semibold mb-2">Image Information</h3>
                    <div className="text-sm space-y-1">
                      <p><span className="opacity-75">Gallery:</span> {gallery.gallery_title}</p>
                      <p><span className="opacity-75">Photo:</span> {selectedImageIndex + 1} of {gallery.gallery_path.length}</p>
                      <p><span className="opacity-75">Date:</span> {format(new Date(gallery.update_date), 'MMM dd, yyyy')}</p>
                      <p className="opacity-75 truncate max-w-xs" title={gallery.gallery_path[selectedImageIndex]}>
                        <span className="opacity-75">File:</span> {gallery.gallery_path[selectedImageIndex].split('/').pop()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {gallery.gallery_path.length > 1 && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex space-x-2 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                  {gallery.gallery_path.slice(
                    Math.max(0, selectedImageIndex - 2), 
                    Math.min(gallery.gallery_path.length, selectedImageIndex + 3)
                  ).map((_, index) => {
                    const actualIndex = Math.max(0, selectedImageIndex - 2) + index;
                    return (
                      <button
                        key={actualIndex}
                        onClick={() => setSelectedImageIndex(actualIndex)}
                        className={`w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                          actualIndex === selectedImageIndex 
                            ? 'ring-2 ring-white scale-110' 
                            : 'opacity-60 hover:opacity-100 hover:scale-105'
                        }`}
                      >
                        <Image
                          src={getCurrentImageUrl(actualIndex)}
                          alt={`Thumbnail ${actualIndex + 1}`}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          unoptimized={true}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}