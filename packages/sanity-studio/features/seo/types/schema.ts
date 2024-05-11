import type { Image } from 'sanity';
import { SEO_FIELD, WITH_SITE_TITLE } from '../constants';

/**
 * The SEO fields defined for all pages, and for the global SEO fallback.
 */
export interface SeoFields {
  [SEO_FIELD.META_TITLE]?: string;
  [SEO_FIELD.META_DESCRIPTION]?: string;
  [SEO_FIELD.SOCIAL_IMAGE]?: Image;
}

/**
 * The SEO fields defined in Site Config > SEO + Social
 */
export interface ConfigSeoSocial extends SeoFields {
  siteTitle?: string;
  siteUrl?: string;
  withSiteTitle: WITH_SITE_TITLE;
  titleSeparator?: string;

  favicon?: Image;
}
