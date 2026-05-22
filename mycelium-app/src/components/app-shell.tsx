'use client';

import { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Icon, MyceliumMark, Avatar } from '@/components/ui';
import { CURRENT_USER, STREAMS, streamById, orgById } from '@/lib/data';
import { Dashboard } from '@/components/screens/dashboard';
import { KnowledgeHub } from '@/components/screens/knowledge';
import { CampaignCalendar } from '@/components/screens/calendar';
import { Community } from '@/components/screens/community';
import { Directory } from '@/components/screens/directory';
import { Admin } from '@/components/screens/admin';
import { Settings } from '@/components/screens/settings';
import { Onboarding } from '@/components/screens/onboarding';
import { CommandPalette } from '@/components/command-palette';

type Screen = 'dashboard' | 'knowledge' | 'calendar' | 'community' | 'directory' | 'admin' | 'settings' | 'onboarding';

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

  const navigateTo = useCallback((s: string) => setScreen(s as Screen), []);

  if (showOnboarding) {
    return <Onboarding onComplete={() => setShowOnboarding(false)} />;
  }

  const nav = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: 'home' },
    { id: 'knowledge' as const, label: 'Knowledge Hub', icon: 'sparkles' },
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
            <MyceliumMark size={28} color="var(--myc-primary)" />
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
                <Icon name={item.icon} size={17} />
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
                  style={activeStreamFilter === sid ? { background: 'var(--myc-surface-2)', color: 'var(--myc-text)', fontWeight: 600 } : undefined}
                  onClick={() => {
                    setActiveStreamFilter(activeStreamFilter === sid ? null : sid);
                    if (screen !== 'dashboard') setScreen('dashboard');
                  }}>
                  <span className="myc-stream-dot" style={{ background: s.dot }} />
                  <span>{s.label}</span>
                </button>
              );
            })}
            <button className="myc-nav-stream myc-nav-stream-add" onClick={() => setScreen('settings')}>
              <Icon name="plus" size={12} /> <span>Add a stream</span>
            </button>
          </div>

          <div className="myc-nav-divider" />

          <div className="myc-nav-section">
            {second.map(item => (
              <button key={item.id}
                className={`myc-nav-item ${screen === item.id ? 'is-active' : ''}`}
                onClick={() => setScreen(item.id)}>
                <Icon name={item.icon} size={17} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

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
          {screen === 'dashboard' && <Dashboard onNav={navigateTo} onToast={toast} />}
          {screen === 'knowledge' && <KnowledgeHub onToast={toast} />}
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
