import { MinimalPathableDocument } from '@pkg/sanity-web/types';
import { ModularContentBlocks } from '@pkg/sanity-web/types/sanity';
import ModularContentRenderer from '@pkg/modular-content-blocks/lib/web/ModularContentRenderer';
import { BlockCategory } from '@pkg/modular-content-blocks/lib/constants';

export interface CmsPageBlankTemplate extends MinimalPathableDocument {
  content?: ModularContentBlocks | null;
}

export default function Blank({ data }: { data: CmsPageBlankTemplate }) {
  return (
    <>
      <h1>Blank Page Template</h1>
      {data.content && (
        <ModularContentRenderer blocks={data.content} type={BlockCategory.OUTER} />
      )}
    </>
  );
}
