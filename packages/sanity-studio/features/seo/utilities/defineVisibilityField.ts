import { defineField } from 'sanity';
import { PAGE_VISIBILITY } from '../constants';

export function defineVisibilityField() {
  return defineField({
    title: 'Page Visibility',
    name: 'pageVisibility',
    type: 'string',
    description: '"Private" makes the page completely inaccessible except to Preview mode. "Hidden" will stop this page showing in search results + sitemaps. This setting only takes effect when this page is published - it will always be private until then',
    initialValue: PAGE_VISIBILITY.PUBLIC,
    options: {
      layout: 'radio',
      list: [
        { title: 'Public', value: PAGE_VISIBILITY.PUBLIC },
        { title: 'Hidden (noindex)', value: PAGE_VISIBILITY.HIDDEN },
        { title: 'Private', value: PAGE_VISIBILITY.PRIVATE },
      ],
    },
  });
}
