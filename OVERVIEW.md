# Mycelium — Overview & Build Notes

*Movement infrastructure for the plant-based food system.*
Last updated: 31 May 2026

---

## 1. What is Mycelium?

**Mycelium is a shared operating system for a movement** — the coordination layer
that lets the many independent nonprofits, campaigners, researchers, and funders
working on the same cause behave like one connected network instead of scattered
silos.

It's built around the real **Plant Food System Summit** (Berlin, 21–22 November
2026) and its **14 work "streams"** (the Summit tracks). Streams are the
organising principle of the whole product: you follow the streams you care about,
and every part of the hub — campaigns, knowledge, people, signals — re-focuses
around them.

The name comes from the forest: a mycelial network is the underground web that
connects trees and shares resources between them. *No single tree is the forest.*
Mycelium is that connective tissue for a movement.

### How to describe it (pitch language)

Pick the framing that fits your audience:

- **One-liner (broad):**
  *"Mycelium is an operating system for movements — shared infrastructure that
  turns scattered nonprofits into one connected network."*

- **One-liner (precise):**
  *"Mycelium is the coordination layer for a movement: one place to see every
  campaign, share what works, amplify each other, and find the right people —
  organised around the issues you work on."*

- **Short paragraph:**
  *"Most causes aren't held back by a lack of organisations — they're held back by
  those organisations being disconnected. Mycelium is shared infrastructure that
  connects them: a 'shop by stream' hub where members follow the topics they work
  on and instantly see the live campaigns, playbooks, research signals, events, and
  people in that space. Think of it as an operating system for a movement — the
  layer everyone runs on top of."*

- **The metaphor line (memorable):**
  *"A forest with a healthy mycelial network is dramatically more resilient than
  one without. No single tree is the forest."*

**A note on "nonprofit operating system":** it's catchy and lands well with people
who think in software terms — but "OS" can read as *back-office* tooling for a
*single* org (donor CRM, HR, accounting). Mycelium is the opposite end: it's the
**between-orgs coordination layer** for a *whole* movement. If that distinction
matters to your audience, lead with **"coordination OS for a movement"** or
**"movement infrastructure"**; if you just want the evocative hook, **"a nonprofit
operating system"** works.

---

## 2. The core idea: shop by stream

The 14 streams *are* the product. Each maps to a Summit track and owns an accent
colour and a hand-rendered 3D "clay" icon:

> Public Health · Research & Academia · Policy Change · Corporate & Industry ·
> Culinary Training · Farm Adaptation · Retailer Engagement · Consumer Engagement ·
> Public Food · Universities · Media & Film · Capacity Building · Careers & Talent ·
> Law & Litigation

The **stream filter** is the central interaction:

- It's **multi-select** and **persists across every page**.
- It **defaults to the streams you follow**, so the hub opens focused on what you
  care about.
- Pick **one** stream to zoom into a focused view (its own hero, tagline, stats),
  toggle **several** for a custom slice, or clear to **All streams**.
- Selecting a stream re-focuses the dashboard, calendar, knowledge library,
  signals, community and directory all at once.

This is the "shop by stream" model: streams are the aisles; everything else is
merchandised under them.

---

## 3. What's built (feature tour)

A working, high-fidelity web app with eight screens:

| Screen | What it does |
|---|---|
| **Onboarding** | 4-step welcome → profile → **clay-tile stream picker** → "how to land well". Sets the streams you follow. (Demo: always shown on load.) |
| **Dashboard** | Hero that reflects where you are (logo + greeting, or a focused stream's icon + tagline + stats), the **"Browse all 14 streams"** rail, a personalised feed (campaigns, learnings, signals, amplification asks), plus widgets: follow-throughs, the network graph, a live signals digest, and Track-Lead pins. |
| **Knowledge Hub** | **AI Assistant** (cites its sources), a filterable **Resource Library** (playbooks, toolkits, reports, transcripts), and an AI-summarised **Learning Feed**. |
| **Signals** | **Live** news & research per stream — what's shifting in the data. |
| **Campaign Calendar** | Month grid + list of real campaigns, "running all month" rail, an Upcoming rail, campaign detail + submit-a-campaign flows, .ics subscribe. |
| **Community** | A composer, **Social Engagement** (amplify each other's posts) and a **Learnings Board** (share what worked). |
| **Member Directory** | People / Organisations / **Network graph** views — connections form through shared streams. |
| **Admin** | Users & invites, knowledge-base ingestion, analytics by stream, moderation. |
| **Profile & Settings** | Identity, stream subscriptions, notifications, and an MCP connection URL (use the knowledge base from your own Claude). |

A ⌘K **command palette** jumps to any screen, person, doc, or campaign.

---

## 4. The design system ("Stream Shop")

A warm, earthy, natural-pigment system — deliberately *not* an admin dashboard,
so it's a place members *want* to return to.

- **Palette:** clay / paper / moss. Paper `#F1E8D7`, warm cream surfaces
  `#FCF8F0`, ink `#241F1A`, brand green `#2D5247`. All tokens live in one place
  (`globals.css`) under `--myc-*` names.
- **Type:** `DM Sans` for everything; `JetBrains Mono` for eyebrows, labels and
  counts.
- **Icons:** bespoke 3D clay renders — one per stream, one per nav section, plus
  the logo. Rendered on the warm surfaces with `mix-blend-mode: multiply`, so the
  cream tile melts away and the sculpted shape reads (no hard white squares). The
  primary logo is a background-removed transparent mark so it floats on the hero.
- **Accents:** every stream drives its chips, hero wash, stat numbers and active
  rings off one icon-derived accent colour (`--ac`).

---

## 5. Architecture & tech stack

- **Framework:** Next.js 16.2.6 (App Router, Turbopack), React 19.
- **Styling:** Tailwind v4 + a custom CSS design-token layer; no component library
  — bespoke components in `src/components/`.
- **Icons:** `lucide-react` for UI glyphs; PNG clay art in `public/`.
- **State:** a single React context (`AppShell`) holds `userStreams` (what you
  follow) and `activeStreams` (the persistent multi-select filter). No router-based
  navigation yet — screens swap via state, which keeps the demo snappy.
- **Live data:** `/api/news` fetches Google News RSS per stream (30-min cache).
- **Hosting:** Vercel (auto-deploys on push to `main`). Live at
  **https://mycelium-app.vercel.app**.

### Project layout

```
mycelium-app/
  src/
    app/
      layout.tsx          # fonts (DM Sans + JetBrains Mono), metadata
      globals.css         # the entire design system (tokens + components)
      page.tsx            # renders <AppShell/>
      api/news/route.ts   # live Google News per stream
    components/
      app-shell.tsx       # sidebar, topbar, nav, stream context (the spine)
      ui.tsx              # primitives: Icon, StreamIcon, StreamBadge,
                          #   StreamFilterBar, Avatar, Card, Button, graphs
      command-palette.tsx # ⌘K
      news-feed.tsx       # signals widget
      screens/            # dashboard, knowledge, signals, calendar,
                          #   community, directory, admin, settings, onboarding
    lib/
      data.ts             # seed domain data + helpers (the source of truth)
      news.ts             # stream→search-term map + RSS parser
  public/                 # clay icons: /streams/*, /nav/*, logo, logo-mark
```

### Data model (`src/lib/data.ts`)

Typed seed data that mirrors a future database schema:

- `Stream` — id, label, accent colour, tagline (14 of them)
- `Org`, `Person` — the network (with stream memberships)
- `Campaign` — real movement campaigns with dates, asks, supporters
- `Learning`, `SocialPost` — community content
- `KnowledgeDoc`, `LearningFeedItem` — the knowledge base
- Helpers: `streamById`, `streamActivityCount`, `matchesStreams`/`matchesStream`
  (the multi-select filter logic)

The seed content is **real**: Veganuary 2027, Project Slingshot, Plant-Rich
Europe, the EU plant-based labelling fight, GFI's €111bn analysis, ProVeg School
Plates, the Berlin Summit itself, and real organisations and roles.

---

## 6. Current status — what's real vs. demo

Being precise so nobody's surprised:

| Area | State |
|---|---|
| Design system, all 8 screens, navigation, stream filter | ✅ Real and working |
| Domain data (campaigns, orgs, people, resources) | ✅ Real content, served from in-memory seed (no DB yet) |
| **Signals** news feed | ✅ Live (Google News RSS) |
| Onboarding | ✅ Working (demo: shown on every load so anyone with the link sees it) |
| **AI assistant** | ⚙️ Scripted demo responses; `ANTHROPIC_API_KEY` slot scaffolded, not yet called |
| Engagement actions (support / save / engage) | ⚙️ UI + toasts; not yet persisted |
| **Auth & persistence (Supabase)** | ⚙️ Dependencies + env scaffolded; **not yet wired** |
| MCP knowledge endpoint | ⚙️ Surface shown in settings; not yet live |

In short: **a high-fidelity, clickable product** with a real design system, real
movement data, and one genuinely live data source — with the backend (auth, DB,
real AI) scaffolded and ready to wire in.

---

## 7. What's next (suggested)

1. **Persistence + auth** — wire Supabase so followed streams, supports, posts and
   profiles are real and per-user.
2. **Real AI assistant** — connect the Anthropic API and a vector index over the
   knowledge base (the env slot is already there).
3. **Routing** — move screen state to URL routes so streams/pages are shareable
   and deep-linkable.
4. **Member-generated content** — make the composer, campaign submission, and
   engagement actually write back.
5. **Summit mode** — a live layer for the 21–22 Nov event itself.

---

## 8. Running it

```bash
cd mycelium-app
npm install
npm run dev        # http://localhost:3000
```

Build / deploy: `npm run build`; production deploys to Vercel on push to `main`
(or `vercel --prod` from `mycelium-app/`).

To replay onboarding in the browser: it shows on every load by default, or click
**"Take a tour"** in the sidebar.
