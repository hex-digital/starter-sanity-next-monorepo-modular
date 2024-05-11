import type { StructureBuilder } from 'sanity/structure';
import { BiSearch } from 'react-icons/bi';
import { SeoPreviewPane } from './components/SeoPreviewPane';

export function seoPreviewPane(S: StructureBuilder) {
  return S.view
    .component(SeoPreviewPane)
    .title('SEO Preview')
    .icon(BiSearch);
}
