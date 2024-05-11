import imageUrlBuilder from '@sanity/image-url';
import twitter from './TwitterCardPreview.module.css';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useClient } from 'sanity';

interface Props {
  seo: {
    shareImage?: SanityImageSource,
    siteUrl?: string,
  };
  width?: number;
}

const author = {
  name: 'Hex Digital',
  handle: 'hexdigital',
  image: 'https://pbs.twimg.com/profile_images/1066311597499576320/Xt-AkciA_400x400.jpg',
};

export function TwitterCardPreview(props: Props) {
  const sanityClient = useClient({ apiVersion: '2024-04-26' });
  const imageBuilder = imageUrlBuilder(sanityClient);
  const urlFor = (source: SanityImageSource) => imageBuilder.image(source);

  const width = props.width || 580;
  const { shareImage, siteUrl } = props.seo;

  // const canShowPreview = !!shareImage;

  return (
    <div className={twitter.tweetWrapper} style={{ width }}>
      <div className={twitter.tweetAuthor}>
        <img
          alt=""
          className={twitter.tweetAuthorAvatar}
          src={
            author && typeof author.image === 'object'
              ? urlFor(author.image)
                .width(300)
                .url()
              : author.image
          }
        />
        <span className={twitter.tweetAuthorName}>{author.name}</span>
        <span className={twitter.tweetAuthorHandle}>
            @{author.handle}
          </span>
      </div>

      <div className={twitter.tweetText}>
        <p>Tweet about this...</p>
      </div>
      <div className={twitter.tweetUrlWrapper}>
        <div className={twitter.tweetCardPreview}>
          <div className={twitter.tweetCardImage}>
            {shareImage && (
              <img
                alt=""
                src={urlFor(shareImage)
                  .width(1200)
                  .height(630)
                  .url()}
              />
            )}
            <span className={twitter.tweetCardUrl}>{siteUrl}</span>
          </div>
          {/* Musk removed all this recently. Might get reverted... https://variety.com/2023/digital/news/x-twitter-removes-headlines-from-articles-musk-esthetics-1235745719/*/}
          {/*<div className={twitter.tweetCardContent}>*/}
          {/*  <h2 className={twitter.tweetCardTitle}>{shareTitle}</h2>*/}
          {/*  {shareDesc && (*/}
          {/*    <div className={twitter.tweetCardDescription}>*/}
          {/*      {shareDesc}*/}
          {/*    </div>*/}
          {/*  )}*/}
          {/*  <div className={twitter.tweetCardDestination}>*/}
          {/*      <span className={twitter.tweetCardIcon}>*/}
          {/*        <svg viewBox="0 0 24 24">*/}
          {/*          <g>*/}
          {/*            <path d="M11.96 14.945c-.067 0-.136-.01-.203-.027-1.13-.318-2.097-.986-2.795-1.932-.832-1.125-1.176-2.508-.968-3.893s.942-2.605 2.068-3.438l3.53-2.608c2.322-1.716 5.61-1.224 7.33 1.1.83 1.127 1.175 2.51.967 3.895s-.943 2.605-2.07 3.438l-1.48 1.094c-.333.246-.804.175-1.05-.158-.246-.334-.176-.804.158-1.05l1.48-1.095c.803-.592 1.327-1.463 1.476-2.45.148-.988-.098-1.975-.69-2.778-1.225-1.656-3.572-2.01-5.23-.784l-3.53 2.608c-.802.593-1.326 1.464-1.475 2.45-.15.99.097 1.975.69 2.778.498.675 1.187 1.15 1.992 1.377.4.114.633.528.52.928-.092.33-.394.547-.722.547z" />*/}
          {/*            <path d="M7.27 22.054c-1.61 0-3.197-.735-4.225-2.125-.832-1.127-1.176-2.51-.968-3.894s.943-2.605 2.07-3.438l1.478-1.094c.334-.245.805-.175 1.05.158s.177.804-.157 1.05l-1.48 1.095c-.803.593-1.326 1.464-1.475 2.45-.148.99.097 1.975.69 2.778 1.225 1.657 3.57 2.01 5.23.785l3.528-2.608c1.658-1.225 2.01-3.57.785-5.23-.498-.674-1.187-1.15-1.992-1.376-.4-.113-.633-.527-.52-.927.112-.4.528-.63.926-.522 1.13.318 2.096.986 2.794 1.932 1.717 2.324 1.224 5.612-1.1 7.33l-3.53 2.608c-.933.693-2.023 1.026-3.105 1.026z" />*/}
          {/*          </g>*/}
          {/*        </svg>*/}
          {/*      </span>*/}
          {/*    {websiteUrlWithoutProtocol}*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
}

