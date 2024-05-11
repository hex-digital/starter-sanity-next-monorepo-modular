export const config = {
  siteDomain: process.env.NEXT_PUBLIC_SITE_DOMAIN || '',
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || '',

  sanity: {
    projectId: assertValue(
      process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
    ),

    dataset: assertValue(
      process.env.NEXT_PUBLIC_SANITY_DATASET,
      'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
    ),

    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-26',

    revalidateSecret: assertValue(
      process.env.SANITY_REVALIDATE_SECRET,
      'Missing environment variable: SANITY_REVALIDATE_SECRET',
      false, '',
    ),

    studioUrl: '/studio',

    // Not exposed to the front-end, used solely by the server
    token: assertValue(
      process.env.SANITY_API_TOKEN,
      'Missing environment variable: SANITY_API_TOKEN',
    ),
  },
};

function assertValue<T>(v: T | undefined, errorMessage: string, fatal = true, fallback: any = undefined): T | undefined {
  if (v === undefined) {
    if (fatal) {
      throw new Error(errorMessage);
    }

    console.warn(errorMessage);
  }

  return v;
}
