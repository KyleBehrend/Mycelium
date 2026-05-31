'use client';

import { useState, useEffect, useRef } from 'react';
import { Icon, StreamBadge, StreamIcon, StreamFilterBar, Avatar, Card, Button, ScreenHeader, MyceliumMark } from '@/components/ui';
import { CURRENT_USER, KNOWLEDGE_DOCS, LEARNING_FEED, streamById, matchesStream } from '@/lib/data';
import { useAppContext } from '@/components/app-shell';

export function KnowledgeHub({ onToast }: { onToast: (t: string) => void }) {
  const [tab, setTab] = useState('chat');
  const [chatKey, setChatKey] = useState(0);
  const [freshThread, setFreshThread] = useState(false);
  const newThread = () => { setChatKey(k => k + 1); setFreshThread(true); };
  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader
        eyebrow="Knowledge Hub"
        title="The collective memory of the movement"
        subtitle="Search across summit transcripts, SPAA curriculum, retail playbooks, campaign post-mortems, and Faunalytics research. Ask in plain language — the assistant cites sources."
        actions={<Button variant="secondary" icon="plus" onClick={newThread}>New thread</Button>}
      />
      <div className="myc-tabs">
        <button className={`myc-tab ${tab === 'chat' ? 'is-active' : ''}`} onClick={() => setTab('chat')}>AI Assistant</button>
        <button className={`myc-tab ${tab === 'library' ? 'is-active' : ''}`} onClick={() => setTab('library')}>Resource Library</button>
        <button className={`myc-tab ${tab === 'feed' ? 'is-active' : ''}`} onClick={() => setTab('feed')}>Learning Feed</button>
      </div>
      {tab === 'chat' && <ChatPanel key={chatKey} onToast={onToast} fresh={freshThread} />}
      {tab === 'library' && <LibraryPanel onToast={onToast} />}
      {tab === 'feed' && <LearningFeedPanel />}
    </div>
  );
}

type ChatMsg = {
  role: 'user' | 'assistant';
  content: React.ReactNode;
  sources?: { tag: string; label: string; note: string }[];
};

function ChatPanel({ onToast, fresh }: { onToast: (t: string) => void; fresh?: boolean }) {
  const SAMPLE_THREAD: ChatMsg[] = [
    { role: 'user', content: 'What are the best practices for retail engagement campaigns in Northern Europe?' },
    {
      role: 'assistant',
      content: (
        <>
          <p>Based on the SPAA Retail Engagement Playbook, the Albert Heijn case study, and Tom&aacute;&scaron; Nov&aacute;k&apos;s recent learning, four patterns hold consistently across NL/DK/SE pilots:</p>
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
        { tag: 'l-retail', label: "Tomáš Novák — \"The retail buyer doesn't care about your values\"", note: 'Learning · 1 week ago' },
        { tag: 'd-4', label: "Summit '25 — Track: Retail (Workshop transcripts)", note: 'Vienna · Jan 2026' },
        { tag: 'lf-2', label: 'Albert Heijn doubles private-label plant-based SKUs', note: 'Reuters · 8h ago' },
      ],
    },
  ];

  const [messages, setMessages] = useState<ChatMsg[]>(fresh ? [] : SAMPLE_THREAD);
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (threadRef.current) threadRef.current.scrollTop = threadRef.current.scrollHeight;
  }, [messages, thinking]);

  const send = (text?: string) => {
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
            <p>I checked across the SPAA materials and the most recent summit transcripts. Three threads worth pulling:</p>
            <ul>
              <li>The <strong>2024 Vienna workshop on coalition strategy</strong> (Track Lead: Elena Marchetti) covers most of this — particularly the EU-level fragmentation problem.</li>
              <li>Stray Dog Institute&apos;s <strong>grant proposal templates</strong> include a &ldquo;movement-wide coordination&rdquo; section you can adapt.</li>
              <li>Marcus Halberg shared a learning on this last week — short, blunt, and useful.</li>
            </ul>
            <p>I can draft a discussion prompt for your next track call if that would help.</p>
          </>
        ),
        sources: [
          { tag: 'd-4', label: "Summit '25 — Coalition Strategy session", note: 'Vienna · Jan 2026' },
          { tag: 'd-7', label: 'SDI Grant Proposal Templates', note: '3-page format · Feb 2026' },
          { tag: 'l-grant', label: 'Marcus Halberg — "Three-page proposals get funded"', note: 'Learning · 2 weeks ago' },
        ],
      }]);
      setThinking(false);
    }, 1200);
  };

  const suggestions = [
    'Draft talking points for the EU dietary guidelines consultation',
    "What's worked for default-plant menus in school systems?",
    "Summarize last year's summit policy track in 5 bullets",
    'Which orgs in our network have run successful MEP outreach?',
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24, minHeight: 480 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--myc-text-3)', letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>Recent threads</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {[
            { title: 'Retail engagement — Northern Europe', when: 'just now', active: true },
            { title: 'EU dietary guidelines submission templates', when: '2h ago', active: false },
            { title: 'Funding strategy for small advocacy orgs', when: 'yesterday', active: false },
            { title: 'Cultivated meat consumer language', when: '3 days ago', active: false },
            { title: 'Default-plant menus in school systems', when: '1 week ago', active: false },
          ].map((t, i) => (
            <button key={i} onClick={() => { if (!t.active) onToast(`Opening thread: "${t.title}"`); }} style={{
              textAlign: 'left', padding: '10px 12px', borderRadius: 8,
              background: t.active ? 'var(--myc-surface-2)' : 'transparent',
              border: 0, cursor: 'pointer', fontFamily: 'inherit',
            }}>
              <div style={{ fontSize: 12.5, fontWeight: t.active ? 600 : 500, color: 'var(--myc-text)', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{t.title}</div>
              <div style={{ fontSize: 11, color: 'var(--myc-text-2)', marginTop: 3 }}>{t.when}</div>
            </button>
          ))}
        </div>
      </div>

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
          {messages.length <= 1 && !thinking && (
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
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, padding: '12px 14px', background: 'var(--myc-surface)', border: '1px solid var(--myc-border)', borderRadius: 14, boxShadow: 'var(--myc-shadow-sm)', maxWidth: 760, margin: '0 auto' }}>
            <textarea
              value={draft} onChange={e => setDraft(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask anything about the movement's collective knowledge…"
              rows={1}
              style={{ flex: 1, border: 0, resize: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-sans)', fontSize: 14, lineHeight: 1.5, minHeight: 22, maxHeight: 140, color: 'var(--myc-text)' }}
            />
            <button onClick={() => send()} disabled={!draft.trim()}
              style={{
                background: draft.trim() ? 'var(--myc-primary)' : 'var(--myc-surface-2)',
                color: draft.trim() ? '#fff' : 'var(--myc-text-3)',
                border: 0, borderRadius: 8, padding: '8px 12px',
                cursor: draft.trim() ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, transition: 'all 0.12s', fontFamily: 'inherit',
              }}>
              <Icon name="send" size={14} /> Ask
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

function ChatMessage({ message }: { message: ChatMsg }) {
  const isUser = message.role === 'user';
  return (
    <div className="myc-msg">
      {isUser ? (
        <Avatar person={CURRENT_USER} size={32} />
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

function LibraryPanel({ onToast }: { onToast: (t: string) => void }) {
  const { activeStreams, toggleStreamFilter, clearStreamFilter } = useAppContext();
  const [search, setSearch] = useState('');

  const filtered = KNOWLEDGE_DOCS.filter(d =>
    matchesStream(d.stream, activeStreams) &&
    (search === '' || d.title.toLowerCase().includes(search.toLowerCase()) || d.source.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 6 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon name="search" size={15} style={{ position: 'absolute', left: 12, top: 11, color: 'var(--myc-text-3)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search 1,247 resources…"
            style={{ width: '100%', padding: '9px 12px 9px 36px', border: '1px solid var(--myc-border)', borderRadius: 10, fontSize: 13.5, fontFamily: 'inherit', background: 'var(--myc-surface)', outline: 'none' }} />
        </div>
        <Button variant="primary" icon="plus" onClick={() => onToast('Upload coming next — chunk & embed pipeline ready.')}>Upload</Button>
      </div>
      <StreamFilterBar active={activeStreams} onToggle={toggleStreamFilter} onClear={clearStreamFilter} />
      <div className="myc-res-grid">
        {filtered.length === 0
          ? <div className="myc-empty">Nothing in this stream yet — try another aisle.</div>
          : filtered.map(d => {
            const s = streamById(d.stream);
            return (
              <div key={d.id} className="myc-res" style={{ ['--ac' as string]: s.color } as React.CSSProperties}
                onClick={() => onToast(`Opening "${d.title}"`)}>
                <div className="myc-res-top">
                  <StreamIcon stream={d.stream} size={54} />
                  <span className="myc-res-type">{d.type.replace(/_/g, ' ')}</span>
                </div>
                <div className="myc-res-ti">{d.title}</div>
                <div className="myc-res-meta">{d.source} · {d.updated} · {d.size}</div>
                <div className="myc-res-ft">
                  <StreamBadge stream={d.stream} />
                  <span className="myc-res-dl">↓ {d.downloads}</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

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
        {LEARNING_FEED.map(item => (
          <div key={item.id} className="myc-feed-item">
            <StreamIcon stream={item.stream} size={54} />
            <div className="myc-feed-body">
              <div className="myc-feed-meta">
                <span style={{ color: 'var(--myc-accent)', fontWeight: 600 }}>AI summary</span><span>·</span><span>{item.source} · {item.when}</span>
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
