import { useClient } from 'sanity';
import { useEffect, useState } from 'react';
import { SINGLETON } from '@pkg/config/sanity/schemaTypes';
import { ConfigSeoSocial } from '../../../seo/types/schema';
import { WITH_SITE_TITLE } from '../../../seo/constants';

const initialSiteConfigSeo: ConfigSeoSocial = { withSiteTitle: WITH_SITE_TITLE.APPEND };

export function useSiteConfigSeo(): [ConfigSeoSocial, boolean] {
  const sanityClient = useClient({ apiVersion: '2024-04-26' });
  const [siteConfigSeo, setSiteConfigSeo] = useState<ConfigSeoSocial>({ ...initialSiteConfigSeo });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let shouldUpdateSeo = true;

    async function getSiteConfigSeo() {
      let seo = await sanityClient.fetch(`
        *[_type == "${SINGLETON.CONFIG_SEO}"][0] {
          siteTitle,
          siteUrl,
          withSiteTitle,
          titleSeparator,
          metaTitle,
          metaDescription,
          "socialImage": socialImage.asset,
          favicon,
        }
      `);

      if (!seo) {
        // In case default SEO data hasn't been set, returned data would be null
        seo = { ...initialSiteConfigSeo };
      }

      if (shouldUpdateSeo) {
        // Ensure we only update once with latest call, even if useEffect runs multiple times quickly
        setSiteConfigSeo(seo);
        setLoading(false);
      }
    }

    getSiteConfigSeo().catch(console.error);

    return () => {
      shouldUpdateSeo = false;
    };
  }, [sanityClient]);

  return [siteConfigSeo, loading];
}
