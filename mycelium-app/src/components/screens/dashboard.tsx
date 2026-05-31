'use client';

import { useMemo, useState } from 'react';
import { Icon, StreamBadge, StreamIcon, Card, Button, NetworkGraph } from '@/components/ui';
import { CURRENT_USER, CAMPAIGNS, LEARNINGS, LEARNING_FEED, SOCIAL_POSTS, UPCOMING_TASKS, ORGS, PEOPLE, KNOWLEDGE_DOCS, STREAMS, orgById, personById, streamById, streamActivityCount, matchesStreams, matchesStream } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';
import { SignalsWidget } from '@/components/news-feed';

export function Dashboard({ onNav, onToast }: { onNav: (s: string) => void; onToast: (t: string) => void }) {
  const me = CURRENT_USER;
  const { activeStreams, toggleStreamFilter, clearStreamFilter } = useAppContext();
  const [checkedTasks, setCheckedTasks] = useState<Record<number, boolean>>({});
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const firstName = me.name.split(' ')[0];
  const summitDays = Math.max(0, Math.ceil((new Date('2026-11-21').getTime() - Date.now()) / 86400000));
  // One stream selected → focused stream hero. Zero or many → the hub greeting.
  const single = activeStreams.length === 1 ? streamById(activeStreams[0]) : null;

  const feedItems = useMemo(() => {
    const items: { kind: string; id: string; when: string; data: any }[] = [];
    CAMPAIGNS.filter(c => matchesStreams(c.streams, activeStreams)).slice(0, single ? 4 : 3).forEach(c => {
      items.push({ kind: 'campaign', id: c.id, when: 'Live now', data: c });
    });
    LEARNINGS.filter(l => matchesStreams(l.streams, activeStreams)).slice(0, 2).forEach(l => {
      items.push({ kind: 'learning', id: l.id, when: l.when, data: l });
    });
    LEARNING_FEED.filter(lf => matchesStream(lf.stream, activeStreams)).slice(0, 1).forEach(lf => {
      items.push({ kind: 'news', id: lf.id, when: lf.when, data: lf });
    });
    SOCIAL_POSTS.filter(p => matchesStreams(p.streams, activeStreams)).slice(0, 2).forEach(p => {
      items.push({ kind: 'social', id: p.id, when: p.when, data: p });
    });
    return items;
  }, [activeStreams, single]);

  const peopleInStream = single ? PEOPLE.filter(p => p.streams.includes(single.id)).length : 0;
  const feedHeading = single ? `In ${single.label}` : activeStreams.length > 1 ? 'Across your streams' : 'For you, today';

  return (
    <div className="myc-main-inner">
      {/* HERO — shows where you are */}
      {single ? (
        <section className="myc-hero" style={{ ['--ac' as string]: single.color } as React.CSSProperties}>
          <div className="myc-hero-wash" />
          <StreamIcon stream={single.id} size={150} />
          <div className="myc-hero-tx">
            <span className="myc-hero-ey"><span className="pip" />Stream · {single.label}</span>
            <h1 className="myc-hero-h">{single.label}</h1>
            <p className="myc-hero-sub">{single.tagline}</p>
            <div className="myc-hero-stats">
              <div className="myc-hero-stat"><b>{streamActivityCount(single.id)}</b><span>Active items</span></div>
              <div className="myc-hero-stat"><b>{feedItems.length}</b><span>In your feed today</span></div>
              <div className="myc-hero-stat"><b>{peopleInStream}</b><span>Members here</span></div>
            </div>
          </div>
        </section>
      ) : (
        <section className="myc-hero" style={{ ['--ac' as string]: 'var(--myc-primary)' } as React.CSSProperties}>
          <div className="myc-hero-wash" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="myc-clay-ic myc-hero-ic is-logo" src="/logo.png" alt="" />
          <div className="myc-hero-tx">
            <span className="myc-hero-ey"><span className="pip" />Your hub · Berlin Summit in {summitDays} days</span>
            <h1 className="myc-hero-h">{greet}, {firstName}.</h1>
            <p className="myc-hero-sub">
              {activeStreams.length > 1
                ? <>Focused on <b style={{ color: 'var(--myc-text)' }}>{activeStreams.length} of your streams</b>. 25 organisations across 12 countries backed the Plant-Rich Europe call this week. Pick a single stream to zoom in, or browse all 14 below.</>
                : <>Showing <b style={{ color: 'var(--myc-text)' }}>all 14 streams</b>. 25 organisations across 12 countries backed the Plant-Rich Europe call this week. Pick the streams you want to focus your hub.</>}
            </p>
            <div className="myc-hero-stats">
              <div className="myc-hero-stat"><b>{CAMPAIGNS.length}</b><span>Live campaigns</span></div>
              <div className="myc-hero-stat"><b>142</b><span>Members · {ORGS.length} orgs</span></div>
              <div className="myc-hero-stat"><b>{KNOWLEDGE_DOCS.length}</b><span>Resources</span></div>
            </div>
          </div>
        </section>
      )}

      {/* BROWSE ALL 14 STREAMS — the shop aisles (multi-select) */}
      <div className="myc-rail-h">
        <h2>Browse all 14 streams</h2>
        <span style={{ fontSize: 12.5, color: 'var(--myc-text-3)' }}>
          {activeStreams.length === 0
            ? 'Showing all'
            : <>Focused on {activeStreams.length} · <button className="myc-all-link" onClick={clearStreamFilter} style={{ background: 'transparent', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12.5 }}>Show all →</button></>}
        </span>
      </div>
      <div className="myc-rail" id="myc-browse-rail">
        {STREAMS.map(s => {
          const on = activeStreams.includes(s.id);
          return (
            <div key={s.id}
              className={`myc-tile ${on ? 'is-active' : ''}`}
              style={{ ['--ac' as string]: s.color } as React.CSSProperties}
              onClick={() => toggleStreamFilter(s.id)}>
              <StreamIcon stream={s.id} size={74} />
              <div className="myc-tile-nm">{s.label}</div>
              <div className="myc-tile-ct">{streamActivityCount(s.id)} active</div>
            </div>
          );
        })}
      </div>

      {/* FEED + WIDGETS */}
      <div className="myc-grid-2" style={{ marginTop: 38 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>{feedHeading}</h2>
          </div>
          <div className="myc-grid-feed">
            {feedItems.length === 0
              ? <div className="myc-empty">Nothing in this stream yet — try another aisle.</div>
              : feedItems.map((item, i) => <FeedCard key={i} item={item} onNav={onNav} onToast={onToast} />)}
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

          <Card padding="md" style={{ background: 'color-mix(in srgb, var(--myc-warm) 12%, var(--myc-surface))', borderColor: 'color-mix(in srgb, var(--myc-warm) 30%, var(--myc-border))' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--myc-warm)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}>
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

// Accent for a feed card — prefer a stream the user is currently focused on, so
// "my stream" pops even when it's a secondary tag; otherwise the item's first.
function pickAccentStream(streams: string[], active: string[]): string {
  const hit = streams.find(s => active.includes(s));
  return hit || streams[0];
}

function FeedCard({ item, onNav, onToast }: { item: { kind: string; data: any; when: string }; onNav: (s: string) => void; onToast: (t: string) => void }) {
  const { kind, data, when } = item;
  const { activeStreams } = useAppContext();

  if (kind === 'campaign') {
    const org = orgById(data.org);
    const accent = pickAccentStream(data.streams, activeStreams);
    return (
      <div className="myc-feed-item" onClick={() => onNav('calendar')} style={{ cursor: 'pointer' }}>
        <StreamIcon stream={accent} size={54} />
        <div className="myc-feed-body">
          <div className="myc-feed-meta">
            <span>Campaign · {org.name} · {when}</span>
            {data.featured && <span style={{ fontFamily: 'var(--font-mono)', background: 'color-mix(in srgb, var(--myc-warm) 22%, white)', color: '#8C5B26', padding: '1px 6px', borderRadius: 4, fontSize: 9.5, fontWeight: 500, letterSpacing: 0.3 }}>FEATURED</span>}
          </div>
          <div className="myc-feed-title">{data.title}</div>
          <div className="myc-feed-snippet">{data.cta}</div>
          <div className="myc-feed-actions">
            <Button variant="secondary" size="sm" icon="check" onClick={(e) => { e.stopPropagation(); onToast('Marked as supported. The campaign team will see this.'); }}>I supported this</Button>
            <Button variant="ghost" size="sm" icon="bookmark" onClick={(e) => { e.stopPropagation(); onToast('Saved to your bookmarks.'); }}>Save</Button>
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-3)' }}>{data.supporters} supporting</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'learning') {
    const author = personById(data.author);
    const accent = pickAccentStream(data.streams, activeStreams);
    return (
      <div className="myc-feed-item" onClick={() => onNav('community')} style={{ cursor: 'pointer' }}>
        <StreamIcon stream={accent} size={54} />
        <div className="myc-feed-body">
          <div className="myc-feed-meta"><span>Learning · {author.name} · {orgById(author.org).name} · {when}</span></div>
          <div className="myc-feed-title">{data.title}</div>
          <div className="myc-feed-snippet" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{data.content}</div>
          <div className="myc-feed-actions">
            {[...data.streams].sort((a: string, b: string) => (activeStreams.includes(a) ? -1 : activeStreams.includes(b) ? 1 : 0)).map((s: string) => <StreamBadge key={s} stream={s} />)}
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-3)' }}>{data.reactions.helpful} found this helpful</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === 'news') {
    return (
      <div className="myc-feed-item" onClick={() => onNav('signals')} style={{ cursor: 'pointer' }}>
        <StreamIcon stream={data.stream} size={54} />
        <div className="myc-feed-body">
          <div className="myc-feed-meta">
            <span style={{ color: 'var(--myc-accent)', fontWeight: 600 }}>Signal</span><span>·</span><span>{data.source} · {when}</span>
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
    const accent = pickAccentStream(data.streams, activeStreams);
    return (
      <div className="myc-feed-item" onClick={() => onNav('community')} style={{ cursor: 'pointer' }}>
        <StreamIcon stream={accent} size={54} />
        <div className="myc-feed-body">
          <div className="myc-feed-meta"><span>Amplify · {author.name} · {when}</span></div>
          <div className="myc-feed-title">{data.description}</div>
          <div className="myc-feed-snippet"><strong>Ask:</strong> {data.request}</div>
          <div className="myc-feed-actions">
            <Button variant="primary" size="sm" icon="heart" onClick={(e) => { e.stopPropagation(); onToast(`Marked as engaged. ${data.engagements + 1} members have now supported.`); }}>I engaged</Button>
            <Button variant="ghost" size="sm" icon="external">Open post</Button>
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-3)' }}>{data.engagements} supporting</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
