import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { generateOgImage } from '../../../utils/og-image';

export async function getStaticPaths() {
  const [ayat, hadith, events, sahaba, writings] = await Promise.all([
    getCollection('ayat', ({ data }) => !data.draft),
    getCollection('hadith', ({ data }) => !data.draft),
    getCollection('events', ({ data }) => !data.draft),
    getCollection('sahaba', ({ data }) => !data.draft),
    getCollection('writings', ({ data }) => !data.draft),
  ]);

  const paths = [
    ...ayat.map((entry) => ({
      params: { collection: 'ayat', slug: entry.id },
      props: {
        title: `${entry.data.surah} (${entry.data.surahNumber}:${entry.data.ayahFrom})`,
        category: 'Quranic Ayah',
        subtitle: entry.data.translationSource,
      },
    })),
    ...hadith.map((entry) => ({
      params: { collection: 'hadith', slug: entry.id },
      props: {
        title: `${entry.data.collection} #${entry.data.hadithNumber}`,
        category: 'Prophetic Hadith',
        subtitle: `Narrated by ${entry.data.narrator}`,
      },
    })),
    ...events.map((entry) => ({
      params: { collection: 'events', slug: entry.id },
      props: {
        title: entry.data.title,
        category: 'Islamic Event',
        subtitle: [entry.data.hijriDate, entry.data.gregorianDate].filter(Boolean).join(' • '),
      },
    })),
    ...sahaba.map((entry) => ({
      params: { collection: 'sahaba', slug: entry.id },
      props: {
        title: entry.data.title,
        category: 'Lives of the Sahaba',
        subtitle: entry.data.sahabi,
      },
    })),
    ...writings.map((entry) => ({
      params: { collection: 'writings', slug: entry.id },
      props: {
        title: entry.data.title,
        category: `Writing (${entry.data.type})`,
        subtitle: `By ${entry.data.author}`,
      },
    })),
  ];

  return paths;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, category, subtitle } = props as { title: string; category: string; subtitle?: string };

  const png = await generateOgImage({
    title,
    category,
    subtitle,
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
