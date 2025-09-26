'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Calendar, Home, ChevronRight, Newspaper, FileText, Loader2, Sparkles, Cpu, Layout, Palette } from 'lucide-react';
import CanvasLayoutGenerator from '@/components/e-paper/CanvasLayoutGenerator';
import AIImageGenerator from '@/components/e-paper/AIImageGenerator';
import InteractiveViewer from '@/components/e-paper/InteractiveViewer';
import { smartDistributeArticles, DistributionResult } from '@/components/e-paper/SmartDistribution';
import { getPageDesign } from '@/components/e-paper/PageDesignSystem';
import { NewsArticle } from '@/types/news';

interface EPaperEdition {
  _id: string;
  date: string;
  edition: string;
  pages: EPaperPage[];
  thumbnail: string;
  downloadUrl: string;
  articles: NewsArticle[];
  distributionResult?: DistributionResult;
  generationMetadata?: {
    aiGenerated: boolean;
    canvasGenerated: boolean;
    smartDistribution: boolean;
    qualityScore: number;
  };
}

interface EPaperPage {
  pageNumber: number;
  imageUrl: string;
  thumbnail: string;
  sections: string[];
  articles: NewsArticle[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';

// Function to strip HTML tags and clean content
function stripHtmlTags(html: string): string {
  if (!html) return '';
  
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '');
  
  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");
  text = text.replace(/&ndash;/g, '–');
  text = text.replace(/&mdash;/g, '—');
  
  // Clean up extra whitespace
  text = text.replace(/\s+/g, ' ').trim();
  
  return text;
}

// Function to generate SEO-friendly slug from title
function generateSlug(title: string): string {
  if (!title) return '';
  
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

async function fetchEPaperNews(): Promise<NewsArticle[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/next/v1/epaper`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const raw: unknown[] = data.data || [];

    // Normalize: ensure post_category and post_url exist
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return raw.map((item: any) => {
      const post_category = item.post_category || item.category || 'news';
      // Generate proper slug from title if post_url/slug not available
      const post_url = item.post_url || item.slug || generateSlug(item.post_name) || item._id;
      return {
        ...item,
        post_category,
        post_url,
      } as NewsArticle;
    });
  } catch (error) {
    console.error('Failed to fetch e-paper news:', error);
    return [];
  }
}


async function generateAIEPaperFromNews(articles: NewsArticle[]): Promise<EPaperEdition> {
  // Step 1: Smart distribution of articles across pages
  const distributionResult = await smartDistributeArticles(articles);
  
  // Step 2: Generate responsive pages that adapt to content
  const pages: EPaperPage[] = [];
  const generatedImages: { [pageNumber: number]: { imageUrl: string; thumbnailUrl: string } } = {};
  
  // Create responsive pages with only 2 articles per page
  let currentPageNumber = 1;
  let remainingArticles = [...articles];
  
  while (remainingArticles.length > 0 && currentPageNumber <= 8) { // Max 8 pages
    const pageDesign = getPageDesign(currentPageNumber);
    
    // Take only 2 articles for this page to give maximum space
    const pageArticles = remainingArticles.slice(0, 2);
    remainingArticles = remainingArticles.slice(2);
    
    if (pageArticles.length > 0) {
      // Use canvas layout generator as primary method
      const canvasImageUrl = await new Promise<string>((resolve) => {
        // This would be handled by the CanvasLayoutGenerator component
        // For now, we'll use a placeholder that gets replaced by the actual generated image
        resolve(`/generated/canvas-page-${currentPageNumber}-${Date.now()}.png`);
      });
      
      // Create thumbnail
      const thumbnailUrl = canvasImageUrl.replace('.png', '_thumb.png');
      
      generatedImages[currentPageNumber] = { imageUrl: canvasImageUrl, thumbnailUrl };
      
      pages.push({
        pageNumber: currentPageNumber,
        imageUrl: canvasImageUrl,
        thumbnail: thumbnailUrl,
        sections: pageDesign.sections,
        articles: pageArticles
      });
    }
    
    currentPageNumber++;
  }
  
  // Calculate quality score
  const qualityScore = distributionResult.metadata.distributionQuality;

  return {
    _id: `ai-epaper-${format(new Date(), 'yyyy-MM-dd')}`,
    date: new Date().toISOString(),
    edition: 'Agartala Edition',
    thumbnail: pages[0]?.thumbnail || '/placeholder-epaper-thumb1.jpg',
    downloadUrl: `/epaper/ai-generated/${format(new Date(), 'yyyy-MM-dd')}.pdf`,
    articles: articles,
    pages: pages,
    distributionResult,
    generationMetadata: {
      aiGenerated: true,
      canvasGenerated: true,
      smartDistribution: true,
      qualityScore
    }
  };
}


export default function EPaperPage() {
  const [epaperData, setEpaperData] = useState<EPaperEdition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [generationProgress, setGenerationProgress] = useState({
    step: '',
    progress: 0,
    currentPage: 0
  });
  const [useAIGeneration] = useState(true);

  useEffect(() => {
    const loadEPaper = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch latest e-paper news
        const articles = await fetchEPaperNews();
        
        if (articles.length === 0) {
          throw new Error('No articles available to generate e-paper');
        }
        
        setGeneratingImages(true);
        setGenerationProgress({ step: 'Starting AI generation...', progress: 0, currentPage: 0 });
        
        // Generate e-paper from news articles with AI-powered features
        const generatedEPaper = useAIGeneration 
          ? await generateAIEPaperFromNews(articles)
          : await generateEPaperFromNews(articles);
        
        setEpaperData(generatedEPaper);
        
      } catch (error) {
        console.error('Failed to generate e-paper:', error);
        setError(error instanceof Error ? error.message : 'Failed to load e-paper');
      } finally {
        setLoading(false);
        setGeneratingImages(false);
      }
    };

    loadEPaper();
  }, [useAIGeneration]);

  // Legacy generation method (fallback)
  const generateEPaperFromNews = async (articles: NewsArticle[]): Promise<EPaperEdition> => {
    const sortedArticles = [...articles].sort((a, b) => 
      new Date(b.update_date).getTime() - new Date(a.update_date).getTime()
    );
    
    const pageConfigs = [
      { pageNumber: 1, sections: ['Front Page'], articles: sortedArticles.slice(0, 6) },
      { pageNumber: 2, sections: ['Headlines', 'Major News', 'State Updates'], articles: sortedArticles.slice(6, 12) },
      { pageNumber: 3, sections: ['Politics', 'Government', 'Administration'], articles: sortedArticles.slice(12, 18) },
      { pageNumber: 4, sections: ['Local News', 'District Updates', 'Community'], articles: sortedArticles.slice(18, 24) }
    ];

    const pages: EPaperPage[] = pageConfigs.map(config => ({
      pageNumber: config.pageNumber,
      imageUrl: `/placeholder-epaper-page${config.pageNumber}.jpg`,
      thumbnail: `/placeholder-epaper-thumb${config.pageNumber}.jpg`,
      sections: config.sections,
      articles: config.articles
    }));

    return {
      _id: `epaper-${format(new Date(), 'yyyy-MM-dd')}`,
      date: new Date().toISOString(),
      edition: 'Agartala Edition',
      thumbnail: pages[0]?.thumbnail || '/placeholder-epaper-thumb1.jpg',
      downloadUrl: `/epaper/generated/${format(new Date(), 'yyyy-MM-dd')}.pdf`,
      articles: sortedArticles,
      pages: pages
    };
  };


  // Zoom functions removed - now handled by InteractiveViewer

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          {generatingImages ? (
            <div className="mb-6">
              <div className="relative">
                <Sparkles size={64} className="mx-auto text-blue-600 mb-4 animate-pulse" />
                <div className="absolute -top-2 -right-2">
                  <Cpu size={24} className="text-purple-600 animate-spin" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                AI-Powered E-Paper Generation
              </h2>
              <p className="text-gray-600 mb-4">
                {generationProgress.step || 'Creating professional newspaper layout...'}
              </p>
              
              {/* Progress indicators */}
              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Layout size={16} className="text-green-500" />
                    <span>Smart Layout</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Cpu size={16} className="text-blue-500" />
                    <span>AI Generation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Palette size={16} className="text-purple-500" />
                    <span>Professional Styling</span>
                  </div>
                </div>
                
                {generationProgress.progress > 0 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${generationProgress.progress}%` }}
                    ></div>
                  </div>
                )}
                
                {generationProgress.currentPage > 0 && (
                  <p className="text-xs text-gray-500">
                    Generating Page {generationProgress.currentPage} of 4
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div>
          <Loader2 size={64} className="mx-auto text-blue-600 mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Loading Today&apos;s E-Paper
          </h2>
          <p className="text-gray-600">
                Fetching latest e-paper content...
              </p>
            </div>
          )}
          
          {/* Feature highlights */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-sm font-semibold text-blue-900 mb-2">
              ✨ New AI Features
            </h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• HTML5 Canvas Layout Generation</li>
              <li>• Smart Article Distribution</li>
              <li>• Professional Typography</li>
              <li>• Interactive Zoom & Navigation</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (error || !epaperData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Newspaper size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">E-Paper Unavailable</h2>
          <p className="text-gray-600">{error || 'Unable to load today\'s e-paper. Please try again later.'}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const currentPageData = epaperData.pages[currentPage];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-friendly breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-1 sm:space-x-2">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center text-gray-500 hover:text-blue-600 transition-colors duration-200"
                  aria-label="Go to homepage"
                >
                  <Home size={14} className="mr-1 sm:mr-1" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </li>
              <li>
                <ChevronRight size={12} className="text-gray-400" />
              </li>
              <li>
                <span className="text-gray-900 font-medium" aria-current="page">
                  E-Paper
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Mobile-friendly Header */}
        <div className="text-center mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center mb-3 sm:mb-4 space-y-2 sm:space-y-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900">
              <span className="text-blue-600">Northeast Herald</span> E-Paper
            </h1>
            <div className="px-2 sm:px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-600 text-white text-xs font-semibold rounded-full">
              AI-POWERED
            </div>
          </div>
          
          {/* Mobile-friendly Edition Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
            <div className="flex items-center space-x-2">
              <Calendar size={14} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{format(new Date(epaperData.date), 'EEEE, MMMM dd, yyyy')}</span>
              <span className="sm:hidden">{format(new Date(epaperData.date), 'MMM dd, yyyy')}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <FileText size={14} className="sm:w-4 sm:h-4" />
              <span>{epaperData.pages.length} Pages</span>
            </div>
          </div>
        </div>

        {/* AI-Powered Interactive E-Paper Viewer */}
        <InteractiveViewer 
          pages={epaperData.pages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Mobile-friendly Articles on Current Page */}
        <div className="mt-4 sm:mt-8 bg-white rounded-lg shadow-sm p-3 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            Articles on Page {currentPage + 1}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentPageData.articles.map((article) => (
              <Link
                key={article._id}
                href={`/${article.post_category || 'news'}/${article.post_url}`}
                className="block p-3 sm:p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
                title={`Read: ${article.post_name}`}
              >
                <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-2">
                  {article.post_name}
                </h4>
                {article.update_date && (
                  <div className="text-xs text-blue-600 mb-2 font-medium">
                    {new Date(article.update_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                )}
                {article.post_content && (
                  <div className="text-xs sm:text-sm text-gray-600 mb-2 whitespace-pre-wrap line-clamp-3">
                    {stripHtmlTags(article.post_content)}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm text-gray-500 space-y-1 sm:space-y-0">
                  <div className="flex items-center space-x-2">
                    <span>{article.post_category || 'News'}</span>
                    {article.author && (
                      <>
                        <span>•</span>
                        <span className="hidden sm:inline">{article.author}</span>
                      </>
                    )}
                  </div>
                  <span>{article.update_date ? format(new Date(article.update_date), 'MMM dd') : 'Recent'}</span>
                </div>
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  Click to read full article →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Generation Components (Hidden) */}
        {epaperData.pages.map((page, index) => (
          <div key={page.pageNumber} className="hidden">
            <CanvasLayoutGenerator
              articles={page.articles}
              pageNumber={page.pageNumber}
              sections={page.sections}
              date={format(new Date(epaperData.date), 'PPP')}
              edition={epaperData.edition}
              onImageGenerated={(imageUrl) => {
                // Update the page image URL when generated
                setEpaperData(prev => {
                  if (!prev) return prev;
                  const updatedPages = [...prev.pages];
                  updatedPages[index] = { ...updatedPages[index], imageUrl };
                  return { ...prev, pages: updatedPages };
                });
              }}
            />
            <AIImageGenerator
              articles={page.articles}
              pageNumber={page.pageNumber}
              sections={page.sections}
              onImageGenerated={(imageUrl, thumbnailUrl) => {
                // Update both image and thumbnail URLs
                setEpaperData(prev => {
                  if (!prev) return prev;
                  const updatedPages = [...prev.pages];
                  updatedPages[index] = { ...updatedPages[index], imageUrl, thumbnail: thumbnailUrl };
                  return { ...prev, pages: updatedPages };
                });
              }}
            />
          </div>
        ))}

        {/* AI Features Info Section */}
        
      </div>
    </div>
  );
}
