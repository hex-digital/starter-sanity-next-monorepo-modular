/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size,
 * or end up in a server-only function that don't need it.
 */

export type Options = typeof options;

export const options = {
  dataset: assertValue(
    process.env.SANITY_STUDIO_SANITY_DATASET,
    'Missing environment variable: SANITY_STUDIO_SANITY_DATASET',
  ),

  projectId: assertValue(
    process.env.SANITY_STUDIO_SANITY_PROJECT_ID,
    'Missing environment variable: SANITY_STUDIO_SANITY_PROJECT_ID',
  ),

  // see https://www.sanity.io/docs/api-versioning for how versioning works
  apiVersion: process.env.SANITY_STUDIO_SANITY_API_VERSION || '2024-04-18',

  title: process.env.SANITY_STUDIO_SANITY_PROJECT_TITLE || 'SanityCMS',

  preview: {
    // The domain on which we will preview content
    domain: assertValue(
      process.env.SANITY_STUDIO_PREVIEW_DOMAIN,
      'Missing environment variable: SANITY_STUDIO_PREVIEW_DOMAIN',
    ),

    // The route to enable draft mode. See: https://github.com/sanity-io/visual-editing/tree/main/packages/preview-url-secret#sanitypreview-url-secret
    draftModeRoute: '/api/sanity/draft',

    // This is the document id used for the preview secret that's stored in your dataset. It must have a dot ('.') in it to make it private.
    // The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
    secretId: 'preview.secret' satisfies `${string}.${string}`,
  },

  // For use when revalidating caches in the web app - secret must match in Sanity app and in Web app
  revalidateSecret: process.env.SANITY_STUDIO_SANITY_REVALIDATE_SECRET,
}

function assertValue<Value>(value: Value | undefined, errorMessage: string): Value {
  if (value === undefined) {
    throw new Error(errorMessage);
  }

  return value;
}
