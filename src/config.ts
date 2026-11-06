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

/** Fishing-type hubs. Order here is the order on the page. */
export const HUBS = {
  bass: {
    label: 'Bass',
    water: 'Freshwater',
    species: 'Largemouth, smallmouth and spotted bass',
    blurb: 'Weeds, wood, docks and rock: where bass hold through the year, and the handful of baits that catch them almost anywhere.',
  },
  'crappie-panfish': {
    label: 'Crappie & panfish',
    water: 'Freshwater',
    species: 'Crappie, bluegill, sunfish and perch',
    blurb: 'The fish most of us caught first. Light line, small hooks and a bobber go a long way.',
  },
  catfish: {
    label: 'Catfish',
    water: 'Freshwater',
    species: 'Channel, blue and flathead catfish',
    blurb: 'Simple rigs, smelly baits and warm evenings on the river.',
  },
  'trout-salmon': {
    label: 'Trout & salmon',
    water: 'Freshwater',
    species: 'Rainbow, brown and brook trout, steelhead and salmon',
    blurb: 'Cold, clean water: stocked ponds, mountain streams and fall salmon runs.',
  },
  'pike-walleye': {
    label: 'Pike & walleye',
    water: 'Freshwater',
    species: 'Northern pike, walleye and musky',
    blurb: 'Northern lakes and rivers. Toothy fish, low-light bites and the tackle to handle both.',
  },
  ice: {
    label: 'Ice fishing',
    water: 'Hard water',
    species: 'Panfish, perch, walleye and pike through the ice',
    blurb: 'From first safe ice to late winter, starting with how to tell whether the ice will hold you.',
  },
  inshore: {
    label: 'Inshore saltwater',
    water: 'Saltwater',
    species: 'Redfish, speckled trout, flounder, snook and stripers',
    blurb: 'Bays, marshes, flats and jetties. Light tackle, moving tides and live shrimp.',
  },
  offshore: {
    label: 'Offshore saltwater',
    water: 'Saltwater',
    species: 'Snapper, grouper, mahi-mahi, kingfish and tuna',
    blurb: 'Out past the sandbar: charters, bottom fishing and what to know before you go.',
  },
} as const;

export type HubKey = keyof typeof HUBS;

export const hubPath = (key: HubKey) => `/fishing/${key}/`;
