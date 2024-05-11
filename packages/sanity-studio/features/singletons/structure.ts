export const SINGLETON_DOC_PREFIX = `singleton`;

/**
 * Used to get the singleton document ID for a particular schema type.
 */
export function singletonDocId(schemaType: string) {
  return `${SINGLETON_DOC_PREFIX}-${schemaType}`
    .replaceAll('.', '_') // Document id's with a dot in are made private by default, so remove that for this utility.
    .replaceAll(' ', '-'); // IDs with spaces in are not valid, so remove them.
}
