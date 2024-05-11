import { ListItemBuilder } from 'sanity/structure';
import { GiSkeletonKey } from 'react-icons/gi';
import { defineStructure } from './index';

/**
 * For development purposes.
 * The Skeleton Key is only shown to Developers and Administrators, and allows under-the-hood access
 * to all the default desk structure. Useful for editing documents that you may not otherwise be
 * able to find in the custom desk structure.
 */
export const skeletonKey = defineStructure<ListItemBuilder>((S, context) => {
  const rootTitle = 'Skeleton Key';

  return S.listItem()
    .title(rootTitle)
    .icon(GiSkeletonKey)
    .child(
      S.list()
        .title(rootTitle)
        .items(S.documentTypeListItems())
    );
});
