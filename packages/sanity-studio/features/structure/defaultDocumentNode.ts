import {
  DefaultDocumentNodeContext,
  DefaultDocumentNodeResolver,
  StructureBuilder,
  View,
  ViewBuilder
} from 'sanity/structure';
import { LuPencilLine } from 'react-icons/lu';
import { isDeveloper } from '../../utilities/roles';
import { JsonPane } from './json-pane';
import {
  INCOMING_REFERENCE_LIST,
  PREVIEWABLE_DOCUMENT_TYPES,
  SEO_PREVIEW_DOCUMENT_TYPES
} from '@pkg/config/sanity/schemaConfig';
import { seoPreviewPane } from './seo-pane';
import { backlinksPane } from './backlinks-pane';
// import { previewPane } from '../preview';
// import { options } from '../../config/options';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, context) => {
  return S.document().views(defaultViews(S, context));
};

export function defaultViews(S: StructureBuilder, context: DefaultDocumentNodeContext): Array<View | ViewBuilder> {
  const views: Array<View | ViewBuilder> = [S.view.form().icon(LuPencilLine)];

  if (isDeveloper(context.currentUser)) {
    views.push(JsonPane(S));
  }

  // if (PREVIEWABLE_DOCUMENT_TYPES.includes(context.schemaType)) {
  //   views.push(previewPane(S, context, options.apiVersion));
  // }

  if (SEO_PREVIEW_DOCUMENT_TYPES.includes(context.schemaType)) {
    views.push(seoPreviewPane(S));
  }

  if (INCOMING_REFERENCE_LIST.includes(context.schemaType)) {
    views.push(backlinksPane(S));
  }

  return views;
}
