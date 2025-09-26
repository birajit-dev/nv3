'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Calendar, Eye, ExternalLink, Images, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

interface GalleryItem {
  _id: string;
  gallery_title: string;
  gallery_path: string[];
  gallery_keyword: string;
  gallery_description: string;
  gallery_url: string;
  update_date: string;
  gallery_id: number;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchGallery(): Promise<GalleryItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/gallery`);

    if (!response.ok) {
      throw new Error('Failed to fetch gallery');
    }

    const data = await response.json();
    return data.data?.gallery || [];
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
    return [];
  }
}

// Helper function to get the correct image URL
function getImageUrl(imagePath: string): string {
  if (!imagePath) return '/placeholder-gallery.jpg';
  
  // If it's already an absolute URL, use it as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it's a relative URL, prepend the local server URL
  return `https://app.neherald.com/uploads/gallery/${imagePath}`;
}

export default function GallerySection() {
  const [galleries, setGalleries] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        setError(null);
        const galleryData = await fetchGallery();
        setGalleries(galleryData);
      } catch (error) {
        console.error('Failed to load gallery:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, []);

  const nextGallery = () => {
    setCurrentIndex((prev) => (prev + 1) % galleries.length);
  };

  const prevGallery = () => {
    setCurrentIndex((prev) => (prev - 1 + galleries.length) % galleries.length);
  };

  if (loading) {
    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full"></div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
              <p className="text-gray-600 text-sm">Visual stories from Northeast</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
          <div className="h-80 md:h-96 bg-gray-200"></div>
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
          <Camera className="mx-auto mb-4 text-red-500" size={48} />
          <p className="text-red-700 text-lg mb-2">Error loading gallery</p>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </section>
    );
  }

  if (galleries.length === 0) {
    return (
      <section className="mb-12">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
          <Camera className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-gray-600 text-lg">No gallery items available at the moment.</p>
        </div>
      </section>
    );
  }

  const currentGallery = galleries[currentIndex];
  const firstImage = currentGallery?.gallery_path[0];

  return (
    <section className="mb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-8 bg-gradient-to-b from-purple-500 to-purple-700 rounded-full"></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Photo Gallery</h2>
            <p className="text-gray-600 text-sm">Visual stories from Northeast</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
          <Eye size={16} />
          <span>{galleries.length} galleries</span>
        </div>
      </div>

      {/* Gallery Slider */}
      <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Main Image */}
        <div className="relative h-80 md:h-96 lg:h-[28rem] bg-gray-100 overflow-hidden">
          <Image
            src={getImageUrl(firstImage)}
            alt={currentGallery.gallery_title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
            priority={currentIndex === 0}
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
          
          {/* Photo Count Overlay */}
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm flex items-center space-x-2">
            <Images size={16} />
            <span>{currentGallery.gallery_path.length}</span>
          </div>

          {/* Navigation Arrows */}
          {galleries.length > 1 && (
            <>
              <button
                onClick={prevGallery}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextGallery}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Gallery Counter */}
          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm">
            {currentIndex + 1} / {galleries.length}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar size={16} />
              <span>{format(new Date(currentGallery.update_date), 'MMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-purple-600">
              <Camera size={16} />
              <span>#{currentGallery.gallery_id}</span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
            {currentGallery.gallery_title}
          </h3>

          <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {currentGallery.gallery_description}
          </p>

          {/* View Full Gallery Button */}
          <div className="flex items-center justify-between">
            <Link
              href={`/photo-album/${currentGallery.gallery_url}`}
              // href={currentGallery.gallery_url || `/gallery/${currentGallery.gallery_id}`}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg flex items-center space-x-2 hover:scale-105"
            >
              <span>View Gallery</span>
              <ExternalLink size={16} />
            </Link>

            {/* Dots Indicator */}
            {galleries.length > 1 && (
              <div className="flex items-center space-x-2">
                {galleries.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      index === currentIndex ? 'bg-purple-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
                {galleries.length > 5 && (
                  <span className="text-gray-400 text-sm ml-1">+{galleries.length - 5}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
