'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Icon, Avatar, StreamIcon } from '@/components/ui';

// Nav rows carry a bespoke clay PNG icon at /public/nav/<id>.png. Rendered with
// mix-blend-multiply (via .myc-clay-ic) so the cream tile melts into the warm
// sidebar; on the active green pill the icon flips to a normal cream chip.
const NAV_ICON_PATH: Record<string, string> = {
  dashboard: '/nav/dashboard.png',
  knowledge: '/nav/knowledge.png',
  signals:   '/nav/signals.png',
  calendar:  '/nav/calendar.png',
  community: '/nav/community.png',
  directory: '/nav/directory.png',
};

function NavGlyph({ id, fallback }: { id: string; fallback: string }) {
  const path = NAV_ICON_PATH[id];
  if (path) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img className="myc-clay-ic myc-nav-ic" src={path} alt="" />
    );
  }
  return <Icon name={fallback} size={18} />;
}
import { CURRENT_USER, STREAMS, streamById, orgById, streamActivityCount } from '@/lib/data';
import { Dashboard } from '@/components/screens/dashboard';
import { KnowledgeHub } from '@/components/screens/knowledge';
import { CampaignCalendar } from '@/components/screens/calendar';
import { Community } from '@/components/screens/community';
import { Directory } from '@/components/screens/directory';
import { Admin } from '@/components/screens/admin';
import { Settings } from '@/components/screens/settings';
import { Onboarding } from '@/components/screens/onboarding';
import { Signals } from '@/components/screens/signals';
import { CommandPalette } from '@/components/command-palette';

type Screen = 'dashboard' | 'knowledge' | 'signals' | 'calendar' | 'community' | 'directory' | 'admin' | 'settings' | 'onboarding';

type AppContextType = {
  userStreams: string[];
  toggleStream: (id: string) => void;
  setUserStreams: (streams: string[]) => void;
  // Multi-select stream filter (the "shop by stream" focus). Empty = all streams.
  // Defaults to the streams the member follows.
  activeStreams: string[];
  setActiveStreams: (s: string[]) => void;
  toggleStreamFilter: (id: string) => void;
  clearStreamFilter: () => void;
  goToBrowseStreams: () => void;
};

export const AppContext = createContext<AppContextType>({
  userStreams: CURRENT_USER.streams,
  toggleStream: () => {},
  setUserStreams: () => {},
  activeStreams: CURRENT_USER.streams,
  setActiveStreams: () => {},
  toggleStreamFilter: () => {},
  clearStreamFilter: () => {},
  goToBrowseStreams: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppShell() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; text: string; success?: boolean }[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userStreams, setUserStreams] = useState<string[]>(CURRENT_USER.streams);
  // Filter defaults to the member's followed streams so the hub opens focused on
  // what they care about; they can narrow to one stream or pick any multi-set.
  const [activeStreams, setActiveStreams] = useState<string[]>(CURRENT_USER.streams);
  const [showStreamPicker, setShowStreamPicker] = useState(false);

  const toggleStream = useCallback((id: string) => {
    setUserStreams(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }, []);

  const toggleStreamFilter = useCallback((id: string) => {
    setActiveStreams(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }, []);

  const clearStreamFilter = useCallback(() => setActiveStreams([]), []);

  const toast = useCallback((text: string, success = true) => {
    const id = Date.now();
    setToasts(t => [...t, { id, text, success }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdkOpen(o => !o);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-trigger the welcome flow on first visit. Re-runs only if the flag is
  // cleared (e.g. via the "Take a tour" button below, which forces it back on).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.localStorage.getItem('myc-onboarded')) {
      setShowOnboarding(true);
    }
  }, []);

  const completeOnboarding = useCallback((streams?: string[]) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('myc-onboarded', '1');
    }
    if (streams && streams.length) {
      setUserStreams(streams);
      setActiveStreams(streams); // open the hub focused on what they just picked
    }
    setShowOnboarding(false);
  }, []);

  const navigateTo = useCallback((s: string) => setScreen(s as Screen), []);

  // "Follow more streams" → jump to the dashboard browse rail.
  const goToBrowseStreams = useCallback(() => {
    setScreen('dashboard');
    setShowStreamPicker(false);
    setTimeout(() => document.getElementById('myc-browse-rail')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }, []);

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} initialStreams={userStreams} />;
  }

  const nav = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'home' },
    { id: 'knowledge' as const, label: 'Knowledge Hub', icon: 'sparkles' },
    { id: 'signals' as const, label: 'Signals', icon: 'sprout' },
    { id: 'calendar' as const, label: 'Campaign Calendar', icon: 'calendar' },
    { id: 'community' as const, label: 'Community', icon: 'megaphone' },
    { id: 'directory' as const, label: 'Member Directory', icon: 'users' },
  ];
  const second = [
    { id: 'admin' as const, label: 'Admin', icon: 'shield' },
    { id: 'settings' as const, label: 'Profile & Settings', icon: 'settings' },
  ];

  const org = orgById(CURRENT_USER.org);
  const unfollowed = STREAMS.filter(s => !userStreams.includes(s.id));

  return (
    <AppContext.Provider value={{ userStreams, toggleStream, setUserStreams, activeStreams, setActiveStreams, toggleStreamFilter, clearStreamFilter, goToBrowseStreams }}>
      <div className="myc-app">
        <aside className="myc-sidebar">
          <div className="myc-brand" onClick={() => setScreen('dashboard')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="myc-clay-ic" src="/logo.png" alt="Mycelium" style={{ width: 38, height: 38 }} />
            <div>
              <div className="myc-brand-name">Mycelium</div>
              <div className="myc-brand-sub">Movement Infrastructure</div>
            </div>
          </div>

          <div className="myc-nav-section">
            {nav.map(item => (
              <button key={item.id}
                className={`myc-nav-item ${screen === item.id ? 'is-active' : ''}`}
                onClick={() => setScreen(item.id)}>
                <NavGlyph id={item.id} fallback={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="myc-nav-label">Your streams</div>
          <div className="myc-nav-section">
            {userStreams.map(sid => {
              const s = streamById(sid);
              const on = activeStreams.includes(sid);
              return (
                <button key={sid}
                  className={`myc-nav-stream ${on ? 'is-active' : ''}`}
                  style={{ ['--ac' as string]: s.color } as React.CSSProperties}
                  onClick={() => toggleStreamFilter(sid)}>
                  <StreamIcon stream={sid} size={36} />
                  <div className="myc-nav-stream-tx">
                    <div className="myc-nav-stream-nm">{s.label}</div>
                    <div className="myc-nav-stream-ct">{streamActivityCount(sid)} active</div>
                  </div>
                  <span className="myc-nav-stream-dot" style={{ background: s.color }} />
                </button>
              );
            })}
            <button className="myc-nav-stream myc-nav-stream-add" onClick={() => setShowStreamPicker(p => !p)}>
              <span className="myc-nav-stream-ph"><Icon name="plus" size={17} /></span>
              <div className="myc-nav-stream-tx">
                <div className="myc-nav-stream-nm" style={{ fontWeight: 500, color: 'var(--myc-text-2)' }}>Follow more streams</div>
              </div>
            </button>
            {showStreamPicker && (
              <div style={{ background: 'var(--myc-surface)', border: '1px solid var(--myc-border-soft)', borderRadius: 11, padding: 6, margin: '2px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {unfollowed.map(s => (
                  <button key={s.id} className="myc-nav-stream" onClick={() => { toggleStream(s.id); setShowStreamPicker(false); toast(`Now following ${s.short}.`); }} style={{ padding: '6px 8px' }}>
                    <StreamIcon stream={s.id} size={28} />
                    <div className="myc-nav-stream-tx"><div className="myc-nav-stream-nm" style={{ fontSize: 12.5 }}>{s.label}</div></div>
                  </button>
                ))}
                {unfollowed.length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--myc-text-3)', padding: '8px 10px' }}>You follow all 14 streams.</div>
                )}
              </div>
            )}
          </div>

          <div className="myc-nav-divider" />

          <div className="myc-nav-section">
            {second.map(item => (
              <button key={item.id}
                className={`myc-nav-item ${screen === item.id ? 'is-active' : ''}`}
                onClick={() => setScreen(item.id)}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowOnboarding(true)}
            className="myc-sidebar-tour"
          >
            <Icon name="sparkles" size={13} />
            <span>Take a tour</span>
          </button>

          <div className="myc-sidebar-footer">
            <Avatar person={CURRENT_USER} size={34} />
            <div className="myc-sb-foot-meta">
              <div className="myc-sb-foot-name">{CURRENT_USER.name}</div>
              <div className="myc-sb-foot-org">{org.name}</div>
            </div>
            <Icon name="bell" size={16} style={{ color: 'var(--myc-text-2)' }} />
          </div>
        </aside>

        <main className="myc-main">
          <div className="myc-topbar">
            <button className="myc-topbar-search" onClick={() => setCmdkOpen(true)}>
              <Icon name="search" size={15} />
              <span>Search campaigns, people, resources…</span>
              <span className="myc-kbd">⌘K</span>
            </button>
            <div className="myc-topbar-sp" />
            {activeStreams.length > 0 && (() => {
              const single = activeStreams.length === 1 ? streamById(activeStreams[0]) : null;
              const ac = single ? single.color : 'var(--myc-primary)';
              return (
                <button className="myc-tb-btn" onClick={clearStreamFilter}
                  style={{ color: ac, borderColor: single ? `color-mix(in srgb, ${ac} 40%, var(--myc-border))` : 'var(--myc-border)' } as React.CSSProperties}>
                  <Icon name="x" size={13} /> {single ? 'Clear stream' : `Clear ${activeStreams.length} streams`}
                </button>
              );
            })()}
            <button className="myc-tb-btn is-solid" onClick={() => setScreen('knowledge')}>
              <Icon name="sparkles" size={14} /> Ask the assistant
            </button>
          </div>

          {screen === 'dashboard' && <Dashboard onNav={navigateTo} onToast={toast} />}
          {screen === 'knowledge' && <KnowledgeHub onToast={toast} />}
          {screen === 'signals' && <Signals onToast={toast} />}
          {screen === 'calendar' && <CampaignCalendar onToast={toast} />}
          {screen === 'community' && <Community onToast={toast} />}
          {screen === 'directory' && <Directory onToast={toast} />}
          {screen === 'admin' && <Admin onToast={toast} />}
          {screen === 'settings' && <Settings onToast={toast} />}
        </main>

        <CommandPalette
          open={cmdkOpen}
          onClose={() => setCmdkOpen(false)}
          onNav={(target) => { setScreen(target as Screen); setCmdkOpen(false); }}
          onAskAI={() => { setScreen('knowledge'); }}
        />

        <div className="myc-toast-stack">
          {toasts.map(t => (
            <div key={t.id} className={`myc-toast ${t.success ? 'is-success' : ''}`}>
              {t.success && <Icon name="check" size={14} />}
              {t.text}
            </div>
          ))}
        </div>
      </div>
    </AppContext.Provider>
  );
}
