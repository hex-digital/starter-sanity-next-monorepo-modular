import type { DocumentActionComponent, PluginOptions } from 'sanity';
import { LOCKED_DOCUMENT_TYPES } from '@pkg/config/sanity/schemaConfig';

/**
 * This plugin contains the logic for setting up the singletons.
 */

export function setupSingletons(): PluginOptions {
  return {
    name: 'singletonPlugin',
    document: {
      // Hide Singletons (such as Homepage) from new document options, so they can't be created in global new document window
      // https://user-images.githubusercontent.com/81981/195728798-e0c6cf7e-d442-4e58-af3a-8cd99d7fcc28.png
      newDocumentOptions: (prev, { creationContext }) => {
        if (creationContext.type === 'global') {
          return prev.filter(
            (templateItem) => !LOCKED_DOCUMENT_TYPES.includes(templateItem.templateId),
          );
        }

        return prev;
      },

      // Removes the "duplicate", "unpublish" and "delete" actions on Singletons (such as Homepage or Site Config)
      actions: (actions, { schemaType, documentId }) => {
        const isSingleton = LOCKED_DOCUMENT_TYPES.includes(schemaType);

        if (isSingleton) {
          actions = actions.filter(
            ({ action }: DocumentActionComponent) =>
              action !== 'duplicate' && action !== 'unpublish' && action !== 'delete'
          );
        }

        return actions;
      },
    },
  };
}
