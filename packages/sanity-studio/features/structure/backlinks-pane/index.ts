import { StructureBuilder } from 'sanity/structure';
import DocumentsPane from 'sanity-plugin-documents-pane';
import { FaArrowsToCircle } from 'react-icons/fa6';

export function backlinksPane(S: StructureBuilder) {
  return S.view
    .component(DocumentsPane)
    .icon(FaArrowsToCircle)
    .options({
      query: `*[!(_id in path("drafts.**")) && references($id)]`,
      params: { id: `_id` },
      useDraft: false
    })
    .title('Backlinks')
}
