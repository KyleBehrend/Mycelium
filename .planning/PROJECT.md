# Mycelium

## What This Is

Mycelium is a private, invite-only web platform that serves as centralized movement infrastructure for organizations working in the plant-based food system and animal advocacy space. It brings together campaign coordination, shared knowledge (with AI assistant powered by Claude), community engagement, and member networking into a single portal — like a fungal network connecting trees in a forest.

## Core Value

Movement organizations can coordinate campaigns, share knowledge, and strengthen each other through a unified platform that makes collective action visible and effortless.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Invite-only authentication with email/password and magic link invites
- [ ] 4-step onboarding flow (welcome, profile, streams, land well)
- [ ] Personalized dashboard with hero greeting, stats, feed, and follow-throughs
- [ ] Knowledge Hub with AI Assistant (Claude RAG), Resource Library, and Learning Feed
- [ ] Campaign Calendar with month/list views, detail modals, and submission flow
- [ ] Community hub with Social Engagement and Learnings Board
- [ ] Member Directory with network graph, people grid, and org views
- [ ] Admin panel with user management, knowledge ingestion, analytics, and moderation
- [ ] Settings with profile editing, stream selection, and notification preferences
- [ ] Command palette (⌘K) with search, navigation, and assistant shortcut
- [ ] 8 interest streams with color-coded badges throughout the platform
- [ ] Responsive layout with collapsible sidebar below 1024px

### Out of Scope

- Mobile native app — web-first, responsive design only
- Real-time chat/messaging — not in MVP scope
- Payment/subscription features — platform is invite-only, no billing
- Marketing/landing page — internal tool, no public-facing site
- Tweaks panel from design prototype — designer-only tool, strip from production

## Context

The design handoff includes high-fidelity HTML/React prototypes in `design_handoff_mycelium/design_files/`. These are pixel-perfect references — not production code. The "Faithful" design direction was selected for production. All visual design tokens, component structures, copy, interaction patterns, and SVG assets (MyceliumPattern, NetworkGraph, MyceliumMark) should be lifted directly from the prototypes.

Realistic sample data is provided in `src/data.js` covering 12 real-world organizations (Veganuary, ProVeg, GFI Europe, CIWF, etc.), campaigns, learnings, and member profiles — use for development seeding and understanding platform tone.

The platform targets the European plant-based/animal advocacy ecosystem. Copy and content tone should reflect professional, mission-driven collaboration.

## Constraints

- **Tech Stack**: Next.js 14+ (App Router), TypeScript, Tailwind CSS — per PRD specification
- **Database**: Supabase (PostgreSQL) with Row-Level Security — scaffolded with placeholder config
- **Auth**: Supabase Auth (email/password + magic link invites)
- **AI**: Anthropic Claude API with RAG via Supabase pgvector — real integration with placeholder key
- **Storage**: Supabase Storage for file uploads
- **Fonts**: DM Sans (headings), Inter (body), JetBrains Mono (mono) — Google Fonts
- **Icons**: Lucide React (`lucide-react`) — mapped from prototype's inline SVG set
- **Hosting**: Vercel-ready deployment
- **Design Fidelity**: Pixel-perfect recreation of the Faithful design direction

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Faithful design direction | Team selected over Editorial and Experimental variants | — Pending |
| Supabase for full backend | Auth + DB + Storage + Vector in one platform, simplifies infra | — Pending |
| Claude API for RAG assistant | PRD specifies Anthropic Claude, aligns with knowledge base needs | — Pending |
| Lucide React for icons | PRD calls for it, maps cleanly from prototype's inline SVGs | — Pending |
| No tweaks panel in production | Designer-only tool, not for end users | — Pending |

---
*Last updated: 2026-05-22 after initialization*
