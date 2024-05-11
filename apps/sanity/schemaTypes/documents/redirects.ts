import { defineType } from 'sanity';
import { AiOutlineWarning } from 'react-icons/ai';
import { DOCUMENT } from '@pkg/config/sanity/schemaTypes';
import { defineRedirectFields } from '@pkg/sanity-studio/features/redirects/schema/defineRedirectFields';
import { defineRedirectPreview } from '@pkg/sanity-studio/features/redirects/schema/defineRedirectPreview';

export const redirects = defineType({
  title: 'Redirects',
  name: DOCUMENT.CONFIG_REDIRECTS,
  type: 'document',
  icon: AiOutlineWarning,
  fields: defineRedirectFields(),
  preview: defineRedirectPreview(),
});
