// Mycelium — shared components

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Stream Badge ----------
function StreamBadge({ stream, size = 'sm', muted = false }) {
  const s = window.streamById(stream);
  if (!s) return null;
  const padY = size === 'lg' ? 6 : 3;
  const padX = size === 'lg' ? 12 : 8;
  const fontSize = size === 'lg' ? 12 : 11;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: `${padY}px ${padX}px`, borderRadius: 999,
      background: muted ? 'transparent' : `${s.color}14`,
      color: muted ? 'var(--myc-text-2)' : s.color,
      border: muted ? '1px solid var(--myc-border)' : 'none',
      fontSize, fontWeight: 500, letterSpacing: 0.1,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot, display: 'inline-block' }} />
      {s.short}
    </span>
  );
}

// ---------- Avatar ----------
function Avatar({ person, size = 32, ring = false }) {
  if (!person) return null;
  const initials = person.name.split(' ').map(p => p[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: `linear-gradient(135deg, ${person.tint}, ${person.tint}cc)`,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, fontFamily: 'DM Sans, system-ui',
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px var(--myc-bg), 0 0 0 3px ${person.tint}66` : 'none',
    }}>
      {initials}
    </div>
  );
}

// ---------- Org Logo ----------
function OrgLogo({ org, size = 28 }) {
  if (!org) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      background: org.tint, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'DM Sans', fontWeight: 700,
      fontSize: size * (org.logo.length > 1 ? 0.34 : 0.45),
      flexShrink: 0, letterSpacing: -0.3,
    }}>
      {org.logo}
    </div>
  );
}

// ---------- Lucide-ish icons (inline SVG, hand-drawn for control) ----------
const Icon = ({ name, size = 18, stroke = 1.6, style }) => {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', style };
  const paths = {
    home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></>,
    sparkles: <><path d="M12 3l1.5 4 4 1.5-4 1.5L12 14l-1.5-4L6.5 8.5l4-1.5z" /><path d="M19 14l.8 2 2 .8-2 .8L19 20l-.8-2-2-.8 2-.8z" /></>,
    book: <><path d="M4 5a2 2 0 0 1 2-2h12v18H6a2 2 0 0 1-2-2z" /><path d="M4 17h14" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" /></>,
    megaphone: <><path d="M3 11v2a2 2 0 0 0 2 2h2l8 4V5L7 9H5a2 2 0 0 0-2 2z" /><path d="M17 8a4 4 0 0 1 0 8" /></>,
    sprout: <><path d="M12 22v-8" /><path d="M12 14c-4 0-7-3-7-7 4 0 7 3 7 7z" /><path d="M12 14c0-4 3-7 7-7 0 4-3 7-7 7z" /></>,
    users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3 2.7-5 6-5s6 2 6 5" /><circle cx="17" cy="10" r="2.5" /><path d="M15 20c0-2.2 1.6-4 4-4" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    send: <><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" /></>,
    chevR: <path d="m9 6 6 6-6 6" />,
    chevD: <path d="m6 9 6 6 6-6" />,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></>,
    filter: <path d="M22 3H2l8 9.46V19l4 2v-8.54z" />,
    msg: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    cmd: <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />,
    arrow: <><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></>,
    external: <><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5" /></>,
    pin: <><path d="m12 17 .01 5" /><path d="M9 2h6l1 5 3 3v3H5v-3l3-3z" /></>,
    twitter: <path d="M22 4.01a8 8 0 0 1-2.36.65 4 4 0 0 0 1.8-2.23 8 8 0 0 1-2.6 1 4 4 0 0 0-6.9 3.6A11.5 11.5 0 0 1 3 2.9a4 4 0 0 0 1.24 5.3 4 4 0 0 1-1.8-.5v.05a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.07 4 4 0 0 0 3.74 2.78A8 8 0 0 1 2 16.4a11.5 11.5 0 0 0 6.23 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5A8 8 0 0 0 22 4.01z" />,
    linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 11v6M8 8v.01" /><path d="M12 17v-3a2 2 0 0 1 4 0v3" /><path d="M12 17v-6" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" /></>,
    check: <path d="m5 12 5 5L20 7" />,
    x: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    list: <><path d="M8 6h13M8 12h13M8 18h13" /><circle cx="4" cy="6" r="1" /><circle cx="4" cy="12" r="1" /><circle cx="4" cy="18" r="1" /></>,
  };
  return <svg {...props}>{paths[name]}</svg>;
}

// ---------- Mycelium Network Viz (hyphae background) ----------
function MyceliumPattern({ density = 1, opacity = 0.06, color = '#1B4332', style }) {
  // deterministic seeded random
  const seed = (n) => {
    let x = Math.sin(n) * 10000;
    return x - Math.floor(x);
  };
  const lines = useMemo(() => {
    const out = [];
    const count = Math.round(28 * density);
    for (let i = 0; i < count; i++) {
      const x1 = seed(i * 7.13) * 100;
      const y1 = seed(i * 13.7) * 100;
      const x2 = x1 + (seed(i * 17.4) - 0.5) * 40;
      const y2 = y1 + (seed(i * 23.1) - 0.5) * 40;
      const cx = (x1 + x2) / 2 + (seed(i * 31.7) - 0.5) * 20;
      const cy = (y1 + y2) / 2 + (seed(i * 37.9) - 0.5) * 20;
      out.push({ x1, y1, x2, y2, cx, cy });
    }
    return out;
  }, [density]);
  const dots = useMemo(() => {
    const out = [];
    for (let i = 0; i < 18; i++) {
      out.push({ x: seed(i * 3.7 + 100) * 100, y: seed(i * 5.3 + 200) * 100, r: 0.3 + seed(i * 9.1) * 0.6 });
    }
    return out;
  }, []);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity, ...style }}>
      {lines.map((l, i) => (
        <path key={i} d={`M ${l.x1} ${l.y1} Q ${l.cx} ${l.cy} ${l.x2} ${l.y2}`} stroke={color} strokeWidth="0.15" fill="none" />
      ))}
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r * 0.4} fill={color} />
      ))}
    </svg>
  );
}

// ---------- Network Graph (interactive) ----------
function NetworkGraph({ width = 600, height = 400, highlight = null }) {
  // Build nodes from orgs + people, edges from people→org membership and stream overlap
  const nodes = useMemo(() => {
    const orgNodes = window.ORGS.slice(0, 10).map((o, i) => {
      const angle = (i / 10) * Math.PI * 2;
      const r = Math.min(width, height) * 0.32;
      return { id: o.id, label: o.name, type: 'org', tint: o.tint, x: width/2 + Math.cos(angle) * r, y: height/2 + Math.sin(angle) * r, size: 14 + o.members * 1.2 };
    });
    const peopleNodes = window.PEOPLE.slice(0, 12).map((p, i) => {
      const angle = (i / 12) * Math.PI * 2 + 0.3;
      const r = Math.min(width, height) * 0.18;
      return { id: p.id, label: p.name, type: 'person', tint: p.tint, x: width/2 + Math.cos(angle) * r, y: height/2 + Math.sin(angle) * r, size: 5 };
    });
    return [...orgNodes, ...peopleNodes];
  }, [width, height]);
  const edges = useMemo(() => {
    const out = [];
    // person -> their org
    window.PEOPLE.slice(0, 12).forEach(p => {
      const from = nodes.find(n => n.id === p.id);
      const to = nodes.find(n => n.id === p.org);
      if (from && to) out.push({ from, to, kind: 'membership' });
    });
    // org -> org (shared stream)
    const orgs = nodes.filter(n => n.type === 'org');
    for (let i = 0; i < orgs.length; i++) {
      for (let j = i + 1; j < orgs.length; j++) {
        const oA = window.orgById(orgs[i].id);
        const oB = window.orgById(orgs[j].id);
        const shared = oA.streams.filter(s => oB.streams.includes(s));
        if (shared.length > 0) out.push({ from: orgs[i], to: orgs[j], kind: 'stream', strength: shared.length });
      }
    }
    return out;
  }, [nodes]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="ng-glow"><stop offset="0%" stopColor="#74C69D" stopOpacity="0.3" /><stop offset="100%" stopColor="#74C69D" stopOpacity="0" /></radialGradient>
      </defs>
      <circle cx={width/2} cy={height/2} r={Math.min(width, height) * 0.45} fill="url(#ng-glow)" />
      {edges.map((e, i) => {
        const mx = (e.from.x + e.to.x) / 2 + ((i * 13) % 7 - 3);
        const my = (e.from.y + e.to.y) / 2 + ((i * 7) % 9 - 4);
        const isHl = highlight && (e.from.id === highlight || e.to.id === highlight);
        return (
          <path key={i} d={`M ${e.from.x} ${e.from.y} Q ${mx} ${my} ${e.to.x} ${e.to.y}`}
            stroke={isHl ? '#2D6A4F' : (e.kind === 'membership' ? '#40916C' : '#cdd5d0')}
            strokeWidth={isHl ? 1.4 : (e.kind === 'membership' ? 0.8 : 0.4)}
            opacity={isHl ? 0.9 : (e.kind === 'membership' ? 0.5 : 0.5)}
            fill="none" />
        );
      })}
      {nodes.map(n => {
        const isHl = highlight && n.id === highlight;
        return (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r={n.size}
              fill={n.type === 'org' ? n.tint : '#fff'}
              stroke={n.type === 'org' ? '#fff' : n.tint}
              strokeWidth={n.type === 'org' ? 2 : 1.5}
              opacity={isHl ? 1 : 0.95}
              style={{ filter: isHl ? 'drop-shadow(0 0 8px #74C69D)' : 'none' }} />
            {n.type === 'org' && (
              <text x={n.x} y={n.y + n.size + 12} textAnchor="middle"
                style={{ fontFamily: 'Inter', fontSize: 10, fill: '#1A1A1A', fontWeight: 500 }}>
                {window.orgById(n.id).logo}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ---------- Mycelium Logo Mark ----------
function MyceliumMark({ size = 32, color = '#1B4332' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="3" fill={color} />
      <circle cx="8" cy="10" r="1.8" fill={color} />
      <circle cx="32" cy="10" r="1.8" fill={color} />
      <circle cx="6" cy="28" r="1.5" fill={color} />
      <circle cx="34" cy="30" r="1.5" fill={color} />
      <circle cx="20" cy="36" r="1.5" fill={color} />
      <circle cx="14" cy="6" r="1" fill={color} opacity="0.5" />
      <circle cx="28" cy="34" r="1" fill={color} opacity="0.5" />
      <path d="M20 20 L8 10 M20 20 L32 10 M20 20 L6 28 M20 20 L34 30 M20 20 L20 36 M8 10 L14 6 M34 30 L28 34" stroke={color} strokeWidth="1" opacity="0.55" />
    </svg>
  );
}

// ---------- Sidebar ----------
function Sidebar({ current, onNav, onOpenCmdK }) {
  const nav = [
    { id: 'dashboard',   label: 'Dashboard',         icon: 'home' },
    { id: 'knowledge',   label: 'Knowledge Hub',     icon: 'sparkles' },
    { id: 'calendar',    label: 'Campaign Calendar', icon: 'calendar' },
    { id: 'community',   label: 'Community',         icon: 'megaphone' },
    { id: 'directory',   label: 'Member Directory',  icon: 'users' },
  ];
  const second = [
    { id: 'admin',       label: 'Admin',             icon: 'shield' },
    { id: 'settings',    label: 'Profile & Settings',icon: 'settings' },
  ];
  return (
    <aside className="myc-sidebar">
      <div className="myc-brand" onClick={() => onNav('dashboard')}>
        <MyceliumMark size={28} color="var(--myc-primary)" />
        <div>
          <div className="myc-brand-name">Mycelium</div>
          <div className="myc-brand-sub">Movement Infrastructure</div>
        </div>
      </div>

      <button className="myc-cmdk-btn" onClick={onOpenCmdK}>
        <Icon name="search" size={14} />
        <span>Search or ask…</span>
        <span className="myc-kbd">⌘K</span>
      </button>

      <div className="myc-nav-section">
        {nav.map(item => (
          <button key={item.id}
            className={`myc-nav-item ${current === item.id ? 'is-active' : ''}`}
            onClick={() => onNav(item.id)}>
            <Icon name={item.icon} size={17} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="myc-nav-divider" />

      <div className="myc-nav-section">
        <div className="myc-nav-label">Your Streams</div>
        {window.CURRENT_USER.streams.map(sid => {
          const s = window.streamById(sid);
          return (
            <button key={sid} className="myc-nav-stream" onClick={() => onNav('dashboard')}>
              <span className="myc-stream-dot" style={{ background: s.dot }} />
              <span>{s.label}</span>
            </button>
          );
        })}
        <button className="myc-nav-stream myc-nav-stream-add" onClick={() => onNav('settings')}>
          <Icon name="plus" size={12} /> <span>Add a stream</span>
        </button>
      </div>

      <div className="myc-nav-divider" />

      <div className="myc-nav-section">
        {second.map(item => (
          <button key={item.id}
            className={`myc-nav-item ${current === item.id ? 'is-active' : ''}`}
            onClick={() => onNav(item.id)}>
            <Icon name={item.icon} size={17} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <div className="myc-sidebar-footer">
        <Avatar person={window.CURRENT_USER} size={32} />
        <div className="myc-sb-foot-meta">
          <div className="myc-sb-foot-name">{window.CURRENT_USER.name}</div>
          <div className="myc-sb-foot-org">{window.orgById(window.CURRENT_USER.org).name}</div>
        </div>
        <Icon name="bell" size={16} style={{ color: 'var(--myc-text-2)' }} />
      </div>
    </aside>
  );
}

// ---------- Top bar (in-screen) ----------
function ScreenHeader({ eyebrow, title, subtitle, actions, dense }) {
  return (
    <header className={`myc-screen-header ${dense ? 'is-dense' : ''}`}>
      <div>
        {eyebrow && <div className="myc-eyebrow">{eyebrow}</div>}
        <h1 className="myc-screen-title">{title}</h1>
        {subtitle && <p className="myc-screen-sub">{subtitle}</p>}
      </div>
      {actions && <div className="myc-screen-actions">{actions}</div>}
    </header>
  );
}

// ---------- Card ----------
function Card({ children, padding = 'lg', accent, style, onClick, className = '' }) {
  const pad = { sm: 14, md: 18, lg: 22 }[padding] || 22;
  return (
    <div className={`myc-card ${onClick ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
      style={{ padding: pad, borderTop: accent ? `2px solid ${accent}` : undefined, ...style }}>
      {children}
    </div>
  );
}

// ---------- Button ----------
function Button({ children, variant = 'primary', size = 'md', icon, onClick, style, type = 'button' }) {
  return (
    <button type={type}
      className={`myc-btn myc-btn-${variant} myc-btn-${size}`}
      onClick={onClick} style={style}>
      {icon && <Icon name={icon} size={size === 'sm' ? 13 : 14} />}
      {children}
    </button>
  );
}

// Export everything
Object.assign(window, {
  StreamBadge, Avatar, OrgLogo, Icon,
  MyceliumPattern, NetworkGraph, MyceliumMark,
  Sidebar, ScreenHeader, Card, Button,
});
