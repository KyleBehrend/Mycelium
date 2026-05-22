// Mycelium — Main App Shell

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "forest",
  "density": "cozy",
  "sidebar": "light",
  "ai_placement": "page",
  "show_onboarding": false
}/*EDITMODE-END*/;

function App() {
  const [tw, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [screen, setScreen] = useState(tw.show_onboarding ? 'onboarding' : 'dashboard');

  // If the user clicks "Show onboarding" tweak, switch to it
  useEffect(() => {
    if (tw.show_onboarding && screen !== 'onboarding') setScreen('onboarding');
  }, [tw.show_onboarding]);
  const [cmdkOpen, setCmdkOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Apply palette tweak
  useEffect(() => {
    const root = document.documentElement;
    const palettes = {
      forest:  { primary: '#1B4332', primary2: '#2D6A4F', accent: '#40916C', accent2: '#74C69D', warm: '#D4A373', bg: '#FAFAF8' },
      ember:   { primary: '#5C2A1E', primary2: '#8C3F2E', accent: '#C16A4B', accent2: '#E5A284', warm: '#E8B86E', bg: '#FBF7F3' },
      indigo:  { primary: '#1E2A4A', primary2: '#2E4172', accent: '#5470B5', accent2: '#8FA8D9', warm: '#D9A86A', bg: '#F8F8FB' },
      mono:    { primary: '#1A1A1A', primary2: '#3A3A3A', accent: '#666',    accent2: '#A0A0A0', warm: '#D4A373', bg: '#F7F6F2' },
    };
    const p = palettes[tw.palette] || palettes.forest;
    root.style.setProperty('--myc-primary', p.primary);
    root.style.setProperty('--myc-primary-2', p.primary2);
    root.style.setProperty('--myc-accent', p.accent);
    root.style.setProperty('--myc-accent-2', p.accent2);
    root.style.setProperty('--myc-warm', p.warm);
    root.style.setProperty('--myc-bg', p.bg);

    if (tw.density === 'compact') {
      root.style.setProperty('--myc-density-scale', '0.92');
      document.body.style.fontSize = '13.5px';
    } else if (tw.density === 'spacious') {
      document.body.style.fontSize = '15px';
    } else {
      document.body.style.fontSize = '14px';
    }
  }, [tw.palette, tw.density]);

  // ⌘K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdkOpen(o => !o);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const toast = useCallback((message, kind = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(ts => [...ts, { id, message, kind }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 3200);
  }, []);

  const navigate = (s) => setScreen(s);

  // Onboarding takes the whole viewport
  if (screen === 'onboarding') {
    return (
      <>
        <Onboarding onComplete={() => setScreen('dashboard')} />
        <Toasts toasts={toasts} />
      </>
    );
  }

  // Apply sidebar tweak
  const sidebarClass = tw.sidebar === 'dark' ? 'myc-sidebar-dark' : '';

  return (
    <div className="myc-app" data-screen-label={`Mycelium · ${screen}`}>
      <div className={sidebarClass}>
        <Sidebar current={screen} onNav={navigate} onOpenCmdK={() => setCmdkOpen(true)} />
      </div>
      <main className="myc-main">
        {screen === 'dashboard' && <Dashboard onNav={navigate} onToast={toast} />}
        {screen === 'knowledge' && <KnowledgeHub onToast={toast} />}
        {screen === 'calendar'  && <CampaignCalendar onToast={toast} />}
        {screen === 'community' && <Community onToast={toast} />}
        {screen === 'directory' && <Directory onToast={toast} />}
        {screen === 'admin'     && <Admin onToast={toast} />}
        {screen === 'settings'  && <Settings onToast={toast} />}
      </main>

      <CommandPalette open={cmdkOpen} onClose={() => setCmdkOpen(false)}
        onNav={navigate}
        onAskAI={(q) => { setScreen('knowledge'); toast('Opening assistant…'); }} />

      <MyceliumTweaks tw={tw} setTweak={setTweak} />
      <Toasts toasts={toasts} />
    </div>
  );
}

function Toasts({ toasts }) {
  return (
    <div className="myc-toast-stack">
      {toasts.map(t => (
        <div key={t.id} className={`myc-toast ${t.kind === 'success' ? 'is-success' : ''}`}>
          <Icon name="check" size={15} />
          {t.message}
        </div>
      ))}
    </div>
  );
}

function MyceliumTweaks({ tw, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Visual" />
      <TweakRadio label="Palette" value={tw.palette}
        options={['forest', 'ember', 'indigo', 'mono']}
        onChange={(v) => setTweak('palette', v)} />
      <TweakRadio label="Density" value={tw.density}
        options={['cozy', 'compact', 'spacious']}
        onChange={(v) => setTweak('density', v)} />
      <TweakRadio label="Sidebar" value={tw.sidebar}
        options={['light', 'dark']}
        onChange={(v) => setTweak('sidebar', v)} />
      <TweakSection label="Flow" />
      <TweakButton label="Re-run onboarding"
        onClick={() => setTweak('show_onboarding', true)} />
    </TweaksPanel>
  );
}
