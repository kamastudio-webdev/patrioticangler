export const SITE = {
  name: 'Patriotic Angler',
  url: 'https://patrioticangler.com',
  description:
    'Plain-spoken fishing how-tos, gear worth the money, and a stamp on everything made in the USA.',
};

/**
 * Amazon Associates tracking ID.
 * Leave empty until Amazon approves the account, then paste the tag here
 * (it looks like "patrioticangl-20"). Every product button updates at once.
 */
export const AMAZON_TAG = 'kamastudio-20';

export function amazonUrl(asin: string): string {
  const base = `https://www.amazon.com/dp/${asin}/`;
  return AMAZON_TAG ? `${base}?tag=${encodeURIComponent(AMAZON_TAG)}` : base;
}

export const CATEGORIES = {
  'how-to': {
    label: 'How-to',
    path: '/how-to/',
    blurb: 'Step-by-step fishing instruction: knots, rigs, baits and where to find fish.',
  },
  gear: {
    label: 'Gear',
    path: '/gear/',
    blurb: 'What to buy, what to skip, and what each piece of gear is actually for.',
  },
  'made-in-usa': {
    label: 'Made in USA',
    path: '/made-in-usa/',
    blurb: 'Fishing gear made or assembled in America, and how to tell the difference.',
  },
} as const;

export type CategoryKey = keyof typeof CATEGORIES;
