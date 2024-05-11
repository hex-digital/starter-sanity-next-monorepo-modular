import { defineField, Rule } from 'sanity';
import { settings } from '@pkg/config/sanity/settings';
import { defineStringCountField, defineTextCountField } from '../../characterCount/utilities/defineCharCountField';
import { SEO_FIELD } from '../constants';

export const metaTitleTitle = 'Title for search & social sharing (meta title)';
export const metaDescriptionTitle = 'Short Paragraph for search & social sharing (meta description)';
export const socialImageTitle = 'Social Image';

export function registerSeoFields() {
  return [
    defineStringCountField({
      title: metaTitleTitle,
      name: SEO_FIELD.META_TITLE,
      description: 'Make it as enticing as possible to capture users in Google + social feeds.',
      options: {
        minLength: settings.seo.titleMinLengthRecommend,
        maxLength: settings.seo.titleMaxLengthRecommend,
      },
      validation: (rule) => [
        rule.min(settings.seo.titleMinLengthRecommend).warning('Title should be at least 15 characters long for maximum effect.'),
        rule.max(settings.seo.titleMaxLengthRecommend).warning('Title should be less than 70 characters long for maximum effect.'),
      ],
    }),
    defineTextCountField({
      title: metaDescriptionTitle,
      name: SEO_FIELD.META_DESCRIPTION,
      description: 'Optional, highly encouraged to capture more visitors from Google and social.',
      rows: 2,
      options: {
        minLength: settings.seo.descriptionMinLengthRecommend,
        maxLength: settings.seo.descriptionMaxLengthRecommend,
      },
      validation: (rule: Rule) => [
        rule.min(settings.seo.descriptionMinLengthRecommend).warning('Description should be at least 15 characters long for maximum effect.'),
        rule.max(settings.seo.descriptionMaxLengthRecommend).warning('Description should be less than 160 characters long for maximum effect.'),
      ],
    }),
    defineField({
      title: socialImageTitle,
      name: SEO_FIELD.SOCIAL_IMAGE,
      type: 'image',
      description: 'Choose a beautiful and inviting, high-res image (1080p or even 4k). This will show when sharing on social media or in WhatsApp. Recommended size: 1200x630 (PNG, JPG or WebP)',
    }),
  ];
}
