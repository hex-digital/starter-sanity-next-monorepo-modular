import type { Image } from 'sanity';

/**
 * The SEO Data once it has been combined from a page and the site config fallbacks.
 */
export interface SeoDataCombined {
  siteUrl: string
  siteTitle?: string
  pageUrl?: string
  metaTitle?: string
  metaDescription?: string
  shareImage?: Image
  favicon?: Image
}
