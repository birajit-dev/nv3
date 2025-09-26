import { NextRequest, NextResponse } from 'next/server';

interface Article {
  _id: string;
  post_name: string;
  post_url: string;
  post_keyword: string;
  post_category: string;
  update_date: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    articles: Article[];
  };
}

// Function to fetch recent news articles from the API
async function fetchRecentNewsArticles(): Promise<Article[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://app.neherald.com'}/api/next/v1/newsitemap`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const apiResponse: ApiResponse = await response.json();
    return apiResponse.success ? apiResponse.data.articles : [];
  } catch (error) {
    console.error('Error fetching news sitemap articles:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com';
  
  try {
    const articles = await fetchRecentNewsArticles();
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n';
    
    articles.forEach(article => {
      const articleUrl = `${baseUrl}/${article.post_category}/${article.post_url}`;
      const lastModified = new Date(article.update_date).toISOString();
      
      xml += '  <url>\n';
      xml += `    <loc>${articleUrl}</loc>\n`;
      xml += '    <news:news>\n';
      xml += '      <news:publication>\n';
      xml += '        <news:name>Northeast Herald</news:name>\n';
      xml += '        <news:language>en</news:language>\n';
      xml += '      </news:publication>\n';
      xml += `      <news:publication_date>${lastModified}</news:publication_date>\n`;
      xml += `      <news:title><![CDATA[${article.post_name}]]></news:title>\n`;
      
      // Generate comprehensive keywords based on category and content
      const keywords = generateNewsKeywords(article);
      xml += `      <news:keywords><![CDATA[${keywords}]]></news:keywords>\n`;
      
      xml += '    </news:news>\n';
      xml += '  </url>\n';
    });
    
    xml += '</urlset>';
    
    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800', // Cache for 30 minutes
      },
    });
  } catch (error) {
    console.error('Error generating news sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}

function generateNewsKeywords(article: Article): string {
  const baseKeywords = [
    'Tripura news', 'Agartala news', 'Northeast India news', 'Tripura politics',
    'Northeast India updates', 'Tripura breaking news', 'Agartala updates'
  ];
  
  const categoryKeywords: Record<string, string[]> = {
    'tripura': [
      'Tripura government', 'Tripura CM', 'Tripura assembly', 'Agartala politics',
      'Tripura development', 'Tripura infrastructure', 'Tripura education',
      'Tripura health', 'Tripura tourism', 'Tripura culture', 'Tripura festivals'
    ],
    'national': [
      'India news', 'National politics', 'Delhi news', 'Indian government',
      'Parliament news', 'Election news', 'Indian politics'
    ],
    'international': [
      'World news', 'International politics', 'Global news', 'Foreign affairs',
      'International relations', 'World economy', 'Global politics'
    ],
    'sports': [
      'Sports news', 'Cricket news', 'Football news', 'Olympics', 'Sports updates',
      'Tripura sports', 'Northeast sports', 'Indian sports', 'World sports'
    ],
    'finance': [
      'Business news', 'Finance news', 'Economic news', 'Stock market',
      'Banking news', 'Trade news', 'Investment news', 'Northeast business',
      'Tripura economy', 'Indian economy'
    ]
  };
  
  const keywords = [...baseKeywords];
  
  if (article.post_category && categoryKeywords[article.post_category]) {
    keywords.push(...categoryKeywords[article.post_category]);
  }
  
  // Add location-specific keywords
  const locations = [
    'Agartala', 'Udaipur', 'Dharmanagar', 'Kailashahar', 'Belonia',
    'Manipur', 'Assam', 'Meghalaya', 'Nagaland', 'Mizoram', 'Arunachal Pradesh', 'Sikkim'
  ];
  
  keywords.push(...locations);
  
  return keywords.join(', ');
}
