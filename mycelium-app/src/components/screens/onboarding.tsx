'use client';

import { useState } from 'react';
import { Icon, Button, MyceliumPattern, NetworkGraph, StreamIcon } from '@/components/ui';
import { STREAMS, streamById } from '@/lib/data';

export function Onboarding({ onComplete, initialStreams }: { onComplete: (streams?: string[]) => void; initialStreams?: string[] }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    fullName: 'Maya Holm',
    org: 'Veganuary',
    role: 'Campaigns Manager',
    country: 'Denmark',
    bio: '',
    streams: (initialStreams && initialStreams.length ? initialStreams : ['consumer']) as string[],
  });
  const totalSteps = 4;

  const toggleStream = (id: string) => {
    setForm(f => ({ ...f, streams: f.streams.includes(id) ? f.streams.filter(s => s !== id) : [...f.streams, id] }));
  };

  return (
    <div className="myc-onb-shell">
      <div className="myc-onb-left">
        <div className="myc-onb-scroll">
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-mark.png" alt="Mycelium" style={{ width: 40, height: 40, objectFit: 'contain' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--myc-text)' }}>Mycelium</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 8.5, color: 'var(--myc-text-3)', letterSpacing: 1.5, textTransform: 'uppercase' }}>Movement Infrastructure</div>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 560 }}>
          <div className="myc-onb-step">Step {step + 1} of {totalSteps}</div>

          {step === 0 && (
            <>
              <h1 className="myc-onb-h">Welcome to Mycelium.</h1>
              <p className="myc-onb-sub">
                You&apos;ve been invited by <strong style={{ color: 'var(--myc-text)' }}>David and the Plant Food System Summit team</strong> to join the network of organisations gathering for the Summit in Berlin, 21–22 November 2026.
              </p>
              <div style={{
                position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: 20,
                background: 'var(--myc-primary)',
                aspectRatio: '16 / 9', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}>
                <MyceliumPattern density={1.4} opacity={0.18} color="#8AA06F" />
                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#F4EEDF', textAlign: 'center' }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: 999,
                    background: 'rgba(255, 255, 255, 0.94)', color: 'var(--myc-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7L8 5z" /></svg>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: 0.3, opacity: 0.92 }}>
                    Welcome video — 2 min · coming soon
                  </div>
                </div>
              </div>
              <div style={{ background: 'var(--myc-surface)', border: '1px solid var(--myc-border)', borderRadius: 14, padding: 18, marginBottom: 24 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10 }}>What you&apos;ll find inside:</div>
                {[
                  { i: 'sparkles', t: "An AI assistant that knows the movement's playbooks, transcripts, and research" },
                  { i: 'calendar', t: 'A shared campaign calendar — see who needs amplification, when' },
                  { i: 'megaphone', t: "A community of advocates supporting each other's work daily" },
                  { i: 'users', t: '142 members across 13 orgs — connect, message, collaborate' },
                ].map(item => (
                  <div key={item.i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '8px 0', fontSize: 13, color: 'var(--myc-text)' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: 'color-mix(in srgb, var(--myc-accent) 14%, var(--myc-surface))', color: 'var(--myc-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name={item.i} size={14} />
                    </div>
                    <span>{item.t}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1 className="myc-onb-h">Tell us about you.</h1>
              <p className="myc-onb-sub">Other members will see this on your profile and in the directory.</p>
              <div className="myc-form-field">
                <label className="myc-form-label">Full name</label>
                <input className="myc-form-input" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div className="myc-form-field">
                  <label className="myc-form-label">Organisation</label>
                  <input className="myc-form-input" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} />
                </div>
                <div className="myc-form-field">
                  <label className="myc-form-label">Your role</label>
                  <input className="myc-form-input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} />
                </div>
              </div>
              <div className="myc-form-field">
                <label className="myc-form-label">Country</label>
                <input className="myc-form-input" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
              </div>
              <div className="myc-form-field">
                <label className="myc-form-label">Brief bio <span style={{ fontWeight: 400, color: 'var(--myc-text-2)' }}>(optional)</span></label>
                <textarea className="myc-form-textarea" value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })}
                  placeholder="What you're working on, what you're hoping to learn from the network…" />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className="myc-onb-h">Pick your streams.</h1>
              <p className="myc-onb-sub">
                Streams are how you shop the hub — they shape your feed, surface relevant campaigns, and connect you with people working on the same problems. Pick at least one; change them anytime.
              </p>
              <div className="myc-pick-grid">
                {STREAMS.map(s => {
                  const on = form.streams.includes(s.id);
                  return (
                    <div key={s.id}
                      className={`myc-pick-tile ${on ? 'is-selected' : ''}`}
                      style={{ ['--ac' as string]: s.color } as React.CSSProperties}
                      onClick={() => toggleStream(s.id)}>
                      <span className="myc-pick-check"><Icon name="check" size={11} /></span>
                      <StreamIcon stream={s.id} size={66} className="myc-pick-ic" />
                      <div className="myc-pick-nm">{s.label}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 14, fontSize: 12.5, color: 'var(--myc-text-2)' }}>
                {form.streams.length} selected
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className="myc-onb-h">You&apos;re in. Here&apos;s how to land well.</h1>
              <p className="myc-onb-sub">Three things most new members do in their first week. None required, all useful.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { i: 'sparkles', t: "Ask the assistant something you've been wondering about", sub: "It's read the SPAA curriculum, summit transcripts, and 1,247 docs." },
                  { i: 'calendar', t: "Browse this quarter's campaign calendar", sub: 'Mark 2-3 you\'ll support. The campaign owners will see this.' },
                  { i: 'users', t: 'Introduce yourself in the Learnings Board', sub: 'A 3-sentence post about what you\'re working on goes a long way.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, padding: 16, background: 'var(--myc-surface)', border: '1px solid var(--myc-border)', borderRadius: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: 'var(--myc-primary)', color: '#F4EEDF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon name={item.i} size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600 }}>{item.t}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--myc-text-2)', marginTop: 3, lineHeight: 1.5 }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        </div>

        <div className="myc-onb-foot">
          <div style={{ display: 'flex', gap: 6 }}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} style={{ width: i === step ? 24 : 8, height: 8, borderRadius: 999, background: i <= step ? 'var(--myc-primary)' : 'var(--myc-border)', transition: 'all 0.2s' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {step > 0 && <Button variant="ghost" onClick={() => setStep(step - 1)}>Back</Button>}
            {step < totalSteps - 1
              ? <Button variant="primary" icon="arrow" onClick={() => setStep(step + 1)} disabled={step === 2 && form.streams.length === 0}>Continue</Button>
              : <Button variant="primary" icon="arrow" onClick={() => onComplete(form.streams)}>Enter Mycelium</Button>}
          </div>
        </div>
      </div>

      <div className="myc-onb-right">
        <MyceliumPattern density={2.2} opacity={0.16} color="#8AA06F" />
        {step === 2 ? (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 36 }}>
            <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 360 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.7, marginBottom: 16 }}>Your streams</div>
              {form.streams.length === 0 && <div style={{ fontSize: 14, opacity: 0.75 }}>Pick a stream on the left and it&apos;ll show up here.</div>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {form.streams.map(id => {
                  const s = streamById(id);
                  return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 11, background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '8px 10px' }}>
                      <div style={{ background: '#F4EEDF', borderRadius: 9, padding: 2, display: 'grid', placeItems: 'center' }}>
                        <StreamIcon stream={id} size={32} />
                      </div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: '#F4EEDF' }}>{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '85%', maxWidth: 460 }}>
              <NetworkGraph width={460} height={460} highlight="proveg" />
            </div>
          </div>
        )}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.7 }}>What we mean by mycelium</div>
        </div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <blockquote style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500, letterSpacing: -0.3, lineHeight: 1.35, color: '#F4EEDF', textWrap: 'balance' }}>
            &ldquo;A forest with a healthy mycelial network is dramatically more resilient than one without. No single tree is the forest.&rdquo;
          </blockquote>
          <div style={{ fontSize: 13, opacity: 0.75, marginTop: 14 }}>— The Mycelium founding principle</div>
        </div>
      </div>
    </div>
  );
}
