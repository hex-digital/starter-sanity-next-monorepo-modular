import { BiSearch } from 'react-icons/bi';
import { defineField, defineType } from 'sanity';
import { SINGLETON } from '@pkg/config/sanity/schemaTypes';
import { defineSeoFields } from '@pkg/sanity-studio/features/seo/utilities/defineSeoFields';
import { withProps } from '@pkg/sanity-studio/utilities/schemas';
import { WITH_SITE_TITLE } from '@pkg/sanity-studio/features/seo/constants';
import { seoFieldset } from '@pkg/sanity-studio/features/seo/utilities/seoFieldset';

export const seo = defineType({
  name: SINGLETON.CONFIG_SEO,
  title: 'SEO + Social',
  type: 'document',
  icon: BiSearch,
  fieldsets: [
    seoFieldset({ global: true }),
    { name: 'titleMeta', title: 'Title Meta', options: { columns: 2 } },
    { name: 'favicon', title: 'Icons', options: { columns: 2 } },
  ],
  groups: [
    {
      title: 'General',
      name: 'general',
    },
    {
      title: 'SEO',
      name: 'seo',
    },
    {
      title: 'Icons',
      name: 'icons',
    },
  ],
  fields: [
    defineField({
      title: 'Site Title',
      name: 'siteTitle',
      type: 'string',
      description: 'Prominently shown on the browser tab, on search engine results, and social sharing.',
      group: 'general',
    }),
    defineField({
      title: 'Site URL',
      name: 'siteUrl',
      type: 'url',
      description: 'The website URL used for canonical URLs. Should include protocol and full domain name. E.G. https://domain.com',
      group: 'general',
      validation: (rule) => rule.required().uri({ scheme: ['http', 'https'] }),
    }),
    defineField({
      title: 'Prepend or Append Site Title to Meta Title?',
      name: 'withSiteTitle',
      type: 'string',
      description: 'Do not turn this off unless you understand the SEO impact',
      group: 'general',
      options: {
        list: [
          { title: 'Prepend', value: WITH_SITE_TITLE.PREPEND },
          { title: 'Append', value: WITH_SITE_TITLE.APPEND },
          { title: 'Off', value: WITH_SITE_TITLE.OFF },
        ],
      },
      initialValue: WITH_SITE_TITLE.APPEND,
      fieldset: 'titleMeta',
    }),
    defineField({
      title: 'Choose selector to separate Site Title and Meta Title',
      name: 'titleSeparator',
      type: 'string',
      description: 'This will show between the site title and the meta title',
      hidden: ({ document }) => document?.withSiteTitle === 'off',
      group: 'general',
      options: {
        list: [
          { title: '|', value: '|' },
          { title: '-', value: '-' },
          { title: '–', value: '–' },
          { title: '—', value: '—' },
          { title: '•', value: '•' },
        ],
      },
      initialValue: '|',
      fieldset: 'titleMeta',
    }),

    ...withProps({ group: 'seo' }, [
      ...defineSeoFields(),
    ]),

    defineField({
      title: 'Browser Icon (Favicon)',
      name: 'favicon',
      type: 'image',
      description: 'Shown on browser tabs and Google search results. Should be a square image, ideally 512x512 PNG or 16x16 SVG',
      group: 'icons',
      options: {
        accept: 'image/svg+xml, image/png, image/webp',
        sources: [],
      },
      fieldset: 'favicon',
    }),
  ],
});
