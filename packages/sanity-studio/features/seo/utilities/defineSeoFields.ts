import { defineField } from 'sanity';
import { SEO_FIELD } from '../constants';
import { SEO_FIELDSET } from './seoFieldset';
import { metaDescriptionTitle, metaTitleTitle, socialImageTitle } from './registerSeoFields';

export function defineSeoFields() {
  return [
    defineField({
      title: metaTitleTitle,
      name: SEO_FIELD.META_TITLE,
      type: SEO_FIELD.META_TITLE,
      fieldset: SEO_FIELDSET,
    }),
    defineField({
      title: metaDescriptionTitle,
      name: SEO_FIELD.META_DESCRIPTION,
      type: SEO_FIELD.META_DESCRIPTION,
      fieldset: SEO_FIELDSET,
    }),
    defineField({
      title: socialImageTitle,
      name: SEO_FIELD.SOCIAL_IMAGE,
      type: SEO_FIELD.SOCIAL_IMAGE,
      fieldset: SEO_FIELDSET,
    }),
  ];
}
