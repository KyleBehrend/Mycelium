'use client';

import { useState } from 'react';
import { Icon, StreamBadge, Avatar, OrgLogo, Card, Button, ScreenHeader, MyceliumPattern, NetworkGraph } from '@/components/ui';
import { PEOPLE, ORGS, STREAMS, CURRENT_USER, orgById, streamById, type Person } from '@/lib/data';

export function Directory({ onToast }: { onToast: (t: string) => void }) {
  const [view, setView] = useState('network');
  const [search, setSearch] = useState('');
  const [streamFilter, setStreamFilter] = useState('all');
  const [selected, setSelected] = useState<Person | null>(null);

  const filteredPeople = PEOPLE.filter(p =>
    (streamFilter === 'all' || p.streams.includes(streamFilter)) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || orgById(p.org).name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader eyebrow="Member Directory" title="The network"
        subtitle="142 people across 12 organizations in 14 countries. Connections are formed through shared streams, co-authored learnings, and campaign collaborations."
        actions={
          <div style={{ display: 'flex', gap: 2, background: 'var(--myc-surface-2)', padding: 3, borderRadius: 7 }}>
            {[{ id: 'network', label: 'Network' }, { id: 'grid', label: 'People' }, { id: 'orgs', label: 'Orgs' }].map(v => (
              <button key={v.id} onClick={() => setView(v.id)} style={{ padding: '6px 12px', borderRadius: 5, background: view === v.id ? '#fff' : 'transparent', border: 0, cursor: 'pointer', fontSize: 12.5, fontWeight: 500, fontFamily: 'inherit', color: view === v.id ? 'var(--myc-primary)' : 'var(--myc-text-2)' }}>{v.label}</button>
            ))}
          </div>
        }
      />

      {view === 'network' && (
        <Card padding="lg" style={{ position: 'relative', overflow: 'hidden', height: 540, padding: 0 }}>
          <MyceliumPattern density={0.7} opacity={0.04} />
          <div style={{ position: 'absolute', top: 22, left: 22, zIndex: 2, maxWidth: 280 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>The mycelial map</h3>
            <p style={{ fontSize: 12, color: 'var(--myc-text-2)', margin: 0, lineHeight: 1.5 }}>Green lines = organization membership. Soft lines = shared interest streams.</p>
          </div>
          <div style={{ position: 'absolute', inset: 0 }}>
            <NetworkGraph width={1100} height={540} highlight={CURRENT_USER.org} />
          </div>
          <div style={{ position: 'absolute', bottom: 22, right: 22, zIndex: 2, display: 'flex', gap: 16, padding: '10px 14px', background: 'rgba(255,255,255,0.9)', borderRadius: 8, backdropFilter: 'blur(4px)', border: '1px solid var(--myc-border-soft)' }}>
            {[{ n: '12', l: 'orgs' }, { n: '142', l: 'members' }, { n: '14', l: 'countries' }].map(s => (
              <div key={s.l} style={{ fontSize: 11.5, color: 'var(--myc-text-2)' }}>
                <strong style={{ color: 'var(--myc-text)', fontFamily: 'var(--font-display)', fontSize: 20, display: 'block', lineHeight: 1 }}>{s.n}</strong>{s.l}
              </div>
            ))}
          </div>
        </Card>
      )}

      {view === 'grid' && (
        <>
          <div style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Icon name="search" size={15} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--myc-text-3)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search people or organizations…"
                style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid var(--myc-border)', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit', background: 'var(--myc-surface)', outline: 'none' }} />
            </div>
          </div>
          <div className="myc-pill-row">
            <button className={`myc-pill ${streamFilter === 'all' ? 'is-active' : ''}`} onClick={() => setStreamFilter('all')}>All streams</button>
            {STREAMS.map(s => (
              <button key={s.id} className={`myc-pill ${streamFilter === s.id ? 'is-active' : ''}`} onClick={() => setStreamFilter(s.id)}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: s.dot, marginRight: 6, transform: 'translateY(-1px)' }} />
                {s.short}
              </button>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {filteredPeople.map(p => (
              <Card key={p.id} padding="md" onClick={() => setSelected(p)}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                  <Avatar person={p} size={44} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--myc-text)' }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--myc-text-2)', marginTop: 2 }}>{p.role}</div>
                    <div style={{ fontSize: 12, color: 'var(--myc-text-2)', marginTop: 2 }}>{orgById(p.org).name} · {p.country}</div>
                  </div>
                </div>
                {p.title !== 'Member' && <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--myc-warm-deep)', marginBottom: 8, letterSpacing: 0.3 }}>★ {p.title}</div>}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.streams.map(s => <StreamBadge key={s} stream={s} />)}</div>
              </Card>
            ))}
          </div>
        </>
      )}

      {view === 'orgs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {ORGS.map(o => (
            <Card key={o.id} padding="md" accent={o.tint}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <OrgLogo org={o} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--myc-text)' }}>{o.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--myc-text-2)', marginTop: 2 }}>{o.country}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>{o.streams.map(s => <StreamBadge key={s} stream={s} />)}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--myc-text-2)', borderTop: '1px solid var(--myc-border-soft)', paddingTop: 12 }}>
                <span>{o.members} members on Mycelium</span>
                <span className="myc-link" style={{ cursor: 'pointer' }}>View →</span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {selected && <PersonModal person={selected} onClose={() => setSelected(null)} onToast={onToast} />}
    </div>
  );
}

function PersonModal({ person, onClose, onToast }: { person: Person; onClose: () => void; onToast: (t: string) => void }) {
  const org = orgById(person.org);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20, 35, 25, 0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--myc-surface)', borderRadius: 14, width: 'min(520px, 100%)', boxShadow: 'var(--myc-shadow-lg)', overflow: 'hidden' }}>
        <div style={{ background: `linear-gradient(135deg, ${person.tint}, ${person.tint}dd)`, padding: '32px 26px 18px', color: '#fff', position: 'relative' }}>
          <button onClick={onClose} style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(0,0,0,0.2)', border: 0, padding: 6, cursor: 'pointer', color: '#fff', borderRadius: 6 }}><Icon name="x" size={16} /></button>
          <Avatar person={person} size={64} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, marginTop: 14, letterSpacing: -0.3 }}>{person.name}</div>
          <div style={{ fontSize: 13.5, opacity: 0.9, marginTop: 4 }}>{person.role} · {org.name}</div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{person.country}</div>
        </div>
        <div style={{ padding: '22px 26px' }}>
          {person.title !== 'Member' && <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--myc-warm-deep)', marginBottom: 12, letterSpacing: 0.3, textTransform: 'uppercase' }}>★ {person.title}</div>}
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--myc-text-2)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Streams</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 18 }}>{person.streams.map(s => <StreamBadge key={s} stream={s} />)}</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="primary" icon="msg" onClick={() => { onClose(); onToast(`Message thread opened with ${person.name}.`); }}>Send message</Button>
            <Button variant="secondary" icon="external">Profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
