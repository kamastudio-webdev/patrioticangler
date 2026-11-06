import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => {
    const d = b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
    return d !== 0 ? d : a.data.title.localeCompare(b.data.title);
  });
}

export function readMinutes(post: Post): number {
  const text = (post.body ?? '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_>`[\]()-]/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 230));
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export function hasProducts(post: Post): boolean {
  return /<Product\b/.test(post.body ?? '');
}
