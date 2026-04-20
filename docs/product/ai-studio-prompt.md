# Curd Connect — AI Studio Scaffolding Prompt

<!--
  This prompt is designed for Google AI Studio's Build mode
  (aistudio.google.com → Build tab).

  Steps:
  1. Open https://aistudio.google.com/ and navigate to the Build tab
  2. Paste everything below the --- line into the description box
  3. Let Gemini generate the prototype
  4. Iterate via chat ("make the buttons coral", "add a filter bar") until the UI feels right
  5. Download the project as a ZIP
  6. Extract the ZIP contents into `/prototype` at the root of this repo
  7. Return to your terminal and run `/substrate-migrate`
-->

---

Build a **Curd Connect** — a place for Montrealers to find, rate, and share the city's best poutine.

## Who it's for

Poutine enthusiasts in Montreal — locals and visitors who care about finding the city's best curds-and-gravy, discovering new spots, and sharing their opinions. No separate "owner" or "admin" role: anyone signed in can add a store and write a review.

## What users do (primary flows)

1. **Land on the feed** — see the most recent reviews across all poutine stores (reviewer handle, star rating, short excerpt, store name, thumbnail).
2. **Sign in** — a simple auth entry point (stubbed for the prototype; real auth comes later).
3. **Browse the map** — a full-bleed map of Montreal with pins for every poutine store; click a pin to preview the store.
4. **View a store** — dedicated page showing the store's name, address, neighbourhood, description, photo gallery, and all reviews (newest first, with average rating summary).
5. **Create a poutine store** — signed-in users add a new store: name, address, neighbourhood, description, and an image gallery they upload to.
6. **Write a review** — signed-in users leave a 1-to-5-star rating plus a free-text comment on any store.

## Core concepts (data model)

- **User** — `{ id, handle, avatarUrl, createdAt }`
- **PoutineStore** — `{ id, name, address, neighbourhood, description, gallery: string[], createdBy: userId, createdAt }`
- **Review** — `{ id, storeId, authorId, rating: 1 | 2 | 3 | 4 | 5, body, createdAt }`

## Key pages

- **Feed** (landing) — vertical list of most recent reviews across all stores.
- **Sign in** — minimal email/handle form; stub only.
- **Map** — full-bleed Montreal map with store pins.
- **Store detail** — photos, description, reviews, aggregate rating.
- **Create store** — form with image upload into the gallery.
- **Write review** — star picker + comment box, scoped to a store.
- **User profile** — handle, avatar, list of that user's reviews and stores they created.

## Look & feel

Brutalist and Montreal-bilingual. Think thick borders, flat primary colours, strong mono/serif typographic contrast, unapologetic grid layouts, and chunky hit targets — no soft shadows, no glossy gradients. Copy should switch fluidly between English and French in the way Montrealers actually do (e.g. "Top poutineries près de chez toi", "Leave an avis"), not as a formal toggle. Favour warm curd-yellow, gravy-brown, and charcoal as the core palette against an off-white background.

## Constraints

- Use **Vite + React + TypeScript** (the default stack for AI Studio Build).
- Use **Tailwind CSS** for styling.
- **No backend yet** — stub data with `useState` and in-memory arrays. A real Convex backend will be wired in a later stage.
- **No authentication yet** — show all pages unconditionally.
- Keep the code **idiomatic**; don't over-engineer.
- Optimise for **clear component boundaries** — one file per component, named exports.

## Output

A runnable Vite + React + TypeScript app I can preview in AI Studio and iterate on.
