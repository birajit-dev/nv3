'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, Calendar, MapPin, Globe, ChevronDown } from 'lucide-react';

interface BreakingNewsItem {
  _id: string;
  breaking_title: string;
  slug?: string;
  createdAt?: string;
}

interface NavigationItem {
  id: string;
  name: string;
  slug: string;
  color?: string;
  hasDropdown?: boolean;
  dropdownItems?: NavigationItem[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com/api/next/v1';

// Custom navigation configuration - easily customizable
const navigationItems: NavigationItem[] = [
  { id: '1', name: 'Home', slug: '/', color: '#dc2626' },
  { id: '2', name: 'Tripura', slug: '/tripura', color: '#2563eb' },
  { id: '3', name: 'National', slug: '/national', color: '#059669' },
  { id: '4', name: 'International', slug: '/international', color: '#ea580c' },
  { id: '5', name: 'Job/Tenders', slug: '/adstender', color: '#9333ea' },
  { id: '6', name: 'Northeast', slug: '/northeast', color: '#dc2626' },
  { id: '7', name: 'Health', slug: '/health', color: '#0891b2' },
  { id: '8', name: 'Finance', slug: '/finance', color: '#dc2626' },
  { id: '9', name: 'Articles', slug: '/article', color: '#dc2626' },
];

async function fetchBreakingNews(): Promise<BreakingNewsItem[]> {
  try {
    console.log('Fetching breaking news from:', `${API_BASE_URL}/breaking`);
    const response = await fetch(`${API_BASE_URL}/breaking`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
      next: { revalidate: 0 } // Force fresh data in Next.js
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`Failed to fetch breaking news: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Breaking news data received:', data);
    
    // Handle the specific API response structure
    let breakingNews = [];
    if (data.success && data.data?.breakingNews) {
      breakingNews = data.data.breakingNews;
    } else if (data.data?.breakingNews) {
      breakingNews = data.data.breakingNews;
    } else if (data.breakingNews) {
      breakingNews = data.breakingNews;
    } else if (Array.isArray(data.data)) {
      breakingNews = data.data;
    } else if (Array.isArray(data)) {
      breakingNews = data;
    }
    
    console.log('Processed breaking news:', breakingNews);
    
    return breakingNews;
  } catch (error) {
    console.error('Failed to fetch breaking news:', error);
    // Return empty array on error to prevent UI breaking
    return [];
  }
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const loadBreakingNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        console.log('Loading breaking news...');
        const news = await fetchBreakingNews();
        console.log('Setting breaking news state:', news);
        setBreakingNews(news);
      } catch (err) {
        console.error('Error loading breaking news:', err);
        setError(err instanceof Error ? err.message : 'Failed to load breaking news');
      } finally {
        setIsLoading(false);
      }
    };

    loadBreakingNews();
    
    // Set up interval to refresh breaking news every 5 minutes
    const interval = setInterval(loadBreakingNews, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Initialize client-side and start time updates
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const currentDate = currentTime?.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) || '';

  const currentTimeString = currentTime?.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  }) || '';

  return (
    <>
      <header className="bg-white shadow-lg border-b border-gray-100">
        {/* Breaking News Ticker - Not sticky */}
        <div className="bg-red-600 text-white py-1 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <span className="bg-red-800 px-3 py-1 text-xs font-bold uppercase tracking-wide mr-4 flex-shrink-0">
                Breaking
              </span>
              <div className="animate-marquee whitespace-nowrap text-sm">
                {isLoading ? (
                  'Loading breaking news...'
                ) : error ? (
                  `Error: ${error}`
                ) : breakingNews.length > 0 ? (
                  breakingNews.map((item, index) => (
                    <React.Fragment key={item._id || index}>
                      <Link href={`/news/${item.slug || item._id}`} className="hover:underline">
                        {item.breaking_title}
                      </Link>
                      {index < breakingNews.length - 1 && ' • '}
                    </React.Fragment>
                  ))
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Top Bar - Not sticky */}
        <div className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10 text-xs">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar size={14} />
                  {isClient && currentTime ? (
                    <>
                      <span className="font-medium">
                        {currentDate}
                      </span>
                      <span className="text-gray-500">|</span>
                      <span className="font-medium">
                        {currentTimeString}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium">Loading...</span>
                  )}
                </div>
                <div className="hidden md:flex items-center space-x-2 text-gray-300">
                  <MapPin size={14} />
                  <span>Agartala, Tripura</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  <Link href="/epaper" className="text-gray-300 hover:text-white transition-colors font-medium">
                    E-Paper
                  </Link>
                  
                  <button className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors">
                    <Globe size={14} />
                    <span>EN</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3">
                  <a href="https://www.facebook.com/neherald/" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Facebook">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href="https://x.com/HeraldNortheast" className="text-gray-300 hover:text-sky-400 transition-colors" aria-label="Twitter">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@northeastherald5966" className="text-gray-300 hover:text-red-400 transition-colors" aria-label="YouTube">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Header with Logo and Navigation - Sticky on mobile, static on desktop */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50 lg:static w-full">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
    <div className="flex items-center justify-between h-28 lg:h-56 w-full"> 
      {/* Left spacer for desktop */}
      <div className="hidden lg:flex flex-1 h-full"></div>

      {/* Logo - centered on desktop, left on mobile */}
      <div className="flex items-center lg:flex-1 lg:justify-center w-full h-full">
        <Link href="/" className="flex items-center w-full h-full">
          <Image
            src="/images/neherald_logo.png"
            alt="Northeast Herald Logo"
            width={900}
            height={800}
            priority
            className="h-full w-auto max-w-[500px] lg:max-w-[700px] object-contain"
          />
        </Link>
      </div>

      {/* Right side actions */}
      <div className="flex items-center space-x-3 lg:flex-1 lg:justify-end h-full">
        <Link
          href="/search"
          className="p-2 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-50"
          aria-label="Search"
        >
          <Search size={20} />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 text-gray-600 hover:text-red-600 transition-colors rounded-lg hover:bg-gray-50"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </div>
  </div>
</div>


      {/* Search Bar - Sticky on mobile, static on desktop */}
      {isSearchOpen && (
        <div className="bg-white border-b border-gray-200 py-6 shadow-lg sticky top-24 z-40 lg:static lg:top-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative max-w-3xl mx-auto">
              <input
                type="text"
                placeholder="Search for news, articles, topics..."
                className="w-full pl-14 pr-32 py-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 text-lg shadow-sm"
                autoFocus
              />
              <Search className="absolute left-5 top-4.5 text-gray-400" size={22} />
              <button className="absolute right-3 top-2.5 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Search
              </button>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-600">
              <span className="font-medium">Popular searches:</span>
              <Link href="/search?q=politics" className="hover:text-red-600 transition-colors">Politics</Link>
              <Link href="/search?q=sports" className="hover:text-red-600 transition-colors">Sports</Link>
              <Link href="/search?q=business" className="hover:text-red-600 transition-colors">Business</Link>
              <Link href="/search?q=culture" className="hover:text-red-600 transition-colors">Culture</Link>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation - Sticky on mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl sticky top-24 z-40">
          <div className="px-4 py-6 space-y-2 max-h-96 overflow-y-auto">
            {/* Quick Actions */}
            <div className="flex items-center justify-center mb-4 pb-4 border-b border-gray-200">
              <Link href="/live" className="flex items-center space-x-2 text-red-600 font-semibold">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm uppercase tracking-wide">Live</span>
              </Link>
            </div>

            {navigationItems.map((item) => (
              <div key={item.id}>
                <Link
                  href={item.slug}
                  className="block px-4 py-4 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-semibold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-wide text-sm">{item.name}</span>
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </Link>
                
                {/* Mobile Dropdown Items */}
                {item.hasDropdown && item.dropdownItems && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.id}
                        href={dropdownItem.slug}
                        className="block px-4 py-2 text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <hr className="my-6 border-gray-200" />
            
            <div className="space-y-2">
              <Link
                href="/about"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/epaper"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                E-Paper
              </Link>
              <Link
                href="/newsletter"
                className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Custom Navigation Bar - Sticky on mobile, static on desktop */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 lg:static">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="hidden lg:flex items-center justify-center h-12">
            <div className="flex items-center space-x-2">
              {navigationItems.map((item) => (
                <div key={item.id} className="relative group flex-shrink-0">
                  <Link
                    href={item.slug}
                    className="flex items-center space-x-1 px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-red-600 whitespace-nowrap"
                  >
                    <span>{item.name}</span>
                    {item.hasDropdown && <ChevronDown size={14} />}
                  </Link>
                  <div 
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: item.color }}
                  />
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.dropdownItems && (
                    <div className="absolute top-full left-0 mt-0 w-48 bg-white border border-gray-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                      {item.dropdownItems.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.id}
                          href={dropdownItem.slug}
                          className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm border-b border-gray-100 last:border-b-0"
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="relative group flex-shrink-0">
                <button className="px-4 py-3 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium text-sm uppercase tracking-wide border-b-2 border-transparent hover:border-red-600 whitespace-nowrap">
                  More
                </button>
                <div className="absolute top-full right-0 mt-0 w-48 bg-white border border-gray-200 shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <Link
                    href="/pages/about-tripura"
                    className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm border-b border-gray-100"
                  >
                    About Tripura
                  </Link>
                  <Link
                    href="/showbiz"
                    className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm border-b border-gray-100"
                  >
                    Showbiz
                  </Link>

                  <Link
                    href="/adstender"
                    className="block px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors font-medium text-sm border-b border-gray-100"
                  >
                    Jobs/Tenders
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
