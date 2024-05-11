import { ListItemBuilder } from 'sanity/structure';
import { CogIcon } from '@sanity/icons';
import { BiSearch } from 'react-icons/bi';
import { GrClone } from 'react-icons/gr';
import { DOCUMENT, SINGLETON } from '@pkg/config/sanity/schemaTypes';
import { defineStructure, singletonListItem } from '@pkg/sanity-studio/features/structure';
import { redirects } from './redirects';

export const siteConfig = defineStructure<ListItemBuilder>((S, context) => {
  const rootTitle = 'Site Config';

  return S.listItem()
    .title(rootTitle)
    .icon(CogIcon)
    .child(
      S.list()
        .title(rootTitle)
        .items([
          singletonListItem(S, context, { title: 'SEO + Social', schemaType: SINGLETON.CONFIG_SEO, icon: BiSearch }),
          redirects(S, context),
          S.divider(),
          S.listItem().title('Reusable Blocks').icon(GrClone).child(S.documentTypeList(DOCUMENT.CONFIG_REUSABLE_BLOCKS)),
          // singletonListItem(S, context, { title: 'Social', schemaType: SINGLETON.CONFIG_SOCIAL, icon: IoShareSocial }),
        ])
    );
});
