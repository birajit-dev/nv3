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
  'world': {
    id: 'world',
    name: 'World',
    slug: 'world',
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
  'world',
  'sports',
  'finance',
  'article',
  'showbiz',
  'northeast',
  'health',
  'adstender',

];

// Map old category names to new ones for backward compatibility
export const CATEGORY_MAPPING: Record<string, CategorySlug> = {
  'international': 'world',
  // Add other mappings if needed in the future
};

// Helper function to get the correct category slug
export function getCategorySlug(category: string): CategorySlug {
  const mappedCategory = CATEGORY_MAPPING[category];
  if (mappedCategory) {
    return mappedCategory;
  }
  
  // Check if it's a valid CategorySlug
  if (Object.keys(CATEGORIES).includes(category as CategorySlug)) {
    return category as CategorySlug;
  }
  
  // Default fallback
  return 'article';
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES[slug as CategorySlug];
}

export function getAllCategories(): Category[] {
  return CATEGORY_ORDER.map(slug => CATEGORIES[slug]);
}
