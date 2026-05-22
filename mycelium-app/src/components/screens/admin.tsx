'use client';

import { useState } from 'react';
import { Icon, Card, Button, ScreenHeader } from '@/components/ui';
import { STREAMS } from '@/lib/data';

export function Admin({ onToast }: { onToast: (t: string) => void }) {
  const [tab, setTab] = useState('users');
  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader eyebrow="Admin" title="Platform health"
        subtitle="User management, knowledge base ingestion, content moderation, and analytics. Visible only to Admin and Track Lead roles." />
      <div className="myc-tabs">
        <button className={`myc-tab ${tab === 'users' ? 'is-active' : ''}`} onClick={() => setTab('users')}>Users & Invites</button>
        <button className={`myc-tab ${tab === 'content' ? 'is-active' : ''}`} onClick={() => setTab('content')}>Knowledge Ingestion</button>
        <button className={`myc-tab ${tab === 'analytics' ? 'is-active' : ''}`} onClick={() => setTab('analytics')}>Analytics</button>
        <button className={`myc-tab ${tab === 'moderation' ? 'is-active' : ''}`} onClick={() => setTab('moderation')}>Moderation</button>
      </div>
      {tab === 'users' && <AdminUsers onToast={onToast} />}
      {tab === 'content' && <AdminContent onToast={onToast} />}
      {tab === 'analytics' && <AdminAnalytics />}
      {tab === 'moderation' && <AdminModeration />}
    </div>
  );
}

function AdminUsers({ onToast }: { onToast: (t: string) => void }) {
  const INITIAL_PENDING = [
    { name: 'Helga Andersson', org: 'Nordic Plant Alliance', country: 'Sweden', invited_by: 'Mara Lindqvist', when: '2h ago' },
    { name: 'Bartosz Kwiatkowski', org: 'ProVeg Polska', country: 'Poland', invited_by: 'Tomáš Novák', when: '6h ago' },
    { name: 'Lena Vogel', org: 'Albert Schweitzer Stiftung', country: 'Germany', invited_by: 'Anke Hoffmann', when: 'yesterday' },
  ];
  const [pending, setPending] = useState(INITIAL_PENDING);
  return (
    <div>
      <div className="myc-grid-3" style={{ marginBottom: 20 }}>
        <Card padding="md"><div className="myc-stat-label">Total members</div><div className="myc-stat-num" style={{ fontSize: 32 }}>142</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>+18 this month</div></Card>
        <Card padding="md"><div className="myc-stat-label">Pending approval</div><div className="myc-stat-num" style={{ fontSize: 32 }}>{pending.length}</div><div style={{ fontSize: 12, color: 'var(--myc-warm-deep)' }}>{pending.length > 0 ? 'Oldest waiting: 6 hours' : 'All clear'}</div></Card>
        <Card padding="md"><div className="myc-stat-label">Open invitations</div><div className="myc-stat-num" style={{ fontSize: 32 }}>7</div><div style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>2 expiring this week</div></Card>
      </div>
      <Card padding="md" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: 0 }}>Pending approvals</h3>
          <Button variant="secondary" size="sm" onClick={() => { setPending([]); onToast('All summit attendees approved.'); }}>Approve all from summit list</Button>
        </div>
        {pending.length === 0 && (
          <div style={{ padding: '18px 0', textAlign: 'center', fontSize: 13, color: 'var(--myc-text-2)' }}>No pending approvals.</div>
        )}
        {pending.map((p, i) => (
          <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i === pending.length - 1 ? 'none' : '1px solid var(--myc-border-soft)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--myc-surface-2)', color: 'var(--myc-text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.name.split(' ').map(x => x[0]).join('')}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>{p.org} · {p.country} · invited by {p.invited_by} · {p.when}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setPending(prev => prev.filter(x => x.name !== p.name)); onToast(`Declined ${p.name}.`); }}>Decline</Button>
            <Button variant="primary" size="sm" icon="check" onClick={() => { setPending(prev => prev.filter(x => x.name !== p.name)); onToast(`Approved ${p.name}. Welcome email sent.`); }}>Approve</Button>
          </div>
        ))}
      </Card>
      <Card padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: 0 }}>Generate invitation link</h3>
          <Button variant="primary" size="sm" icon="plus" onClick={() => onToast('Link created: https://mycelium.network/invite/xK9mQ2 — copied to clipboard.')}>Create link</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { type: 'Summit attendees', uses: '120 / 220', expires: 'Nov 30, 2026' },
            { type: 'K4G alumni', uses: '34 / 50', expires: 'Dec 31, 2026' },
            { type: 'SPA cohort 2026', uses: '12 / 40', expires: 'Aug 15, 2026' },
          ].map((inv, idx) => (
            <div key={idx} style={{ padding: 14, background: 'var(--myc-surface-2)', borderRadius: 8, fontSize: 12.5 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--myc-text)' }}>{inv.type}</div>
              <div style={{ color: 'var(--myc-text-2)', marginTop: 4 }}>{inv.uses} used · expires {inv.expires}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminContent({ onToast }: { onToast: (t: string) => void }) {
  return (
    <div>
      <Card padding="lg" style={{ marginBottom: 22, background: 'linear-gradient(135deg, #F0F4F1 0%, #FAFAF8 100%)' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--myc-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="sparkles" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Knowledge base ingestion pipeline</h3>
            <div style={{ fontSize: 13, color: 'var(--myc-text-2)', marginBottom: 14, lineHeight: 1.5 }}>Upload documents to chunk, embed (1536-dim), and index for the AI assistant.</div>
            <div style={{ display: 'flex', gap: 14 }}>
              {[{ n: '1,247', l: 'Documents indexed' }, { n: '84,309', l: 'Chunks embedded' }, { n: '312', l: 'Queries this week' }].map(s => (
                <div key={s.l}><div className="myc-stat-num" style={{ fontSize: 22 }}>{s.n}</div><div style={{ fontSize: 11, color: 'var(--myc-text-2)' }}>{s.l}</div></div>
              ))}
            </div>
          </div>
          <Button variant="primary" icon="plus" onClick={() => onToast('Upload modal opened.')}>Upload documents</Button>
        </div>
      </Card>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Recent ingestions</h3>
      <Card padding="md" style={{ padding: 0 }}>
        {[
          { title: '2025 Summit Workshop transcripts (Vienna)', status: 'indexed', when: '2 weeks ago', chunks: 4108, by: 'Marcus Halberg' },
          { title: 'Retail Engagement Playbook v3', status: 'indexed', when: '5 days ago', chunks: 184, by: 'Tomáš Novák' },
          { title: 'EU Dietary Guidelines submission toolkit', status: 'processing', when: '3 hours ago', chunks: 0, by: 'Pieter van Dijk' },
          { title: 'Faunalytics Q1 2026 research index update', status: 'indexed', when: '1 month ago', chunks: 612, by: 'Saoirse Walsh' },
        ].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: i === 3 ? 'none' : '1px solid var(--myc-border-soft)' }}>
            <Icon name="book" size={16} style={{ color: 'var(--myc-text-2)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{d.title}</div>
              <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', marginTop: 2 }}>{d.chunks > 0 ? `${d.chunks} chunks` : 'queued'} · {d.by} · {d.when}</div>
            </div>
            <span style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 600, letterSpacing: 0.3,
              background: d.status === 'indexed' ? 'rgba(64, 145, 108, 0.14)' : 'rgba(212, 163, 115, 0.18)',
              color: d.status === 'indexed' ? 'var(--myc-primary)' : '#8C5B26',
            }}>{d.status.toUpperCase()}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AdminAnalytics() {
  return (
    <div>
      <div className="myc-grid-3" style={{ marginBottom: 22 }}>
        <Card padding="md"><div className="myc-stat-label">Weekly Active Users</div><div className="myc-stat-num" style={{ fontSize: 32 }}>67</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>47% of registered · +8% MoM</div></Card>
        <Card padding="md"><div className="myc-stat-label">Knowledge queries / wk</div><div className="myc-stat-num" style={{ fontSize: 32 }}>312</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>Target: 50+ ✓</div></Card>
        <Card padding="md"><div className="myc-stat-label">Avg engagements/post</div><div className="myc-stat-num" style={{ fontSize: 32 }}>7.4</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>Target: 5+ ✓</div></Card>
      </div>
      <Card padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: 0 }}>Activity by stream — last 30 days</h3>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="myc-pill is-active">30d</button>
            <button className="myc-pill">90d</button>
            <button className="myc-pill">All</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', height: 200 }}>
          {STREAMS.map((s, i) => {
            const h = [78, 56, 64, 38, 71, 32, 48, 25][i];
            return (
              <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: s.color }}>{h}</div>
                <div style={{ width: '70%', background: s.color, height: `${h * 1.6}px`, borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                <div style={{ fontSize: 10.5, color: 'var(--myc-text-2)', textAlign: 'center', fontWeight: 500 }}>{s.short}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function AdminModeration() {
  return (
    <Card padding="lg" style={{ textAlign: 'center', padding: '48px 32px' }}>
      <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(64, 145, 108, 0.12)', color: 'var(--myc-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
        <Icon name="check" size={24} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: '0 0 6px' }}>Nothing flagged.</h3>
      <p style={{ fontSize: 13.5, color: 'var(--myc-text-2)', margin: 0, maxWidth: 360, marginInline: 'auto', lineHeight: 1.5 }}>
        The closed-circle model is doing its job. When something needs review, it shows up here.
      </p>
    </Card>
  );
}
