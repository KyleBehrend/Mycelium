import { NextRequest, NextResponse } from 'next/server';
import { STREAM_SEARCH_TERMS, parseGoogleNewsRSS, type NewsItem } from '@/lib/news';

export async function GET(request: NextRequest) {
  const streams = request.nextUrl.searchParams.get('streams')?.split(',') || [];

  if (streams.length === 0) {
    return NextResponse.json({ items: [] });
  }

  const allItems: NewsItem[] = [];

  // Fetch news for each stream (limit to first 3 streams to avoid rate limiting)
  const streamsToFetch = streams.slice(0, 4);

  await Promise.all(
    streamsToFetch.map(async (stream) => {
      const terms = STREAM_SEARCH_TERMS[stream];
      if (!terms || terms.length === 0) return;

      // Use the first search term for this stream
      const query = encodeURIComponent(terms[0]);
      const url = `https://news.google.com/rss/search?q=${query}&hl=en&gl=US&ceid=US:en`;

      try {
        const res = await fetch(url, {
          next: { revalidate: 1800 }, // Cache for 30 minutes
          headers: { 'User-Agent': 'Mycelium/1.0' },
        });
        if (res.ok) {
          const xml = await res.text();
          const items = parseGoogleNewsRSS(xml, stream);
          allItems.push(...items);
        }
      } catch (e) {
        // Silently fail for individual stream fetches
        console.error(`Failed to fetch news for stream ${stream}:`, e);
      }
    })
  );

  // Sort by date, newest first
  allItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return NextResponse.json({ items: allItems.slice(0, 15) });
}
