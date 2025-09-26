import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/lib/categories';

export default function Footer() {
  const categories = getAllCategories();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/neherald_logo.png"
                alt="Northeast Herald Logo"
                width={300}
                height={60}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Northeast Herald starts its journey from Tripura state capital city Agartala to cover the entire Northeast region of India for the latest news, news photos, and the latest photos to promote the great cultural, historical and traditional identity of the region.
            </p>
            
            {/* Social Media */}
            <div className="mb-6">
              <h5 className="text-gray-900 font-semibold text-sm mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a 
                  href="https://www.facebook.com/neherald/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/HeraldNortheast" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-sky-500 text-white rounded flex items-center justify-center hover:bg-sky-600 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.youtube.com/@northeastherald5966" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-red-600 text-white rounded flex items-center justify-center hover:bg-red-700 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.instagram.com/northeastherald" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-pink-600 text-white rounded flex items-center justify-center hover:bg-pink-700 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/company/northeastherald" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-700 text-white rounded flex items-center justify-center hover:bg-blue-800 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://t.me/northeastherald" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-blue-500 text-white rounded flex items-center justify-center hover:bg-blue-600 transition-colors"
                  aria-label="Telegram"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h5 className="text-gray-900 font-semibold text-sm mb-3">Newsletter</h5>
              <p className="text-gray-600 text-xs mb-3">Get latest news updates delivered to your inbox</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-r hover:bg-blue-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* News Categories */}
          <div>
            <h5 className="text-gray-900 font-semibold text-sm mb-4 pb-2 border-b border-gray-200">News</h5>
            <ul className="space-y-2">
              {categories.slice(0, 8).map((category) => (
                <li key={category.id}>
                  <Link 
                    href={category.slug === 'top-news' ? '/' : `/${category.slug}`}
                    className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-gray-900 font-semibold text-sm mb-4 pb-2 border-b border-gray-200">Services</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/epaper" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  E-Paper
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Videos
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/tripura-top-news" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Tripura Top News
                </Link>
              </li>
              <li>
                <Link href="/rss.xml" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  RSS Feed
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-gray-900 font-semibold text-sm mb-4 pb-2 border-b border-gray-200">Company</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/pages/about-us" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pages/contact-us" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/pages/about-tripura" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  About Tripura
                </Link>
              </li>
              <li>
                <Link href="/pages/privacy-policy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/terms-condition" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/pages/editorial-policy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Editorial Policy
                </Link>
              </li>
              <li>
                <Link href="/pages/corrections-policy" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
                  Corrections Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <div className="mb-2 md:mb-0">
              Copyright © {currentYear} Northeast Herald. All rights reserved. Reproduction in whole or in part without written permission is prohibited.
            </div>
            <div className="flex items-center space-x-4">
              <span>Powered by Northeast Herald Digital</span>
              <span>•</span>
              <span>Agartala, Tripura</span>
              <span>•</span>
              <Link href="/sitemap.xml" className="hover:text-blue-600 transition-colors">
                XML Sitemap
              </Link>
              <span>•</span>
              <Link href="/rss.xml" className="hover:text-blue-600 transition-colors">
                RSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
