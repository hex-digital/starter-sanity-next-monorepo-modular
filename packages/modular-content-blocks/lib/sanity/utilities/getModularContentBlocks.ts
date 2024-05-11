import { GetBlocksOptions } from '../../types';
import { defineArrayMember } from 'sanity';
import { OBJECT } from '@pkg/config/sanity/schemaTypes';
import { ONLY } from '../../constants';
import { ModularBlockArrayMember } from '@pkg/sanity-studio/types';
import { blocksObjectSchema, innerOnlyBlocks, outerOnlyBlocks } from '../blocksSchema';
import { OuterBlockItemComponent } from '../components/OuterBlockItemComponent';
import { InnerBlockItemComponent } from '../components/InnerBlockItemComponent';

const outerBlockNames = outerOnlyBlocks.map((block) => block.name);
const innerBlockNames = innerOnlyBlocks.map((block) => block.name);

/**
 * This function will provide a list of modular content blocks to be used in a sanity `array` field.
 * E.G.
 *   defineField({
 *     name: 'content',
 *     title: 'Modular Content',
 *     type: 'array',
 *     group: 'content',
 *     of: getModularBlocks(),
 *   }),
 *
 * It can optionally be filtered to include or exclude specific blocks, as well as only
 * including SECTION or INNER blocks.
 */
export function getModularBlocks(opts: GetBlocksOptions = {}) {
  const modularContentBlockTypes: Array<ModularBlockArrayMember> = blocksObjectSchema
    .map((blockSchema) => defineArrayMember({
      title: blockSchema.title,
      name: blockSchema.name,
      type: blockSchema.name as OBJECT,
    }));

  return filterBlocks(modularContentBlockTypes, opts);
}

function filterBlocks(blockList: Array<ModularBlockArrayMember>, opts: GetBlocksOptions = {}) {
  const include = opts.include ?? [];
  const exclude = opts.exclude ?? [];

  if (typeof opts.only !== 'undefined') {
    if (opts.only === ONLY.OUTER) {
      blockList = blockList.filter((block) => outerBlockNames.includes(block.type));
    } else if (opts.only === ONLY.INNER) {
      blockList = blockList.filter((block) => innerBlockNames.includes(block.type));
    }
  }

  if (exclude.length) {
    blockList = blockList.filter((block) => !exclude.includes(block.type));
  }

  if (include.length) {
    blockList = blockList.filter((block) => include.includes(block.type));
  }

  return blockList;
}
