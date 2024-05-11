import type { OBJECT } from '@pkg/config/sanity/schemaTypes';
import { webInnerBlocks, webOuterBlocks } from './blocks';
import { BlockCategory } from '../constants';
import type { ModularContentBlocks, ModularBlock } from '@pkg/sanity-web/types/sanity';

interface ModularContentRendererProps {
  blocks: ModularContentBlocks;
  type: BlockCategory.OUTER | BlockCategory.INNER;
}

const webBlocksFlat = [ ...webOuterBlocks, ...webInnerBlocks ];

export default function ModularContentRenderer({ blocks = [], type = BlockCategory.INNER }: ModularContentRendererProps) {
  if (!blocks) {
    return;
  }

  return (
    <div className={`m-blocks m-blocks--${type}`}>
      {blocks.map(buildBlocks)}
    </div>
  )
}

function getWebBlock(blockType: OBJECT) {
  return webBlocksFlat.find((potentialBlock) => potentialBlock.config.name === blockType);
}

function blockToClassName(blockType: OBJECT) {
  const parts = blockType.split('.');

  return parts.length === 3 && [BlockCategory.INNER as string, BlockCategory.OUTER as string].includes(parts[1])
    ? `m-${parts[1]}-${parts[2]}`
    : blockType;
}

function buildBlocks(block: ModularBlock) {
  const webBlock = getWebBlock(block._type);

  if (!webBlock) {
    return;
  }

  const Component = webBlock.component;

  return (
    <Component
      className={blockToClassName(block._type)}
      block={block}
    />
  );
}
