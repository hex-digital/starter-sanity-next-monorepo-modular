export const SEO_FIELDSET = 'seoSocial';

interface Options { global: boolean };

export function seoFieldset({ global }: Options = { global: false }) {
  return {
    name: SEO_FIELDSET,
    title: global ? 'Fallback SEO Meta' : 'Page SEO and Social',
    description: `These settings are optional but important as they will significantly increase engagement.${global ? '' : ' If not set, the global fallbacks will be used from "Site Config > SEO"'}`,
    options: { collapsible: true },
  };
}
