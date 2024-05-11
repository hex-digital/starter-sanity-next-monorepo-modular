import { DOCUMENT, SINGLETON } from './schemaTypes';

/**
 * Document Types that should be shown in Internal Link fields, e.g. in Header Nav Menu.
 */
export const INTERNAL_LINK_TYPES = [
  { type: DOCUMENT.PAGES },
];

/**
 * Document types which:
 *  - should not be able to be created in the 'new document' menu
 *  - should not be able to be duplicated, unpublished or deleted
 *
 * This is commonly used for singletons.
 */
export const LOCKED_DOCUMENT_TYPES: Array<string> = [
  ...Object.values(SINGLETON), // All Singleton types
  DOCUMENT.MEDIA_TAG,
];

/**
 * Document types that are able to display a live preview pane.
 */
export const PREVIEWABLE_DOCUMENT_TYPES: Array<string> = [
  SINGLETON.THEME,
  DOCUMENT.PAGES,
];

/**
 * Document types that can display a live preview pane, but require a slug to do so.
 * NOTE, these types must also be included in "PREVIEWABLE_DOCUMENT_TYPES".
 */
export const PREVIEWABLE_DOCUMENT_TYPES_REQUIRING_SLUGS: typeof PREVIEWABLE_DOCUMENT_TYPES = [
  DOCUMENT.PAGES,
];

/**
 * Document types that are able to display an SEO Preview pane.
 */
export const SEO_PREVIEW_DOCUMENT_TYPES: Array<string> = [
  ...PREVIEWABLE_DOCUMENT_TYPES.filter((type) => type !== SINGLETON.THEME), // All previewable types except THEME
  SINGLETON.CONFIG_SEO,
];

/**
 * Document types that should have the "SEO" analysis pane.
 * // @todo SEO analysis pane is currently not implemented
 */
export const SEO_ANALYSIS_DOCUMENT_TYPES: Array<string> = [
  DOCUMENT.PAGES,
];

/**
 * Document types that should have the "incoming references" pane when editing.
 * This pane lists all other documents that reference this document.
 * Useful for viewing a quick list of pages that use a particular form, for instance.
 */
export const INCOMING_REFERENCE_LIST: Array<string> = [
  ...INTERNAL_LINK_TYPES.map((docType) => docType['type']),
];

/**
 * Document types that should be listed in our sitemap.xml file.
 */
export const DOCUMENTS_IN_SITEMAP: Array<string> = [
  ...INTERNAL_LINK_TYPES.map((docType) => docType['type']),
];
