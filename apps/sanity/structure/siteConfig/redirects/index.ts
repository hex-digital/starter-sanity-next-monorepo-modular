import { ListItemBuilder } from 'sanity/structure';
import { BsArrow90DegRight } from 'react-icons/bs';
import { defineStructure } from '@pkg/sanity-studio/features/structure';
import { DOCUMENT } from '@pkg/config/sanity/schemaTypes';

export const redirects = defineStructure<ListItemBuilder>((S, context) => {
  const rootTitle = 'Redirects';

  return S.listItem()
    .title(rootTitle)
    .icon(BsArrow90DegRight)
    .child(S.documentTypeList(DOCUMENT.CONFIG_REDIRECTS));
});
