// Variation C — EXPERIMENTAL
// The mycelial network IS the interface. Dark mode.
// Activity pulses along connection lines. Density: spatial, not card-based.
// Monospace accents. Glow. Less chrome.

function VariationExperimental() {
  const [hover, setHover] = useState(null);

  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0B1410',
      fontFamily: 'Inter, system-ui',
      color: '#D5E0D9',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background ambient mycelium */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <MyceliumPattern density={2.8} opacity={0.07} color="#74C69D" />
      </div>

      {/* Glowing radial atmospheres */}
      <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(116,198,157,0.10) 0%, transparent 65%)', pointerEvents: 'none' }} />

      {/* Top bar */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid rgba(116,198,157,0.12)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <MyceliumMark size={26} color="#74C69D" />
          <div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 13, color: '#74C69D', letterSpacing: 0.5 }}>mycelium</div>
            <div style={{ fontSize: 9.5, color: '#5A7064', letterSpacing: 1.5, textTransform: 'uppercase' }}>node · mara-7f29c1</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(116,198,157,0.08)', border: '1px solid rgba(116,198,157,0.18)', borderRadius: 999, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#74C69D' }}>
          <span style={{ width: 6, height: 6, borderRadius: 999, background: '#74C69D', boxShadow: '0 0 8px #74C69D' }} />
          <span>142 nodes online</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px', background: 'rgba(213, 224, 217, 0.05)', border: '1px solid rgba(213, 224, 217, 0.10)', borderRadius: 999, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#8FA89B' }}>
            <Icon name="search" size={11} /> &gt; ask, search, jump…
            <span style={{ marginLeft: 8, padding: '1px 5px', background: 'rgba(116,198,157,0.12)', borderRadius: 3, fontSize: 9.5, color: '#74C69D' }}>⌘K</span>
          </div>
          <Avatar person={window.CURRENT_USER} size={28} ring />
        </div>
      </div>

      {/* Layout: side rail + big network + right panel */}
      <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '180px 1fr 340px', height: 'calc(100% - 65px)' }}>

        {/* LEFT — Stream rail */}
        <div style={{ padding: '24px 18px', borderRight: '1px solid rgba(116,198,157,0.10)' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', color: '#5A7064', marginBottom: 14 }}>// signal</div>
          {window.STREAMS.map((s, i) => {
            const intensity = [0.95, 0.7, 0.85, 0.4, 0.6, 0.3, 0.5, 0.25][i];
            return (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 4px', cursor: 'pointer' }}>
                <div style={{ width: 7, height: 7, borderRadius: 999, background: s.dot, boxShadow: `0 0 ${intensity * 12}px ${s.dot}` }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, color: i < 3 ? '#fff' : '#8FA89B', fontWeight: 500 }}>{s.short}</div>
                  <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, marginTop: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${intensity * 100}%`, height: '100%', background: s.dot, opacity: 0.6 }} />
                  </div>
                </div>
              </div>
            );
          })}

          <div style={{ marginTop: 24, fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', color: '#5A7064', marginBottom: 8 }}>// pulse</div>
          <div style={{ padding: 12, background: 'rgba(116,198,157,0.06)', border: '1px solid rgba(116,198,157,0.14)', borderRadius: 6 }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 18, color: '#74C69D', letterSpacing: -0.5 }}>54<span style={{ fontSize: 11, color: '#5A7064', marginLeft: 2 }}>d</span></div>
            <div style={{ fontSize: 10, color: '#8FA89B', marginTop: 2, lineHeight: 1.3 }}>until EFSA consultation closes</div>
          </div>
        </div>

        {/* CENTER — The Network */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Title overlay */}
          <div style={{ position: 'absolute', top: 24, left: 24, zIndex: 3, maxWidth: 380 }}>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', color: '#5A7064', marginBottom: 6 }}>// 22.05.26 · 09:14</div>
            <h1 style={{ fontFamily: 'DM Sans', fontSize: 30, fontWeight: 600, letterSpacing: -0.5, margin: 0, color: '#fff', lineHeight: 1.1 }}>
              The forest is busy today.
            </h1>
            <p style={{ fontSize: 12.5, color: '#8FA89B', margin: '10px 0 0', lineHeight: 1.55, maxWidth: 320 }}>
              <span style={{ color: '#74C69D' }}>47 orgs</span> are coordinating on the EFSA consultation. Hover a node to see who's pulling.
            </p>
          </div>

          {/* Big network graph */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <ExperimentalNetwork hover={hover} setHover={setHover} />
          </div>

          {/* Bottom event ticker */}
          <div style={{ position: 'absolute', bottom: 16, left: 24, right: 24, zIndex: 3, padding: '10px 14px', background: 'rgba(11, 20, 16, 0.7)', backdropFilter: 'blur(8px)', border: '1px solid rgba(116,198,157,0.14)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'JetBrains Mono', fontSize: 11, color: '#8FA89B' }}>
            <div style={{ width: 6, height: 6, borderRadius: 999, background: '#D4A373', boxShadow: '0 0 10px #D4A373' }} />
            <span style={{ color: '#fff' }}>elena.eurogroup</span>
            <span>→</span>
            <span>pinned MEP outreach template</span>
            <span style={{ color: '#5A7064', marginLeft: 'auto' }}>2m ago</span>
          </div>
        </div>

        {/* RIGHT — Live activity */}
        <div style={{ padding: '24px 22px', borderLeft: '1px solid rgba(116,198,157,0.10)', overflow: 'hidden' }}>
          <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, letterSpacing: 1.5, textTransform: 'uppercase', color: '#5A7064', marginBottom: 14, display: 'flex', justifyContent: 'space-between' }}>
            <span>// activity</span>
            <span style={{ color: '#74C69D' }}>● live</span>
          </div>

          {[
            { who: 'priya.gfi-eu', what: 'shared a learning', topic: 'Cell-cultivated > lab-grown', stream: 'altprot', when: '0:14' },
            { who: 'tomas.proveg', what: 'submitted campaign', topic: 'Albert Heijn retail push', stream: 'retail', when: '0:42' },
            { who: 'elena.eurogroup', what: 'reacted to learning', topic: 'MEP outreach', stream: 'policy', when: '1:08' },
            { who: 'jonas.dvf', what: 'opened in assistant', topic: 'School meals — DK', stream: 'health', when: '1:55' },
            { who: 'mara.veganuary', what: 'engaged with post', topic: 'Veganuary 2027 launch', stream: 'consumer', when: '3:21' },
            { who: 'priya.gfi-eu', what: 'uploaded document', topic: 'Cultivated meat lang. study', stream: 'altprot', when: '4:07' },
            { who: 'finn.ciwf', what: 'reacted to learning', topic: 'Retail buyer psychology', stream: 'retail', when: '5:30' },
          ].map((e, i) => {
            const s = window.streamById(e.stream);
            return (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 0', borderBottom: i === 6 ? 'none' : '1px solid rgba(116,198,157,0.08)' }}>
                <div style={{ width: 4, alignSelf: 'stretch', background: s.dot, opacity: 0.6, borderRadius: 999, flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10.5, color: '#fff' }}>{e.who}</div>
                  <div style={{ fontSize: 11.5, color: '#8FA89B', marginTop: 2 }}>{e.what} <span style={{ color: '#D5E0D9' }}>{e.topic}</span></div>
                </div>
                <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#5A7064' }}>{e.when}</div>
              </div>
            );
          })}

          <div style={{ marginTop: 16, padding: 14, background: 'linear-gradient(135deg, rgba(116,198,157,0.10), rgba(116,198,157,0.04))', border: '1px solid rgba(116,198,157,0.18)', borderRadius: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: 999, background: 'linear-gradient(135deg, #2D6A4F, #74C69D)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}><Icon name="sparkles" size={11} /></div>
              <div style={{ fontFamily: 'JetBrains Mono', fontSize: 10, color: '#74C69D', letterSpacing: 0.5, textTransform: 'uppercase' }}>Pattern detected</div>
            </div>
            <div style={{ fontSize: 12, color: '#D5E0D9', lineHeight: 1.5 }}>
              Three orgs in your network filed EFSA responses in the last 6 hours. Want me to draft a coordinated talking-points doc?
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom network for experimental view — more nodes, pulsing edges
function ExperimentalNetwork({ hover, setHover }) {
  const W = 720, H = 580;
  const nodes = useMemo(() => {
    return window.ORGS.map((o, i) => {
      const angle = (i / window.ORGS.length) * Math.PI * 2;
      const dist = 0.32 + (i % 3) * 0.05;
      return {
        id: o.id,
        label: o.logo,
        name: o.name,
        x: W / 2 + Math.cos(angle) * W * dist,
        y: H / 2 + Math.sin(angle) * H * dist * 0.85,
        size: 8 + o.members * 1.3,
        tint: o.tint,
      };
    });
  }, []);
  const edges = useMemo(() => {
    const out = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const oA = window.orgById(nodes[i].id);
        const oB = window.orgById(nodes[j].id);
        const shared = oA.streams.filter(s => oB.streams.includes(s)).length;
        if (shared > 0) out.push({ from: nodes[i], to: nodes[j], strength: shared });
      }
    }
    return out;
  }, [nodes]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="cglow">
          <stop offset="0%" stopColor="#74C69D" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#74C69D" stopOpacity="0" />
        </radialGradient>
        <filter id="nodeglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <circle cx={W / 2} cy={H / 2} r={W * 0.32} fill="url(#cglow)" />
      {edges.map((e, i) => {
        const isHl = hover && (e.from.id === hover || e.to.id === hover);
        return (
          <line key={i}
            x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y}
            stroke={isHl ? '#74C69D' : '#74C69D'}
            strokeWidth={isHl ? 1.2 : 0.3 + e.strength * 0.15}
            opacity={isHl ? 0.85 : 0.18 + e.strength * 0.05} />
        );
      })}
      {/* Central node */}
      <g>
        <circle cx={W / 2} cy={H / 2} r="22" fill="none" stroke="#74C69D" strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="22;38;22" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx={W / 2} cy={H / 2} r="14" fill="#1B4332" stroke="#74C69D" strokeWidth="1.5" />
        <text x={W / 2} y={H / 2 + 4} textAnchor="middle" style={{ fontFamily: 'JetBrains Mono', fontSize: 10, fill: '#74C69D' }}>YOU</text>
      </g>
      {nodes.map((n) => {
        const isHl = hover === n.id;
        return (
          <g key={n.id} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)} style={{ cursor: 'pointer' }}>
            <circle cx={n.x} cy={n.y} r={n.size}
              fill={n.tint} stroke="#0B1410" strokeWidth="2"
              opacity={isHl ? 1 : 0.95}
              filter={isHl ? 'url(#nodeglow)' : undefined} />
            <text x={n.x} y={n.y + n.size + 12} textAnchor="middle"
              style={{ fontFamily: 'JetBrains Mono', fontSize: 9.5, fill: isHl ? '#fff' : '#8FA89B', fontWeight: 500 }}>
              {n.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

window.VariationExperimental = VariationExperimental;
