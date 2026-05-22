'use client';

import { useMemo } from 'react';
import {
  Home, Sparkles, BookOpen, Calendar, Megaphone, Sprout, Users, Settings, Shield,
  Search, Plus, Send, ChevronRight, ChevronDown, Bookmark, Heart, Bell, Download,
  Filter, MessageSquare, Command, ArrowRight, ExternalLink, Pin, Check, X,
  LayoutGrid, List,
} from 'lucide-react';
import { streamById, orgById as orgByIdFn, ORGS, PEOPLE, type Person, type Org, type Stream } from '@/lib/data';

// Custom social media icons (not in lucide-react)
function TwitterIcon({ size = 18, style, className }: { size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}><path d="M22 4.01a8 8 0 0 1-2.36.65 4 4 0 0 0 1.8-2.23 8 8 0 0 1-2.6 1 4 4 0 0 0-6.9 3.6A11.5 11.5 0 0 1 3 2.9a4 4 0 0 0 1.24 5.3 4 4 0 0 1-1.8-.5v.05a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.07 4 4 0 0 0 3.74 2.78A8 8 0 0 1 2 16.4a11.5 11.5 0 0 0 6.23 1.8c7.5 0 11.6-6.2 11.6-11.6v-.5A8 8 0 0 0 22 4.01z" /></svg>;
}
function LinkedinIcon({ size = 18, style, className }: { size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 11v6M8 8v.01" /><path d="M12 17v-3a2 2 0 0 1 4 0v3" /><path d="M12 17v-6" /></svg>;
}
function InstagramIcon({ size = 18, style, className }: { size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style} className={className}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" /></svg>;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string }>> = {
  home: Home, sparkles: Sparkles, book: BookOpen, calendar: Calendar,
  megaphone: Megaphone, sprout: Sprout, users: Users, settings: Settings,
  shield: Shield, search: Search, plus: Plus, send: Send,
  chevR: ChevronRight, chevD: ChevronDown, bookmark: Bookmark,
  heart: Heart, bell: Bell, download: Download, filter: Filter,
  msg: MessageSquare, cmd: Command, arrow: ArrowRight, external: ExternalLink,
  pin: Pin, check: Check, x: X, grid: LayoutGrid, list: List,
  twitter: TwitterIcon, linkedin: LinkedinIcon, instagram: InstagramIcon,
};

export function Icon({ name, size = 18, strokeWidth = 1.6, style, className }: {
  name: string; size?: number; strokeWidth?: number; style?: React.CSSProperties; className?: string;
}) {
  const Comp = ICON_MAP[name];
  if (!Comp) return null;
  return <Comp size={size} strokeWidth={strokeWidth} style={style} className={className} />;
}

export function StreamBadge({ stream, size = 'sm', muted = false }: { stream: string; size?: 'sm' | 'lg'; muted?: boolean }) {
  const s = streamById(stream);
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
      fontSize, fontWeight: 500, letterSpacing: 0.1, whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 999, background: s.dot, display: 'inline-block' }} />
      {s.short}
    </span>
  );
}

export function Avatar({ person, size = 32, ring = false }: { person: Person; size?: number; ring?: boolean }) {
  if (!person) return null;
  const initials = person.name.split(' ').map(p => p[0]).slice(0, 2).join('');
  return (
    <div style={{
      width: size, height: size, borderRadius: 999,
      background: `linear-gradient(135deg, ${person.tint}, ${person.tint}cc)`,
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.38, fontWeight: 600, fontFamily: 'var(--font-display)',
      flexShrink: 0,
      boxShadow: ring ? `0 0 0 2px var(--myc-bg), 0 0 0 3px ${person.tint}66` : 'none',
    }}>
      {initials}
    </div>
  );
}

export function OrgLogo({ org, size = 28 }: { org: Org; size?: number }) {
  if (!org) return null;
  return (
    <div style={{
      width: size, height: size, borderRadius: 6,
      background: org.tint, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'var(--font-display)', fontWeight: 700,
      fontSize: size * (org.logo.length > 1 ? 0.34 : 0.45),
      flexShrink: 0, letterSpacing: -0.3,
    }}>
      {org.logo}
    </div>
  );
}

export function MyceliumPattern({ density = 1, opacity = 0.06, color = '#1B4332', style }: {
  density?: number; opacity?: number; color?: string; style?: React.CSSProperties;
}) {
  const seed = (n: number) => {
    const x = Math.sin(n) * 10000;
    return x - Math.floor(x);
  };
  const lines = useMemo(() => {
    const out: { x1: number; y1: number; x2: number; y2: number; cx: number; cy: number }[] = [];
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
    const out: { x: number; y: number; r: number }[] = [];
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

export function NetworkGraph({ width = 600, height = 400, highlight = null }: {
  width?: number; height?: number; highlight?: string | null;
}) {
  // Uses ORGS, PEOPLE, orgByIdFn from top-level import
  const nodes = useMemo(() => {
    const orgNodes = ORGS.slice(0, 10).map((o: Org, i: number) => {
      const angle = (i / 10) * Math.PI * 2;
      const r = Math.min(width, height) * 0.32;
      return { id: o.id, label: o.name, type: 'org' as const, tint: o.tint, x: width / 2 + Math.cos(angle) * r, y: height / 2 + Math.sin(angle) * r, size: 14 + o.members * 1.2 };
    });
    const peopleNodes = PEOPLE.slice(0, 12).map((p: Person, i: number) => {
      const angle = (i / 12) * Math.PI * 2 + 0.3;
      const r = Math.min(width, height) * 0.18;
      return { id: p.id, label: p.name, type: 'person' as const, tint: p.tint, x: width / 2 + Math.cos(angle) * r, y: height / 2 + Math.sin(angle) * r, size: 5 };
    });
    return [...orgNodes, ...peopleNodes];
  }, [width, height]);

  const edges = useMemo(() => {
    const out: { from: typeof nodes[0]; to: typeof nodes[0]; kind: string; strength?: number }[] = [];
    PEOPLE.slice(0, 12).forEach((p: Person) => {
      const from = nodes.find(n => n.id === p.id);
      const to = nodes.find(n => n.id === p.org);
      if (from && to) out.push({ from, to, kind: 'membership' });
    });
    const orgs = nodes.filter(n => n.type === 'org');
    for (let i = 0; i < orgs.length; i++) {
      for (let j = i + 1; j < orgs.length; j++) {
        const oA = orgByIdFn(orgs[i].id);
        const oB = orgByIdFn(orgs[j].id);
        if (oA && oB) {
          const shared = oA.streams.filter((s: string) => oB.streams.includes(s));
          if (shared.length > 0) out.push({ from: orgs[i], to: orgs[j], kind: 'stream', strength: shared.length });
        }
      }
    }
    return out;
  }, [nodes]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <radialGradient id="ng-glow"><stop offset="0%" stopColor="#74C69D" stopOpacity={0.3} /><stop offset="100%" stopColor="#74C69D" stopOpacity={0} /></radialGradient>
      </defs>
      <circle cx={width / 2} cy={height / 2} r={Math.min(width, height) * 0.45} fill="url(#ng-glow)" />
      {edges.map((e, i) => {
        const mx = (e.from.x + e.to.x) / 2 + ((i * 13) % 7 - 3);
        const my = (e.from.y + e.to.y) / 2 + ((i * 7) % 9 - 4);
        const isHl = highlight && (e.from.id === highlight || e.to.id === highlight);
        return (
          <path key={i} d={`M ${e.from.x} ${e.from.y} Q ${mx} ${my} ${e.to.x} ${e.to.y}`}
            stroke={isHl ? '#2D6A4F' : (e.kind === 'membership' ? '#40916C' : '#cdd5d0')}
            strokeWidth={isHl ? 1.4 : (e.kind === 'membership' ? 0.8 : 0.4)}
            opacity={isHl ? 0.9 : 0.5} fill="none" />
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
                {orgByIdFn(n.id)?.logo}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export function MyceliumMark({ size = 32, color = '#1B4332' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="3" fill={color} />
      <circle cx="8" cy="10" r="1.8" fill={color} />
      <circle cx="32" cy="10" r="1.8" fill={color} />
      <circle cx="6" cy="28" r="1.5" fill={color} />
      <circle cx="34" cy="30" r="1.5" fill={color} />
      <circle cx="20" cy="36" r="1.5" fill={color} />
      <circle cx="14" cy="6" r="1" fill={color} opacity={0.5} />
      <circle cx="28" cy="34" r="1" fill={color} opacity={0.5} />
      <path d="M20 20 L8 10 M20 20 L32 10 M20 20 L6 28 M20 20 L34 30 M20 20 L20 36 M8 10 L14 6 M34 30 L28 34" stroke={color} strokeWidth="1" opacity={0.55} />
    </svg>
  );
}

export function ScreenHeader({ eyebrow, title, subtitle, actions, dense }: {
  eyebrow?: string; title: string; subtitle?: string; actions?: React.ReactNode; dense?: boolean;
}) {
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

export function Card({ children, padding = 'lg', accent, style, onClick, className = '' }: {
  children: React.ReactNode; padding?: 'sm' | 'md' | 'lg'; accent?: string;
  style?: React.CSSProperties; onClick?: () => void; className?: string;
}) {
  const pad = { sm: 14, md: 18, lg: 22 }[padding] || 22;
  return (
    <div className={`myc-card ${onClick ? 'is-clickable' : ''} ${className}`}
      onClick={onClick}
      style={{ padding: pad, borderTop: accent ? `2px solid ${accent}` : undefined, ...style }}>
      {children}
    </div>
  );
}

export function Button({ children, variant = 'primary', size = 'md', icon, onClick, style, type = 'button', disabled }: {
  children?: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'warm';
  size?: 'sm' | 'md' | 'lg'; icon?: string; onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties; type?: 'button' | 'submit'; disabled?: boolean;
}) {
  return (
    <button type={type}
      className={`myc-btn myc-btn-${variant} myc-btn-${size}`}
      onClick={onClick} style={style} disabled={disabled}>
      {icon && <Icon name={icon} size={size === 'sm' ? 13 : 14} />}
      {children}
    </button>
  );
}
