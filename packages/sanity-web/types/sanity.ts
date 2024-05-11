import { OBJECT } from '@pkg/config/sanity/schemaTypes';

export type ModularContentBlocks = Array<ModularBlock> | null;

export interface ModularBlock {
  _type: OBJECT;
  _key: string;

  [key: string]: any;
}
