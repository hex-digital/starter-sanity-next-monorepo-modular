import Blank from '@/components/pages/cmsTemplates/Blank';

/**
 * @todo: When we need more page templates, resolve them here from page data.
 */
export function useCmsTemplateResolver(pageData: any) {
  // @todo Load a different page template based on page data, as required
  return {
    TemplateComponent: Blank,
  };
}
