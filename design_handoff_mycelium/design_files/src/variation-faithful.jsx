// Variation A — FAITHFUL
// PRD palette exactly. Notion-meets-NGO. Card-based, professional, calm.

function VariationFaithful() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#FAFAF8',
      fontFamily: 'Inter, system-ui',
      color: '#1A1A1A',
      display: 'grid',
      gridTemplateColumns: '240px 1fr',
      overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <div style={{ background: '#FFFFFF', borderRight: '1px solid #EEF0EC', padding: '18px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 8px 10px' }}>
          <MyceliumMark size={26} color="#1B4332" />
          <div>
            <div style={{ fontFamily: 'DM Sans', fontWeight: 700, fontSize: 16, color: '#1B4332', letterSpacing: -0.2 }}>Mycelium</div>
            <div style={{ fontSize: 10, color: '#6B7280', letterSpacing: 0.6, textTransform: 'uppercase', fontWeight: 500 }}>Movement Infra</div>
          </div>
        </div>
        <div style={{ padding: '7px 11px', background: '#F0F4F1', border: '1px solid #EEF0EC', borderRadius: 9, display: 'flex', alignItems: 'center', gap: 8, color: '#6B7280', fontSize: 12.5 }}>
          <Icon name="search" size={13} /> Search or ask… <span style={{ marginLeft: 'auto', fontFamily: 'JetBrains Mono', fontSize: 10, padding: '1px 4px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 3 }}>⌘K</span>
        </div>
        {[
          { i: 'home', l: 'Dashboard', active: true },
          { i: 'sparkles', l: 'Knowledge Hub' },
          { i: 'calendar', l: 'Campaign Calendar' },
          { i: 'megaphone', l: 'Community' },
          { i: 'users', l: 'Member Directory' },
        ].map(n => (
          <div key={n.l} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 11px', borderRadius: 7, background: n.active ? '#1B4332' : 'transparent', color: n.active ? '#fff' : '#1A1A1A', fontSize: 13, fontWeight: 500 }}>
            <Icon name={n.i} size={15} /> {n.l}
          </div>
        ))}
        <div style={{ borderTop: '1px solid #EEF0EC', marginTop: 6, paddingTop: 10 }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: '#9CA3AF', letterSpacing: 0.6, textTransform: 'uppercase', padding: '4px 11px 6px' }}>Your streams</div>
          {[{ d: '#40916C', l: 'Consumer Campaigns' }, { d: '#84A98C', l: 'Public Health' }].map(s => (
            <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 11px', fontSize: 12, color: '#6B7280' }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: s.d }} />{s.l}
            </div>
          ))}
        </div>
      </div>

      {/* Main */}
      <div style={{ padding: '28px 32px', overflow: 'hidden' }}>
        {/* Hero greeting */}
        <div style={{ position: 'relative', background: 'linear-gradient(120deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)', color: '#fff', borderRadius: 14, padding: '26px 30px', overflow: 'hidden', marginBottom: 22 }}>
          <MyceliumPattern density={1.5} opacity={0.13} color="#74C69D" />
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', opacity: 0.75, marginBottom: 6, fontWeight: 500 }}>Thursday · May 22</div>
            <h1 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: 26, fontWeight: 700, letterSpacing: -0.5, lineHeight: 1.2 }}>
              Good morning, Mara.<br />
              <span style={{ opacity: 0.7 }}>The EFSA consultation closes in 54 days.</span>
            </h1>
            <p style={{ margin: '12px 0 0', opacity: 0.85, fontSize: 13, maxWidth: 480, lineHeight: 1.5 }}>
              <strong style={{ color: '#fff' }}>47 organizations</strong> have submitted responses so far. ProVeg has shared a 9-doc toolkit in the Hub.
            </p>
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <span style={{ padding: '7px 13px', background: '#D4A373', color: '#5C3A1A', borderRadius: 7, fontSize: 12.5, fontWeight: 500 }}>Open EFSA brief →</span>
              <span style={{ padding: '7px 13px', color: '#fff', fontSize: 12.5, fontWeight: 500, opacity: 0.85 }}>Ask the assistant</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 20 }}>
          {[
            { n: 7, l: 'Active campaigns', t: '#2D6A4F' },
            { n: 142, l: 'Network members', t: '#40916C' },
            { n: 23, l: 'New resources', t: '#74C69D' },
            { n: '54d', l: 'EU consultation', t: '#D4A373' },
          ].map(s => (
            <div key={s.l} style={{ padding: 14, background: '#fff', border: '1px solid #EEF0EC', borderRadius: 11, borderTop: `2px solid ${s.t}` }}>
              <div style={{ fontFamily: 'DM Sans', fontSize: 22, fontWeight: 700, color: '#1B4332', letterSpacing: -0.4 }}>{s.n}</div>
              <div style={{ fontSize: 10.5, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 500, marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18 }}>
          <div>
            <h2 style={{ margin: '0 0 12px', fontFamily: 'DM Sans', fontSize: 15, fontWeight: 600 }}>For you, today</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FaithfulFeedItem kind="campaign" />
              <FaithfulFeedItem kind="learning" />
              <FaithfulFeedItem kind="news" />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ padding: 14, background: '#fff', border: '1px solid #EEF0EC', borderRadius: 11 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600 }}>Your follow-throughs</h3>
                <span style={{ fontSize: 10.5, color: '#6B7280' }}>4 open</span>
              </div>
              {window.UPCOMING_TASKS.slice(0, 3).map((t, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i === 2 ? 'none' : '1px solid #EEF0EC' }}>
                  <input type="checkbox" style={{ accentColor: '#1B4332' }} />
                  <div style={{ flex: 1, fontSize: 12 }}>
                    <div style={{ fontWeight: 500 }}>{t.label}</div>
                    <div style={{ fontSize: 10.5, color: '#6B7280' }}>{t.due}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: 14, background: '#fff', border: '1px solid #EEF0EC', borderRadius: 11, overflow: 'hidden' }}>
              <h3 style={{ margin: 0, fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600 }}>The network</h3>
              <div style={{ fontSize: 10.5, color: '#6B7280', marginBottom: 4 }}>You're connected to 11 orgs.</div>
              <div style={{ height: 160, margin: '-4px -6px -8px' }}>
                <NetworkGraph width={360} height={180} highlight="veganuary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FaithfulFeedItem({ kind }) {
  if (kind === 'campaign') {
    return (
      <div style={{ display: 'flex', gap: 12, padding: 14, background: '#fff', border: '1px solid #EEF0EC', borderRadius: 11 }}>
        <div style={{ width: 32, height: 32, borderRadius: 7, background: '#2D6A4F', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="megaphone" size={15} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, color: '#6B7280', marginBottom: 2 }}>Campaign · Eurogroup for Animals · Live now <span style={{ background: 'rgba(212, 163, 115, 0.2)', color: '#8C5B26', padding: '1px 5px', borderRadius: 3, fontSize: 9.5, fontWeight: 600, marginLeft: 4 }}>FEATURED</span></div>
          <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>End the Cage Age — implementation push</div>
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.45 }}>Contact your MEP. We have a personalised draft for each member state. The Commission proposal lands in late September.</div>
        </div>
      </div>
    );
  }
  if (kind === 'learning') {
    return (
      <div style={{ display: 'flex', gap: 12, padding: 14, background: '#fff', border: '1px solid #EEF0EC', borderRadius: 11 }}>
        <Avatar person={window.personById('u-elena')} size={32} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, color: '#6B7280', marginBottom: 2 }}>Elena Marchetti · Eurogroup for Animals · 4 days ago</div>
          <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>MEPs are saturated. The aides aren't.</div>
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.45, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            We shifted End-the-Cage outreach from MEPs to their policy assistants in March. Response rate went from 4% to 31%…
          </div>
        </div>
      </div>
    );
  }
  if (kind === 'news') {
    return (
      <div style={{ display: 'flex', gap: 12, padding: 14, background: '#fff', border: '1px solid #EEF0EC', borderRadius: 11 }}>
        <div style={{ width: 32, height: 32, borderRadius: 7, background: 'linear-gradient(135deg, #5E548E, #9F86C0)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon name="sparkles" size={15} /></div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 10.5, marginBottom: 2 }}><span style={{ color: '#1B4332', fontWeight: 600 }}>AI summary</span><span style={{ color: '#6B7280' }}> · EFSA · 1d ago</span></div>
          <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>EFSA opens public consultation on dietary reference values</div>
          <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.45 }}>Consultation runs through July 15. Coordinated organizational submissions are weighted in the final synthesis.</div>
        </div>
      </div>
    );
  }
  return null;
}

window.VariationFaithful = VariationFaithful;
