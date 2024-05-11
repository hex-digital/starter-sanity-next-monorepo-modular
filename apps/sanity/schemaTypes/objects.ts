import { SchemaTypeDefinition } from 'sanity';
import { registerModularBlockSchemas } from '@pkg/modular-content-blocks/lib/sanity';
import { registerSeoFields } from '@pkg/sanity-studio/features/seo/utilities/registerSeoFields';
import { defineImageObject } from '@pkg/sanity-studio/features/images/defineImageObject';

export const objects: SchemaTypeDefinition[] = [
  ...registerModularBlockSchemas(),
  ...registerSeoFields(),
  defineImageObject(),
]
