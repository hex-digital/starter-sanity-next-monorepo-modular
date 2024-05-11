import { ComponentType, ReactNode } from 'react';
import { StructureResolverContext } from 'sanity/structure';
import { SINGLETON } from '@pkg/config/sanity/schemaTypes';

export type StructureContext = StructureResolverContext;

export interface SingletonListItem {
  schemaType: SINGLETON;
  title: string;
  icon?: ComponentType | ReactNode;
}
