import AdBanner from '@/components/ui/AdBanner';
import TripuraSection from '@/components/categories/TripuraSection';
import NationalSection from '@/components/categories/NationalSection';
import SportsSection from '@/components/categories/SportsSection';
import InternationalSection from '@/components/categories/InternationalSection';
import FinanceSection from '@/components/categories/FinanceSection';
import EntertainmentSection from '@/components/categories/EntertainmentSection';
import VideosSection from '@/components/categories/VideosSection';
import GallerySection from '@/components/categories/GallerySection';
import TopNew from '@/components/categories/TopNew';
import TrendingSection from '@/components/categories/TrendingSection';
import NortheastSection from '@/components/categories/NortheastSection';
import HealthSection from '@/components/categories/HealthSection';
import ExclusiveSection from '@/components/categories/ExclusiveSection';
import HomepageOptimizer from '@/components/seo/HomepageOptimizer';
import { generateHomepageSchema } from '@/components/seo/HomepageOptimizer';
import LazySection, { CriticalSection } from '@/components/performance/LazySection';
import OptimizedImage from '@/components/performance/OptimizedImage';
import { TrendingUp } from 'lucide-react';

export default function Home() {
  const targetKeywords = ['Tripura news', 'Agartala news', 'Northeast Herald'];

  return (
    <>
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateHomepageSchema())
        }}
      />
      
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
        {/* SEO Optimization Component */}
        <HomepageOptimizer targetKeywords={targetKeywords} />
        
        {/* Breaking News Ticker */}
        {/* <BreakingNewsTicker /> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Critical Above-the-Fold Content - Load Immediately */}
          <CriticalSection>
            <TopNew />
          </CriticalSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-12">
              {/* Critical Section - Tripura News (Above the fold) */}
              <CriticalSection>
                <TripuraSection />
              </CriticalSection>

              {/* Horizontal Ad */}
              <LazySection fallback={<div className="h-24 bg-gray-100 animate-pulse rounded my-8" />}>
                <div className="my-8">
                  <AdBanner type="horizontal" />
                </div>
              </LazySection>

              {/* National Section */}
              <LazySection>
                <NationalSection />
              </LazySection>
              
              <LazySection>
                <NortheastSection />
              </LazySection>

              <LazySection>
                <GallerySection />
              </LazySection>

              {/* Sports Section */}
              <LazySection>
                <SportsSection />
              </LazySection>
              
              <LazySection>
                <ExclusiveSection />
              </LazySection>

              {/* Horizontal Ad */}
              <LazySection fallback={<div className="h-24 bg-gray-100 animate-pulse rounded my-8" />}>
                <div className="my-8">
                  <AdBanner type="horizontal" />
                </div>
              </LazySection>

              {/* International Section */}
              <LazySection>
                <InternationalSection />
              </LazySection>

              {/* Finance Section */}
              <LazySection>
                <FinanceSection />
              </LazySection>

              {/* Articles/Opinion Section */}
             

              {/* Videos Section - Load last as it's heavy */}
             

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Main Sidebar Ad - Load immediately */}
                <CriticalSection>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full">
                    <div className="text-xs text-gray-400 mb-1 p-2">Advertisement</div>
                    <div className="relative w-full h-full">
                      <OptimizedImage
                        src="https://app.neherald.com/images/ongc_ads.jpg"
                        alt="ONGC Advertisement"
                        width={300}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CriticalSection>

                {/* Additional Sidebar Ads - Lazy load */}
                <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full">
                    <div className="text-xs text-gray-400 mb-1 p-2">Advertisement</div>
                    <div className="relative w-full h-full">
                      <OptimizedImage
                        src="https://i.ibb.co/3529h4qD/icfai-ads.jpg"
                        alt="ICFAI Advertisement"
                        width={300}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </LazySection>

                <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full">
                    <div className="text-xs text-gray-400 mb-1 p-2">Advertisement</div>
                    <div className="relative w-full h-full">
                      <OptimizedImage
                        src="https://i.ibb.co/mCYsgRH2/new-ads-shyam.jpg"
                        alt="Shyam Advertisement"
                        width={300}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </LazySection>

                <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
                  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden w-full">
                    <div className="text-xs text-gray-400 mb-1 p-2">Advertisement</div>
                    <div className="relative w-full h-full">
                      <OptimizedImage
                        src="https://app.neherald.com/images/longtrai-ads.png"
                        alt="Longtrai Advertisement"
                        width={300}
                        height={250}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </LazySection>

                <LazySection>
                  <TrendingSection />
                </LazySection>

                {/* Square Ad */}
                <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
                  <AdBanner type="square" />
                </LazySection>

                {/* Trending Topics */}
                <section className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <TrendingUp className="text-red-600 mr-2" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">Trending Now</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { topic: 'Tripura Development', count: 156 },
                      { topic: 'Northeast Politics', count: 142 },
                      { topic: 'Cricket World Cup', count: 128 },
                      { topic: 'Digital Currency', count: 95 },
                      { topic: 'Border Security', count: 87 },
                      { topic: 'Education Reform', count: 73 }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 px-2 rounded transition-colors cursor-pointer">
                        <div className="flex items-center space-x-2">
                          <span className={`w-2 h-2 rounded-full ${
                            index < 2 ? 'bg-red-500' : index < 4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}></span>
                          <span className="text-sm text-gray-700 hover:text-blue-600 transition-colors">
                            #{item.topic.replace(' ', '')}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 font-medium">
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Newsletter Signup */}
                <section className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Stay Informed</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get breaking news and daily updates from Northeast Herald.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Subscribe Now
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-2">
                    Join 10,000+ readers who trust Northeast Herald
                  </p>
                </section>

                {/* Weather Widget */}
                <section className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Agartala Weather</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">28°C</div>
                      <div className="text-sm text-gray-600">Partly Cloudy</div>
                    </div>
                    <div className="text-4xl">⛅</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-200 text-xs text-gray-600">
                    <div className="flex justify-between">
                      <span>High: 32°C</span>
                      <span>Low: 24°C</span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>

          <LazySection>
                <EntertainmentSection />
          </LazySection>

          {/* Bottom sections - Lazy load for better performance */}
          <LazySection fallback={<div className="h-64 bg-gray-100 animate-pulse rounded" />}>
            <VideosSection />
          </LazySection>
          
          <LazySection>
            <HealthSection />
          </LazySection>
        </div>
      </div>
    </>
  );
}
