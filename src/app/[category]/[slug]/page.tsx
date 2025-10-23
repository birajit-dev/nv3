import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { getCategoryBySlug, getCategorySlug } from '@/lib/categories';
import { generateSEOMetadata, generateNewsArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import AdBanner from '@/components/ui/AdBanner';
import { Clock, User, Share2, Calendar, Tag, ChevronRight, Mail } from 'lucide-react';
import { NewsArticle } from '@/types/news';
import CopyLinkButton from '@/components/ui/CopyLinkButton';

interface ArticlePageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

// Extended interface for single article page with additional fields
interface ExtendedNewsArticle extends NewsArticle {
  post_category?: string;
  post_keyword?: string;
  meta_description?: string;
  meta_tags?: string;
  publishedDate?: string;
  articleSection?: string;
  canonicalUrl?: string;
  breadcrumb?: Array<{ name: string; url: string }>;
}

interface SingleNewsResponse {
  success: boolean;
  data: {
    article: ExtendedNewsArticle;
    relatedNews: ExtendedNewsArticle[];
    latestNews: ExtendedNewsArticle[];
    trendingNews: ExtendedNewsArticle[];
    categoryLatest: ExtendedNewsArticle[];
    tripuraNews: ExtendedNewsArticle[];
    seo: {
      title: string;
      description: string;
      keywords: string;
      ogImage: string;
      ogUrl: string;
      publishedTime: string;
      modifiedTime: string;
      articleTag: string[];
      category: string;
    };
  };
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com';

async function fetchSingleNews(category: string, slug: string): Promise<SingleNewsResponse | null> {
  try {
    // Try the most likely API endpoint first
    const response = await fetch(`${API_BASE_URL}/api/next/v1/single?c=${category}&s=${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to fetch article:', error);
    return null;
  }
}

function getImageUrl(imagePath: string): string {
  if (!imagePath) return '/placeholder-news.jpg';
  
  try {
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it starts with /uploads, prepend the API base URL
    if (imagePath.startsWith('/uploads')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}${imagePath}`;
    }
    
    // Otherwise, assume it's a relative path and prepend the API base URL
    return `${process.env.NEXT_PUBLIC_API_URL || 'https://app.neherald.com'}/${imagePath}`;
  } catch (error) {
    console.error('Invalid image URL:', imagePath, error);
    return '/placeholder-news.jpg';
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const newsData = await fetchSingleNews(category, slug);
  
  if (!newsData || !newsData.success) {
    return generateSEOMetadata({
      title: 'Article Not Found',
      noIndex: true,
    });
  }

  const { article, seo } = newsData.data;

  return generateSEOMetadata({
    title: seo.title,
    description: seo.description,
    path: `/${category}/${slug}`,
    image: getImageUrl(article.post_image || ''),
    article: article,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { category, slug } = await params;
  const newsData = await fetchSingleNews(category, slug);
  
  if (!newsData || !newsData.success) {
    notFound();
  }

  const { article, relatedNews, latestNews, seo } = newsData.data;
  const categoryData = getCategoryBySlug(category);
  
  const publishedDate = new Date(article.publishedDate || article.update_date);

  // Create a properly formatted article object for JSON-LD
  const articleForJsonLd = {
    ...article,
    tags: seo.articleTag || [], // Use seo.articleTag as tags array
    content: article.post_content || '',
    category: seo.category || categoryData?.name || 'News',
    readTime: 5, // Default read time
  };

  // Generate JSON-LD structured data
  const articleJsonLd = generateNewsArticleJsonLd(
    articleForJsonLd, 
    seo.ogUrl || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com'}/${category}/${slug}`
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    article.breadcrumb || [
      { name: 'Home', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com' },
      { name: categoryData?.name || 'News', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com'}/${category}` },
      { name: article.post_name, url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com'}/${category}/${slug}` },
    ]
  );

  const currentUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com'}/${category}/${slug}`;
  const shareText = `${article.post_name} - ${article.post_summary}`;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-2">
            <nav className="flex items-center space-x-1 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <Link 
                href={`/${category}`} 
                className="hover:text-blue-600 transition-colors"
              >
                {categoryData?.name || 'News'}
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 truncate">
                {article.post_name}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <header className="mb-6">
                {/* Category Badge */}
                {categoryData && (
                  <div className="mb-3">
                    <Link
                      href={`/${category}`}
                      className="inline-block px-3 py-1 text-xs font-semibold text-white rounded"
                      style={{ backgroundColor: categoryData.color }}
                    >
                      {categoryData.name}
                    </Link>
                  </div>
                )}

                {/* Title */}
                <h1 className="text-lg md:text-[32px] font-bold text-gray-900 leading-tight mb-4">
                  {article.post_name}
                </h1>

                {/* Summary */}
                {article.post_summary && (
                  <p className="text-[16px] text-gray-600 leading-relaxed mb-6 italic font-serif">
                    {article.post_summary.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()}
                  </p>
                )}

                {/* Article Meta */}
                <div className="flex items-center gap-3 flex-wrap text-sm text-gray-500 pb-4 border-b border-gray-200">
                  <div className="flex items-center space-x-1">
                    <User size={14} />
                    <span className="font-medium text-gray-700">{article.author}</span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Calendar size={14} />
                    <time dateTime={article.publishedDate || article.update_date}>
                      {format(publishedDate, 'MMM dd, yyyy')}
                    </time>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>5 min read</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              {article.post_image && (
                <div className="relative aspect-video mb-6 overflow-hidden rounded-lg">
                  <Image
                    src={getImageUrl(article.post_image)}
                    alt={article.post_name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 800px"
                  />
                </div>
              )}

              {/* Enhanced Social Share Buttons */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <span className="text-sm font-medium text-gray-700 flex items-center">
                    <Share2 size={16} className="mr-2" />
                    Share this article:
                  </span>
                  
                  <div className="flex items-center justify-center sm:justify-start flex-wrap gap-2">
                    {/* Facebook */}
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-10 h-10 bg-[#1877F2] text-white rounded-lg hover:bg-[#166FE5] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on Facebook"
                      aria-label="Share on Facebook"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>

                    {/* Twitter/X */}
                    <a
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-10 h-10 bg-[#000000] text-white rounded-lg hover:bg-gray-800 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on X (Twitter)"
                      aria-label="Share on X (Twitter)"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                    </a>

                    {/* WhatsApp */}
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${currentUrl}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-10 h-10 bg-[#25D366] text-white rounded-lg hover:bg-[#22C55E] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on WhatsApp"
                      aria-label="Share on WhatsApp"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
                      </svg>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-10 h-10 bg-[#0A66C2] text-white rounded-lg hover:bg-[#004182] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on LinkedIn"
                      aria-label="Share on LinkedIn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>

                    {/* Telegram */}
                    <a
                      href={`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-10 h-10 bg-[#229ED9] text-white rounded-lg hover:bg-[#0088CC] transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share on Telegram"
                      aria-label="Share on Telegram"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                      </svg>
                    </a>

                    {/* Email */}
                    <a
                      href={`mailto:?subject=${encodeURIComponent(article.post_name)}&body=${encodeURIComponent(`${shareText}\n\nRead more: ${currentUrl}`)}`}
                      className="group flex items-center justify-center w-10 h-10 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                      title="Share via Email"
                      aria-label="Share via Email"
                    >
                      <Mail size={18} />
                    </a>

                    {/* Copy Link */}
                    <CopyLinkButton url={currentUrl} />
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-8">
                <div 
                  dangerouslySetInnerHTML={{ __html: article.post_content || '' }}
                />
              </div>

              {/* In-Article Ad */}
              <div className="mb-8">
                <AdBanner type="horizontal" />
              </div>

              {/* Tags */}
              {seo.articleTag && seo.articleTag.length > 0 && (
                <div className="mb-8">
                  <div className="flex items-center space-x-2 mb-3">
                    <Tag size={16} className="text-gray-500" />
                    <span className="font-semibold text-gray-700">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {seo.articleTag.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author Box */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                    <User size={20} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {article.author}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">
                      Senior Staff Reporter at Northeast Herald, covering news from Tripura and Northeast India.
                    </p>
                    <div className="flex space-x-4">
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Follow</button>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">More Articles</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              {relatedNews.length > 0 && (
                <section className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-2">Related Articles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {relatedNews.slice(0, 4).map((relatedArticle) => (
                      <Link key={relatedArticle._id} href={`/${getCategorySlug(relatedArticle.post_category || 'article')}/${relatedArticle.post_url}`} className="group block">
                        <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="relative h-40">
                            <Image
                              src={getImageUrl(relatedArticle.post_image || '')}
                              alt={relatedArticle.post_name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 line-clamp-2">
                              {relatedArticle.post_name}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {relatedArticle.post_summary?.replace(/<[^>]*>/g, '') || ''}
                            </p>
                            <div className="flex items-center text-xs text-gray-500 space-x-2">
                              <span>{relatedArticle.author}</span>
                              <span>•</span>
                              <span>{format(new Date(relatedArticle.update_date), 'MMM dd')}</span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-6">
                {/* Sidebar Ad */}
                <AdBanner type="sidebar" />

                {/* Latest News */}
                <section className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">Latest News</h3>
                  <div className="space-y-4">
                    {latestNews.slice(0, 5).map((latestArticle) => (
                      <Link key={latestArticle._id} href={`/${getCategorySlug(latestArticle.post_category || 'article')}/${latestArticle.post_url}`} className="group block">
                        <article className="flex space-x-3 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                          <div className="relative w-20 h-16 flex-shrink-0 overflow-hidden rounded">
                            <Image
                              src={getImageUrl(latestArticle.post_image || '')}
                              alt={latestArticle.post_name}
                              fill
                              className="object-cover"
                              sizes="80px"
                              loading="lazy"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 line-clamp-2 mb-1">
                              {latestArticle.post_name}
                            </h4>
                            <div className="flex items-center text-xs text-gray-500 space-x-2">
                              <span>{latestArticle.author}</span>
                              <span>•</span>
                              <span>{format(new Date(latestArticle.update_date), 'MMM dd')}</span>
                            </div>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Square Ad */}
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Advertisement 300x250</span>
                  </div>
                </div>

                {/* Another Sidebar Ad */}
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Advertisement 300x400</span>
                  </div>
                </div>

                {/* Third Square Ad */}
                <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 text-center">
                  <div className="w-full h-64 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Advertisement 300x250</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
