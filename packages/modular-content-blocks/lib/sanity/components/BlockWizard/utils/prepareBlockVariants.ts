import type { ArraySchemaType } from 'sanity';
import { BlockVariant } from '../types/blockVariant';

export function prepareBlockVariants(blocksSchemaOf: ArraySchemaType['of']) {
  const blocks = blocksSchemaOf.filter(
    (type) => type?.jsonType === 'object'
  );

  return blocks.flatMap((block) => {
    const variants = block.options?.variants;

    const blockVariant: BlockVariant = {
      blocks: [{ blockName: block.name }],
      title: block.title || block.name,
      group: block.options?.group,
    }

    if (!Array.isArray(variants) || variants.length === 0) {
      return blockVariant;
    }

    // Blocks may have variants, which may have images, variant titles, or initial values.
    return (
      variants.map(
        (variant): BlockVariant => ({
          ...blockVariant,
          title: `${block.title || block.name}${variant.title ? ` - ${variant.title}` : ""}`,
          assetUrl: variant.assetUrl,
          blocks: blockVariant.blocks.map(
            (block) => ({ ...block, initialValue: variant.initialValue })
          ),
        })
      ) ?? []
    );
  });
}
