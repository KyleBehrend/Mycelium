'use client';

import { useState } from 'react';
import { Icon, StreamBadge, StreamFilterBar, Avatar, Card, Button, ScreenHeader, MyceliumPattern, NetworkGraph } from '@/components/ui';
import { PEOPLE, ORGS, CURRENT_USER, orgById, streamById, matchesStreams, type Person } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';

export function Directory({ onToast }: { onToast: (t: string) => void }) {
  const { activeStreams, toggleStreamFilter, clearStreamFilter } = useAppContext();
  const [view, setView] = useState('grid');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Person | null>(null);

  const filteredPeople = PEOPLE.filter(p =>
    matchesStreams(p.streams, activeStreams) &&
    (search === '' || p.name.toLowerCase().includes(search.toLowerCase()) || orgById(p.org).name.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredOrgs = ORGS.filter(o => matchesStreams(o.streams, activeStreams));
  const single = activeStreams.length === 1 ? streamById(activeStreams[0]) : null;
  const scopeLabel = single ? ` working on ${single.label}` : activeStreams.length > 1 ? ` across ${activeStreams.length} streams` : ' in 14 countries';

  return (
    <div className="myc-main-inner" style={{ paddingTop: 6 }}>
      <ScreenHeader eyebrow="Member Directory" title="The network"
        subtitle={`142 people across ${ORGS.length} organisations${scopeLabel}. Connections form through shared streams, co-authored learnings, and campaign collaborations.`}
        actions={
          <div className="myc-seg">
            {[{ id: 'grid', label: 'People' }, { id: 'orgs', label: 'Orgs' }, { id: 'network', label: 'Network' }].map(v => (
              <button key={v.id} onClick={() => setView(v.id)} className={view === v.id ? 'is-active' : ''}>{v.label}</button>
            ))}
          </div>
        }
      />
      {view !== 'network' && <StreamFilterBar active={activeStreams} onToggle={toggleStreamFilter} onClear={clearStreamFilter} />}

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
            {[{ n: String(ORGS.length), l: 'orgs' }, { n: '142', l: 'members' }, { n: '14', l: 'countries' }].map(s => (
              <div key={s.l} style={{ fontSize: 11.5, color: 'var(--myc-text-2)' }}>
                <strong style={{ color: 'var(--myc-text)', fontFamily: 'var(--font-display)', fontSize: 20, display: 'block', lineHeight: 1 }}>{s.n}</strong>{s.l}
              </div>
            ))}
          </div>
        </Card>
      )}

      {view === 'grid' && (
        <>
          <div style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Icon name="search" size={15} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--myc-text-3)' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search people or organisations…"
                style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid var(--myc-border)', borderRadius: 10, fontSize: 13.5, fontFamily: 'inherit', background: 'var(--myc-surface)', outline: 'none' }} />
            </div>
          </div>
          <div className="myc-grid-3">
            {filteredPeople.length === 0 && <div className="myc-empty">No members in this stream yet — try another aisle.</div>}
            {filteredPeople.map(p => {
              const accent = streamById(p.streams[0]).color;
              return (
                <div key={p.id} className="myc-person" onClick={() => setSelected(p)}>
                  <div className="myc-post-av" style={{ background: accent, width: 46, height: 46, fontSize: 15, marginBottom: 12 }}>
                    {p.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2, display: 'flex', alignItems: 'center', gap: 7 }}>
                    {p.name}
                    {p.title !== 'Member' && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--myc-text-3)', fontWeight: 500 }}>★ Lead</span>}
                  </div>
                  <div style={{ fontSize: 12.5, color: 'var(--myc-text-2)', marginTop: 3 }}>{p.role}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--myc-text-3)', marginTop: 1 }}>{orgById(p.org).name} · {p.country}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 13 }}>{p.streams.map(s => <StreamBadge key={s} stream={s} />)}</div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {view === 'orgs' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {filteredOrgs.length === 0 && <div className="myc-empty">No organisations in this stream yet — try another aisle.</div>}
          {filteredOrgs.map(o => (
            <div key={o.id} className="myc-org">
              <div className="myc-org-logo">{o.logo}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>{o.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--myc-text-3)', marginTop: 2 }}>{o.country} · {o.members} members</div>
              </div>
              <div style={{ display: 'flex', gap: 6, marginLeft: 'auto', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 180 }}>
                {o.streams.map(s => <StreamBadge key={s} stream={s} />)}
              </div>
            </div>
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
