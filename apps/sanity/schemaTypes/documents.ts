import { page } from './documents/page';
import { reusableBlocks } from './documents/reusableBlocks';
import { redirects } from './documents/redirects';
import { SchemaTypeDefinition } from 'sanity';

export const documents: SchemaTypeDefinition[] = [
  page,

  redirects,
  reusableBlocks,
]
