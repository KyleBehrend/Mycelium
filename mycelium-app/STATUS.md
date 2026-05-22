# Mycelium — Project Status

**Last updated:** 2026-05-22
**Live URL:** https://mycelium-app.vercel.app
**Repo:** https://github.com/KyleBehrend/Mycelium

---

## What Mycelium Is

Mycelium is a private, invite-only web platform that serves as centralized movement infrastructure for organizations working in the plant-based food system. It brings together campaign coordination, shared knowledge (with AI assistant), community engagement, live news signals, and member networking into a single portal.

The name evokes the underground fungal network that connects trees in a forest — sharing nutrients, signaling, strengthening the whole ecosystem invisibly.

Built around the **14 topic tracks** of the [Plant Food System Summit](https://foodsystemsummit.org/) (Berlin, Nov 21-22 2026).

---

## Current State: Frontend MVP Complete

The full frontend is built and deployed. All screens render with realistic sample data, interactive state management, and live news integration. No backend/database yet — all data is client-side.

### Tech Stack

| Layer | Technology | Status |
|-------|-----------|--------|
| Framework | Next.js 16 (App Router) | Deployed |
| Language | TypeScript | Done |
| Styling | Tailwind CSS v4 + custom CSS | Done |
| Icons | Lucide React + custom SVG (social) | Done |
| Fonts | DM Sans, Inter, JetBrains Mono (Google Fonts) | Done |
| News | Google News RSS via API route | Live |
| Hosting | Vercel | Deployed |
| Database | Supabase (PostgreSQL) | Not started |
| Auth | Supabase Auth | Not started |
| AI | Anthropic Claude API | Not started |
| Vector DB | Supabase pgvector | Not started |
| Storage | Supabase Storage | Not started |
| Email | Resend or Supabase Edge Functions | Not started |

### Screens Built

| Screen | Description | Interactive? |
|--------|-------------|-------------|
| **Dashboard** | Hero greeting, 4 stat cards, personalized feed (campaigns, learnings, AI news, social posts), follow-throughs widget, network graph, Signals widget, track lead pinned card | Yes — stream filtering, feed pills, checkbox tasks, navigation |
| **Knowledge Hub** | AI Assistant chat with sources + thinking dots, Resource Library (grid/list with search + stream filters), Learning Feed with AI summaries | Yes — chat sends messages, library filters, view toggle |
| **Signals** | Live Google News RSS filtered by 14 summit streams, save/share actions, stream filter pills | Yes — live data, stream filtering, save state |
| **Campaign Calendar** | Month grid + list views, campaign detail modal with "The Ask" box, submit campaign modal | Yes — month navigation, stream filters, view toggle, modal interactions |
| **Community** | Social Engagement hub with platform badges (LinkedIn/X/Instagram), engagement tracking, leaderboard; Learnings Board with reactions | Yes — platform filters, engagement state, reactions |
| **Member Directory** | Network graph visualization, people grid with search + stream filters, orgs view, person profile modal | Yes — view toggle, search, stream filters, modal |
| **Admin** | Users & invites (pending approvals), Knowledge ingestion pipeline, Analytics bar chart, Moderation | Yes — approve/decline removes from list, dynamic counts |
| **Settings** | Profile editing, stream selection (synced globally), notification preferences, MCP connection URL | Yes — stream toggling updates sidebar + all screens |
| **Onboarding** | 4-step flow (Welcome → Profile → Streams → Land well) with right-panel network graph + quote | Yes — step navigation, form inputs, stream selection |
| **Command Palette** | ⌘K search across everything, AI ask shortcut, keyboard navigation | Yes — search filtering, keyboard nav, screen navigation |

### 14 Summit Tracks (Streams)

All mapped to unique colors and wired across the full app:

| Stream | Short | Color |
|--------|-------|-------|
| Public Health | Health | #52796F |
| Research & Academia | Research | #5E548E |
| Policy Change | Policy | #2D6A4F |
| Corporate & Industry | Corporate | #6B4226 |
| Culinary Training | Culinary | #B5651D |
| Farm Adaptation | Farm | #3A5A40 |
| Retailer Engagement | Retail | #4A6741 |
| Consumer Engagement | Consumer | #C46210 |
| Public Food | Public Food | #1B6B5A |
| Universities | Universities | #3D5A80 |
| Media & Film | Media | #9B2226 |
| Capacity Building | Capacity | #1B4332 |
| Careers & Talent | Careers | #7B2D8E |
| Law & Litigation | Law | #5C4033 |

### What's Functional

- Sidebar stream clicks filter the dashboard feed
- "Add a stream" shows inline picker dropdown
- Settings stream picker updates sidebar + feed globally
- Dashboard feed filter pills (All / In your streams)
- Follow-through checkboxes with strikethrough + dynamic count
- Calendar month navigation (< > Today)
- Calendar stream filter pills
- Campaign detail + submit modals
- Community platform filters (LinkedIn/X/Instagram)
- Community engagement tracking (I engaged → state change)
- Learnings Board reactions (Helpful/Insightful/Save)
- Knowledge Hub chat with sample responses + thinking animation
- New Thread clears chat
- Resource Library search + grid/list + stream filters
- Admin approve/decline with dynamic pending count
- Notification digest frequency toggle
- MCP URL copy to clipboard
- Command palette with search, keyboard nav, AI ask shortcut
- Toast notification system
- Live news via Google News RSS (Signals)

---

## What's Needed Next

### Phase 1: Backend Foundation (Supabase)

**Goal:** Replace sample data with real database, add authentication.

| Task | Priority | Complexity |
|------|----------|-----------|
| Create Supabase project + configure env vars | High | Low |
| Design database schema (users, orgs, campaigns, learnings, social_posts, knowledge_docs, etc.) | High | Medium |
| Write SQL migrations with Row-Level Security policies | High | Medium |
| Implement Supabase Auth (email/password + magic link invites) | High | Medium |
| Build login/signup pages | High | Medium |
| Protect routes — redirect to login if unauthenticated | High | Low |
| Role-based access control (member, track_lead, admin) | High | Medium |
| Seed database with sample data (migrate from data.ts) | Medium | Low |
| Onboarding flow saves profile + streams to DB | High | Medium |

### Phase 2: Data Persistence

**Goal:** All user actions persist to the database instead of local state.

| Task | Priority | Complexity |
|------|----------|-----------|
| Campaign support tracking (persist engagements) | High | Low |
| Social engagement tracking (persist) | High | Low |
| Learning reactions + comments (persist) | High | Medium |
| Follow-through tasks — CRUD per user | High | Medium |
| User profile editing saves to DB | High | Low |
| Stream preferences save to user record | High | Low |
| Campaign submission creates DB record (pending approval) | Medium | Low |
| Social post submission creates DB record | Medium | Low |

### Phase 3: AI Knowledge Hub

**Goal:** Real Claude-powered RAG assistant with document ingestion.

| Task | Priority | Complexity |
|------|----------|-----------|
| Set up Supabase pgvector extension | High | Medium |
| Build document upload + chunking pipeline | High | High |
| Generate embeddings (1536-dim) for document chunks | High | Medium |
| Build API route for Claude chat with RAG | High | High |
| Vector similarity search for source retrieval | High | Medium |
| Source attribution in chat responses | High | Medium |
| Chat thread persistence (create, list, switch, delete) | Medium | Medium |
| Streaming responses from Claude API | Medium | Medium |
| Knowledge base stats (docs indexed, chunks, queries) in Admin | Low | Low |

### Phase 4: Real-time & Notifications

**Goal:** Live updates and email notifications.

| Task | Priority | Complexity |
|------|----------|-----------|
| Bell icon → notification dropdown panel | Medium | Medium |
| Supabase Realtime subscriptions for live feed updates | Medium | High |
| Email digest (daily/weekly) via Resend | Medium | Medium |
| New campaign notification to relevant stream members | Medium | Medium |
| Engagement request notifications | Low | Low |
| Admin alerts for pending approvals | Low | Low |

### Phase 5: Polish & Launch

**Goal:** Production-ready for summit attendees.

| Task | Priority | Complexity |
|------|----------|-----------|
| File uploads (avatars, documents) via Supabase Storage | Medium | Medium |
| Mobile responsive audit + fixes | Medium | Medium |
| Performance optimization (lazy loading, code splitting) | Medium | Medium |
| Security audit (RLS policies, API route validation, XSS) | High | Medium |
| Error boundaries + loading states for all screens | Medium | Low |
| SEO meta tags + Open Graph images | Low | Low |
| Custom domain setup (mycelium.org or similar) | Low | Low |
| Seed production data (real orgs, real people, summit content) | High | Medium |
| Invite system for summit attendees | High | Medium |
| Analytics tracking (WAU, queries, engagement) | Medium | Medium |
| Calendar .ics export (real implementation) | Low | Medium |

---

## Content Notes

- **Abolitionist framing only** — no welfarist orgs or campaigns. All content focuses on plant-based food system transformation, not animal welfare reform.
- **SPAA** (not SPA) — all references use the correct acronym.
- **Summit alignment** — streams, orgs, and campaigns are shaped around the Plant Food System Summit ecosystem.
- **Sample orgs:** Veganuary, ProVeg International, GFI Europe, The Vegan Society, Danish Vegetarian Assoc., Albert Schweitzer Stiftung, L214, Animal Equality, Stray Dog Institute, Faunalytics, Planetary Plates Network, European Alliance for Plant-based Foods.

---

## File Structure

```
mycelium-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          — Root layout (fonts, metadata)
│   │   ├── page.tsx            — Entry point → AppShell
│   │   ├── globals.css         — All design tokens + component styles
│   │   └── api/news/route.ts   — Google News RSS API endpoint
│   ├── components/
│   │   ├── app-shell.tsx       — Main shell (sidebar, nav, routing, context)
│   │   ├── command-palette.tsx — ⌘K command palette
│   │   ├── news-feed.tsx       — SignalsWidget + NewsFeedCard
│   │   ├── ui.tsx              — Shared components (Icon, Avatar, Card, Button, etc.)
│   │   └── screens/
│   │       ├── dashboard.tsx
│   │       ├── knowledge.tsx
│   │       ├── signals.tsx
│   │       ├── calendar.tsx
│   │       ├── community.tsx
│   │       ├── directory.tsx
│   │       ├── admin.tsx
│   │       ├── settings.tsx
│   │       └── onboarding.tsx
│   └── lib/
│       ├── data.ts             — Sample data + types (14 streams, orgs, people, etc.)
│       └── news.ts             — Stream search terms, RSS parser, timeAgo
├── .env.local                  — Supabase + Anthropic placeholder keys
├── .env.example                — Committable env template
└── package.json
```

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Client-side routing (not Next.js file routes) | MVP speed — all screens in one SPA shell. Migrate to file-based routes when adding auth/SSR. |
| Google News RSS for Signals | Free, no API key needed, covers all streams. Upgrade to a paid news API for better quality later. |
| 14 streams from summit tracks | Direct alignment with Plant Food System Summit topic structure. |
| Sample data in TypeScript | Fast iteration without DB dependency. Easy to migrate — types match planned schema. |
| No welfarist content | Abolitionist framing only per project direction. |
| Tailwind v4 + custom CSS | Tailwind for utility classes, custom CSS for the design system tokens matching the hi-fi prototype. |
