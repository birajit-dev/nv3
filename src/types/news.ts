export interface NewsArticle {
  _id: string;
  post_name: string;
  post_url?: string;
  post_summary?: string;
  post_content?: string;
  post_image?: string;
  author?: string;
  update_date: string;
  news_id?: number;
  category?: string;
  post_category?: string;
  post_topic?: string;
  post_editor?: string;
  tags?: string[];
  isFeatured?: boolean;
  views?: number;
  readTime?: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export interface VideoContent {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string; // YouTube URL or local video
  thumbnail: string;
  category: string;
  publishedAt: string;
  duration?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  url: string;
  alt: string;
  caption?: string;
  category: string;
  publishedAt: string;
  photographer?: string;
}

export type CategorySlug = 
  | 'tripura' 
  | 'national' 
  | 'world' 
  | 'sports' 
  | 'finance' 
  | 'article' 
  | 'showbiz' 
  | 'northeast' 
  | 'health'
  | 'adstender'