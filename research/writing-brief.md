# Patriotic Angler: writing brief for posts

## The site
patrioticangler.com is a fishing site for beginners and weekend anglers: families,
dads taking kids out, people who just bought their first rod. Two kinds of posts:
- **How-to** (category `how-to`): practical, step-by-step fishing instruction.
- **Gear** (category `gear`): buying guides that point readers to products on Amazon.
- **Made in USA** (category `made-in-usa`): American-made gear. Products made in the
  USA get a badge automatically from `src/data/products.json`. The site is NOT
  American-made-only; it just highlights it.

Money comes from Amazon affiliate links, so posts should naturally mention the gear
a reader needs, but the reader's success on the water comes first.

## Voice
- Plainspoken, friendly, practical. Like a patient neighbor who fishes a lot.
- Short paragraphs (1 to 4 sentences). Sentence case headings.
- Familiar units: inches, feet, pounds, "about the size of a quarter".
- Concrete over general: say "6-pound line" not "light line"; say "hold the rod
  tip at 10 o'clock" not "keep tension".
- Active voice. No filler intros ("Fishing is a wonderful hobby..."). Start with
  the answer or the first useful thing.
- No politics.

## Honesty rules (important)
- Do NOT invent personal experiences, catches, trips, or testing. No "I tested",
  "we fished this for a season", "last weekend I caught". Write as a guide based
  on well-established fishing knowledge. "This is a popular choice because..." is
  fine; fake first-person anecdotes are not.
- Do NOT mention Amazon star ratings, review counts, prices, "best seller" status,
  or anything copied from Amazon reviews. Amazon's rules forbid it.
- Do NOT claim a product is made in the USA unless its `origin` in
  `src/data/products.json` is `usa` (or say "assembled in the USA" if
  `assembled-usa`). Never guess origin.
- Don't invent statistics or quote numbers you can't stand behind. Common fishing
  knowledge (knot types, rig setups, hook sizes for species) is fine.
- Remind readers once, briefly, to have a fishing license and check their state's
  rules (size/bag limits) where relevant. Don't lecture.
- Safety notes where they matter (hooks around kids, life jackets near water).

## Format
- File: `src/content/posts/<slug>.mdx` (slug = lowercase-with-hyphens, matches
  the title's main keyword).
- Frontmatter:

```yaml
---
title: "How to Texas Rig a Soft Plastic Worm"
description: "One sentence, under 155 characters, that answers who it's for and what they'll learn."
pubDate: 2026-11-06
category: how-to
tags: ["bass", "soft plastics", "rigs"]
species: ["largemouth bass"]
hubs: ["bass"]
featured: false
---
```

- `hubs` puts the post on the fishing-type pages. Use one or more of: `bass`, `crappie-panfish`,
  `catfish`, `trout-salmon`, `pike-walleye`, `ice`, `inshore`, `offshore`. Use `[]` for general posts.
- Length: 900 to 1,500 words. Use `##` for main sections and `###` sparingly.
  Never use `#` (the page adds the title).
- Numbered lists ONLY for actual step sequences. Bullets for unordered items.
- End with a short "Quick recap" or "What to buy" section only if it helps.
- Optional short FAQ section (`## Common questions`) with 2 to 4 questions, as `###`
  subheadings, when readers would really ask them.

## Components (available in every .mdx file, no import needed)
- `<Product id="zoom-super-fluke" note="One or two sentences: why this product, in this post's context, and any tip like best color or size." />`
  - `id` must exist in `src/data/products.json`. Do not invent ids.
  - Renders a product card with a "Check price on Amazon" button and the Made in USA
    badge if applicable. Don't add your own Amazon links or buttons.
  - Use 2 to 6 per post, placed where the reader needs that item, not all at the end.
- `<Tip>Short practical tip, one to three sentences.</Tip>` Use 1 to 3 per post.

Link to other posts on the site with plain markdown links to `/<slug>/`, only to
slugs in the post list below.

## Post list (slugs)
- how-to-texas-rig-a-soft-plastic-worm
- how-to-fish-a-zoom-super-fluke
- palomar-knot-and-improved-clinch-knot
- beginner-fishing-starter-kit
- how-to-catch-bluegill-with-kids
- catfish-fishing-for-beginners
- american-made-fishing-gear-guide
- best-tackle-boxes-for-beginners
- trout-fishing-with-inline-spinners
- spinning-vs-spincast-first-fishing-reel
- inshore-saltwater-fishing-for-beginners
- how-to-fish-a-popping-cork
- offshore-fishing-for-beginners
- bottom-fishing-for-snapper-and-grouper
- largemouth-bass-fishing-for-beginners
- smallmouth-bass-fishing-for-beginners
- crappie-fishing-for-beginners
- double-uni-knot-braid-to-leader
- northern-pike-fishing-for-beginners
- walleye-fishing-for-beginners
- salmon-fishing-for-beginners
- stocked-trout-fishing-with-powerbait
- ice-fishing-for-beginners

## Regulations
Saltwater and salmon fishing are heavily regulated, and the rules change often. Never state a
specific season date, bag limit or size limit. Say what kind of rule exists and tell readers
where to check (their state wildlife agency; NOAA Fisheries for federal waters). Saltwater
usually needs a separate saltwater license, and many states require a free registration (for
example Florida's State Reef Fish Angler designation) for some species.
