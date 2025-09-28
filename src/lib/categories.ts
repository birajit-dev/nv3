import { Category, CategorySlug } from '@/types/news';

export const CATEGORIES: Record<CategorySlug, Category> = {

  'tripura': {
    id: 'tripura',
    name: 'Tripura',
    slug: 'tripura',
    description: 'News from Tripura state',
    color: '#059669',
  },
  'national': {
    id: 'national',
    name: 'National',
    slug: 'national',
    description: 'National news from across India',
    color: '#2563eb',
  },
  'international': {
    id: 'international',
    name: 'International',
    slug: 'international',
    description: 'Global news and world events',
    color: '#7c3aed',
  },
  'sports': {
    id: 'sports',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports news and updates',
    color: '#ea580c',
  },
  'finance': {
    id: 'finance',
    name: 'Finance',
    slug: 'finance',
    description: 'Business and financial news',
    color: '#0891b2',
  },
  'article': {
    id: 'article', 
    name: 'Article',
    slug: 'article',
    description: 'Opinion pieces and editorials',
    color: '#be185d',
  },
  'showbiz': {
    id: 'showbiz',
    name: 'Showbiz',
    slug: 'showbiz',
    description: 'Showbiz news and updates',
    color: '#16a34a',

  },
  'northeast': {
    id: 'northeast',
    name: 'Northeast',
    slug: 'northeast',
    description: 'Northeast news and updates',
    color: '#6b7280',
  },
  'health': {
    id: 'health',
    name: 'Health',
    slug: 'health',
    description: 'Health news and updates',
    color: '#6b7280',
  },
  'adstender': {
    id: 'adstender',
    name: 'Jobs/Tenders',
    slug: 'adstender',
    description: 'Adstender news and updates',
    color: '#6b7280',
  },
};

export const CATEGORY_ORDER: CategorySlug[] = [
  'tripura',
  'national',
  'international',
  'sports',
  'finance',
  'article',
  'showbiz',
  'northeast',
  'health',
  'adstender',

];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES[slug as CategorySlug];
}

export function getAllCategories(): Category[] {
  return CATEGORY_ORDER.map(slug => CATEGORIES[slug]);
}
