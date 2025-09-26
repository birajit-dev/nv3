'use client';

import { useRef, useEffect, useState } from 'react';
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

interface CanvasLayoutGeneratorProps {
  articles: NewsArticle[];
  pageNumber: number;
  sections: string[];
  date: string;
  edition: string;
  onImageGenerated: (imageUrl: string) => void;
}

interface LayoutConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  columns: number;
  headerHeight: number;
  footerHeight: number;
}

interface ArticleLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: string;
  isHeadline: boolean;
  article: NewsArticle;
}

export default function CanvasLayoutGenerator({
  articles,
  pageNumber,
  sections,
  date,
  edition,
  onImageGenerated
}: CanvasLayoutGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const layoutConfig: LayoutConfig = {
    pageWidth: 1200,
    pageHeight: 1600,
    margin: 60,
    columns: 2, // Always 2 columns for 2 articles per page
    headerHeight: 120,
    footerHeight: 80
  };

  const fonts = {
    headline: 'bold 48px serif',
    subheadline: 'bold 32px serif',
    articleTitle: 'bold 18px serif',
    articleText: '16px serif',
    smallText: '12px serif',
    dateText: '14px sans-serif'
  };

  const colors = {
    background: '#ffffff',
    text: '#000000',
    headline: '#1a1a1a',
    accent: '#2563eb',
    border: '#e5e7eb',
    lightGray: '#f9fafb'
  };

  // Helper function to calculate actual text height
  const calculateTextHeight = (text: string, maxWidth: number, fontSize: number, ctx: CanvasRenderingContext2D): number => {
    const words = text.split(' ');
    let line = '';
    let lines = 0;
    const lineHeight = fontSize + 5;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        lines++;
        line = words[i] + ' ';
      } else {
        line = testLine;
      }
    }
    
    if (line) lines++; // Count the last line
    return lines * lineHeight;
  };

  const generateLayout = (articles: NewsArticle[]): ArticleLayout[] => {
    const layouts: ArticleLayout[] = [];
    const availableHeight = layoutConfig.pageHeight - layoutConfig.headerHeight - layoutConfig.footerHeight - (layoutConfig.margin * 2);
    const columnWidth = (layoutConfig.pageWidth - (layoutConfig.margin * 2) - ((layoutConfig.columns - 1) * 20)) / layoutConfig.columns;
    
    const currentY = layoutConfig.headerHeight + layoutConfig.margin;
    const columnHeights = new Array(layoutConfig.columns).fill(currentY);

    articles.forEach((article, index) => {
      const isHeadline = index === 0;
      const isSubheadline = index === 1;
      
      let fontSize: number;
      let fontWeight: string;

      if (isHeadline) {
        fontSize = 28;
        fontWeight = 'bold';
      } else {
        fontSize = 24;
        fontWeight = 'bold';
      }

      // Create a temporary canvas context to measure text
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d')!;
      tempCtx.font = `${fontWeight} ${fontSize}px serif`;
      
      // Calculate actual text heights
      const titleHeight = calculateTextHeight(article.post_name, columnWidth - 20, fontSize, tempCtx);
      tempCtx.font = '18px serif'; // Set font for content
      const contentHeight = calculateTextHeight(stripHtmlTags(article.post_content || ''), columnWidth - 20, 18, tempCtx);
      const dateHeight = 25; // For update_date
      
      // Calculate total required height - give maximum space for 2 articles
      const padding = 50; // Top and bottom padding
      const spacing = 40; // Spacing between elements
      const articleHeight = Math.max(300, titleHeight + dateHeight + contentHeight + padding + spacing);

      // For 2 articles per page, place them side by side
      const x = layoutConfig.margin + (index * (columnWidth + 20));
      const y = layoutConfig.headerHeight + layoutConfig.margin;

      layouts.push({
        x,
        y,
        width: columnWidth,
        height: articleHeight,
        fontSize,
        fontWeight,
        isHeadline,
        article
      });
    });

    return layouts;
  };

  const drawNewspaperLayout = async (ctx: CanvasRenderingContext2D, layouts: ArticleLayout[]) => {
    // Clear canvas
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, layoutConfig.pageWidth, layoutConfig.pageHeight);

    // Draw header
    await drawHeader(ctx);
    
    // Draw articles
    for (let i = 0; i < layouts.length; i++) {
      const layout = layouts[i];
      await drawArticle(ctx, layout);
      setProgress((i + 1) / layouts.length * 80 + 10); // 10-90% for articles
    }

    // Draw footer
    await drawFooter(ctx);
    
    // Draw page borders
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, layoutConfig.pageWidth, layoutConfig.pageHeight);
    
    setProgress(100);
  };

  const drawHeader = async (ctx: CanvasRenderingContext2D) => {
    // Newspaper name
    ctx.fillStyle = colors.headline;
    ctx.font = 'bold 36px serif';
    ctx.textAlign = 'center';
    ctx.fillText('NORTHEAST HERALD', layoutConfig.pageWidth / 2, 40);

    // Edition and date
    ctx.font = fonts.dateText;
    ctx.fillStyle = colors.accent;
    ctx.fillText(edition, layoutConfig.pageWidth / 2, 65);
    
    ctx.fillStyle = colors.text;
    ctx.fillText(date, layoutConfig.pageWidth / 2, 85);

    // Page sections
    ctx.font = 'bold 20px serif';
    ctx.fillStyle = colors.headline;
    ctx.textAlign = 'left';
    sections.forEach((section, index) => {
      const x = layoutConfig.margin + (index * 200);
      ctx.fillText(section.toUpperCase(), x, 110);
    });

    // Draw header border
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(layoutConfig.margin, 120);
    ctx.lineTo(layoutConfig.pageWidth - layoutConfig.margin, 120);
    ctx.stroke();
  };

  const drawArticle = async (ctx: CanvasRenderingContext2D, layout: ArticleLayout) => {
    const { x, y, width, height, fontSize, fontWeight, isHeadline, article } = layout;

    // Draw article background
    if (isHeadline) {
      ctx.fillStyle = colors.lightGray;
      ctx.fillRect(x - 10, y - 10, width + 20, height + 20);
    }

    // Draw article title
    ctx.fillStyle = colors.text;
    ctx.font = `${fontWeight} ${fontSize}px serif`;
    ctx.textAlign = 'left';
    
    const title = article.post_name || 'Untitled Article';
    const maxTitleWidth = width - 20;
    
    // Wrap text if needed
    const words = title.split(' ');
    let line = '';
    let lineY = y + fontSize + 5;
    const lineHeight = fontSize + 5;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxTitleWidth && i > 0) {
        ctx.fillText(line, x + 10, lineY);
        line = words[i] + ' ';
        lineY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x + 10, lineY);

    // Draw update date
    if (article.update_date) {
      ctx.font = fonts.smallText;
      ctx.fillStyle = colors.accent;
      const dateY = lineY + 15;
      const formattedDate = new Date(article.update_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
      ctx.fillText(formattedDate, x + 10, dateY);
      lineY = dateY + 20;
    } else {
      // Add gap after title if no date
      lineY += 15;
    }

    // Draw article content (full content, not summary)
    if (article.post_content) {
      const content = stripHtmlTags(article.post_content);
      ctx.font = '18px serif'; // Larger font for better readability with 2 articles per page
      ctx.fillStyle = colors.text;
      
      const contentY = lineY + 15; // Add 15px gap between title/date and content
      const maxContentHeight = height - (lineY - y) - 40;
      
      // Show full content - no truncation for newspaper layout
      await wrapText(ctx, content, x + 10, contentY, width - 20, 22, maxContentHeight); // Larger line height
    }

    // Draw article metadata
    ctx.font = fonts.smallText;
    ctx.fillStyle = colors.accent;
    const metadataY = y + height - 15;
    
    if (article.post_topic) {
      ctx.fillText(article.post_topic.toUpperCase(), x + 10, metadataY);
    }
    
    if (article.author) {
      ctx.textAlign = 'right';
      ctx.fillText(`By ${article.author}`, x + width - 10, metadataY);
      ctx.textAlign = 'left';
    }

    // Draw article border
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, width, height);
  };

  const wrapText = async (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number, maxHeight: number) => {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    let linesDrawn = 0;
    const maxLines = Math.floor(maxHeight / lineHeight);

    // Show full content if there's enough space
    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + ' ';
      const metrics = ctx.measureText(testLine);
      
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, x, currentY);
        line = words[i] + ' ';
        currentY += lineHeight;
        linesDrawn++;
        
        // Only stop if we've exceeded the available height
        if (currentY > y + maxHeight - lineHeight) {
          break;
        }
      } else {
        line = testLine;
      }
    }
    
    // Show the last line if there's space
    if (line && currentY <= y + maxHeight - lineHeight) {
      ctx.fillText(line, x, currentY);
    } else if (line && currentY > y + maxHeight - lineHeight) {
      // If we've hit the limit, show "..." to indicate more content
      const truncatedLine = line.substring(0, Math.max(0, line.length - 3)) + '...';
      ctx.fillText(truncatedLine, x, currentY - lineHeight);
    }
  };

  const drawFooter = async (ctx: CanvasRenderingContext2D) => {
    const footerY = layoutConfig.pageHeight - layoutConfig.footerHeight;
    
    // Draw footer border
    ctx.strokeStyle = colors.border;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(layoutConfig.margin, footerY);
    ctx.lineTo(layoutConfig.pageWidth - layoutConfig.margin, footerY);
    ctx.stroke();

    // Footer text
    ctx.font = fonts.smallText;
    ctx.fillStyle = colors.text;
    ctx.textAlign = 'center';
    ctx.fillText(`Page ${pageNumber} | Northeast Herald Digital Edition`, layoutConfig.pageWidth / 2, footerY + 20);
    ctx.fillText(`Generated on ${new Date().toLocaleString()}`, layoutConfig.pageWidth / 2, footerY + 40);
  };

  const generateImage = async () => {
    if (!canvasRef.current) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Could not get canvas context');
      }

      // Set canvas size
      canvas.width = layoutConfig.pageWidth;
      canvas.height = layoutConfig.pageHeight;

      // Generate layout
      const layouts = generateLayout(articles);
      
      // Draw the newspaper layout
      await drawNewspaperLayout(ctx, layouts);

      // Convert canvas to image
      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      
      // Create blob and URL for download/preview
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      
      onImageGenerated(imageUrl);
      
    } catch (error) {
      console.error('Error generating e-paper image:', error);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  useEffect(() => {
    if (articles.length > 0) {
      generateImage();
    }
  }, [articles, pageNumber, sections, generateImage]);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="hidden"
        width={layoutConfig.pageWidth}
        height={layoutConfig.pageHeight}
      />
      
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Generating E-Paper Layout
              </h3>
              <p className="text-gray-600 mb-4">
                Creating professional newspaper layout for Page {pageNumber}
              </p>
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
