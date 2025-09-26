import { NextRequest, NextResponse } from 'next/server';

interface Article {
  _id: string;
  post_name: string;
  post_url: string;
  post_summary: string;
  post_content: string;
  post_category: string;
  post_image?: string;
  author: string;
  update_date: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    articles: Article[];
  };
}

// Function to escape XML special characters
function escapeXml(unsafe: string): string {
  if (!unsafe) return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Function to strip HTML tags but preserve content
function stripHtmlTags(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .trim();
}

// Function to fetch recent news articles from the API
async function fetchRecentNewsArticles(): Promise<Article[]> {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://app.neherald.com'}/api/next/v1/rss`;
    console.log('Fetching from:', apiUrl); // Debug log
    
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error('API Response not OK:', response.status, response.statusText);
      throw new Error(`Failed to fetch articles: ${response.status}`);
    }
    
    const apiResponse: ApiResponse = await response.json();
    console.log('API Response:', apiResponse); // Debug log
    
    return apiResponse.success ? apiResponse.data.articles : [];
  } catch (error) {
    console.error('Error fetching RSS articles:', error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  console.log('RSS feed requested'); // Debug log
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neherald.com';
  
  try {
    const articles = await fetchRecentNewsArticles();
    console.log(`Found ${articles.length} articles`); // Debug log
    
    // If no articles, return a valid empty RSS feed
    if (articles.length === 0) {
      const emptyRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Northeast Herald - Tripura News &amp; Northeast India Updates</title>
    <link>${baseUrl}</link>
    <description>Get the latest news from Tripura and Northeast India. Breaking news, politics, sports, finance, and more from Agartala and beyond.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
  </channel>
</rss>`;

      return new NextResponse(emptyRss, {
        status: 200,
        headers: {
          'Content-Type': 'application/rss+xml',
          'Cache-Control': 'public, max-age=1800, s-maxage=1800',
        },
      });
    }
    
    const rssItems = articles.map(article => {
      const articleUrl = `${baseUrl}/${encodeURIComponent(article.post_category)}/${encodeURIComponent(article.post_url)}`;
      const pubDate = new Date(article.update_date).toUTCString();
      const cleanContent = stripHtmlTags(article.post_content);
      
      // Ensure all content is properly escaped
      const title = escapeXml(article.post_name);
      const summary = escapeXml(article.post_summary);
      const content = escapeXml(cleanContent);
      const category = escapeXml(article.post_category);
      const author = escapeXml(article.author);
      
      return `    <item>
      <title><![CDATA[${article.post_name}]]></title>
      <link>${articleUrl}</link>
      <description><![CDATA[${article.post_summary}]]></description>
      <content:encoded><![CDATA[${cleanContent}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <guid isPermaLink="true">${articleUrl}</guid>
      <category><![CDATA[${article.post_category}]]></category>
      <author>editor@neherald.com (${article.author})</author>
    </item>`;
    }).join('\n');
    
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">
  <channel>
    <title>Northeast Herald - Tripura News &amp; Northeast India Updates</title>
    <link>${baseUrl}</link>
    <description>Get the latest news from Tripura and Northeast India. Breaking news, politics, sports, finance, and more from Agartala and beyond.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>neherald.com@gmail.com (Northeast Herald)</managingEditor>
    <webMaster>neherald.com@gmail.com (Northeast Herald)</webMaster>
    <copyright>© 2025 Northeast Herald. All rights reserved.</copyright>
    <category>News</category>
    <category>Politics</category>
    <category>Regional News</category>
    <category>Tripura</category>
    <category>Northeast India</category>
    <image>
      <url>${baseUrl}/images/neherald_logo.png</url>
      <title>Northeast Herald</title>
      <link>${baseUrl}</link>
      <width>200</width>
      <height>60</height>
    </image>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    <generator>Northeast Herald RSS Generator</generator>
    
${rssItems}
  </channel>
</rss>`;
    
    console.log('RSS feed generated successfully'); // Debug log
    
    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    
    // Return a proper error response in XML format
    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Northeast Herald - RSS Error</title>
    <link>${baseUrl}</link>
    <description>Error generating RSS feed</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  </channel>
</rss>`;

    return new NextResponse(errorRss, {
      status: 500,
      headers: {
        'Content-Type': 'application/rss+xml',
      },
    });
  }
}