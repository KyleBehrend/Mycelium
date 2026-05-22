'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Icon, Avatar } from '@/components/ui';
import { PEOPLE, KNOWLEDGE_DOCS, CAMPAIGNS, orgById } from '@/lib/data';

export function CommandPalette({ open, onClose, onNav, onAskAI }: {
  open: boolean; onClose: () => void; onNav: (target: string) => void; onAskAI: (q: string) => void;
}) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) { setQ(''); setActive(0); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const items = useMemo(() => {
    const navItems: { kind: string; icon: string; label: string; sub?: string; target: string; hint: string; person?: any }[] = [
      { kind: 'nav', icon: 'home', label: 'Dashboard', target: 'dashboard', hint: 'Go to' },
      { kind: 'nav', icon: 'sparkles', label: 'Ask the Knowledge Assistant', target: 'knowledge', hint: 'Open' },
      { kind: 'nav', icon: 'book', label: 'Resource Library', target: 'knowledge', hint: 'Browse' },
      { kind: 'nav', icon: 'sprout', label: 'Signals — Live News', target: 'signals', hint: 'View' },
      { kind: 'nav', icon: 'calendar', label: 'Campaign Calendar', target: 'calendar', hint: 'View' },
      { kind: 'nav', icon: 'megaphone', label: 'Community — Social & Learnings', target: 'community', hint: 'Visit' },
      { kind: 'nav', icon: 'users', label: 'Member Directory', target: 'directory', hint: 'Browse' },
    ];
    const peopleItems = PEOPLE.slice(0, 10).map(p => ({
      kind: 'person', icon: 'users', label: p.name, sub: `${orgById(p.org).name} · ${p.role}`, target: 'directory', person: p, hint: 'Profile',
    }));
    const docItems = KNOWLEDGE_DOCS.slice(0, 6).map(d => ({
      kind: 'doc', icon: 'book', label: d.title, sub: d.source, target: 'knowledge', hint: 'Open',
    }));
    const campaignItems = CAMPAIGNS.slice(0, 6).map(c => ({
      kind: 'campaign', icon: 'megaphone', label: c.title, sub: orgById(c.org).name, target: 'calendar', hint: 'View',
    }));
    const all = [...navItems, ...peopleItems, ...docItems, ...campaignItems];
    if (!q.trim()) return all.slice(0, 18);
    const lc = q.toLowerCase();
    return all.filter(i => i.label.toLowerCase().includes(lc) || (i.sub && i.sub.toLowerCase().includes(lc)));
  }, [q]);

  const askPrefix = q.trim() && (q.trim().endsWith('?') || q.trim().split(' ').length >= 3);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, items.length)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
    if (e.key === 'Enter') {
      if (askPrefix && active === 0) { onAskAI(q); onClose(); return; }
      const idx = askPrefix ? active - 1 : active;
      const item = items[idx];
      if (item) { onNav(item.target); onClose(); }
    }
  }, [open, items, active, askPrefix, q, onNav, onAskAI, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!open) return null;

  const groups: Record<string, (typeof items[0] & { _idx: number })[]> = {};
  items.forEach((it, i) => {
    const g = it.kind === 'nav' ? 'Navigate' : it.kind === 'person' ? 'People' : it.kind === 'doc' ? 'Resources' : 'Campaigns';
    if (!groups[g]) groups[g] = [];
    groups[g].push({ ...it, _idx: askPrefix ? i + 1 : i });
  });

  return (
    <div className="myc-cmdk-overlay" onClick={onClose}>
      <div className="myc-cmdk" onClick={e => e.stopPropagation()}>
        <div className="myc-cmdk-input">
          <Icon name="search" size={16} style={{ color: 'var(--myc-text-2)' }} />
          <input ref={inputRef} value={q} onChange={e => { setQ(e.target.value); setActive(0); }} placeholder="Search, ask Claude, or jump to anything…" />
          <span className="myc-kbd">esc</span>
        </div>
        <div className="myc-cmdk-results">
          {askPrefix && (
            <div>
              <div className="myc-cmdk-group-label">Ask the assistant</div>
              <div className={`myc-cmdk-item ${active === 0 ? 'is-active' : ''}`}
                onClick={() => { onAskAI(q); onClose(); }} onMouseEnter={() => setActive(0)}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg, #2D6A4F, #74C69D)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="sparkles" size={13} /></div>
                <div style={{ flex: 1, fontSize: 13.5 }}>
                  <span style={{ color: 'var(--myc-text-2)' }}>Ask Mycelium: </span><span style={{ fontWeight: 500 }}>{q}</span>
                </div>
                <span className="myc-cmdk-item-sub">↵ ask</span>
              </div>
            </div>
          )}
          {Object.entries(groups).map(([groupName, gItems]) => (
            <div key={groupName}>
              <div className="myc-cmdk-group-label">{groupName}</div>
              {gItems.map(it => (
                <div key={it._idx} className={`myc-cmdk-item ${active === it._idx ? 'is-active' : ''}`}
                  onClick={() => { onNav(it.target); onClose(); }} onMouseEnter={() => setActive(it._idx)}>
                  {it.kind === 'person' && 'person' in it ? <Avatar person={(it as any).person} size={24} /> :
                    <div style={{ width: 26, height: 26, borderRadius: 6, background: 'var(--myc-surface-2)', color: 'var(--myc-text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name={it.icon} size={13} /></div>
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</div>
                    {it.sub && <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.sub}</div>}
                  </div>
                  <span className="myc-cmdk-item-sub">{it.hint}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 18px', borderTop: '1px solid var(--myc-border-soft)', fontSize: 11.5, color: 'var(--myc-text-3)' }}>
          <div style={{ display: 'flex', gap: 14 }}>
            <span><span className="myc-kbd">↑</span> <span className="myc-kbd">↓</span> navigate</span>
            <span><span className="myc-kbd">↵</span> select</span>
          </div>
          <div>End a query with <span className="myc-kbd">?</span> to ask the assistant.</div>
        </div>
      </div>
    </div>
  );
}
