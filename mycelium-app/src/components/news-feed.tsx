'use client';

import { useState, useEffect } from 'react';
import { Icon, StreamBadge, Card, Button } from '@/components/ui';
import { useAppContext } from '@/components/app-shell';
import { timeAgo, type NewsItem } from '@/lib/news';

export function SignalsWidget({ onNav }: { onNav?: (s: string) => void }) {
  const { userStreams } = useAppContext();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userStreams.length === 0) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch(`/api/news?streams=${userStreams.join(',')}`)
      .then(r => r.json())
      .then(data => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [userStreams]);

  return (
    <Card padding="md">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 600 }}>
          <Icon name="sparkles" size={14} style={{ color: 'var(--myc-accent)', marginRight: 6, verticalAlign: -2 }} />
          Signals
        </h3>
        <span style={{ fontSize: 11, color: 'var(--myc-text-3)' }}>Live from your streams</span>
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ display: 'flex', gap: 10 }}>
              <div className="myc-skel" style={{ width: '100%', height: 44 }} />
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div style={{ fontSize: 12.5, color: 'var(--myc-text-3)', textAlign: 'center', padding: '12px 0' }}>
          Could not load signals. Check back later.
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div style={{ fontSize: 12.5, color: 'var(--myc-text-3)', textAlign: 'center', padding: '12px 0' }}>
          No signals yet for your streams.
        </div>
      )}

      {!loading && !error && items.slice(0, 5).map((item, i) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', gap: 10, padding: '10px 0',
            borderBottom: i === Math.min(items.length, 5) - 1 ? 'none' : '1px solid var(--myc-border-soft)',
            textDecoration: 'none', color: 'inherit', cursor: 'pointer',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--myc-text)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {item.title}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 4 }}>
              <span style={{ fontSize: 11, color: 'var(--myc-text-3)' }}>{item.source}</span>
              <span style={{ fontSize: 11, color: 'var(--myc-text-3)' }}>·</span>
              <span style={{ fontSize: 11, color: 'var(--myc-text-3)' }}>{item.publishedAt ? timeAgo(item.publishedAt) : 'recently'}</span>
              <StreamBadge stream={item.stream} />
            </div>
          </div>
          <Icon name="external" size={12} style={{ color: 'var(--myc-text-3)', flexShrink: 0, marginTop: 2 }} />
        </a>
      ))}

      {!loading && !error && items.length > 0 && (
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <button onClick={() => onNav?.('signals')} style={{ fontSize: 12, color: 'var(--myc-accent)', fontWeight: 500, cursor: 'pointer', background: 'transparent', border: 0, fontFamily: 'inherit' }}>
            View all signals →
          </button>
        </div>
      )}
    </Card>
  );
}

export function NewsFeedCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="myc-feed-item"
      style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}
    >
      <div className="myc-feed-icon" style={{ background: 'linear-gradient(135deg, #2D6A4F, #74C69D)' }}>
        <Icon name="sparkles" size={18} />
      </div>
      <div className="myc-feed-body">
        <div className="myc-feed-meta">
          <span style={{ color: 'var(--myc-accent)', fontWeight: 600 }}>Signal</span>
          <span>·</span>
          <span>{item.source} · {item.publishedAt ? timeAgo(item.publishedAt) : 'recently'}</span>
        </div>
        <div className="myc-feed-title">{item.title}</div>
        {item.snippet && <div className="myc-feed-snippet">{item.snippet}</div>}
        <div className="myc-feed-actions">
          <StreamBadge stream={item.stream} />
          <Button variant="ghost" size="sm" icon="external">Source</Button>
        </div>
      </div>
    </a>
  );
}
