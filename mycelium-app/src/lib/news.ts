// Stream topic mappings for Google News RSS
export const STREAM_SEARCH_TERMS: Record<string, string[]> = {
  'public-health': ['plant-based diet health', 'dietary guidelines plant-based', 'nutrition plant-forward'],
  'research': ['plant-based food research', 'alternative protein study', 'food systems science'],
  'policy': ['food policy plant-based', 'EU food regulation', 'plant protein policy'],
  'corporate': ['corporate plant-based', 'food industry sustainability', 'plant-based market growth'],
  'culinary': ['plant-based culinary training', 'chef plant-forward cuisine', 'culinary schools plant-based'],
  'farm': ['crop diversification farming', 'plant protein farming', 'regenerative agriculture transition'],
  'retail': ['plant-based retail', 'supermarket plant-based products', 'grocery plant protein'],
  'consumer': ['plant-based consumer trends', 'vegan market growth', 'plant-based food demand'],
  'public-food': ['plant-based school meals', 'hospital food plant-based', 'public procurement plant-based'],
  'universities': ['university plant-based food', 'campus sustainability food', 'student food movement'],
  'media': ['plant-based documentary', 'food system media', 'animal agriculture film'],
  'capacity': ['nonprofit capacity building', 'advocacy organization strategy', 'movement building food'],
  'careers': ['plant-based food careers', 'food system jobs', 'sustainability food careers'],
  'law': ['animal agriculture litigation', 'food labeling law', 'plant-based food regulation legal'],
};

export type NewsItem = {
  id: string;
  title: string;
  source: string;
  url: string;
  publishedAt: string;
  stream: string;
  snippet: string;
};

// Parse Google News RSS XML into NewsItem[]
export function parseGoogleNewsRSS(xml: string, stream: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  let idx = 0;
  while ((match = itemRegex.exec(xml)) !== null && idx < 5) {
    const block = match[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').trim() || '';
    const link = block.match(/<link>([\s\S]*?)<\/link>/)?.[1]?.trim() || '';
    const pubDate = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || '';
    const source = block.match(/<source[^>]*>([\s\S]*?)<\/source>/)?.[1]?.trim() || 'Google News';
    const description = block.match(/<description>([\s\S]*?)<\/description>/)?.[1]
      ?.replace(/<!\[CDATA\[|\]\]>/g, '')
      ?.replace(/<[^>]+>/g, '')
      ?.trim()
      ?.substring(0, 200) || '';

    if (title && !title.includes('Google News')) {
      items.push({
        id: `news-${stream}-${idx}`,
        title,
        source,
        url: link,
        publishedAt: pubDate,
        stream,
        snippet: description,
      });
      idx++;
    }
  }
  return items;
}

// Format relative time
export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en', { month: 'short', day: 'numeric' });
}
