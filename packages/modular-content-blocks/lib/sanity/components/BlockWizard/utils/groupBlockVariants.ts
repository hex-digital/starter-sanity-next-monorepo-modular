import { BlockGroup, BlockVariant } from '../types/blockVariant';
import { AutomaticWizardGroups, wizardGroup, wizardGroupOrder } from '../constants';

export function groupBlockVariants(blockVariants: Array<BlockVariant>) {
  const groupedBlocks = wizardGroupOrder
    .map((groupTitle) => {
      const group = wizardGroup.find((group) => group.name === groupTitle);

      return group
        ? {
          ...group,
          blockVariants: blockVariants.filter((blockVariant) => {
            return blockVariant.group === group.name || (group.name === AutomaticWizardGroups.DEFAULT && !blockVariant.group)
          }),
        } as BlockGroup
        : undefined;
    });

  return groupedBlocks.filter((group): group is BlockGroup => !!group);
}
