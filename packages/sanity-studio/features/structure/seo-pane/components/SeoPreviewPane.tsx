import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { RiTwitterXFill } from 'react-icons/ri';
import { GoogleSearchResult } from './previews/GoogleSearchResult/GoogleSearchResult';
import { TwitterCardPreview } from './previews/TwitterCardPreview/TwitterCardPreview';
import { FacebookSharePreview } from './previews/FacebookSharePreview/FacebookSharePreview';
import { combineSeo } from '../utils/combineSeo';
import { SeoPreviewCard } from './SeoPreviewCard';
import { useSiteConfigSeo } from '../utils/useSiteConfigSeo';
import { SeoFields } from '../../../seo/types/schema';
import { SEO_FIELD } from '../../../seo/constants';

interface Props {
  document: {
    displayed: SeoFields & {
      _type: string;
      pathname?: { current: string };
    };
  };
}

export function SeoPreviewPane({ document }: Props) {
  const [siteConfigSeo, loading] = useSiteConfigSeo();

  const seo = combineSeo(
    { ...siteConfigSeo },
    { ...document.displayed },
    document.displayed?.pathname?.current,
  );

  return (
    <>
      <SeoPreviewCard loading={loading} canShowPreview={!!seo.metaTitle} type={'Google search result'} Icon={BsGoogle}>
        <GoogleSearchResult seo={seo}/>
      </SeoPreviewCard>

      <SeoPreviewCard loading={loading} canShowPreview={!!seo.shareImage} type={'Twitter / X post'} Icon={RiTwitterXFill}>
        <TwitterCardPreview seo={seo}/>
      </SeoPreviewCard>

      <SeoPreviewCard loading={loading} canShowPreview={!!seo.metaTitle} type={'Facebook share'} Icon={BsFacebook}>
        <FacebookSharePreview seo={seo}/>
      </SeoPreviewCard>
    </>
  );
}
