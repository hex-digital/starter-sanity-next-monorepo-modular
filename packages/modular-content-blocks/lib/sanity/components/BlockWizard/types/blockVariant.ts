import { AutomaticWizardGroups, NamedWizardGroups } from '../constants';

export interface BlockVariantSchema {
  /**
   * The name of the variant, as shown after the block name in the block wizard.
   */
  title?: string;
  /**
   * URl to an image, video or GIF that shows what this block variant looks like.
   */
  assetUrl?: string;
  /**
   * What initial value to use for this variant when creating the block.
   *
   * @example
   * {
   *  title: "Title Centered, dark background",
   *  initialValue: { centeredTitle: true, bg: "dark" }
   * }
   */
  initialValue?: Record<string, any>;
}

/**
 * The Block Variant as used in the Block Wizard, after being prepared.
 */
export interface BlockVariant {
  title: string;
  assetUrl?: string;
  /**
   * Which group this variant will be displayed in within the Block Wizard UI.
   */
  group?: AutomaticWizardGroups | NamedWizardGroups;
  /**
   * Some Block Variants, such as those from Reusable Content, may have multiple blocks, so we use an array
   */
  blocks: Array<{
    initialValue?: Record<string, any>;
    /**
     * The name of the block this variant is for.
     */
    blockName: string;
  }>;
}

export interface BlockGroup {
  blockVariants: Array<BlockVariant>;
  name: NamedWizardGroups | AutomaticWizardGroups;
  description?: string;
}
