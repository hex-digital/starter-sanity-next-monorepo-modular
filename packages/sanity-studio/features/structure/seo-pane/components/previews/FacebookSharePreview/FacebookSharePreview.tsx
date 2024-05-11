import imageUrlBuilder from '@sanity/image-url';
import preview from '../Preview.module.css';
import facebook from './FacebookSharePreview.module.css';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useClient } from 'sanity';

interface Props {
  seo: {
    shareImage?: SanityImageSource,
    siteTitle?: string,
    siteUrl?: string,
    pageUrl?: string,
    metaTitle?: string,
    metaDescription?: string,
  };
  width?: number;
}

export function FacebookSharePreview(props: Props) {
  const sanityClient = useClient({ apiVersion: '2024-04-26' });
  const imageBuilder = imageUrlBuilder(sanityClient);
  const urlFor = (source: SanityImageSource) => imageBuilder.image(source);

  const width = props.width || 580;
  const { shareImage, siteUrl, pageUrl, metaTitle, metaDescription } = props.seo;

  const shareUrl = siteUrl ? siteUrl.split('://')[1] : '';

  // const canShowPreview = !!metaTitle;

  return (
    <div className={facebook.facebookWrapper} style={{ width }}>
      <div className={facebook.facebookImageContainer}>
        {shareImage ? (
          <img
            alt=""
            className={facebook.facebookCardImage}
            src={urlFor(shareImage)
              .width(1200)
              .height(630)
              .url()}
          />
        ) : (
          <span className={preview.imagePlaceholder}/>
        )}
      </div>
      <div className={facebook.facebookCardContent}>
        <div className={facebook.facebookCardUrl}>
          {shareUrl}
        </div>
        <div className={facebook.facebookCardTitle}>
          <a href={pageUrl} target="_blank" rel="noreferrer">
            {metaTitle}
          </a>
        </div>
        {metaDescription && (
          <div className={facebook.facebookCardDescription}>
            {metaDescription}
          </div>
        )}
      </div>
    </div>
  );
}
