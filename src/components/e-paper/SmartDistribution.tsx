'use client';

import { NewsArticle } from '@/types/news';
import { getPageDesign } from './PageDesignSystem';

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

export interface ArticleAnalysis {
  article: NewsArticle;
  importance: number;
  category: string;
  keywords: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  readability: number;
  pageRelevance: { [pageNumber: number]: number };
}

export interface DistributionResult {
  pages: {
    [pageNumber: number]: {
      articles: NewsArticle[];
      analysis: ArticleAnalysis[];
      layoutDistribution: {
        headlines: NewsArticle[];
        mainArticles: NewsArticle[];
        sideArticles: NewsArticle[];
      };
    };
  };
  metadata: {
    totalArticles: number;
    distributionQuality: number;
    categories: string[];
  };
}

export class SmartArticleDistribution {
  private articles: NewsArticle[];
  private analyses: ArticleAnalysis[] = [];

  constructor(articles: NewsArticle[]) {
    this.articles = articles;
  }

  async distributeArticles(): Promise<DistributionResult> {
    // Step 1: Analyze all articles
    this.analyses = await this.analyzeArticles();

    // Step 2: Distribute articles across pages
    const pageDistribution = this.distributePagesToPages();

    // Step 3: Optimize layout within each page
    const optimizedDistribution = this.optimizePageLayouts(pageDistribution);

    // Step 4: Calculate distribution quality
    const quality = this.calculateDistributionQuality(optimizedDistribution);

    return {
      pages: optimizedDistribution,
      metadata: {
        totalArticles: this.articles.length,
        distributionQuality: quality,
        categories: [...new Set(this.analyses.map(a => a.category))]
      }
    };
  }

  private async analyzeArticles(): Promise<ArticleAnalysis[]> {
    return Promise.all(
      this.articles.map(async (article) => {
        const analysis = await this.analyzeArticle(article);
        return analysis;
      })
    );
  }

  private async analyzeArticle(article: NewsArticle): Promise<ArticleAnalysis> {
    const content = stripHtmlTags(article.post_content || '');
    
    return {
      article,
      importance: this.calculateImportance(article),
      category: this.categorizeArticle(article),
      keywords: this.extractKeywords(content),
      sentiment: this.analyzeSentiment(content),
      readability: this.calculateReadability(content),
      pageRelevance: this.calculatePageRelevance(article)
    };
  }

  private calculateImportance(article: NewsArticle): number {
    let importance = 50; // Base importance

    // Time-based importance (recent articles are more important)
    const daysSinceUpdate = (Date.now() - new Date(article.update_date).getTime()) / (1000 * 60 * 60 * 24);
    importance += Math.max(0, 30 - daysSinceUpdate * 5);

    // Topic-based importance
    const topic = article.post_topic?.toLowerCase() || '';
    if (topic.includes('breaking')) importance += 40;
    if (topic.includes('urgent')) importance += 30;
    if (topic.includes('exclusive')) importance += 25;
    if (topic.includes('politics')) importance += 20;
    if (topic.includes('government')) importance += 15;

    // Content analysis
    const content = stripHtmlTags(article.post_content || '').toLowerCase();
    if (content.includes('minister')) importance += 15;
    if (content.includes('chief minister')) importance += 25;
    if (content.includes('governor')) importance += 20;
    if (content.includes('accident') || content.includes('death')) importance += 20;
    if (content.includes('arrest')) importance += 15;
    if (content.includes('election')) importance += 25;

    // Image presence
    if (article.post_image) importance += 10;

    return Math.min(100, Math.max(0, importance));
  }

  private categorizeArticle(article: NewsArticle): string {
    const topic = article.post_topic?.toLowerCase() || '';
    const category = article.post_category?.toLowerCase() || '';
    const content = stripHtmlTags(article.post_content || '').toLowerCase();

    // Breaking news
    if (topic.includes('breaking') || topic.includes('urgent')) return 'breaking';

    // Politics
    if (topic.includes('politics') || category.includes('politics') || 
        content.includes('government') || content.includes('minister')) return 'politics';

    // Local news
    if (content.includes('agartala') || content.includes('district') || 
        content.includes('local') || topic.includes('local')) return 'local';

    // Crime
    if (content.includes('police') || content.includes('arrest') || 
        content.includes('crime') || content.includes('court')) return 'crime';

    // Health
    if (topic.includes('health') || category.includes('health') || 
        content.includes('hospital') || content.includes('doctor')) return 'health';

    // Education
    if (content.includes('school') || content.includes('university') || 
        content.includes('education') || content.includes('student')) return 'education';

    // Sports
    if (topic.includes('sports') || category.includes('sports') || 
        content.includes('match') || content.includes('tournament')) return 'sports';

    // Business/Economy
    if (topic.includes('business') || category.includes('finance') || 
        content.includes('economy') || content.includes('market')) return 'business';

    return 'general';
  }

  private extractKeywords(content: string): string[] {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);

    const stopWords = new Set(['this', 'that', 'with', 'have', 'will', 'from', 'they', 'been', 'said', 'each', 'which', 'their', 'time', 'were', 'than', 'only', 'also', 'more', 'very', 'what', 'know', 'just', 'first', 'into', 'over', 'after', 'back', 'other', 'many', 'well', 'work', 'life', 'even', 'most', 'give', 'good', 'year']);

    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      if (!stopWords.has(word)) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    });

    return Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private analyzeSentiment(content: string): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['success', 'achievement', 'progress', 'development', 'improvement', 'victory', 'celebration', 'award', 'honor', 'growth'];
    const negativeWords = ['accident', 'death', 'arrest', 'crime', 'problem', 'issue', 'crisis', 'protest', 'violence', 'corruption'];

    const words = content.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
      if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private calculateReadability(content: string): number {
    const sentences = content.split(/[.!?]+/).length;
    const words = content.split(/\s+/).length;
    const syllables = this.countSyllables(content);

    // Flesch Reading Ease formula (simplified)
    const score = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return Math.min(100, Math.max(0, score));
  }

  private countSyllables(text: string): number {
    const words = text.toLowerCase().split(/\s+/);
    let syllableCount = 0;

    words.forEach(word => {
      const vowels = word.match(/[aeiou]/g);
      syllableCount += vowels ? vowels.length : 1;
    });

    return syllableCount;
  }

  private calculatePageRelevance(article: NewsArticle): { [pageNumber: number]: number } {
    const relevance: { [pageNumber: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0 };
    const category = this.categorizeArticle(article);
    const importance = this.calculateImportance(article);

    // Page 1 (Front Page) - Breaking news, politics, high importance
    relevance[1] = importance;
    if (category === 'breaking') relevance[1] += 40;
    if (category === 'politics') relevance[1] += 30;
    if (category === 'crime') relevance[1] += 20;

    // Page 2 (Headlines) - Major news, general stories
    relevance[2] = importance * 0.8;
    if (category === 'general') relevance[2] += 30;
    if (category === 'health') relevance[2] += 25;
    if (category === 'education') relevance[2] += 20;

    // Page 3 (Politics) - Political news, government
    relevance[3] = importance * 0.6;
    if (category === 'politics') relevance[3] += 50;
    if (category === 'business') relevance[3] += 20;

    // Page 4 (Local) - Local news, community, sports
    relevance[4] = importance * 0.7;
    if (category === 'local') relevance[4] += 50;
    if (category === 'sports') relevance[4] += 30;
    if (category === 'education') relevance[4] += 25;

    return relevance;
  }

  private distributePagesToPages(): { [pageNumber: number]: ArticleAnalysis[] } {
    const pageDistribution: { [pageNumber: number]: ArticleAnalysis[] } = {
      1: [], 2: [], 3: [], 4: []
    };

    // Sort articles by overall importance
    const sortedAnalyses = [...this.analyses].sort((a, b) => b.importance - a.importance);

    // Distribute articles to pages based on relevance scores
    sortedAnalyses.forEach(analysis => {
      const bestPage = Object.entries(analysis.pageRelevance)
        .sort(([,a], [,b]) => b - a)[0][0];
      
      const pageNumber = parseInt(bestPage);
      const pageDesign = getPageDesign(pageNumber);
      
      // Check if page has capacity
      if (pageDistribution[pageNumber].length < pageDesign.content.maxArticles) {
        pageDistribution[pageNumber].push(analysis);
      } else {
        // Find next best page with capacity
        const sortedPages = Object.entries(analysis.pageRelevance)
          .sort(([,a], [,b]) => b - a);
        
        for (const [page] of sortedPages) {
          const pNum = parseInt(page);
          const pDesign = getPageDesign(pNum);
          if (pageDistribution[pNum].length < pDesign.content.maxArticles) {
            pageDistribution[pNum].push(analysis);
            break;
          }
        }
      }
    });

    return pageDistribution;
  }

  private optimizePageLayouts(
    pageDistribution: { [pageNumber: number]: ArticleAnalysis[] }
  ): { [pageNumber: number]: { articles: NewsArticle[]; analysis: ArticleAnalysis[]; layoutDistribution: { headlines: NewsArticle[]; mainArticles: NewsArticle[]; sideArticles: NewsArticle[] } } } {
    const optimizedDistribution: { [pageNumber: number]: { articles: NewsArticle[]; analysis: ArticleAnalysis[]; layoutDistribution: { headlines: NewsArticle[]; mainArticles: NewsArticle[]; sideArticles: NewsArticle[] } } } = {};

    Object.entries(pageDistribution).forEach(([pageNum, analyses]) => {
      const pageNumber = parseInt(pageNum);
      const pageDesign = getPageDesign(pageNumber);
      
      // Sort articles within page by importance
      const sortedAnalyses = analyses.sort((a, b) => b.importance - a.importance);
      
      // Distribute within page layout
      const headlines = sortedAnalyses
        .slice(0, pageDesign.layout.articleDistribution.headlines)
        .map(a => a.article);
      
      const mainArticles = sortedAnalyses
        .slice(pageDesign.layout.articleDistribution.headlines, 
               pageDesign.layout.articleDistribution.headlines + pageDesign.layout.articleDistribution.mainArticles)
        .map(a => a.article);
      
      const sideArticles = sortedAnalyses
        .slice(pageDesign.layout.articleDistribution.headlines + pageDesign.layout.articleDistribution.mainArticles)
        .map(a => a.article);

      optimizedDistribution[pageNumber] = {
        articles: sortedAnalyses.map(a => a.article),
        analysis: sortedAnalyses,
        layoutDistribution: {
          headlines,
          mainArticles,
          sideArticles
        }
      };
    });

    return optimizedDistribution;
  }

  private calculateDistributionQuality(distribution: { [pageNumber: number]: { articles: NewsArticle[]; analysis: ArticleAnalysis[]; layoutDistribution: { headlines: NewsArticle[]; mainArticles: NewsArticle[]; sideArticles: NewsArticle[] } } }): number {
    let qualityScore = 0;
    let totalChecks = 0;

    Object.entries(distribution).forEach(([pageNum, pageData]) => {
      const pageNumber = parseInt(pageNum);
      const pageDesign = getPageDesign(pageNumber);
      
      // Check if page has optimal number of articles
      const articleCount = pageData.articles.length;
      const optimalCount = pageDesign.content.maxArticles * 0.8; // 80% of max is optimal
      
      if (articleCount >= optimalCount) {
        qualityScore += 25;
      } else {
        qualityScore += (articleCount / optimalCount) * 25;
      }
      totalChecks += 25;

      // Check category distribution
      const categories = pageData.analysis.map((a: ArticleAnalysis) => a.category);
      const categoryDiversity = new Set(categories).size;
      qualityScore += Math.min(25, categoryDiversity * 5);
      totalChecks += 25;

      // Check importance distribution
      const importanceRange = Math.max(...pageData.analysis.map((a: ArticleAnalysis) => a.importance)) - 
                             Math.min(...pageData.analysis.map((a: ArticleAnalysis) => a.importance));
      qualityScore += Math.min(25, importanceRange * 0.5);
      totalChecks += 25;

      // Check layout distribution
      const { headlines, mainArticles, sideArticles } = pageData.layoutDistribution;
      const layoutBalance = Math.min(headlines.length, mainArticles.length, sideArticles.length);
      qualityScore += Math.min(25, layoutBalance * 5);
      totalChecks += 25;
    });

    return Math.round((qualityScore / totalChecks) * 100);
  }
}

export async function smartDistributeArticles(articles: NewsArticle[]): Promise<DistributionResult> {
  const distributor = new SmartArticleDistribution(articles);
  return await distributor.distributeArticles();
}
