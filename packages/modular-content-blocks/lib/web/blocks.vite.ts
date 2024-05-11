/**
 * This file is only used for vite-powered projects, such as Nuxt.js.
 * If using this package with non-vite, e.g. Next.js, use ./blocks.ts instead (which is a generated file on build time).
 */

import { WebBlock } from '../types';

const outerBlocksWeb = import.meta.glob<WebBlock>(
  '../../blocks/outer/**/web.ts',
  { eager: true },
);

const innerBlocksWeb = import.meta.glob<WebBlock>(
  '../../blocks/inner/**/web.ts',
  { eager: true },
);

export const webOuterBlocks = Object
  .keys(outerBlocksWeb)
  .map((path) => outerBlocksWeb[path]);

export const webInnerBlocks = Object
  .keys(innerBlocksWeb)
  .map((path) => innerBlocksWeb[path]);
