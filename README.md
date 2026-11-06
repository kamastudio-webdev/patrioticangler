# Patriotic Angler

Fishing how-tos and gear guides for patrioticangler.com, built with [Astro](https://astro.build) and hosted on Netlify. Every push to `main` goes live automatically.

## Where things live

| What | Where |
|---|---|
| Posts | `src/content/posts/*.mdx` |
| Products used in posts | `src/data/products.json` |
| Post header photos (Unsplash) | `src/data/hero-images.json` |
| Amazon Associates tag | `AMAZON_TAG` in `src/config.ts` |
| Writing rules for posts | `research/writing-brief.md` |

## Products and the Made in USA stamp

Each product has an `origin`:

- `usa`: the maker or the product listing says it's made in the USA. Gets the Made in USA stamp.
- `assembled-usa`: assembled in the USA from imported parts. Gets the Assembled in USA stamp.
- `unknown`: no stamp.

Put the evidence in `originNote`. Never set `usa` on a guess.

In a post, use `<Product id="..." note="..." />` and `<Tip>...</Tip>`. No imports needed.

## Amazon rules to keep

- Don't show Amazon prices, star ratings or review counts anywhere on the site.
- Keep the affiliate disclosure (it's added automatically to any post with a product card).

## Run it locally

```
npm install
npm run dev
```
