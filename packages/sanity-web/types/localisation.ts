export interface LocaleConfiguration {
  /**
   * Locales must be formatted as RFC 5646, e.g. `en-us` or `en`. They should always be lowercase.
   */
  value: string;
  title: string;
  isDefault?: boolean;
}
