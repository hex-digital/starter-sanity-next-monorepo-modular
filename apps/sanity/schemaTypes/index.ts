import { documents } from './documents';
import { objects } from './objects';
import { singletons } from './singletons';

export const schemaTypes = [
  ...documents,
  ...objects,
  ...singletons,
];
