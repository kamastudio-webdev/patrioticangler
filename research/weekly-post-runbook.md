# Weekly post runbook

A scheduled task runs this every Thursday: write one new post, check it, publish it,
and tell Matt. Follow `research/writing-brief.md` for voice, honesty and format. Those
rules win over anything here.

**What you may change:** the new post file, new entries added to
`src/data/products.json` and `src/data/hero-images.json`, `research/post-queue.md`,
the post list in `research/writing-brief.md`, and a dated research note in `research/`.
Do not touch anything else: no layout, config, `AMAZON_TAG`, styles or other posts.
(One exception: you may add a link to the new post from at most two closely related
existing posts, as one plain sentence each.)

## 1. Pick the topic

Open `research/post-queue.md` and take the first unchecked item. Follow its
seasonal rule. Check that `src/content/posts/<slug>.mdx` doesn't already exist. If it
does, check the item off as "already published" and take the next one.

## 2. Research the facts

- Use WebSearch for anything that isn't long-standing fishing basics: rules, seasons,
  permits, gear specs, species ranges. Prefer state wildlife agencies, NOAA Fisheries,
  manufacturers and university extension pages.
- Regulations: never give a specific season date, bag limit or size limit. Say what
  kind of rule exists and where to check. If you state a rule exists (for example
  "circle hooks are required with bait"), confirm it's still in force first. If you
  can't confirm a fact, leave it out.
- Keep a short list of anything you're not sure of for the report.

## 3. Pick the products

Use 2 to 6 `<Product>` cards. Gear guides can use up to 10.

**First choice: products already in `src/data/products.json`.** Read the whole list
and use what fits.

**Adding a new product** (only if nothing in the list fits). This needs Claude in
Chrome on Matt's computer. If Chrome isn't reachable, use only existing products,
leave the gap out of the post, and say so in the report.

1. Load the `chrome-browser` skill if available, then the Chrome tools in one
   ToolSearch call. Open a new tab in your own tab group at https://www.amazon.com/.
   Never sign in, add to cart or click anything that buys. Close the tab at the end.
2. Search by running `javascript_tool` in that tab: `fetch('/s?k=' + encodeURIComponent(query))`,
   parse the HTML with `DOMParser`, and return a JSON array of
   `[asin, title, stars, ratingCount]` for the top results.
   **The Chrome tool blocks any output that contains `=`**, so never return URLs or
   query strings: return only those fields.
3. Choose well-known brands with **4.3 stars or better and 300+ ratings**, sold by
   Amazon or the brand. Then fetch `/dp/<ASIN>` the same way and confirm the title,
   brand and that it's in stock.
4. Add it to `products.json` with fields `id` (short kebab-case), `name`, `brand`,
   `asin`, `kind`, `origin`, `originNote`.
5. **Origin:** set `usa` only if the maker's own site (or packaging shown on the
   listing) says "Made in USA" AND a second source agrees. Use `assembled-usa` only
   for an explicit "Assembled in USA" claim. Otherwise `unknown`. Amazon pages often
   show "Made in USA" from other products on the page, so a regex hit isn't enough.
   Never guess. Put the evidence in `originNote`.
6. Record ratings and evidence in `research/amazon-check-<YYYY-MM-DD>.md`. Ratings
   stay in that file and never appear on the site.

## 4. Hero image

Use the Unsplash connector. For species posts, first try the 1898 New York Public
Library game-fish illustrations (search for the species name plus "illustration" or
"New York Public Library"; the user is `nypl`). Otherwise pick a real photo that
matches the topic, with no visible brand logos and no identifiable faces as the main
subject.

Call `download_asset` for the photo you use (Unsplash requires it). Add an entry to
`src/data/hero-images.json` keyed by the slug:

```json
"<slug>": {
  "src": "https://images.unsplash.com/<photo-xxxx>?ixlib=rb-4.1.0&auto=format&fit=crop&crop=entropy&w=1600&h=900&q=75",
  "alt": "Plain description of what's in the picture",
  "credit": "Photographer name (or The New York Public Library)",
  "creditUrl": "https://unsplash.com/@<username>?utm_source=patriotic_angler&utm_medium=referral"
}
```

`src` is the photo's `urls.raw` base (everything before the `?`) plus those exact
parameters. Captions switch to "Illustration from" automatically when the credit is
The New York Public Library.

## 5. Write the post

- File: `src/content/posts/<slug>.mdx`, frontmatter as in the brief, `pubDate` = today.
- 900 to 1,500 words (product card notes don't count). Start with the answer.
- Link to 2 to 4 existing posts where they genuinely help. Check the slugs exist in
  `src/content/posts/`. Hub pages are `/fishing/<hub>/`.
- Use `"Gulf"` rather than either name for the Gulf. No politics.

## 6. Check it

```bash
npm ci            # first time in a fresh clone
python3 scripts/lint-posts.py . <slug>   # must exit 0
npm run build     # must succeed
```

Then:
- `dist/<slug>/index.html` exists, and if the post has products, contains `kamastudio-20`.
- Every `usa>` line the checker prints matches a product whose origin is `usa` or
  `assembled-usa` in `products.json`.
- Read the whole post once more as a beginner would. Fix anything vague.

If the build or checker fails and you can't fix it, don't publish. Report what broke.

## 7. Update the lists

- Check the item off in `research/post-queue.md`:
  `- [x] 2026-11-12 | <slug> | ... | published 2026-11-12`
- Add the slug to the "Post list" in `research/writing-brief.md`.

## 8. Publish

Commit everything in one commit, message `Add post: <title>`, ending with the
attribution lines your session gives you. Push to `main`. Netlify builds and
publishes in about a minute.

Wait about 2 minutes, then open `https://patrioticangler.com/<slug>/` (WebFetch, or
Chrome if it's open) and confirm the title is there. If it isn't live after 5 more
minutes, say so in the report.

## 9. Top up the queue

If fewer than 4 unchecked items are left, add 6 new ones at the bottom with target
dates continuing week by week. Rules:
- Favor hubs with the fewest posts (count `hubs:` across posts).
- Mix how-to and gear. About 1 in 5 can be a gear guide.
- Time seasonal topics for the weeks they fit (spawns, runs, holidays, ice season).
- No near-duplicates of existing posts.

## 10. Report to Matt

Send with SendUserMessage, short and plain:

- Line 1: `New post is live: <title>` and the link.
- One line on what it covers.
- Products: which cards it uses. Call out any **new** product added, and any new
  Made in USA or Assembled in USA stamp with its evidence.
- Anything you weren't sure of or left out, in a short list. Skip this if nothing.
- Next week's topic from the queue.

If something blocked publishing, the first line says `No post this week:` and why,
with the first step to fix it.
