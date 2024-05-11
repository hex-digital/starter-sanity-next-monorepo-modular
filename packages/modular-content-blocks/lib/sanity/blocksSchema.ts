/**
 * This file is only used for the Sanity app. Don't import this file to the web app.
 *
 * This file sets up the inclusion of the Modular Blocks across the Sanity application.
 * It does this by importing all the schemas for all modular blocks and makes them available
 * on a single object, for later inclusion in the Sanity Studio.
 */
import { SanityBlock } from '../types';
import { SchemaTypeDefinition } from 'sanity';

const outerBlocksSchema = import.meta.glob<SanityBlock>(
  '../../blocks/outer/**/schema.ts',
  { eager: true },
);

const innerBlocksSchema = import.meta.glob<SanityBlock>(
  '../../blocks/inner/**/schema.ts',
  { eager: true },
);

export const outerOnlyBlocks = Object.keys(outerBlocksSchema)
  .map((path) => outerBlocksSchema[path]?.schema)
  .filter(Boolean);

export const innerOnlyBlocks = Object.keys(innerBlocksSchema)
  .map((path) => innerBlocksSchema[path]?.schema)
  .filter(Boolean);


/**
 * The object schema to register with Sanity. This allows us to use our blocks as "type"s when
 * defining fields or array members.
 */
export const blocksObjectSchema: Array<SchemaTypeDefinition> = [
  ...outerOnlyBlocks,
  ...innerOnlyBlocks,
];
