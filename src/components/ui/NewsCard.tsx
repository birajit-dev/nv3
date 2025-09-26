import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { User, Eye, ArrowUpRight, Bookmark } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import { CATEGORIES } from '@/lib/categories';

interface NewsCardProps {
  article: NewsArticle;
  variant?: 'default' | 'compact' | 'list';
  showImage?: boolean;
  className?: string;
}

export default function NewsCard({ 
  article, 
  variant = 'default', 
  showImage = true,
  className = '' 
}: NewsCardProps) {
  const category = CATEGORIES[article.category as keyof typeof CATEGORIES];
  const publishedDate = new Date(article.update_date);

  const cardContent = (
    <>
      {showImage && article.post_image && (
        <div className={`relative overflow-hidden bg-gray-200 group ${
          variant === 'compact' ? 'aspect-video' : 'aspect-[16/10]'
        }`}>
          <Image
            src={article.post_image}
            alt={article.post_name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes={variant === 'compact' ? '(max-width: 768px) 100vw, 300px' : '(max-width: 768px) 100vw, 400px'}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          {category && (
            <div className="absolute top-3 left-3 z-10">
              <div 
                className="px-3 py-1 text-xs font-bold text-white rounded-full backdrop-blur-sm shadow-lg"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </div>
            </div>
          )}
          
          {/* Read time indicator */}
          {article.readTime && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                {article.readTime} min
              </div>
            </div>
          )}
          
          {/* Hover overlay with bookmark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center space-x-2">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Bookmark size={16} className="text-gray-700" />
              </button>
              <div className="p-2 bg-white/90 backdrop-blur-sm rounded-full">
                <ArrowUpRight size={16} className="text-gray-700" />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className={`${showImage && article.post_image ? 'p-5' : 'p-3'}`}>
        {!showImage && category && (
          <div className="mb-3">
            <div 
              className="inline-block px-3 py-1 text-xs font-bold text-white rounded-full"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </div>
          </div>
        )}
        
        <h3 className={`font-bold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-tight ${
          variant === 'compact' ? 'text-sm mb-2' : 'text-lg mb-3'
        }`}>
          {article.post_name}
        </h3>
        
        {variant !== 'compact' && (
          <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {article.post_summary}
          </p>
        )}
        
        <div className={`flex items-center justify-between text-sm ${
          variant === 'compact' ? 'text-xs' : ''
        }`}>
          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span className="font-medium">{article.author}</span>
            </div>
            {article.views && (
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{article.views.toLocaleString()}</span>
              </div>
            )}
          </div>
          <time dateTime={article.update_date} className="text-gray-400 font-medium">
            {format(publishedDate, 'MMM dd, yyyy')}
          </time>
        </div>
      </div>
    </>
  );

  if (variant === 'list') {
    return (
      <article className={`flex space-x-4 group hover:bg-gray-50 p-3 rounded-lg transition-colors ${className}`}>
        {showImage && article.post_image && (
          <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden bg-gray-200 rounded-lg">
            <Image
              src={article.post_image}
              alt={article.post_name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="80px"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <div className="mb-1">
              <div 
                className="inline-block px-2 py-1 text-xs font-bold text-white rounded-full"
                style={{ backgroundColor: category.color }}
              >
                {category.name}
              </div>
            </div>
          )}
          <Link href={`/${article.category}/${article.post_url}`} className="block">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-blue-600 transition-colors leading-tight mb-1">
              {article.post_name}
            </h3>
          </Link>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span className="font-medium">{article.author}</span>
            <span>•</span>
            <time dateTime={article.update_date}>
              {format(publishedDate, 'MMM dd')}
            </time>
            {article.views && (
              <>
                <span>•</span>
                <span>{article.views.toLocaleString()} views</span>
              </>
            )}
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300 group ${className}`}>
      <Link href={`/${article.category}/${article.post_url}`} className="block">
        {cardContent}
      </Link>
    </article>
  );
}
