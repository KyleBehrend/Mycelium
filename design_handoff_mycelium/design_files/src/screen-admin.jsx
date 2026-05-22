// Mycelium — Admin Panel

function Admin({ onToast }) {
  const [tab, setTab] = useState('users');
  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader
        eyebrow="Admin"
        title="Platform health"
        subtitle="User management, knowledge base ingestion, content moderation, and analytics. Visible only to Admin and Track Lead roles."
      />
      <div className="myc-tabs">
        <button className={`myc-tab ${tab === 'users' ? 'is-active' : ''}`} onClick={() => setTab('users')}>Users & Invites</button>
        <button className={`myc-tab ${tab === 'content' ? 'is-active' : ''}`} onClick={() => setTab('content')}>Knowledge Ingestion</button>
        <button className={`myc-tab ${tab === 'analytics' ? 'is-active' : ''}`} onClick={() => setTab('analytics')}>Analytics</button>
        <button className={`myc-tab ${tab === 'moderation' ? 'is-active' : ''}`} onClick={() => setTab('moderation')}>Moderation</button>
      </div>
      {tab === 'users' && <AdminUsers onToast={onToast} />}
      {tab === 'content' && <AdminContent onToast={onToast} />}
      {tab === 'analytics' && <AdminAnalytics />}
      {tab === 'moderation' && <AdminModeration onToast={onToast} />}
    </div>
  );
}

function AdminUsers({ onToast }) {
  const pending = [
    { name: 'Helga Andersson', org: 'Nordic Plant Alliance', country: 'Sweden', invited_by: 'Mara Lindqvist', when: '2h ago' },
    { name: 'Bartosz Kwiatkowski', org: 'ProVeg Polska', country: 'Poland', invited_by: 'Tomáš Novák', when: '6h ago' },
    { name: 'Lena Vogel', org: 'Albert Schweitzer Stiftung', country: 'Germany', invited_by: 'Anke Hoffmann', when: 'yesterday' },
  ];
  return (
    <div>
      <div className="myc-grid-3" style={{ marginBottom: 20 }}>
        <Card padding="md">
          <div className="myc-stat-label">Total members</div>
          <div className="myc-stat-num" style={{ fontSize: 32 }}>142</div>
          <div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>+18 this month</div>
        </Card>
        <Card padding="md">
          <div className="myc-stat-label">Pending approval</div>
          <div className="myc-stat-num" style={{ fontSize: 32 }}>3</div>
          <div style={{ fontSize: 12, color: 'var(--myc-warm-deep)' }}>Oldest waiting: 6 hours</div>
        </Card>
        <Card padding="md">
          <div className="myc-stat-label">Open invitations</div>
          <div className="myc-stat-num" style={{ fontSize: 32 }}>7</div>
          <div style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>2 expiring this week</div>
        </Card>
      </div>

      <Card padding="md" style={{ marginBottom: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: 0 }}>Pending approvals</h3>
          <Button variant="secondary" size="sm">Approve all from summit list</Button>
        </div>
        {pending.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 0', borderBottom: i === pending.length - 1 ? 'none' : '1px solid var(--myc-border-soft)' }}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--myc-surface-2)', color: 'var(--myc-text-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontFamily: 'DM Sans', fontWeight: 600 }}>{p.name.split(' ').map(x => x[0]).join('')}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--myc-text-2)' }}>{p.org} · {p.country} · invited by {p.invited_by} · {p.when}</div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onToast('Declined')}>Decline</Button>
            <Button variant="primary" size="sm" icon="check" onClick={() => onToast(`Approved ${p.name}. Welcome email sent.`)}>Approve</Button>
          </div>
        ))}
      </Card>

      <Card padding="md">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: 0 }}>Generate invitation link</h3>
          <Button variant="primary" size="sm" icon="plus" onClick={() => onToast('Invitation link copied to clipboard.')}>Create link</Button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {[
            { type: 'Summit attendees', uses: '120 / 220', expires: 'Nov 30, 2026' },
            { type: 'K4G alumni', uses: '34 / 50', expires: 'Dec 31, 2026' },
            { type: 'SPA cohort 2026', uses: '12 / 40', expires: 'Aug 15, 2026' },
          ].map((i, idx) => (
            <div key={idx} style={{ padding: 14, background: 'var(--myc-surface-2)', borderRadius: 8, fontSize: 12.5 }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--myc-text)' }}>{i.type}</div>
              <div style={{ color: 'var(--myc-text-2)', marginTop: 4 }}>{i.uses} used · expires {i.expires}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function AdminContent({ onToast }) {
  return (
    <div>
      <Card padding="lg" style={{ marginBottom: 22, background: 'linear-gradient(135deg, #F0F4F1 0%, #FAFAF8 100%)' }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--myc-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="sparkles" size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: '0 0 4px' }}>Knowledge base ingestion pipeline</h3>
            <div style={{ fontSize: 13, color: 'var(--myc-text-2)', marginBottom: 14, lineHeight: 1.5 }}>Upload documents to chunk, embed (1536-dim), and index for the AI assistant. PII scrubbing runs first. Public/Members/Track-Leads access tiers.</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <div>
                <div className="myc-stat-num" style={{ fontSize: 22 }}>1,247</div>
                <div style={{ fontSize: 11, color: 'var(--myc-text-2)' }}>Documents indexed</div>
              </div>
              <div>
                <div className="myc-stat-num" style={{ fontSize: 22 }}>84,309</div>
                <div style={{ fontSize: 11, color: 'var(--myc-text-2)' }}>Chunks embedded</div>
              </div>
              <div>
                <div className="myc-stat-num" style={{ fontSize: 22 }}>312</div>
                <div style={{ fontSize: 11, color: 'var(--myc-text-2)' }}>Queries this week</div>
              </div>
            </div>
          </div>
          <Button variant="primary" icon="plus" onClick={() => onToast('Upload modal opened.')}>Upload documents</Button>
        </div>
      </Card>

      <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Recent ingestions</h3>
      <Card padding="md" style={{ padding: 0 }}>
        {[
          { title: '2025 Summit Workshop transcripts (Vienna)', status: 'indexed', when: '2 weeks ago', chunks: 4108, by: 'Marcus Halberg' },
          { title: 'Retail Engagement Playbook v3', status: 'indexed', when: '5 days ago', chunks: 184, by: 'Tomáš Novák' },
          { title: 'EU Dietary Guidelines submission toolkit', status: 'processing', when: '3 hours ago', chunks: 0, by: 'Pieter van Dijk' },
          { title: 'Faunalytics Q1 2026 research index update', status: 'indexed', when: '1 month ago', chunks: 612, by: 'Saoirse Walsh' },
        ].map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 18px', borderBottom: i === 3 ? 'none' : '1px solid var(--myc-border-soft)' }}>
            <Icon name="book" size={16} style={{ color: 'var(--myc-text-2)' }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 500 }}>{d.title}</div>
              <div style={{ fontSize: 11.5, color: 'var(--myc-text-2)', marginTop: 2 }}>{d.chunks > 0 ? `${d.chunks} chunks` : 'queued'} · {d.by} · {d.when}</div>
            </div>
            <span style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 4, fontWeight: 600, letterSpacing: 0.3,
              background: d.status === 'indexed' ? 'rgba(64, 145, 108, 0.14)' : 'rgba(212, 163, 115, 0.18)',
              color: d.status === 'indexed' ? 'var(--myc-primary)' : '#8C5B26',
            }}>{d.status.toUpperCase()}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

function AdminAnalytics() {
  return (
    <div>
      <div className="myc-grid-3" style={{ marginBottom: 22 }}>
        <Card padding="md"><div className="myc-stat-label">Weekly Active Users</div><div className="myc-stat-num" style={{ fontSize: 32 }}>67</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>47% of registered · +8% MoM</div></Card>
        <Card padding="md"><div className="myc-stat-label">Knowledge queries / wk</div><div className="myc-stat-num" style={{ fontSize: 32 }}>312</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>Target: 50+ ✓</div></Card>
        <Card padding="md"><div className="myc-stat-label">Avg engagements/post</div><div className="myc-stat-num" style={{ fontSize: 32 }}>7.4</div><div style={{ fontSize: 12, color: 'var(--myc-accent)' }}>Target: 5+ ✓</div></Card>
      </div>

      <Card padding="lg">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: 0 }}>Activity by stream — last 30 days</h3>
          <div style={{ display: 'flex', gap: 4 }}>
            <button className="myc-pill is-active">30d</button>
            <button className="myc-pill">90d</button>
            <button className="myc-pill">All</button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-end', height: 200 }}>
          {window.STREAMS.map((s, i) => {
            const h = [78, 56, 64, 38, 71, 32, 48, 25][i];
            return (
              <div key={s.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600, color: s.color }}>{h}</div>
                <div style={{ width: '70%', background: s.color, height: `${h * 1.6}px`, borderRadius: '4px 4px 0 0', opacity: 0.85 }} />
                <div style={{ fontSize: 10.5, color: 'var(--myc-text-2)', textAlign: 'center', fontWeight: 500 }}>{s.short}</div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function AdminModeration({ onToast }) {
  return (
    <div>
      <Card padding="lg" style={{ textAlign: 'center', padding: '48px 32px' }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: 'rgba(64, 145, 108, 0.12)', color: 'var(--myc-primary)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
          <Icon name="check" size={24} />
        </div>
        <h3 style={{ fontFamily: 'DM Sans', fontSize: 18, fontWeight: 600, margin: '0 0 6px' }}>Nothing flagged.</h3>
        <p style={{ fontSize: 13.5, color: 'var(--myc-text-2)', margin: 0, maxWidth: 360, marginInline: 'auto', lineHeight: 1.5 }}>
          The closed-circle model is doing its job. When something needs review, it shows up here.
        </p>
      </Card>
    </div>
  );
}

// ========== Settings ==========
function Settings({ onToast }) {
  const me = window.CURRENT_USER;
  return (
    <div className="myc-main-inner" style={{ paddingTop: 20 }}>
      <ScreenHeader eyebrow="Profile & Settings" title="Your profile" subtitle="Update what other members see, your interest streams, and how you want to be notified." />
      <div className="myc-grid-2">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <Card padding="lg">
            <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Personal</h3>
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
            <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Your streams</h3>
            <div className="myc-stream-grid">
              {window.STREAMS.map(s => (
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
            <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: '0 0 14px' }}>Notifications</h3>
            <div className="myc-form-field"><label className="myc-form-label">Email digest</label>
              <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                {['Daily', 'Weekly', 'Never'].map((opt, i) => (
                  <button key={opt} className={`myc-pill ${i === 1 ? 'is-active' : ''}`}>{opt}</button>
                ))}
              </div>
            </div>
            {[
              'New campaign events in my streams',
              'Replies to my posts and learnings',
              'New resources matching my streams',
              'Engagement requests from my orgs',
              'AI assistant new feature releases',
            ].map((n, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i === 4 ? 'none' : '1px solid var(--myc-border-soft)', fontSize: 13.5 }}>
                <input type="checkbox" defaultChecked={i !== 4} style={{ accentColor: 'var(--myc-primary)', width: 15, height: 15 }} />
                {n}
              </label>
            ))}
          </Card>

          <Card padding="lg">
            <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>Connect to Claude via MCP</h3>
            <p style={{ fontSize: 13, color: 'var(--myc-text-2)', margin: '0 0 14px', lineHeight: 1.5 }}>
              Use Mycelium's knowledge base from inside your own Claude workspace. Paste this URL into your MCP settings.
            </p>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '10px 12px', background: 'var(--myc-surface-2)', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: 11.5 }}>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>https://mcp.mycelium.org/u/maral-7f29c1</span>
              <button onClick={() => onToast('Copied.')} style={{ border: 0, background: 'transparent', padding: 4, cursor: 'pointer', color: 'var(--myc-text-2)' }}><Icon name="external" size={13} /></button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Admin, Settings });
