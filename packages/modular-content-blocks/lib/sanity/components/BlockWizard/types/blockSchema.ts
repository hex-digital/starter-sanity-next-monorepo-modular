import type { ObjectDefinition, ObjectOptions, } from 'sanity';
import type { BlockVariantSchema } from './blockVariant';
import type { NamedWizardGroups } from '../constants';

/**
 * Pass any of the properties of Sanity object types described here: https://www.sanity.io/docs/object-type
 */
export interface BlockSchemaDefinition extends Omit<ObjectDefinition, 'options'> {
  options?: BlockOptions;
}

export interface BlockOptions extends ObjectOptions {
  /**
   * Which group this variant will be displayed in within the Block Wizard UI.
   */
  group?: NamedWizardGroups;
  /**
   * What variations this block can have.
   * Editors can choose between these when creating a new block.
   * They serve as both documentation and a way to quickly create a block with a given layout (initialValue).
   *
   * If a single variant, pass a single object in the array.
   */
  variants?: BlockVariantSchema[];
}
