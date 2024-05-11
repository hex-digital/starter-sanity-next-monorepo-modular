import groq from 'groq';
import { webInnerBlocks, webOuterBlocks } from './blocks';
import { buildBlockQuery } from './utilities';

const innerBlocksGroq = buildBlockQuery(webInnerBlocks);
const outerBlocksGroq = buildBlockQuery(webOuterBlocks);

/**
 * Include this when you need to add the full fragment for all inner content blocks to a groq query.
 */
export const innerContentBlockFields = groq`
  ...,
  ${innerBlocksGroq}
`;

/**
 * Include this when you need to add the full fragment for all outer content blocks to a groq query.
 * Note that all outer blocks use `content` for the name of the field with the inner blocks in,
 * so we can include inner blocks only once. This helps save on query size.
 */
export const modularContentBlocks = groq`
  ...,
  content[] {
    ${innerContentBlockFields}
  },
  ${outerBlocksGroq}
`;
