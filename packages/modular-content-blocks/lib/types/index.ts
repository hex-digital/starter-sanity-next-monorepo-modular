import React, { type HTMLAttributes } from 'react';
import type { SchemaTypeDefinition } from 'sanity';
import { OBJECT } from '@pkg/config/sanity/schemaTypes';
import { ModularBlock } from '@pkg/sanity-web/types/sanity';
import { ONLY } from '../constants';

export interface Config {
  name: OBJECT;
}

export interface GetBlocksOptions {
  include?: Array<OBJECT>;
  exclude?: Array<OBJECT>;
  only?: ONLY;
}

export interface WebBlock {
  query: string;
  component: React.ComponentType<
    HTMLAttributes<HTMLDivElement> & {
    block?: ModularBlock
  }>;
  config: Config;
}

export interface SanityBlock {
  schema: SchemaTypeDefinition;
}
