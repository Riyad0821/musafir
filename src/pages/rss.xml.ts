import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_CONFIG } from '../config';

export async function GET(context: APIContext) {
  const [ayat, hadith, events, sahaba, writings] = await Promise.all([
    getCollection('ayat', ({ data }) => !data.draft),
    getCollection('hadith', ({ data }) => !data.draft),
    getCollection('events', ({ data }) => !data.draft),
    getCollection('sahaba', ({ data }) => !data.draft),
    getCollection('writings', ({ data }) => !data.draft),
  ]);

  const items = [
    ...ayat.map((item) => ({
      title: `[Ayah] ${item.data.surah} (${item.data.surahNumber}:${item.data.ayahFrom})`,
      pubDate: item.data.dateAdded,
      description: item.data.translation,
      link: `/ayat/${item.id}`,
    })),
    ...hadith.map((item) => ({
      title: `[Hadith] ${item.data.collection} #${item.data.hadithNumber}`,
      pubDate: item.data.dateAdded,
      description: item.data.translation,
      link: `/hadith/${item.id}`,
    })),
    ...events.map((item) => ({
      title: `[Event] ${item.data.title}`,
      pubDate: item.data.dateAdded,
      description: item.data.summary,
      link: `/events/${item.id}`,
    })),
    ...sahaba.map((item) => ({
      title: `[Sahaba] ${item.data.title} (${item.data.sahabi})`,
      pubDate: item.data.dateAdded,
      description: item.data.summary,
      link: `/sahaba/${item.id}`,
    })),
    ...writings.map((item) => ({
      title: `[Writing] ${item.data.title} by ${item.data.author}`,
      pubDate: item.data.dateAdded,
      description: item.data.summary || item.data.title,
      link: `/writings/${item.id}`,
    })),
  ];

  items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

  return rss({
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.siteUrl,
    items,
    customData: `<language>${SITE_CONFIG.locale}</language>`,
  });
}
