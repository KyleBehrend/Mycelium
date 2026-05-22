// Mycelium — Knowledge Hub Screen (chat + library + learning feed)

function KnowledgeHub({ onToast }) {
  const [tab, setTab] = useState('chat');
  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader
        eyebrow="Knowledge Hub"
        title="The collective memory of the movement"
        subtitle="Search across summit transcripts, SPA curriculum, retail playbooks, campaign post-mortems, and Faunalytics research. Ask in plain language — the assistant cites sources."
        actions={
          <Button variant="secondary" icon="plus">New thread</Button>
        }
      />
      <div className="myc-tabs">
        <button className={`myc-tab ${tab === 'chat' ? 'is-active' : ''}`} onClick={() => setTab('chat')}>AI Assistant</button>
        <button className={`myc-tab ${tab === 'library' ? 'is-active' : ''}`} onClick={() => setTab('library')}>Resource Library</button>
        <button className={`myc-tab ${tab === 'feed' ? 'is-active' : ''}`} onClick={() => setTab('feed')}>Learning Feed</button>
      </div>
      {tab === 'chat' && <ChatPanel onToast={onToast} />}
      {tab === 'library' && <LibraryPanel onToast={onToast} />}
      {tab === 'feed' && <LearningFeedPanel />}
    </div>
  );
}

// ========== Chat ==========
function ChatPanel({ onToast }) {
  const SAMPLE_THREAD = [
    {
      role: 'user',
      content: 'What are the best practices for retail engagement campaigns in Northern Europe?',
    },
    {
      role: 'assistant',
      content: (
        <>
          <p>Based on the SPA Retail Engagement Playbook, the Albert Heijn case study, and Tomáš Novák's recent learning, four patterns hold consistently across NL/DK/SE pilots:</p>
          <ol style={{ paddingLeft: 22, margin: '8px 0' }}>
            <li><strong>Lead with SKU economics, not values.</strong> The pitch that lands is basket-uplift data from comparable launches, plus a clean shelf plan. Mission framing loses the room.</li>
            <li><strong>Default-plant private label outperforms branded SKUs.</strong> The Albert Heijn 2025 launch hit 18% category share within 6 months by going own-brand first.</li>
            <li><strong>Pair launches with a co-branded dietitian endorsement.</strong> Used in both DK and NL; correlates with 11–14pp higher trial rates in store.</li>
            <li><strong>The buyer cycle is 9–14 months.</strong> Plan accordingly — start conversations a year out, not at campaign launch.</li>
          </ol>
          <p style={{ marginTop: 12 }}>Want me to pull together a one-page summary you can hand a retail buyer?</p>
        </>
      ),
      sources: [
        { tag: 'd-2', label: 'Retail Engagement Playbook — Northern Europe', note: 'ProVeg + Albert Schweitzer · May 2026' },
        { tag: 'l-retail', label: 'Tomáš Novák — "The retail buyer doesn\'t care about your values"', note: 'Learning · 1 week ago' },
        { tag: 'd-4', label: 'Summit \'25 — Track: Retail (Workshop transcripts)', note: 'Vienna · Jan 2026' },
        { tag: 'lf-2', label: 'Albert Heijn doubles private-label plant-based SKUs', note: 'Reuters · 8h ago' },
      ],
    },
  ];

  const [messages, setMessages] = useState(SAMPLE_THREAD);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const threadRef = useRef(null);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text) => {
    const t = (text || draft).trim();
    if (!t) return;
    setMessages(m => [...m, { role: 'user', content: t }]);
    setDraft('');
    setThinking(true);
    setTimeout(() => {
      setMessages(m => [...m, {
        role: 'assistant',
        content: (
          <>
            <p>I checked across the SPA materials and the most recent summit transcripts. Three threads worth pulling:</p>
            <ul>
              <li>The <strong>2024 Vienna workshop on coalition strategy</strong> (Track Lead: Elena Marchetti) covers most of this — particularly the EU-level fragmentation problem.</li>
              <li>Stray Dog Institute's <strong>grant proposal templates</strong> include a "movement-wide coordination" section you can adapt.</li>
              <li>Marcus Halberg shared a learning on this last week — short, blunt, and useful.</li>
            </ul>
            <p>I can draft a discussion prompt for your next track call if that would help.</p>
          </>
        ),
        sources: [
          { tag: 'd-4', label: 'Summit \'25 — Coalition Strategy session', note: 'Vienna · Jan 2026' },
          { tag: 'd-7', label: 'SDI Grant Proposal Templates', note: '3-page format · Feb 2026' },
          { tag: 'l-grant', label: 'Marcus Halberg — "Three-page proposals get funded"', note: 'Learning · 2 weeks ago' },
        ],
      }]);
      setThinking(false);
    }, 1200);
  };

  const suggestions = [
    'Draft talking points for the EU dietary guidelines consultation',
    'What\'s worked for default-plant menus in school systems?',
    'Summarize last year\'s summit policy track in 5 bullets',
    'Which orgs in our network have run successful MEP outreach?',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, minHeight: 480 }}>
      {/* Thread sidebar */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--myc-text-3)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>Recent threads</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { title: 'Retail engagement — Northern Europe', when: 'just now', active: true },
            { title: 'EU dietary guidelines submission templates', when: '2h ago' },
            { title: 'Funding strategy for small advocacy orgs', when: 'yesterday' },
            { title: 'Cultivated meat consumer language', when: '3 days ago' },
            { title: 'Default-plant menus in school systems', when: '1 week ago' },
          ].map((t, i) => (
            <button key={i} style={{
              textAlign: 'left', padding: '10px 12px', borderRadius: 8,
              background: t.active ? 'var(--myc-surface-2)' : 'transparent',
              border: 0, cursor: 'pointer',
              fontFamily: 'inherit',
            }}>
              <div style={{ fontSize: 12.5, fontWeight: t.active ? 600 : 500, color: 'var(--myc-text)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.title}</div>
              <div style={{ fontSize: 11, color: 'var(--myc-text-2)', marginTop: 3 }}>{t.when}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat panel */}
      <Card padding="md" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden', minHeight: 600 }}>
        <div ref={threadRef} style={{ flex: 1, overflowY: 'auto', padding: '20px 28px' }}>
          {messages.map((m, i) => (
            <ChatMessage key={i} message={m} />
          ))}
          {thinking && (
            <div className="myc-msg">
              <div style={{ width: 32, height: 32, borderRadius: 999, background: 'linear-gradient(135deg, #2D6A4F, #74C69D)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <MyceliumMark size={20} color="#fff" />
              </div>
              <div className="myc-msg-bubble">
                <div className="myc-msg-role">Mycelium</div>
                <div style={{ display: 'flex', gap: 5, padding: '6px 0' }}>
                  <span className="myc-dot-bounce" style={{ animationDelay: '0s' }} />
                  <span className="myc-dot-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="myc-dot-bounce" style={{ animationDelay: '0.3s' }} />
                </div>
              </div>
            </div>
          )}
          {messages.length === 1 && !thinking && (
            <div className="myc-chat-suggest">
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--myc-text-3)', letterSpacing: 0.6, textTransform: 'uppercase' }}>Try asking</div>
              {suggestions.map((s, i) => (
                <button key={i} className="myc-chat-suggest-btn" onClick={() => send(s)}>
                  <Icon name="sparkles" size={14} style={{ color: 'var(--myc-accent)' }} />
                  <span>{s}</span>
                  <Icon name="arrow" size={14} className="arrow" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div style={{ borderTop: '1px solid var(--myc-border-soft)', padding: '14px 20px 18px', background: 'var(--myc-surface)' }}>
          <div className="myc-chat-input">
            <textarea
              value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask anything about the movement's collective knowledge…"
              rows={1}
            />
            <button onClick={() => send()} disabled={!draft.trim()}
              style={{
                background: draft.trim() ? 'var(--myc-primary)' : 'var(--myc-surface-2)',
                color: draft.trim() ? '#fff' : 'var(--myc-text-3)',
                border: 0, borderRadius: 8, padding: '8px 12px',
                cursor: draft.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, transition: 'all 0.12s',
                fontFamily: 'inherit',
              }}>
              <Icon name="send" size={14} />
              Ask
            </button>
          </div>
          <div style={{ fontSize: 11, color: 'var(--myc-text-3)', textAlign: 'center', marginTop: 8 }}>
            Answers cite their sources. Knowledge base updated nightly · 1,247 documents indexed.
          </div>
        </div>
      </Card>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className="myc-msg">
      {isUser ? (
        <Avatar person={window.CURRENT_USER} size={32} />
      ) : (
        <div style={{ width: 32, height: 32, borderRadius: 999, background: 'linear-gradient(135deg, #2D6A4F, #74C69D)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <MyceliumMark size={20} color="#fff" />
        </div>
      )}
      <div className="myc-msg-bubble">
        <div className="myc-msg-role">{isUser ? 'You' : 'Mycelium'}</div>
        <div className="myc-msg-content">
          {typeof message.content === 'string' ? <p>{message.content}</p> : message.content}
        </div>
        {message.sources && (
          <div className="myc-msg-sources">
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase', color: 'var(--myc-text-2)', marginBottom: 4 }}>
              Sources · {message.sources.length}
            </div>
            {message.sources.map((s, i) => (
              <div className="myc-msg-source" key={i}>
                <span className="myc-msg-source-tag">{s.tag}</span>
                <span style={{ color: 'var(--myc-text)', fontWeight: 500 }}>{s.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11.5 }}>{s.note}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ========== Resource Library ==========
function LibraryPanel({ onToast }) {
  const [view, setView] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = window.KNOWLEDGE_DOCS.filter(d =>
    (filter === 'all' || d.stream === filter) &&
    (search === '' || d.title.toLowerCase().includes(search.toLowerCase()) || d.source.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 14 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon name="search" size={15} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--myc-text-3)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search 1,247 resources…"
            style={{
              width: '100%', padding: '9px 12px 9px 36px',
              border: '1px solid var(--myc-border)', borderRadius: 8,
              fontSize: 13.5, fontFamily: 'inherit',
              background: 'var(--myc-surface)',
              outline: 'none',
            }} />
        </div>
        <div style={{ display: 'flex', gap: 1, background: 'var(--myc-surface-2)', padding: 2, borderRadius: 7 }}>
          <button onClick={() => setView('grid')} style={{ padding: '6px 8px', background: view === 'grid' ? '#fff' : 'transparent', border: 0, borderRadius: 5, cursor: 'pointer', color: view === 'grid' ? 'var(--myc-primary)' : 'var(--myc-text-2)' }}><Icon name="grid" size={14} /></button>
          <button onClick={() => setView('list')} style={{ padding: '6px 8px', background: view === 'list' ? '#fff' : 'transparent', border: 0, borderRadius: 5, cursor: 'pointer', color: view === 'list' ? 'var(--myc-primary)' : 'var(--myc-text-2)' }}><Icon name="list" size={14} /></button>
        </div>
        <Button variant="primary" icon="plus" onClick={() => onToast('Upload coming next — chunk & embed pipeline ready.')}>Upload</Button>
      </div>
      <div className="myc-pill-row">
        <button className={`myc-pill ${filter === 'all' ? 'is-active' : ''}`} onClick={() => setFilter('all')}>All streams</button>
        {window.STREAMS.map(s => (
          <button key={s.id} className={`myc-pill ${filter === s.id ? 'is-active' : ''}`} onClick={() => setFilter(s.id)}>
            <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: 999, background: s.dot, marginRight: 6, transform: 'translateY(-1px)' }} />
            {s.short}
          </button>
        ))}
      </div>

      {view === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {filtered.map(d => <DocCard key={d.id} doc={d} onToast={onToast} />)}
        </div>
      ) : (
        <Card padding="md" style={{ padding: 0 }}>
          {filtered.map((d, i) => (
            <div key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderBottom: i === filtered.length - 1 ? 'none' : '1px solid var(--myc-border-soft)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: window.streamById(d.stream).color + '18', color: window.streamById(d.stream).color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="book" size={16} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{d.title}</div>
                <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', marginTop: 2 }}>{d.source} · {d.updated} · {d.size}</div>
              </div>
              <StreamBadge stream={d.stream} />
              <span style={{ fontSize: 11.5, color: 'var(--myc-text-2)', minWidth: 80, textAlign: 'right' }}>{d.downloads} downloads</span>
              <Button variant="ghost" size="sm" icon="download" onClick={() => onToast(`Downloaded "${d.title}"`)}></Button>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function DocCard({ doc, onToast }) {
  const s = window.streamById(doc.stream);
  return (
    <Card padding="md" accent={s.color} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10, minHeight: 180 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--myc-text-2)' }}>{doc.type.replace(/_/g, ' ')}</div>
        <button onClick={(e) => { e.stopPropagation(); onToast('Saved to bookmarks.'); }} style={{ background: 'transparent', border: 0, padding: 4, cursor: 'pointer', color: 'var(--myc-text-3)' }}>
          <Icon name="bookmark" size={14} />
        </button>
      </div>
      <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.35, color: 'var(--myc-text)', textWrap: 'pretty', flex: 1 }}>{doc.title}</div>
      <div style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>{doc.source}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <StreamBadge stream={doc.stream} />
        <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--myc-text-2)' }}>{doc.size} · {doc.downloads} ↓</span>
      </div>
    </Card>
  );
}

// ========== Learning Feed ==========
function LearningFeedPanel() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 14 }}>
        <p style={{ fontSize: 13.5, color: 'var(--myc-text-2)', margin: 0, maxWidth: 580 }}>
          AI-summarized news and research relevant to your streams. Updates every 6 hours. Source-attributed. Mark items as helpful to train the filter.
        </p>
        <div className="myc-pill-row" style={{ marginBottom: 0 }}>
          <button className="myc-pill is-active">All</button>
          <button className="myc-pill">In your streams</button>
          <button className="myc-pill">Featured</button>
        </div>
      </div>
      <div className="myc-grid-feed">
        {window.LEARNING_FEED.map(item => (
          <div key={item.id} className="myc-feed-item">
            <div className="myc-feed-icon" style={{ background: 'linear-gradient(135deg, #5E548E, #9F86C0)' }}>
              <Icon name="sparkles" size={18} />
            </div>
            <div className="myc-feed-body">
              <div className="myc-feed-meta">
                <span style={{ color: 'var(--myc-primary)', fontWeight: 600 }}>AI summary</span>
                <span>·</span>
                <span>{item.source} · {item.when}</span>
              </div>
              <div className="myc-feed-title">{item.title}</div>
              <div className="myc-feed-snippet">{item.summary}</div>
              <div className="myc-feed-actions">
                <StreamBadge stream={item.stream} />
                <Button variant="ghost" size="sm" icon="heart">Helpful</Button>
                <Button variant="ghost" size="sm" icon="bookmark">Save</Button>
                <Button variant="ghost" size="sm" icon="external">Source</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { KnowledgeHub });
