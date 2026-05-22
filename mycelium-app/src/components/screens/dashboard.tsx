'use client';

import { useMemo, useState } from 'react';
import { Icon, StreamBadge, Avatar, Card, Button, MyceliumMark, MyceliumPattern, NetworkGraph } from '@/components/ui';
import { CURRENT_USER, CAMPAIGNS, LEARNINGS, LEARNING_FEED, SOCIAL_POSTS, UPCOMING_TASKS, orgById, personById, streamById } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';
import { SignalsWidget } from '@/components/news-feed';

export function Dashboard({ onNav, onToast }: { onNav: (s: string) => void; onToast: (t: string) => void }) {
  const me = CURRENT_USER;
  const { userStreams, activeStreamFilter } = useAppContext();
  const [feedFilter, setFeedFilter] = useState<'all' | 'yours'>('all');
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = me.name.split(' ')[0];

  const feedItems = useMemo(() => {
    const items: { kind: string; id: string; when: string; data: any }[] = [];
    const streamSet = activeStreamFilter ? [activeStreamFilter] : (feedFilter === 'yours' ? userStreams : null);
    const matchesStream = (itemStreams: string[]) => !streamSet || itemStreams.some(s => streamSet.includes(s));
    const matchesSingleStream = (stream: string) => !streamSet || streamSet.includes(stream);

    CAMPAIGNS.filter(c => matchesStream(c.streams)).slice(0, 2).forEach(c => {
      items.push({ kind: 'campaign', id: c.id, when: 'Live now', data: c });
    });
    LEARNINGS.filter(l => matchesStream(l.streams)).slice(0, 2).forEach(l => {
      items.push({ kind: 'learning', id: l.id, when: l.when, data: l });
    });
    LEARNING_FEED.filter(lf => matchesSingleStream(lf.stream)).slice(0, 1).forEach(lf => {
      items.push({ kind: 'news', id: lf.id, when: lf.when, data: lf });
    });
    SOCIAL_POSTS.filter(p => matchesStream(p.streams)).slice(0, 2).forEach(p => {
      items.push({ kind: 'social', id: p.id, when: p.when, data: p });
    });
    return items;
  }, [userStreams, activeStreamFilter, feedFilter]);

  return (
    <div className="myc-main-inner">
      {/* HERO */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(120deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)',
        color: '#fff', borderRadius: 16, padding: '32px 36px', overflow: 'hidden', marginBottom: 28,
      }}>
        <MyceliumPattern density={1.5} opacity={0.14} color="#74C69D" />
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 24, alignItems: 'flex-end' }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.7, marginBottom: 8, fontWeight: 500 }}>
              {new Date().toLocaleDateString('en', { weekday: 'long' })} · {new Date().toLocaleDateString('en', { month: 'long', day: 'numeric' })}
            </div>
            <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, letterSpacing: -0.6, lineHeight: 1.15 }}>
              {greet}, {firstName}.<br />
              <span style={{ opacity: 0.7 }}>The EFSA consultation closes in 54 days.</span>
            </h1>
            <p style={{ margin: '14px 0 0', opacity: 0.85, fontSize: 14.5, maxWidth: 540, lineHeight: 1.55 }}>
              <strong style={{ color: '#fff' }}>47 organizations</strong> have submitted responses so far. ProVeg has shared a 9-doc toolkit in the Hub.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <Button variant="warm" icon="external" onClick={() => onNav('calendar')}>Open EFSA brief</Button>
              <Button variant="ghost" onClick={() => onNav('knowledge')} style={{ color: '#fff' }}>Ask the assistant</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { num: '7', label: 'Active campaigns in your streams', tint: '#2D6A4F' },
          { num: '142', label: 'Members across 12 orgs', tint: '#40916C' },
          { num: '23', label: 'New resources this week', tint: '#74C69D' },
          { num: '54d', label: 'Until EU dietary consultation', tint: '#D4A373' },
        ].map((s, i) => (
          <Card key={i} padding="md" accent={s.tint}>
            <div className="myc-stat"><span className="myc-stat-num">{s.num}</span></div>
            <div className="myc-stat-label" style={{ marginTop: 6 }}>{s.label}</div>
          </Card>
        ))}
      </div>

      <div className="myc-grid-2">
        {/* Feed */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: -0.2 }}>For you, today</h2>
            <div className="myc-pill-row" style={{ marginBottom: 0 }}>
              <button className={`myc-pill ${feedFilter === 'all' && !activeStreamFilter ? 'is-active' : ''}`} onClick={() => setFeedFilter('all')}>All streams</button>
              <button className={`myc-pill ${feedFilter === 'yours' || activeStreamFilter ? 'is-active' : ''}`} onClick={() => setFeedFilter('yours')}>In your streams</button>
            </div>
          </div>
          <div className="myc-grid-feed">
            {feedItems.map((item, i) => (
              <FeedCard key={i} item={item} onNav={onNav} onToast={onToast} />
            ))}
          </div>
        </div>

        {/* Sidebar widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card padding="md">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 600 }}>Your follow-throughs</h3>
              <span style={{ fontSize: 11.5, color: 'var(--myc-text-2)' }}>{UPCOMING_TASKS.length - Object.values(checkedTasks).filter(Boolean).length} open</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {UPCOMING_TASKS.map((t, i) => {
                const done = !!checkedTasks[i];
                return (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i === UPCOMING_TASKS.length - 1 ? 'none' : '1px solid var(--myc-border-soft)', cursor: 'pointer', opacity: done ? 0.45 : 1, transition: 'opacity 0.2s' }}>
                    <input type="checkbox" checked={done} onChange={() => setCheckedTasks(prev => ({ ...prev, [i]: !prev[i] }))} style={{ accentColor: 'var(--myc-primary)', width: 14, height: 14 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, textDecoration: done ? 'line-through' : 'none' }}>{t.label}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', marginTop: 2, textDecoration: done ? 'line-through' : 'none' }}>{t.due}</div>
                    </div>
                    <StreamBadge stream={t.stream} />
                  </label>
                );
              })}
            </div>
          </Card>

          <Card padding="md" style={{ overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 600 }}>The network</h3>
              <button className="myc-link" onClick={() => onNav('directory')} style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer', fontSize: 12 }}>Explore →</button>
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', marginBottom: 8 }}>You&apos;re connected to 11 orgs through your streams.</div>
            <div style={{ height: 220, margin: '0 -8px -10px' }}>
              <NetworkGraph width={400} height={260} highlight={me.org} />
            </div>
          </Card>

          <SignalsWidget onNav={onNav} />

          <Card padding="md" style={{ background: 'linear-gradient(135deg, #F6F4EF, #FAFAF8)', borderColor: '#E8E0CF' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#D4A373', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
                <Icon name="pin" size={16} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Track Lead pinned</div>
                <div style={{ fontSize: 12.5, color: 'var(--myc-text-2)', lineHeight: 1.5 }}>
                  Elena Marchetti has pinned the EU Protein Strategy position paper template. <span className="myc-link" onClick={() => onNav('knowledge')} role="button" tabIndex={0} style={{ cursor: 'pointer' }}>Open it →</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FeedCard({ item, onNav, onToast }: { item: { kind: string; data: any; when: string }; onNav: (s: string) => void; onToast: (t: string) => void }) {
  const { kind, data, when } = item;

  if (kind === 'campaign') {
    const org = orgById(data.org);
    return (
      <div className="myc-feed-item" onClick={() => onNav('calendar')} style={{ cursor: 'pointer' }}>
        <div className="myc-feed-icon" style={{ background: streamById(data.streams[0]).color }}><Icon name="megaphone" size={18} /></div>
        <div className="myc-feed-body">
          <div className="myc-feed-meta">
            <span>Campaign · {org.name}</span><span>·</span><span>{when}</span>
            {data.featured && <span style={{ background: 'rgba(212, 163, 115, 0.18)', color: '#8C5B26', padding: '1px 6px', borderRadius: 4, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.3 }}>FEATURED</span>}
          </div>
          <div className="myc-feed-title">{data.title}</div>
          <div className="myc-feed-snippet">{data.cta}</div>
          <div className="myc-feed-actions">
            <Button variant="secondary" size="sm" icon="check" onClick={(e) => { e.stopPropagation(); onToast('Marked as supported. The campaign team will see this.'); }}>I supported this</Button>
            <Button variant="ghost" size="sm" icon="bookmark" onClick={(e) => { e.stopPropagation(); onToast('Saved to your bookmarks.'); }}>Save</Button>
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-2)' }}>{data.supporters} members supporting</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'learning') {
    const author = personById(data.author);
    return (
      <div className="myc-feed-item" onClick={() => onNav('community')} style={{ cursor: 'pointer' }}>
        <Avatar person={author} size={36} />
        <div className="myc-feed-body">
          <div className="myc-feed-meta"><span>{author.name} · {orgById(author.org).name}</span><span>·</span><span>{when}</span></div>
          <div className="myc-feed-title">{data.title}</div>
          <div className="myc-feed-snippet" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.content}</div>
          <div className="myc-feed-actions">
            {data.streams.map((s: string) => <StreamBadge key={s} stream={s} />)}
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-2)' }}>{data.reactions.helpful} found this helpful · {data.comments} comments</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'news') {
    return (
      <div className="myc-feed-item" onClick={() => onNav('knowledge')} style={{ cursor: 'pointer' }}>
        <div className="myc-feed-icon" style={{ background: 'linear-gradient(135deg, #5E548E, #9F86C0)' }}><Icon name="sparkles" size={18} /></div>
        <div className="myc-feed-body">
          <div className="myc-feed-meta">
            <span style={{ color: 'var(--myc-primary)', fontWeight: 600 }}>AI-summarized news</span><span>·</span><span>{data.source} · {when}</span>
          </div>
          <div className="myc-feed-title">{data.title}</div>
          <div className="myc-feed-snippet">{data.summary}</div>
          <div className="myc-feed-actions">
            <StreamBadge stream={data.stream} />
            <Button variant="ghost" size="sm" icon="external">Source</Button>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'social') {
    const author = personById(data.user);
    return (
      <div className="myc-feed-item" onClick={() => onNav('community')} style={{ cursor: 'pointer' }}>
        <div className="myc-feed-icon" style={{ background: data.platform === 'linkedin' ? '#0a66c2' : data.platform === 'twitter' ? '#000' : '#E1306C' }}>
          <Icon name={data.platform === 'twitter' ? 'twitter' : data.platform === 'instagram' ? 'instagram' : 'linkedin'} size={18} />
        </div>
        <div className="myc-feed-body">
          <div className="myc-feed-meta"><span>Engagement request from {author.name}</span><span>·</span><span>{when}</span></div>
          <div className="myc-feed-title">{data.description}</div>
          <div className="myc-feed-snippet"><strong>Ask:</strong> {data.request}</div>
          <div className="myc-feed-actions">
            <Button variant="primary" size="sm" icon="heart" onClick={(e) => { e.stopPropagation(); onToast(`Marked as engaged. ${data.engagements + 1} members have now supported.`); }}>I engaged</Button>
            <Button variant="ghost" size="sm" icon="external">Open post</Button>
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-2)' }}>{data.engagements} supporting</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
