// Variation B — EDITORIAL
// Magazine-cover energy. Big serif. Whitespace. A "today's brief" leads.
// Think Are.na meets the NYT Magazine meets an annual report.

function VariationEditorial() {
  const t = window.LEARNINGS.find(l => l.id === 'l-mep');
  const author = window.personById(t.author);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#F6F4EE',
      fontFamily: 'Inter, system-ui',
      color: '#1A1A1A',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Top rail */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px', borderBottom: '1px solid #DCD7C8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <MyceliumMark size={24} color="#1B4332" />
          <div style={{ fontFamily: 'Newsreader, Georgia, serif', fontWeight: 600, fontSize: 18, letterSpacing: -0.4, color: '#1B4332' }}>Mycelium</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 26, fontSize: 12, color: '#5C5849', letterSpacing: 0.4 }}>
          {['Dashboard', 'Knowledge', 'Calendar', 'Community', 'Directory'].map((l, i) => (
            <div key={l} style={{ fontWeight: i === 0 ? 600 : 400, color: i === 0 ? '#1A1A1A' : '#5C5849', position: 'relative' }}>
              {l}
              {i === 0 && <div style={{ position: 'absolute', bottom: -23, left: 0, right: 0, height: 2, background: '#1B4332' }} />}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#5C5849', padding: '4px 10px', border: '1px solid #DCD7C8', borderRadius: 999 }}>
            <Icon name="search" size={12} /> Search or ask… <span style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, color: '#8A8266' }}>⌘K</span>
          </div>
          <Avatar person={window.CURRENT_USER} size={28} />
        </div>
      </div>

      {/* Editorial masthead */}
      <div style={{ padding: '28px 40px 20px', borderBottom: '1px solid #DCD7C8', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: '#5C5849', marginBottom: 6 }}>Vol. 1 · Iss. 22 — Thursday, May 22, 2026</div>
          <h1 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 38, fontWeight: 500, letterSpacing: -0.8, margin: 0, lineHeight: 1, color: '#1B4332' }}>
            The morning brief
          </h1>
        </div>
        <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 13.5, color: '#5C5849', textAlign: 'right', maxWidth: 280, lineHeight: 1.5 }}>
          Good morning, <span style={{ color: '#1A1A1A', fontWeight: 500 }}>Mara</span>. <br />
          The EFSA consultation closes in 54 days.
        </div>
      </div>

      {/* Body grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 0.85fr', gap: 0, padding: '32px 40px' }}>
        {/* LEAD STORY */}
        <div style={{ paddingRight: 36, borderRight: '1px solid #DCD7C8' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9B2226', marginBottom: 10 }}>The lead · From the Learnings Board</div>
          <h2 style={{ fontFamily: 'Newsreader, Georgia, serif', fontSize: 34, fontWeight: 500, letterSpacing: -0.6, margin: '0 0 14px', lineHeight: 1.1, color: '#1A1A1A', textWrap: 'balance' }}>
            "MEPs are saturated. The aides aren't."
          </h2>
          <div style={{ fontSize: 11, color: '#5C5849', marginBottom: 16, fontStyle: 'italic' }}>By Elena Marchetti, Eurogroup for Animals · 4 days ago</div>
          <p style={{ fontFamily: 'Newsreader, serif', fontSize: 15, lineHeight: 1.55, color: '#2A2A2A', margin: '0 0 14px', textWrap: 'pretty' }}>
            We shifted End-the-Cage outreach from MEPs to their policy assistants in March. Response rate went from 4% to 31%. The aides are younger, hungrier for substantive briefings, and they write the lines.
          </p>
          <p style={{ fontFamily: 'Newsreader, serif', fontSize: 15, lineHeight: 1.55, color: '#2A2A2A', margin: '0 0 16px', textWrap: 'pretty' }}>
            Treating them as the actual audience changed everything.
          </p>
          <div style={{ display: 'flex', gap: 14, fontSize: 11, color: '#5C5849', borderTop: '1px solid #DCD7C8', paddingTop: 12 }}>
            <span><strong style={{ color: '#1B4332' }}>38</strong> helpful</span>
            <span><strong style={{ color: '#1B4332' }}>22</strong> insightful</span>
            <span><strong style={{ color: '#1B4332' }}>12</strong> comments</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'Newsreader, serif', fontStyle: 'italic', color: '#1B4332' }}>Read full →</span>
          </div>
        </div>

        {/* MIDDLE COLUMN — Campaign */}
        <div style={{ padding: '0 28px', borderRight: '1px solid #DCD7C8' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9B2226', marginBottom: 10 }}>This week's campaigns</div>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'inline-block', padding: '2px 8px', background: '#1B4332', color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: 0.6, marginBottom: 8 }}>FEATURED</div>
            <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 22, fontWeight: 500, letterSpacing: -0.4, margin: '0 0 6px', lineHeight: 1.15 }}>
              EU Dietary Guidelines — public consultation
            </h3>
            <div style={{ fontSize: 11, color: '#5C5849', marginBottom: 10 }}>ProVeg International · Jun 1 – Jul 15</div>
            <p style={{ fontSize: 13, color: '#2A2A2A', lineHeight: 1.5, margin: 0, textWrap: 'pretty' }}>
              EFSA is updating its scientific opinion on dietary reference values. Coordinated submissions are weighted more heavily. Template + talking points in the linked brief.
            </p>
            <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 13, color: '#1B4332', marginTop: 8 }}>
              31 members supporting · Open brief →
            </div>
          </div>

          <div style={{ borderTop: '1px solid #DCD7C8', paddingTop: 16 }}>
            <h3 style={{ fontFamily: 'Newsreader, serif', fontSize: 17, fontWeight: 500, letterSpacing: -0.3, margin: '0 0 4px' }}>
              Veganuary 2027 — launch week
            </h3>
            <div style={{ fontSize: 11, color: '#5C5849', marginBottom: 6 }}>Veganuary · Dec 26 – Jan 8</div>
            <p style={{ fontSize: 12.5, color: '#2A2A2A', lineHeight: 1.5, margin: 0 }}>
              47 orgs amplifying. 2M pledge target.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN — Numbers + News */}
        <div style={{ paddingLeft: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9B2226', marginBottom: 10 }}>By the numbers</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {[
              { n: 142, l: 'Members in the network' },
              { n: 12, l: 'Organizations' },
              { n: 1247, l: 'Indexed documents' },
              { n: 312, l: 'Queries this week' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #DCD7C8' }}>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 28, fontWeight: 500, letterSpacing: -0.4, color: '#1B4332', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 11, color: '#5C5849', textAlign: 'right', maxWidth: 130, lineHeight: 1.3 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, padding: 14, background: '#1B4332', color: '#fff', borderRadius: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.65, marginBottom: 8 }}>From the assistant</div>
            <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 14, lineHeight: 1.45, marginBottom: 10, textWrap: 'pretty' }}>
              "Would you like a one-page summary of last year's retail track for your call this afternoon?"
            </div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Yes, draft it →</div>
          </div>
        </div>
      </div>

      {/* Bottom rail — news ticker */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid #DCD7C8', padding: '12px 40px', background: '#EFECDF', display: 'flex', alignItems: 'center', gap: 18, fontSize: 11.5, color: '#5C5849', overflow: 'hidden' }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#9B2226', flexShrink: 0 }}>The Wire</span>
        <span>POLITICO · Commission unveils Sustainable Food Systems framework in October</span>
        <span style={{ color: '#DCD7C8' }}>·</span>
        <span>Reuters · Albert Heijn doubles private-label plant-based SKUs</span>
        <span style={{ color: '#DCD7C8' }}>·</span>
        <span>Nature Food · Meta-analysis on default-plant menus shows 23-41pp shift</span>
      </div>
    </div>
  );
}

window.VariationEditorial = VariationEditorial;
