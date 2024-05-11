import { formatPath } from '@pkg/utilities/urls';
import { PathableDocument } from '../../types';

/**
 * Convert a pathname to an absolute URL, incorporating the website's protocol and domain name.
 */
export function pathToAbsoluteUrl(path: string, baseUrl: string): string | undefined {
  if (typeof path !== 'string') return;

  return (
    baseUrl +
    // When creating absolute URLs, ensure the homepage doesn't have a trailing slash
    (path === '/' ? '' : formatPath(path))
  );
}

/**
 * From a Sanity document, get a fully qualified URL from its pathname.
 * If the locale matches the defaultLocale, we do not add it.
 * e.g. /some-pathname or /en-gb/some-pathname
 */
export function getDocumentPath(document: PathableDocument, defaultLocaleId: string): string | undefined {
  if (typeof document.pathname !== 'string') return;

  const isDefault = document.locale === defaultLocaleId;

  // Localise & format the final path
  return localizePathname(document.pathname, document.locale, isDefault);
}

/**
 * Localise pathnames by prefixing the document's locale to it.
 * e.g. /en-gb/some-pathname
 */
export function localizePathname(pathname: string, localeId?: string, isDefault?: boolean) {
  if (typeof pathname !== 'string') {
    return;
  }

  if (!localeId || isDefault) {
    return formatPath(pathname);
  }

  return formatPath(`${localeId}${pathname}`);
}

/**
 * As we can't be 100% sure editors will always format their paths/slugs properly (without leading or trailing slashes),
 * we run queries against a set of possible slash variations.
 *
 * For use when converting a user typed string in the address bar of a browser to a GROQ query for
 * searching for a document.
 */
export function getPathVariations(path: string): string[] {
  if (typeof path !== 'string') return [];

  let slashless = path.trim();
  if (slashless.startsWith('/')) {
    slashless = slashless.slice(1);
  }
  if (slashless.endsWith('/')) {
    slashless = slashless.slice(0, -1);
  }

  return [
    slashless,
    // /slash-on-both-ends/
    `/${slashless}/`,
    // trailing/
    `${slashless}/`,
    // /leading
    `/${slashless}`,
  ];
}
