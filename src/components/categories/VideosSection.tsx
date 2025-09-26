'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import { Play, Clock, ExternalLink, Video, Youtube, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface VideoItem {
  _id: string;
  video_key: string;
  update_date: string;
  video_id: number;
}


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

async function fetchVideos(): Promise<VideoItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/youtube`);

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data = await response.json();
    return data.data?.youtubevideo || [];
  } catch (error) {
    console.error('Failed to fetch videos:', error);
    return [];
  }
}

// Helper function to get YouTube thumbnail URL
function getYouTubeThumbnail(videoKey: string, quality: 'default' | 'medium' | 'high' | 'maxresdefault' = 'maxresdefault'): string {
  return `https://img.youtube.com/vi/${videoKey}/${quality}.jpg`;
}

// Helper function to get YouTube video URL
function getYouTubeUrl(videoKey: string): string {
  return `https://www.youtube.com/watch?v=${videoKey}`;
}

export default function VideosSection() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        const videoData = await fetchVideos();
        const limitedVideos = videoData.slice(0, 6);
        setVideos(limitedVideos);
      } catch (error) {
        console.error('Failed to load videos:', error);
        setError(error instanceof Error ? error.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  if (loading) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Latest Videos</h2>
              <p className="text-gray-600 text-sm">Watch our latest content</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-gray-200 animate-pulse rounded-xl h-64"></div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Latest Videos</h2>
              <p className="text-gray-600 text-sm">Watch our latest content</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Unable to Load Videos</h3>
          <p className="text-red-600">Please check your connection and try again later.</p>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return (
      <section className="mb-16">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center space-x-4">
            <div className="w-2 h-10 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-lg"></div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-1">Latest Videos</h2>
              <p className="text-gray-600 text-sm">Watch our latest content</p>
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No Videos Available</h3>
          <p className="text-gray-500">Check back soon for new content.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-1.5 h-14 bg-gradient-to-b from-red-500 via-red-600 to-red-700 rounded-full shadow-lg"></div>
            <div className="absolute -top-1 -left-0.5 w-2.5 h-4 bg-gradient-to-b from-red-400 to-red-500 rounded-full opacity-60 blur-sm"></div>
          </div>
          <div className="space-y-1">
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              Video Coverage
            </h2>
            <p className="text-gray-500 text-lg font-medium flex items-center space-x-2">
              <span>Latest news reports and exclusive interviews</span>
              <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse inline-block"></span>
            </p>
          </div>
        </div>
        <Link 
          href="https://www.youtube.com/@TripuraInfoway" 
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center space-x-3 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md border border-red-600 hover:border-red-700"
        >
          <Youtube size={18} />
          <span className="font-semibold text-sm uppercase tracking-wide">Subscribe</span>
          <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <Link 
            key={video._id}
            href={getYouTubeUrl(video.video_key)}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200 transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <Image
                  src={getYouTubeThumbnail(video.video_key)}
                  alt={`Video ${video.video_id}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-red-600/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-700/90 transition-all duration-300 shadow-lg group-hover:scale-110">
                    <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                    <Eye size={12} />
                    <span>HD</span>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-100 rounded-full flex items-center justify-center">
                      <Youtube size={10} className="text-red-600" />
                    </div>
                    <span className="font-medium">Northeast Herald</span>
                  </div>
                  <time dateTime={video.update_date} className="bg-gray-100 px-2 py-1 rounded-full">
                    {format(new Date(video.update_date), 'MMM dd')}
                  </time>
                </div>
                <div className="flex items-center space-x-3 text-xs text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye size={10} />
                    <span>2.1K</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={10} />
                    <span>5:42</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
