import type { StructureBuilder, ListBuilder, ListItemBuilder } from 'sanity/structure';
import { CircleIcon } from '@sanity/icons';
import type { SingletonListItem, StructureContext } from './types/context';
import { singletonDocId } from '../singletons/structure';
import { defaultViews } from './defaultDocumentNode';

/**
 * Helper for creating and typing composable desk structure parts.
 */
export function defineStructure<StructureType>(
  factory: (S: StructureBuilder, context: StructureContext) => StructureType
) {
  return factory;
}

export function singletonListItem(
  S: StructureBuilder,
  context: StructureContext,
  { title, schemaType, icon }: SingletonListItem
): ListItemBuilder {
  let documentId = singletonDocId(schemaType);

  return S.listItem()
    .title(title)
    .icon(icon)
    .schemaType(schemaType)
    .child(
      S.editor()
        .title(title)
        .schemaType(schemaType)
        .documentId(documentId)
        .views(defaultViews(S, { documentId, schemaType, ...context }))
    );
}

export function placeholder(S: StructureBuilder, title: string, icon?: any, children?: ListBuilder) {
  return S.listItem()
    .title(title)
    .icon(icon || CircleIcon)
    .child(children || S.list().title(title));
}
