'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Icon, Avatar } from '@/components/ui';

// Nav rows that have a custom illustrated PNG icon at /public/nav/<id>.png.
// Anything not here falls back to the existing Lucide glyph.
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
      <img src={path} alt="" style={{ width: 26, height: 26, objectFit: 'contain', flexShrink: 0 }} />
    );
  }
  return <Icon name={fallback} size={17} />;
}
import { CURRENT_USER, STREAMS, streamById, orgById } from '@/lib/data';
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
  activeStreamFilter: string | null;
  setActiveStreamFilter: (s: string | null) => void;
};

export const AppContext = createContext<AppContextType>({
  userStreams: CURRENT_USER.streams,
  toggleStream: () => {},
  setUserStreams: () => {},
  activeStreamFilter: null,
  setActiveStreamFilter: () => {},
});

export const useAppContext = () => useContext(AppContext);

export function AppShell() {
  const [screen, setScreen] = useState<Screen>('dashboard');
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; text: string; success?: boolean }[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [userStreams, setUserStreams] = useState<string[]>(CURRENT_USER.streams);
  const [activeStreamFilter, setActiveStreamFilter] = useState<string | null>(null);
  const [showStreamPicker, setShowStreamPicker] = useState(false);

  const toggleStream = useCallback((id: string) => {
    setUserStreams(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  }, []);

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

  const completeOnboarding = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('myc-onboarded', '1');
    }
    setShowOnboarding(false);
  }, []);

  const navigateTo = useCallback((s: string) => setScreen(s as Screen), []);

  if (showOnboarding) {
    return <Onboarding onComplete={completeOnboarding} />;
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

  return (
    <AppContext.Provider value={{ userStreams, toggleStream, setUserStreams, activeStreamFilter, setActiveStreamFilter }}>
      <div className="myc-app">
        <aside className="myc-sidebar">
          <div className="myc-brand" onClick={() => setScreen('dashboard')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Mycelium" style={{ width: 36, height: 36, objectFit: 'contain', flexShrink: 0 }} />
            <div>
              <div className="myc-brand-name">Mycelium</div>
              <div className="myc-brand-sub">Movement Infrastructure</div>
            </div>
          </div>

          <button className="myc-cmdk-btn" onClick={() => setCmdkOpen(true)}>
            <Icon name="search" size={14} />
            <span>Search or ask…</span>
            <span className="myc-kbd">⌘K</span>
          </button>

          <div className="myc-nav-section">
            {nav.map(item => (
              <button key={item.id}
                className={`myc-nav-item ${screen === item.id ? 'is-active' : ''}`}
                onClick={() => { setScreen(item.id); setActiveStreamFilter(null); }}>
                <NavGlyph id={item.id} fallback={item.icon} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="myc-nav-divider" />

          <div className="myc-nav-section">
            <div className="myc-nav-label">Your Streams</div>
            {userStreams.map(sid => {
              const s = streamById(sid);
              return (
                <button key={sid}
                  className={`myc-nav-stream ${activeStreamFilter === sid ? 'is-active' : ''}`}
                  style={activeStreamFilter === sid ? {
                    background: `${s.color}14`,
                    color: s.color,
                    fontWeight: 700,
                    boxShadow: `inset 3px 0 0 ${s.color}`,
                  } : undefined}
                  onClick={() => {
                    setActiveStreamFilter(activeStreamFilter === sid ? null : sid);
                    if (screen !== 'dashboard') setScreen('dashboard');
                  }}>
                  <span className="myc-stream-dot" style={{
                    background: s.dot,
                    boxShadow: activeStreamFilter === sid ? `0 0 0 2px ${s.color}33` : undefined,
                  }} />
                  <span>{s.label}</span>
                </button>
              );
            })}
            <button className="myc-nav-stream myc-nav-stream-add" onClick={() => setShowStreamPicker(p => !p)}>
              <Icon name="plus" size={12} /> <span>Add a stream</span>
            </button>
            {showStreamPicker && (
              <div style={{ background: 'var(--myc-surface)', border: '1px solid var(--myc-border-soft)', borderRadius: 10, padding: 8, margin: '4px 0', display: 'flex', flexDirection: 'column', gap: 2 }}>
                {STREAMS.filter(s => !userStreams.includes(s.id)).map(s => (
                  <button key={s.id} className="myc-nav-stream" onClick={() => { toggleStream(s.id); setShowStreamPicker(false); toast(`Added ${s.short} to your streams.`); }} style={{ padding: '6px 10px' }}>
                    <span className="myc-stream-dot" style={{ background: s.dot }} />
                    <span>{s.label}</span>
                  </button>
                ))}
                {STREAMS.filter(s => !userStreams.includes(s.id)).length === 0 && (
                  <div style={{ fontSize: 12, color: 'var(--myc-text-3)', padding: '6px 10px' }}>All streams added</div>
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
                <NavGlyph id={item.id} fallback={item.icon} />
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
            <Avatar person={CURRENT_USER} size={32} />
            <div className="myc-sb-foot-meta">
              <div className="myc-sb-foot-name">{CURRENT_USER.name}</div>
              <div className="myc-sb-foot-org">{org.name}</div>
            </div>
            <Icon name="bell" size={16} style={{ color: 'var(--myc-text-2)' }} />
          </div>
        </aside>

        <main className="myc-main">
          {activeStreamFilter && (() => {
            const s = streamById(activeStreamFilter);
            return (
              <div className="myc-filter-banner" style={{
                background: `${s.color}10`,
                borderBottom: `1px solid ${s.color}33`,
                color: s.color,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: s.dot, display: 'inline-block', boxShadow: `0 0 0 3px ${s.color}22` }} />
                <span style={{ color: 'var(--myc-text)' }}>
                  Filtering by <strong style={{ color: s.color }}>{s.label}</strong> across your dashboard.
                </span>
                <button
                  onClick={() => setActiveStreamFilter(null)}
                  style={{
                    marginLeft: 'auto', background: 'transparent', border: 0, cursor: 'pointer',
                    fontFamily: 'inherit', fontSize: 12.5, fontWeight: 600, color: s.color,
                    padding: '4px 8px', borderRadius: 6,
                  }}
                >
                  Clear filter
                </button>
              </div>
            );
          })()}
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
          onAskAI={(q) => { setScreen('knowledge'); }}
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
