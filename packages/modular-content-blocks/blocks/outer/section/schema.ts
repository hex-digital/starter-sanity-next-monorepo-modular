import { defineField } from 'sanity';
import { config } from './config';
import { defineOuterBlock } from '../../../lib/sanity/utilities/schemas/defineModularBlock';
import blockImage from './section-center.png';

export const schema = defineOuterBlock({
  name: config.name,
  title: 'Section',
  type: 'object',
  options: {
    variants: [
      { assetUrl: blockImage },
    ]
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
  ],
});
