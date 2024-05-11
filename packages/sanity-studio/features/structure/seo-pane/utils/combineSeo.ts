import { WITH_SITE_TITLE } from '../../../seo/constants';
import { ConfigSeoSocial, SeoFields } from '../../../seo/types/schema';
import { SeoDataCombined } from '../../../seo/types';

/**
 * Combines the default seo data from Site Config: SEO + Social, with seo data from
 * an individual page.
 */
export function combineSeo(
  defaultSeo: ConfigSeoSocial,
  pageSeo: SeoFields,
  pathname: string = '',
): SeoDataCombined {
  let metaTitle = pageSeo.metaTitle || defaultSeo.metaTitle ;

  if (defaultSeo.withSiteTitle && metaTitle !== defaultSeo.siteTitle && defaultSeo.siteTitle) {
    if (defaultSeo.withSiteTitle === WITH_SITE_TITLE.PREPEND) {
      metaTitle = `${defaultSeo.siteTitle} ${defaultSeo.titleSeparator} ${metaTitle}`;
    }
    if (defaultSeo.withSiteTitle === WITH_SITE_TITLE.APPEND) {
      metaTitle = `${metaTitle} ${defaultSeo.titleSeparator} ${defaultSeo.siteTitle}`;
    }
  }

  return {
    favicon: defaultSeo?.favicon,
    siteUrl: defaultSeo?.siteUrl || '',
    shareImage: pageSeo?.socialImage || defaultSeo?.socialImage, // meta share image OR default share image
    siteTitle: defaultSeo?.siteTitle || '',
    pageUrl: `${defaultSeo?.siteUrl}${pathname}`,
    metaTitle: metaTitle || '',
    metaDescription: pageSeo.metaDescription || defaultSeo.metaDescription || '',
  };
}

