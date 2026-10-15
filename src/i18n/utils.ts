import { DEFAULT_LOCALE, LOCALES, UI_STRINGS, type SupportedLocale, type UIKey } from './ui';

export function getLangFromUrl(url: URL): SupportedLocale {
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first === 'en-gb') return 'en-gb';
  if (first === 'bn') return 'bn';
  return DEFAULT_LOCALE;
}

export function stripLocaleFromPath(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en-gb' || segments[0] === 'bn') {
    segments.shift();
  }
  return '/' + segments.join('/');
}

export function getLocalizedPath(pathname: string, targetLocale: SupportedLocale): string {
  const cleanPath = stripLocaleFromPath(pathname);
  if (targetLocale === DEFAULT_LOCALE) {
    return cleanPath === '' ? '/' : cleanPath;
  }
  return cleanPath === '/' ? `/${targetLocale}` : `/${targetLocale}${cleanPath}`;
}

export function useTranslations(lang: SupportedLocale) {
  return function t(key: UIKey, params?: Record<string, string | number>): string {
    const langStrings = UI_STRINGS[lang] || UI_STRINGS[DEFAULT_LOCALE];
    let str = (langStrings as any)[key] || (UI_STRINGS[DEFAULT_LOCALE] as any)[key] || key;

    if (params) {
      for (const [k, v] of Object.entries(params)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}

export function getHreflangEntries(currentUrl: URL, siteUrl: string) {
  const cleanPath = stripLocaleFromPath(currentUrl.pathname);
  const base = siteUrl.replace(/\/$/, '');

  return [
    {
      lang: 'en-US',
      url: `${base}${cleanPath === '' ? '/' : cleanPath}`,
    },
    {
      lang: 'en-GB',
      url: `${base}/en-gb${cleanPath === '/' ? '' : cleanPath}`,
    },
    {
      lang: 'bn',
      url: `${base}/bn${cleanPath === '/' ? '' : cleanPath}`,
    },
    {
      lang: 'x-default',
      url: `${base}${cleanPath === '' ? '/' : cleanPath}`,
    },
  ];
}
