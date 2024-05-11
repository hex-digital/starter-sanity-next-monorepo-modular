import { useCmsTemplateResolver } from '@/hooks/useCmsTemplateResolver';
import { loadPage } from '@/data/sanity/loadPage';
import Error404 from '@/components/pages/Error404';

export interface CmsPageProps {
  path: string[];
}

export default async function CmsPage({ path }: CmsPageProps) {
  const pathname = `/${path.join('/')}`;

  // @todo use page data to determine template component as needed
  const data = await loadPage(pathname);

  const { TemplateComponent } = useCmsTemplateResolver(data);

  if (data == null) {
    return <Error404 />;
  }

  return <TemplateComponent data={data} />;
}
