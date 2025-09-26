'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, Eye, Search, Globe, BarChart3 } from 'lucide-react';

interface SEOStats {
  organicTraffic: number;
  googleNewsTraffic: number;
  totalPageviews: number;
  avgPageLoadTime: number;
  mobileUsability: number;
  indexedPages: number;
  searchImpressions: number;
  clickThroughRate: number;
}

interface SEOKeyword {
  keyword: string;
  position: number;
  impressions: number;
  clicks: number;
  ctr: number;
}

export default function SEOMonitor() {
  const [stats, setStats] = useState<SEOStats>({
    organicTraffic: 0,
    googleNewsTraffic: 0,
    totalPageviews: 0,
    avgPageLoadTime: 0,
    mobileUsability: 0,
    indexedPages: 0,
    searchImpressions: 0,
    clickThroughRate: 0
  });

  const [topKeywords, setTopKeywords] = useState<SEOKeyword[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching SEO data from Google Analytics and Search Console
    const fetchSEOData = async () => {
      try {
        // In a real implementation, you would fetch this data from your analytics API
        const mockStats: SEOStats = {
          organicTraffic: 45230,
          googleNewsTraffic: 12890,
          totalPageviews: 67890,
          avgPageLoadTime: 1.8,
          mobileUsability: 94,
          indexedPages: 1240,
          searchImpressions: 156780,
          clickThroughRate: 3.2
        };

        const mockKeywords: SEOKeyword[] = [
          { keyword: 'Tripura news', position: 2, impressions: 12450, clicks: 890, ctr: 7.2 },
          { keyword: 'Agartala news', position: 3, impressions: 8900, clicks: 567, ctr: 6.4 },
          { keyword: 'Northeast India news', position: 5, impressions: 15600, clicks: 780, ctr: 5.0 },
          { keyword: 'Tripura politics', position: 4, impressions: 6700, clicks: 401, ctr: 6.0 },
          { keyword: 'Agartala updates', position: 6, impressions: 5400, clicks: 324, ctr: 6.0 },
          { keyword: 'Tripura government', position: 7, impressions: 4800, clicks: 288, ctr: 6.0 },
          { keyword: 'Northeast India updates', position: 8, impressions: 4200, clicks: 252, ctr: 6.0 },
          { keyword: 'Tripura breaking news', position: 9, impressions: 3800, clicks: 228, ctr: 6.0 }
        ];

        setStats(mockStats);
        setTopKeywords(mockKeywords);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching SEO data:', error);
        setLoading(false);
      }
    };

    fetchSEOData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Performance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Organic Traffic</p>
                <p className="text-2xl font-bold text-blue-900">{stats.organicTraffic.toLocaleString()}</p>
                <p className="text-xs text-blue-600">+12.5% from last month</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Google News Traffic</p>
                <p className="text-2xl font-bold text-green-900">{stats.googleNewsTraffic.toLocaleString()}</p>
                <p className="text-xs text-green-600">+18.3% from last month</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Total Pageviews</p>
                <p className="text-2xl font-bold text-purple-900">{stats.totalPageviews.toLocaleString()}</p>
                <p className="text-xs text-purple-600">+15.7% from last month</p>
              </div>
              <Eye className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Avg Load Time</p>
                <p className="text-2xl font-bold text-orange-900">{stats.avgPageLoadTime}s</p>
                <p className="text-xs text-orange-600">-0.3s improvement</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Technical SEO Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical SEO Metrics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.mobileUsability}%</div>
            <div className="text-sm text-gray-600">Mobile Usability</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${stats.mobileUsability}%` }}
              ></div>
            </div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.indexedPages.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Indexed Pages</div>
            <div className="text-xs text-green-600 mt-1">+45 new pages indexed</div>
          </div>

          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">{stats.clickThroughRate}%</div>
            <div className="text-sm text-gray-600">Click-Through Rate</div>
            <div className="text-xs text-green-600 mt-1">+0.5% improvement</div>
          </div>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Performing Keywords</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impressions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Clicks
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CTR
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topKeywords.map((keyword, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {keyword.keyword}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      keyword.position <= 3 ? 'bg-green-100 text-green-800' :
                      keyword.position <= 10 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      #{keyword.position}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {keyword.impressions.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {keyword.clicks.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {keyword.ctr}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Google News Performance */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Google News Performance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Articles in Google News</h3>
                <p className="text-3xl font-bold">847</p>
                <p className="text-blue-100 text-sm">+23 this week</p>
              </div>
              <Search className="h-12 w-12 text-blue-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Google News Traffic</h3>
                <p className="text-3xl font-bold">12,890</p>
                <p className="text-green-100 text-sm">+18.3% growth</p>
              </div>
              <Users className="h-12 w-12 text-green-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">SEO Action Items</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
            <div>
              <h4 className="font-semibold text-yellow-800">Optimize Page Load Speed</h4>
              <p className="text-sm text-yellow-700">Some pages are loading slower than 2.5s target</p>
            </div>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">Medium Priority</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-400 rounded">
            <div>
              <h4 className="font-semibold text-green-800">Improve Mobile Usability</h4>
              <p className="text-sm text-green-700">Mobile usability is at 94% - excellent performance</p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">Completed</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div>
              <h4 className="font-semibold text-blue-800">Expand Keyword Coverage</h4>
              <p className="text-sm text-blue-700">Target more long-tail keywords for Northeast India</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">High Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}
