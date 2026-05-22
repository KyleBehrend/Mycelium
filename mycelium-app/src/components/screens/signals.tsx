'use client';

import { useState, useEffect } from 'react';
import { Icon, StreamBadge, Card, Button, ScreenHeader } from '@/components/ui';
import { STREAMS, streamById } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';
import { timeAgo, type NewsItem } from '@/lib/news';

export function Signals({ onToast }: { onToast: (t: string) => void }) {
  const { userStreams } = useAppContext();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<string>('all');
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch news for ALL streams on the full page (not just user's)
    const streamsToFetch = filter === 'all'
      ? userStreams
      : filter === 'yours'
        ? userStreams
        : [filter];

    if (streamsToFetch.length === 0) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/news?streams=${streamsToFetch.join(',')}`)
      .then(r => r.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [filter, userStreams]);

  const filteredItems = filter === 'yours'
    ? items.filter(item => userStreams.includes(item.stream))
    : items;

  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader
        eyebrow="Signals"
        title="What the world is saying"
        subtitle="Live news and research from across the plant food system — filtered by your streams. Updated every 30 minutes from trusted sources."
      />

      <div className="myc-pill-row">
        <button className={`myc-pill ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>All streams</button>
        <button className={`myc-pill ${filter === 'yours' ? 'is-active' : ''}`} onClick={() => setFilter('yours')}>In your streams</button>
        {STREAMS.map(s => (
          <button key={s.id} className={`myc-pill ${filter === s.id ? 'is-active' : ''}`} onClick={() => setFilter(s.id)}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: s.dot, marginRight: 6, transform: 'translateY(-1px)' }} />
            {s.short}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="myc-skel" style={{ height: 120, borderRadius: 14 }} />
          ))}
        </div>
      )}

      {!loading && error && (
        <Card padding="lg" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(212, 163, 115, 0.12)', color: 'var(--myc-warm-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Icon name="sparkles" size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: '0 0 6px' }}>Signals unavailable</h3>
          <p style={{ fontSize: 13.5, color: 'var(--myc-text-2)', margin: 0, maxWidth: 360, marginInline: 'auto', lineHeight: 1.5 }}>
            Could not fetch news right now. Try refreshing in a few minutes.
          </p>
        </Card>
      )}

      {!loading && !error && filteredItems.length === 0 && (
        <Card padding="lg" style={{ textAlign: 'center', padding: '48px 32px' }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(64, 145, 108, 0.12)', color: 'var(--myc-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
            <Icon name="search" size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: '0 0 6px' }}>No signals for this filter</h3>
          <p style={{ fontSize: 13.5, color: 'var(--myc-text-2)', margin: 0, maxWidth: 360, marginInline: 'auto', lineHeight: 1.5 }}>
            Try selecting a different stream or broadening your filter.
          </p>
        </Card>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {filteredItems.map((item, i) => {
            const isSaved = saved[item.id];
            return (
              <Card key={item.id} padding="md">
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${streamById(item.stream).color}, ${streamById(item.stream).color}cc)`,
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon name="sparkles" size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontSize: 12, color: 'var(--myc-text-2)', fontWeight: 500 }}>{item.source}</span>
                          <span style={{ fontSize: 11, color: 'var(--myc-text-3)' }}>{item.publishedAt ? timeAgo(item.publishedAt) : 'recently'}</span>
                        </div>
                        <a href={item.url} target="_blank" rel="noopener noreferrer"
                          style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--myc-text)', textDecoration: 'none', lineHeight: 1.3, display: 'block', marginBottom: 6 }}>
                          {item.title}
                        </a>
                      </div>
                    </div>
                    {item.snippet && !item.snippet.startsWith('http') && !item.snippet.includes('href=') && (
                      <p style={{ fontSize: 13.5, color: 'var(--myc-text-2)', lineHeight: 1.5, margin: '0 0 12px', textWrap: 'pretty' }}>
                        {item.snippet}
                      </p>
                    )}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <StreamBadge stream={item.stream} />
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                        <Button variant={isSaved ? 'secondary' : 'ghost'} size="sm" icon={isSaved ? 'check' : 'bookmark'}
                          onClick={() => { setSaved(s => ({ ...s, [item.id]: true })); onToast('Saved to your bookmarks.'); }}>
                          {isSaved ? 'Saved' : 'Save'}
                        </Button>
                        <Button variant="ghost" size="sm" icon="send"
                          onClick={() => onToast('Shared with your network.')}>
                          Share
                        </Button>
                        <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                          <Button variant="ghost" size="sm" icon="external">Source</Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!loading && !error && filteredItems.length > 0 && (
        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--myc-text-3)', fontSize: 13 }}>
          <Icon name="sparkles" size={14} style={{ verticalAlign: -2, marginRight: 6 }} />
          Signals refresh every 30 minutes · Sourced from Google News
        </div>
      )}
    </div>
  );
}
