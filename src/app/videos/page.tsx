'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AdBanner from '@/components/ui/AdBanner';
import { Play, Clock, Calendar, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { VideoContent } from '@/types/news';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchVideos(limit: number = 12): Promise<VideoContent[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/videos`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const data = await response.json();
    return data.data?.videos || [];
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const videosData = await fetchVideos(12);
        setVideos(videosData);
      } catch (error) {
        console.error('Failed to load videos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getYouTubeThumbnail = (url: string) => {
    const videoId = getYouTubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/placeholder-video.jpg';
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Video News
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Watch the latest video reports, interviews, and special coverage from Northeast Herald
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Play size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos available</h3>
            <p className="text-gray-600">Check back later for new video content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Video */}
              {videos.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Video</h2>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="relative aspect-video bg-gray-900">
                      <Image
                        src={getYouTubeThumbnail(videos[0].videoUrl)}
                        alt={videos[0].title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <button className="bg-red-600 text-white rounded-full p-4 hover:bg-red-700 transition-colors">
                          <Play size={32} />
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{videos[0].title}</h3>
                      <p className="text-gray-600 mb-4">{videos[0].description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} />
                          <span>{format(new Date(videos[0].publishedAt), 'MMM dd, yyyy')}</span>
                        </div>
                        {videos[0].duration && (
                          <div className="flex items-center space-x-1">
                            <Clock size={16} />
                            <span>{videos[0].duration}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Video Grid */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.slice(1).map((video) => (
                    <div key={video.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="relative aspect-video bg-gray-900">
                        <Image
                          src={getYouTubeThumbnail(video.videoUrl)}
                          alt={video.title}
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <button className="bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-colors">
                            <Play size={24} />
                          </button>
                        </div>
                        {video.duration && (
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                            {video.duration}
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{video.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{video.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{format(new Date(video.publishedAt), 'MMM dd')}</span>
                          <div className="flex items-center space-x-1">
                            <Eye size={12} />
                            <span>1.2K views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Sidebar Ad */}
                <AdBanner type="sidebar" />

                {/* Popular Videos */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Videos</h3>
                  <div className="space-y-4">
                    {videos.slice(0, 5).map((video) => (
                      <div key={video.id} className="flex space-x-3">
                        <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded">
                          <Image
                            src={getYouTubeThumbnail(video.videoUrl)}
                            alt={video.title}
                            width={80}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                            <Play size={12} className="text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors">
                            {video.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500">
                            <span>{format(new Date(video.publishedAt), 'MMM dd')}</span>
                            {video.duration && (
                              <>
                                <span>•</span>
                                <span>{video.duration}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Newsletter Signup */}
                <section className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Subscribe to our YouTube channel for the latest video content.
                  </p>
                  <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                    Subscribe on YouTube
                  </button>
                </section>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}