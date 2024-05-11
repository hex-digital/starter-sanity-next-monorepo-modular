import { defineField, defineType } from 'sanity';
import { DOCUMENT, OBJECT } from '@pkg/config/sanity/schemaTypes';
import { defineVisibilityField } from '@pkg/sanity-studio/features/seo/utilities/defineVisibilityField';
import { withGroup } from '@pkg/sanity-studio/utilities/schemas';
import { seoFieldset } from '@pkg/sanity-studio/features/seo/utilities/seoFieldset';
import { defineSeoFields } from '@pkg/sanity-studio/features/seo/utilities/defineSeoFields';
import { PAGE_VISIBILITY } from '@pkg/sanity-studio/features/seo/constants';

interface Prepare {
  title?: string;
  pathname?: string;
  visibility?: PAGE_VISIBILITY;
}

export const page = defineType({
  name: DOCUMENT.PAGES,
  title: 'Pages',
  type: 'document',

  groups: [
    { title: 'Meta', name: 'meta' },
    { title: 'Content', name: 'content', default: true },
    { title: 'SEO', name: 'seo' },
  ],

  fieldsets: [seoFieldset()],

  fields: [
    ...withGroup('meta', [
      defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
        description: 'Internal use only. To help identify this page when adding links or browsing the CMS',
        validation: (rule) => rule.required(),
      }),
      defineVisibilityField(),
      defineField({
        name: 'pathname',
        title: 'Pathname',
        type: 'slug',
      }),
    ]),

    ...withGroup('content', [
      defineField({
        name: 'content',
        title: 'Modular Content',
        type: OBJECT.MODULAR_OUTER_BLOCKS,
      }),
    ]),

    ...withGroup('seo', [
      ...defineSeoFields(),
    ]),
  ],
  orderings: [
    {
      title: 'URL',
      name: 'url',
      by: [
        { field: 'pathname.current', direction: 'asc' },
      ],
    },
    {
      title: 'Title',
      name: 'title',
      by: [
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      pathname: 'pathname.current',
      visibility: 'pageVisibility',
    },
    prepare({ title, pathname, visibility }: Partial<Prepare>) {
      const vis = visibility || 'public';
      const subtitle = [vis.charAt(0).toUpperCase() + vis.slice(1), pathname];

      return {
        title: title || 'Unnamed',
        subtitle: subtitle.join(' - '),
      };
    },
  }
});
