'use client';

import { useState, useEffect, useCallback } from 'react';
import AdBanner from '@/components/ui/AdBanner';
import { X, ChevronLeft, ChevronRight, Download, Share2, Calendar, Camera } from 'lucide-react';
import { format } from 'date-fns';
import { GalleryImage } from '@/types/news';

// Note: This would normally be generated on the server side
// but we need client-side state for the lightbox functionality

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchGalleryImages(): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch gallery images');
    }
    
    const data = await response.json();
    return data.data?.galleryimages || [];
  } catch (error) {
    console.error('Failed to fetch gallery images:', error);
    return [];
  }
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const galleryImages = await fetchGalleryImages();
        setImages(galleryImages);
      } catch (error) {
        console.error('Failed to load gallery images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadImages();
  }, []);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const navigateLightbox = useCallback((direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (lightboxIndex - 1 + images.length) % images.length
      : (lightboxIndex + 1) % images.length;
    
    setLightboxIndex(newIndex);
    setSelectedImage(images[newIndex]);
  }, [lightboxIndex, images]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedImage) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        navigateLightbox('prev');
        break;
      case 'ArrowRight':
        navigateLightbox('next');
        break;
    }
  }, [selectedImage, closeLightbox, navigateLightbox]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, lightboxIndex, handleKeyDown]);

  // Sample placeholder images for development
  const placeholderImages: GalleryImage[] = Array.from({ length: 24 }, (_, i) => ({
    id: `placeholder-${i + 1}`,
    title: `Gallery Image ${i + 1}`,
    url: `/gallery/placeholder-${i + 1}.jpg`,
    alt: `Gallery image ${i + 1}`,
    caption: `This is a sample caption for gallery image ${i + 1}. It describes what's happening in the photo.`,
    category: ['tripura', 'national', 'sports', 'events'][i % 4],
    publishedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    photographer: ['Amit Das', 'Priya Sharma', 'Rajesh Kumar', 'Sports Desk'][i % 4],
  }));

  const displayImages = images.length > 0 ? images : placeholderImages;

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-square bg-gray-300 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white min-h-screen">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Photo Gallery
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our collection of photographs capturing the essence of Northeast India
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Filter Tabs */}
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Tripura', 'National', 'Sports', 'Events'].map((filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        filter === 'All'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {displayImages.map((image, index) => (
                  <div key={image.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200 cursor-pointer">
                    {/* Placeholder div for development */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <div className="text-center text-gray-600">
                        <Camera size={32} className="mx-auto mb-2 opacity-50" />
                        <div className="text-sm font-medium">{image.title}</div>
                        <div className="text-xs opacity-75">{image.category}</div>
                      </div>
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openLightbox(image, index)}
                          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                        >
                          View Image
                        </button>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="font-medium text-sm line-clamp-1 mb-1">
                        {image.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs">
                        <span>{image.photographer}</span>
                        <span>{format(new Date(image.publishedAt), 'MMM dd, yyyy')}</span>
                      </div>
                    </div>

                    {/* Insert ad after every 9 images */}
                    {(index + 1) % 9 === 0 && index < displayImages.length - 1 && (
                      <div className="col-span-full my-8">
                        <AdBanner type="horizontal" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Load More Images
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Sidebar Ad */}
                <AdBanner type="sidebar" />

                {/* Recent Photos */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Photos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {displayImages.slice(0, 4).map((image) => (
                      <div
                        key={image.id}
                        className="aspect-square bg-gray-200 rounded cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => openLightbox(image, displayImages.indexOf(image))}
                      >
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 rounded flex items-center justify-center">
                          <Camera size={16} className="text-gray-600 opacity-50" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Square Ad */}
                <AdBanner type="square" />

                {/* Photo Categories */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Tripura', count: 45 },
                      { name: 'National', count: 32 },
                      { name: 'Sports', count: 28 },
                      { name: 'Events', count: 19 },
                      { name: 'Culture', count: 15 },
                      { name: 'Nature', count: 12 }
                    ].map((category) => (
                      <div key={category.name} className="flex items-center justify-between py-1">
                        <a href="#" className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                          {category.name}
                        </a>
                        <span className="text-xs text-gray-500">({category.count})</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronLeft size={48} />
            </button>
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-video bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <Camera size={64} className="mx-auto mb-4 opacity-50" />
                  <div className="text-lg font-medium mb-2">{selectedImage.title}</div>
                  <div className="text-sm opacity-75">Full size image would display here</div>
                </div>
              </div>

              {/* Image Info */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedImage.title}
                </h2>
                {selectedImage.caption && (
                  <p className="text-gray-600 mb-4">
                    {selectedImage.caption}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    {selectedImage.photographer && (
                      <div className="flex items-center space-x-1">
                        <Camera size={14} />
                        <span>{selectedImage.photographer}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{format(new Date(selectedImage.publishedAt), 'MMM dd, yyyy')}</span>
                    </div>
                  </div>
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {lightboxIndex + 1} of {images.length || placeholderImages.length}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <Download size={16} />
                    <span>Download</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
