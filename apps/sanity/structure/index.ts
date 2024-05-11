import type {
  ListItemBuilder,
  StructureResolver,
} from 'sanity/structure';
import { InfoOutlineIcon } from '@sanity/icons';
import { DOCUMENT, SINGLETON } from '@pkg/config/sanity/schemaTypes';
import { placeholder } from '@pkg/sanity-studio/features/structure';
import { skeletonKey } from '@pkg/sanity-studio/features/structure/skeletonKey';
import { isDeveloper } from '@pkg/sanity-studio/utilities/roles';
import { StructureContext } from '@pkg/sanity-studio/features/structure/types/context';
import { siteConfig } from './siteConfig';

/**
 * When creating a new document type, it will appear automatically in the root list in the CMS.
 * Once you've handled where you'd like it to appear, it can be removed from the root list by adding it to this constant.
 * This is a failsafe to ensure when new types are added they can be immediately seen without further configuration.
 */
const DOCUMENT_TYPES_IN_STRUCTURE: Array<string> = [
  // SINGLETON.THEME,
  DOCUMENT.PAGES,

  SINGLETON.CONFIG_SEO,
  DOCUMENT.CONFIG_REDIRECTS,
  DOCUMENT.CONFIG_REUSABLE_BLOCKS,

  DOCUMENT.MEDIA_TAG,
];

export const structure: StructureResolver = (S, ctx) => {
  // Add anything we need available to all structure functions here
  const context: StructureContext = ctx;

  // See: https://www.sanity.io/docs/structure-builder-reference
  return S.list()
    .title('Content')
    .items([
      placeholder(S, 'Guide', InfoOutlineIcon),
      S.divider(),
      S.documentTypeListItem(DOCUMENT.PAGES)
        .child(
          S.documentTypeList(DOCUMENT.PAGES).defaultOrdering([{field: 'pathname.current', direction: 'asc'}])
        ),
      S.divider(),
      siteConfig(S, context),
      S.divider(),

      // Add a Skeleton Key for developers to see all document types easily
      ...(context.currentUser && isDeveloper(context.currentUser)
          ? [
            skeletonKey(S, context),
            S.divider(),
          ]
          : []
      ),

      // Automatically add new document types to the root pane
      ...S.documentTypeListItems().filter(
        (listItem: ListItemBuilder) => {
          const listItemId = listItem.getId();

          return listItemId
            ? !DOCUMENT_TYPES_IN_STRUCTURE.includes(listItemId.toString())
            : undefined;
        }
      ),
    ]);
}
