'use client';

import { Icon, StreamBadge, Avatar, Card, Button, ScreenHeader } from '@/components/ui';
import { CURRENT_USER, STREAMS, orgById } from '@/lib/data';

export function Settings({ onToast }: { onToast: (t: string) => void }) {
  const me = CURRENT_USER;
  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader eyebrow="Profile & Settings" title="Your profile" subtitle="Update what other members see, your interest streams, and how you want to be notified." />
      <div className="myc-grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card padding="lg">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Personal</h3>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 18 }}>
              <Avatar person={me} size={64} />
              <div>
                <Button variant="secondary" size="sm">Change photo</Button>
                <div style={{ fontSize: 12, color: 'var(--myc-text-2)', marginTop: 6 }}>PNG or JPG, up to 2 MB</div>
              </div>
            </div>
            <div className="myc-form-field"><label className="myc-form-label">Name</label><input className="myc-form-input" defaultValue={me.name} /></div>
            <div className="myc-form-field"><label className="myc-form-label">Role at organization</label><input className="myc-form-input" defaultValue={me.role} /></div>
            <div className="myc-form-field"><label className="myc-form-label">Country</label><input className="myc-form-input" defaultValue={me.country} /></div>
            <div className="myc-form-field"><label className="myc-form-label">Bio</label><textarea className="myc-form-textarea" placeholder="What you're working on, what you're hoping to find here…" /></div>
            <Button variant="primary" onClick={() => onToast('Profile saved.')}>Save</Button>
          </Card>
          <Card padding="lg">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Your streams</h3>
            <div className="myc-stream-grid">
              {STREAMS.map(s => (
                <div key={s.id} className={`myc-stream-card ${me.streams.includes(s.id) ? 'is-selected' : ''}`}>
                  <span className="myc-stream-card-dot" style={{ background: s.dot }} />
                  <span className="myc-stream-card-label">{s.label}</span>
                  <span className="myc-stream-card-check"><Icon name="check" size={14} /></span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card padding="lg">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Notifications</h3>
            <div className="myc-form-field"><label className="myc-form-label">Email digest</label>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {['Daily', 'Weekly', 'Never'].map((opt, i) => (
                  <button key={opt} className={`myc-pill ${i === 1 ? 'is-active' : ''}`}>{opt}</button>
                ))}
              </div>
            </div>
            {['New campaign events in my streams', 'Replies to my posts and learnings', 'New resources matching my streams', 'Engagement requests from my orgs', 'AI assistant new feature releases'].map((n, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i === 4 ? 'none' : '1px solid var(--myc-border-soft)', fontSize: 13.5 }}>
                <input type="checkbox" defaultChecked={i !== 4} style={{ accentColor: 'var(--myc-primary)', width: 15, height: 15 }} /> {n}
              </label>
            ))}
          </Card>
          <Card padding="lg">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>Connect to Claude via MCP</h3>
            <p style={{ fontSize: 13, color: 'var(--myc-text-2)', margin: '0 0 14px', lineHeight: 1.5 }}>
              Use Mycelium&apos;s knowledge base from inside your own Claude workspace. Paste this URL into your MCP settings.
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 12px', background: 'var(--myc-surface-2)', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: 11.5 }}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://mcp.mycelium.org/u/maral-7f29c1</span>
              <button onClick={() => onToast('Copied.')} style={{ border: 0, background: 'transparent', padding: 4, cursor: 'pointer', color: 'var(--myc-text-2)' }}><Icon name="external" size={13} /></button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
