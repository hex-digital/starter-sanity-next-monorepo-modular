import { defineConfig, type WorkspaceOptions } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { assist } from '@sanity/assist';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { media } from 'sanity-plugin-media';
import { setupSingletons } from '@pkg/sanity-studio/features/singletons';
import { noteField } from 'sanity-plugin-note-field';
import { isDeveloper } from '@pkg/sanity-studio/utilities/roles';
import { schemaTypes } from './schemaTypes';
import { options } from './config/options';
import { PreventClickAwayItemComponent } from '@pkg/modular-content-blocks/lib/sanity/components/PreventClickAwayItemComponent';
import { defaultDocumentNode } from '@pkg/sanity-studio/features/structure/defaultDocumentNode';
import { structure } from './structure';

const { title, projectId, dataset, apiVersion } = options;

/**
 * Create environmental datasets by extending from a baseConfig and overriding with environment specific variables
 * The below creates:
 * - Production
 * - Staging
 * - Development
 *
 * Add all configuration to the baseConfig that should be shared across environments.
 */

const envConfig = (envName: string) => ({
  dataset: envName,
  title: envName.charAt(0).toUpperCase() + envName.slice(1),
  name: envName,
  basePath: `/${envName}`,
});

const productionConfig = envConfig('production');
const stagingConfig = envConfig('staging');
const developmentConfig = envConfig('development');

const baseConfig: WorkspaceOptions = defineConfig({
  name: 'default',
  title,

  projectId,
  dataset,
  basePath: '/',

  plugins: [
    // Set up UI and logic for managing and editing Singleton documents
    setupSingletons(),
    // Add the Structure Tool
    structureTool({
      name: 'content',
      title: 'Content',
      structure,
      defaultDocumentNode,
    }),
    // Add a 'note' field to documents that just displays text or a react component in the document
    noteField(),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Add a tab for the media manager, with tags and searching
    media(),
    // Add sanity AI Assist
    assist(),
    // Add the vision tool for testing queries within the CMS
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  form: {
    components: {
      item: PreventClickAwayItemComponent,
    },
  },

  schema: {
    types: schemaTypes,
  },

  tools: (prev, { currentUser }) => {
    const isDev = isDeveloper(currentUser);

    if (isDev) {
      return prev;
    }

    return prev.filter((tool) => tool.name !== 'vision');
  },

  scheduledPublishing: {
    enabled: true,
  },

  // @todo Setup and configure SSO login for BLI
  // auth: {
  //   redirectOnSingle: false,
  //   providers: (prev: AuthProvider[]) => ([
  //     {
  //       name: '',
  //       title: '',
  //       url: 'https://api.sanity.io/v2021-10-01/auth/saml/login/XXXXXXXX',
  //     },
  //     ...prev,
  //   ]),
  // },
});

const datasets: { [key: string]: WorkspaceOptions } = {
  'production': { ...baseConfig, ...productionConfig },
  'staging': { ...baseConfig, ...stagingConfig },
  'development': { ...baseConfig, ...developmentConfig },
};

const finalDatasets =
  process.env.SANITY_STUDIO_SANITY_DATASET_SHOW_ALL
    ? Object.values(datasets)
    : [datasets[options.dataset] || datasets.development];

export default defineConfig(finalDatasets);


