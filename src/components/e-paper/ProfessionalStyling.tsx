'use client';

import { PageDesign } from './PageDesignSystem';

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

export interface TypographyConfig {
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: number;
  color: string;
}

export interface LayoutConfig {
  pageWidth: number;
  pageHeight: number;
  margin: number;
  gutter: number;
  columns: number;
  columnWidth: number;
}

export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  lightText: string;
  border: string;
  shadow: string;
}

export const PROFESSIONAL_TYPOGRAPHY = {
  newspaper: {
    fontFamily: '"Times New Roman", "Times", serif',
    headline: {
      fontSize: 48,
      fontWeight: 'bold',
      lineHeight: 1.1,
      letterSpacing: -0.5,
      color: '#1a1a1a'
    },
    subheadline: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 1.2,
      letterSpacing: -0.3,
      color: '#1a1a1a'
    },
    articleTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      lineHeight: 1.3,
      letterSpacing: 0,
      color: '#1a1a1a'
    },
    bodyText: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 1.5,
      letterSpacing: 0.1,
      color: '#1a1a1a'
    },
    smallText: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 1.4,
      letterSpacing: 0.2,
      color: '#666666'
    },
    caption: {
      fontSize: 10,
      fontWeight: 'normal',
      lineHeight: 1.3,
      letterSpacing: 0.3,
      color: '#888888'
    }
  },
  modern: {
    fontFamily: '"Georgia", "Times New Roman", serif',
    headline: {
      fontSize: 44,
      fontWeight: 'bold',
      lineHeight: 1.1,
      letterSpacing: -0.8,
      color: '#1a1a1a'
    },
    subheadline: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 1.2,
      letterSpacing: -0.5,
      color: '#1a1a1a'
    },
    articleTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 1.3,
      letterSpacing: -0.1,
      color: '#1a1a1a'
    },
    bodyText: {
      fontSize: 15,
      fontWeight: 'normal',
      lineHeight: 1.6,
      letterSpacing: 0,
      color: '#1a1a1a'
    },
    smallText: {
      fontSize: 11,
      fontWeight: 'normal',
      lineHeight: 1.4,
      letterSpacing: 0.1,
      color: '#666666'
    },
    caption: {
      fontSize: 9,
      fontWeight: 'normal',
      lineHeight: 1.3,
      letterSpacing: 0.2,
      color: '#888888'
    }
  }
};

export const COLOR_SCHEMES = {
  classic: {
    primary: '#1a1a1a',
    secondary: '#2563eb',
    accent: '#dc2626',
    background: '#ffffff',
    text: '#1a1a1a',
    lightText: '#666666',
    border: '#e5e7eb',
    shadow: 'rgba(0, 0, 0, 0.1)'
  },
  modern: {
    primary: '#1a1a1a',
    secondary: '#059669',
    accent: '#dc2626',
    background: '#ffffff',
    text: '#1a1a1a',
    lightText: '#6b7280',
    border: '#d1d5db',
    shadow: 'rgba(0, 0, 0, 0.05)'
  },
  elegant: {
    primary: '#1a1a1a',
    secondary: '#7c3aed',
    accent: '#dc2626',
    background: '#ffffff',
    text: '#1a1a1a',
    lightText: '#6b7280',
    border: '#e5e7eb',
    shadow: 'rgba(0, 0, 0, 0.08)'
  }
};

export const LAYOUT_CONFIGS = {
  frontPage: {
    pageWidth: 1200,
    pageHeight: 1600,
    margin: 60,
    gutter: 20,
    columns: 2,
    columnWidth: 540
  },
  standard: {
    pageWidth: 1200,
    pageHeight: 1600,
    margin: 50,
    gutter: 15,
    columns: 3,
    columnWidth: 350
  },
  compact: {
    pageWidth: 1200,
    pageHeight: 1600,
    margin: 40,
    gutter: 12,
    columns: 4,
    columnWidth: 260
  }
};

export function getTypographyForPage(pageNumber: number): typeof PROFESSIONAL_TYPOGRAPHY.newspaper {
  const pageDesign = PAGE_DESIGNS.find(design => design.pageNumber === pageNumber);
  
  if (pageDesign?.styling.theme === 'modern') {
    return PROFESSIONAL_TYPOGRAPHY.modern;
  }
  
  return PROFESSIONAL_TYPOGRAPHY.newspaper;
}

export function getColorSchemeForPage(pageNumber: number): ColorScheme {
  const pageDesign = PAGE_DESIGNS.find(design => design.pageNumber === pageNumber);
  
  if (pageDesign?.styling.theme === 'elegant') {
    return COLOR_SCHEMES.elegant;
  }
  
  if (pageDesign?.styling.theme === 'modern') {
    return COLOR_SCHEMES.modern;
  }
  
  return COLOR_SCHEMES.classic;
}

export function getLayoutConfigForPage(pageNumber: number): LayoutConfig {
  if (pageNumber === 1) {
    return LAYOUT_CONFIGS.frontPage;
  }
  
  if (pageNumber === 4) {
    return LAYOUT_CONFIGS.compact;
  }
  
  return LAYOUT_CONFIGS.standard;
}

export function applyProfessionalStyling(
  ctx: CanvasRenderingContext2D,
  pageNumber: number,
  element: 'headline' | 'subheadline' | 'articleTitle' | 'bodyText' | 'smallText' | 'caption'
): void {
  const typography = getTypographyForPage(pageNumber);
  const colors = getColorSchemeForPage(pageNumber);
  
  const style = typography[element];
  
  ctx.font = `${style.fontWeight} ${style.fontSize}px ${typography.fontFamily}`;
  ctx.fillStyle = style.color;
  ctx.textBaseline = 'top';
  
  // Apply letter spacing if supported
  if ('letterSpacing' in ctx) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (ctx as any).letterSpacing = `${style.letterSpacing}px`;
  }
}

export function drawProfessionalHeader(
  ctx: CanvasRenderingContext2D,
  pageNumber: number,
  newspaperName: string,
  edition: string,
  date: string,
  sections: string[]
): void {
  const colors = getColorSchemeForPage(pageNumber);
  const layout = getLayoutConfigForPage(pageNumber);
  
  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, layout.pageWidth, 120);
  
  // Newspaper name
  applyProfessionalStyling(ctx, pageNumber, 'headline');
  ctx.textAlign = 'center';
  ctx.fillText(newspaperName.toUpperCase(), layout.pageWidth / 2, 20);
  
  // Edition and date
  applyProfessionalStyling(ctx, pageNumber, 'smallText');
  ctx.fillStyle = colors.secondary;
  ctx.fillText(edition, layout.pageWidth / 2, 50);
  
  ctx.fillStyle = colors.text;
  ctx.fillText(date, layout.pageWidth / 2, 70);
  
  // Section headers
  applyProfessionalStyling(ctx, pageNumber, 'articleTitle');
  ctx.textAlign = 'left';
  ctx.fillStyle = colors.accent;
  
  sections.forEach((section, index) => {
    const x = layout.margin + (index * 200);
    ctx.fillText(section.toUpperCase(), x, 95);
  });
  
  // Header border
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(layout.margin, 120);
  ctx.lineTo(layout.pageWidth - layout.margin, 120);
  ctx.stroke();
}

export function drawProfessionalArticle(
  ctx: CanvasRenderingContext2D,
  pageNumber: number,
  x: number,
  y: number,
  width: number,
  height: number,
  title: string,
  content: string,
  metadata: {
    topic?: string;
    author?: string;
    date?: string;
  },
  isHeadline: boolean = false
): void {
  const colors = getColorSchemeForPage(pageNumber);
  const layout = getLayoutConfigForPage(pageNumber);
  
  // Article background
  if (isHeadline) {
    ctx.fillStyle = colors.background;
    ctx.fillRect(x - 5, y - 5, width + 10, height + 10);
    
    // Headline border
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(x - 5, y - 5, width + 10, height + 10);
  }
  
  // Article title
  applyProfessionalStyling(ctx, pageNumber, isHeadline ? 'headline' : 'articleTitle');
  ctx.textAlign = 'left';
  ctx.fillStyle = colors.text;
  
  const titleY = y + 10;
  wrapText(ctx, title, x + 10, titleY, width - 20, 20, height - 60);
  
  // Draw update date
  let contentY = titleY + (isHeadline ? 60 : 40);
  if (metadata.date) {
    applyProfessionalStyling(ctx, pageNumber, 'smallText');
    ctx.fillStyle = colors.accent;
    const formattedDate = new Date(metadata.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    ctx.fillText(formattedDate, x + 10, contentY);
    contentY += 25;
  } else {
    // Add gap after title if no date
    contentY += 15;
  }
  
  // Article content - show full content for newspaper layout
  applyProfessionalStyling(ctx, pageNumber, 'bodyText');
  // Add 15px gap between title/date and content
  contentY += 15;
  // Use full height minus metadata space for complete content display
  const availableHeight = height - (contentY - y) - 30;
  wrapText(ctx, stripHtmlTags(content), x + 10, contentY, width - 20, 18, availableHeight);
  
  // Metadata
  applyProfessionalStyling(ctx, pageNumber, 'smallText');
  ctx.fillStyle = colors.lightText;
  
  const metadataY = y + height - 25;
  
  if (metadata.topic) {
    ctx.fillText(metadata.topic.toUpperCase(), x + 10, metadataY);
  }
  
  if (metadata.author) {
    ctx.textAlign = 'right';
    ctx.fillText(`By ${metadata.author}`, x + width - 10, metadataY);
    ctx.textAlign = 'left';
  }
  
  // Article border
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxHeight: number
): void {
  const words = text.split(' ');
  let line = '';
  let currentY = y;
  let linesDrawn = 0;
  const maxLines = Math.floor(maxHeight / lineHeight);
  
  for (let i = 0; i < words.length && linesDrawn < maxLines; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && i > 0) {
      ctx.fillText(line, x, currentY);
      line = words[i] + ' ';
      currentY += lineHeight;
      linesDrawn++;
    } else {
      line = testLine;
    }
  }
  
  // Show the last line if there's space
  if (line && linesDrawn < maxLines) {
    ctx.fillText(line, x, currentY);
  } else if (line && linesDrawn >= maxLines) {
    // If we've hit the limit, show "..." to indicate more content
    const truncatedLine = line.substring(0, Math.max(0, line.length - 3)) + '...';
    ctx.fillText(truncatedLine, x, currentY);
  }
}

export function drawProfessionalFooter(
  ctx: CanvasRenderingContext2D,
  pageNumber: number,
  pageInfo: string
): void {
  const colors = getColorSchemeForPage(pageNumber);
  const layout = getLayoutConfigForPage(pageNumber);
  
  const footerY = layout.pageHeight - 60;
  
  // Footer background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, footerY, layout.pageWidth, 60);
  
  // Footer border
  ctx.strokeStyle = colors.border;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(layout.margin, footerY);
  ctx.lineTo(layout.pageWidth - layout.margin, footerY);
  ctx.stroke();
  
  // Footer text
  applyProfessionalStyling(ctx, pageNumber, 'smallText');
  ctx.textAlign = 'center';
  ctx.fillStyle = colors.lightText;
  ctx.fillText(pageInfo, layout.pageWidth / 2, footerY + 20);
  ctx.fillText(`Generated on ${new Date().toLocaleString()}`, layout.pageWidth / 2, footerY + 40);
}

// Import PAGE_DESIGNS from PageDesignSystem
import { PAGE_DESIGNS } from './PageDesignSystem';
