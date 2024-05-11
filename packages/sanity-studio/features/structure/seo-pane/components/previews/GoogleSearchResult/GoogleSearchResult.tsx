import React from 'react';
import { useClient } from 'sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import google from './GoogleSearchResult.module.css';

interface Props {
  seo: {
    favicon?: SanityImageSource,
    siteTitle?: string,
    siteUrl?: string,
    pageUrl?: string,
    metaTitle?: string,
    metaDescription?: string,
  };
  width?: number;
}

export function GoogleSearchResult(props: Props) {
  const sanityClient = useClient({ apiVersion: '2024-04-26' });
  const imageBuilder = imageUrlBuilder(sanityClient);
  const urlFor = (source: SanityImageSource) => imageBuilder.image(source);

  const width = props.width || 580;
  const { favicon, siteTitle, siteUrl, pageUrl, metaTitle, metaDescription } = props.seo;

  return (
    <div className={google.googleWrapper} style={{ width }}>
      <div className={google.googleUrlBar}>
        <div className={google.googleFaviconContainer}>
          {favicon ? (
            <img
              className={google.googleFaviconImage}
              alt=""
              src={urlFor(favicon)
                .width(52)
                .height(52)
                .url()}
            />
          ) : (
            <span/>
          )}
        </div>
        <div>
          <div className={google.googleSiteTitle}>
            {siteTitle || siteUrl}
          </div>
          <div className={google.googleUrl}>
            {pageUrl || siteUrl}
          </div>
        </div>
      </div>
      <div className={google.googleTitle}>{metaTitle}</div>

      {metaDescription && (
        <div className={google.googleDesc}>{metaDescription}</div>
      )}
    </div>
  );
}
