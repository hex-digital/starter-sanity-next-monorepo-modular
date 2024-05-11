import CmsPage from '@/components/pages/CmsPage';

export interface PageResolverParams {
  path: string[];
}

/**
 * 1. Check if path matches any slugs in app manifest
 * 2. Load the appropriate template if it does, or the default page template if it does not
 */
export function usePageResolver({ path }: PageResolverParams) {
  const pathname = `/${path.join('/')}`;
  let component = CmsPage;

  // @todo Example of loading a different Page Template based on path information
  if (pathname.startsWith('/some-directory/')) {
    component = CmsPage;
  }

  return {
    PageComponent: component,
  };
}
