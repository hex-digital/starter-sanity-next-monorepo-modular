import { defineField, defineType } from 'sanity';
import { OBJECT, DOCUMENT } from '@pkg/config/sanity/schemaTypes';
import { GrClone } from 'react-icons/gr';

export const reusableBlocks = defineType({
  name: DOCUMENT.CONFIG_REUSABLE_BLOCKS,
  title: 'Reusable Blocks',
  type: 'document',
  icon: GrClone,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'This title will display in the block selector. Make it clear and unique. Use it to more easily locate this block in future.',
      validation: (rule) => rule.required().error(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'This image will display in the block selector, if provided. Use it to more easily locate this block in future. Add this block to a page, then screenshot it to get an image to use.',
      validation: (rule) => rule.required().warning('An image makes this easier to find'),
    }),
    defineField({
      name: 'content',
      title: 'Blocks',
      type: OBJECT.MODULAR_OUTER_BLOCKS,
      description: 'When re-using this block, all the content below will be copied to the destination.',
    }),
  ],
});
