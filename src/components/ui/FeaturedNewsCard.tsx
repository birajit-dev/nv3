import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { Clock, User, Eye } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { CATEGORIES } from '@/lib/categories';

interface FeaturedNewsCardProps {
  article: NewsArticle;
  variant?: 'hero' | 'large' | 'medium';
  className?: string;
}

export default function FeaturedNewsCard({ 
  article, 
  variant = 'hero',
  className = '' 
}: FeaturedNewsCardProps) {
  const category = CATEGORIES[article.category as keyof typeof CATEGORIES];
  const publishedDate = new Date(article.update_date);

  if (variant === 'hero') {
    return (
      <article className={`relative overflow-hidden bg-gray-900 rounded-lg ${className}`}>
        <Link href={`/${article.post_category || 'news'}/${article.post_url || article._id}`} className="block">
          {article.post_image && (
            <div className="relative aspect-[16/9] lg:aspect-[21/9]">
              <Image
                src={article.post_image}
                alt={article.post_name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8 text-white">
            {category && (
              <div 
                className="inline-block px-3 py-1 mb-3 text-sm font-semibold rounded"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </div>
            )}
            
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-3 line-clamp-3">
              {article.post_name}
            </h1>
            
            <p className="text-lg text-gray-200 mb-4 line-clamp-2 hidden sm:block">
              {article.post_summary}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-300">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User size={16} />
                  <span>{article.author || 'Unknown Author'}</span>
                </div>
                {article.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock size={16} />
                    <span>{article.readTime} min read</span>
                  </div>
                )}
                {article.views && (
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{article.views.toLocaleString()}</span>
                  </div>
                )}
              </div>
              <time dateTime={article.update_date}>
                {format(publishedDate, 'MMMM dd, yyyy')}
              </time>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'large') {
    return (
      <article className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${className}`}>
        <Link href={`/${article.post_category || 'news'}/${article.post_url || article._id}`} className="block">
          {article.post_image && (
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
              <Image
                src={article.post_image}
                alt={article.post_name}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 600px"
              />
              {category && (
                <div 
                  className="absolute top-4 left-4 px-3 py-1 text-sm font-semibold text-white rounded"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </div>
              )}
            </div>
          )}
          
          <div className="p-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight mb-3 line-clamp-3 hover:text-blue-600 transition-colors">
              {article.post_name}
            </h2>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {article.post_summary}
            </p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>{article.author || 'Unknown Author'}</span>
                </div>
                {article.readTime && (
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{article.readTime} min read</span>
                  </div>
                )}
              </div>
              <time dateTime={article.update_date}>
                {format(publishedDate, 'MMM dd, yyyy')}
              </time>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // Medium variant
  return (
    <article className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <Link href={`/${article.post_category || 'news'}/${article.post_url || article._id}`} className="block">
        <div className="flex">
          {article.post_image && (
            <div className="relative w-32 h-24 flex-shrink-0 overflow-hidden bg-gray-200">
              <Image
                src={article.post_image}
                alt={article.post_name}
                fill
                className="object-cover"
                sizes="128px"
              />
            </div>
          )}
          
          <div className="flex-1 p-4">
            {category && (
              <div 
                className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-white rounded"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </div>
            )}
            
            <h3 className="font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors mb-2">
              {article.post_name}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-2">
                <span>{article.author || 'Unknown Author'}</span>
                {article.readTime && (
                  <>
                    <span>•</span>
                    <span>{article.readTime} min</span>
                  </>
                )}
              </div>
              <time dateTime={article.update_date}>
                {format(publishedDate, 'MMM dd')}
              </time>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
