import type { APIRoute } from 'astro';
import { generateOgImage } from '../../utils/og-image';
import { SITE_CONFIG } from '../../config';

export const GET: APIRoute = async () => {
  const png = await generateOgImage({
    title: SITE_CONFIG.name,
    category: 'Traveler’s Notebook',
    subtitle: SITE_CONFIG.tagline,
  });

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
