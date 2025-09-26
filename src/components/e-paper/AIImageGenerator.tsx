'use client';

import { useState, useEffect } from 'react';
import { NewsArticle } from '@/types/news';

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

interface AIImageGeneratorProps {
  articles: NewsArticle[];
  pageNumber: number;
  sections: string[];
  onImageGenerated: (imageUrl: string, thumbnailUrl: string) => void;
}

interface GeneratedImage {
  imageUrl: string;
  thumbnailUrl: string;
  metadata: {
    pageNumber: number;
    sections: string[];
    articleCount: number;
    generatedAt: string;
  };
}

export default function AIImageGenerator({
  articles,
  pageNumber,
  sections,
  onImageGenerated
}: AIImageGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';

  const generateNewspaperImage = async (): Promise<GeneratedImage> => {
    setIsGenerating(true);
    setProgress(0);
    setCurrentStep('Preparing newspaper layout...');

    try {
      // Step 1: Analyze articles and create layout structure
      setProgress(10);
      setCurrentStep('Analyzing articles and creating layout...');
      
      const layoutData = await analyzeArticlesForLayout(articles, pageNumber, sections);
      
      // Step 2: Generate newspaper-style image
      setProgress(30);
      setCurrentStep('Generating newspaper layout...');
      
      const imageResponse = await fetch(`${API_BASE_URL}/api/generate-newspaper-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          articles: articles.slice(0, 8), // Limit articles for better performance
          pageNumber,
          sections,
          layoutData,
          style: getPageStyle(pageNumber),
          dimensions: {
            width: 1200,
            height: 1600
          }
        }),
      });

      if (!imageResponse.ok) {
        throw new Error('Failed to generate newspaper image');
      }

      const imageData = await imageResponse.json();
      
      // Step 3: Create thumbnail
      setProgress(70);
      setCurrentStep('Creating thumbnail...');
      
      const thumbnailUrl = await createThumbnail(imageData.imageUrl);
      
      // Step 4: Finalize
      setProgress(90);
      setCurrentStep('Finalizing...');
      
      const generatedImage: GeneratedImage = {
        imageUrl: imageData.imageUrl,
        thumbnailUrl,
        metadata: {
          pageNumber,
          sections,
          articleCount: articles.length,
          generatedAt: new Date().toISOString()
        }
      };

      setProgress(100);
      setCurrentStep('Complete!');
      
      return generatedImage;

    } catch (error) {
      console.error('Error generating newspaper image:', error);
      // Fallback to canvas-generated image
      return await generateFallbackImage();
    } finally {
      setIsGenerating(false);
    }
  };

  const analyzeArticlesForLayout = async (articles: NewsArticle[], pageNumber: number, sections: string[]) => {
    // Analyze article importance, length, and category for optimal layout
    const analyzedArticles = articles.map((article, index) => ({
      ...article,
      importance: calculateArticleImportance(article, index),
      estimatedLength: estimateArticleLength(article),
      category: categorizeArticle(article),
      layoutPriority: getLayoutPriority(article, pageNumber)
    }));

    return {
      articles: analyzedArticles,
      layout: {
        columns: pageNumber === 1 ? 2 : 3,
        headlineCount: Math.min(3, articles.length),
        articleDistribution: distributeArticles(analyzedArticles, pageNumber)
      }
    };
  };

  const calculateArticleImportance = (article: NewsArticle, index: number): number => {
    let importance = 100 - (index * 10); // Base importance decreases with position
    
    // Boost importance for breaking news
    if (article.post_topic?.toLowerCase().includes('breaking')) {
      importance += 30;
    }
    
    // Boost importance for politics/government
    if (article.post_topic?.toLowerCase().includes('politics') || 
        article.post_category?.toLowerCase().includes('politics')) {
      importance += 20;
    }
    
    // Boost importance for recent articles
    const daysSinceUpdate = (Date.now() - new Date(article.update_date).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceUpdate < 1) {
      importance += 15;
    }
    
    return Math.min(100, Math.max(0, importance));
  };

  const estimateArticleLength = (article: NewsArticle): number => {
    const content = stripHtmlTags(article.post_content || '');
    return content.length;
  };

  const categorizeArticle = (article: NewsArticle): string => {
    const topic = article.post_topic?.toLowerCase() || '';
    const category = article.post_category?.toLowerCase() || '';
    const content = stripHtmlTags(article.post_content || '').toLowerCase();
    
    if (topic.includes('breaking') || topic.includes('urgent')) return 'breaking';
    if (topic.includes('politics') || category.includes('politics')) return 'politics';
    if (topic.includes('local') || topic.includes('district')) return 'local';
    if (topic.includes('health') || category.includes('health')) return 'health';
    if (topic.includes('sports') || category.includes('sports')) return 'sports';
    if (topic.includes('business') || category.includes('finance')) return 'business';
    
    return 'general';
  };

  const getLayoutPriority = (article: NewsArticle, pageNumber: number): number => {
    const category = categorizeArticle(article);
    
    // Front page priorities
    if (pageNumber === 1) {
      if (category === 'breaking') return 1;
      if (category === 'politics') return 2;
      if (category === 'local') return 3;
      return 4;
    }
    
    // Other pages prioritize their specific sections
    if (pageNumber === 2 && category === 'breaking') return 1;
    if (pageNumber === 3 && category === 'politics') return 1;
    if (pageNumber === 4 && category === 'local') return 1;
    
    return 5;
  };

  const distributeArticles = (articles: NewsArticle[], pageNumber: number) => {
    const sortedArticles = articles.sort((a, b) => {
      // Sort by update_date (newer first) as a fallback
      return new Date(b.update_date).getTime() - new Date(a.update_date).getTime();
    });
    
    return {
      headlines: sortedArticles.slice(0, 2),
      mainArticles: sortedArticles.slice(2, 5),
      sideArticles: sortedArticles.slice(5, 8)
    };
  };

  const getPageStyle = (pageNumber: number) => {
    const styles = {
      1: { // Front Page
        theme: 'front-page',
        colors: { primary: '#1a1a1a', secondary: '#2563eb', accent: '#dc2626' },
        layout: 'hero-focused',
        typography: 'bold'
      },
      2: { // Headlines
        theme: 'headlines',
        colors: { primary: '#1a1a1a', secondary: '#059669', accent: '#dc2626' },
        layout: 'column-focused',
        typography: 'clean'
      },
      3: { // Politics
        theme: 'politics',
        colors: { primary: '#1a1a1a', secondary: '#7c3aed', accent: '#dc2626' },
        layout: 'formal',
        typography: 'serif'
      },
      4: { // Local News
        theme: 'local',
        colors: { primary: '#1a1a1a', secondary: '#ea580c', accent: '#dc2626' },
        layout: 'community-focused',
        typography: 'friendly'
      }
    };
    
    return styles[pageNumber as keyof typeof styles] || styles[1];
  };

  const createThumbnail = async (imageUrl: string): Promise<string> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/create-thumbnail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          dimensions: { width: 300, height: 400 }
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.thumbnailUrl;
      }
    } catch (error) {
      console.error('Error creating thumbnail:', error);
    }
    
    // Fallback: return original image URL
    return imageUrl;
  };

  const generateFallbackImage = async (): Promise<GeneratedImage> => {
    // Create a simple fallback image using canvas
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      throw new Error('Could not create canvas context');
    }

    // Draw simple newspaper layout
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 1200, 1600);
    
    // Header
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('NORTHEAST HERALD', 600, 50);
    
    // Page info
    ctx.font = '16px serif';
    ctx.fillText(`Page ${pageNumber} - ${sections.join(', ')}`, 600, 80);
    
    // Articles
    ctx.textAlign = 'left';
    ctx.font = 'bold 20px serif';
    articles.slice(0, 6).forEach((article, index) => {
      const y = 120 + (index * 200);
      ctx.fillText(article.post_name || 'Article Title', 50, y);
      
      ctx.font = '14px serif';
      ctx.fillStyle = '#666666';
      const summary = article.post_summary || article.post_content?.substring(0, 100) + '...';
      ctx.fillText(summary || 'Article content...', 50, y + 30);
      ctx.fillStyle = '#1a1a1a';
    });

    const imageUrl = canvas.toDataURL('image/png');
    
    return {
      imageUrl,
      thumbnailUrl: imageUrl,
      metadata: {
        pageNumber,
        sections,
        articleCount: articles.length,
        generatedAt: new Date().toISOString()
      }
    };
  };

  useEffect(() => {
    if (articles.length > 0) {
      generateNewspaperImage().then((result) => {
        onImageGenerated(result.imageUrl, result.thumbnailUrl);
      });
    }
  }, [articles, pageNumber, sections, generateNewspaperImage, onImageGenerated]);

  return (
    <div className="w-full">
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                AI Image Generation
              </h3>
              <p className="text-gray-600 mb-2">{currentStep}</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
