import React from 'react';

interface KeywordOptimizerProps {
  targetKeywords: string[];
  content: string;
  location?: string;
}

export default function KeywordOptimizer({ 
  targetKeywords, 
  content, 
  location = 'Tripura' 
}: KeywordOptimizerProps) {
  
  // Generate optimized content with target keywords
  const generateOptimizedContent = () => {
    const keywordDensity = 2; // 2% keyword density
    const words = content.split(' ');
    const totalWords = words.length;
    const keywordCount = Math.floor(totalWords * keywordDensity / 100);
    
    // Insert keywords naturally into content
    const optimizedWords = [...words];
    let insertedKeywords = 0;
    
    targetKeywords.forEach(keyword => {
      if (insertedKeywords < keywordCount) {
        const keywordWords = keyword.split(' ');
        const randomPosition = Math.floor(Math.random() * (optimizedWords.length - keywordWords.length));
        
        // Insert keyword naturally
        optimizedWords.splice(randomPosition, 0, ...keywordWords);
        insertedKeywords += keywordWords.length;
      }
    });
    
    return optimizedWords.join(' ');
  };

  // Generate semantic keywords related to target keywords
  const generateSemanticKeywords = (primaryKeyword: string) => {
    const semanticMap: Record<string, string[]> = {
      'Tripura news': [
        'Tripura latest news',
        'Tripura news today',
        'Tripura breaking news',
        'Tripura current affairs',
        'Tripura headlines',
        'Tripura updates',
        'Tripura news portal',
        'Tripura news website',
        'Tripura news online',
        'Tripura news in English'
      ],
      'Agartala news': [
        'Agartala latest news',
        'Agartala news today',
        'Agartala breaking news',
        'Agartala current affairs',
        'Agartala headlines',
        'Agartala updates',
        'Agartala news portal',
        'Agartala news website',
        'Agartala news online',
        'Agartala news in English'
      ],
      'Northeast Herald': [
        'Northeast Herald news',
        'Northeast Herald Tripura',
        'Northeast Herald Agartala',
        'Northeast Herald website',
        'Northeast Herald online',
        'Northeast Herald portal',
        'neherald.com',
        'Northeast Herald latest news',
        'Northeast Herald breaking news'
      ]
    };
    
    return semanticMap[primaryKeyword] || [];
  };

  // Generate LSI (Latent Semantic Indexing) keywords
  const generateLSIKeywords = () => [
    'Northeast India',
    'Tripura government',
    'Agartala politics',
    'Tripura CM',
    'Tripura assembly',
    'Agartala updates',
    'Tripura development',
    'Northeast India politics',
    'Tripura current affairs',
    'Agartala current affairs',
    'Tripura latest updates',
    'Agartala latest updates',
    'Northeast India latest news',
    'Tripura news portal',
    'Agartala news portal'
  ];

  return {
    optimizedContent: generateOptimizedContent(),
    semanticKeywords: targetKeywords.flatMap(keyword => generateSemanticKeywords(keyword)),
    lsiKeywords: generateLSIKeywords(),
    keywordSuggestions: [
      ...targetKeywords,
      ...targetKeywords.flatMap(keyword => generateSemanticKeywords(keyword)),
      ...generateLSIKeywords()
    ]
  };
}

// SEO-optimized title generator
export function generateOptimizedTitle(primaryKeyword: string, secondaryKeyword?: string) {
  const titleTemplates = {
    'Tripura news': [
      `${primaryKeyword} | Latest Breaking News Today | Northeast Herald`,
      `${primaryKeyword} | Agartala News | Northeast India Updates`,
      `${primaryKeyword} | Northeast Herald - Tripura's #1 News Source`,
      `Latest ${primaryKeyword} Today | Breaking News | Northeast Herald`,
      `${primaryKeyword} | Current Affairs | Northeast Herald Agartala`
    ],
    'Agartala news': [
      `${primaryKeyword} | Latest Breaking News Today | Northeast Herald`,
      `${primaryKeyword} | Tripura News | Northeast India Updates`,
      `${primaryKeyword} | Northeast Herald - Agartala's #1 News Source`,
      `Latest ${primaryKeyword} Today | Breaking News | Northeast Herald`,
      `${primaryKeyword} | Current Affairs | Northeast Herald Tripura`
    ],
    'Northeast Herald': [
      `${primaryKeyword} | Tripura News | Agartala News | Latest Updates`,
      `${primaryKeyword} | Northeast India's #1 News Portal`,
      `${primaryKeyword} | Latest Breaking News from Tripura & Agartala`,
      `${primaryKeyword} | Tripura News Today | Agartala News Today`,
      `${primaryKeyword} | Northeast India News Portal | neherald.com`
    ]
  };

  const templates = titleTemplates[primaryKeyword as keyof typeof titleTemplates] || titleTemplates['Tripura news'];
  return templates[0]; // Return the first (most optimized) template
}

// SEO-optimized meta description generator
export function generateOptimizedDescription(primaryKeyword: string, location: string = 'Tripura') {
  const descriptionTemplates = {
    'Tripura news': `Get latest ${primaryKeyword}, Agartala news, and Northeast India updates. Northeast Herald is Tripura's #1 news source covering politics, sports, finance, breaking news today.`,
    'Agartala news': `Get latest ${primaryKeyword}, Tripura news, and Northeast India updates. Northeast Herald is Agartala's #1 news source covering politics, sports, finance, breaking news today.`,
    'Northeast Herald': `${primaryKeyword} - Tripura's #1 news portal. Get latest Tripura news, Agartala news, Northeast India updates, breaking news, politics, sports, finance today.`
  };

  return descriptionTemplates[primaryKeyword as keyof typeof descriptionTemplates] || descriptionTemplates['Tripura news'];
}

// Header optimization for target keywords
export function generateOptimizedHeader(primaryKeyword: string, level: 'h1' | 'h2' | 'h3' = 'h1') {
  const headerTemplates = {
    h1: {
      'Tripura news': 'Latest Tripura News Today | Breaking News from Agartala | Northeast Herald',
      'Agartala news': 'Latest Agartala News Today | Breaking News from Tripura | Northeast Herald',
      'Northeast Herald': 'Northeast Herald - Tripura\'s #1 News Source | Latest News Today'
    },
    h2: {
      'Tripura news': 'Tripura News Headlines',
      'Agartala news': 'Agartala News Headlines',
      'Northeast Herald': 'Northeast Herald Latest News'
    },
    h3: {
      'Tripura news': 'Today\'s Tripura News',
      'Agartala news': 'Today\'s Agartala News',
      'Northeast Herald': 'Northeast Herald Updates'
    }
  };

  return headerTemplates[level][primaryKeyword as keyof typeof headerTemplates.h1] || primaryKeyword;
}
