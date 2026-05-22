# Handoff: Mycelium — Movement Infrastructure Platform

## Overview

Mycelium is a private, invite-only web platform that serves as centralized movement infrastructure for organizations working in the plant-based food system and animal advocacy space. It brings together campaign coordination, shared knowledge (with AI assistant), community engagement, and member networking into a single portal.

The name evokes the underground fungal network that connects trees in a forest — sharing nutrients, signaling, strengthening the whole ecosystem invisibly. The product does the same for the movement.

This handoff covers the full **MVP web platform** as scoped in the PRD: dashboard, knowledge hub (AI chat + resource library + learning feed), campaign calendar, community (social engagement + learnings board), member directory, onboarding, admin panel, settings, and a command palette (⌘K).

---

## About the Design Files

The files in `design_files/` are **design references created in HTML/React** — prototypes showing intended look and behavior. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's environment** using its established patterns. The PRD specifies the production stack as **Next.js 14+ (App Router) with TypeScript and Tailwind CSS**, with Supabase for auth/db/storage and Anthropic Claude for AI. If the codebase already exists, use its established patterns; if not, scaffold a Next.js project per the PRD.

The HTML prototype uses inline React (no JSX compilation), Babel standalone, and sample data hardcoded in `src/data.js`. The production app will need real data fetching via Supabase, route-based navigation (Next.js App Router) instead of in-memory screen state, real authentication, and Claude API integration for the assistant.

**What to lift directly:**
- All visual design tokens (colors, typography, spacing, border radius, shadows)
- Component structure and composition
- Copy/microcopy
- Interaction patterns
- Layout grids
- The mycelium network graph visualization (`NetworkGraph` and `MyceliumPattern` SVG components)
- The icon set (inline SVG `<Icon>` component)
- The general architecture of screen/component split

**What to re-implement using the target stack:**
- Routing (Next.js App Router pages instead of `screen` state)
- Data fetching (Supabase queries + RLS instead of `window.PEOPLE` etc.)
- Authentication (Supabase Auth instead of hardcoded `CURRENT_USER`)
- AI assistant (real Claude API with RAG via Supabase pgvector instead of canned responses)
- Form submission (server actions instead of toast notifications)
- File uploads (Supabase Storage instead of stubs)
- Notifications (Resend or Supabase Edge Functions)
- Tweaks panel (NOT for production — strip it out)

---

## Fidelity

**High-fidelity (hifi).** Pixel-perfect mockups with final colors, typography, spacing, and interactions. The developer should recreate the UI pixel-perfectly using the codebase's existing libraries and patterns, only deviating where production constraints require.

---

## Tech Stack (from PRD)

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) with Row-Level Security |
| Auth | Supabase Auth (email/password + magic link invites) |
| File Storage | Supabase Storage |
| AI | Anthropic Claude API |
| Vector DB | Supabase pgvector |
| Email | Resend or Supabase Edge Functions |
| Hosting | Vercel |

---

## Design Tokens

### Colors

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#1B4332` | Navigation, headings, primary buttons, sidebar active state |
| `primary-2` | `#2D6A4F` | Hover states, gradient stops, secondary elements |
| `accent` | `#40916C` | Tags, stream badges, link colors, accents |
| `accent-2` | `#74C69D` | Network graph highlights, light accents, dot indicators |
| `warm` | `#D4A373` | Featured badges, CTAs in hero, warm accents |
| `warm-deep` | `#B5651D` | Track Lead markers, "★" labels |
| `bg` | `#FAFAF8` | Page background |
| `surface` | `#FFFFFF` | Cards, panels, sidebar |
| `surface-2` | `#F0F4F1` | Alt rows, secondary panels, search field bg |
| `surface-3` | `#F6F4EF` | Warm tinted panels |
| `text` | `#1A1A1A` | Body text |
| `text-2` | `#6B7280` | Supporting text, timestamps |
| `text-3` | `#9CA3AF` | Disabled/tertiary text |
| `border` | `#E5E7EB` | Card borders, inputs |
| `border-soft` | `#EEF0EC` | Subtle dividers, card outlines |

### Stream Colors (one per interest stream)

| Stream | Color | Dot |
|---|---|---|
| Policy & Advocacy | `#2D6A4F` | `#40916C` |
| Public Health & Guidelines | `#52796F` | `#84A98C` |
| Consumer Campaigns | `#B5651D` | `#D4A373` |
| Corporate & Retail | `#6B4226` | `#A87C5F` |
| Alt-Proteins & Regulation | `#1B4332` | `#74C69D` |
| Movement Capacity | `#3D5A80` | `#7E9DC0` |
| Research & Evidence | `#5E548E` | `#9F86C0` |
| Fundraising & Grants | `#9B2226` | `#C9747A` |

### Typography

| Role | Family | Notes |
|---|---|---|
| Display / Headings | **DM Sans** (400, 500, 600, 700) | Letter-spacing -0.3 to -0.6 on large sizes |
| Body | **Inter** (400, 500, 600, 700) | Default UI font. Feature settings: `'cv11', 'ss01'`. `text-wrap: pretty` on long paragraphs |
| Mono | **JetBrains Mono** (400, 500) | Used for keyboard shortcuts (⌘K), source tags |

Type scale (used consistently):
- Screen titles: DM Sans 700, 30px, letter-spacing -0.5px
- Section headings (h2): DM Sans 600, 18px, letter-spacing -0.2px
- Card headings (h3): DM Sans 600, 14.5–16px
- Body: Inter, 13.5–14.5px, line-height 1.5–1.6
- Meta/captions: Inter 11–12.5px
- Eyebrows/labels: Inter 11.5px 600, uppercase, letter-spacing 1px, color `accent`

### Spacing & Radii

- Card padding: 14 (sm) / 18 (md) / 22 (lg) px
- Card radius: `--myc-radius-lg` = 14px (cards), 10px (small cards / inputs), 8px (buttons), 999px (pills)
- Grid gaps: 14–22px (varies by section)
- Page padding: 30px top, 40px sides, 80px bottom (in `.myc-main-inner`)
- Max content width: 1240px

### Shadows

```
--myc-shadow-sm: 0 1px 2px rgba(20, 35, 25, 0.04);
--myc-shadow-md: 0 4px 14px rgba(20, 35, 25, 0.06);
--myc-shadow-lg: 0 14px 40px rgba(20, 35, 25, 0.10);
```

Note shadows are tinted with the primary green (rgb 20,35,25) for warmth.

---

## Layout Architecture

### App Shell

A two-column grid:
- **Sidebar** (248px fixed width, sticky, full viewport height, scrolls internally if content overflows)
- **Main column** (1fr, scrolls naturally with the page)

Sidebar is `position: sticky; top: 0; height: 100vh; align-self: start;` so it stays in view as the user scrolls the main column.

Below 1024px viewport, sidebar collapses to icon-only (76px) — `.myc-brand-name`, `.myc-brand-sub`, nav item labels, and footer meta are hidden via media query.

### Sidebar Structure (top to bottom)

1. **Brand** — Mycelium logo mark (custom SVG, see `MyceliumMark` component) + wordmark + "Movement Infrastructure" eyebrow
2. **Command palette button** — opens ⌘K palette; shows "Search or ask…" + `⌘K` kbd
3. **Primary nav** — Dashboard, Knowledge Hub, Campaign Calendar, Community, Member Directory
4. **Divider**
5. **"Your Streams" section** — user's selected interest streams with colored dots + "Add a stream" link
6. **Divider**
7. **Secondary nav** — Admin (role-gated), Profile & Settings
8. **Footer** — User avatar + name + org + bell icon (notifications)

Active nav item: white text on `--myc-primary` background, radius 8px.
Hover: `--myc-surface-2` background.

---

## Screens

### 1. Onboarding (`src/screen-onboarding.jsx`)

4-step flow shown on first-run after invitation:
- **Step 0 — Welcome:** Greeting referencing who invited them; preview of what's inside
- **Step 1 — Profile:** Full name, organization, role, country, bio
- **Step 2 — Streams:** Multi-select grid of all 8 interest streams (2-col grid, cards with colored dot + label + check icon when selected)
- **Step 3 — Land well:** 3 suggested first actions (ask the assistant, browse calendar, post a learning)

**Layout:** Two-column 1.05fr / 1fr grid filling 100vh.
- Left: form panel, white background, generous padding (36px 44px)
- Right: deep forest green panel (`--myc-primary` background) with `MyceliumPattern` SVG decoration, a `NetworkGraph` viz in the middle, and a pull quote at the bottom about mycelium as a metaphor

**Footer of left panel:** Progress dots (active dot widens to 24px), Back/Continue buttons.

### 2. Dashboard (`src/screen-dashboard.jsx`)

Default landing screen.

**Layout (top to bottom):**

1. **Hero greeting** — Full-bleed gradient card (`linear-gradient(120deg, #1B4332 0%, #2D6A4F 60%, #40916C 100%)`) with:
   - Date eyebrow (uppercase, letter-spaced)
   - Two-line headline: "Good morning, {firstName}." + the most urgent thing happening (e.g. "The EFSA consultation closes in 54 days.")
   - Short context paragraph
   - Two CTAs: warm primary ("Open EFSA brief") + ghost ("Ask the assistant")
   - `MyceliumPattern` SVG overlay at opacity 0.14 in `#74C69D`

2. **Stats row** — 4-column grid of stat cards, each with a colored top-border accent (2px), big DM Sans 700 number, small uppercase label below.

3. **Two-column body grid (1.6fr / 1fr):**
   - **Left:** "For you, today" feed — filter pills (All / In your streams), then mixed feed cards. Four feed item types:
     - `campaign` (megaphone icon, FEATURED badge possible, "I supported this" button, supporter count)
     - `learning` (author avatar, title, snippet, stream badges, reaction counts)
     - `news` (AI summary purple gradient icon, source attribution, stream badge)
     - `social` (platform icon LinkedIn/X/IG, engagement request, "I engaged" button)
   - **Right sidebar widgets:**
     - "Your follow-throughs" — checkbox tasks with due dates and stream badges
     - "The network" — 220px-tall `NetworkGraph` widget with "Explore →" link
     - Track Lead pinned card (warm tint, pin icon)

### 3. Knowledge Hub (`src/screen-knowledge.jsx`)

Three tabs:

**Tab 1: AI Assistant** — Chat interface
- Left rail (220px): recent threads list with active highlight
- Right: chat panel with messages
  - User messages: user avatar + role label + message
  - Assistant messages: gradient circle with `MyceliumMark` + role label "Mycelium" + structured content (paragraphs, lists) + sources block at bottom (`--myc-surface-2` panel listing each source with mono `tag`, title, attribution)
- Suggestion buttons appear on empty thread (with arrow icon hover transform)
- Input area: textarea + "Ask" button (turns green when text is present)
- Thinking state: three bouncing dots animation (`@keyframes dotBounce`)
- Below input: small caption "Answers cite their sources. Knowledge base updated nightly · 1,247 documents indexed."

**Tab 2: Resource Library**
- Search bar (with leading search icon) + view toggle (grid/list) + Upload button
- Filter pills: All streams + each of 8 streams (each pill shows stream's colored dot)
- Grid view: 3-column DocCard grid. Each card: stream-colored top border, type eyebrow, bookmark icon, title (DM Sans 600 14.5px), source, stream badge + size/downloads at footer
- List view: rows with stream-tinted icon square, title + meta, stream badge, downloads count, download button

**Tab 3: Learning Feed**
- AI-summarized news items
- Filter pills (All / In your streams / Featured)
- Feed items styled like dashboard `news` cards but full-width

### 4. Campaign Calendar (`src/screen-calendar.jsx`)

- Header with "Submit a campaign" primary button + "Subscribe to .ics" secondary
- Filter pills for streams
- View toggle: Month / List
- **Month view:** 7-column grid (Mon-Sun headers), each cell shows day number + up to 3 stream-tinted event chips. Today's cell shows day number as a filled green circle.
- **List view:** vertical list of campaign cards. Each card: large date column (month abbrev uppercase + day in DM Sans 700 28px), org logo + name + FEATURED badge, title, description, stream badges, supporter count
- **Campaign detail modal:** opens on click. Stream-tinted header bar, big title, org info, dates/supporters/support-type stats row, description, "The ask" highlighted in cream/orange box, supporter button + Resources + Save actions
- **Submit modal:** form with title, dates, ask, stream selection

### 5. Community (`src/screen-community.jsx`)

Two tabs:

**Tab 1: Social Engagement**
- Two-column 1.6fr / 1fr grid
- Left: filter pills (All platforms / LinkedIn / X / Instagram) + post cards. Each card: author avatar, name/role/org, platform icon square (colored: LinkedIn `#0a66c2`, X `#000`, IG `#E1306C`), description, "The ask" box (surface-2 tinted), stream badges, member count, "I engaged" button
- Right: "Top engagers this month" leaderboard (rank, avatar, name/org, count) + "Submit your post" form

**Tab 2: Learnings Board**
- Filter pills (All / In your streams / Most reacted / Pinned)
- Vertical list of learning cards. Each: author avatar (40px), name + org + when, PINNED badge if applicable, large title (DM Sans 600 18px), body (Inter 14px 1.6 line-height), stream badges, reaction button row (Helpful / Insightful / Save / comments count)

### 6. Member Directory (`src/screen-directory.jsx`)

Three view modes (toggle in header):

- **Network view:** Full-card with `NetworkGraph` filling the canvas (540px tall). Title overlay top-left, stats overlay bottom-right (12 orgs / 142 members / 14 countries)
- **People view:** 3-column grid of person cards. Avatar + name + role + org/country + Track Lead marker (gold ★) if applicable + stream badges
- **Orgs view:** 3-column grid of org cards. Org logo (colored square) + name + country + stream badges + member count

Clicking a person opens a profile modal with full-bleed colored header (using person's tint color), avatar, name, role, streams, Send Message / View Profile actions.

### 7. Admin Panel (`src/screen-admin.jsx`)

Role-gated (Admin + Track Lead).

Four tabs:
- **Users & Invites:** 3-stat row (Total / Pending / Open invitations) + pending approvals list (with Approve/Decline buttons) + invitation links grid (Summit / K4G / SPA cohorts)
- **Knowledge Ingestion:** Big stats card (1,247 docs / 84,309 chunks / 312 queries) + Upload button + recent ingestions list with INDEXED/PROCESSING status badges
- **Analytics:** 3-stat row (WAU / queries / engagement) + bar chart by stream (last 30 days)
- **Moderation:** Empty state when nothing is flagged

### 8. Settings (`src/screen-admin.jsx` — `Settings` component)

Two-column grid:
- Left: Personal info form (photo, name, role, country, bio, Save) + Streams multi-select
- Right: Notifications (digest frequency pills + checkboxes) + "Connect to Claude via MCP" panel with copyable URL

### 9. Command Palette (`src/cmdk.jsx`)

Overlay activated by ⌘K (or Ctrl+K). Backdrop blur + tint.

- Input field at top with search icon and esc kbd hint
- Results grouped by kind: Navigate / People / Resources / Campaigns
- Each result: icon or avatar + label + subtitle + hint ("Go to", "Profile", "Open", "View")
- Special behavior: if query ends with `?` or is 3+ words, top result is "Ask Mycelium: {query}" (with gradient sparkles icon)
- Keyboard nav: ↑↓ arrows, ↵ to select, esc to close
- Footer: keybinding legend + "End a query with ? to ask the assistant" hint

---

## Key Components (Reusable)

These are the components defined in `src/components.jsx` — recreate them as proper React/TypeScript components in your codebase:

### `<StreamBadge stream={streamId} size="sm" | "lg" muted={bool}>`
Inline pill with stream's colored dot + short label. Background is stream color at 8% alpha by default.

### `<Avatar person={person} size={n} ring={bool}>`
Circle with linear-gradient background using person's `tint` color (darker top-left → lighter bottom-right). Initials in DM Sans 600 white text. Ring variant adds a 2px outset glow.

### `<OrgLogo org={org} size={n}>`
Rounded square (6px radius) with org's `tint` background, white "logo" letters (1–2 chars) in DM Sans 700.

### `<Icon name="..." size={18} stroke={1.6}>`
Inline SVG icon set. Lucide-style (1.6 stroke, round caps). Available: home, sparkles, book, calendar, megaphone, sprout, users, settings, shield, search, plus, send, chevR, chevD, bookmark, heart, bell, download, filter, msg, cmd, arrow, external, pin, twitter, linkedin, instagram, check, x, grid, list. **In production, use Lucide React (`lucide-react`)** — the PRD calls for it. Map these names to Lucide equivalents.

### `<MyceliumPattern density={1} opacity={0.06} color="#1B4332">`
Background SVG: 28 short curved lines (Bézier paths) plus 18 dots, seeded-random positioned. Use as an ambient decoration on hero/dark panels. The seed function `seed(n) = (Math.sin(n) * 10000) % 1` produces deterministic positions.

### `<NetworkGraph width={n} height={n} highlight={orgId}>`
SVG force-directed-style graph. Org nodes (colored circles, sized by member count) arranged in an outer ring; person nodes (small white-bordered circles) in an inner ring. Edges drawn as curved Bézier paths — green for membership, gray for shared streams. Highlighted node gets a glow filter. Includes a radial gradient atmosphere behind.

### `<MyceliumMark size={32} color="#1B4332">`
The Mycelium logo mark — a small network glyph (center node + 7 connected outer nodes + radiating lines). See `components.jsx` for exact SVG.

### `<Sidebar>`, `<ScreenHeader>`, `<Card>`, `<Button>` — see `components.jsx`

---

## Interactions & Behavior

### Navigation
- Sidebar nav clicks change the current screen
- ⌘K (or Ctrl+K) anywhere opens the command palette
- ESC closes modals and the command palette
- In the command palette: ↑↓ to navigate, ↵ to select
- Sidebar is sticky — stays visible when main column scrolls

### Toast notifications
- Slide up from bottom-right
- Auto-dismiss after 3.2 seconds
- Success variant uses primary green; default uses dark text color
- Triggered by user actions: marked supported, saved, bookmarked, engaged, submitted, etc.

### Hover states
- Cards: shadow elevation (`--myc-shadow-md`) + border darkens to `--myc-border`
- Buttons: primary darkens to `--myc-primary-2`; secondary lifts to `--myc-surface-2`
- Network graph nodes: glow filter on hover
- Suggestion buttons in chat: arrow icon slides right + color shifts to primary

### Animations
- Toast entry: `tFade` keyframe — translateY(8px) + opacity 0 → 1 over 0.25s
- Chat thinking dots: `dotBounce` keyframe — bounces 4px with staggered 0.15s delays
- Skeleton loaders: `skel` keyframe — background-position sweep for shimmer
- Network graph "central node": SVG `<animate>` for breathing ring expansion (3.5s loop)
- All button/card hovers: 0.12–0.15s ease transitions

### Form behavior
- Inputs: 1px border, 8px radius, focus state adds 3px green outline ring (rgba(64, 145, 108, 0.12))
- Stream selection cards: click toggles is-selected state — border thickens to 1.5px primary + light green tint background
- Submit actions trigger toast on completion

### Modals
- Full-screen overlay with `rgba(20, 35, 25, 0.45)` backdrop + `backdrop-filter: blur(4px)`
- Click outside or X button to close
- Centered, max-width 520–640px, scrolls internally if content overflows

### Responsive
- Below 1024px: sidebar collapses to icon-only (76px), grid columns stack
- Below 900px: hero illustration hidden via `.myc-hide-sm`

---

## State Management

**For Next.js production app:**

### Server state (Supabase + RSC)
- User session, profile, organization → from Supabase Auth context
- Campaigns, learnings, social posts, knowledge docs, members → server-side queries with RLS
- Feed items → composed server-side from multiple sources, filtered by user's streams

### Client state
- Current screen (handle via Next.js routing — `/dashboard`, `/knowledge`, `/calendar`, `/community`, `/directory`, `/admin`, `/settings`)
- Filter pills (stream, platform, view mode) → URL search params or React state
- Modal open/closed states → React state
- Command palette open + query + active index → React state + global keyboard listener
- Chat message thread → React state, persisted server-side as `knowledge_conversations` rows
- Toast queue → context provider with timeout cleanup
- Form drafts → uncontrolled inputs + server actions for submit, or react-hook-form

### State transitions
- Onboarding completion → mark user as approved, redirect to `/dashboard`
- "I supported this" → optimistic update + insert `campaign_engagements` row
- "I engaged" → optimistic update + insert `social_engagements` row
- Submit campaign → insert `campaign_events` row with status=pending, route Track Lead notification
- Chat send → stream response from Claude API (server route), append messages to thread, save to `knowledge_messages`
- ⌘K query ending with `?` → navigate to `/knowledge` with pre-filled query

---

## Data Model (from PRD)

Database tables (Supabase / Postgres):
- `users` — id, email, full_name, avatar_url, bio, role (member/track_lead/admin), organization_id, country, interest_streams[], notification_preferences (jsonb), invited_by, approved_at
- `organizations` — id, name, website, logo_url, country, streams[]
- `knowledge_documents` — title, source_type, file_url, streams[], uploaded_by, access_level
- `knowledge_chunks` — document_id, content, embedding (vector 1536), chunk_index, metadata
- `knowledge_conversations` — user_id, title
- `knowledge_messages` — conversation_id, role, content, sources (jsonb)
- `learning_feed_items` — title, summary, source_url, source_name, streams[], ai_generated, featured
- `campaign_events` — title, description, start_date, end_date, streams[], organization_id, created_by, call_to_action, support_type[], external_links (jsonb), status, approved_by
- `campaign_engagements` — campaign_event_id, user_id, engagement_type, notes
- `social_posts` — user_id, platform, post_url, description, engagement_request, streams[]
- `social_engagements` — social_post_id, user_id
- `learnings` — user_id, title, content, streams[], pinned
- `learning_reactions` — learning_id, user_id, type (helpful/insightful/bookmarked)
- `learning_comments` — learning_id, user_id, content

Row-level security is required across the board. Users only see content their access level + org membership permits.

---

## Sample Data Reference

`src/data.js` contains the realistic sample dataset used in the prototype. Treat it as a content reference (org names, campaign titles, learning excerpts, user titles) for **seeding the development environment** and for understanding the tone of copy throughout the platform.

Realistic orgs referenced: Veganuary, ProVeg International, Good Food Institute Europe, Compassion in World Farming, The Vegan Society, Eurogroup for Animals, Danish Vegetarian Association, Albert Schweitzer Stiftung, L214, Animal Equality, Stray Dog Institute, Faunalytics.

Realistic campaigns referenced: Veganuary 2027 launch, EU Dietary Guidelines consultation, "Better by Plants" Albert Heijn campaign, End the Cage Age implementation push, Plant-based School Meals (Denmark), Plant Food System Summit (Berlin, Nov 2026), Alt-Protein Regulation briefing (DG SANTE).

---

## Assets

- **Fonts:** DM Sans, Inter, JetBrains Mono — all from Google Fonts. PRD calls for these directly.
- **Icons:** Use Lucide React in production (`lucide-react` package). The prototype's inline SVG icons map to Lucide names cleanly (home → Home, sparkles → Sparkles, megaphone → Megaphone, etc.)
- **Logo:** The `MyceliumMark` is custom SVG — see `src/components.jsx`. No external image dependencies. The brand could be elevated by commissioning a professional logo, but the network-glyph mark is on-brand and works.
- **Network graph:** Generated procedurally from data. No external libraries needed — pure SVG. If the graph grows beyond ~20 nodes, consider `d3-force` for proper force-directed layout.
- **Mycelium pattern:** Procedural SVG (seeded random). No assets.

No image assets (photos, illustrations) are used in the prototype. Production may want to add: organization logos (real ones, sourced or uploaded), user avatars (Supabase Storage), and possibly a hero illustration for the marketing site.

---

## Files in `design_files/`

```
design_files/
├── Mycelium.html                  ← Main interactive prototype entry point
├── Mycelium — Variations.html     ← Design canvas with 3 dashboard variations
├── design-canvas.jsx              ← Starter component used by Variations file (canvas chrome)
└── src/
    ├── data.js                    ← Sample data: streams, orgs, people, campaigns, learnings, social posts, docs, news
    ├── styles.css                 ← All design tokens + screen-specific styles (CSS variables under :root)
    ├── components.jsx             ← Shared components: Sidebar, Card, Button, StreamBadge, Avatar, OrgLogo,
    │                                Icon, NetworkGraph, MyceliumPattern, MyceliumMark, ScreenHeader
    ├── app.jsx                    ← Main App shell: navigation state, command palette wiring, tweaks
    ├── tweaks-panel.jsx           ← Tweaks panel (REMOVE for production — designer-only tool)
    ├── cmdk.jsx                   ← Command palette (⌘K)
    ├── screen-onboarding.jsx      ← 4-step onboarding flow
    ├── screen-dashboard.jsx       ← Personalized home feed + stats + sidebar widgets
    ├── screen-knowledge.jsx       ← AI Assistant + Resource Library + Learning Feed (3 tabs)
    ├── screen-calendar.jsx        ← Campaign calendar (month + list views) + detail modal + submit modal
    ├── screen-community.jsx       ← Social Engagement Hub + Learnings Board (2 tabs)
    ├── screen-directory.jsx       ← Member Directory (3 views: network/grid/orgs)
    ├── screen-admin.jsx           ← Admin panel + Settings (4 tabs in admin)
    ├── variation-faithful.jsx     ← Dashboard direction A (matches the main prototype)
    ├── variation-editorial.jsx    ← Dashboard direction B (alt explored, not selected for production)
    └── variation-experimental.jsx ← Dashboard direction C (alt explored, not selected for production)
```

**Selected direction:** The "Faithful" direction (matching `Mycelium.html`). The Editorial and Experimental variants in the canvas are included for reference only — the team chose Faithful as the production direction.

---

## Implementation Priority

Per the PRD's phased build plan, here's the recommended Claude Code build order:

### Phase 1: Foundation (Weeks 1–2)
1. Scaffold Next.js + TypeScript + Tailwind + Supabase project
2. Configure design tokens in `tailwind.config.ts` (colors, fonts, radii, shadows from the tables above)
3. Build the app shell (`AppLayout` with `Sidebar` + main column, sticky sidebar pattern)
4. Implement authentication flow + invite system
5. Build onboarding flow (steps 0–3)
6. Database schema + RLS policies per PRD section 4

### Phase 2: Dashboard & Community (Weeks 3–4)
7. Dashboard with feed cards (no AI summaries yet — those come in phase 3)
8. Campaign Calendar (month + list + detail modal + submit modal)
9. Social Engagement Hub
10. Learnings Board
11. Member Directory (start with grid/orgs views; network viz can come later)

### Phase 3: Knowledge Hub (Weeks 5–6)
12. pgvector setup + document ingestion pipeline
13. AI Assistant with RAG + source attribution
14. Resource Library
15. Learning Feed with AI summaries
16. Network graph visualization for Directory

### Phase 4: Polish & Launch (Week 7+)
17. Admin panel + analytics
18. Command palette (⌘K)
19. Mobile responsive audit
20. Performance optimization
21. Security audit (RLS, API routes)
22. Seed initial content
