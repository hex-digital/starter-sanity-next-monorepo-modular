import { defineType } from 'sanity';
import { OBJECT } from '@pkg/config/sanity/schemaTypes';
import { ONLY } from '../constants';
import { getModularBlocks } from './utilities/getModularContentBlocks';
import { blocksObjectSchema } from './blocksSchema';
import { ModularBlockArrayInput } from './components/ModularBlockArrayInput';

export function registerModularBlockSchemas() {
  return [
    // Register object schema types for inner blocks
    defineType({
      title: 'Inner Content',
      type: 'array',
      name: OBJECT.MODULAR_INNER_BLOCKS,
      of: getModularBlocks({ only: ONLY.INNER }),
      components: {
        input: ModularBlockArrayInput(),
      },
    }),

    // Register object schema types for outer blocks
    defineType({
      title: 'Modular Content',
      type: 'array',
      name: OBJECT.MODULAR_OUTER_BLOCKS,
      of: getModularBlocks({ only: ONLY.OUTER }),
      components: {
        input: ModularBlockArrayInput(),
      },
    }),

    // Register all modular content blocks as objects
    ...blocksObjectSchema,
  ];

}

export { ONLY } from '../constants';
