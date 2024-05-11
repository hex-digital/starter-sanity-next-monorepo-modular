import speakingurl from 'speakingurl';

/**
 * Removes leading and trailing slashes from a string.
 * e.g. "/hello/test/" becomes "hello/test".
 */
export function stripMarginSlashes(path: string): string {
  if (typeof path !== 'string') return path;

  return removeDoubleSlashes(path).replace(/^\/|\/$/g, '');
}

/**
 * Removes instances of double slashes in a string.
 * e.g. "/hello//test/" becomes "/hello/test".
 */
export function removeDoubleSlashes(path: string): string {
  if (typeof path !== 'string') return path;

  return path.replace(/\/{2,}/g, '/');
}

/**
 * Transform a string into a clean URL / slug (See: https://en.wikipedia.org/wiki/Clean_URL)
 */
export function slugify(input: string) {
  return speakingurl(input);
}

/**
 * Test if a URL is external, i.e. it's a fully qualified URL to a website, that includes the domain name,
 * and optionally the protocol (https).
 */
export function isExternalUrl(url: string) {
  const regex =
    /^((http|https):\/\/)?[a-zA-Z0-9]+([-\.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z0-9-]{2,}(:[0-9]{1,5})?(\/.*)?$/;

  return regex.test(url);
}

export function formatPath(path: string): string {
  return `/${stripMarginSlashes(path)}`;
}




