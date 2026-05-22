'use client';

import { useState } from 'react';
import { Icon, StreamBadge, OrgLogo, Card, Button, ScreenHeader } from '@/components/ui';
import { CAMPAIGNS, STREAMS, orgById, streamById, type Campaign } from '@/lib/data';

export function CampaignCalendar({ onToast }: { onToast: (t: string) => void }) {
  const [view, setView] = useState('month');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Campaign | null>(null);
  const [showSubmit, setShowSubmit] = useState(false);
  const now = new Date();
  const [calMonth, setCalMonth] = useState(5); // June (0-indexed)
  const [calYear, setCalYear] = useState(2026);

  const filtered = CAMPAIGNS.filter(c => filter === 'all' || c.streams.includes(filter));

  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader
        eyebrow="Campaign Calendar"
        title="What the movement is doing this quarter"
        subtitle="See key campaign moments, policy windows, and calls to action across the network. Mark which ones you'll support — your engagement helps coordinate amplification."
        actions={
          <>
            <Button variant="secondary" icon="filter" onClick={() => onToast('Calendar .ics link copied to clipboard.')}>Subscribe to .ics</Button>
            <Button variant="primary" icon="plus" onClick={() => setShowSubmit(true)}>Submit a campaign</Button>
          </>
        }
      />
      <div className="myc-pill-row">
        <button className={`myc-pill ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>All streams</button>
        {STREAMS.map(s => (
          <button key={s.id} className={`myc-pill ${filter === s.id ? 'is-active' : ''}`} onClick={() => setFilter(s.id)}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: s.dot, marginRight: 6, transform: 'translateY(-1px)' }} />
            {s.short}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, background: 'var(--myc-surface-2)', padding: 3, borderRadius: 8, width: 'fit-content' }}>
        {['month', 'list'].map(v => (
          <button key={v} onClick={() => setView(v)} style={{ padding: '6px 14px', borderRadius: 6, background: view === v ? '#fff' : 'transparent', border: 0, cursor: 'pointer', fontSize: 12.5, fontWeight: 500, fontFamily: 'inherit', color: view === v ? 'var(--myc-primary)' : 'var(--myc-text-2)' }}>{v === 'month' ? 'Month' : 'List'}</button>
        ))}
      </div>
      {view === 'month' ? <CalendarMonth campaigns={filtered} onSelect={setSelected} month={calMonth} year={calYear} onPrev={() => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y - 1); } else { setCalMonth(m => m - 1); } }} onNext={() => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y + 1); } else { setCalMonth(m => m + 1); } }} onToday={() => { setCalMonth(now.getMonth()); setCalYear(now.getFullYear()); }} /> : <CalendarList campaigns={filtered} onSelect={setSelected} />}
      {selected && <CampaignDetailModal campaign={selected} onClose={() => setSelected(null)} onToast={onToast} />}
      {showSubmit && <SubmitCampaignModal onClose={() => setShowSubmit(false)} onToast={onToast} />}
    </div>
  );
}

function CalendarMonth({ campaigns, onSelect, month, year, onPrev, onNext, onToday }: { campaigns: Campaign[]; onSelect: (c: Campaign) => void; month: number; year: number; onPrev: () => void; onNext: () => void; onToday: () => void }) {
  const firstDay = new Date(year, month, 1).getDay();
  const startOffset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();
  const now = new Date();
  const todayDay = now.getFullYear() === year && now.getMonth() === month ? now.getDate() : -1;
  const monthLabel = new Date(year, month, 1).toLocaleDateString('en', { month: 'long', year: 'numeric' });

  const cells: { kind: string; day: number }[] = [];
  for (let i = 0; i < startOffset; i++) cells.push({ kind: 'prev', day: prevMonthDays - startOffset + i + 1 });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ kind: 'cur', day: d });
  while (cells.length % 7 !== 0) cells.push({ kind: 'next', day: cells.length - daysInMonth - startOffset + 1 });

  const eventsForDay = (day: number) => {
    const date = new Date(year, month, day);
    return campaigns.filter(c => {
      const s = new Date(c.start); const e = new Date(c.end);
      return date >= s && date <= e;
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, margin: 0 }}>{monthLabel}</h3>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="myc-btn myc-btn-ghost myc-btn-sm" style={{ padding: 6 }} onClick={onPrev}><Icon name="chevR" size={14} style={{ transform: 'rotate(180deg)' }} /></button>
          <button className="myc-btn myc-btn-secondary myc-btn-sm" onClick={onToday}>Today</button>
          <button className="myc-btn myc-btn-ghost myc-btn-sm" style={{ padding: 6 }} onClick={onNext}><Icon name="chevR" size={14} /></button>
        </div>
      </div>
      <div className="myc-cal-grid">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="myc-cal-head">{d}</div>)}
        {cells.map((c, i) => {
          const events = c.kind === 'cur' ? eventsForDay(c.day) : [];
          const isToday = c.kind === 'cur' && c.day === todayDay;
          return (
            <div key={i} className={`myc-cal-cell ${c.kind !== 'cur' ? 'is-out' : ''} ${isToday ? 'is-today' : ''}`}>
              <div className={`myc-cal-day ${c.kind !== 'cur' ? 'myc-cal-out' : ''}`}>{isToday ? <span>{c.day}</span> : c.day}</div>
              {events.slice(0, 3).map((e, j) => {
                const s = streamById(e.streams[0]);
                return (
                  <div key={j} className="myc-cal-event" onClick={() => onSelect(e)}
                    style={{ background: s.color + '18', color: s.color, fontWeight: 500 }}>
                    {e.title}
                  </div>
                );
              })}
              {events.length > 3 && <div style={{ fontSize: 10.5, color: 'var(--myc-text-2)', marginTop: 2 }}>+{events.length - 3} more</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CalendarList({ campaigns, onSelect }: { campaigns: Campaign[]; onSelect: (c: Campaign) => void }) {
  return (
    <Card padding="md" style={{ padding: 0 }}>
      {campaigns.map((c, i) => {
        const org = orgById(c.org);
        const start = new Date(c.start);
        return (
          <div key={c.id} onClick={() => onSelect(c)} style={{
            display: 'flex', gap: 18, alignItems: 'flex-start', padding: '18px 22px',
            borderBottom: i === campaigns.length - 1 ? 'none' : '1px solid var(--myc-border-soft)', cursor: 'pointer', transition: 'background 0.12s',
          }}>
            <div style={{ width: 64, textAlign: 'center', flexShrink: 0 }}>
              <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 600 }}>{start.toLocaleDateString('en', { month: 'short' })}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--myc-primary)', lineHeight: 1 }}>{start.getDate()}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                <OrgLogo org={org} size={20} />
                <span style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>{org.name}</span>
                {c.featured && <span style={{ background: '#D4A37326', color: '#8C5B26', padding: '1px 6px', borderRadius: 4, fontSize: 10.5, fontWeight: 600, letterSpacing: 0.3 }}>FEATURED</span>}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, marginBottom: 6, color: 'var(--myc-text)' }}>{c.title}</div>
              <div style={{ fontSize: 13, color: 'var(--myc-text-2)', lineHeight: 1.5, marginBottom: 10, textWrap: 'pretty' }}>{c.description}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {c.streams.map(st => <StreamBadge key={st} stream={st} />)}
                <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--myc-text-2)' }}>{c.supporters} supporting</span>
              </div>
            </div>
          </div>
        );
      })}
    </Card>
  );
}

function CampaignDetailModal({ campaign, onClose, onToast }: { campaign: Campaign; onClose: () => void; onToast: (t: string) => void }) {
  const org = orgById(campaign.org);
  const [supported, setSupported] = useState(false);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20, 35, 25, 0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--myc-surface)', borderRadius: 14, width: 'min(640px, 100%)', maxHeight: '88vh', overflowY: 'auto', boxShadow: 'var(--myc-shadow-lg)' }}>
        <div style={{ padding: '22px 26px', borderBottom: '1px solid var(--myc-border-soft)', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <OrgLogo org={org} size={44} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12.5, color: 'var(--myc-text-2)', marginBottom: 4 }}>{org.name} · {org.country}</div>
            <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: -0.3, lineHeight: 1.2 }}>{campaign.title}</h2>
            <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>{campaign.streams.map(s => <StreamBadge key={s} stream={s} />)}</div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: 'var(--myc-text-2)' }}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ padding: '22px 26px' }}>
          <div style={{ display: 'flex', gap: 30, marginBottom: 22, padding: '14px 16px', background: 'var(--myc-surface-2)', borderRadius: 10 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--myc-text-2)' }}>Dates</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{new Date(campaign.start).toLocaleDateString('en', { month: 'short', day: 'numeric' })} – {new Date(campaign.end).toLocaleDateString('en', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--myc-text-2)' }}>Supporters</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{campaign.supporters + (supported ? 1 : 0)} members</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--myc-text-2)' }}>Support type</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 4 }}>{campaign.support.join(', ').replace(/_/g, ' ')}</div>
            </div>
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.6, marginBottom: 18, textWrap: 'pretty' }}>{campaign.description}</div>
          <div style={{ padding: 16, background: '#FAF6EE', border: '1px solid #E8DCC0', borderRadius: 10, marginBottom: 18 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: '#8C5B26', marginBottom: 6 }}>The ask</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, textWrap: 'pretty' }}>{campaign.cta}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant={supported ? 'secondary' : 'primary'} icon={supported ? 'check' : 'heart'} onClick={() => { setSupported(true); onToast(`Marked as supported. The ${org.name} team will see this.`); }}>
              {supported ? 'Supported' : "I'll support this"}
            </Button>
            <Button variant="secondary" icon="external">Resources</Button>
            <Button variant="ghost" icon="bookmark">Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitCampaignModal({ onClose, onToast }: { onClose: () => void; onToast: (t: string) => void }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(20, 35, 25, 0.45)', backdropFilter: 'blur(4px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--myc-surface)', borderRadius: 14, width: 'min(560px, 100%)', boxShadow: 'var(--myc-shadow-lg)' }}>
        <div style={{ padding: '20px 26px', borderBottom: '1px solid var(--myc-border-soft)', display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600 }}>Submit a campaign</h2>
          <button onClick={onClose} style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: 'var(--myc-text-2)' }}><Icon name="x" size={18} /></button>
        </div>
        <div style={{ padding: '20px 26px' }}>
          <div className="myc-form-field"><label className="myc-form-label">Campaign title</label><input className="myc-form-input" placeholder="e.g. EU Methane Reduction Push" /></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div className="myc-form-field"><label className="myc-form-label">Start date</label><input className="myc-form-input" type="date" defaultValue="2026-06-15" /></div>
            <div className="myc-form-field"><label className="myc-form-label">End date</label><input className="myc-form-input" type="date" defaultValue="2026-07-15" /></div>
          </div>
          <div className="myc-form-field"><label className="myc-form-label">The ask — what support do you need?</label><textarea className="myc-form-textarea" placeholder="e.g. Sign the open letter, share to LinkedIn between Jun 20–30, tag your local MEP…" /></div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 }}>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button variant="primary" onClick={() => { onClose(); onToast('Campaign submitted for review.'); }}>Submit for review</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
