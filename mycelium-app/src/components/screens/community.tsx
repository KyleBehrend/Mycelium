'use client';

import { useState } from 'react';
import { Icon, StreamBadge, StreamFilterBar, Avatar, Card, Button, ScreenHeader } from '@/components/ui';
import { CURRENT_USER, SOCIAL_POSTS, LEARNINGS, orgById, personById, matchesStreams } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';

export function Community({ onToast }: { onToast: (t: string) => void }) {
  const { activeStreams, toggleStreamFilter, clearStreamFilter } = useAppContext();
  const [tab, setTab] = useState('social');
  return (
    <div className="myc-main-inner" style={{ paddingTop: 6 }}>
      <ScreenHeader eyebrow="Community" title="Compare notes, share what worked"
        subtitle="Where organisers amplify each other's campaigns, share wins and lessons, and ask the network for help. The flywheel of the movement runs on this page."
        actions={<Button variant="primary" icon="plus" onClick={() => {
          const el = document.getElementById('submit-post-form');
          if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => { const input = el.querySelector('input'); input?.focus(); }, 400); }
        }}>New post</Button>} />
      <div className="myc-composer">
        <div className="myc-post-av" style={{ background: CURRENT_USER.tint }}>{CURRENT_USER.name.split(' ').map(w => w[0]).slice(0, 2).join('')}</div>
        <input placeholder="Share an update or ask the network something…" onFocus={() => onToast('Composer opens with the full editor (demo).')} />
        <Button variant="primary" icon="send">Post</Button>
      </div>
      <StreamFilterBar active={activeStreams} onToggle={toggleStreamFilter} onClear={clearStreamFilter} />
      <div className="myc-tabs">
        <button className={`myc-tab ${tab === 'social' ? 'is-active' : ''}`} onClick={() => setTab('social')}>Social Engagement</button>
        <button className={`myc-tab ${tab === 'learnings' ? 'is-active' : ''}`} onClick={() => setTab('learnings')}>Learnings Board</button>
      </div>
      {tab === 'social' ? <SocialHubPanel onToast={onToast} activeStreams={activeStreams} /> : <LearningsBoardPanel onToast={onToast} activeStreams={activeStreams} />}
    </div>
  );
}

function SocialHubPanel({ onToast, activeStreams }: { onToast: (t: string) => void; activeStreams: string[] }) {
  const [engaged, setEngaged] = useState<Record<string, boolean>>({});
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const filteredPosts = SOCIAL_POSTS.filter(p =>
    (platformFilter === 'all' || p.platform === platformFilter) &&
    matchesStreams(p.streams, activeStreams)
  );
  return (
    <div className="myc-grid-2">
      <div>
        <div className="myc-pill-row">
          <button className={`myc-pill ${platformFilter === 'all' ? 'is-active' : ''}`} onClick={() => setPlatformFilter('all')}>All platforms</button>
          <button className={`myc-pill ${platformFilter === 'linkedin' ? 'is-active' : ''}`} onClick={() => setPlatformFilter('linkedin')}>LinkedIn</button>
          <button className={`myc-pill ${platformFilter === 'twitter' ? 'is-active' : ''}`} onClick={() => setPlatformFilter('twitter')}>X / Twitter</button>
          <button className={`myc-pill ${platformFilter === 'instagram' ? 'is-active' : ''}`} onClick={() => setPlatformFilter('instagram')}>Instagram</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredPosts.length === 0 && <div className="myc-empty">Nothing in this stream yet — try another aisle.</div>}
          {filteredPosts.map(p => {
            const author = personById(p.user);
            const org = orgById(p.org);
            const isEngaged = engaged[p.id];
            const platformColor = p.platform === 'linkedin' ? '#0a66c2' : p.platform === 'twitter' ? '#000' : '#E1306C';
            return (
              <Card key={p.id} padding="md">
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <Avatar person={author} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--myc-text)' }}>{author.name}</div>
                        <div style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>{author.role} · {org.name}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--myc-text-2)' }}>
                        <div style={{ width: 22, height: 22, borderRadius: 5, background: platformColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Icon name={p.platform === 'twitter' ? 'twitter' : p.platform === 'instagram' ? 'instagram' : 'linkedin'} size={12} />
                        </div>
                        <span>{p.when}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.5, color: 'var(--myc-text)' }}>{p.description}</div>
                    <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--myc-surface-2)', borderRadius: 8, fontSize: 13, color: 'var(--myc-text)' }}>
                      <strong style={{ fontWeight: 600 }}>The ask: </strong>{p.request}
                    </div>
                    <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      {p.streams.map(s => <StreamBadge key={s} stream={s} />)}
                      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>{p.engagements + (isEngaged ? 1 : 0)} members</span>
                        <Button variant={isEngaged ? 'secondary' : 'primary'} size="sm" icon={isEngaged ? 'check' : 'heart'}
                          onClick={() => { setEngaged(e => ({ ...e, [p.id]: true })); onToast('Thanks. Your engagement counts.'); }}>
                          {isEngaged ? 'Engaged' : 'I engaged'}
                        </Button>
                        <Button variant="ghost" size="sm" icon="external" onClick={() => onToast('Opening post on ' + p.platform + '...')}>Open</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
      <div>
        <Card padding="md" style={{ marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 600, margin: '0 0 4px' }}>Top engagers this month</h3>
          <div style={{ fontSize: 12, color: 'var(--myc-text-2)', marginBottom: 14 }}>The reciprocity flywheel.</div>
          {[
            { person: 'u-elena', count: 47 }, { person: 'u-mara', count: 39 },
            { person: 'u-finn', count: 31 }, { person: 'u-priya', count: 28 }, { person: 'u-jonas', count: 22 },
          ].map((t, i) => {
            const p = personById(t.person);
            return (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i === 4 ? 'none' : '1px solid var(--myc-border-soft)' }}>
                <div style={{ width: 18, fontSize: 12, fontWeight: 600, color: 'var(--myc-text-2)' }}>#{i + 1}</div>
                <Avatar person={p} size={28} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--myc-text-2)' }}>{orgById(p.org).name}</div>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: 'var(--myc-primary)' }}>{t.count}</div>
              </div>
            );
          })}
        </Card>
        <Card padding="md" id="submit-post-form">
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14.5, fontWeight: 600, margin: '0 0 12px' }}>Submit your post</h3>
          <div className="myc-form-field"><label className="myc-form-label">Link to post</label><input className="myc-form-input" placeholder="https://linkedin.com/..." /></div>
          <div className="myc-form-field"><label className="myc-form-label">What&apos;s the ask?</label><textarea className="myc-form-textarea" placeholder="e.g. Repost + tag one MEP from your country" /></div>
          <Button variant="primary" icon="send" onClick={() => onToast('Post submitted. Your network will see it.')}>Share with network</Button>
        </Card>
      </div>
    </div>
  );
}

function LearningsBoardPanel({ onToast, activeStreams }: { onToast: (t: string) => void; activeStreams: string[] }) {
  const [reacted, setReacted] = useState<Record<string, string>>({});
  const learnings = LEARNINGS.filter(l => matchesStreams(l.streams, activeStreams));
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {learnings.length === 0 && <div className="myc-empty">Nothing in this stream yet — try another aisle.</div>}
        {learnings.map(l => {
          const author = personById(l.author);
          const isReacted = reacted[l.id];
          return (
            <Card key={l.id} padding="lg">
              <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <Avatar person={author} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{author.name}</span>
                    <span style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>· {orgById(author.org).name} · {l.when}</span>
                    {l.pinned && (
                      <span style={{ marginLeft: 6, display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 10.5, color: '#8C5B26', background: '#D4A37326', padding: '1px 6px', borderRadius: 4, fontWeight: 600, letterSpacing: 0.3 }}>
                        <Icon name="pin" size={10} /> PINNED
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: '8px 0 10px', letterSpacing: -0.2, lineHeight: 1.25, textWrap: 'balance' }}>{l.title}</h3>
                  <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--myc-text)', textWrap: 'pretty' }}>{l.content}</div>
                  <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    {l.streams.map(s => <StreamBadge key={s} stream={s} />)}
                    <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
                      <ReactBtn icon="heart" label={`Helpful · ${l.reactions.helpful + (isReacted === 'helpful' ? 1 : 0)}`} active={isReacted === 'helpful'} onClick={() => { setReacted(r => ({ ...r, [l.id]: 'helpful' })); onToast('Marked helpful.'); }} />
                      <ReactBtn icon="sparkles" label={`Insightful · ${l.reactions.insightful + (isReacted === 'insightful' ? 1 : 0)}`} active={isReacted === 'insightful'} onClick={() => { setReacted(r => ({ ...r, [l.id]: 'insightful' })); onToast('Marked insightful.'); }} />
                      <ReactBtn icon="bookmark" label="Save" onClick={() => onToast('Saved.')} />
                      <ReactBtn icon="msg" label={`${l.comments}`} />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ReactBtn({ icon, label, active, onClick }: { icon: string; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 6,
      background: active ? 'rgba(64, 145, 108, 0.12)' : 'transparent',
      color: active ? 'var(--myc-primary)' : 'var(--myc-text-2)',
      border: 0, cursor: 'pointer', fontSize: 12, fontWeight: 500, fontFamily: 'inherit', transition: 'all 0.12s',
    }}>
      <Icon name={icon} size={13} /> {label}
    </button>
  );
}
