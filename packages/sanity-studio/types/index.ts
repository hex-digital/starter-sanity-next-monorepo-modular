import { OBJECT } from '@pkg/config/sanity/schemaTypes';

/**
 * The structure of Array Members for Modular Blocks.
 * This represents the structure of Modular Block fields, defined with Sanity's defineArrayMember()
 * helper function, that are passed to the `of` field of an `array` type field.
 */
export type ModularBlockArrayMember = {
  type: OBJECT
  title?: string,
  name?: string,
};
