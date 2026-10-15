import fs from 'node:fs';
import path from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { SITE_CONFIG } from '../config';

// Load fonts once
let regularFontBuffer: Buffer;
let boldFontBuffer: Buffer;

function getFonts() {
  if (!regularFontBuffer) {
    const fontPath = path.resolve('./src/assets/fonts/Serif-Regular.ttf');
    regularFontBuffer = fs.readFileSync(fontPath);
  }
  if (!boldFontBuffer) {
    const fontPath = path.resolve('./src/assets/fonts/Sans-Bold.ttf');
    boldFontBuffer = fs.readFileSync(fontPath);
  }
  return [
    {
      name: 'Serif',
      data: regularFontBuffer,
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Sans',
      data: boldFontBuffer,
      weight: 700 as const,
      style: 'normal' as const,
    },
  ];
}

export interface OgImageOptions {
  title: string;
  category?: string;
  subtitle?: string;
}

export async function generateOgImage({ title, category = 'Musafir Reflection', subtitle }: OgImageOptions): Promise<Buffer> {
  const fonts = getFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a1219',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(184, 141, 45, 0.15) 0%, transparent 60%)',
          padding: '60px 70px',
          fontFamily: 'Serif',
          color: '#f4efe4',
          border: '12px solid #14222f',
        },
        children: [
          // Header: Category Badge & Logo Mark
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: 'rgba(184, 141, 45, 0.15)',
                      border: '1.5px solid rgba(184, 141, 45, 0.4)',
                      padding: '8px 20px',
                      borderRadius: '999px',
                      color: '#deb453',
                      fontSize: '20px',
                      fontFamily: 'Sans',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                    },
                    children: category,
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'span',
                        props: {
                          style: {
                            fontFamily: 'Serif',
                            fontSize: '28px',
                            fontWeight: 'bold',
                            color: '#deb453',
                          },
                          children: 'Musafir',
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },

          // Center: Title & Subtitle
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                marginTop: 'auto',
                marginBottom: 'auto',
              },
              children: [
                {
                  type: 'h1',
                  props: {
                    style: {
                      fontSize: title.length > 50 ? '48px' : '58px',
                      fontWeight: 700,
                      lineHeight: 1.25,
                      color: '#fbf9f4',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    },
                    children: title,
                  },
                },
                subtitle
                  ? {
                      type: 'p',
                      props: {
                        style: {
                          fontSize: '24px',
                          color: '#93a5b4',
                          margin: 0,
                          fontFamily: 'Sans',
                        },
                        children: subtitle,
                      },
                    }
                  : null,
              ].filter(Boolean),
            },
          },

          // Footer: Tagline
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #1e3243',
                paddingTop: '24px',
                width: '100%',
              },
              children: [
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#788e99',
                      fontFamily: 'Sans',
                    },
                    children: SITE_CONFIG.tagline,
                  },
                },
                {
                  type: 'span',
                  props: {
                    style: {
                      fontSize: '18px',
                      color: '#deb453',
                      fontFamily: 'Sans',
                    },
                    children: SITE_CONFIG.siteUrl.replace(/^https?:\/\//, ''),
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
