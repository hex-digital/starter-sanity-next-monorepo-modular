import { LocaleConfiguration } from './localisation';

export interface PathableDocument extends MinimalPathableDocument {}

/**
 * The most minimal document data needed to turn a document into a fully qualified path URL.
 */
export interface MinimalPathableDocument {
  _type: string;
  _id: string;
  pathname?: string;
  locale?: LocaleConfiguration['value'];
}
