export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  siteUrl: string;
  author: string;
  defaultOgImage: string;
  locale: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    email?: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  collections: {
    id: 'ayat' | 'hadith' | 'events' | 'sahaba' | 'writings';
    label: string;
    description: string;
    href: string;
    icon: string;
  }[];
}

export const SITE_CONFIG: SiteConfig = {
  name: "Musafir",
  tagline: "A traveler's notebook of revelation, remembrance, and reflection.",
  description: "A personal, curated sanctuary of Quranic ayat, prophetic hadith, historic milestones, Sahaba accounts, and contemplative writings.",
  siteUrl: "https://musafir.example.com",
  author: "Musafir",
  defaultOgImage: "/og/default.png",
  locale: "en",
  socialLinks: {
    github: "https://github.com",
    twitter: "https://x.com",
    email: "contact@example.com",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Ayat", href: "/ayat" },
    { label: "Hadith", href: "/hadith" },
    { label: "Events", href: "/events" },
    { label: "Sahaba", href: "/sahaba" },
    { label: "Writings", href: "/writings" },
    { label: "Tags", href: "/tags" },
    { label: "About", href: "/about" },
    { label: "Search", href: "/search" },
  ],
  collections: [
    {
      id: "ayat",
      label: "Quranic Ayat",
      description: "Direct revelations, divine reminders, and contemplative Quranic verses.",
      href: "/ayat",
      icon: "book-open",
    },
    {
      id: "hadith",
      label: "Hadith",
      description: "Prophetic traditions, moral guidance, and verified narrations.",
      href: "/hadith",
      icon: "sparkles",
    },
    {
      id: "events",
      label: "Islamic Events",
      description: "Milestones in Islamic history, hijri dates, eras, and pivotal turning points.",
      href: "/events",
      icon: "calendar",
    },
    {
      id: "sahaba",
      label: "Lives of the Sahaba",
      description: "Stories of faith, dedication, and steadfastness from the Companions.",
      href: "/sahaba",
      icon: "users",
    },
    {
      id: "writings",
      label: "Writings & Reflections",
      description: "Curated reflections, classical quotes, articles, and poetry for the spiritual journey.",
      href: "/writings",
      icon: "feather",
    },
  ],
};
