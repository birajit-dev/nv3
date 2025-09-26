'use client';

import { NewsArticle } from '@/types/news';

export interface PageDesign {
  pageNumber: number;
  title: string;
  sections: string[];
  layout: {
    columns: number;
    headerStyle: 'hero' | 'standard' | 'minimal';
    articleDistribution: {
      headlines: number;
      mainArticles: number;
      sideArticles: number;
    };
  };
  styling: {
    theme: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
    };
    typography: {
      headlineFont: string;
      bodyFont: string;
      fontSize: {
        headline: number;
        subheadline: number;
        body: number;
        small: number;
      };
    };
  };
  content: {
    priorityCategories: string[];
    maxArticles: number;
    specialFeatures: string[];
  };
}

export const PAGE_DESIGNS: PageDesign[] = [
  {
    pageNumber: 1,
    title: 'Front Page',
    sections: [],
    layout: {
      columns: 2,
      headerStyle: 'hero',
      articleDistribution: {
        headlines: 1,
        mainArticles: 1,
        sideArticles: 0
      }
    },
    styling: {
      theme: 'front-page',
      colors: {
        primary: '#1a1a1a',
        secondary: '#2563eb',
        accent: '#dc2626',
        background: '#ffffff'
      },
      typography: {
        headlineFont: 'bold 48px serif',
        bodyFont: '16px serif',
        fontSize: {
          headline: 48,
          subheadline: 32,
          body: 16,
          small: 12
        }
      }
    },
    content: {
      priorityCategories: ['breaking', 'politics', 'headlines'],
      maxArticles: 2,
      specialFeatures: ['hero-image', 'breaking-news-banner', 'weather-widget']
    }
  },
  {
    pageNumber: 2,
    title: 'Headlines & Major News',
    sections: [],
    layout: {
      columns: 2,
      headerStyle: 'standard',
      articleDistribution: {
        headlines: 1,
        mainArticles: 1,
        sideArticles: 0
      }
    },
    styling: {
      theme: 'headlines',
      colors: {
        primary: '#1a1a1a',
        secondary: '#059669',
        accent: '#dc2626',
        background: '#ffffff'
      },
      typography: {
        headlineFont: 'bold 36px serif',
        bodyFont: '15px serif',
        fontSize: {
          headline: 36,
          subheadline: 24,
          body: 15,
          small: 11
        }
      }
    },
    content: {
      priorityCategories: ['headlines', 'major', 'state'],
      maxArticles: 2,
      specialFeatures: ['section-dividers', 'article-highlights']
    }
  },
  {
    pageNumber: 3,
    title: 'Politics & Government',
    sections: [],
    layout: {
      columns: 2,
      headerStyle: 'standard',
      articleDistribution: {
        headlines: 1,
        mainArticles: 1,
        sideArticles: 0
      }
    },
    styling: {
      theme: 'politics',
      colors: {
        primary: '#1a1a1a',
        secondary: '#7c3aed',
        accent: '#dc2626',
        background: '#ffffff'
      },
      typography: {
        headlineFont: 'bold 32px serif',
        bodyFont: '14px serif',
        fontSize: {
          headline: 32,
          subheadline: 20,
          body: 14,
          small: 10
        }
      }
    },
    content: {
      priorityCategories: ['politics', 'government', 'administration'],
      maxArticles: 2,
      specialFeatures: ['official-photos', 'policy-highlights', 'minister-quotes']
    }
  },
  {
    pageNumber: 4,
    title: 'Local News & Community',
    sections: [],
    layout: {
      columns: 2,
      headerStyle: 'minimal',
      articleDistribution: {
        headlines: 1,
        mainArticles: 1,
        sideArticles: 0
      }
    },
    styling: {
      theme: 'local',
      colors: {
        primary: '#1a1a1a',
        secondary: '#ea580c',
        accent: '#dc2626',
        background: '#ffffff'
      },
      typography: {
        headlineFont: 'bold 28px serif',
        bodyFont: '13px serif',
        fontSize: {
          headline: 28,
          subheadline: 18,
          body: 13,
          small: 9
        }
      }
    },
    content: {
      priorityCategories: ['local', 'district', 'community'],
      maxArticles: 2,
      specialFeatures: ['local-photos', 'community-events', 'district-map']
    }
  }
];

export function getPageDesign(pageNumber: number): PageDesign {
  return PAGE_DESIGNS.find(design => design.pageNumber === pageNumber) || PAGE_DESIGNS[0];
}

export function categorizeArticlesForPage(articles: NewsArticle[], pageNumber: number): NewsArticle[] {
  const design = getPageDesign(pageNumber);
  const priorityCategories = design.content.priorityCategories;
  
  // Sort articles by relevance to this page
  const categorizedArticles = articles
    .map(article => ({
      ...article,
      relevanceScore: calculateRelevanceScore(article, priorityCategories, pageNumber)
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, design.content.maxArticles);

  return categorizedArticles;
}

function calculateRelevanceScore(article: NewsArticle, priorityCategories: string[], pageNumber: number): number {
  let score = 0;
  
  // Base score from article position (newer articles get higher scores)
  const daysSinceUpdate = (Date.now() - new Date(article.update_date).getTime()) / (1000 * 60 * 60 * 24);
  score += Math.max(0, 100 - daysSinceUpdate * 10);
  
  // Category matching
  const topic = article.post_topic?.toLowerCase() || '';
  const category = article.post_category?.toLowerCase() || '';
  const content = article.post_content?.toLowerCase() || '';
  
  priorityCategories.forEach(priorityCategory => {
    if (topic.includes(priorityCategory) || category.includes(priorityCategory)) {
      score += 50;
    }
    if (content.includes(priorityCategory)) {
      score += 25;
    }
  });
  
  // Page-specific boosts
  switch (pageNumber) {
    case 1: // Front page
      if (topic.includes('breaking') || topic.includes('urgent')) score += 100;
      if (topic.includes('politics') || category.includes('politics')) score += 75;
      break;
    case 2: // Headlines
      if (topic.includes('headlines') || topic.includes('major')) score += 75;
      break;
    case 3: // Politics
      if (topic.includes('politics') || category.includes('politics')) score += 100;
      if (content.includes('government') || content.includes('minister')) score += 50;
      break;
    case 4: // Local
      if (content.includes('agartala') || content.includes('district')) score += 100;
      if (content.includes('local') || content.includes('community')) score += 75;
      break;
  }
  
  return score;
}

export function distributeArticlesAcrossPages(articles: NewsArticle[]): { [pageNumber: number]: NewsArticle[] } {
  const distribution: { [pageNumber: number]: NewsArticle[] } = {
    1: [],
    2: [],
    3: [],
    4: []
  };
  
  // Sort articles by importance (breaking news first, then by date)
  const sortedArticles = [...articles].sort((a, b) => {
    const aBreaking = a.post_topic?.toLowerCase().includes('breaking') ? 1 : 0;
    const bBreaking = b.post_topic?.toLowerCase().includes('breaking') ? 1 : 0;
    
    if (aBreaking !== bBreaking) {
      return bBreaking - aBreaking;
    }
    
    return new Date(b.update_date).getTime() - new Date(a.update_date).getTime();
  });
  
  // Distribute articles across pages
  sortedArticles.forEach((article, index) => {
    const pageNumber = Math.floor(index / 8) + 1; // 8 articles per page
    if (pageNumber <= 4 && distribution[pageNumber]) {
      distribution[pageNumber].push(article);
    }
  });
  
  // Ensure each page has articles by redistributing if needed
  for (let pageNum = 1; pageNum <= 4; pageNum++) {
    if (distribution[pageNum].length === 0 && sortedArticles.length > 0) {
      // Take articles from other pages
      for (let otherPage = 1; otherPage <= 4; otherPage++) {
        if (otherPage !== pageNum && distribution[otherPage].length > 5) {
          distribution[pageNum].push(distribution[otherPage].pop()!);
          break;
        }
      }
    }
  }
  
  return distribution;
}

export function generatePageMetadata(pageNumber: number, articles: NewsArticle[]): {
  title: string;
  description: string;
  keywords: string[];
} {
  const design = getPageDesign(pageNumber);
  const pageArticles = articles.slice(0, 5);
  
  const keywords = [
    ...design.sections,
    ...pageArticles.map(article => article.post_topic).filter(Boolean),
    'Tripura news',
    'Northeast Herald',
    'digital newspaper'
  ].filter(Boolean);
  
  return {
    title: `${design.title} - Northeast Herald E-Paper`,
    description: `Read the latest ${design.sections.join(', ').toLowerCase()} from Tripura in Northeast Herald's digital edition.`,
    keywords: [...new Set(keywords)] as string[]
  };
}
