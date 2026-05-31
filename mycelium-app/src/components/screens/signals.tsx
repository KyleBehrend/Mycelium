'use client';

import { useState, useEffect } from 'react';
import { Icon, StreamBadge, StreamIcon, StreamFilterBar, Button, ScreenHeader } from '@/components/ui';
import { streamById } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';
import { timeAgo, type NewsItem } from '@/lib/news';

export function Signals({ onToast }: { onToast: (t: string) => void }) {
  const { userStreams, activeStreams, toggleStreamFilter, clearStreamFilter } = useAppContext();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  // Fetch the selected streams; with no selection ("all streams") fall back to
  // the member's followed streams so the page always has relevant news.
  const fetchKey = (activeStreams.length ? activeStreams : userStreams).join(',');

  useEffect(() => {
    if (!fetchKey) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(false);
    fetch(`/api/news?streams=${fetchKey}`)
      .then(r => r.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [fetchKey]);

  const single = activeStreams.length === 1 ? streamById(activeStreams[0]) : null;

  return (
    <div className="myc-main-inner" style={{ paddingTop: 6 }}>
      <ScreenHeader
        eyebrow="Signals"
        title="What's shifting in the data"
        subtitle={`Live news and research from across the plant food system — framing wins, benchmarks and behaviour change${single ? ` in ${single.label}` : activeStreams.length > 1 ? ` across ${activeStreams.length} streams` : ', filtered by your streams'}. Updated every 30 minutes.`}
      />

      <StreamFilterBar active={activeStreams} onToggle={toggleStreamFilter} onClear={clearStreamFilter} />

      {loading && (
        <div className="myc-sig-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="myc-skel" style={{ height: 80, borderRadius: 15 }} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="myc-empty">Could not fetch signals right now. Try refreshing in a few minutes.</div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="myc-empty">Nothing in this stream yet — try another aisle.</div>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="myc-sig-list">
          {items.map(item => {
            const s = streamById(item.stream);
            const isSaved = saved[item.id];
            return (
              <div key={item.id} className="myc-sig" style={{ ['--ac' as string]: s.color, alignItems: 'flex-start' } as React.CSSProperties}>
                <StreamIcon stream={item.stream} size={50} className="myc-sig-ic" />
                <div className="myc-sig-bd">
                  <div style={{ display: 'flex', gap: 9, alignItems: 'center', marginBottom: 5, fontSize: 12, color: 'var(--myc-text-3)', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 500, color: 'var(--myc-text-2)' }}>{item.source}</span>
                    <span>{item.publishedAt ? timeAgo(item.publishedAt) : 'recently'}</span>
                  </div>
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="myc-sig-ti"
                    style={{ display: 'block', color: 'var(--myc-text)', textDecoration: 'none' }}>
                    {item.title}
                  </a>
                  {item.snippet && !item.snippet.startsWith('http') && !item.snippet.includes('href=') && (
                    <p style={{ fontSize: 13, color: 'var(--myc-text-2)', lineHeight: 1.5, margin: '0 0 10px', textWrap: 'pretty' }}>
                      {item.snippet}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <StreamBadge stream={item.stream} />
                    <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                      <Button variant={isSaved ? 'secondary' : 'ghost'} size="sm" icon={isSaved ? 'check' : 'bookmark'}
                        onClick={() => { setSaved(sv => ({ ...sv, [item.id]: true })); onToast('Saved to your bookmarks.'); }}>
                        {isSaved ? 'Saved' : 'Save'}
                      </Button>
                      <Button variant="ghost" size="sm" icon="send" onClick={() => onToast('Shared with your network.')}>Share</Button>
                      <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <Button variant="ghost" size="sm" icon="external">Source</Button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && items.length > 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--myc-text-3)', fontSize: 13 }}>
          <Icon name="sparkles" size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
          Signals refresh every 30 minutes · Sourced from Google News
        </div>
      )}
    </div>
  );
}
